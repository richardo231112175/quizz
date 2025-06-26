import { NextRequest } from 'next/server';
import { createRouteMatcher, clerkMiddleware, type ClerkMiddlewareAuth } from '@clerk/nextjs/server';

type routeType = (req: NextRequest) => boolean;

type configType = {
    matcher: string[];
};

const isProtectedRoute: routeType = createRouteMatcher([
    '/dashboard(/.*)',
    '/create',
    '/quizz(/.*)',
    '/session/([^/]+)(/.*)',
    '/history',
]);

export default clerkMiddleware(async (auth: ClerkMiddlewareAuth, request: NextRequest): Promise<void> => {
    if (isProtectedRoute(request)) {
        await auth.protect();
    }
});

export const config: configType = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
