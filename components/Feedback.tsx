import { db } from '@/db'
import { suggestions } from '@/db/schema'
import { revalidatePath } from 'next/cache'

export default async function FeedbackPage() {
  // Get all suggestions from Supabase
  const allSuggestions = await db.select().from(suggestions)

  // The Server Action: Runs on the server when form is submitted
  async function submitSuggestion(formData: FormData) {
    'use server'

    const content = formData.get('content') as string

    if (!content) return

    // Insert into the database
    await db.insert(suggestions).values({
      content,
    })

    // Tell Next.js to refresh the data on the page
    revalidatePath('/')
  }

  return (
    <div>
      <div className='text-center p-20'>
        <h1 className='text-5xl'>Project Ideas</h1>
        <p>What should we build?</p>
      </div>

      {/* The Form */}
      <form
        action={submitSuggestion}
        className='flex flex-col  justify-center w-1/2 mx-auto'
      >
        <input
          type='text'
          name='content'
          placeholder='Enter an Idea Mate!'
          className='w-1/2 mx-auto outline-2 p-2 rounded-2xl'
          required
        />
        <button type='submit'>Post Idea</button>
      </form>

      {allSuggestions.length === 0 && <p>No Feedback Today</p>}
      <div>
        {allSuggestions.map((item) => (
          <div key={item.id}>
            {item.content} ~ {item.upvotes}
          </div>
        ))}
      </div>
    </div>
  )
}
