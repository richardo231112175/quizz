'use client';

import Link from 'next/link';
import { type JSX } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/Button';
import { QuizzCard } from '@/components/QuizzCard';
import { useFeaturedQuizzes, type useFeaturedQuizzesType } from './hooks';

export default function FeaturedQuizzes(): JSX.Element {
    const { hoveredIndex, setHoveredIndex, quizzes }: useFeaturedQuizzesType = useFeaturedQuizzes();

    return (
        <section className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Quizzes</h2>
                        <p className="text-muted-foreground max-w-2xl">Discover our most popular quizzes enjoyed by thousands of quiz enthusiasts</p>
                    </div>
                    <Button variant="ghost" asChild className="mt-4 md:mt-0">
                        <Link href="/browse">View All Quizzes</Link>
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quizzes.map((quiz, index) => (
                        <motion.div
                            key={quiz.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            onHoverStart={() => setHoveredIndex(index)}
                            onHoverEnd={() => setHoveredIndex(null)}
                        >
                            <QuizzCard quiz={quiz} hovered={hoveredIndex === index} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
