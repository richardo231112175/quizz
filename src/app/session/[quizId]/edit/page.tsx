import { redirect, notFound } from 'next/navigation';
import { type JSX } from 'react';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import MainSection from './_sections/MainSection';
import type { QuizSessionDifficulty, QuizSessionCategory, QuizSessionVisibility } from '../../../../../generated';



type SessionPageProps = {
    params: { quizId: string };
};
export type SessionType = {
    id: number;
    quiz_id: number;
    title: string;
    description: string | null;
    difficulty: QuizSessionDifficulty;
    image_url: string | null;
    category: QuizSessionCategory;
    password: string | null;
    time_limit: number;
    visibility: QuizSessionVisibility;
    open_time: Date;
    close_time: Date;
    single_choice: number,
    multiple_choice: number,
    open_ended: number,
};


export type Counts = {
    single_choice_count: number;
    multiple_choice_count: number;
    open_ended_count: number;
};

export default async function SessionPage({ params }: SessionPageProps): Promise<JSX.Element> {
    const { quizId }: { quizId: string } = await params;
    const { userId }: { userId: string | null } = await auth();

    if (!userId) {
        return redirect('/');
    }

    if (isNaN(Number(quizId))) {
        return notFound();
    }

    
    const sessionData : SessionType = (await prisma.quizSession.findUnique({
        where: { id :Number(quizId) , clerk_id: userId },
        select: {
            id: true,
            clerk_id:true,
            quiz_id:true,
            title: true,
            description: true,
            difficulty: true,
            image_url:true,
            password:true,
            category: true,
            time_limit: true,
            visibility: true,
            open_time: true,
            close_time: true,
            single_choice:true,
            multiple_choice:true,
            open_ended:true,
        },
    }))!;

     
    
    if (!sessionData) {
        return notFound();
    }

    const counts: Counts = {
        single_choice_count: sessionData.single_choice,
        multiple_choice_count: sessionData.multiple_choice,
        open_ended_count: sessionData.open_ended,
    };

    return <MainSection quizId={Number(sessionData.quiz_id)} counts={counts} sessionData={sessionData}/>;
}
