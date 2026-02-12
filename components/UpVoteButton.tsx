'use client'

import { upVoteAction } from '@/app/actions'
import { useOptimistic, useTransition } from 'react'

export function UpVoteAction({
  id,
  initialVotes,
}: {
  id: number
  initialVotes: number
}) {
  const [isPending, startTransition] = useTransition()

  // useOptimistic handles the "fake" update while the real one happens
  const [optimisticVotes, addOptimisticVotes] = useOptimistic(
    initialVotes,
    (state) => state + 1,
  )

  return (
    <button
      disabled={isPending}
      className={`px-3 py-1 rounded-md transition-all ${
        isPending
          ? 'bg-blue-100 text-blue-400'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
      onClick={() => {
        startTransition(async () => {
          addOptimisticVotes(null)
          await upVoteAction(id)
        })
      }}
    >
      {optimisticVotes} 👍
    </button>
  )
}
