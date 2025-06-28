import type { JSX, Dispatch, SetStateAction } from 'react';
import { Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import SingleChoice from '../SingleChoice';
import MultipleChoice from '../MultipleChoice';
import OpenEnded from '../OpenEnded';
import { type Questions } from '../../_sections/MainSection/hooks';
import { formatCountDown } from '@/lib/formatTime';

type QuestionCardProps = {
    index: number;
};

export default function QuestionCard({ index }: QuestionCardProps): JSX.Element {
    return (
        <Card key={index} className="mb-6">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                        Question {index + 1}
                    </CardTitle>
                    <div className="flex items-center gap-4 md:gap-8">
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm font-mono">
                                {questions[current].answered ? formatCountDown(questions[current].timeTaken) : formatCountDown(questionTime)}
                            </span>
                        </div>
                        {questions[current].answered && (
                            <div className="text-sm font-mono text-right">
                                Score: <span className="font-semibold">{questions[current].score}</span> / {questions[current].maxScore}
                            </div>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h2 className="text-xl font-semibold mb-4">{questions[current].question}</h2>
                    {questions[current].image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL + questions[current].image}
                            alt="Question illustration"
                            className="w-full max-w-md mx-auto rounded-lg mb-4"
                        />
                    )}
                </div>

                {questions[current].type === 'single_choice' ? (
                    <SingleChoice
                        options={[]}
                        answer={''}
                        correctAnswer={''}
                    />
                ) : questions[current].type === 'multiple_choice' ? (
                    <MultipleChoice
                        options={[]}
                        answers={[]}
                        correctAnswers={[]}
                    />
                ) : (
                    <OpenEnded
                        answer={''}
                        correctAnswer={''}
                    />
                )}
            </CardContent>
        </Card>
    );
}
