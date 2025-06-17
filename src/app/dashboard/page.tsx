import { redirect } from 'next/navigation';
import { type JSX } from 'react';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import MainSection from './_sections/MainSection';

export type Quiz = {
    id: number;
    clerk_id: string;
    title: string;
    description: string | null;
    created_at: Date;
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
            _count: {
                select: {
                    questions: true,
                    sessions: true,
                },
            },
        },
    });

    return <MainSection quizzes={quizzes} tab={searchParams.tab} />;
}
