import { redirect, notFound } from 'next/navigation';
import { type JSX } from 'react';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import MainSection from './_sections/MainSection';
import { type QuestionType } from '../../../../../generated';

type SessionPageProps = {
    params: { quizId: string };
};

export type DatabaseQuestion = {
    id: number;
    question: string;
    type: QuestionType;
    time_limit: number;
    max_score: number;
    single_choice_options: string | null;
    single_choice_correct: string | null;
    multiple_choice_options: string | null;
    multiple_choice_correct: string | null;
    open_ended_answer_key: string | null;
};

export type DatabaseQuiz = {
    id: number;
    title: string;
    description: string | null;
    questions: DatabaseQuestion[];
};

export default async function SessionPage({ params }: SessionPageProps): Promise<JSX.Element> {
    const { quizId }: { quizId: string } = params;
    const { userId }: { userId: string | null } = await auth();

    if (!userId) {
        return redirect('/');
    }

    if (isNaN(Number(quizId))) {
        return notFound();
    }

    const quiz: DatabaseQuiz | null = await prisma.quiz.findUnique({
        where: {
            id: Number(quizId),
            clerk_id: userId,
        },
        select: {
            id: true,
            title: true,
            description: true,
            questions: {
                select: {
                    id: true,
                    question: true,
                    type: true,
                    time_limit: true,
                    max_score: true,
                    single_choice_options: true,
                    single_choice_correct: true,
                    multiple_choice_options: true,
                    multiple_choice_correct: true,
                    open_ended_answer_key: true,
                },
            },
        },
    });

    if (!quiz) {
        return notFound();
    }

    return <MainSection quizz={quiz} />;
}
