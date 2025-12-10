import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertRegistrationSchema, insertInvestorMentorSchema, insertSponsorshipSchema, insertBulkRegistrationSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";
import multer from "multer";
import path from "path";
import fs from "fs";
import { sendRegistrationEmails } from "./email";
import { initiatePayment, checkPaymentStatus } from "./phonepe";
import { randomUUID } from "crypto";
import { resolveBaseUrl } from "./utils/request";

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
        }
      }
    });
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
      
      const baseUrl = resolveBaseUrl(req);
      
      sendRegistrationEmails(registration, baseUrl).catch((err) => {
        console.error('Failed to send registration emails:', err);
      });
      
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
        
        sendRegistrationEmails(registration, baseUrl).catch((err) => {
          console.error('Failed to send registration emails:', err);
        });
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
        
        sendRegistrationEmails(registration, baseUrl).catch((err) => {
          console.error('Failed to send registration emails:', err);
        });

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

  // Bulk Registration Routes
  app.post("/api/bulk-register", upload.single('paymentScreenshot'), async (req: Request, res) => {
    try {
      const file = req.file;
      
      if (!file) {
        return res.status(400).json({ 
          message: "Payment screenshot is required for bulk registration." 
        });
      }
      
      const data = {
        ...req.body,
        paymentScreenshot: `/uploads/${file.filename}`,
        paymentStatus: "screenshot_uploaded",
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
      const numberOfStudents = parseInt(bulkRegistration.numberOfStudents);
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
        message: "Bulk registration successful", 
        bulkRegistration,
        studentTickets 
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
        
        sendRegistrationEmails(registration, baseUrl).catch((err) => {
          console.error('Failed to send registration emails:', err);
        });
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
        
        sendRegistrationEmails(registration, baseUrl).catch((err) => {
          console.error('Failed to send registration emails:', err);
        });

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

  return httpServer;
}
