import type { JSX, Dispatch, SetStateAction } from 'react';
import { Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import { Button } from '@/components/Button';
import SingleChoice from '../SingleChoice';
import { type Questions } from '../../_sections/MainSection/hooks';
import { useQuestionCard, type useQuestionCardType } from './hooks';

type QuestionCardProps = {
    question: Questions;
    setQuestions: Dispatch<SetStateAction<Questions[]>>;
    current: number;
    questionTime: number;
};

export default function QuestionCard({ question, setQuestions, current, questionTime }: QuestionCardProps): JSX.Element {
    const { isSubmitting, submitAnswer, formatTime }: useQuestionCardType = useQuestionCard();

    return (
        <Card className="mb-6">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                        Question {current + 1}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm font-mono">
                            {question.answered ? formatTime(question.timeTaken) : formatTime(questionTime)}
                        </span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
                    {question.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={question.image}
                            alt="Question illustration"
                            className="w-full max-w-md mx-auto rounded-lg mb-4"
                        />
                    )}
                </div>

                {question.type === 'single_choice' ? (
                    <SingleChoice
                        options={question.options}
                        answer={question.answer}
                        setAnswer={(answer: string) => setQuestions((prev) => prev.map((p, i) => i === current ? {
                            ...p,
                            answer,
                        } : p))}
                        correctAnswer={question.answered ? question.}
                        disabled={}
                    />
                ) : (
                    <h1>Hello World</h1>
                )}

                {!question.answered && (
                    <Button onClick={submitAnswer} disabled={isSubmitting} className="w-full">Submit Answer</Button>
                )}
            </CardContent>
        </Card>
    );
}
