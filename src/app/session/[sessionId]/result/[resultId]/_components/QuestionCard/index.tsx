import type { JSX } from 'react';
import { Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import SingleChoice from '../SingleChoice';
import MultipleChoice from '../MultipleChoice';
import OpenEnded from '../OpenEnded';
import { type Questions } from '../../_sections/MainSection/hooks';
import { formatTimeSpent } from '@/lib/formatTime';

type QuestionCardProps = {
    index: number;
    question: Questions;
};

export default function QuestionCard({ index, question }: QuestionCardProps): JSX.Element {
    return (
        <Card className="mb-6">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                        Question {index + 1}
                    </CardTitle>
                    <div className="flex items-center gap-4 md:gap-8">
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm font-mono">
                                {formatTimeSpent(question.timeTaken)}
                            </span>
                        </div>
                        <div className="text-sm font-mono text-right">
                            Score: <span className="font-semibold">{question.score}</span> / {question.maxScore}
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
                    {question.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL + question.image}
                            alt="Question illustration"
                            className="w-full max-w-md mx-auto rounded-lg mb-4"
                        />
                    )}
                </div>

                {question.type === 'single_choice' ? (
                    <SingleChoice
                        options={question.options}
                        answer={question.answer}
                        correctAnswer={question.correctAnswer}
                    />
                ) : question.type === 'multiple_choice' ? (
                    <MultipleChoice
                        options={question.options}
                        answers={question.answers}
                        correctAnswers={question.correctAnswers}
                    />
                ) : (
                    <OpenEnded
                        answer={question.answer}
                        correctAnswer={question.correctAnswer}
                    />
                )}
            </CardContent>
        </Card>
    );
}
