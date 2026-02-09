import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core'

export const suggestions = pgTable('suggestions', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  upvotes: integer('upvotes').default(0),
})
