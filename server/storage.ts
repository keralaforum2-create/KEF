import { 
  type User, 
  type InsertUser, 
  type Contact, 
  type InsertContact,
  type Registration,
  type InsertRegistration,
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
}

export class MemStorage implements IStorage {
  private users = new Map<string, User>();
  private contacts = new Map<string, Contact>();
  private registrations = new Map<string, Registration>();

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
}

export const storage = new MemStorage();
