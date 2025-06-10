import { useState, type Dispatch, type SetStateAction, type FormEvent } from 'react';

type Answer = {
    id: string;
    text: string;
    isCorrect: boolean;
};

type BaseQuestion = {
    id: string;
    question: string;
    timeLimit: number;
    maxScore: number;
    image: File | null;
};

type SingleChoiceQuestion = BaseQuestion & {
    type: 'single_choice';
    answers: Answer[];
};

type MultipleChoiceQuestion = BaseQuestion & {
    type: 'multiple_choice';
    answers: Answer[];
};

type OpenEndedQuestion = BaseQuestion & {
    type: 'open_ended';
    correctAnswer: string;
};

export type Question = SingleChoiceQuestion | MultipleChoiceQuestion | OpenEndedQuestion;

export type useCreateQuizType = {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
    description: string;
    setDescription: Dispatch<SetStateAction<string>>;
    questions: Question[];
    setQuestions: Dispatch<SetStateAction<Question[]>>;
    handleSubmit: (e: FormEvent) => Promise<void>;
};

export function useCreateQuiz(): useCreateQuizType {
    const [ title, setTitle ]: [string, Dispatch<SetStateAction<string>>] = useState('');
    const [ description, setDescription ]: [string, Dispatch<SetStateAction<string>>] = useState('');
    const [ questions, setQuestions ]: [Question[], Dispatch<SetStateAction<Question[]>>] = useState<Question[]>([]);

    async function handleSubmit(e: FormEvent): Promise<void> {
        e.preventDefault();
        console.log({ title, description, questions });
    }

    return {
        title,
        setTitle,
        description,
        setDescription,
        questions,
        setQuestions,
        handleSubmit,
    };
}
