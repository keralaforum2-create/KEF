import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertRegistrationSchema, insertInvestorMentorSchema, insertSponsorshipSchema, insertBulkRegistrationSchema, insertReferralCodeSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";
import multer from "multer";
import path from "path";
import fs from "fs";
import { sendRegistrationEmail, sendAdminNotificationEmail, sendSpeakerConfirmationEmail, sendSpeakerApprovalEmail, sendRegistrationApprovalEmail, sendReferralCodeUsedNotificationEmail } from "./email";
import { initiatePayment, checkPaymentStatus } from "./phonepe";
import { createRazorpayOrder, verifyRazorpayPayment } from "./razorpay";
import { randomUUID as uuid } from "crypto";
import { randomUUID } from "crypto";
import { resolveBaseUrl } from "./utils/request";
import { verifyPaymentScreenshot, verifyBulkPaymentScreenshot } from "./paymentVerification";

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
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'pitchSupportingFiles', maxCount: 1 },
  { name: 'studentsPdf', maxCount: 1 }
]);

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    return res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development"
    });
  });

  // Registration stats endpoint
  app.get("/api/stats", async (_req, res) => {
    try {
      const stats = await storage.getRegistrationStats();
      return res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Validate referral code endpoint
  app.post("/api/referral-codes/validate", async (req, res) => {
    try {
      const { code } = req.body;
      if (!code) {
        return res.status(400).json({ valid: false, message: "Code is required" });
      }
      const referralCode = await storage.getReferralCodeByCode(code);
      if (!referralCode || !referralCode.isActive) {
        return res.status(400).json({ valid: false, message: "Invalid or inactive referral code" });
      }
      return res.json({ 
        valid: true, 
        discount: referralCode.discountPercentage,
        code: referralCode.code
      });
    } catch (error) {
      console.error("Error validating referral code:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all referral codes (admin)
  app.get("/api/admin/referral-codes", async (req, res) => {
    try {
      const authHeader = req.headers.authorization || "";
      let token = "";
      if (authHeader.toLowerCase().startsWith("bearer ")) {
        token = authHeader.substring(7).trim();
      } else {
        token = authHeader.trim();
      }
      const isAuthorized = (token === "admin-authenticated") || (token === ADMIN_PASSWORD && token);
      
      if (!isAuthorized) {
        console.error("Get referral codes - Authorization failed");
        return res.status(401).json({ message: "Unauthorized" });
      }
      const codes = await storage.getReferralCodes();
      return res.json(codes);
    } catch (error) {
      console.error("Error fetching referral codes:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create referral code (admin)
  app.post("/api/admin/referral-codes", async (req, res) => {
    try {
      const authHeader = req.headers.authorization || "";
      // Extract token from "Bearer TOKEN" format
      let token = "";
      if (authHeader.toLowerCase().startsWith("bearer ")) {
        token = authHeader.substring(7).trim();
      } else {
        token = authHeader.trim();
      }
      
      // Check if token matches admin token or password
      const isAuthorized = (token === "admin-authenticated") || (token === ADMIN_PASSWORD && token);
      
      if (!isAuthorized) {
        console.error("Referral code creation - Authorization failed", {
          receivedToken: token,
          tokenLength: token.length,
          authHeaderPresent: !!authHeader
        });
        return res.status(401).json({ message: "Unauthorized" });
      }
      const result = insertReferralCodeSchema.safeParse(req.body);
      if (!result.success) {
        console.error("Validation error:", result.error);
        return res.status(400).json({ 
          message: fromError(result.error).toString(),
          errors: result.error.issues.map(issue => ({ path: issue.path.join('.'), message: issue.message }))
        });
      }
      const newCode = await storage.createReferralCode(result.data);
      console.log("Referral code created:", newCode);
      return res.json(newCode);
    } catch (error: any) {
      console.error("Error creating referral code:", error);
      const isDbError = error?.message?.includes("database") || error?.message?.includes("connection") || error?.code;
      return res.status(isDbError ? 503 : 500).json({ 
        message: isDbError 
          ? "Database error. Please ensure your database is configured correctly and accessible."
          : error?.message || "Failed to create referral code",
        code: error?.code
      });
    }
  });

  // Update referral code (admin)
  app.patch("/api/admin/referral-codes/:id", async (req, res) => {
    try {
      const authHeader = req.headers.authorization || "";
      let token = "";
      if (authHeader.toLowerCase().startsWith("bearer ")) {
        token = authHeader.substring(7).trim();
      } else {
        token = authHeader.trim();
      }
      const isAuthorized = (token === "admin-authenticated") || (token === ADMIN_PASSWORD && token);
      
      if (!isAuthorized) {
        console.error("Update referral code - Authorization failed");
        return res.status(401).json({ message: "Unauthorized" });
      }
      const updated = await storage.updateReferralCode(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ message: "Referral code not found" });
      }
      return res.json(updated);
    } catch (error) {
      console.error("Error updating referral code:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Delete referral code (admin)
  app.delete("/api/admin/referral-codes/:id", async (req, res) => {
    try {
      const authHeader = req.headers.authorization || "";
      let token = "";
      if (authHeader.toLowerCase().startsWith("bearer ")) {
        token = authHeader.substring(7).trim();
      } else {
        token = authHeader.trim();
      }
      const isAuthorized = (token === "admin-authenticated") || (token === ADMIN_PASSWORD && token);
      
      if (!isAuthorized) {
        console.error("Delete referral code - Authorization failed");
        return res.status(401).json({ message: "Unauthorized" });
      }
      await storage.deleteReferralCode(req.params.id);
      return res.json({ success: true });
    } catch (error) {
      console.error("Error deleting referral code:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get referral code usage statistics (admin)
  app.get("/api/admin/referral-code-usage", async (req, res) => {
    try {
      const authHeader = req.headers.authorization || "";
      let token = "";
      if (authHeader.toLowerCase().startsWith("bearer ")) {
        token = authHeader.substring(7).trim();
      } else {
        token = authHeader.trim();
      }
      const isAuthorized = (token === "admin-authenticated") || (token === ADMIN_PASSWORD && token);
      
      if (!isAuthorized) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const usage = await storage.getReferralCodeUsage();
      return res.json(usage);
    } catch (error) {
      console.error("Error fetching referral code usage:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // API info endpoint for testing
  app.get("/api/info", (_req, res) => {
    return res.json({
      version: "1.0.0",
      endpoints: {
        payment: "/api/payment/create",
        phonepe: {
          initiate: "/api/phonepe/initiate",
          callback: "/api/phonepe/callback",
          status: "/api/phonepe/status/:merchantTransactionId"
        },
        verification: {
          verify: "/api/verify-payment"
        }
      }
    });
  });

  // AI Payment Verification Endpoint (standalone)
  app.post("/api/verify-payment", upload.single('paymentScreenshot'), async (req: Request, res) => {
    try {
      const file = req.file;
      
      if (!file) {
        return res.status(400).json({ 
          message: "Payment screenshot is required for verification." 
        });
      }
      
      const paymentScreenshotPath = `/uploads/${file.filename}`;
      const expectedAmount = parseInt(req.body.expectedAmount) || 199;
      
      console.log(`Verifying payment screenshot with AI, expected amount: ${expectedAmount}`);
      const verificationResult = await verifyPaymentScreenshot(paymentScreenshotPath, expectedAmount);
      
      // Clean up uploaded file after verification
      const fullPath = `${process.cwd()}${paymentScreenshotPath}`;
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
      
      return res.json({
        success: verificationResult.isValid,
        verification: verificationResult
      });
    } catch (error) {
      console.error("Error verifying payment:", error);
      return res.status(500).json({ 
        message: "Payment verification failed",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

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
      
      // Send email notification to admin (non-critical, log if fails)
      console.log(`📧 Contact form received from ${contact.name} (${contact.email})`);
      
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
      
      // Convert profile photo to base64 for persistent storage
      let profilePhotoBase64: string | undefined;
      if (files?.profilePhoto?.[0]) {
        const photoPath = files.profilePhoto[0].path;
        const photoBuffer = fs.readFileSync(photoPath);
        const mimeType = files.profilePhoto[0].mimetype;
        profilePhotoBase64 = `data:${mimeType};base64,${photoBuffer.toString('base64')}`;
        // Clean up the temp file
        fs.unlinkSync(photoPath);
      }

      const data = {
        ...req.body,
        profilePhoto: profilePhotoBase64,
        pitchSupportingFiles: files?.pitchSupportingFiles?.[0] ? `/uploads/${files.pitchSupportingFiles[0].filename}` : undefined,
        paymentStatus: "pending",
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
      
      // Skip admin notification for speaker registrations (they use speaker applications)
      if (registration.registrationType !== 'speaker') {
        // Send admin notification about new registration with ticket viewing link
        const baseUrl = resolveBaseUrl(req);
        const ticketUrl = `${baseUrl}/ticket/${registration.registrationId}`;
        sendAdminNotificationEmail(registration, ticketUrl).catch((err) => {
          console.error('Failed to send admin notification:', err);
        });
      }
      
      // Send admin notification if referral code was used
      if (result.data.referralCode) {
        sendReferralCodeUsedNotificationEmail(
          registration.fullName,
          registration.email,
          result.data.referralCode,
          registration.registrationId
        ).catch((err) => {
          console.error('Failed to send referral code usage notification:', err);
        });
      }
      
      return res.status(201).json({ 
        message: "Registration successful - Proceed to payment", 
        registration,
      });
    } catch (error: any) {
      console.error("Error creating registration:", error);
      const errorMessage = error?.message || "Internal server error";
      const isDbError = errorMessage.includes("relation") || errorMessage.includes("database") || errorMessage.includes("connection");
      return res.status(500).json({ 
        message: isDbError 
          ? "Database connection error. Please check your database configuration." 
          : `Registration failed: ${errorMessage}`
      });
    }
  });

  app.get("/api/registrations", async (req, res) => {
    try {
      const registrations = await storage.getPaidRegistrations();
      // Filter out speaker registrations from this endpoint
      const nonSpeakerRegistrations = registrations.filter(reg => reg.registrationType !== 'speaker');
      return res.json(nonSpeakerRegistrations);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/speakers", async (req, res) => {
    try {
      const speakers = await storage.getSpeakerApplications();
      return res.json(speakers);
    } catch (error) {
      console.error("Error fetching speakers:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/speakers/:id/approve", async (req, res) => {
    try {
      const { id } = req.params;
      const speaker = await storage.getSpeakerApplicationById(id);
      
      if (!speaker) {
        return res.status(404).json({ message: "Speaker not found" });
      }

      await storage.updateSpeakerApplicationStatus(id, "approved");

      const baseUrl = resolveBaseUrl(req);
      const ticketUrl = `${baseUrl}/speaker-ticket/${id}`;

      sendSpeakerApprovalEmail(speaker.founderName, speaker.email, speaker.startupName, ticketUrl)
        .catch((err) => {
          console.error('Failed to send speaker approval email:', err);
        });

      console.log(`✅ Speaker approved: ${id}`);
      return res.json({
        success: true,
        message: "Speaker approved successfully"
      });
    } catch (error: any) {
      console.error("Error approving speaker:", error);
      return res.status(500).json({ 
        message: error?.message || "Failed to approve speaker" 
      });
    }
  });

  app.get("/api/pending-registrations", async (req, res) => {
    try {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      const registrations = await storage.getPendingRegistrations();
      // Filter out speaker registrations from this endpoint
      const nonSpeakerRegistrations = registrations.filter(reg => reg.registrationType !== 'speaker');
      return res.json(nonSpeakerRegistrations);
    } catch (error) {
      console.error("Error fetching pending registrations:", error);
      return res.status(500).json({ message: "Failed to load pending registrations" });
    }
  });

  app.post("/api/registrations/:id/approve", async (req, res) => {
    try {
      const { id } = req.params;
      
      const registration = await storage.getRegistrationByRegistrationId(id);
      if (!registration) {
        return res.status(404).json({ message: "Registration not found" });
      }

      // Update registration as approved, but only mark as paid after actual payment confirmation
      const updatedRegistration = await storage.updateRegistrationPayment(registration.id, {
        paymentStatus: 'approved'
      });

      if (!updatedRegistration) {
        return res.status(500).json({ message: "Failed to update registration" });
      }

      const baseUrl = resolveBaseUrl(req);
      const ticketUrl = `${baseUrl}/ticket/${id}`;

      // Send approval email immediately to registrant (asynchronously - no waiting)
      sendRegistrationApprovalEmail(registration.fullName, registration.email, id, ticketUrl)
        .catch((err) => {
          console.error('Failed to send registration approval email:', err);
        });

      console.log("Registration approved:", id);
      return res.json({
        success: true,
        message: "Registration approved and confirmation email sent",
        registrationId: id
      });
    } catch (error: any) {
      console.error("Error approving registration:", error);
      return res.status(500).json({ 
        message: error?.message || "Failed to approve registration" 
      });
    }
  });

  app.get("/api/ticket/:registrationId", async (req, res) => {
    try {
      const { registrationId } = req.params;
      console.log("Fetching ticket for registration ID:", registrationId);
      
      const registration = await storage.getRegistrationByRegistrationId(registrationId);
      console.log("Registration found:", registration ? "Yes" : "No");
      
      if (!registration) {
        console.log("Available registrations count:", (await storage.getRegistrations()).length);
        return res.status(404).json({ message: "Ticket not found" });
      }
      
      // Check if download is requested
      const download = req.query.download === 'true';
      if (download) {
        res.setHeader('Content-Disposition', `attachment; filename="event-ticket-${registration.registrationId}.json"`);
        res.setHeader('Content-Type', 'application/json');
      }
      
      return res.json(registration);
    } catch (error) {
      console.error("Error fetching ticket:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/speaker-ticket/:id", async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Fetching speaker ticket for ID:", id);
      
      const speaker = await storage.getSpeakerApplicationById(id);
      console.log("Speaker found:", speaker ? "Yes" : "No");
      
      if (!speaker) {
        return res.status(404).json({ message: "Speaker ticket not found" });
      }

      // Check if download is requested
      const download = req.query.download === 'true';
      if (download) {
        res.setHeader('Content-Disposition', `attachment; filename="speaker-ticket-${speaker.id}.json"`);
        res.setHeader('Content-Type', 'application/json');
      }
      
      return res.json({
        id: speaker.id,
        founderName: speaker.founderName,
        startupName: speaker.startupName,
        email: speaker.email,
        contactNumber: speaker.contactNumber,
        designation: speaker.designation,
        sector: speaker.sector,
        status: speaker.status,
        createdAt: speaker.createdAt
      });
    } catch (error) {
      console.error("Error fetching speaker ticket:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/registration/:registrationId/confirm", async (req, res) => {
    try {
      const { registrationId } = req.params;
      const registration = await storage.getRegistrationByRegistrationId(registrationId);
      
      if (!registration) {
        return res.status(404).json({ message: "Registration not found" });
      }
      
      // Update registration status to confirmed
      const updatedRegistration = await storage.updateRegistrationPayment(registration.id, {
        paymentStatus: 'confirmed'
      });

      if (!updatedRegistration) {
        return res.status(500).json({ message: "Failed to confirm registration" });
      }

      // Do NOT send email from this endpoint - emails should only be sent after actual payment confirmation
      // This endpoint is deprecated in favor of payment gateway callbacks

      console.log("Registration confirmed (manual):", registrationId);
      return res.json({
        success: true,
        message: "Registration status updated - email will be sent after payment confirmation",
        registrationId
      });
    } catch (error) {
      console.error("Error confirming registration:", error);
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

  // Admin manual registration endpoint (no payment required)
  app.post("/api/admin/register", async (req: Request, res) => {
    try {
      const { fullName, email, phone, registrationType, contestName, sessionName, ticketCategory, age, institution, participantType } = req.body;
      
      if (!fullName || !email || !phone || !registrationType) {
        return res.status(400).json({ 
          message: "Full name, email, phone, and registration type are required" 
        });
      }

      // Prepare data for validation using the shared schema
      const registrationData = {
        fullName,
        email,
        phone,
        age: age || "N/A",
        institution: institution || undefined,
        registrationType,
        contestName: contestName || undefined,
        sessionName: sessionName || undefined,
        ticketCategory: ticketCategory || undefined,
        participantType: participantType || undefined,
        paymentStatus: "paid",
        paymentScreenshot: "admin_registration",
      };

      // Validate using the shared schema
      const result = insertRegistrationSchema.safeParse(registrationData);
      
      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({ 
          message: "Validation failed", 
          error: validationError.toString() 
        });
      }

      const registration = await storage.createRegistration(result.data);

      const baseUrl = resolveBaseUrl(req);
      
      // Skip email notifications for speaker registrations
      if (registration.registrationType !== 'speaker') {
        // Send full ticket email to the user (with ticket details and download link)
        const ticketUrl = `${baseUrl}/ticket/${registration.registrationId}`;
        sendRegistrationEmail(registration, ticketUrl).catch((err) => {
          console.error('Failed to send registration email:', err);
        });

        // Send admin notification about new admin-added registration
        sendAdminNotificationEmail(registration, ticketUrl).catch((err) => {
          console.error('Failed to send admin notification:', err);
        });
      }

      return res.status(201).json({ 
        message: "Registration added successfully", 
        registration 
      });
    } catch (error: any) {
      console.error("Error creating admin registration:", error);
      return res.status(500).json({ 
        message: error?.message || "Internal server error" 
      });
    }
  });

  // Payment create endpoint - alias for phonepe/initiate
  app.post("/api/payment/create", async (req: Request, res) => {
    try {
      console.log("Payment create request received:", JSON.stringify(req.body));
      const { registrationData, amount } = req.body;
      
      if (!registrationData || !amount) {
        console.error("Missing required fields: registrationData or amount");
        return res.status(400).json({ 
          message: "Registration data and amount are required" 
        });
      }

      const result = insertRegistrationSchema.safeParse({
        ...registrationData,
        paymentStatus: "pending",
        paymentScreenshot: "phonepe_payment"
      });
      
      if (!result.success) {
        const validationError = fromError(result.error);
        console.error("Validation failed:", validationError.toString());
        return res.status(400).json({ 
          message: "Validation failed", 
          error: validationError.toString() 
        });
      }

      const merchantTransactionId = `MT${Date.now()}${randomUUID().slice(0, 8)}`;
      
      const registrationWithPayment = {
        ...result.data,
        phonepeMerchantTransactionId: merchantTransactionId,
        paymentAmount: String(amount)
      };

      const registration = await storage.createRegistration(registrationWithPayment as any);

      const baseUrl = resolveBaseUrl(req);
      console.log("Resolved base URL:", baseUrl);

      const paymentResult = await initiatePayment({
        merchantTransactionId,
        amount: Number(amount),
        userId: registration.id,
        userPhone: registrationData.phone,
        userName: registrationData.fullName,
        redirectUrl: `${baseUrl}/payment-status/${merchantTransactionId}`,
        callbackUrl: `${baseUrl}/api/phonepe/callback`
      });

      if (!paymentResult.success || !paymentResult.redirectUrl) {
        console.error("Payment initiation failed:", paymentResult.error);
        await storage.updateRegistrationPayment(registration.id, {
          paymentStatus: "failed"
        });
        return res.status(400).json({ 
          message: paymentResult.error || "Failed to initiate payment" 
        });
      }

      console.log("Payment initiated successfully:", merchantTransactionId);
      return res.json({
        success: true,
        redirectUrl: paymentResult.redirectUrl,
        registrationId: registration.registrationId,
        merchantTransactionId
      });
    } catch (error) {
      console.error("Error in /api/payment/create:", error);
      return res.status(500).json({ 
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.post("/api/phonepe/initiate", async (req: Request, res) => {
    try {
      const { registrationData, amount } = req.body;
      
      if (!registrationData || !amount) {
        return res.status(400).json({ 
          message: "Registration data and amount are required" 
        });
      }

      const result = insertRegistrationSchema.safeParse({
        ...registrationData,
        paymentStatus: "pending",
        paymentScreenshot: "phonepe_payment"
      });
      
      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({ 
          message: "Validation failed", 
          error: validationError.toString() 
        });
      }

      const merchantTransactionId = `MT${Date.now()}${randomUUID().slice(0, 8)}`;
      
      const registrationWithPayment = {
        ...result.data,
        phonepeMerchantTransactionId: merchantTransactionId,
        paymentAmount: String(amount)
      };

      const registration = await storage.createRegistration(registrationWithPayment as any);

      const baseUrl = resolveBaseUrl(req);

      const paymentResult = await initiatePayment({
        merchantTransactionId,
        amount: Number(amount),
        userId: registration.id,
        userPhone: registrationData.phone,
        userName: registrationData.fullName,
        redirectUrl: `${baseUrl}/payment-status/${merchantTransactionId}`,
        callbackUrl: `${baseUrl}/api/phonepe/callback`
      });

      if (!paymentResult.success || !paymentResult.redirectUrl) {
        await storage.updateRegistrationPayment(registration.id, {
          paymentStatus: "failed"
        });
        return res.status(400).json({ 
          message: paymentResult.error || "Failed to initiate payment" 
        });
      }

      return res.json({
        success: true,
        redirectUrl: paymentResult.redirectUrl,
        registrationId: registration.registrationId,
        merchantTransactionId
      });
    } catch (error) {
      console.error("Error initiating PhonePe payment:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/phonepe/callback", async (req: Request, res) => {
    try {
      console.log("PhonePe callback received:", JSON.stringify(req.body));
      
      let merchantTransactionId: string | undefined;
      let transactionId: string | undefined;
      let code: string | undefined;
      
      if (req.body.response) {
        try {
          const decodedResponse = Buffer.from(req.body.response, 'base64').toString('utf-8');
          const paymentData = JSON.parse(decodedResponse);
          console.log("Decoded PhonePe callback:", JSON.stringify(paymentData));
          
          merchantTransactionId = paymentData.data?.merchantTransactionId;
          transactionId = paymentData.data?.transactionId;
          code = paymentData.code;
        } catch (decodeError) {
          console.error("Failed to decode callback response:", decodeError);
        }
      } else {
        merchantTransactionId = req.body.merchantTransactionId;
        transactionId = req.body.transactionId;
        code = req.body.code;
      }
      
      if (!merchantTransactionId) {
        console.error("Missing transaction ID in callback");
        return res.status(400).json({ message: "Missing transaction ID" });
      }

      const registration = await storage.getRegistrationByMerchantTransactionId(merchantTransactionId);
      
      if (!registration) {
        console.error("Registration not found for transaction:", merchantTransactionId);
        return res.status(404).json({ message: "Registration not found" });
      }

      const paymentStatus = code === 'PAYMENT_SUCCESS' ? 'paid' : 'failed';
      
      await storage.updateRegistrationPayment(registration.id, {
        phonepeTransactionId: transactionId,
        paymentStatus
      });

      if (paymentStatus === 'paid') {
        const baseUrl = resolveBaseUrl(req);
        
        if (registration.registrationType === 'speaker') {
          sendSpeakerConfirmationEmail(registration).catch((err) => {
            console.error('Failed to send speaker confirmation email:', err);
          });
        } else {
          const ticketUrl = `${baseUrl}/ticket/${registration.registrationId}`;
          sendRegistrationEmail(registration, ticketUrl).catch((err) => {
            console.error('Failed to send registration emails:', err);
          });
        }
      }

      console.log("Callback processed successfully, payment status:", paymentStatus);
      return res.json({ success: true });
    } catch (error) {
      console.error("Error processing PhonePe callback:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/phonepe/status/:merchantTransactionId", async (req: Request, res) => {
    try {
      const { merchantTransactionId } = req.params;
      
      const registration = await storage.getRegistrationByMerchantTransactionId(merchantTransactionId);
      
      if (!registration) {
        return res.status(404).json({ message: "Registration not found" });
      }

      if (registration.paymentStatus === 'paid') {
        return res.json({
          success: true,
          status: 'SUCCESS',
          registrationId: registration.registrationId
        });
      }

      const statusResult = await checkPaymentStatus(merchantTransactionId);

      if (statusResult.success && statusResult.status === 'SUCCESS') {
        await storage.updateRegistrationPayment(registration.id, {
          phonepeTransactionId: statusResult.transactionId,
          paymentStatus: 'paid'
        });

        const baseUrl = resolveBaseUrl(req);
        
        if (registration.registrationType === 'speaker') {
          sendSpeakerConfirmationEmail(registration).catch((err) => {
            console.error('Failed to send speaker confirmation email:', err);
          });
        } else {
          const ticketUrl = `${baseUrl}/ticket/${registration.registrationId}`;
          sendRegistrationEmail(registration, ticketUrl).catch((err) => {
            console.error('Failed to send registration emails:', err);
          });

          // Send admin notification with referral code info
          sendAdminNotificationEmail(registration, ticketUrl).catch((err) => {
            console.error('Failed to send admin notification:', err);
          });
        }

        return res.json({
          success: true,
          status: 'SUCCESS',
          registrationId: registration.registrationId
        });
      }

      return res.json({
        success: false,
        status: statusResult.status,
        error: statusResult.error
      });
    } catch (error) {
      console.error("Error checking payment status:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create Razorpay order for existing registration (called from payment-success page)
  app.post("/api/razorpay/create-order", async (req: Request, res) => {
    try {
      const { registrationId, registrationData, amount, referralCode } = req.body;

      console.log("Razorpay create-order request:", { registrationId, hasRegistrationData: !!registrationData, amount, referralCode });

      // Handle two cases: 1) Existing registration (just registrationId), 2) New registration (registrationData + amount)
      if (registrationId) {
        // Case 1: Create order for existing registration after confirmation
        console.log("Looking up registration by ID:", registrationId);
        const registration = await storage.getRegistrationByRegistrationId(registrationId);
        
        if (!registration) {
          console.error("❌ Registration not found for ID:", registrationId);
          return res.status(404).json({ 
            message: "Registration not found",
            registrationId
          });
        }
        
        console.log(`✓ Found registration: ${registration.fullName} (DB ID: ${registration.id})`);

        // Calculate amount based on registration type
        let orderAmount = 199; // Default
        if (registration.registrationType === 'pitch-room') {
          const teamCount = [registration.teamMember1Name, registration.teamMember2Name, registration.teamMember3Name].filter(Boolean).length || 1;
          orderAmount = 199 * teamCount;
        } else if (registration.registrationType === 'session') {
          orderAmount = 199;
        } else if (registration.registrationType === 'contest') {
          orderAmount = registration.ticketCategory === 'platinum' ? 1299 : registration.ticketCategory === 'gold' ? 599 : 199;
        } else if (registration.registrationType === 'session-ticket') {
          orderAmount = registration.ticketCategory === 'platinum' ? 1299 : registration.ticketCategory === 'gold' ? 599 : 199;
        }

        // Apply referral code discount if provided
        let discountPercentage = 0;
        let discountedAmount = orderAmount;
        if (referralCode) {
          const referralCodeData = await storage.getReferralCodeByCode(referralCode);
          if (referralCodeData && referralCodeData.isActive) {
            discountPercentage = referralCodeData.discountPercentage;
            discountedAmount = Math.round(orderAmount * (100 - discountPercentage) / 100);
            console.log(`✓ Referral code applied: ${referralCode} - ${discountPercentage}% discount`);
          } else {
            console.warn(`⚠️ Invalid or inactive referral code: ${referralCode}`);
          }
        }

        const receipt = `RZP${Date.now()}${randomUUID().slice(0, 8)}`;
        const orderResult = await createRazorpayOrder({
          amount: discountedAmount,
          receipt,
          notes: {
            registrationId: registration.registrationId,
            fullName: registration.fullName,
            email: registration.email,
            discountCode: referralCode || "none",
            discountPercentage: discountPercentage
          }
        });

        if (!orderResult.success || !orderResult.order) {
          return res.status(400).json({ message: orderResult.error || "Failed to create order" });
        }

        await storage.updateRegistrationPayment(registration.id, {
          razorpayOrderId: orderResult.order.id,
          discountedAmount: discountedAmount,
          discountPercentage: discountPercentage
        });

        console.log("Razorpay order created for existing registration:", orderResult.order.id, `Final amount: ${discountedAmount}`);
        return res.json({
          success: true,
          razorpayOrderId: orderResult.order.id,
          amount: discountedAmount,
          originalAmount: orderAmount,
          discountPercentage: discountPercentage,
          discountedAmount: discountedAmount,
          razorpayKeyId: orderResult.keyId,
          registrationId: registration.registrationId
        });
      } else if (registrationData && amount) {
        // Case 2: Create order for new registration
        console.warn("⚠️ Received new registration data with amount - use /api/razorpay/create-order-new instead");
        return res.status(400).json({ 
          message: "Use /api/razorpay/create-order-new endpoint for new registrations",
          hint: "Please provide registrationId for existing registrations"
        });
      } else {
        console.error("❌ Invalid request - missing registrationId and registrationData");
        return res.status(400).json({ 
          message: "Registration ID or registration data is required",
          received: { hasRegistrationId: !!registrationId, hasRegistrationData: !!registrationData, amount }
        });
      }
    } catch (error) {
      console.error("Razorpay order creation error:", error);
      return res.status(500).json({
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Legacy Razorpay create-order endpoint (for new registrations)
  app.post("/api/razorpay/create-order-new", async (req: Request, res) => {
    try {
      const { registrationData, amount, referralCode } = req.body;

      if (!registrationData || !amount) {
        return res.status(400).json({
          message: "Registration data and amount are required"
        });
      }

      // Apply referral code discount if provided
      let discountPercentage = 0;
      let discountedAmount = Number(amount);
      if (referralCode) {
        const referralCodeData = await storage.getReferralCodeByCode(referralCode);
        if (referralCodeData && referralCodeData.isActive) {
          discountPercentage = referralCodeData.discountPercentage;
          discountedAmount = Math.round(Number(amount) * (100 - discountPercentage) / 100);
          console.log(`✓ Referral code applied: ${referralCode} - ${discountPercentage}% discount`);
        } else {
          console.warn(`⚠️ Invalid or inactive referral code: ${referralCode}`);
        }
      }

      const result = insertRegistrationSchema.safeParse({
        ...registrationData,
        referralCode: referralCode || undefined,
        paymentStatus: "pending",
        paymentScreenshot: "razorpay_payment"
      });

      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({
          message: "Validation failed",
          error: validationError.toString()
        });
      }

      const receipt = `RZP${Date.now()}${randomUUID().slice(0, 8)}`;
      
      const registrationWithPayment = {
        ...result.data,
        razorpayOrderId: receipt,
        paymentAmount: String(discountedAmount),
        discountedAmount: discountedAmount,
        discountPercentage: discountPercentage
      };

      const registration = await storage.createRegistration(registrationWithPayment as any);

      const orderResult = await createRazorpayOrder({
        amount: discountedAmount,
        receipt,
        notes: {
          registrationId: String(registration.id),
          fullName: registrationData.fullName,
          email: registrationData.email,
          discountCode: referralCode || "none",
          discountPercentage: discountPercentage
        }
      });

      if (!orderResult.success || !orderResult.order) {
        await storage.updateRegistrationPayment(registration.id, {
          paymentStatus: "failed"
        });
        return res.status(400).json({
          message: orderResult.error || "Failed to create order"
        });
      }

      await storage.updateRegistrationPayment(registration.id, {
        razorpayOrderId: orderResult.order.id
      });

      console.log("Razorpay order created:", orderResult.order.id, `Final amount: ${discountedAmount}`);
      return res.json({
        success: true,
        order: orderResult.order,
        keyId: orderResult.keyId,
        registrationId: registration.registrationId,
        amount: discountedAmount,
        originalAmount: Number(amount),
        discountPercentage: discountPercentage,
        discountedAmount: discountedAmount,
        prefill: {
          name: registrationData.fullName,
          email: registrationData.email,
          contact: registrationData.phone
        }
      });
    } catch (error) {
      console.error("Razorpay order creation error:", error);
      return res.status(500).json({
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.post("/api/razorpay/verify", async (req: Request, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, registrationId } = req.body;

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({
          message: "Missing payment verification parameters"
        });
      }

      const verifyResult = verifyRazorpayPayment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      });

      if (!verifyResult.success) {
        console.error("Razorpay verification failed:", verifyResult.error);
        return res.status(400).json({
          success: false,
          message: verifyResult.error || "Payment verification failed"
        });
      }

      const registration = await storage.getRegistrationByRazorpayOrderId(razorpay_order_id);

      if (!registration) {
        console.error("❌ Registration not found for Razorpay order:", razorpay_order_id);
        return res.status(404).json({
          success: false,
          message: "Registration not found"
        });
      }

      console.log(`🔄 Updating registration status to PAID for ${registration.fullName} (DB ID: ${registration.id})`);
      
      const updatedReg = await storage.updateRegistrationPayment(registration.id, {
        razorpayPaymentId: razorpay_payment_id,
        paymentStatus: 'paid'
      });

      if (!updatedReg || updatedReg.paymentStatus !== 'paid') {
        console.error("❌ Failed to update payment status in database", { 
          updatedStatus: updatedReg?.paymentStatus,
          registrationId: registration.registrationId 
        });
      } else {
        console.log(`✓ Database updated successfully: paymentStatus = '${updatedReg.paymentStatus}'`);
      }

      const baseUrl = resolveBaseUrl(req);
      const ticketUrl = `${baseUrl}/ticket/${registration.registrationId}`;
      
      sendRegistrationEmail(registration, ticketUrl).catch((err) => {
        console.error('Failed to send registration emails:', err);
      });

      // Send admin notification with referral code info
      sendAdminNotificationEmail(registration, ticketUrl).catch((err) => {
        console.error('Failed to send admin notification:', err);
      });

      // Send referral code usage notification if code was used
      if (registration.referralCode) {
        sendReferralCodeUsedNotificationEmail(
          registration.fullName,
          registration.email,
          registration.referralCode,
          registration.registrationId
        ).catch((err) => {
          console.error('Failed to send referral code usage notification:', err);
        });
      }

      console.log(`✓ Payment verified for ${registration.fullName} (ID: ${registration.registrationId}) - Payment ID: ${razorpay_payment_id}`);
      console.log(`✓ Registration now shows in Admin Panel under 'Registrations' tab with status: PAID`);
      return res.json({
        success: true,
        registrationId: registration.registrationId
      });
    } catch (error) {
      console.error("Razorpay verification error:", error);
      return res.status(500).json({
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Bulk Registration Routes
  app.post("/api/bulk-register", upload.single('paymentScreenshot'), async (req: Request, res) => {
    try {
      const file = req.file;
      
      if (!file) {
        return res.status(400).json({ 
          message: "Payment screenshot is required for bulk registration." 
        });
      }
      
      const paymentScreenshotPath = `/uploads/${file.filename}`;
      
      // Get expected amount from request (calculate based on number of students)
      const numberOfStudents = parseInt(req.body.numberOfStudents) || 1;
      const pricePerStudent = parseInt(req.body.pricePerStudent) || 149;
      const expectedAmount = parseInt(req.body.expectedAmount) || (numberOfStudents * pricePerStudent);
      
      // AI-powered payment verification for bulk registration
      console.log(`Verifying bulk payment screenshot with AI for ${numberOfStudents} students, expected amount: ${expectedAmount}`);
      const verificationResult = await verifyBulkPaymentScreenshot(paymentScreenshotPath, expectedAmount, numberOfStudents);
      console.log("Bulk payment verification result:", JSON.stringify(verificationResult, null, 2));
      
      if (!verificationResult.isValid) {
        // Delete the uploaded file since verification failed
        const fullPath = `${process.cwd()}${paymentScreenshotPath}`;
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
        return res.status(400).json({ 
          message: "Payment verification failed",
          error: verificationResult.reason,
          verification: {
            isValid: false,
            confidence: verificationResult.confidence,
            detectedAmount: verificationResult.amount,
            expectedAmount: expectedAmount,
            detectedRecipient: verificationResult.recipientName
          }
        });
      }
      
      const data = {
        ...req.body,
        paymentScreenshot: paymentScreenshotPath,
        paymentStatus: "ai_verified",
      };
      
      const result = insertBulkRegistrationSchema.safeParse(data);
      
      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({ 
          message: "Validation failed", 
          error: validationError.toString() 
        });
      }
      
      const bulkRegistration = await storage.createBulkRegistration(result.data);
      
      // Create individual student tickets
      const studentTickets = [];
      
      for (let i = 1; i <= numberOfStudents; i++) {
        const studentRegistrationId = `${bulkRegistration.bulkRegistrationId}-S${String(i).padStart(3, '0')}`;
        const student = await storage.createBulkStudent({
          bulkRegistrationId: bulkRegistration.bulkRegistrationId,
          studentRegistrationId,
          studentNumber: String(i),
        });
        studentTickets.push(student);
      }
      
      return res.status(201).json({ 
        message: "Bulk registration successful - Payment verified by AI", 
        bulkRegistration,
        studentTickets,
        verification: {
          isValid: true,
          confidence: verificationResult.confidence,
          detectedAmount: verificationResult.amount,
          expectedAmount: expectedAmount,
          transactionId: verificationResult.transactionId
        }
      });
    } catch (error) {
      console.error("Error creating bulk registration:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/bulk-phonepe/initiate", async (req: Request, res) => {
    try {
      const { bulkRegistrationData, amount } = req.body;
      
      if (!bulkRegistrationData || !amount) {
        return res.status(400).json({ 
          message: "Bulk registration data and amount are required" 
        });
      }

      const result = insertBulkRegistrationSchema.safeParse({
        ...bulkRegistrationData,
        paymentStatus: "pending",
        paymentScreenshot: "phonepe_payment"
      });
      
      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({ 
          message: "Validation failed", 
          error: validationError.toString() 
        });
      }

      const merchantTransactionId = `MTB${Date.now()}${randomUUID().slice(0, 8)}`;
      
      const registrationWithPayment = {
        ...result.data,
        phonepeMerchantTransactionId: merchantTransactionId,
      };

      const bulkRegistration = await storage.createBulkRegistration(registrationWithPayment as any);

      const baseUrl = resolveBaseUrl(req);

      const paymentResult = await initiatePayment({
        merchantTransactionId,
        amount: Number(amount),
        userId: bulkRegistration.id,
        userPhone: bulkRegistrationData.mentorPhone,
        userName: bulkRegistrationData.mentorName,
        redirectUrl: `${baseUrl}/bulk-payment-status/${merchantTransactionId}`,
        callbackUrl: `${baseUrl}/api/bulk-phonepe/callback`
      });

      if (!paymentResult.success || !paymentResult.redirectUrl) {
        await storage.updateBulkRegistrationPayment(bulkRegistration.id, {
          paymentStatus: "failed"
        });
        return res.status(400).json({ 
          message: paymentResult.error || "Failed to initiate payment" 
        });
      }

      return res.json({
        success: true,
        redirectUrl: paymentResult.redirectUrl,
        bulkRegistrationId: bulkRegistration.bulkRegistrationId,
        merchantTransactionId
      });
    } catch (error) {
      console.error("Error initiating bulk PhonePe payment:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/bulk-phonepe/callback", async (req: Request, res) => {
    try {
      console.log("Bulk PhonePe callback received:", JSON.stringify(req.body));
      
      const { response } = req.body;
      
      if (!response) {
        return res.redirect('/bulk-payment-status/error');
      }

      const decodedResponse = Buffer.from(response, 'base64').toString('utf-8');
      const paymentData = JSON.parse(decodedResponse);
      
      const merchantTransactionId = paymentData.data?.merchantTransactionId;
      
      if (!merchantTransactionId) {
        return res.redirect('/bulk-payment-status/error');
      }

      const bulkRegistration = await storage.getBulkRegistrationByMerchantTransactionId(merchantTransactionId);
      
      if (!bulkRegistration) {
        return res.redirect('/bulk-payment-status/error');
      }

      if (paymentData.code === 'PAYMENT_SUCCESS') {
        await storage.updateBulkRegistrationPayment(bulkRegistration.id, {
          phonepeTransactionId: paymentData.data?.transactionId,
          paymentStatus: 'paid'
        });

        // Create individual student tickets
        const numberOfStudents = parseInt(bulkRegistration.numberOfStudents);
        
        for (let i = 1; i <= numberOfStudents; i++) {
          const studentRegistrationId = `${bulkRegistration.bulkRegistrationId}-S${String(i).padStart(3, '0')}`;
          await storage.createBulkStudent({
            bulkRegistrationId: bulkRegistration.bulkRegistrationId,
            studentRegistrationId,
            studentNumber: String(i),
          });
        }
      } else {
        await storage.updateBulkRegistrationPayment(bulkRegistration.id, {
          paymentStatus: 'failed'
        });
      }

      return res.redirect(`/bulk-payment-status/${merchantTransactionId}`);
    } catch (error) {
      console.error("Error processing bulk PhonePe callback:", error);
      return res.redirect('/bulk-payment-status/error');
    }
  });

  app.get("/api/bulk-phonepe/status/:merchantTransactionId", async (req: Request, res) => {
    try {
      const { merchantTransactionId } = req.params;
      
      const bulkRegistration = await storage.getBulkRegistrationByMerchantTransactionId(merchantTransactionId);
      
      if (!bulkRegistration) {
        return res.status(404).json({ message: "Bulk registration not found" });
      }

      if (bulkRegistration.paymentStatus === 'paid') {
        const studentTickets = await storage.getBulkStudentsByBulkRegistrationId(bulkRegistration.bulkRegistrationId);
        return res.json({
          success: true,
          status: 'SUCCESS',
          bulkRegistrationId: bulkRegistration.bulkRegistrationId,
          studentTickets
        });
      }

      const statusResult = await checkPaymentStatus(merchantTransactionId);

      if (statusResult.success && statusResult.status === 'SUCCESS') {
        await storage.updateBulkRegistrationPayment(bulkRegistration.id, {
          phonepeTransactionId: statusResult.transactionId,
          paymentStatus: 'paid'
        });

        // Create individual student tickets if not already created
        const existingStudents = await storage.getBulkStudentsByBulkRegistrationId(bulkRegistration.bulkRegistrationId);
        
        if (existingStudents.length === 0) {
          const numberOfStudents = parseInt(bulkRegistration.numberOfStudents);
          
          for (let i = 1; i <= numberOfStudents; i++) {
            const studentRegistrationId = `${bulkRegistration.bulkRegistrationId}-S${String(i).padStart(3, '0')}`;
            await storage.createBulkStudent({
              bulkRegistrationId: bulkRegistration.bulkRegistrationId,
              studentRegistrationId,
              studentNumber: String(i),
            });
          }
        }

        const studentTickets = await storage.getBulkStudentsByBulkRegistrationId(bulkRegistration.bulkRegistrationId);

        return res.json({
          success: true,
          status: 'SUCCESS',
          bulkRegistrationId: bulkRegistration.bulkRegistrationId,
          studentTickets
        });
      }

      return res.json({
        success: false,
        status: statusResult.status,
        error: statusResult.error
      });
    } catch (error) {
      console.error("Error checking bulk payment status:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/bulk-registrations", async (req, res) => {
    try {
      const bulkRegistrations = await storage.getBulkRegistrations();
      return res.json(bulkRegistrations);
    } catch (error) {
      console.error("Error fetching bulk registrations:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/bulk-ticket/:bulkRegistrationId", async (req, res) => {
    try {
      const { bulkRegistrationId } = req.params;
      const bulkRegistration = await storage.getBulkRegistrationByBulkRegistrationId(bulkRegistrationId);
      
      if (!bulkRegistration) {
        return res.status(404).json({ message: "Bulk registration not found" });
      }
      
      const studentTickets = await storage.getBulkStudentsByBulkRegistrationId(bulkRegistrationId);
      
      return res.json({
        bulkRegistration,
        studentTickets
      });
    } catch (error) {
      console.error("Error fetching bulk ticket:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/bulk-student-ticket/:studentRegistrationId", async (req, res) => {
    try {
      const { studentRegistrationId } = req.params;
      const student = await storage.getBulkStudentByStudentRegistrationId(studentRegistrationId);
      
      if (!student) {
        return res.status(404).json({ message: "Student ticket not found" });
      }
      
      const bulkRegistration = await storage.getBulkRegistrationByBulkRegistrationId(student.bulkRegistrationId);
      
      return res.json({
        student,
        bulkRegistration
      });
    } catch (error) {
      console.error("Error fetching student ticket:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/bulk-registrations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteBulkRegistration(id);
      return res.json({ message: "Bulk registration deleted successfully" });
    } catch (error) {
      console.error("Error deleting bulk registration:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Upload PDF for bulk registration
  app.post("/api/upload-students-pdf", upload.single('studentsPdf'), async (req: Request, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No PDF file uploaded" });
      }
      return res.json({ 
        success: true,
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`
      });
    } catch (error) {
      console.error("Error uploading students PDF:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Serve uploaded files
  app.get("/uploads/:filename", (req, res) => {
    try {
      const { filename } = req.params;
      const filePath = path.join(uploadDir, filename);
      if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
      } else {
        res.status(404).json({ message: "File not found" });
      }
    } catch (error) {
      console.error("Error serving file:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Alternative PhonePe routes without /api prefix for callback compatibility
  app.post("/phonepe/initiate", async (req: Request, res) => {
    try {
      const { registrationData, amount } = req.body;
      
      if (!registrationData || !amount) {
        return res.status(400).json({ 
          message: "Registration data and amount are required" 
        });
      }

      const result = insertRegistrationSchema.safeParse({
        ...registrationData,
        paymentStatus: "pending",
        paymentScreenshot: "phonepe_payment"
      });
      
      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({ 
          message: "Validation failed", 
          error: validationError.toString() 
        });
      }

      const merchantTransactionId = `MT${Date.now()}${randomUUID().slice(0, 8)}`;
      
      const registrationWithPayment = {
        ...result.data,
        phonepeMerchantTransactionId: merchantTransactionId,
        paymentAmount: String(amount)
      };

      const registration = await storage.createRegistration(registrationWithPayment as any);

      const baseUrl = resolveBaseUrl(req);

      const paymentResult = await initiatePayment({
        merchantTransactionId,
        amount: Number(amount),
        userId: registration.id,
        userPhone: registrationData.phone,
        userName: registrationData.fullName,
        redirectUrl: `${baseUrl}/payment-status/${merchantTransactionId}`,
        callbackUrl: `${baseUrl}/api/phonepe/callback`
      });

      if (!paymentResult.success || !paymentResult.redirectUrl) {
        await storage.updateRegistrationPayment(registration.id, {
          paymentStatus: "failed"
        });
        return res.status(400).json({ 
          message: paymentResult.error || "Failed to initiate payment" 
        });
      }

      return res.json({
        success: true,
        redirectUrl: paymentResult.redirectUrl,
        registrationId: registration.registrationId,
        merchantTransactionId
      });
    } catch (error) {
      console.error("Error initiating PhonePe payment:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/phonepe/callback", async (req: Request, res) => {
    try {
      console.log("PhonePe callback received (alt route):", JSON.stringify(req.body));
      
      let merchantTransactionId: string | undefined;
      let transactionId: string | undefined;
      let code: string | undefined;
      
      if (req.body.response) {
        try {
          const decodedResponse = Buffer.from(req.body.response, 'base64').toString('utf-8');
          const paymentData = JSON.parse(decodedResponse);
          console.log("Decoded PhonePe callback:", JSON.stringify(paymentData));
          
          merchantTransactionId = paymentData.data?.merchantTransactionId;
          transactionId = paymentData.data?.transactionId;
          code = paymentData.code;
        } catch (decodeError) {
          console.error("Failed to decode callback response:", decodeError);
        }
      } else {
        merchantTransactionId = req.body.merchantTransactionId;
        transactionId = req.body.transactionId;
        code = req.body.code;
      }
      
      if (!merchantTransactionId) {
        console.error("Missing transaction ID in callback");
        return res.status(400).json({ message: "Missing transaction ID" });
      }

      const registration = await storage.getRegistrationByMerchantTransactionId(merchantTransactionId);
      
      if (!registration) {
        console.error("Registration not found for transaction:", merchantTransactionId);
        return res.status(404).json({ message: "Registration not found" });
      }

      const paymentStatus = code === 'PAYMENT_SUCCESS' ? 'paid' : 'failed';
      
      await storage.updateRegistrationPayment(registration.id, {
        phonepeTransactionId: transactionId,
        paymentStatus
      });

      if (paymentStatus === 'paid') {
        const baseUrl = resolveBaseUrl(req);
        
        if (registration.registrationType === 'speaker') {
          sendSpeakerConfirmationEmail(registration).catch((err) => {
            console.error('Failed to send speaker confirmation email:', err);
          });
        } else {
          const ticketUrl = `${baseUrl}/ticket/${registration.registrationId}`;
          sendRegistrationEmail(registration, ticketUrl).catch((err) => {
            console.error('Failed to send registration emails:', err);
          });
        }
      }

      console.log("Callback processed successfully, payment status:", paymentStatus);
      return res.json({ success: true });
    } catch (error) {
      console.error("Error processing PhonePe callback:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/phonepe/status/:txnId", async (req: Request, res) => {
    try {
      const { txnId } = req.params;
      
      const registration = await storage.getRegistrationByMerchantTransactionId(txnId);
      
      if (!registration) {
        return res.status(404).json({ message: "Registration not found" });
      }

      if (registration.paymentStatus === 'paid') {
        return res.json({
          success: true,
          status: 'SUCCESS',
          registrationId: registration.registrationId
        });
      }

      const statusResult = await checkPaymentStatus(txnId);

      if (statusResult.success && statusResult.status === 'SUCCESS') {
        await storage.updateRegistrationPayment(registration.id, {
          phonepeTransactionId: statusResult.transactionId,
          paymentStatus: 'paid'
        });

        const baseUrl = resolveBaseUrl(req);
        
        if (registration.registrationType === 'speaker') {
          sendSpeakerConfirmationEmail(registration).catch((err) => {
            console.error('Failed to send speaker confirmation email:', err);
          });
        } else {
          const ticketUrl = `${baseUrl}/ticket/${registration.registrationId}`;
          sendRegistrationEmail(registration, ticketUrl).catch((err) => {
            console.error('Failed to send registration emails:', err);
          });

          // Send admin notification with referral code info
          sendAdminNotificationEmail(registration, ticketUrl).catch((err) => {
            console.error('Failed to send admin notification:', err);
          });
        }

        return res.json({
          success: true,
          status: 'SUCCESS',
          registrationId: registration.registrationId
        });
      }

      return res.json({
        success: false,
        status: statusResult.status,
        error: statusResult.error
      });
    } catch (error) {
      console.error("Error checking payment status:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Additional PhonePe routes as requested: /phonepe/pay, /phonepe/create
  const DEPLOYMENT_BASE_URL = process.env.DEPLOYMENT_URL || 'https://kef-e3hu.onrender.com';

  app.post("/phonepe/pay", async (req: Request, res) => {
    try {
      const { registrationData, amount } = req.body;
      
      if (!registrationData || !amount) {
        return res.status(400).json({ 
          message: "Registration data and amount are required" 
        });
      }

      const result = insertRegistrationSchema.safeParse({
        ...registrationData,
        paymentStatus: "pending",
        paymentScreenshot: "phonepe_payment"
      });
      
      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({ 
          message: "Validation failed", 
          error: validationError.toString() 
        });
      }

      const merchantTransactionId = `MT${Date.now()}${randomUUID().slice(0, 8)}`;
      
      const registrationWithPayment = {
        ...result.data,
        phonepeMerchantTransactionId: merchantTransactionId,
        paymentAmount: String(amount)
      };

      const registration = await storage.createRegistration(registrationWithPayment as any);

      const paymentResult = await initiatePayment({
        merchantTransactionId,
        amount: Number(amount),
        userId: registration.id,
        userPhone: registrationData.phone,
        userName: registrationData.fullName,
        redirectUrl: `${DEPLOYMENT_BASE_URL}/payment-status/${merchantTransactionId}`,
        callbackUrl: `${DEPLOYMENT_BASE_URL}/phonepe/callback`
      });

      if (!paymentResult.success || !paymentResult.redirectUrl) {
        await storage.updateRegistrationPayment(registration.id, {
          paymentStatus: "failed"
        });
        return res.status(400).json({ 
          message: paymentResult.error || "Failed to initiate payment" 
        });
      }

      return res.json({
        success: true,
        redirectUrl: paymentResult.redirectUrl,
        registrationId: registration.registrationId,
        merchantTransactionId
      });
    } catch (error) {
      console.error("Error initiating PhonePe payment (/phonepe/pay):", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/phonepe/create", async (req: Request, res) => {
    try {
      const { registrationData, amount } = req.body;
      
      if (!registrationData || !amount) {
        return res.status(400).json({ 
          message: "Registration data and amount are required" 
        });
      }

      const result = insertRegistrationSchema.safeParse({
        ...registrationData,
        paymentStatus: "pending",
        paymentScreenshot: "phonepe_payment"
      });
      
      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({ 
          message: "Validation failed", 
          error: validationError.toString() 
        });
      }

      const merchantTransactionId = `MT${Date.now()}${randomUUID().slice(0, 8)}`;
      
      const registrationWithPayment = {
        ...result.data,
        phonepeMerchantTransactionId: merchantTransactionId,
        paymentAmount: String(amount)
      };

      const registration = await storage.createRegistration(registrationWithPayment as any);

      const paymentResult = await initiatePayment({
        merchantTransactionId,
        amount: Number(amount),
        userId: registration.id,
        userPhone: registrationData.phone,
        userName: registrationData.fullName,
        redirectUrl: `${DEPLOYMENT_BASE_URL}/payment-status/${merchantTransactionId}`,
        callbackUrl: `${DEPLOYMENT_BASE_URL}/phonepe/callback`
      });

      if (!paymentResult.success || !paymentResult.redirectUrl) {
        await storage.updateRegistrationPayment(registration.id, {
          paymentStatus: "failed"
        });
        return res.status(400).json({ 
          message: paymentResult.error || "Failed to initiate payment" 
        });
      }

      return res.json({
        success: true,
        redirectUrl: paymentResult.redirectUrl,
        registrationId: registration.registrationId,
        merchantTransactionId
      });
    } catch (error) {
      console.error("Error initiating PhonePe payment (/phonepe/create):", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Speaker Applications - Razorpay integration
  app.post("/api/validate-referral-code", async (req, res) => {
    try {
      const { code } = req.body;
      if (!code) {
        return res.json({ valid: false });
      }
      const referralCode = await storage.getReferralCodeByCode(code.toUpperCase());
      if (referralCode && referralCode.isActive) {
        return res.json({ valid: true, discount: referralCode.discountPercentage });
      }
      return res.json({ valid: false });
    } catch (error) {
      console.error("Error validating referral code:", error);
      return res.json({ valid: false });
    }
  });

  app.post("/api/speaker-razorpay/create-order", async (req, res) => {
    try {
      const { email, contactNumber, founderName, startupName, referralCode, amount } = req.body;
      const finalAmount = amount || 3999;
      
      const result = await createRazorpayOrder({
        amount: finalAmount,
        currency: "INR",
        receipt: `speaker_${Date.now()}`,
        notes: {
          founderName,
          startupName,
          email,
          contactNumber,
          referralCode: referralCode || "",
          type: "speaker_application"
        }
      });

      if (!result.success) {
        return res.status(400).json({ 
          success: false,
          error: result.error || "Failed to create order"
        });
      }

      return res.json({
        success: true,
        orderId: result.order?.id,
        amount: result.order?.amount,
        keyId: result.keyId
      });
    } catch (error) {
      console.error("Error creating speaker Razorpay order:", error);
      return res.status(500).json({ 
        success: false,
        error: "Failed to create payment order"
      });
    }
  });

  app.post("/api/speaker-razorpay/verify", async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, applicationData } = req.body;
      
      const verifyResult = verifyRazorpayPayment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      });

      if (!verifyResult.success) {
        return res.status(400).json({
          success: false,
          error: verifyResult.error
        });
      }

      // Store the application in database after successful payment
      try {
        const application = await storage.createSpeakerApplication({
          founderName: applicationData.founderName,
          startupName: applicationData.startupName,
          designation: applicationData.designation,
          sector: applicationData.sector,
          yearFounded: applicationData.yearFounded,
          startupBrief: applicationData.startupBrief,
          startupStory: applicationData.startupStory,
          whyFeature: applicationData.whyFeature || "",
          website: applicationData.website,
          contactNumber: applicationData.contactNumber,
          email: applicationData.email,
          referralCode: applicationData.referralCode,
          razorpayPaymentId: razorpay_payment_id,
          razorpayOrderId: razorpay_order_id,
          paymentStatus: "completed",
          status: "pending"
        });

        // Send speaker confirmation email
        console.log(`📧 Sending speaker confirmation email to: ${applicationData.email}`);
        try {
          const speakerEmailResult = await sendSpeakerConfirmationEmail({
            id: application.id.toString(),
            registrationId: application.id.toString(),
            fullName: applicationData.founderName,
            email: applicationData.email,
            phone: applicationData.contactNumber,
            age: "",
            registrationType: "speaker",
          } as any);
          
          if (speakerEmailResult.success) {
            console.log(`✅ Speaker confirmation email sent successfully to ${applicationData.email}`);
          } else {
            console.error(`❌ Failed to send speaker confirmation email: ${speakerEmailResult.error}`);
          }
        } catch (emailError) {
          console.error(`❌ Error sending speaker confirmation email to ${applicationData.email}:`, emailError);
        }

        // Send admin notification about new speaker application
        console.log(`📧 Sending admin notification about new speaker application`);
        try {
          const baseUrl = resolveBaseUrl(req);
          const speakerTicketUrl = `${baseUrl}/speaker-application/${application.id}`;
          const adminEmailResult = await sendAdminNotificationEmail({
            id: application.id.toString(),
            registrationId: application.id.toString(),
            fullName: applicationData.founderName,
            email: applicationData.email,
            phone: applicationData.contactNumber,
            age: "",
            institution: applicationData.startupName,
            registrationType: "speaker",
            sessionName: `Speaker: ${applicationData.founderName} - ${applicationData.startupName}`,
          } as any, speakerTicketUrl);
          
          if (adminEmailResult.success) {
            console.log(`✅ Admin notification sent successfully for speaker application`);
          } else {
            console.error(`❌ Failed to send admin notification: ${adminEmailResult.error}`);
          }
        } catch (emailError) {
          console.error(`❌ Error sending admin notification email:`, emailError);
        }

        return res.json({
          success: true,
          applicationId: application.id,
          message: "Application submitted successfully - Confirmation email sent"
        });
      } catch (dbError) {
        console.error("Error saving speaker application to database:", dbError);
        return res.status(500).json({
          success: false,
          error: "Failed to save application"
        });
      }
    } catch (error) {
      console.error("Error verifying speaker payment:", error);
      return res.status(500).json({ 
        success: false,
        error: "Failed to verify payment"
      });
    }
  });

  return httpServer;
}
