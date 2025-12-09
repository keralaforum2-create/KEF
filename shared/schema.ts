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
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
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
  sessionName: text("session_name"),
  ticketCategory: text("ticket_category"),
  participantType: text("participant_type"),
  schoolGrade: text("school_grade"),
  collegeYear: text("college_year"),
  collegeCourse: text("college_course"),
  teamMember1Name: text("team_member_1_name"),
  teamMember2Name: text("team_member_2_name"),
  paymentScreenshot: text("payment_screenshot"),
  pitchStartupName: text("pitch_startup_name"),
  pitchElevatorPitch: text("pitch_elevator_pitch"),
  pitchProblemStatement: text("pitch_problem_statement"),
  pitchProposedSolution: text("pitch_proposed_solution"),
  pitchProductName: text("pitch_product_name"),
  pitchProductDescription: text("pitch_product_description"),
  pitchPricingModel: text("pitch_pricing_model"),
  pitchCostPerUnit: text("pitch_cost_per_unit"),
  pitchSellingPrice: text("pitch_selling_price"),
  pitchProfitPerUnit: text("pitch_profit_per_unit"),
  pitchTotalCapitalRequired: text("pitch_total_capital_required"),
  pitchRevenuePerUser: text("pitch_revenue_per_user"),
  pitchTargetCustomers: text("pitch_target_customers"),
  pitchMarketSize: text("pitch_market_size"),
  pitchCompetitorAnalysis: text("pitch_competitor_analysis"),
  pitchRevenueModel: text("pitch_revenue_model"),
  pitchRevenueStreams: text("pitch_revenue_streams"),  // JSON string array
  pitchYear1Revenue: text("pitch_year1_revenue"),
  pitchYear2Revenue: text("pitch_year2_revenue"),
  pitchYear3Revenue: text("pitch_year3_revenue"),
  pitchYear4Revenue: text("pitch_year4_revenue"),
  pitchYear5Revenue: text("pitch_year5_revenue"),
  pitchExpectedRoi: text("pitch_expected_roi"),
  pitchBreakevenPeriod: text("pitch_breakeven_period"),
  pitchFeasibilityReasons: text("pitch_feasibility_reasons"),
  pitchCurrentStage: text("pitch_current_stage"),
  pitchSupportingFiles: text("pitch_supporting_files"),
  pitchDemoVideoLink: text("pitch_demo_video_link"),
  pitchDeclarationConfirmed: text("pitch_declaration_confirmed"),
  razorpayPaymentId: text("razorpay_payment_id"),
  razorpayOrderId: text("razorpay_order_id"),
  phonepeMerchantTransactionId: text("phonepe_merchant_transaction_id"),
  phonepeTransactionId: text("phonepe_transaction_id"),
  paymentAmount: text("payment_amount"),
  paymentStatus: text("payment_status"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertRegistrationSchema = createInsertSchema(registrations).omit({
  id: true,
  registrationId: true,
  createdAt: true,
  razorpayPaymentId: true,
  razorpayOrderId: true,
}).extend({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  age: z.string().optional(),
  institution: z.string().optional(),
  registrationType: z.enum(["expert-session", "contest"]),
  contestName: z.string().optional(),
  sessionName: z.string().optional(),
  ticketCategory: z.enum(["normal", "premium"]).optional(),
  participantType: z.enum(["school-student", "college-student", "commoner", "common"]).optional().or(z.literal("")),
  schoolGrade: z.string().optional(),
  collegeYear: z.string().optional(),
  collegeCourse: z.string().optional(),
  teamMember1Name: z.string().optional(),
  teamMember2Name: z.string().optional(),
  paymentScreenshot: z.string().optional(),
  pitchStartupName: z.string().optional(),
  pitchElevatorPitch: z.string().max(300, "Elevator pitch must be under 50 words").optional(),
  pitchProblemStatement: z.string().optional(),
  pitchProposedSolution: z.string().optional(),
  pitchProductName: z.string().optional(),
  pitchProductDescription: z.string().optional(),
  pitchPricingModel: z.string().optional(),
  pitchCostPerUnit: z.string().optional(),
  pitchSellingPrice: z.string().optional(),
  pitchProfitPerUnit: z.string().optional(),
  pitchTotalCapitalRequired: z.string().optional(),
  pitchRevenuePerUser: z.string().optional(),
  pitchTargetCustomers: z.string().optional(),
  pitchMarketSize: z.string().optional(),
  pitchCompetitorAnalysis: z.string().optional(),
  pitchRevenueModel: z.string().optional(),
  pitchRevenueStreams: z.string().optional(),  // JSON string array of revenue streams
  pitchYear1Revenue: z.string().optional(),
  pitchYear2Revenue: z.string().optional(),
  pitchYear3Revenue: z.string().optional(),
  pitchYear4Revenue: z.string().optional(),
  pitchYear5Revenue: z.string().optional(),
  pitchExpectedRoi: z.string().optional(),
  pitchBreakevenPeriod: z.string().optional(),
  pitchFeasibilityReasons: z.string().optional(),
  pitchCurrentStage: z.string().optional(),
  pitchSupportingFiles: z.string().optional(),
  pitchDemoVideoLink: z.string().optional(),
  pitchDeclarationConfirmed: z.string().optional(),
  paymentStatus: z.string().optional(),
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
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertInvestorMentorSchema = createInsertSchema(investorMentorApplications).omit({
  id: true,
  createdAt: true,
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
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSponsorshipSchema = createInsertSchema(sponsorshipInquiries).omit({
  id: true,
  createdAt: true,
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
