import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  userType: text("user_type").notNull(),
  message: text("message").notNull(),
});

export const insertContactSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().optional(),
  userType: z.enum(["student", "teacher", "institution", "investor", "sponsor", "other"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contactSubmissions.$inferSelect;

export const registrations = pgTable("registrations", {
  id: varchar("id", { length: 36 }).primaryKey(),
  registrationId: text("registration_id").notNull().unique(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  age: text("age").notNull(),
  institution: text("institution"),
  registrationType: text("registration_type").notNull(),
  contestName: text("contest_name"),
  paymentScreenshot: text("payment_screenshot"),
});

export const insertRegistrationSchema = createInsertSchema(registrations).omit({
  id: true,
  registrationId: true,
}).extend({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  age: z.string().min(1, "Age is required"),
  institution: z.string().min(1, "Institution is required"),
  registrationType: z.enum(["expert-session", "contest"]),
  contestName: z.string().optional(),
  paymentScreenshot: z.string().optional(),
});

export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;
export type Registration = typeof registrations.$inferSelect;

export const users = pgTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
