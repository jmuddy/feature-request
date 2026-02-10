'use server'

import { db } from '@/db'
import { suggestions } from '@/db/schema'
import { eq, sql } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function upVoteAction(id: number) {
  // Increment the upvotes count in the DB
  await db
    .update(suggestions)
    .set({ upvotes: sql`{$suggestions.upvotes} + 1` })
    .where(eq(suggestions.id, id))

  // Refresh the page data
  revalidatePath('/')
}
