import { db } from '@/db'
import { suggestions } from '@/db/schema'

export default async function FeedbackPage() {
  const allSuggestions = await db.select().from(suggestions)

  return (
    <div>
      <h1>Feedback Page</h1>

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
