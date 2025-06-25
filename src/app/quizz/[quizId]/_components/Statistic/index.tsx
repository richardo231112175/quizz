import { type JSX } from 'react';
import { Trophy, Target, Timer, BookOpen } from 'lucide-react';
import { Card } from '@/components/Card';

type StatisticProps = {
    questionCount: number;
    timeLimit: number;
    difficulty: string;
    rating: number;
};

export default function Statistic({ questionCount, timeLimit, difficulty, rating }: StatisticProps): JSX.Element {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 text-center">
                <BookOpen className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">{questionCount}</div>
                <div className="text-sm text-muted-foreground">Questions</div>
            </Card>
            <Card className="p-4 text-center">
                <Timer className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">{timeLimit} min</div>
                <div className="text-sm text-muted-foreground">Duration</div>
            </Card>
            <Card className="p-4 text-center">
                <Target className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold">{difficulty}</div>
                <div className="text-sm text-muted-foreground">Difficulty</div>
            </Card>
            <Card className="p-4 text-center">
                <Trophy className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
                <div className="text-2xl font-bold">{rating}</div>
                <div className="text-sm text-muted-foreground">Rating</div>
            </Card>
        </div>
    );
}
