import { redirect } from 'next/navigation';
import { type JSX } from 'react';
import { auth } from '@clerk/nextjs/server';
import type { QuizSessionDifficulty, QuizSessionCategory, QuizSessionVisibility } from '../../../generated';
import prisma from '@/lib/prisma';
import MainSection from './_sections/MainSection';

export type Session = {
    id: number;
    title: string;
    description: string | null;
    difficulty: QuizSessionDifficulty;
    category: QuizSessionCategory;
    time_limit: number;
    visibility: QuizSessionVisibility;
    open_time: Date;
    close_time: Date;
    _count: { plays: number };
};

export type Quiz = {
    id: number;
    clerk_id: string;
    title: string;
    description: string | null;
    created_at: Date;
    sessions: Session[];
    _count: {
        questions: number;
        sessions: number;
    };
};

type DashboardPageProps = {
    searchParams: { tab?: string };
};

export default async function DashboardPage({ searchParams }: DashboardPageProps): Promise<JSX.Element> {
    const { userId }: { userId: string | null } = await auth();

    if (!userId) {
        return redirect('/');
    }

    const quizzes: Quiz[] = await prisma.quiz.findMany({
        where: { clerk_id: userId },
        include: {
            sessions: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    difficulty: true,
                    category: true,
                    time_limit: true,
                    visibility: true,
                    open_time: true,
                    close_time: true,
                    _count: {
                        select: { plays: true },
                    },
                },
            },
            _count: {
                select: {
                    questions: true,
                    sessions: true,
                },
            },
        },
        orderBy: [ { id: 'desc' } ],
    });

    return <MainSection quizzes={quizzes} tab={searchParams.tab} />;
}
