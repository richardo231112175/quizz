'use client';

import Link from 'next/link';
import { useState, type JSX, type Dispatch, type SetStateAction } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from '@/components/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';
import QuizSection from '../QuizSection';
import { type Quiz } from '../../page';

type MainSectionProps = {
    quizzes: Quiz[]
};

export default function MainSection({ quizzes }: MainSectionProps): JSX.Element {
    const [ activeTab, setActiveTab ]: [ string, Dispatch<SetStateAction<string>> ] = useState<string>('quizzes');

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-4xl font-bold tracking-tight">My Dashboard</h1>
                        <Button asChild>
                            <Link href="/create">
                                <Plus className="h-4 w-4 mr-2" /> Create Quiz
                            </Link>
                        </Button>
                    </div>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="mb-8">
                            <TabsTrigger value="quizzes">My Quizzes</TabsTrigger>
                            <TabsTrigger value="sessions">Quiz Sessions</TabsTrigger>
                        </TabsList>
                        <TabsContent value="quizzes">
                            <QuizSection quizzes={quizzes} />
                        </TabsContent>
                        <TabsContent value="sessions">
                            <h1>Sessions</h1>
                        </TabsContent>
                    </Tabs>
                </motion.div>
            </div>
        </div>
    );
}
