import { redirect } from 'next/navigation';
import { type JSX } from 'react';
import { auth } from '@clerk/nextjs/server';
import { type Prisma } from '@prisma/client';
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
    };
};

export default async function DashboardPage(): Promise<JSX.Element> {
    const { userId }: { userId: string | null } = await auth();

    if (!userId) {
        return redirect('/');
    }

    const getQuiz: Prisma.PrismaPromise<Quiz[]> = prisma.quiz.findMany({
        where: { clerk_id: userId },
        include: {
            _count: {
                select: { questions: true },
            },
        },
    });

    const [ quizzes ]: [ Quiz[] ] = await Promise.all([ getQuiz ]);

    return <MainSection quizzes={quizzes} />;
}
