import { useState, type Dispatch, type SetStateAction, type ChangeEvent, type MouseEvent } from 'react';
import { type Question } from '../../hooks';
import { v4 as uuidv4 } from 'uuid';

type useQuestionEditDialogProps = {
    question: Question;
};

export type useQuestionEditDialogType = {
    localQuestion: Question;
    setLocalQuestion: Dispatch<SetStateAction<Question>>;
    handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
    addAnswer: (e: MouseEvent<HTMLButtonElement>) => void;
    handleMultipleChoiceAnswerChange: (answerId: string, isCorrect: boolean) => void;
    handleImageDelete: () => void;
};

export function useQuestionEditDialog({ question }: useQuestionEditDialogProps): useQuestionEditDialogType {
    const [ localQuestion, setLocalQuestion ]: [Question, Dispatch<SetStateAction<Question>>] = useState(question);

    function handleImageChange(e: ChangeEvent<HTMLInputElement>): void {
        const file: File | undefined = e.target.files?.[0];
        if (file) {
            setLocalQuestion({ ...localQuestion, image: file });
        }
        e.target.value = '';
    };

    function handleImageDelete(): void {
        setLocalQuestion({ ...localQuestion, image: null });
    };

    function addAnswer(e: MouseEvent<HTMLButtonElement>): void {
        e.preventDefault();

        if (localQuestion.type !== 'open_ended' && localQuestion.answers.length < 10) {
            setLocalQuestion({
                ...localQuestion,
                answers: [ ...localQuestion.answers, { id: uuidv4(), text: '', isCorrect: false } ],
            });
        }
    };

    function handleMultipleChoiceAnswerChange(answerId: string, isCorrect: boolean): void {
        if (localQuestion.type === 'multiple_choice') {
            setLocalQuestion({ ...localQuestion, answers: localQuestion.answers.map((a) =>
                a.id === answerId ? { ...a, isCorrect } : a
            ) });
        }
    };

    return {
        localQuestion,
        setLocalQuestion,
        handleImageChange,
        addAnswer,
        handleMultipleChoiceAnswerChange,
        handleImageDelete,
    };
}
