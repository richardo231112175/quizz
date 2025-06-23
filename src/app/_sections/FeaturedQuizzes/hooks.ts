import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';
import { type quizType } from '@/components/QuizzCard';
import { fetchFeaturedQuizzes } from './actions';

export type useFeaturedQuizzesType = {
    hoveredIndex: number | null;
    setHoveredIndex: Dispatch<SetStateAction<number | null>>;
    quizzes: quizType[];
};

export function useFeaturedQuizzes(): useFeaturedQuizzesType {
    const [ hoveredIndex, setHoveredIndex ]: [ number | null, Dispatch<SetStateAction<number | null>> ] = useState<number | null>(null);
    const [ quizzes, setQuizzes ]: [ quizType[], Dispatch<SetStateAction<quizType[]>> ] = useState<quizType[]>([]);

    useEffect(() => {
        async function fetch(): Promise<void> {
            const fetchedQuizzes: quizType[] = await fetchFeaturedQuizzes();
            setQuizzes(fetchedQuizzes);
        }

        fetch();
    }, []);

    return { hoveredIndex, setHoveredIndex, quizzes };
}
