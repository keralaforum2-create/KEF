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
  participantType: text("participant_type"),
  schoolGrade: text("school_grade"),
  collegeYear: text("college_year"),
  collegeCourse: text("college_course"),
  teamMember1Name: text("team_member_1_name"),
  teamMember2Name: text("team_member_2_name"),
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
  participantType: z.enum(["school-student", "college-student", "common"]).optional(),
  schoolGrade: z.string().optional(),
  collegeYear: z.string().optional(),
  collegeCourse: z.string().optional(),
  teamMember1Name: z.string().optional(),
  teamMember2Name: z.string().optional(),
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

export const investorMentorApplications = pgTable("investor_mentor_applications", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  type: text("type").notNull(),
  companyName: text("company_name"),
  expertise: text("expertise"),
  message: text("message"),
});

export const insertInvestorMentorSchema = createInsertSchema(investorMentorApplications).omit({
  id: true,
}).extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  type: z.enum(["investor", "mentor"]),
  companyName: z.string().optional(),
  expertise: z.string().optional(),
  message: z.string().optional(),
});

export type InsertInvestorMentor = z.infer<typeof insertInvestorMentorSchema>;
export type InvestorMentor = typeof investorMentorApplications.$inferSelect;

export const sponsorshipInquiries = pgTable("sponsorship_inquiries", {
  id: varchar("id", { length: 36 }).primaryKey(),
  companyName: text("company_name").notNull(),
  contactPersonName: text("contact_person_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  sponsorshipLevel: text("sponsorship_level"),
  industry: text("industry"),
  message: text("message"),
});

export const insertSponsorshipSchema = createInsertSchema(sponsorshipInquiries).omit({
  id: true,
}).extend({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  contactPersonName: z.string().min(2, "Contact person name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  sponsorshipLevel: z.string().optional(),
  industry: z.string().optional(),
  message: z.string().optional(),
});

export type InsertSponsorship = z.infer<typeof insertSponsorshipSchema>;
export type Sponsorship = typeof sponsorshipInquiries.$inferSelect;
