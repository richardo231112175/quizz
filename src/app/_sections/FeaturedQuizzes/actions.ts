'use server';

import { quizType } from '@/components/QuizzCard';
import prisma from '@/lib/prisma';
import { getHighestRating, type sessionsType, type highestRating } from '@/lib/getHighestRating';

export async function fetchFeaturedQuizzes(): Promise<quizType[]> {
    const now: Date = new Date();

    const sessions: sessionsType[] = await prisma.quizSession.findMany({
        where: {
            open_time: { lte: now },
            close_time: { gte: now },
            visibility: 'PUBLIC',
        },
        select: {
            id: true,
            title: true,
            description: true,
            image_url: true,
            difficulty: true,
            category: true,
            visibility: true,
            time_limit: true,
            open_time: true,
            close_time: true,
        },
    });

    const scores: highestRating[] = getHighestRating(sessions);

    const top: { quiz: quizType, point: number }[] = scores.sort((a, b) => b.point - a.point).slice(0, 3);

    return top.reduce((acc, t) => [ ...acc, t.quiz ], [] as quizType[]);
}
