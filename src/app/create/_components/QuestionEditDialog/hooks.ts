import { type ChangeEvent } from 'react';
import { type Question } from '../../hooks';
import { v4 as uuidv4 } from 'uuid';

type useQuestionEditDialogProps = {
    question: Question;
    updateQuestion: (question: Question) => void;
    isSubmitting: boolean;
};

export type useQuestionEditDialogType = {
    handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleImageDelete: () => void;
    addAnswer: () => void;
    handleMultipleChoiceAnswerChange: (answerId: string, isCorrect: boolean) => void;
};

export function useQuestionEditDialog({ question, updateQuestion, isSubmitting }: useQuestionEditDialogProps): useQuestionEditDialogType {
    function handleImageChange(e: ChangeEvent<HTMLInputElement>): void {
        if (isSubmitting) return;

        const file: File | undefined = e.target.files?.[0];
        if (file) {
            updateQuestion({ ...question, image: file });
        }
        e.target.value = '';
    };

    function handleImageDelete(): void {
        if (isSubmitting) return;
        updateQuestion({ ...question, image: null });
    };

    function addAnswer(): void {
        if (isSubmitting) return;

        if (question.type !== 'open_ended' && question.answers.length < 10) {
            updateQuestion({
                ...question,
                answers: [ ...question.answers, { id: uuidv4(), text: '', isCorrect: false } ],
            });
        }
    };

    function handleMultipleChoiceAnswerChange(answerId: string, isCorrect: boolean): void {
        if (isSubmitting) return;

        if (question.type === 'multiple_choice') {
            updateQuestion({ ...question, answers: question.answers.map((a) =>
                a.id === answerId ? { ...a, isCorrect } : a
            ) });
        }
    };

    return {
        handleImageChange,
        handleImageDelete,
        addAnswer,
        handleMultipleChoiceAnswerChange,
    };
}
