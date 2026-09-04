import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';
import * as dotenv from 'dotenv';
dotenv.config();

const rawUrl = (process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || 'file::memory:').trim();
const url = rawUrl.replace(/^["']|["']$/g, '');

const rawToken = (process.env.TURSO_AUTH_TOKEN || '').trim();
const authToken = rawToken.replace(/^["']|["']$/g, '') || undefined;

export const client = createClient({
  url,
  authToken,
});

export const db = drizzle(client, { schema });
