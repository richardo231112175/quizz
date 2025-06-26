import type { Metadata, ResolvingMetadata } from 'next';
import { type AbsoluteTemplateString } from 'next/dist/lib/metadata/types/metadata-types';
import { type JSX } from 'react';
import prisma from '@/lib/prisma';

type sessionMetadataType = {
    title: string;
    description: string | null;
};

type PlayPageProps = {
    params: { sessionId: string };
};

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

export default function PlayPage(): JSX.Element {
    return <h1>Hello World</h1>;
}
