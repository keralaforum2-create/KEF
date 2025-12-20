import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@shared/schema";

const databaseUrl = process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}

const pool = new Pool({ 
  connectionString: databaseUrl,
  ssl: process.env.SUPABASE_DATABASE_URL ? { rejectUnauthorized: false } : undefined,
  // Optimize for production performance
  max: 20, // Maximum number of connections in pool
  min: 5,  // Minimum number of connections to maintain
  idleTimeoutMillis: 30000, // Close idle connections after 30s
  connectionTimeoutMillis: 5000, // Connection timeout 5s
  keepAlive: true,
  keepAliveInitialDelayMillis: 30000,
});

export const db = drizzle(pool, { schema });
