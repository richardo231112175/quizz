import { useState, type Dispatch, type SetStateAction } from 'react';
import { type DatabaseQuestion } from '../../page';

type QuestionType = 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'OPEN_ENDED';

export type useQuestionsType = {
    activeFilter: QuestionType;
    setActiveFilter: Dispatch<SetStateAction<QuestionType>>;
    expandedQuestion: number | null;
    setExpandedQuestion: Dispatch<SetStateAction<number | null>>;
    getFilteredQuestions: (filter: string) => DatabaseQuestion[];
    getQuestionTypeColor: (type: string) => string;
};

export function useQuestions(questions: DatabaseQuestion[]): useQuestionsType {
    const [ activeFilter, setActiveFilter ]: [QuestionType, Dispatch<SetStateAction<QuestionType>>] = useState<QuestionType>('SINGLE_CHOICE');
    const [ expandedQuestion, setExpandedQuestion ]: [number | null, Dispatch<SetStateAction<number | null>>] = useState<number | null>(null);

    function getFilteredQuestions(filter: string): DatabaseQuestion[] {
        return questions.filter((q) => q.type === filter);
    }

    function getQuestionTypeColor(type: string): string {
        if (type === 'SINGLE_CHOICE') return 'border-l-4 border-l-blue-500';
        if (type === 'MULTIPLE_CHOICE') return 'border-l-4 border-l-green-500';
        return 'border-l-4 border-l-purple-500';
    }

    return {
        activeFilter,
        setActiveFilter,
        expandedQuestion,
        setExpandedQuestion,
        getFilteredQuestions,
        getQuestionTypeColor,
    };
}
