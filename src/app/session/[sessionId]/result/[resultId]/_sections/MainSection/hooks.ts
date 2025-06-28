import { useState, type Dispatch, type SetStateAction } from 'react';
import { type Play } from '../../page';

type BaseQuestion = {
    question: string;
    image: string | null;
    maxScore: number;
    isCorrect: boolean;
    score: number;
    timeTaken: number;
};

type SingleChoiceQuestion = {
    type: 'single_choice';
    options: string[];
    answer: string | null;
    correctAnswer: string;
};

type MultipleChoiceQuestion = {
    type: 'multiple_choice';
    options: string[];
    answers: string[];
    correctAnswers: string[];
};

type OpenEndedQuestion = {
    type: 'open_ended';
    answer: string | null;
    correctAnswer: string;
};

export type SingleChoice = BaseQuestion & SingleChoiceQuestion;
export type MultipleChoice = BaseQuestion & MultipleChoiceQuestion;
export type OpenEnded = BaseQuestion & OpenEndedQuestion;

export type Questions = SingleChoice | MultipleChoice | OpenEnded;

export type QuizResults = {
    quizTitle: string;
    totalQuestions: number;
    correctAnswers: number;
    totalScore: number;
    maxPossibleScore: number;
    percentage: number;
    timeSpent: number;
    questionResults: Questions[];
};

export type useResultType = {
    showDetail: boolean;
    setShowDetail: Dispatch<SetStateAction<boolean>>;
    results: QuizResults;
    performance: {
        level: string;
        color: string;
        bgColor: string;
    };
    hasRated: boolean;
    setHasRated: Dispatch<SetStateAction<boolean>>;
};

export function useResult(play: Play, rated: boolean): useResultType {
    const [ showDetail, setShowDetail ]: [ boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);
    const [ hasRated, setHasRated ]: [ boolean, Dispatch<SetStateAction<boolean>> ] = useState(rated);

    const questionResults: Questions[] = play.play_details.map((detail) => {
        const isCorrect: boolean = detail.score > 0;

        const baseQuestion: BaseQuestion = {
            question: detail.question.question,
            image: detail.question.image_url,
            maxScore: detail.question.max_score,
            isCorrect: isCorrect,
            score: detail.score,
            timeTaken: detail.time_taken,
        };

        if (detail.question.type === 'SINGLE_CHOICE') {
            return {
                ...baseQuestion,
                type: 'single_choice',
                options: JSON.parse(detail.question.single_choice_options!) as string[],
                answer: detail.answer,
                correctAnswer: detail.question.single_choice_correct!,
            };
        } else if (detail.question.type === 'MULTIPLE_CHOICE') {
            return {
                ...baseQuestion,
                type: 'multiple_choice',
                options: JSON.parse(detail.question.multiple_choice_options!) as string[],
                answers: detail.answer ? JSON.parse(detail.answer) as string[] : [],
                correctAnswers: JSON.parse(detail.question.multiple_choice_correct!) as string[],
            };
        } else {
            return {
                ...baseQuestion,
                type: 'open_ended',
                answer: detail.answer,
                correctAnswer: detail.answer!,
            };
        }
    });

    const totalQuestions: number = play.play_details.length;
    const correctAnswers: number = questionResults.filter((q) => q.isCorrect).length;
    const totalScore: number = play.final_score;
    const maxPossibleScore: number = play.max_score;
    const percentage: number = Math.round((totalScore / maxPossibleScore) * 100);

    const timeSpent: number = play.finish_time
        ? Math.floor((new Date(play.finish_time).getTime() - new Date(play.start_time).getTime()) / 1000)
        : Math.floor((new Date(play.end_time).getTime() - new Date(play.start_time).getTime()) / 1000);

    const results: QuizResults = {
        quizTitle: play.quiz_session.title,
        totalQuestions,
        correctAnswers,
        totalScore,
        maxPossibleScore,
        percentage,
        timeSpent,
        questionResults,
    };

    function getPerformanceLevel(percentage: number): { level: string; color: string; bgColor: string } {
        if (percentage >= 90) return { level: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100' };
        if (percentage >= 80) return { level: 'Very Good', color: 'text-blue-600', bgColor: 'bg-blue-100' };
        if (percentage >= 70) return { level: 'Good', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
        if (percentage >= 60) return { level: 'Fair', color: 'text-orange-600', bgColor: 'bg-orange-100' };
        return { level: 'Needs Improvement', color: 'text-red-600', bgColor: 'bg-red-100' };
    };

    const performance: { level: string; color: string; bgColor: string } = getPerformanceLevel(results.percentage);

    return {
        showDetail,
        setShowDetail,
        results,
        performance,
        hasRated,
        setHasRated,
    };
}
