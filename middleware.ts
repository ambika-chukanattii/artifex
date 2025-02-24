import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Exclude Next.js internals and static assets
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:css|js|json|jpg|jpeg|png|webp|gif|svg|ico|ttf|woff2?|csv|docx?|xlsx?|zip|webmanifest)).*)",

    // Always run for API routes (including TRPC)
    "/api/:path*",
    "/trpc/:path*",
  ],
};
