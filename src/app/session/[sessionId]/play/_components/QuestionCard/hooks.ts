import { useState, type Dispatch, type SetStateAction } from 'react';

export type useQuestionCardType = {
    isSubmitting: boolean;
    submitAnswer: () => void;
    formatTime: (seconds: number) => string;
};

export function useQuestionCard(): useQuestionCardType {
    const [ isSubmitting, setIsSubmitting ]: [ boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);

    function submitAnswer(): void {

    }

    function formatTime(seconds: number): string {
        const mins: number = Math.floor(seconds / 60);
        const secs: number = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return { isSubmitting, submitAnswer, formatTime };
}
