import type { Metadata, ResolvingMetadata } from 'next';
import { type AbsoluteTemplateString } from 'next/dist/lib/metadata/types/metadata-types';
import { notFound } from 'next/navigation';
import { type JSX } from 'react';
import { clerkClient, type User } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import type { QuizSessionCategory, QuizSessionDifficulty, QuizSessionVisibility } from '../../../../generated';
import MainSection from './_sections/MainSection';

type sessionMetadataType = {
    title: string;
    description: string | null;
};

export type playType = {
    clerk_id: string;
    final_score: number;
    max_score: number;
    finish_time: Date | null;
    end_time: Date;
};

export type sessionType = {
    id: number;
    clerk_id: string;
    title: string;
    description: string | null;
    image_url: string | null;
    category: QuizSessionCategory;
    difficulty: QuizSessionDifficulty;
    visibility: QuizSessionVisibility;
    time_limit: number;
    single_choice: number;
    multiple_choice: number;
    open_ended: number;
    created_at: Date;
    ratings: {
        rating: number;
    }[];
    plays: playType[];
    _count: { plays: number };
};

export type userType = {
    name: string;
    imageUrl: string;
};

type SessionPageProps = {
    params: { sessionId: string };
};

export async function generateMetadata({ params }: SessionPageProps, parent: ResolvingMetadata): Promise<Metadata> {
    const { sessionId }: { sessionId: string } = params;

    const session: sessionMetadataType | null = await prisma.quizSession.findUnique({
        where: { id: Number(sessionId) },
        select: {
            title: true,
            description: true,
        },
    });

    const prevTitle: AbsoluteTemplateString | null = (await parent).title;
    const prevDesc: string | null =  (await parent).description;

    return {
        title: session?.title || prevTitle,
        description: session?.description || prevDesc,
    };
}

export default async function SessionPage({ params }: SessionPageProps): Promise<JSX.Element> {
    const { sessionId }: { sessionId: string } = params;

    if (isNaN(Number(sessionId))) {
        return notFound();
    }

    const now: Date = new Date();

    const session: sessionType | null = await prisma.quizSession.findUnique({
        where: { id: Number(sessionId) },
        select: {
            id: true,
            clerk_id: true,
            title: true,
            description: true,
            image_url: true,
            category: true,
            difficulty: true,
            visibility: true,
            time_limit: true,
            single_choice: true,
            multiple_choice: true,
            open_ended: true,
            created_at: true,
            ratings: { select: { rating: true } },
            plays: {
                where: {
                    OR: [
                        { finish_time: { not: null } },
                        { end_time: { lt: now } },
                    ],
                },
                orderBy: [
                    { finish_time: 'desc' },
                    { end_time: 'desc' },
                ],
                take: 5,
                select: {
                    clerk_id: true,
                    final_score: true,
                    max_score: true,
                    finish_time: true,
                    end_time: true,
                },
            },
            _count: {
                select: { plays: true },
            },
        },
    });

    if (!session) {
        return notFound();
    }

    const [ author, authorQuizzes, recentUsers ]: [ userType, number, userType[] ] = await Promise.all([
        processUser(session.clerk_id),
        processAuthorQuizzes(session.clerk_id),
        processRecentUsers(session.plays),
    ]);

    return <MainSection quiz={session} author={author} authorQuizzes={authorQuizzes} recentUsers={recentUsers} />;
}

async function processUser(clerkId: string): Promise<userType> {
    const clerkUser: User = await (await clerkClient()).users.getUser(clerkId);
    const user: userType = {
        name: `${clerkUser.firstName} ${clerkUser.lastName}`,
        imageUrl: clerkUser.imageUrl,
    };

    return user;
}

async function processAuthorQuizzes(clerkId: string): Promise<number> {
    const authorQuizzes: number = await prisma.quizSession.count({
        where: { clerk_id: clerkId },
    });

    return authorQuizzes;
}

async function processRecentUsers(plays: playType[]): Promise<userType[]> {
    const scores: userType[] = await Promise.all(plays.map((play) => processUser(play.clerk_id)));
    return scores;
}
