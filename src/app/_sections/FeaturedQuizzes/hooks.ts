import { useState, type Dispatch, type SetStateAction } from 'react';

type quizType = {
    id: number;
    title: string;
    category: string;
    difficulty: string;
    questions: number;
    timeEstimate: string;
    plays: number;
    rating: number;
    image: string;
};

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
            category: 'Geography',
            difficulty: 'Medium',
            questions: 20,
            timeEstimate: '15 min',
            plays: 1243,
            rating: 4.8,
            image: 'https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        },
        {
            id: 2,
            title: 'Pop Culture Trivia',
            category: 'Entertainment',
            difficulty: 'Easy',
            questions: 15,
            timeEstimate: '10 min',
            plays: 987,
            rating: 4.6,
            image: 'https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        },
        {
            id: 3,
            title: 'Science Facts Challenge',
            category: 'Science',
            difficulty: 'Hard',
            questions: 25,
            timeEstimate: '20 min',
            plays: 756,
            rating: 4.9,
            image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        },
        {
            id: 4,
            title: 'History Through Ages',
            category: 'History',
            difficulty: 'Medium',
            questions: 18,
            timeEstimate: '15 min',
            plays: 632,
            rating: 4.7,
            image: 'https://images.pexels.com/photos/3095621/pexels-photo-3095621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        },
    ];

    return { hoveredIndex, setHoveredIndex, quizzes };
}
