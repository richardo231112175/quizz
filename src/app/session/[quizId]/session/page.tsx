import { redirect, notFound } from 'next/navigation';
import { type JSX } from 'react';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import MainSection from './_sections/MainSection';
import { QuestionType } from '../../../../../generated';

type SessionPageProps = {
    params: { quizId: string };
};

type Quiz = {
    questions: {
        type: QuestionType;
    }[];
};

export type Counts = {
    single_choice_count: number;
    multiple_choice_count: number;
    open_ended_count: number;
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

    const quiz: Quiz | null = await prisma.quiz.findUnique({
        where: {
            id: Number(quizId),
            clerk_id: userId,
        },
        select: {
            questions: {
                select: { type: true },
            },
        },
    });

    if (!quiz) {
        return notFound();
    }

    const counts: Counts = {
        single_choice_count: 0,
        multiple_choice_count: 0,
        open_ended_count: 0,
    };

    quiz.questions.forEach((question) => {
        if (question.type === QuestionType.SINGLE_CHOICE) counts.single_choice_count++;
        else if (question.type === QuestionType.MULTIPLE_CHOICE) counts.multiple_choice_count++;
        else if (question.type === QuestionType.OPEN_ENDED) counts.open_ended_count++;
    });

    return <MainSection quizId={Number(quizId)} counts={counts} />;
}
