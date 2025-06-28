import { notFound } from 'next/navigation';
import { type JSX } from 'react';
import { auth, clerkClient, User } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import MainSection from './_sections/MainSection';

type Play = {
    id: number;
    clerk_id: string;
    final_score: number;
    start_time: Date;
    end_time: Date;
    finish_time: Date | null;
    play_details: {
        score: number;
        question: {
            type: string;
        };
    }[];
};

type Session = {
    id: number;
    title: string;
    description: string | null;
    category: string;
    difficulty: string;
    open_time: Date;
    close_time: Date;
    time_limit: number;
    visibility: string;
    single_choice: number;
    multiple_choice: number;
    open_ended: number;
    plays: Play[];
};

export type SessionData = {
    id: number;
    title: string;
    description: string | null;
    category: string;
    difficulty: string;
    openTime: Date;
    closeTime: Date;
    timeLimit: number;
    visibility: string;
    totalQuestions: number;
    singleChoiceCount: number;
    multipleChoiceCount: number;
    openEndedCount: number;
    participants: number;
    averageScore: number;
    completionRate: number;
};

export type ParticipantData = {
    id: number;
    name: string;
    email: string;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    timeSpent: number;
    completedAt: Date;
    rank: number;
};

type PageProps = {
    params: { sessionId: string };
};

export default async function SessionDetailsPage({ params }: PageProps): Promise<JSX.Element> {
    const sessionId: string = params.sessionId;
    const { userId }: { userId: string | null } = await auth();

    if (isNaN(Number(sessionId)) || userId === null) {
        return notFound();
    }

    const session: Session | null = await prisma.quizSession.findUnique({
        where: { id: Number(sessionId) },
        select: {
            id: true,
            title: true,
            description: true,
            category: true,
            difficulty: true,
            open_time: true,
            close_time: true,
            time_limit: true,
            visibility: true,
            single_choice: true,
            multiple_choice: true,
            open_ended: true,
            plays: {
                select: {
                    id: true,
                    clerk_id: true,
                    final_score: true,
                    start_time: true,
                    end_time: true,
                    finish_time: true,
                    play_details: {
                        select: {
                            score: true,
                            question: {
                                select: {
                                    type: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    if (!session) {
        return notFound();
    }

    const totalQuestions: number = session.single_choice + session.multiple_choice + session.open_ended;
    const participants: number = session.plays.length;

    const now: Date = new Date();
    const completedPlays: Play[] = session.plays.filter((play) => play.finish_time !== null || play.end_time < now);
    const completionRate: number = participants > 0 ? Math.round((completedPlays.length / participants) * 100) : 0;

    const averageScore: number = completedPlays.length > 0
        ? Math.round(completedPlays.reduce((sum, play) => sum + play.final_score, 0) / completedPlays.length)
        : 0;

    const sessionData: SessionData = {
        id: session.id,
        title: session.title,
        description: session.description,
        category: session.category,
        difficulty: session.difficulty,
        openTime: session.open_time,
        closeTime: session.close_time,
        timeLimit: session.time_limit,
        visibility: session.visibility,
        totalQuestions,
        singleChoiceCount: session.single_choice,
        multipleChoiceCount: session.multiple_choice,
        openEndedCount: session.open_ended,
        participants,
        averageScore,
        completionRate,
    };

    const participantsData: ParticipantData[] = await Promise.all(
        session.plays.map(async (play, index) => {
            const correctAnswers: number = play.play_details.filter((detail) => detail.score > 0).length;
            const timeSpent: number = play.finish_time
                ? Math.floor((new Date(play.finish_time).getTime() - new Date(play.start_time).getTime()) / (1000 * 60))
                : Math.floor((new Date(play.end_time).getTime() - new Date(play.start_time).getTime()) / (1000 * 60));

            const clerkUser: User = await (await clerkClient()).users.getUser(play.clerk_id);

            const userInfo: { name: string; email: string } = {
                name: `${clerkUser.firstName} ${clerkUser.lastName}`,
                email: clerkUser.emailAddresses[0].emailAddress,
            };

            return {
                id: play.id,
                name: userInfo.name,
                email: userInfo.email,
                score: play.final_score,
                totalQuestions,
                correctAnswers,
                timeSpent,
                completedAt: play.finish_time || play.end_time,
                rank: index + 1,
            };
        })
    );

    // Sort participants by score for ranking
    const sortedParticipants: ParticipantData[] = participantsData
        .sort((a: ParticipantData, b: ParticipantData) => b.score - a.score)
        .map((participant: ParticipantData, index: number) => ({
            ...participant,
            rank: index + 1,
        }));

    return <MainSection sessionData={sessionData} participantsData={sortedParticipants} />;
}
