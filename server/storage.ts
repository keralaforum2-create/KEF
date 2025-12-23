import { 
  type User, 
  type InsertUser, 
  type Contact, 
  type InsertContact,
  type Registration,
  type InsertRegistration,
  type InvestorMentor,
  type InsertInvestorMentor,
  type Sponsorship,
  type InsertSponsorship,
  type BulkRegistration,
  type InsertBulkRegistration,
  type BulkStudent,
  type InsertBulkStudent,
  type ReferralCode,
  type InsertReferralCode,
  type SpeakerApplication,
  type InsertSpeakerApplication,
  users,
  contactSubmissions,
  registrations,
  investorMentorApplications,
  sponsorshipInquiries,
  bulkRegistrations,
  bulkRegistrationStudents,
  referralCodes,
  speakerApplications,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  createRegistration(registration: InsertRegistration): Promise<Registration>;
  getRegistrations(): Promise<Registration[]>;
  getPaidRegistrations(): Promise<Registration[]>;
  getPendingRegistrations(): Promise<Registration[]>;
  getRegistrationByRegistrationId(registrationId: string): Promise<Registration | undefined>;
  getRegistrationByMerchantTransactionId(merchantTransactionId: string): Promise<Registration | undefined>;
  getRegistrationByRazorpayOrderId(razorpayOrderId: string): Promise<Registration | undefined>;
  updateRegistrationPayment(id: string, paymentData: { phonepeTransactionId?: string; razorpayOrderId?: string; razorpayPaymentId?: string; paymentStatus?: string }): Promise<Registration | undefined>;
  getRegistrationStats(): Promise<{ totalRegistrations: number; totalPaid: number; totalPending: number; contestRegistrations: number; expertSessionRegistrations: number; }>;
  
  createInvestorMentor(application: InsertInvestorMentor): Promise<InvestorMentor>;
  getInvestorMentors(): Promise<InvestorMentor[]>;
  
  createSponsorship(inquiry: InsertSponsorship): Promise<Sponsorship>;
  getSponsorships(): Promise<Sponsorship[]>;
  
  deleteRegistration(id: string): Promise<void>;
  deleteContact(id: string): Promise<void>;
  deleteInvestorMentor(id: string): Promise<void>;
  deleteSponsorship(id: string): Promise<void>;
  
  createBulkRegistration(registration: InsertBulkRegistration): Promise<BulkRegistration>;
  getBulkRegistrations(): Promise<BulkRegistration[]>;
  getBulkRegistrationByBulkRegistrationId(bulkRegistrationId: string): Promise<BulkRegistration | undefined>;
  getBulkRegistrationByMerchantTransactionId(merchantTransactionId: string): Promise<BulkRegistration | undefined>;
  updateBulkRegistrationPayment(id: string, paymentData: { phonepeTransactionId?: string; paymentStatus: string }): Promise<BulkRegistration | undefined>;
  deleteBulkRegistration(id: string): Promise<void>;
  
  createBulkStudent(student: InsertBulkStudent): Promise<BulkStudent>;
  getBulkStudentsByBulkRegistrationId(bulkRegistrationId: string): Promise<BulkStudent[]>;
  getBulkStudentByStudentRegistrationId(studentRegistrationId: string): Promise<BulkStudent | undefined>;
  
  createReferralCode(code: InsertReferralCode): Promise<ReferralCode>;
  getReferralCodes(): Promise<ReferralCode[]>;
  getReferralCodeByCode(code: string): Promise<ReferralCode | undefined>;
  getReferralCodeUsage(): Promise<Array<{ code: string; discountPercentage: number; timesUsed: number; lastUsed?: string }>>;
  updateReferralCode(id: string, data: Partial<InsertReferralCode>): Promise<ReferralCode | undefined>;
  deleteReferralCode(id: string): Promise<void>;
  
  createSpeakerApplication(application: InsertSpeakerApplication): Promise<SpeakerApplication>;
  getSpeakerApplications(): Promise<SpeakerApplication[]>;
  getSpeakers(): Promise<Registration[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const result = await db.insert(users).values({ ...insertUser, id }).returning();
    return result[0];
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const result = await db.insert(contactSubmissions).values({ ...insertContact, id }).returning();
    return result[0];
  }

  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async createRegistration(insertRegistration: InsertRegistration): Promise<Registration> {
    const id = randomUUID();
    const registrationId = `KSF-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    const result = await db.insert(registrations).values({
      id,
      registrationId,
      fullName: insertRegistration.fullName,
      email: insertRegistration.email,
      phone: insertRegistration.phone,
      age: insertRegistration.age,
      institution: insertRegistration.institution,
      registrationType: insertRegistration.registrationType,
      contestName: insertRegistration.contestName,
      sessionName: insertRegistration.sessionName,
      ticketCategory: insertRegistration.ticketCategory,
      participantType: insertRegistration.participantType,
      schoolGrade: insertRegistration.schoolGrade,
      collegeYear: insertRegistration.collegeYear,
      collegeCourse: insertRegistration.collegeCourse,
      teamMember1Name: insertRegistration.teamMember1Name,
      teamMember2Name: insertRegistration.teamMember2Name,
      teamMember3Name: insertRegistration.teamMember3Name,
      paymentScreenshot: insertRegistration.paymentScreenshot,
      profilePhoto: insertRegistration.profilePhoto,
      pitchStartupName: insertRegistration.pitchStartupName,
      pitchElevatorPitch: insertRegistration.pitchElevatorPitch,
      pitchProblemStatement: insertRegistration.pitchProblemStatement,
      pitchProposedSolution: insertRegistration.pitchProposedSolution,
      pitchProductName: insertRegistration.pitchProductName,
      pitchProductDescription: insertRegistration.pitchProductDescription,
      pitchPricingModel: insertRegistration.pitchPricingModel,
      pitchCostPerUnit: insertRegistration.pitchCostPerUnit,
      pitchSellingPrice: insertRegistration.pitchSellingPrice,
      pitchProfitPerUnit: insertRegistration.pitchProfitPerUnit,
      pitchTotalCapitalRequired: insertRegistration.pitchTotalCapitalRequired,
      pitchRevenuePerUser: insertRegistration.pitchRevenuePerUser,
      pitchTargetCustomers: insertRegistration.pitchTargetCustomers,
      pitchMarketSize: insertRegistration.pitchMarketSize,
      pitchCompetitorAnalysis: insertRegistration.pitchCompetitorAnalysis,
      pitchRevenueModel: insertRegistration.pitchRevenueModel,
      pitchRevenueStreams: insertRegistration.pitchRevenueStreams,
      pitchYear1Revenue: insertRegistration.pitchYear1Revenue,
      pitchYear2Revenue: insertRegistration.pitchYear2Revenue,
      pitchYear3Revenue: insertRegistration.pitchYear3Revenue,
      pitchYear4Revenue: insertRegistration.pitchYear4Revenue,
      pitchYear5Revenue: insertRegistration.pitchYear5Revenue,
      pitchExpectedRoi: insertRegistration.pitchExpectedRoi,
      pitchBreakevenPeriod: insertRegistration.pitchBreakevenPeriod,
      pitchFeasibilityReasons: insertRegistration.pitchFeasibilityReasons,
      pitchCurrentStage: insertRegistration.pitchCurrentStage,
      pitchSupportingFiles: insertRegistration.pitchSupportingFiles,
      pitchDemoVideoLink: insertRegistration.pitchDemoVideoLink,
      pitchDeclarationConfirmed: insertRegistration.pitchDeclarationConfirmed,
      speakerPortfolio: insertRegistration.speakerPortfolio,
      speakerLinkedIn: insertRegistration.speakerLinkedIn,
      paymentAmount: insertRegistration.paymentAmount,
      referralCode: insertRegistration.referralCode,
      discountedAmount: insertRegistration.discountedAmount,
      originalAmount: insertRegistration.originalAmount,
      paymentStatus: insertRegistration.paymentStatus,
    } as any).returning();
    return result[0];
  }

  async getRegistrationByRegistrationId(registrationId: string): Promise<Registration | undefined> {
    const result = await db.select().from(registrations).where(eq(registrations.registrationId, registrationId));
    return result[0];
  }

  async getRegistrationByMerchantTransactionId(merchantTransactionId: string): Promise<Registration | undefined> {
    const result = await db.select().from(registrations).where(eq(registrations.phonepeMerchantTransactionId, merchantTransactionId));
    return result[0];
  }

  async getRegistrationByRazorpayOrderId(razorpayOrderId: string): Promise<Registration | undefined> {
    const result = await db.select().from(registrations).where(eq(registrations.razorpayOrderId, razorpayOrderId));
    return result[0];
  }

  async updateRegistrationPayment(id: string, paymentData: { phonepeTransactionId?: string; razorpayOrderId?: string; razorpayPaymentId?: string; paymentStatus?: string }): Promise<Registration | undefined> {
    const updateData: any = {};
    if (paymentData.phonepeTransactionId !== undefined) {
      updateData.phonepeTransactionId = paymentData.phonepeTransactionId;
    }
    if (paymentData.razorpayOrderId !== undefined) {
      updateData.razorpayOrderId = paymentData.razorpayOrderId;
    }
    if (paymentData.razorpayPaymentId !== undefined) {
      updateData.razorpayPaymentId = paymentData.razorpayPaymentId;
    }
    if (paymentData.paymentStatus !== undefined) {
      updateData.paymentStatus = paymentData.paymentStatus;
    }
    
    const result = await db.update(registrations)
      .set(updateData)
      .where(eq(registrations.id, id))
      .returning();
    return result[0];
  }

  async getRegistrations(): Promise<Registration[]> {
    return await db.select().from(registrations)
      .orderBy(desc(registrations.createdAt));
  }
  
  async getAllRegistrations(): Promise<Registration[]> {
    return await db.select().from(registrations)
      .orderBy(desc(registrations.createdAt));
  }

  async getRegistrationStats(): Promise<{
    totalRegistrations: number;
    totalPaid: number;
    totalPending: number;
    contestRegistrations: number;
    expertSessionRegistrations: number;
  }> {
    const allRegs = await db.select().from(registrations);
    const totalRegistrations = allRegs.length;
    const totalPaid = allRegs.filter(r => r.paymentStatus === 'paid').length;
    const totalPending = allRegs.filter(r => r.paymentStatus !== 'paid').length;
    const contestRegistrations = allRegs.filter(r => r.registrationType === 'contest').length;
    const expertSessionRegistrations = allRegs.filter(r => r.registrationType === 'expert-session').length;
    
    return {
      totalRegistrations,
      totalPaid,
      totalPending,
      contestRegistrations,
      expertSessionRegistrations,
    };
  }
  
  async getPaidRegistrations(): Promise<Registration[]> {
    const result = await db.select().from(registrations)
      .where(eq(registrations.paymentStatus, 'paid'))
      .orderBy(desc(registrations.createdAt))
      .limit(1000);
    return result;
  }

  async getPendingRegistrations(): Promise<Registration[]> {
    const result = await db.select().from(registrations)
      .where(sql`${registrations.paymentStatus} IS NULL OR ${registrations.paymentStatus} != 'paid'`)
      .orderBy(desc(registrations.createdAt))
      .limit(500);
    return result;
  }

  async createInvestorMentor(insertData: InsertInvestorMentor): Promise<InvestorMentor> {
    const id = randomUUID();
    const result = await db.insert(investorMentorApplications).values({ ...insertData, id }).returning();
    return result[0];
  }

  async getInvestorMentors(): Promise<InvestorMentor[]> {
    return await db.select().from(investorMentorApplications).orderBy(desc(investorMentorApplications.createdAt));
  }

  async createSponsorship(insertData: InsertSponsorship): Promise<Sponsorship> {
    const id = randomUUID();
    const result = await db.insert(sponsorshipInquiries).values({ ...insertData, id }).returning();
    return result[0];
  }

  async getSponsorships(): Promise<Sponsorship[]> {
    return await db.select().from(sponsorshipInquiries).orderBy(desc(sponsorshipInquiries.createdAt));
  }

  async deleteRegistration(id: string): Promise<void> {
    await db.delete(registrations).where(eq(registrations.id, id));
  }

  async deleteContact(id: string): Promise<void> {
    await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
  }

  async deleteInvestorMentor(id: string): Promise<void> {
    await db.delete(investorMentorApplications).where(eq(investorMentorApplications.id, id));
  }

  async deleteSponsorship(id: string): Promise<void> {
    await db.delete(sponsorshipInquiries).where(eq(sponsorshipInquiries.id, id));
  }

  async createBulkRegistration(insertData: InsertBulkRegistration): Promise<BulkRegistration> {
    const id = randomUUID();
    const bulkRegistrationId = `KSFB-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    const result = await db.insert(bulkRegistrations).values({ 
      ...insertData, 
      id, 
      bulkRegistrationId 
    }).returning();
    return result[0];
  }

  async getBulkRegistrations(): Promise<BulkRegistration[]> {
    return await db.select().from(bulkRegistrations)
      .orderBy(desc(bulkRegistrations.createdAt));
  }

  async getBulkRegistrationByBulkRegistrationId(bulkRegistrationId: string): Promise<BulkRegistration | undefined> {
    const result = await db.select().from(bulkRegistrations).where(eq(bulkRegistrations.bulkRegistrationId, bulkRegistrationId));
    return result[0];
  }

  async getBulkRegistrationByMerchantTransactionId(merchantTransactionId: string): Promise<BulkRegistration | undefined> {
    const result = await db.select().from(bulkRegistrations).where(eq(bulkRegistrations.phonepeMerchantTransactionId, merchantTransactionId));
    return result[0];
  }

  async updateBulkRegistrationPayment(id: string, paymentData: { phonepeTransactionId?: string; paymentStatus: string }): Promise<BulkRegistration | undefined> {
    const result = await db.update(bulkRegistrations)
      .set({
        phonepeTransactionId: paymentData.phonepeTransactionId,
        paymentStatus: paymentData.paymentStatus
      })
      .where(eq(bulkRegistrations.id, id))
      .returning();
    return result[0];
  }

  async deleteBulkRegistration(id: string): Promise<void> {
    await db.delete(bulkRegistrationStudents).where(eq(bulkRegistrationStudents.bulkRegistrationId, id));
    await db.delete(bulkRegistrations).where(eq(bulkRegistrations.id, id));
  }

  async createBulkStudent(insertData: InsertBulkStudent): Promise<BulkStudent> {
    const id = randomUUID();
    const result = await db.insert(bulkRegistrationStudents).values({ 
      ...insertData, 
      id 
    }).returning();
    return result[0];
  }

  async getBulkStudentsByBulkRegistrationId(bulkRegistrationId: string): Promise<BulkStudent[]> {
    return await db.select().from(bulkRegistrationStudents).where(eq(bulkRegistrationStudents.bulkRegistrationId, bulkRegistrationId));
  }

  async getBulkStudentByStudentRegistrationId(studentRegistrationId: string): Promise<BulkStudent | undefined> {
    const result = await db.select().from(bulkRegistrationStudents).where(eq(bulkRegistrationStudents.studentRegistrationId, studentRegistrationId));
    return result[0];
  }

  async createReferralCode(insertCode: InsertReferralCode): Promise<ReferralCode> {
    const id = randomUUID();
    const result = await db.insert(referralCodes).values({ 
      ...insertCode, 
      id,
      code: insertCode.code.toUpperCase()
    }).returning();
    return result[0];
  }

  async getReferralCodes(): Promise<ReferralCode[]> {
    return await db.select().from(referralCodes).orderBy(desc(referralCodes.createdAt));
  }

  async getReferralCodeByCode(code: string): Promise<ReferralCode | undefined> {
    const result = await db.select().from(referralCodes)
      .where(eq(referralCodes.code, code.toUpperCase()));
    return result[0];
  }

  async updateReferralCode(id: string, data: Partial<InsertReferralCode>): Promise<ReferralCode | undefined> {
    const result = await db.update(referralCodes)
      .set(data)
      .where(eq(referralCodes.id, id))
      .returning();
    return result[0];
  }

  async deleteReferralCode(id: string): Promise<void> {
    await db.delete(referralCodes).where(eq(referralCodes.id, id));
  }

  async getReferralCodeUsage(): Promise<Array<{ code: string; discountPercentage: number; timesUsed: number; lastUsed?: string }>> {
    const codes = await this.getReferralCodes();
    const allRegs = await db.select().from(registrations);
    
    return codes.map(code => {
      const usages = allRegs.filter(reg => reg.referralCode === code.code);
      const lastUsed = usages.length > 0 
        ? new Date(Math.max(...usages.map(u => new Date(u.createdAt || new Date()).getTime()))).toISOString()
        : undefined;
      
      return {
        code: code.code,
        discountPercentage: code.discountPercentage,
        timesUsed: usages.length,
        lastUsed
      };
    }).sort((a, b) => b.timesUsed - a.timesUsed);
  }

  async initializeReferralCodes(): Promise<void> {
    const codesToCreate = [
      { code: "XCALIPH", discountPercentage: 10 },
      { code: "S1BCALIPH", discountPercentage: 10 },
      { code: "C1BCALIPH", discountPercentage: 10 },
      { code: "C1CCALIPH", discountPercentage: 10 },
      { code: "C1ACALIPH", discountPercentage: 10 },
      { code: "S1ACALIPH", discountPercentage: 10 },
      { code: "C2ACALIPH", discountPercentage: 10 },
      { code: "S2ACALIPH", discountPercentage: 10 },
      { code: "S2BCALIPH", discountPercentage: 10 },
      { code: "C2BCALIPH", discountPercentage: 10 }
    ];

    for (const codeData of codesToCreate) {
      const existing = await this.getReferralCodeByCode(codeData.code);
      if (!existing) {
        await this.createReferralCode(codeData);
        console.log(`Created referral code: ${codeData.code}`);
      }
    }
  }

  async createSpeakerApplication(insertData: InsertSpeakerApplication): Promise<SpeakerApplication> {
    const id = randomUUID();
    const result = await db.insert(speakerApplications).values({ 
      ...insertData, 
      id 
    }).returning();
    return result[0];
  }

  async getSpeakerApplications(): Promise<SpeakerApplication[]> {
    return await db.select().from(speakerApplications).orderBy(desc(speakerApplications.createdAt));
  }

  async getSpeakers(): Promise<Registration[]> {
    const result = await db.select().from(registrations)
      .where(eq(registrations.registrationType, 'speaker'))
      .orderBy(desc(registrations.createdAt));
    return result;
  }
}

export const storage = new DatabaseStorage();
