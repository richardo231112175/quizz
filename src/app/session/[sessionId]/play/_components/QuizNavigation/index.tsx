import type { JSX, Dispatch, SetStateAction } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/Button';

type QuizNavigationProps = {
    current: number;
    setCurrent: Dispatch<SetStateAction<number>>;
    totalQuestion: number;
    fetchingQuestion: boolean;
    handleNextQuestion: (index?: number) => Promise<void>;
    isFinished: boolean;
};

export default function QuizNavigation({ current, setCurrent, totalQuestion, fetchingQuestion, handleNextQuestion, isFinished }: QuizNavigationProps): JSX.Element {
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
            {isLastQuestion || isFinished ? (
                <Button onClick={() => {}}>
                    View result
                </Button>
            ) : (
                <Button disabled={fetchingQuestion} onClick={() => handleNextQuestion()}>
                    Next Question <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
            )}
        </div>
    );
}
