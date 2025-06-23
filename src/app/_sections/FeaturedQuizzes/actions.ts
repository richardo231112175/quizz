'use server';

import { quizType } from '@/components/QuizzCard';
import prisma from '@/lib/prisma';
import type { QuizSessionCategory, QuizSessionDifficulty, QuizSessionVisibility } from '../../../../generated';

type SessionSelect = {
    id: number;
    title: string;
    description: string | null;
    image_url: string | null;
    difficulty: QuizSessionDifficulty;
    category: QuizSessionCategory;
    visibility: QuizSessionVisibility;
    time_limit: number;
    open_time: Date;
    close_time: Date;
}

export async function fetchFeaturedQuizzes(): Promise<quizType[]> {
    const now: Date = new Date();

    const sessions: SessionSelect[] = await prisma.quizSession.findMany({
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

    const scores: { quiz: quizType, point: number }[] = sessions.map((session) => {
        const openTime: number = new Date(session.open_time).getTime();
        const closeTime: number = new Date(session.close_time).getTime();
        const nowTime: number = now.getTime();

        const openPoint: number = (nowTime - openTime) / (1000 * 60) * 2;
        const durationPoint: number = (closeTime - openTime) / (1000 * 60) * -0.5;
        const ratingPoint: number = 4.9 * 10 + 15;
        const imagePoint: number = session.image_url ? 50 : 0;
        const visibilityPoint: number = session.visibility === 'PUBLIC' ? 40 : 0;
        const playsPoint: number = 20 * 3;

        const point: number = openPoint + durationPoint + ratingPoint + imagePoint + visibilityPoint + playsPoint;

        const quiz: quizType = {
            id: session.id,
            title: session.title,
            description: session.description,
            image: session.image_url,
            difficulty: session.difficulty,
            category: session.category,
            visibility: session.visibility,
            timeLimit: session.time_limit,
            plays: 20,
            rating: 4.9,
            ratingCount: 15,
        };

        return { quiz, point };
    });

    const top: { quiz: quizType, point: number }[] = scores.sort((a, b) => b.point - a.point).slice(0, 3);

    return top.reduce((acc, t) => [ ...acc, t.quiz ], [] as quizType[]);
}
