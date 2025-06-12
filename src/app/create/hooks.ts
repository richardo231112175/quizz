import { useState, type Dispatch, type SetStateAction, type FormEvent } from 'react';
import { parseQuiz, parseQuestion, type parseQuizReturn, type parsedQuizError, type parseQuestionReturn, type parsedQuestionError } from './actions';

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
    unknownError: boolean;
    quizErrors: parsedQuizError[];
    questionErrors: parsedQuestionError[][];
    isSubmitting: boolean;
    handleSubmit: (e: FormEvent) => Promise<void>;
};

export function useCreateQuiz(): useCreateQuizType {
    const [ title, setTitle ]: [string, Dispatch<SetStateAction<string>>] = useState('');
    const [ description, setDescription ]: [string, Dispatch<SetStateAction<string>>] = useState('');
    const [ questions, setQuestions ]: [Question[], Dispatch<SetStateAction<Question[]>>] = useState<Question[]>([]);
    const [ unknownError, setUnknownError ]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [ quizErrors, setQuizErrors ]: [parsedQuizError[], Dispatch<SetStateAction<parsedQuizError[]>>] = useState<parsedQuizError[]>([]);
    const [ questionErrors, setQuestionErrors ]: [parsedQuestionError[][], Dispatch<SetStateAction<parsedQuestionError[][]>>] = useState<parsedQuestionError[][]>([]);
    const [ isSubmitting, setIsSubmitting ]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);

    async function handleSubmit(e: FormEvent): Promise<void> {
        e.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);
        setUnknownError(false);
        setQuizErrors([]);
        setQuestionErrors([]);

        await new Promise((resolve) => setTimeout(resolve, 3000));

        const quiz: parseQuizReturn = await parseQuiz({ title, description });
        const parsedQuestions: parseQuestionReturn = await parseQuestion(questions);

        if (quiz === undefined || parsedQuestions === undefined) {
            setUnknownError(true);
            setIsSubmitting(false);
            return;
        }

        if (!quiz.success) {
            setQuizErrors(quiz.errors);
        }

        if (!parsedQuestions.success) {
            setQuestionErrors(parsedQuestions.errors);
        }

        if (quiz.success && parsedQuestions.success) {
            console.log('success');
        }

        setIsSubmitting(false);
    }

    return {
        title,
        setTitle,
        description,
        setDescription,
        questions,
        setQuestions,
        unknownError,
        quizErrors,
        questionErrors,
        isSubmitting,
        handleSubmit,
    };
}
