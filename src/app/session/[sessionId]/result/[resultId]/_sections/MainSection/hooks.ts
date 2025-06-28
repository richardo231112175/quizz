import { useState, type Dispatch, type SetStateAction } from 'react';
import { type Play } from '../../page';

type QuestionResult = {
    question: string;
    userAnswer: string | string[] | null;
    correctAnswer: string | string[];
    isCorrect: boolean;
    score: number;
    maxScore: number;
};

export type QuizResults = {
    quizTitle: string;
    totalQuestions: number;
    correctAnswers: number;
    totalScore: number;
    maxPossibleScore: number;
    percentage: number;
    timeSpent: number;
    questionResults: QuestionResult[];
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
};

export function useResult(play: Play): useResultType {
    const [ showDetail, setShowDetail ]: [ boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);

    const questionResults: QuestionResult[] = play.play_details.map((detail) => {
        const userAnswer: string | string[] | null = detail.answer
            ? (detail.question.type === 'MULTIPLE_CHOICE' ? JSON.parse(detail.answer) : detail.answer)
            : null;

        const correctAnswer: string | string[] = detail.question.type === 'SINGLE_CHOICE'
            ? detail.question.single_choice_correct!
            : detail.question.type === 'MULTIPLE_CHOICE'
                ? JSON.parse(detail.question.multiple_choice_correct!)
                : detail.question.open_ended_answer_key!;

        const isCorrect: boolean = detail.score > 0;

        return {
            question: detail.question.question,
            userAnswer,
            correctAnswer,
            isCorrect,
            score: detail.score,
            maxScore: detail.question.max_score,
        };
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
    };
}
