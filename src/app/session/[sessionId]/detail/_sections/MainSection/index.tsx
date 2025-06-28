'use client';

import { type JSX } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from '@/components/Tabs';
import { BackButton } from '@/components/BackButton';
import type { SessionData, ParticipantData } from '../../page';
import Overview from '../../_components/Overview';
import Participants from '../../_components/Participants';
import Settings from '../../_components/Settings';
import Analytics from '../../_components/Analytics';

type SessionDetailsClientProps = {
    sessionData: SessionData;
    participantsData: ParticipantData[];
};

export default function SessionDetailsClient({ sessionData, participantsData }: SessionDetailsClientProps): JSX.Element {
    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <BackButton />
                    <div className="mt-4 mb-8">
                        <h1 className="mb-2 text-4xl font-bold tracking-tight truncate">{sessionData.title}</h1>
                        {sessionData.description && <p className="text-lg text-muted-foreground line-clamp-2">{sessionData.description}</p>}
                    </div>
                    <Overview
                        participants={sessionData.participants}
                        completionRate={sessionData.completionRate}
                        averageScore={sessionData.averageScore}
                        totalQuestions={sessionData.totalQuestions}
                        timeLimit={sessionData.timeLimit}
                        category={sessionData.category}
                        difficulty={sessionData.difficulty}
                        openTime={sessionData.openTime}
                        closeTime={sessionData.closeTime}
                    />
                    <Tabs defaultValue="participants" className="space-y-6">
                        <TabsList>
                            <TabsTrigger value="participants">Participants</TabsTrigger>
                            <TabsTrigger value="analytics">Analytics</TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                        </TabsList>
                        <Participants title={sessionData.title} participantsData={participantsData} />
                        <Analytics
                            participants={participantsData}
                            totalQuestions={sessionData.totalQuestions}
                            visibility={sessionData.visibility}
                            timeLimit={sessionData.timeLimit}
                            category={sessionData.category}
                        />
                        <Settings
                            openTime={sessionData.openTime}
                            closeTime={sessionData.closeTime}
                            visibility={sessionData.visibility}
                            totalQuestions={sessionData.totalQuestions}
                            singleChoiceCount={sessionData.singleChoiceCount}
                            multipleChoiceCount={sessionData.multipleChoiceCount}
                            openEndedCount={sessionData.openEndedCount}
                        />
                    </Tabs>
                </motion.div>
            </div>
        </div>
    );
}
