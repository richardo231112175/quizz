'use client';

import { type JSX } from 'react';
import { motion } from 'framer-motion';
import { Play, Share2 } from 'lucide-react';
import { BackButton } from '@/components/BackButton';
import { Button } from '@/components/Button';
import Hero from '../../_components/Hero';
import Statistic from '../../_components/Statistic';
import Description from '../../_components/Description';
import Author from '../../_components/Author';
import Recent from '../../_components/Recent';
import QuizStatistic from '../../_components/QuizStatistic';
import RelatedQuizzes from '../../_components/RelatedQuizzes';
import type { quizType, userType } from '../../page';
import { formatText } from '@/lib/formatText';

type MainSectionProps = {
    quiz: quizType;
    author: userType;
    authorQuizzes: number;
    recentUsers: userType[];
};

export default function MainSection({ quiz, author, authorQuizzes, recentUsers }: MainSectionProps): JSX.Element {
    const difficulty: string = formatText(quiz.difficulty);
    const ratingCount: number = quiz.ratings.length;
    const rating: number = ratingCount ? quiz.ratings.reduce((tot, rat) => tot + rat.rating, 0) / ratingCount : 0;
    const questionCount: number = quiz.single_choice + quiz.multiple_choice + quiz.open_ended;

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="mb-6">
                        <BackButton />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <Hero quiz={quiz} difficulty={difficulty} ratingCount={ratingCount} rating={rating} />
                            <Statistic questionCount={questionCount} timeLimit={quiz.time_limit} difficulty={difficulty} rating={rating} />
                            <div className="flex flex-wrap gap-3">
                                <Button size="lg" onClick={() => {}} className="flex-1">
                                    <Play className="h-4 w-4 mr-2" /> Start Quiz
                                </Button>
                                <Button variant="outline" onClick={() => {}}>
                                    <Share2 className="h-4 w-4 mr-2" /> Share
                                </Button>
                            </div>
                            <Description description={quiz.description} />
                            <Author author={author} quizCount={authorQuizzes} />
                        </div>
                        <div className="space-y-6">
                            <Recent users={recentUsers} plays={quiz.plays} />
                            <QuizStatistic createdAt={quiz.created_at} plays={quiz._count.plays} rating={rating} ratingCount={ratingCount} />
                            <RelatedQuizzes difficulty={difficulty} />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
