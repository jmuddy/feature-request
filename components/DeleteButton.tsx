'use client'

import { deleteSuggestion } from '@/app/actions'
import { useTransition } from 'react'

export function DeleteButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      disabled={isPending}
      onClick={() => {
        if (confirm('Are you sure you want to Delete this?')) {
          startTransition(() => deleteSuggestion(id))
        }
      }}
      className={`text-sm font-medium px-3 py-1 rounded-md transition-colors ${
        isPending
          ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
          : 'text-red-600 hover:bg-red-50'
      }`}
    >
      {isPending ? 'Removing...' : 'Delete'}
    </button>
  )
}
