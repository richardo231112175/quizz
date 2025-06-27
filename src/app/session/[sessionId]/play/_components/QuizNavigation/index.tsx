import type { JSX, Dispatch, SetStateAction } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/Button';

type QuizNavigationProps = {
    current: number;
    setCurrent: Dispatch<SetStateAction<number>>;
    totalQuestion: number;
};

export default function QuizNavigation({ current, setCurrent, totalQuestion }: QuizNavigationProps): JSX.Element {
    const isLastQuestion: boolean = totalQuestion - 1 === current;

    return (
        <div className="flex justify-between">
            <Button
                variant="outline"
                onClick={() => setCurrent((prev) => Math.max(0, prev - 1))}
                disabled={current === 0}
            >
                <ArrowLeft className="h-4 w-4 mr-2" /> Previous
            </Button>
            <Button onClick={() => setCurrent((prev) => Math.min(totalQuestion - 1, prev + 1))}>
                {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
                {!isLastQuestion && <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
        </div>
    );
}
