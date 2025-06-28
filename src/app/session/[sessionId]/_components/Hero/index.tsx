import { type JSX } from 'react';
import Image from 'next/image';
import { Lock, Star, Users } from 'lucide-react';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { difficulties } from '@/lib/difficulties';
import { formatText } from '@/lib/formatText';
import { sessionType } from '../../page';

type HeroProps = {
    quiz: sessionType;
    difficulty: string;
    ratingCount: number;
    rating: number;
};

export default function Hero({ quiz, difficulty, ratingCount, rating }: HeroProps): JSX.Element {
    return (
        <Card className="overflow-hidden">
            <div className="relative h-64 md:h-80">
                {quiz.image_url && <Image src={process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL! + quiz.image_url} alt={quiz.title} className="object-cover" fill />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="secondary">{formatText(quiz.category)}</Badge>
                        <Badge className={difficulties[difficulty]}>
                            {difficulty}
                        </Badge>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 line-clamp-2">
                        {quiz.visibility === 'PRIVATE' && <Lock className="h-8 w-8 shrink-0 inline mr-2" />}
                        {quiz.title}
                    </h1>
                    <div className="flex items-center gap-4 text-white/90 text-sm">
                        <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
                            <span>{rating} ({ratingCount})</span>
                        </div>
                        <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{quiz._count.plays} plays</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
