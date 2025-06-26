import { useState, type Dispatch, type SetStateAction, type FormEvent } from 'react';
import { redirect } from 'next/navigation';
import { type Categories } from '@/lib/categories';
import { type Difficulties } from '@/lib/difficulties';
import {  updateQuizSession, type createQuizSessionReturn, type parsedQuizSessionError } from './actions';
import { type Counts } from '../../page';
import { SessionType } from '../../page';
export type QuizSessionType = {
    quizId: number;
    title: string;
    description: string | null;
    image: File | null;
    difficulty: Difficulties;
    category: Categories;
    timeLimit: number;
    visibility: 'public' | 'private';
    password?: string | null;
    singleChoiceCount: number;
    multipleChoiceCount: number;
    openEndedCount: number;
    openTime: string;
    closeTime: string;
    enable:boolean;
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

export function useMainSection(quizId: number, counts: Counts, sessionData: SessionType): useMainSectionType {
    const now : number= new Date().getMilliseconds();
    const open_time : number = sessionData.open_time.getMilliseconds();
    const enable : boolean = now-open_time <0 ? true : false;
    const formattedOpen: string = sessionData.open_time.toLocaleString('sv-SE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Ensure 24-hour format
    }).replace(' ', 'T');
    const formattedClose: string = sessionData.close_time.toLocaleString('sv-SE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Ensure 24-hour format
    }).replace(' ', 'T');
    
    
    const [ form, setForm ]: [QuizSessionType, Dispatch<SetStateAction<QuizSessionType>>] = useState<QuizSessionType>({
        quizId: quizId,
        title: sessionData.title,
        description: sessionData.description,
        image: null as File | null,
        category: sessionData.category.toLowerCase() as Categories,
        difficulty: sessionData.difficulty === 'HARD' ? 'Hard' : sessionData.difficulty === 'EASY' ? 'Easy' : 'Medium' as Difficulties,
        timeLimit: 1,
        visibility: sessionData.visibility === 'PUBLIC' ? 'public' : 'private',
        password: sessionData.password,
        singleChoiceCount: counts.single_choice_count,
        multipleChoiceCount: counts.multiple_choice_count,
        openEndedCount: counts.open_ended_count,
        openTime: formattedOpen,
        closeTime: formattedClose,
        enable: enable,
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
        
        const result: createQuizSessionReturn = await updateQuizSession(sessionData.id,quizId, form, counts);
        
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


