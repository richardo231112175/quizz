import { type JSX } from 'react';
import { Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { formatTimeSpent } from '@/lib/formatTime';

type PerformanceProps = {
    percentage: number;
    correct: number;
    totalQuestions: number;
    score: number;
    maxScore: number;
    time: number;
};

export default function Performance({ percentage, correct, totalQuestions, score, maxScore, time }: PerformanceProps): JSX.Element {
    return (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" /> Your Performance
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-1">
                            {percentage}%
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Overall Score
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold mb-1">
                            {correct}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Correct out of {totalQuestions}
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold mb-1">
                            {score}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Points out of {maxScore}
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold mb-1">
                            {formatTimeSpent(time)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Time Spent
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
