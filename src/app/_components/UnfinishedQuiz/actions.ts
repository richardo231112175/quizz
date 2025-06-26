'use server';

import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export type getUnfinishedQuizReturn = {
    id: number;
    quiz_session_id: number;
};

export async function getUnfinishedQuiz(): Promise<getUnfinishedQuizReturn | void> {
    const { userId }: { userId: string | null } = await auth();
    if (!userId) return;

    const now: Date = new Date();

    const session: getUnfinishedQuizReturn | null = await prisma.play.findFirst({
        where: {
            clerk_id: userId,
            finish_time: null,
            end_time: { gt: now },
        },
        select: {
            id: true,
            quiz_session_id: true,
        },
    });

    if (!session) return;

    return session;
}

export async function abort(playId: number): Promise<void> {
    const { userId }: { userId: string | null } = await auth();
    if (!userId) return;

    const now: Date = new Date();

    await prisma.play.update({
        where: { id: playId },
        data: { finish_time: now },
    });
}
