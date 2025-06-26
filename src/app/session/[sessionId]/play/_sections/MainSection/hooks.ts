import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';
import { type Play } from '../../page';

type BaseQuestion = {
    question: string;
    image: string | null;
    maxScore: number;
    timeLimit: number;
};

type AnsweredQuestion = {
    answered: true;
    score: number;
    timeTaken: number;
} | {
    answered: false;
};

type SingleChoiceQuestion = {
    type: 'single_choice';
    options: string[];
    answer: string | null;
};

type MultipleChoiceQuestion = {
    type: 'multiple_choice';
    options: string[];
    answers: string[] | null;
};

type OpenEndedQuestion = {
    type: 'open_ended';
    answer: string | null;
};

export type SingleChoice = BaseQuestion & AnsweredQuestion & SingleChoiceQuestion;
export type MultipleChoice = BaseQuestion & AnsweredQuestion & MultipleChoiceQuestion;
export type OpenEnded = BaseQuestion & AnsweredQuestion & OpenEndedQuestion;

export type Questions = SingleChoice | MultipleChoice | OpenEnded;

export type usePlayQuizType = {
    questions: Questions[];
    setQuestions: Dispatch<SetStateAction<Questions[]>>;
    current: number;
    setCurrent: Dispatch<SetStateAction<number>>;
    totalTime: number;
    questionTime: number;
    isFinished: boolean;
};

export function usePlayQuiz(play: Play): usePlayQuizType {
    const [ questions, setQuestions ]: [ Questions[], Dispatch<SetStateAction<Questions[]>> ] = useState(processPlay(play));
    const [ current, setCurrent ]: [ number, Dispatch<SetStateAction<number>> ] = useState(getCurrent(play));
    const [ totalTime, setTotalTime ]: [ number, Dispatch<SetStateAction<number>> ] = useState(getTimeRange(new Date(), play.end_time));
    const [ questionTime, setQuestionTime ]: [ number, Dispatch<SetStateAction<number>> ] = useState(0);
    const [ isFinished, setIsFinished ]: [ boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);

    useEffect(() => {
        if (isFinished) return;

        const interval: NodeJS.Timeout = setInterval(() => {
            setTotalTime((prev) => {
                if (prev <= 1) {
                    // Complete quiz
                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return (): void => clearInterval(interval);
    }, [ totalTime, isFinished ]);

    return { questions, setQuestions, current, setCurrent, totalTime, questionTime, isFinished };
}

function processPlay(play: Play): Questions[] {
    const questions: Questions[] = play.play_details.map((detail) => {
        const now: Date = new Date();

        const baseQuestion: BaseQuestion = {
            question: detail.question.question,
            image: detail.question.image_url,
            maxScore: detail.question.max_score,
            timeLimit: detail.question.time_limit,
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
                    timeTaken: detail.time_taken,
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
                    timeTaken: detail.time_taken,
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
                    timeTaken: detail.time_taken,
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
