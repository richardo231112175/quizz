'use server';

import prisma from '@/lib/prisma';
import { getHighestRating, type rawSessionsType, type highestRating } from '@/lib/getHighestRating';
import { quizType } from '@/components/QuizzCard';
import type { QuizSessionCategory, QuizSessionDifficulty, QuizSessionVisibility } from '../../../generated';

type sessionsType2 = {
    category: QuizSessionCategory;
    difficulty: QuizSessionDifficulty;
    visibility: QuizSessionVisibility;
    id: number;
    time_limit: number;
    title: string;
    description: string | null;
    image_url: string | null;
    ratings: { rating: number }[];
    _count: { plays: number };
};

type fetchBrowseQuizzesProps = {
    search: string;
    category: string;
    difficulty: string;
    sort: string;
    limit: number;
    offset: number;
};

export type fetchBrowseQuizzesReturn = {
    quizzes: quizType[];
    hasMore: boolean;
};

export async function fetchBrowseQuizzes({ search, category, difficulty, sort, limit, offset }: fetchBrowseQuizzesProps): Promise<fetchBrowseQuizzesReturn> {
    const where: Record<string, unknown> = {};
    const now: Date = new Date();

    where.open_time = { lte: now };
    where.close_time = { gte: now };

    if (category && category !== 'All Categories') {
        where.category = category.toUpperCase();
    }

    if (difficulty && difficulty !== 'All Levels') {
        where.difficulty = difficulty.toUpperCase();
    }

    if (search) {
        where.OR = [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
        ];
    }

    if (sort === 'popular') {
        const sessions: rawSessionsType[] = await prisma.quizSession.findMany({
            where,
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

    let orderBy: Record<string, string> = { id: 'desc' };
    if (sort === 'newest') orderBy = { id: 'desc' };
    else if (sort === 'oldest') orderBy = { id: 'asc' };
    else if (sort === 'shortest') orderBy = { time_limit: 'asc' };
    else if (sort === 'longest') orderBy = { time_limit: 'desc' };

    const sessions: sessionsType2[] = await prisma.quizSession.findMany({
        where,
        orderBy,
        skip: offset,
        take: limit + 1,
        select: {
            id: true,
            title: true,
            description: true,
            image_url: true,
            difficulty: true,
            category: true,
            visibility: true,
            time_limit: true,
            ratings: {
                select: { rating: true },
            },
            _count: {
                select: { plays: true },
            },
        },
    });

    const quizzes: quizType[] = sessions.slice(0, limit).map((session) => {
        const ratingCount: number = session.ratings.length;
        const rating: number = session.ratings.length ? session.ratings.reduce((tot, rat) => tot + rat.rating, 0) / ratingCount : 0;

        return {
            id: session.id,
            title: session.title,
            description: session.description,
            image: session.image_url,
            difficulty: session.difficulty,
            category: session.category,
            visibility: session.visibility,
            timeLimit: session.time_limit,
            plays: session._count.plays,
            rating: Number(rating.toFixed(2)),
            ratingCount: ratingCount,
        };
    });

    return {
        quizzes,
        hasMore: sessions.length > limit,
    };
}
