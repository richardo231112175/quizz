'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, type JSX, type Dispatch, type SetStateAction } from 'react';
import { motion } from 'framer-motion';
import { Clock, Star, Users } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { difficulties } from '@/lib/difficulties';

type quizType = {
    id: number;
    title: string;
    category: string;
    difficulty: string;
    questions: number;
    timeEstimate: string;
    plays: number;
    rating: number;
    image: string;
};

export default function FeaturedQuizzes(): JSX.Element {
    const [ hoveredIndex, setHoveredIndex ]: [ number | null, Dispatch<SetStateAction<number | null>> ] = useState<number | null>(null);

    const quizzes: quizType[] = [
        {
            id: 1,
            title: 'World Geography Master',
            category: 'Geography',
            difficulty: 'Medium',
            questions: 20,
            timeEstimate: '15 min',
            plays: 1243,
            rating: 4.8,
            image: 'https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        },
        {
            id: 2,
            title: 'Pop Culture Trivia',
            category: 'Entertainment',
            difficulty: 'Easy',
            questions: 15,
            timeEstimate: '10 min',
            plays: 987,
            rating: 4.6,
            image: 'https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        },
        {
            id: 3,
            title: 'Science Facts Challenge',
            category: 'Science',
            difficulty: 'Hard',
            questions: 25,
            timeEstimate: '20 min',
            plays: 756,
            rating: 4.9,
            image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        },
        {
            id: 4,
            title: 'History Through Ages',
            category: 'History',
            difficulty: 'Medium',
            questions: 18,
            timeEstimate: '15 min',
            plays: 632,
            rating: 4.7,
            image: 'https://images.pexels.com/photos/3095621/pexels-photo-3095621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        },
    ];

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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                            <Link href={`/quizz/${quiz.id}`} className="block h-full">
                                <Card className="overflow-hidden h-full transition-all hover:shadow-md">
                                    <div className="relative h-48 overflow-hidden">
                                        <Image src={quiz.image} alt={quiz.title} fill className="object-cover transition-transform duration-500 ease-in-out" style={{ transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)' }} />
                                        <div className="absolute top-2 right-2">
                                            <Badge className={difficulties[quiz.difficulty as keyof typeof difficulties]}>
                                                {quiz.difficulty}
                                            </Badge>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-1/3" />
                                    </div>
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <Badge variant="outline" className="mb-2">{quiz.category}</Badge>
                                            <div className="flex items-center">
                                                <Star className="h-3.5 w-3.5 text-yellow-400 mr-1" fill="currentColor" />
                                                <span className="text-xs font-medium">{quiz.rating}</span>
                                            </div>
                                        </div>
                                        <CardTitle className="line-clamp-1">{quiz.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pb-2">
                                        <div className="text-sm text-muted-foreground">
                                            {quiz.questions} questions
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between pt-0">
                                        <div className="flex items-center text-xs text-muted-foreground">
                                            <Clock className="h-3.5 w-3.5 mr-1" />
                                            {quiz.timeEstimate}
                                        </div>
                                        <div className="flex items-center text-xs text-muted-foreground">
                                            <Users className="h-3.5 w-3.5 mr-1" />
                                            {quiz.plays.toLocaleString()} plays
                                        </div>
                                    </CardFooter>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
