import { type JSX } from 'react';
import { Users, Trophy, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { getStatus, type Status } from '@/lib/getStatus';
import { difficulties } from '@/lib/difficulties';
import { formatText } from '@/lib/formatText';

type OverviewProps = {
    participants: number;
    completionRate: number;
    averageScore: number;
    totalQuestions: number;
    timeLimit: number;
    category: string;
    difficulty: string;
    openTime: Date;
    closeTime: Date;
};

export default function Overview({ participants, completionRate, averageScore, totalQuestions, timeLimit, category, difficulty, openTime, closeTime }: OverviewProps): JSX.Element {
    const { status, className }: Status = getStatus(openTime, closeTime);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{participants}</div>
                    <p className="text-xs text-muted-foreground">
                        {completionRate}% completion rate
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{averageScore}%</div>
                    <p className="text-xs text-muted-foreground">
                        Out of {totalQuestions} questions
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Time Limit</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{timeLimit} min</div>
                    <p className="text-xs text-muted-foreground">
                        Per session
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        <Badge className={className}>{status}</Badge>
                        <Badge>{formatText(category)}</Badge>
                        <Badge className={difficulties[formatText(difficulty)]}>
                            {formatText(difficulty)}
                        </Badge>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
