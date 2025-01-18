import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import 'dotenv/config';

export const db = drizzle(postgres(process.env.DATABASE_URL!));
