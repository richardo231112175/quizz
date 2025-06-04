'use client';

import Link from 'next/link';
import { type JSX } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Button } from '@/components/Button';
import { categories } from '@/lib/categories';
import { cn } from '@/lib/utils';

export default function CategoriesPage(): JSX.Element {
    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Quiz Categories</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Explore our diverse collection of quizzes across various categories</p>
                </div>
                <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <motion.div key={category.id} variants={item} transition={{ duration: 0.3 }}>
                            <Link href={`/categories/${category.id}`} className="block h-full">
                                <motion.div transition={{ duration: 0.2 }} whileHover={{ y: -5 }} className="group relative h-full overflow-hidden bg-card rounded-xl border border-border/50">
                                    <div className="absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
                                    <div className="relative p-6">
                                        <div className={cn(category.color, 'w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300')}>
                                            <category.icon className="h-8 w-8 text-white" />
                                        </div>
                                        <h2 className="text-2xl font-semibold mb-2">{category.name}</h2>
                                        <p className="text-muted-foreground mb-4">{category.description}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">{category.quizCount} quizzes</span>
                                            <Button variant="ghost" className="group-hover:translate-x-1 transition-transform duration-300">Explore →</Button>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
