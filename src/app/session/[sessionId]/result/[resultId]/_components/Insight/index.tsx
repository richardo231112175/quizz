import { type JSX } from 'react';
import { Star } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { formatTimeSpent } from '@/lib/formatTime';

type InsightProps = {
    correctAnswers: number;
    totalQuestions: number;
    timeSpent: number;
    color: string;
    bgColor: string;
    level: string;
};

export default function Insight({ correctAnswers, totalQuestions, timeSpent, color, bgColor, level }: InsightProps): JSX.Element {
    return (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" /> Performance Insights
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span>Accuracy Rate</span>
                        <span className="font-semibold">
                            {Math.round((correctAnswers / totalQuestions) * 100)}%
                        </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span>Average Time per Question</span>
                        <span className="font-semibold">
                            {formatTimeSpent(Math.round(timeSpent / totalQuestions))}
                        </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span>Performance Level</span>
                        <Badge className={`${bgColor} ${color}`}>
                            {level}
                        </Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
