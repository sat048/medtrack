import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  
  // If user is not signed in and trying to access a protected route, redirect to sign-in
  if (!userId && !isPublicRoute(req)) {
    const signInUrl = new URL("/sign-in", req.url);
    return NextResponse.redirect(signInUrl);
  }
  
  // If user is signed in and trying to access sign-in/sign-up, redirect to dashboard
  if (userId && (req.nextUrl.pathname === "/sign-in" || req.nextUrl.pathname === "/sign-up")) {
    const dashboardUrl = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashboardUrl);
  }
  
  // Allow authenticated users to access home page
  // (no redirect needed - they can navigate freely)
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};



