import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertRegistrationSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";
import QRCode from "qrcode";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

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

  app.post("/api/register", async (req, res) => {
    try {
      const result = insertRegistrationSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({ 
          message: "Validation failed", 
          error: validationError.toString() 
        });
      }
      
      const registration = await storage.createRegistration(result.data);
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

  app.get("/api/qrcode/:registrationId", async (req, res) => {
    try {
      const { registrationId } = req.params;
      const qrUrl = `${process.env.APP_URL || 'http://localhost:5000'}/ticket/${registrationId}`;
      const qrCode = await QRCode.toDataURL(qrUrl);
      return res.json({ qrCode, url: qrUrl });
    } catch (error) {
      console.error("Error generating QR code:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
