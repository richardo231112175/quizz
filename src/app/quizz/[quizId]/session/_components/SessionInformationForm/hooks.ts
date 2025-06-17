import { type Dispatch, type SetStateAction, type ChangeEvent } from 'react';
import { type QuizSessionType } from '../../_sections/MainSection/hooks';

type useQuestionEditDialogProps = {
    form: QuizSessionType;
    setForm: Dispatch<SetStateAction<QuizSessionType>>;
    isSubmitting: boolean;
};

export type useSessionInformationFormType = {
    handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleImageDelete: () => void;
};

export function useSessionInformationForm({ form, setForm, isSubmitting }: useQuestionEditDialogProps): useSessionInformationFormType {
    function handleImageChange(e: ChangeEvent<HTMLInputElement>): void {
        if (isSubmitting) return;

        const file: File | undefined = e.target.files?.[0];
        if (file) {
            setForm({ ...form, image: file });
        }

        e.target.value = '';
    };

    function handleImageDelete(): void {
        if (isSubmitting) return;
        setForm({ ...form, image: null });
    };

    return {
        handleImageChange,
        handleImageDelete,
    };
}
