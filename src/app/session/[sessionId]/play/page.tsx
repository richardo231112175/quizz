import type { Metadata, ResolvingMetadata } from 'next';
import { type AbsoluteTemplateString } from 'next/dist/lib/metadata/types/metadata-types';
import { notFound } from 'next/navigation';
import { type JSX } from 'react';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import MainSection from './_sections/MainSection';
import { QuestionType as PrismaQuestionType } from '../../../../../generated';

type sessionMetadataType = {
    title: string;
    description: string | null;
};

type PlayPageProps = {
    params: { sessionId: string };
};

type QuestionType = {
    question: string,
    image_url: string | null,
    type: PrismaQuestionType,
    time_limit: number,
    max_score: number,
    single_choice_options: string | null,
    multiple_choice_options: string | null,
};

type PlayDetail = {
    id: number;
    question_id: number;
    answer: string | null;
    score: number;
    time_taken: number;
    start_time: Date | null;
    end_time: Date | null;
    question: QuestionType;
};

export type Play = {
    id: number;
    final_score: number;
    max_score: number;
    start_time: Date;
    end_time: Date;
    play_details: PlayDetail[];
}

export async function generateMetadata({ params }: PlayPageProps, parent: ResolvingMetadata): Promise<Metadata> {
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

export default async function PlayPage({ params }: PlayPageProps): Promise<JSX.Element> {
    const { sessionId }: { sessionId: string } = params;

    if (isNaN(Number(sessionId))) {
        return notFound();
    }

    const { userId }: { userId: string | null } = await auth();

    if (!userId) {
        return notFound();
    }

    const now: Date = new Date();

    const play: Play | null = await prisma.play.findFirst({
        where: {
            clerk_id: userId,
            quiz_session_id: Number(sessionId),
            finish_time: null,
            end_time: { gt: now },
        },
        select: {
            id: true,
            final_score: true,
            max_score: true,
            start_time: true,
            end_time: true,
            play_details: {
                select: {
                    id: true,
                    question_id: true,
                    answer: true,
                    score: true,
                    time_taken: true,
                    start_time: true,
                    end_time: true,
                    question: {
                        select: {
                            question: true,
                            image_url: true,
                            type: true,
                            time_limit: true,
                            max_score: true,
                            single_choice_options: true,
                            multiple_choice_options: true,
                        },
                    },
                },
            },
        },
    });

    if (!play) {
        return notFound();
    }

    return <MainSection play={play} />;
}
