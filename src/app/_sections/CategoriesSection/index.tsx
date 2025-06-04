'use client';

import { type JSX } from 'react';
import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { categories } from '@/lib/categories';

export default function CategoriesSection(): JSX.Element {
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
        <section className="py-16 md:py-24 bg-muted/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight mb-2">Browse by Category</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">Discover quizzes across a wide range of topics to test your knowledge</p>
                </div>
                <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-100px' }} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {categories.map((category) => (
                        <motion.div key={category.id} variants={item} transition={{ duration: 0.3 }}>
                            <Link href={`/categories/${category.id}`}>
                                <motion.div whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }} transition={{ duration: 0.2 }} className="bg-card border border-border/50 rounded-xl p-6 flex flex-col items-center text-center h-full">
                                    <div className={cn(category.color, 'w-14 h-14 rounded-full bg-gradient-to-br flex items-center justify-center mb-4')}>
                                        <category.icon className="h-7 w-7 text-white" />
                                    </div>
                                    <h3 className="font-semibold mb-1">{category.name}</h3>
                                    <p className="text-sm text-muted-foreground">{category.quizCount} quizzes</p>
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
