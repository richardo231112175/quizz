import { useState, useCallback, useEffect, type Dispatch, type SetStateAction } from 'react';
import { type Play } from '../../page';
import { startQuestion, submitAnswer, type startQuestionReturn, type submitAnswerReturn } from './actions';

type BaseQuestion = {
    id: number;
    question: string;
    image: string | null;
    maxScore: number;
    timeLimit: number | null;
};

type SingleChoiceQuestion = {
    type: 'single_choice';
    options: string[];
    answer: string | null;
};

type SingleChoiceAnswer = {
    answered: true;
    score: number;
    timeTaken: number;
    correctAnswer: string;
} | {
    answered: false;
};

type MultipleChoiceQuestion = {
    type: 'multiple_choice';
    options: string[];
    answers: string[] | null;
};

type MultipleChoiceAnswer = {
    answered: true;
    score: number;
    timeTaken: number;
    correctAnswers: string[];
} | {
    answered: false;
};

type OpenEndedQuestion = {
    type: 'open_ended';
    answer: string | null;
};

type OpenEndedAnswer = {
    answered: true;
    score: number;
    timeTaken: number;
    correctAnswer: string;
} | {
    answered: false;
};

export type SingleChoice = BaseQuestion & SingleChoiceQuestion & SingleChoiceAnswer;
export type MultipleChoice = BaseQuestion & MultipleChoiceQuestion & MultipleChoiceAnswer;
export type OpenEnded = BaseQuestion & OpenEndedQuestion & OpenEndedAnswer;

export type Questions = SingleChoice | MultipleChoice | OpenEnded;

export type usePlayQuizType = {
    questions: Questions[];
    setQuestions: Dispatch<SetStateAction<Questions[]>>;
    current: number;
    setCurrent: Dispatch<SetStateAction<number>>;
    totalTime: number;
    questionTime: number;
    isSubmitting: boolean;
    handleSubmit: () => Promise<void>;
    fetchingQuestion: boolean;
    handleNextQuestion: (index?: number) => Promise<void>;
    isFinished: boolean;
    finishTime: number;
    playId: number;
};

export function usePlayQuiz(play: Play): usePlayQuizType {
    const [ questions, setQuestions ]: [ Questions[], Dispatch<SetStateAction<Questions[]>> ] = useState(processPlay(play));
    const [ current, setCurrent ]: [ number, Dispatch<SetStateAction<number>> ] = useState(getCurrent(play));
    const [ totalTime, setTotalTime ]: [ number, Dispatch<SetStateAction<number>> ] = useState(getTimeRange(new Date(), play.end_time));
    const [ questionTime, setQuestionTime ]: [ number, Dispatch<SetStateAction<number>> ] = useState(0);
    const [ fetchingQuestion, setFetchingQuestion ]: [ boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);
    const [ isSubmitting, setIsSubmitting ]: [ boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);
    const [ isFinished, setIsFinished ]: [ boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);
    const [ finishTime, setFinishTime ]: [ number, Dispatch<SetStateAction<number>> ] = useState(0);
    const [ playId, setPlayId ]: [ number, Dispatch<SetStateAction<number>> ] = useState(0);

    const handleSubmit: () => Promise<void> = useCallback(async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        const answer: string | string[] | null = questions[current].type === 'multiple_choice'
            ? questions[current].answers
            : questions[current].answer;

        const result: submitAnswerReturn | void = await submitAnswer(questions[current].id, answer);
        if (result) {
            setQuestions((question) => question.map((q, i) => {
                if (i !== current) return q;

                if (q.type === 'multiple_choice') return {
                    ...q,
                    answered: true,
                    score: result.score,
                    timeTaken: result.timeTaken,
                    correctAnswers: result.correctAnswer as string[],
                };

                return {
                    ...q,
                    answered: true,
                    score: result.score,
                    timeTaken: result.timeTaken,
                    correctAnswer: result.correctAnswer as string,
                };
            }));

            if (result.isFinished) {
                setIsFinished(true);
                setFinishTime(result.finishTime!);
                setPlayId(result.playId);
            }
        }

        setIsSubmitting(false);
    }, [ current, isSubmitting, questions ]);

    useEffect(() => {
        if (totalTime <= 0) return;

        const interval: NodeJS.Timeout = setInterval(() => {
            setTotalTime((prev) => {
                if (prev <= 1) {
                    handleSubmit();
                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return (): void => clearInterval(interval);
    }, [ totalTime, handleSubmit ]);

    useEffect(() => {
        if (questionTime <= 0) return;

        const interval: NodeJS.Timeout = setInterval(() => {
            setQuestionTime((prev) => {
                if (prev <= 1) {
                    handleSubmit();
                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return (): void => clearInterval(interval);
    }, [ questionTime, handleSubmit ]);

    useEffect(() => {
        handleNextQuestion(0);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    async function handleNextQuestion(index: number | undefined): Promise<void> {
        const tempCurrent: number = index !== undefined ? index : Math.min(questions.length - 1, current + 1);

        if (questions[tempCurrent].answered || questions[tempCurrent].timeLimit !== null || fetchingQuestion) {
            setCurrent(tempCurrent);
            return;
        }

        setFetchingQuestion(true);

        const result: startQuestionReturn | void = await startQuestion(questions[tempCurrent].id);

        if (result) {
            const now: Date = new Date();
            const qTime: number = Math.floor((result.endTime.getTime() - now.getTime()) / 1000);

            setQuestionTime(qTime);
            setQuestions((questions) => questions.map((q, i) => i === tempCurrent ? ({
                ...q,
                timeLimit: result.timeLimit,
            }) : q));
        } else {
            setCurrent((prev) => Math.max(prev === tempCurrent ? tempCurrent - 1 : prev, 0));
        }

        setCurrent(tempCurrent);
        setFetchingQuestion(false);
    }

    return {
        questions,
        setQuestions,
        current,
        setCurrent,
        totalTime,
        questionTime,
        isSubmitting,
        handleSubmit,
        fetchingQuestion,
        handleNextQuestion,
        isFinished,
        finishTime,
        playId,
    };
}

function processPlay(play: Play): Questions[] {
    const questions: Questions[] = play.play_details.map((detail) => {
        const now: Date = new Date();

        const baseQuestion: BaseQuestion = {
            id: detail.id,
            question: detail.question.question,
            image: detail.question.image_url,
            maxScore: detail.question.max_score,
            timeLimit: null,
        };

        if (detail.question.type === 'SINGLE_CHOICE') {
            const question: SingleChoiceQuestion = {
                type: 'single_choice',
                options: JSON.parse(detail.question.single_choice_options!),
                answer: null,
            };

            return {
                ...baseQuestion,
                ...question,
                ...(detail.answer !== null || (detail.end_time && detail.end_time < now) ? {
                    answered: true,
                    answer: detail.answer,
                    score: detail.score,
                    timeLimit: detail.question.time_limit,
                    timeTaken: detail.time_taken,
                    correctAnswer: detail.question.single_choice_correct!,
                } : { answered: false }),
            };
        } else if (detail.question.type === 'MULTIPLE_CHOICE') {
            const question: MultipleChoiceQuestion = {
                type: 'multiple_choice',
                options: JSON.parse(detail.question.multiple_choice_options!),
                answers: null,
            };

            return {
                ...baseQuestion,
                ...question,
                ...(detail.answer !== null || (detail.end_time && detail.end_time < now) ? {
                    answered: true,
                    answers: JSON.parse(detail.answer!),
                    score: detail.score,
                    timeLimit: detail.question.time_limit,
                    timeTaken: detail.time_taken,
                    correctAnswers: JSON.parse(detail.question.multiple_choice_correct!),
                } : { answered: false }),
            };
        } else {
            const question: OpenEndedQuestion = {
                type: 'open_ended',
                answer: null,
            };

            return {
                ...baseQuestion,
                ...question,
                ...(detail.answer !== null || (detail.end_time && detail.end_time < now) ? {
                    answered: true,
                    answer: detail.answer,
                    score: detail.score,
                    timeLimit: detail.question.time_limit,
                    timeTaken: detail.time_taken,
                    correctAnswer: detail.question.open_ended_answer_key!,
                } : { answered: false }),
            };
        }
    });

    return questions;
}

function getCurrent(play: Play): number {
    let current: number = 0;
    const now: Date = new Date();

    for (let i: number = 0; i < play.play_details.length; i ++) {
        current = i;
        if (play.play_details[i].answer === null && (play.play_details[i].end_time === null || (play.play_details[i].end_time && play.play_details[i].end_time! > now))) break;
    }

    return current;
}

function getTimeRange(startDate: Date, endDate: Date): number {
    return Math.floor((endDate.getTime() - startDate.getTime()) / 1000);
}
