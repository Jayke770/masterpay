import { envConfig } from '@/lib/environment';
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
const client = postgres(envConfig.DATABASE_URL)
export const db = drizzle({ client });