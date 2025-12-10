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
  users,
  contactSubmissions,
  registrations,
  investorMentorApplications,
  sponsorshipInquiries,
  bulkRegistrations,
  bulkRegistrationStudents,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  createRegistration(registration: InsertRegistration): Promise<Registration>;
  getRegistrations(): Promise<Registration[]>;
  getRegistrationByRegistrationId(registrationId: string): Promise<Registration | undefined>;
  getRegistrationByMerchantTransactionId(merchantTransactionId: string): Promise<Registration | undefined>;
  updateRegistrationPayment(id: string, paymentData: { phonepeTransactionId?: string; paymentStatus: string }): Promise<Registration | undefined>;
  
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
      ...insertRegistration, 
      id, 
      registrationId 
    }).returning();
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

  async updateRegistrationPayment(id: string, paymentData: { phonepeTransactionId?: string; paymentStatus: string }): Promise<Registration | undefined> {
    const result = await db.update(registrations)
      .set({
        phonepeTransactionId: paymentData.phonepeTransactionId,
        paymentStatus: paymentData.paymentStatus
      })
      .where(eq(registrations.id, id))
      .returning();
    return result[0];
  }

  async getRegistrations(): Promise<Registration[]> {
    return await db.select().from(registrations)
      .orderBy(desc(registrations.createdAt));
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
}

export const storage = new DatabaseStorage();
