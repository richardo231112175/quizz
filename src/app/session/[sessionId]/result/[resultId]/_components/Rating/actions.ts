'use server';

import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function submitRating(sessionId: number, rating: number): Promise<boolean> {
    try {
        const { userId }: { userId: string | null } = await auth();

        if (!userId || !sessionId || !rating || rating < 1 || rating > 5) {
            return false;
        }

        await prisma.rating.create({
            data: {
                clerk_id: userId,
                quiz_session_id: sessionId,
                rating,
            },
        });

        return true;
    } catch {
        return false;
    }
}
