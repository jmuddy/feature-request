import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString = process.env.DATABASE_URL!

// Explicitly setting the client options fixes the ENOENT search
const client = postgres(connectionString, {
  // This is the key: it forces the driver to use the host/port
  // from the URL rather than looking for a local system file.
  prepare: false,
})

export const db = drizzle(client, { schema })
