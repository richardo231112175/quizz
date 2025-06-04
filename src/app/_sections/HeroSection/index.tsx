'use client';

import Link from 'next/link';
import { useEffect, useState, type JSX, type Dispatch, type SetStateAction } from 'react';
import { motion, type Variants } from 'framer-motion';
import { BrainCog, PenTool, Trophy } from 'lucide-react';
import { Button } from '@/components/Button';

type featureType = {
    icon: JSX.Element;
    title: string;
    description: string;
};

export default function HeroSection(): JSX.Element {
    const [ isVisible, setIsVisible ]: [ boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const features: featureType[] = [
        {
            icon: <BrainCog className="h-8 w-8 mb-4 text-indigo-500" />,
            title: 'Diverse Categories',
            description: "From science to pop culture, we've got quizzes for every interest.",
        },
        {
            icon: <PenTool className="h-8 w-8 mb-4 text-purple-500" />,
            title: 'Easy Creation',
            description: 'Build your own quizzes in minutes with our intuitive creator tool.',
        },
        {
            icon: <Trophy className="h-8 w-8 mb-4 text-pink-500" />,
            title: 'Compete & Win',
            description: 'Challenge friends and climb the leaderboards.',
        },
    ];

    return (
        <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background -z-10" />
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] -z-10" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div variants={container} initial="hidden" animate={isVisible ? 'show' : 'hidden'} className="flex flex-col items-center text-center">
                    <motion.div variants={item} className="mb-3">
                        <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">The Ultimate Quiz Experience</span>
                    </motion.div>
                    <motion.h1 variants={item} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                        Create, Share & Play <br />
                        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Incredible Quizzes</span>
                    </motion.h1>
                    <motion.p variants={item} className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">Challenge friends, test your knowledge, and create engaging quizzes on any topic. Join thousands of quiz enthusiasts in our growing community.</motion.p>
                    <motion.div variants={item} className="flex flex-wrap gap-4 justify-center">
                        <Button size="lg" asChild>
                            <Link href="/create">
                                <PenTool className="mr-2 h-5 w-5" /> Create Quiz
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/browse">
                                <BrainCog className="mr-2 h-5 w-5" /> Play Now
                            </Link>
                        </Button>
                    </motion.div>
                    <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 w-full max-w-4xl">
                        {features.map((feature, index) => (
                            <motion.div key={index} whileHover={{ y: -5, transition: { duration: 0.2 } }} className="flex flex-col items-center p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm">
                                {feature.icon}
                                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground text-center">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
