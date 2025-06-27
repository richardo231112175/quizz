import type { JSX, Dispatch, SetStateAction } from 'react';
import { Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import { Button } from '@/components/Button';
import SingleChoice from '../SingleChoice';
import MultipleChoice from '../MultipleChoice';
import OpenEnded from '../OpenEnded';
import { type Questions } from '../../_sections/MainSection/hooks';
import { useQuestionCard, type useQuestionCardType } from './hooks';
import { formatCountDown } from '@/lib/formatTime';

type QuestionCardProps = {
    questions: Questions[];
    setQuestions: Dispatch<SetStateAction<Questions[]>>;
    current: number;
    questionTime: number;
    isSubmitting: boolean;
    handleSubmit: () => Promise<void>;
};

export default function QuestionCard({ questions, setQuestions, current, questionTime, isSubmitting, handleSubmit }: QuestionCardProps): JSX.Element {
    const {
        singleChoiceHandler,
        multipleChoiceHandler,
        openEndedHandler,
    }: useQuestionCardType = useQuestionCard({ setQuestions, current });

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
                            {questions[current].answered ? formatCountDown(questions[current].timeTaken) : formatCountDown(questionTime)}
                        </span>
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
                        options={questions[current].options}
                        answer={questions[current].answer}
                        setAnswer={singleChoiceHandler}
                        correctAnswer={questions[current].answered ? questions[current].correctAnswer : null}
                        isSubmitting={isSubmitting}
                    />
                ) : questions[current].type === 'multiple_choice' ? (
                    <MultipleChoice
                        options={questions[current].options}
                        answers={questions[current].answers}
                        setAnswer={multipleChoiceHandler}
                        correctAnswers={questions[current].answered ? questions[current].correctAnswers : null}
                        isSubmitting={isSubmitting}
                    />
                ) : (
                    <OpenEnded
                        answer={questions[current].answer}
                        setAnswer={openEndedHandler}
                        correctAnswer={questions[current].answered ? questions[current].correctAnswer : null}
                        isSubmitting={isSubmitting}
                    />
                )}

                {!questions[current].answered && (
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full"
                    >
                        Submit Answer
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
