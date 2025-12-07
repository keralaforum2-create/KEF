import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertRegistrationSchema, insertInvestorMentorSchema, insertSponsorshipSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";
import multer from "multer";
import path from "path";
import fs from "fs";
import { sendRegistrationEmails } from "./email";
import { addSessionRegistration, addContestRegistration } from "./googleSheets";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

// Setup multer for file uploads
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const multerStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: multerStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowedMimes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowedMimes.includes(file.mimetype) || file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image, PDF, and document files are allowed"));
    }
  },
});

const uploadFields = upload.fields([
  { name: 'paymentScreenshot', maxCount: 1 },
  { name: 'pitchSupportingFiles', maxCount: 1 }
]);

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { password } = req.body;
      
      if (!password) {
        return res.status(400).json({ message: "Password required" });
      }
      
      if (password !== ADMIN_PASSWORD) {
        return res.status(401).json({ message: "Invalid password" });
      }
      
      return res.json({ 
        success: true,
        token: "admin-authenticated"
      });
    } catch (error) {
      console.error("Error logging in:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const result = insertContactSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({ 
          message: "Validation failed", 
          error: validationError.toString() 
        });
      }
      
      const contact = await storage.createContact(result.data);
      return res.status(201).json({ 
        message: "Contact form submitted successfully", 
        contact 
      });
    } catch (error) {
      console.error("Error creating contact:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      return res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/register", uploadFields, async (req: Request, res) => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
      
      // Validate payment screenshot is uploaded
      if (!files?.paymentScreenshot?.[0]) {
        return res.status(400).json({ 
          message: "Payment screenshot is required. Please upload your payment confirmation before registering." 
        });
      }
      
      const data = {
        ...req.body,
        paymentScreenshot: `/uploads/${files.paymentScreenshot[0].filename}`,
        pitchSupportingFiles: files?.pitchSupportingFiles?.[0] ? `/uploads/${files.pitchSupportingFiles[0].filename}` : undefined,
        paymentStatus: "screenshot_uploaded",
      };
      
      const result = insertRegistrationSchema.safeParse(data);
      
      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({ 
          message: "Validation failed", 
          error: validationError.toString() 
        });
      }
      
      const registration = await storage.createRegistration(result.data);
      
      const protocol = req.headers['x-forwarded-proto'] || 'https';
      const host = req.headers['host'] || 'localhost:5000';
      const baseUrl = `${protocol}://${host}`;
      
      sendRegistrationEmails(registration, baseUrl).catch((err) => {
        console.error('Failed to send registration emails:', err);
      });

      if (registration.registrationType === 'expert-session') {
        addSessionRegistration({
          name: registration.name,
          phone: registration.phone,
          email: registration.email,
          category: registration.ticketCategory || 'Normal',
          paymentProofUrl: registration.paymentScreenshot || '',
        }, baseUrl).catch((err) => {
          console.error('Failed to add session registration to Google Sheet:', err);
        });
      } else if (registration.registrationType === 'contest') {
        addContestRegistration({
          name: registration.name,
          phone: registration.phone,
          email: registration.email,
          contest: registration.contestName || 'Unknown',
          paymentProofUrl: registration.paymentScreenshot || '',
        }, baseUrl).catch((err) => {
          console.error('Failed to add contest registration to Google Sheet:', err);
        });
      }
      
      return res.status(201).json({ 
        message: "Registration successful", 
        registration 
      });
    } catch (error) {
      console.error("Error creating registration:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/registrations", async (req, res) => {
    try {
      const registrations = await storage.getRegistrations();
      return res.json(registrations);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/ticket/:registrationId", async (req, res) => {
    try {
      const { registrationId } = req.params;
      const registration = await storage.getRegistrationByRegistrationId(registrationId);
      
      if (!registration) {
        return res.status(404).json({ message: "Ticket not found" });
      }
      
      return res.json(registration);
    } catch (error) {
      console.error("Error fetching ticket:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/investor-mentor", async (req, res) => {
    try {
      const result = insertInvestorMentorSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({ 
          message: "Validation failed", 
          error: validationError.toString() 
        });
      }
      
      const application = await storage.createInvestorMentor(result.data);
      return res.status(201).json({ 
        message: "Application submitted successfully", 
        application 
      });
    } catch (error) {
      console.error("Error creating investor/mentor application:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/investor-mentors", async (req, res) => {
    try {
      const applications = await storage.getInvestorMentors();
      return res.json(applications);
    } catch (error) {
      console.error("Error fetching investor/mentors:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/sponsorship", async (req, res) => {
    try {
      const result = insertSponsorshipSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({ 
          message: "Validation failed", 
          error: validationError.toString() 
        });
      }
      
      const inquiry = await storage.createSponsorship(result.data);
      return res.status(201).json({ 
        message: "Sponsorship inquiry submitted successfully", 
        inquiry 
      });
    } catch (error) {
      console.error("Error creating sponsorship inquiry:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/sponsorships", async (req, res) => {
    try {
      const sponsorships = await storage.getSponsorships();
      return res.json(sponsorships);
    } catch (error) {
      console.error("Error fetching sponsorships:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/registrations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteRegistration(id);
      return res.json({ message: "Registration deleted successfully" });
    } catch (error) {
      console.error("Error deleting registration:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/contacts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteContact(id);
      return res.json({ message: "Contact deleted successfully" });
    } catch (error) {
      console.error("Error deleting contact:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/investor-mentors/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteInvestorMentor(id);
      return res.json({ message: "Investor/Mentor deleted successfully" });
    } catch (error) {
      console.error("Error deleting investor/mentor:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/sponsorships/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteSponsorship(id);
      return res.json({ message: "Sponsorship deleted successfully" });
    } catch (error) {
      console.error("Error deleting sponsorship:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
