'use server'

import { db } from '@/db'
import { suggestions } from '@/db/schema'
import { auth } from '@clerk/nextjs/server'
import { eq, sql } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function upVoteAction(id: number) {
  // Increment the upvotes count in the DB
  await db
    .update(suggestions)
    .set({ upvotes: sql`${suggestions.upvotes} + 1` })
    .where(eq(suggestions.id, id))

  // Refresh the page data
  revalidatePath('/')
}

export async function deleteSuggestion(id: number) {
  'use server'

  const { userId } = await auth()

  if (!userId) {
    throw new Error('You must be logged in to delete posts!')
  }

  // Later, we'll update the DB to check if userId matches the post owner
  await db.delete(suggestions).where(eq(suggestions.id, id))

  // This pushes the updated list to everyone viewing the page
  revalidatePath('/')
}
