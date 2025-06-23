import { useState, type Dispatch, type SetStateAction } from 'react';
import { type quizType } from '@/components/QuizzCard';

export type useFeaturedQuizzesType = {
    hoveredIndex: number | null;
    setHoveredIndex: Dispatch<SetStateAction<number | null>>;
    quizzes: quizType[];
};

export function useFeaturedQuizzes(): useFeaturedQuizzesType {
    const [ hoveredIndex, setHoveredIndex ]: [ number | null, Dispatch<SetStateAction<number | null>> ] = useState<number | null>(null);

    const quizzes: quizType[] = [
        {
            id: 1,
            title: 'World Geography Master',
            description: 'Dive deep into quantum mechanics, relativity, and advanced physics concepts. This comprehensive quiz will test your understanding of complex physics principles and their real-world applications.',
            category: 'GEOGRAPHY',
            difficulty: 'MEDIUM',
            visibility: 'PRIVATE',
            time_limit: 15,
            plays: 943,
            rating: 4.8,
            ratingCount: 126,
            image: 'https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        },
        {
            id: 2,
            title: 'History Through Ages',
            description: 'Dive deep into quantum mechanics, relativity, and advanced physics concepts. This comprehensive quiz will test your understanding of complex physics principles and their real-world applications.',
            category: 'HISTORY',
            difficulty: 'MEDIUM',
            visibility: 'PUBLIC',
            time_limit: 10,
            plays: 987,
            rating: 4.6,
            ratingCount: 93,
            image: 'https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        },
        {
            id: 3,
            title: 'Science Facts Challenge',
            description: 'Dive deep into quantum mechanics, relativity, and advanced physics concepts. This comprehensive quiz will test your understanding of complex physics principles and their real-world applications.',
            category: 'SCIENCE',
            difficulty: 'HARD',
            visibility: 'PUBLIC',
            time_limit: 20,
            plays: 756,
            rating: 4.9,
            ratingCount: 46,
            image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        },
    ];

    return { hoveredIndex, setHoveredIndex, quizzes };
}
