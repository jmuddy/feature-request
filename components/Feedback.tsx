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
        className='flex flex-col justify-center w-1/2 mx-auto'
      >
        <input
          type='text'
          name='content'
          placeholder='Enter an Idea Mate!'
          className='w-1/2 mx-auto outline-2 p-2 rounded-2xl'
          required
        />
        <button
          type='submit'
          className='text-xl outline-2 rounded-xl w-40 mx-auto my-5 p-1'
        >
          Post Idea
        </button>
      </form>

      {allSuggestions.length === 0 && <p>No Feedback Today</p>}

      <div className='w-1/3 mx-auto my-10'>
        <table className='w-full outline rounded-2xl'>
          <thead className='bg-gray-100 text-left'>
            <tr>
              <th className='px-6 py-4 font-semibold text-gray-900 border-b'>
                Project Idea
              </th>
              <th className='px-6 py-4 font-semibold text-gray-900 border-b text-center'>
                Up Votes
              </th>
              <th className='px-6 py-4 font-semibold text-gray-900 border-b text-center'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {allSuggestions.map((item) => (
              <tr key={item.id} className='hover:bg-gray-50 transition-colors'>
                <td className='px-6 py-4'>{item.content}</td>
                <td className='px-6 py-4 text-center'>{item.upvotes}</td>
                <td className='px-6 py-4 text-center'>
                  {/* We will put the Upvote Button here next */}
                  <button className='text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md transition-all'>
                    Vote 👍
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
