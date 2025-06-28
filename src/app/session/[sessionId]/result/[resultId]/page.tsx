import { notFound } from 'next/navigation';
import { type JSX } from 'react';
import prisma from '@/lib/prisma';
import MainSection from './_sections/MainSection';

type PageProps = {
    params: {
        sessionId: string;
        resultId: string;
    };
};

export type Play = {
    id: number;
    final_score: number;
    max_score: number;
    start_time: Date;
    end_time: Date;
    finish_time: Date | null;
    play_details: Array<{
        id: number;
        answer: string | null;
        score: number;
        time_taken: number;
        start_time: Date | null;
        end_time: Date | null;
        question: {
            question: string;
            image_url: string | null;
            max_score: number;
            type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'OPEN_ENDED';
            single_choice_options: string | null;
            single_choice_correct: string | null;
            multiple_choice_options: string | null;
            multiple_choice_correct: string | null;
            open_ended_answer_key: string | null;
        };
    }>;
    quiz_session: {
        title: string;
    };
};

export default async function QuizResultsPage({ params }: PageProps): Promise<JSX.Element> {
    const sessionId: string = params.sessionId;
    const resultId: string = params.resultId;

    if (isNaN(Number(sessionId)) || isNaN(Number(resultId))) {
        notFound();
    }

    const play: Play | null = await prisma.play.findUnique({
        where: {
            id: Number(resultId),
            quiz_session_id: Number(sessionId),
        },
        select: {
            id: true,
            final_score: true,
            max_score: true,
            start_time: true,
            end_time: true,
            finish_time: true,
            play_details: {
                select: {
                    id: true,
                    answer: true,
                    score: true,
                    time_taken: true,
                    start_time: true,
                    end_time: true,
                    question: {
                        select: {
                            question: true,
                            image_url: true,
                            max_score: true,
                            type: true,
                            single_choice_options: true,
                            single_choice_correct: true,
                            multiple_choice_options: true,
                            multiple_choice_correct: true,
                            open_ended_answer_key: true,
                        },
                    },
                },
            },
            quiz_session: {
                select: {
                    title: true,
                },
            },
        },
    });

    if (!play) {
        notFound();
    }

    return <MainSection play={play} />;
}
