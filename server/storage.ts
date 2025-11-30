import { 
  type User, 
  type InsertUser, 
  type Contact, 
  type InsertContact,
  type Registration,
  type InsertRegistration,
  users,
  contactSubmissions,
  registrations
} from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  createRegistration(registration: InsertRegistration): Promise<Registration>;
  getRegistrations(): Promise<Registration[]>;
}

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  max: 1,
});
const db = drizzle(pool);

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
    return db.select().from(contactSubmissions);
  }

  async createRegistration(insertRegistration: InsertRegistration): Promise<Registration> {
    const id = randomUUID();
    const result = await db.insert(registrations).values({ ...insertRegistration, id }).returning();
    return result[0];
  }

  async getRegistrations(): Promise<Registration[]> {
    return db.select().from(registrations);
  }
}

export const storage = new DatabaseStorage();
