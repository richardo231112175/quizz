import { useState, type Dispatch, type SetStateAction, type FormEvent } from 'react';
import { createQuiz, type createQuizReturn, type parsedQuizError, type parsedQuestionError } from './actions';

export type Quiz = {
    title: string;
    description: string;
};

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
    quiz: Quiz;
    setQuiz: Dispatch<SetStateAction<Quiz>>;
    questions: Question[];
    setQuestions: Dispatch<SetStateAction<Question[]>>;
    unknownError: boolean;
    quizErrors: parsedQuizError[];
    questionErrors: parsedQuestionError[][];
    isSubmitting: boolean;
    showSuccessDialog: boolean;
    handleSubmit: (e: FormEvent) => Promise<void>;
};

export function useCreateQuiz(): useCreateQuizType {
    const [ quiz, setQuiz ]: [Quiz, Dispatch<SetStateAction<Quiz>>] = useState<Quiz>({ title: '', description: '' });
    const [ questions, setQuestions ]: [Question[], Dispatch<SetStateAction<Question[]>>] = useState<Question[]>([]);
    const [ unknownError, setUnknownError ]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [ quizErrors, setQuizErrors ]: [parsedQuizError[], Dispatch<SetStateAction<parsedQuizError[]>>] = useState<parsedQuizError[]>([]);
    const [ questionErrors, setQuestionErrors ]: [parsedQuestionError[][], Dispatch<SetStateAction<parsedQuestionError[][]>>] = useState<parsedQuestionError[][]>([]);
    const [ isSubmitting, setIsSubmitting ]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [ showSuccessDialog, setShowSuccessDialog ]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);

    async function handleSubmit(e: FormEvent): Promise<void> {
        e.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);
        setUnknownError(false);
        setQuizErrors([]);
        setQuestionErrors([]);

        const result: createQuizReturn = await createQuiz(quiz, questions);

        if (result === undefined) {
            setUnknownError(true);
        } else if (!result.success) {
            setQuestionErrors(result.errors.questions);
            setQuizErrors(result.errors.quiz);
        } else {
            setShowSuccessDialog(true);
        }

        setIsSubmitting(false);
    }

    return {
        quiz,
        setQuiz,
        questions,
        setQuestions,
        unknownError,
        quizErrors,
        questionErrors,
        isSubmitting,
        showSuccessDialog,
        handleSubmit,
    };
}
