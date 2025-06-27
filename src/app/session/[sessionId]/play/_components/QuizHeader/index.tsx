import { type JSX } from 'react';
import { Clock } from 'lucide-react';
import { Badge } from '@/components/Badge';
import { Progress } from '@/components/Progress';
import { formatCountDown } from '@/lib/formatTime';

type QuizHeaderProps = {
    title: string;
    totalTime: number;
    current: number;
    totalQuestion: number;
};

export default function QuizHeader({ title, totalTime, current, totalQuestion }: QuizHeaderProps): JSX.Element {
    return (
        <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold line-clamp-2">{title}</h1>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>{formatCountDown(totalTime)}</span>
                    </div>
                    <Badge variant="outline" className="text-nowrap">
                        Question {current + 1} of {totalQuestion}
                    </Badge>
                </div>
            </div>
            <Progress
                value={(current / totalQuestion) * 100}
                className="h-2"
            />
        </div>
    );
}
