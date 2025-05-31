import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

interface Config{
    matcher:string[]
};

export const config:Config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
