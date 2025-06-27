import { type Dispatch, type SetStateAction } from 'react';
import { type Questions } from '../../_sections/MainSection/hooks';

type useQuestionCardProps = {
    setQuestions: Dispatch<SetStateAction<Questions[]>>;
    current: number;
};

export type useQuestionCardType = {
    singleChoiceHandler: (answer: string) => void;
    multipleChoiceHandler: (answer: string) => void;
    openEndedHandler: (answer: string) => void;
};

export function useQuestionCard({ setQuestions, current }: useQuestionCardProps): useQuestionCardType {
    function singleChoiceHandler(answer: string): void {
        setQuestions((prev) => prev.map((p, i) => {
            if (i !== current) return p;
            return { ...p, answer };
        }));
    }

    function multipleChoiceHandler(answer: string): void {
        setQuestions((prev) => prev.map((p, i) => {
            if (i !== current || p.type !== 'multiple_choice') return p;

            if (!p.answers) return { ...p, answers: [ answer ] };
            if (!p.answers.includes(answer)) return { ...p, answers: [ ...p.answers, answer ] };

            return { ...p, answers: p.answers.filter((ans) => ans !== answer) };
        }));
    }

    function openEndedHandler(answer: string): void {
        setQuestions((prev) => prev.map((p, i) => {
            if (i !== current) return p;
            return { ...p, answer };
        }));
    }

    return { singleChoiceHandler, multipleChoiceHandler, openEndedHandler };
}
