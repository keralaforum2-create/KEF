import express, { type Request, Response, NextFunction } from "express";
import multer from "multer";
import compression from "compression";
import type { RequestHandler } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import path from "path";
import fs from "fs";
import cors from "cors";
import { registerPhonepeRoutes } from "../routes/index";
import { startReminderScheduler } from "./reminderScheduler";
import { DatabaseStorage } from "./storage";

// SSL certificate workaround for external hosting platforms (Render, Railway, etc.)
// This helps with "self-signed certificate in certificate chain" errors
if (process.env.RENDER || process.env.RAILWAY_ENVIRONMENT || process.env.DISABLE_SSL_VALIDATION === 'true') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  console.log('SSL validation disabled for external hosting platform compatibility');
}

const app = express();
const httpServer = createServer(app);

const allowedOrigins: string[] = [
  'http://localhost:5000',
  'https://localhost:5000',
  'http://127.0.0.1:5000',
  'https://127.0.0.1:5000',
  'https://kef-e3hu.onrender.com',
  'http://kef-e3hu.onrender.com',
];

if (process.env.REPLIT_DEV_DOMAIN) {
  allowedOrigins.push(`https://${process.env.REPLIT_DEV_DOMAIN}`);
}

if (process.env.REPLIT_DOMAINS) {
  const domains = process.env.REPLIT_DOMAINS.split(',');
  domains.forEach(domain => {
    if (domain.trim()) {
      allowedOrigins.push(`https://${domain.trim()}`);
    }
  });
}

// Add custom deployment domain from environment variable
if (process.env.DEPLOYMENT_URL) {
  allowedOrigins.push(process.env.DEPLOYMENT_URL);
}

// CORS - Allow all origins for deployment compatibility
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'X-VERIFY', 'X-Forwarded-Proto', 'X-Forwarded-Host']
}));

// Handle preflight requests
app.options('*', cors());

// Enable gzip compression for all responses
app.use(compression({
  filter: (req: Request, res: Response) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  },
  level: 6
}));

// Add cache headers for static assets and GET endpoints
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'GET') {
    // Cache static assets for 1 day
    if (req.path.startsWith('/uploads') || req.path.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2)$/i)) {
      res.set('Cache-Control', 'public, max-age=86400');
    }
    // Cache API GET responses for 5 minutes
    else if (req.path.startsWith('/api')) {
      res.set('Cache-Control', 'public, max-age=300');
    }
  } else {
    // Don't cache POST, PUT, DELETE requests
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  }
  next();
});

// Setup multer for file uploads
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
    file?: Express.Multer.File;
    upload?: typeof upload;
  }
}

app.use(
  express.json({
    limit: "50mb",
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false, limit: "50mb" }));

// Make upload middleware and upload directory available
app.use((req, _res, next) => {
  req.upload = upload;
  next();
});

// Serve uploaded files
app.use("/uploads", express.static(uploadDir));

// PhonePe payment routes
registerPhonepeRoutes(app);

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      // Don't log large response payloads to prevent memory issues
      if (capturedJsonResponse && typeof capturedJsonResponse === 'object') {
        if (Array.isArray(capturedJsonResponse)) {
          logLine += ` (${capturedJsonResponse.length} items)`;
        } else if (capturedJsonResponse.success !== undefined) {
          logLine += ` (${capturedJsonResponse.success ? 'success' : 'failed'})`;
        }
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // Initialize default and promo referral codes
  const storage = new DatabaseStorage();
  try {
    const existingCode = await storage.getReferralCodeByCode("RINSHAD10");
    if (!existingCode) {
      await storage.createReferralCode({
        code: "RINSHAD10",
        discountPercentage: 10,
        isActive: true,
      });
      console.log("✅ Referral code RINSHAD10 (10% discount) initialized");
    }
    
    const existingEarlybird = await storage.getReferralCodeByCode("EARLYBIRD10");
    if (!existingEarlybird) {
      await storage.createReferralCode({
        code: "EARLYBIRD10",
        discountPercentage: 10,
        isActive: true,
      });
      console.log("✅ Referral code EARLYBIRD10 (10% discount) initialized");
    }
    
    // Initialize the 10 new referral codes
    await storage.initializeReferralCodes();
    console.log("✅ All referral codes initialized");
  } catch (err) {
    console.log("ℹ️ Referral code initialization skipped (may already exist)");
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`serving on port ${port}`);
      // Start email reminder scheduler
      startReminderScheduler();
      console.log("📧 Email reminder scheduler started");
    },
  );
})();
