import { useState, useEffect, useCallback, type Dispatch, type SetStateAction } from 'react';
import { type quizType } from '@/components/QuizzCard';
import { fetchBrowseQuizzes, type fetchBrowseQuizzesReturn } from './actions';

export type useBrowseQuizzesType = {
    searchTerm: string;
    setSearchTerm: Dispatch<SetStateAction<string>>;
    selectedCategory: string;
    setSelectedCategory: Dispatch<SetStateAction<string>>;
    selectedDifficulty: string;
    setSelectedDifficulty: Dispatch<SetStateAction<string>>;
    sortBy: string;
    setSortBy: Dispatch<SetStateAction<string>>;
    showFilters: boolean;
    setShowFilters: Dispatch<SetStateAction<boolean>>;
    quizzes: quizType[];
    loading: boolean;
    hasMore: boolean;
    handleShowMore: () => Promise<void>;
};

export function useBrowseQuizzes(): useBrowseQuizzesType {
    const [ searchTerm, setSearchTerm ]: [ string, Dispatch<SetStateAction<string>> ] = useState('');
    const [ selectedCategory, setSelectedCategory ]: [ string, Dispatch<SetStateAction<string>> ] = useState('All Categories');
    const [ selectedDifficulty, setSelectedDifficulty ]: [ string, Dispatch<SetStateAction<string>> ] = useState('All Levels');
    const [ sortBy, setSortBy ]: [ string, Dispatch<SetStateAction<string>> ] = useState('popular');
    const [ showFilters, setShowFilters ]: [ boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);
    const [ quizzes, setQuizzes ]: [ quizType[], Dispatch<SetStateAction<quizType[]>> ] = useState<quizType[]>([]);
    const [ page, setPage ]: [ number, Dispatch<SetStateAction<number>> ] = useState(1);
    const [ hasMore, setHasMore ]: [ boolean, Dispatch<SetStateAction<boolean>> ] = useState(true);
    const [ loading, setLoading ]: [ boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);

    const limit: number = 10;

    useEffect(() => {
        resetAndLoad();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ searchTerm, selectedCategory, selectedDifficulty, sortBy ]);

    const loadQuizzes: (reset?: boolean) => Promise<void> = useCallback(async (reset = false) => {
        setLoading(true);

        let offset: number = 0;
        if (!reset) {
            offset = page * limit;
        }

        const result: fetchBrowseQuizzesReturn = await fetchBrowseQuizzes({
            search: searchTerm,
            category: selectedCategory,
            difficulty: selectedDifficulty,
            sort: sortBy,
            limit,
            offset,
        });

        if (reset) {
            setQuizzes(result.quizzes);
            setPage(1);
        } else {
            setQuizzes((prev) => [ ...prev, ...result.quizzes ]);
            setPage((prev) => prev + 1);
        }

        setHasMore(result.hasMore);
        setLoading(false);
    }, [ searchTerm, selectedCategory, selectedDifficulty, sortBy, page ]);


    const resetAndLoad: () => void = useCallback(() => {
        setPage(1);
        loadQuizzes(true);
    }, [ loadQuizzes ]);

    const handleShowMore: () => Promise<void> = useCallback(async () => {
        if (loading || !hasMore) return;
        await loadQuizzes(false);
    }, [ loadQuizzes, loading, hasMore ]);

    return {
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        selectedDifficulty,
        setSelectedDifficulty,
        sortBy,
        setSortBy,
        showFilters,
        setShowFilters,
        quizzes,
        loading,
        hasMore,
        handleShowMore,
    };
}
