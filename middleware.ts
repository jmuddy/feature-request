import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define which routes are public and accessible without authentication
const isPublic = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)'])

export default clerkMiddleware(async (auth, request) => {
  // If the route is not public, protect it (require authentication)
  if (!isPublic(request)) {
    await auth.protect()
  }
})

// Configuration to ensure the middleware runs for all necessary paths
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params.
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes.
    '/(api|trpc)(.*)',
  ],
}
