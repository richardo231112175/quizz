import { type JSX } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { difficulties } from '@/lib/difficulties';

type RelatedQuizzesProps = {
    difficulty: string;
};

const RELATED_QUIZZES: { id: string; title: string; difficulty: string; rating: number; plays: number; image: string }[] = [
    {
        id: '2',
        title: 'Basic Chemistry Fundamentals',
        difficulty: 'Easy',
        rating: 4.6,
        plays: 1243,
        image: 'https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
    },
    {
        id: '3',
        title: 'Astronomy and Space Science',
        difficulty: 'Medium',
        rating: 4.7,
        plays: 632,
        image: 'https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
    },
    {
        id: '4',
        title: 'Human Biology Essentials',
        difficulty: 'Medium',
        rating: 4.5,
        plays: 987,
        image: 'https://images.pexels.com/photos/3095621/pexels-photo-3095621.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
    },
];

export default function RelatedQuizzes({ difficulty }: RelatedQuizzesProps): JSX.Element {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Related Quizzes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {RELATED_QUIZZES.map((quiz) => (
                    <Link key={quiz.id} href={`/quiz/${quiz.id}`} className="block">
                        <div className="flex gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <Image src={quiz.image} alt={quiz.title} width="64" height="48" className="object-cover rounded" />
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm line-clamp-2 leading-tight">
                                    {quiz.title}
                                </h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline" className={`text-xs ${difficulties[difficulty]}`}>
                                        {difficulty}
                                    </Badge>
                                    <div className="flex items-center text-xs text-muted-foreground">
                                        <Star className="h-3 w-3 mr-1 text-yellow-400" fill="currentColor" />
                                        {quiz.rating}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </CardContent>
        </Card>
    );
}
