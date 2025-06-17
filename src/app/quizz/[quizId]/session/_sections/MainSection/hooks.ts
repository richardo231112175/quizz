import { useState, type Dispatch, type SetStateAction, type FormEvent } from 'react';
import { redirect } from 'next/navigation';
import { type Categories } from '@/lib/categories';
import { type Difficulties } from '@/lib/difficulties';
import { createQuizSession, type createQuizSessionReturn, type parsedQuizSessionError } from './actions';
import { type Counts } from '../../page';

export type QuizSessionType = {
    quizId: number;
    title: string;
    description: string;
    image: File | null;
    difficulty: Difficulties;
    category: Categories;
    timeLimit: number;
    visibility: 'public' | 'private';
    password?: string;
    singleChoiceCount: number;
    multipleChoiceCount: number;
    openEndedCount: number;
    openTime: string;
    closeTime: string;
};

export type useMainSectionType = {
    form: QuizSessionType;
    setForm: Dispatch<SetStateAction<QuizSessionType>>;
    quizSessionErrors: parsedQuizSessionError[];
    unknownError: boolean;
    isSubmitting: boolean;
    showSuccessDialog: boolean;
    handleSubmit: (e: FormEvent) => Promise<void>;
};

export function useMainSection(quizId: number, counts: Counts): useMainSectionType {
    const [ form, setForm ]: [QuizSessionType, Dispatch<SetStateAction<QuizSessionType>>] = useState<QuizSessionType>({
        quizId: quizId,
        title: '',
        description: '',
        image: null as File | null,
        category: '' as Categories,
        difficulty: '' as Difficulties,
        timeLimit: 1,
        visibility: 'public',
        password: '',
        singleChoiceCount: 0,
        multipleChoiceCount: 0,
        openEndedCount: 0,
        openTime: '',
        closeTime: '',
    });
    const [ isSubmitting, setIsSubmitting ]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [ quizSessionErrors, setQuizSessionErrors ]: [parsedQuizSessionError[], Dispatch<SetStateAction<parsedQuizSessionError[]>>] = useState<parsedQuizSessionError[]>([]);
    const [ unknownError, setUnknownError ]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [ showSuccessDialog, setShowSuccessDialog ]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);

    async function handleSubmit(e: FormEvent): Promise<void> {
        e.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);
        setUnknownError(false);
        setQuizSessionErrors([]);

        const result: createQuizSessionReturn = await createQuizSession(quizId, form, counts);

        if (result === undefined) {
            setUnknownError(true);
        } else if (!result.success) {
            if (result.redirect) {
                return redirect('/');
            }
            setQuizSessionErrors(result.errors);
        } else {
            setShowSuccessDialog(true);
        }

        setIsSubmitting(false);
    }

    return { form, setForm, quizSessionErrors, unknownError, isSubmitting, showSuccessDialog, handleSubmit };
}
