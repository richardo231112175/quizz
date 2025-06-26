import { useState, type Dispatch, type SetStateAction, type FormEvent } from 'react';
import { editQuiz, deleteQuiz, type editQuizReturn, type deleteQuizReturn, type parsedQuizError } from './actions';
import { type DatabaseQuiz } from '../../page';

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

export type useMainSectionType = {
    quiz: Quiz;
    setQuiz: Dispatch<SetStateAction<Quiz>>;
    unknownError: boolean;
    quizErrors: parsedQuizError[];
    isSubmitting: boolean;
    showEditedDialog: boolean;
    showDeletedDialog: boolean;
    handleSubmit: (e: FormEvent) => Promise<void>;
    handleDelete: () => Promise<void>;
};

export function useMainSection(quizz: DatabaseQuiz): useMainSectionType {
    const [ quiz, setQuiz ]: [Quiz, Dispatch<SetStateAction<Quiz>>] = useState<Quiz>({ title: quizz.title, description: quizz.description ?? '' });
    const [ unknownError, setUnknownError ]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [ quizErrors, setQuizErrors ]: [parsedQuizError[], Dispatch<SetStateAction<parsedQuizError[]>>] = useState<parsedQuizError[]>([]);
    const [ isSubmitting, setIsSubmitting ]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [ showEditedDialog, setShowEditedDialog ]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [ showDeletedDialog, setShowDeletedDialog ]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);

    async function handleSubmit(e: FormEvent): Promise<void> {
        e.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);
        setUnknownError(false);
        setQuizErrors([]);

        const result: editQuizReturn = await editQuiz(quizz.id, quiz);

        if (result === undefined) {
            setUnknownError(true);
        } else if (!result.success) {
            setQuizErrors(result.errors);
        } else {
            setShowEditedDialog(true);
        }

        setIsSubmitting(false);
    }

    async function handleDelete(): Promise<void> {
        if (isSubmitting) return;
        setIsSubmitting(true);
        setUnknownError(false);

        const result: deleteQuizReturn = await deleteQuiz(quizz.id);

        if (result === undefined) {
            setUnknownError(true);
        } else {
            setShowDeletedDialog(true);
        }

        setIsSubmitting(false);
    }

    return {
        quiz,
        setQuiz,
        unknownError,
        quizErrors,
        isSubmitting,
        showEditedDialog,
        showDeletedDialog,
        handleSubmit,
        handleDelete,
    };
}
