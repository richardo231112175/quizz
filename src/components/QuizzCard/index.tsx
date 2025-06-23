import { type JSX } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, Star, Clock, Users } from 'lucide-react';
import { Badge } from '@/components/Badge';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/Card';
import { difficulties } from '@/lib/difficulties';
import type { QuizSessionCategory, QuizSessionDifficulty, QuizSessionVisibility } from '../../../generated';

export type quizType = {
    id: number;
    title: string;
    description: string | null;
    image: string | null;
    difficulty: QuizSessionDifficulty;
    category: QuizSessionCategory;
    visibility: QuizSessionVisibility;
    timeLimit: number;
    plays: number;
    rating: number;
    ratingCount: number;
};

type QuizzCardProps = {
    quiz: quizType;
    hovered: boolean;
};

export function QuizzCard({ quiz, hovered }: QuizzCardProps): JSX.Element {
    function formatText(text: string): string {
        const firstLetter: string = text[0].toUpperCase();
        const letters: string = text.slice(1, text.length).toLowerCase();
        return firstLetter + letters;
    }

    return (
        <Link href={`/quizz/${quiz.id}`} className="block h-full">
            <Card className="overflow-hidden h-full transition-all hover:shadow-md">
                <div className="relative h-48 overflow-hidden">
                    {
                        quiz.image !== null && (
                            <Image src={`https://unwvmnaejybxmnfulqli.supabase.co/storage/v1/object/public/quizz//${quiz.image}`} alt={quiz.title} fill className="object-cover transition-transform duration-500 ease-in-out" style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }} />
                        )
                    }
                    <div className="absolute top-2 left-2">
                        <Badge variant="secondary">{formatText(quiz.category)}</Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                        <Badge className={difficulties[formatText(quiz.difficulty)]}>
                            {formatText(quiz.difficulty)}
                        </Badge>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-1/3" />
                </div>
                <CardHeader className="pb-2">
                    <CardTitle className="line-clamp-2 leading-tight">
                        {quiz.visibility === 'PRIVATE' && <Lock className="h-6 w-6 shrink-0 inline mr-2" />}
                        {quiz.title}
                    </CardTitle>
                </CardHeader>
                {quiz.description && <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground line-clamp-2">{quiz.description}</p>
                </CardContent>}
                <CardFooter className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center shrink-0">
                            <Users className="h-4 w-4 mr-1" /> {quiz.plays} plays
                        </div>
                        <div className="flex items-center shrink-0">
                            <Clock className="h-4 w-4 mr-1" /> {quiz.timeLimit} min
                        </div>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" /> {quiz.rating} ({quiz.ratingCount})
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}
