import { useState, useRef, useCallback, useEffect, type Dispatch, type SetStateAction, type RefObject } from 'react';
import type { quizType } from '@/components/QuizzCard';
import { fetchQuizzesByCategories, type fetchQuizzesByCategoriesReturn } from './actions';

export type useCategoriesSlugType = {
    quizzes: quizType[];
    loading: boolean;
    hasMore: boolean;
    page: number;
    loadQuizzes: (page: number) => Promise<void>;
};

export function useCategoriesSlug(category: string): useCategoriesSlugType {
    const [ quizzes, setQuizzes ]: [ quizType[], Dispatch<SetStateAction<quizType[]>> ] = useState<quizType[]>([]);
    const [ loading, setLoading ]: [ boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);
    const [ hasMore, setHasMore ]: [ boolean, Dispatch<SetStateAction<boolean>> ] = useState(true);
    const [ page, setPage ]: [ number, Dispatch<SetStateAction<number>> ] = useState(0);

    const hasLoaded: RefObject<boolean> = useRef(false);

    const limit: number = 10;

    const loadQuizzes: (page: number) => Promise<void> = useCallback(async (page: number) => {
        setLoading(true);

        const result: fetchQuizzesByCategoriesReturn = await fetchQuizzesByCategories({ category, limit, offset: page * limit });
        setQuizzes((prev) => [ ...prev, ...result.quizzes ]);
        setHasMore(result.hasMore);
        setPage(page);
        setLoading(false);
    }, [ category ]);

    useEffect(() => {
        if (!category || hasLoaded.current) return;
        hasLoaded.current = true;
        loadQuizzes(0);
    }, [ category, loadQuizzes ]);

    return { quizzes, loading, hasMore, page, loadQuizzes };
}
