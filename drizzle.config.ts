import * as dotenv from 'dotenv'
import { defineConfig } from 'drizzle-kit'

console.log('My URL is:', process.env.DATABASE_URL)

// // Load environment variables from .env.local
// dotenv.config({
//   path: '.env',
// })

export default defineConfig({
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
