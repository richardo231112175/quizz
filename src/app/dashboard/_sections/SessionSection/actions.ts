'use server';

import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function deleteSession(sessionId: number): Promise<boolean> {
    const { userId }: { userId: string | null } = await auth();

    if (!userId) {
        return false;
    }

    try {
        await prisma.quizSession.delete({
            where: {
                id: sessionId,
                clerk_id: userId,
            },
        });
        return true;
    } catch {
        return false;
    }
}
