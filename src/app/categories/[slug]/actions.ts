'use server';

import prisma from '@/lib/prisma';
import { getHighestRating, type rawSessionsType, type highestRating } from '@/lib/getHighestRating';
import type { quizType } from '@/components/QuizzCard';
import type { QuizSessionCategory } from '../../../../generated';

type fetchQuizzesByCategoriesProps = {
    category: string;
    limit: number;
    offset: number;
};

export type fetchQuizzesByCategoriesReturn = {
    quizzes: quizType[];
    hasMore: boolean;
};

export async function fetchQuizzesByCategories({ category, limit, offset }: fetchQuizzesByCategoriesProps): Promise<fetchQuizzesByCategoriesReturn> {
    const now: Date = new Date();

    const sessions: rawSessionsType[] = await prisma.quizSession.findMany({
        where: {
            category: category.toUpperCase() as QuizSessionCategory,
            open_time: { lte: now },
            close_time: { gte: now },
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
            ratings: {
                select: { rating: true },
            },
            _count: {
                select: { plays: true },
            },
        },
    });

    const scores: highestRating[] = getHighestRating(sessions);
    const sorted: highestRating[] = scores.sort((a, b) => b.point - a.point);
    const paged: highestRating[] = sorted.slice(offset, offset + limit);

    const quizzes: quizType[] = paged.map(({ quiz }: { quiz: quizType }) => quiz);

    return {
        quizzes,
        hasMore: sorted.length > offset + limit,
    };
}
