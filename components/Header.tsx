import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Header() {
  return (
    <nav className='flex justify-end p-4'>
      <SignedOut>
        <SignInButton mode='modal'>
          <button className='className="bg-black text-white px-4 py-2 rounded-lg"'>
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton afterSignOutUrl='/' />
      </SignedIn>
    </nav>
  )
}
