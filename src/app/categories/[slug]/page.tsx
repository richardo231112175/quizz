'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { Params, ParamValue } from 'next/dist/server/request/params';
import { type JSX } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/Button';
import { QuizzCard } from '@/components/QuizzCard';
import { BackButton } from '@/components/BackButton';
import { categories, type categoryType } from '@/lib/categories';
import { useCategoriesSlug, type useCategoriesSlugType } from './hooks';

export default function CategorysSlugPage(): JSX.Element {
    const params: Params = useParams();
    const slug: ParamValue = params.slug;
    const category: categoryType | undefined = categories.find((cat) => cat.id === slug);

    const { quizzes, loading, hasMore, page, loadQuizzes }: useCategoriesSlugType = useCategoriesSlug(slug as string);

    if (!category) {
        return (
            <div className="min-h-screen pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
                    <p className="text-lg text-muted-foreground mb-8">The category you&apos;re looking for doesn&apos;t exist.</p>
                    <Button asChild>
                        <Link href="/categories">Browse All Categories</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4 mb-8">
                    <BackButton />
                </div>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-12">
                    <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center flex-shrink-0`}>
                        <category.icon className="h-12 w-12 text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-center md:text-left">{category.name} Quizzes</h1>
                        <p className="text-lg text-muted-foreground max-w-2xl text-center md:text-left">
                            {category.description}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quizzes.map((quiz, index) => (
                        <motion.div
                            key={quiz.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <QuizzCard quiz={quiz} hovered={false} />
                        </motion.div>
                    ))}
                </div>
                {quizzes.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <p className="text-lg text-muted-foreground">No quizzes found for this category.</p>
                    </div>
                )}
                {hasMore && (
                    <div className="flex justify-center mt-8">
                        <Button onClick={() => loadQuizzes(page + 1)} disabled={loading}>
                            {loading ? 'Loading...' : 'Show More'}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
