import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import SessionDetailsPage from './index';
import { clerkClient } from '@clerk/nextjs/server';
import type { ClerkClient as clerkType, User as clerkUserType } from '@clerk/backend';
import { JSX } from 'react';
import type { QuizSessionDifficulty, QuizSessionCategory, QuizSessionVisibility } from '../../../../../generated';

export type PlayDetails = {
    score:number;
    time_taken:number;
}

export type dataPlayer = {
    id: number; // Based on error: id: number
    clerk_id: string;
    quiz_session_id: number;
    final_score: number;
    max_score: number;
    finish_time: Date | null; // Matches the 'finish_time' from Prisma
    start_time: Date;
    end_time: Date;
    play_details:PlayDetails[]
}

export interface completeDataPlayer extends dataPlayer {
  name: string;
  email: string | null;
  imageUrl: string;
  nonZeroCount:number;
  timeTaken:number;
}

type ClientType = Awaited<ReturnType<typeof clerkClient>>;
type PaginatedUsersResponse = Awaited<ReturnType<ClientType['users']['getUserList']>>;

export type SessionData =  {
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
        single_choice: number;
        multiple_choice: number;
        open_ended: number;
        plays:dataPlayer[];
}

type SessionPageDetailProps = {
    params: { sessionId: string };
};

export default async function getPlayerData( { params }: SessionPageDetailProps): Promise<JSX.Element> {
    const { sessionId }: { sessionId: string } = params;
    const sessionData: SessionData = (await prisma.quizSession.findUnique({
        where: { id: Number(sessionId) },
        include: {
            plays: {
                include:{
                    play_details:{
                        select:{
                            score:true,
                            time_taken:true,
                        },
                    },
                },
                orderBy: {
                    final_score: 'desc',
                },
            },
        },
    }))!;

    if (!sessionData) {
        return notFound();
    }
    const raw :dataPlayer[] = sessionData.plays;
    const clerkIds:string[] = raw.map((player) => player.clerk_id);
    const client:clerkType = await clerkClient();
    const paginatedResponse:PaginatedUsersResponse = await client.users.getUserList({
        userId: clerkIds,
    });
    const clerkUsers: clerkUserType[] = paginatedResponse.data;
    const clerkUserMap : Map<string,clerkUserType>= new Map(clerkUsers.map((user) => [ user.id, user ]));
    const playerData:completeDataPlayer[] = sessionData.plays.map((player) => {
        const clerkUser:clerkUserType| undefined = clerkUserMap.get(player.clerk_id);

        const name:string = clerkUser ? `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() : 'Unknown User';
        const email:string | null= clerkUser ? clerkUser.emailAddresses.find((e) => e.id === clerkUser.primaryEmailAddressId)?.emailAddress || null : null;
        const imageUrl:string = clerkUser ? clerkUser.imageUrl : '/default-avatar.png'; 
        const details:PlayDetails[] = player.play_details;
        const nonZeroCount:number = details.filter((detail) => detail.score !== 0).length;
        const timeTaken:number = details.reduce((sum,detail)=> sum + detail.time_taken,0);
        return {
            ...player, 
            name,     
            email,    
            imageUrl,
            nonZeroCount,
            timeTaken,
        };
    });
    

    return <SessionDetailsPage sessionData={sessionData} playerData={playerData}/>;
}
