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
} from "@shared/schema";
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
  
  createInvestorMentor(application: InsertInvestorMentor): Promise<InvestorMentor>;
  getInvestorMentors(): Promise<InvestorMentor[]>;
  
  createSponsorship(inquiry: InsertSponsorship): Promise<Sponsorship>;
  getSponsorships(): Promise<Sponsorship[]>;
}

export class MemStorage implements IStorage {
  private users = new Map<string, User>();
  private contacts = new Map<string, Contact>();
  private registrations = new Map<string, Registration>();
  private investorMentors = new Map<string, InvestorMentor>();
  private sponsorships = new Map<string, Sponsorship>();

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    for (const user of this.users.values()) {
      if (user.username === username) {
        return user;
      }
    }
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { ...insertContact, id };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async createRegistration(insertRegistration: InsertRegistration): Promise<Registration> {
    const id = randomUUID();
    const registrationId = `REG-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const registration: Registration = { ...insertRegistration, id, registrationId };
    this.registrations.set(id, registration);
    return registration;
  }

  async getRegistrationByRegistrationId(registrationId: string): Promise<Registration | undefined> {
    for (const registration of this.registrations.values()) {
      if (registration.registrationId === registrationId) {
        return registration;
      }
    }
    return undefined;
  }

  async getRegistrations(): Promise<Registration[]> {
    return Array.from(this.registrations.values());
  }

  async createInvestorMentor(insertData: InsertInvestorMentor): Promise<InvestorMentor> {
    const id = randomUUID();
    const investorMentor: InvestorMentor = { ...insertData, id };
    this.investorMentors.set(id, investorMentor);
    return investorMentor;
  }

  async getInvestorMentors(): Promise<InvestorMentor[]> {
    return Array.from(this.investorMentors.values());
  }

  async createSponsorship(insertData: InsertSponsorship): Promise<Sponsorship> {
    const id = randomUUID();
    const sponsorship: Sponsorship = { ...insertData, id };
    this.sponsorships.set(id, sponsorship);
    return sponsorship;
  }

  async getSponsorships(): Promise<Sponsorship[]> {
    return Array.from(this.sponsorships.values());
  }
}

export const storage = new MemStorage();
