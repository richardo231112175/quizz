import { useState, type Dispatch, type SetStateAction } from 'react';
import { useParams } from 'next/navigation';
import { submitRating } from './actions';

export type useRatingType = {
    rating: number;
    setRating: Dispatch<SetStateAction<number>>;
    isSubmitting: boolean;
    handleSubmit: () => Promise<void>;
};

export function useRating(onRatingSubmit: () => void): useRatingType {
    const [ rating, setRating ]: [ number, Dispatch<SetStateAction<number>> ] = useState(0);
    const [ isSubmitting, setIsSubmitting ]: [ boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);

    const params: { sessionId: string } = useParams();

    async function handleSubmit(): Promise<void> {
        if (rating === 0 || isSubmitting) return;
        setIsSubmitting(true);

        const result: boolean = await submitRating(Number(params.sessionId), rating);

        if (result) {
            onRatingSubmit();
        } else {
            setIsSubmitting(false);
        }
    };

    return { rating, setRating, isSubmitting, handleSubmit };
}
