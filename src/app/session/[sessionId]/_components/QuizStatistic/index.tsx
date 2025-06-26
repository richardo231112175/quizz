import { type JSX } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { Separator } from '@/components/Separator';
import { formatTime } from '@/lib/formatTime';

type QuizStatisticProps = {
    createdAt: Date;
    plays: number;
    rating: number;
    ratingCount: number;
};

export default function QuizStatistic({ createdAt, plays, rating, ratingCount }: QuizStatisticProps): JSX.Element {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Quiz Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Created</span>
                    <span className="text-sm font-medium">
                        {formatTime(createdAt)}
                    </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Attempts</span>
                    <span className="text-sm font-medium">{plays}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Average Rating</span>
                    <span className="text-sm font-medium">{rating}/5.0</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Ratings</span>
                    <span className="text-sm font-medium">{ratingCount}</span>
                </div>
            </CardContent>
        </Card>
    );
}
