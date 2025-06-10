import { useState, type Dispatch, type SetStateAction, type MouseEvent } from 'react';
import { type Question } from '../../hooks';
import { v4 as uuidv4 } from 'uuid';

type QuestionType = 'single_choice' | 'multiple_choice' | 'open_ended';

type useQuestionsFormProps = {
    questions: Question[];
    setQuestions: Dispatch<SetStateAction<Question[]>>;
};

export type useQuestionsFormType = {
    activeFilter: QuestionType;
    setActiveFilter: Dispatch<SetStateAction<QuestionType>>;
    expandedQuestion: string | null;
    setExpandedQuestion: Dispatch<SetStateAction<string | null>>;
    addQuestion: (e: MouseEvent<HTMLButtonElement>) => void;
    updateQuestion: (question: Question) => void;
    removeQuestion: (id: string) => void;
    getFilteredQuestions: () => Question[];
    getQuestionTypeColor: (type: string) => string;
};

export function useQuestionsForm({ questions, setQuestions }: useQuestionsFormProps): useQuestionsFormType {
    const [ activeFilter, setActiveFilter ]: [QuestionType, Dispatch<SetStateAction<QuestionType>>] = useState<QuestionType>('single_choice');
    const [ expandedQuestion, setExpandedQuestion ]: [string | null, Dispatch<SetStateAction<string | null>>] = useState<string | null>(null);

    function addQuestion(e: MouseEvent<HTMLButtonElement>): void {
        e.preventDefault();

        if (activeFilter === 'single_choice') {
            setQuestions([ ...questions, {
                id: uuidv4(),
                question: '',
                timeLimit: 30,
                maxScore: 10,
                image: null,
                type: 'single_choice',
                answers: [
                    { id: uuidv4(), text: '', isCorrect: true },
                    { id: uuidv4(), text: '', isCorrect: false },
                ],
            } ]);
        } else if (activeFilter === 'multiple_choice') {
            setQuestions([ ...questions, {
                id: uuidv4(),
                question: '',
                timeLimit: 30,
                maxScore: 10,
                image: null,
                type: 'multiple_choice',
                answers: [
                    { id: uuidv4(), text: '', isCorrect: false },
                    { id: uuidv4(), text: '', isCorrect: false },
                ],
            } ]);
        } else {
            setQuestions([ ...questions, {
                id: uuidv4(),
                question: '',
                timeLimit: 30,
                maxScore: 10,
                image: null,
                type: 'open_ended',
                correctAnswer: '',
            } ]);
        }
    }

    function updateQuestion(question: Question): void {
        setQuestions(questions.map((q) => q.id === question.id ? { ...q, ...question } : q));
    };

    function removeQuestion(id: string): void {
        setQuestions(questions.filter((q) => q.id !== id));
        if (expandedQuestion === id) setExpandedQuestion(null);
    };

    function getFilteredQuestions(): Question[] {
        return questions.filter((q) => q.type === activeFilter);
    }

    function getQuestionTypeColor(type: string): string {
        if (type === 'single_choice') return 'border-l-4 border-l-blue-500';
        if (type === 'multiple_choice') return 'border-l-4 border-l-green-500';
        return 'border-l-4 border-l-purple-500';
    }

    return {
        activeFilter,
        setActiveFilter,
        expandedQuestion,
        setExpandedQuestion,
        addQuestion,
        updateQuestion,
        removeQuestion,
        getFilteredQuestions,
        getQuestionTypeColor,
    };
}
