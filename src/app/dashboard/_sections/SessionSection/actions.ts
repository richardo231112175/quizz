'use server';

import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import supabase from '@/lib/supabase';

export async function deleteSession(sessionId: number): Promise<boolean> {
    const { userId }: { userId: string | null } = await auth();

    if (!userId) {
        return false;
    }

    try {
        const { image_url }: { image_url: string | null } = await prisma.quizSession.delete({
            where: {
                id: sessionId,
                clerk_id: userId,
            },
        });

        if (image_url) {
            await supabase.storage.from('quizz').remove([ image_url ]);
        }
        return true;
    } catch {
        return false;
    }
}
