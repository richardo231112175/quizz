import { type quizType } from '@/components/QuizzCard';
import type { QuizSessionCategory, QuizSessionDifficulty, QuizSessionVisibility } from '../../generated';

export type sessionsType = {
    category: QuizSessionCategory;
    difficulty: QuizSessionDifficulty;
    visibility: QuizSessionVisibility;
    id: number;
    time_limit: number;
    title: string;
    description: string | null;
    image_url: string | null;
    open_time: Date;
    close_time: Date;
};

export type highestRating = {
    quiz: quizType,
    point: number,
};

export function getHighestRating(sessions: sessionsType[]): highestRating[] {
    const now: Date = new Date();

    const scores: highestRating[] = sessions.map((session) => {
        const openTime: number = new Date(session.open_time).getTime();
        const closeTime: number = new Date(session.close_time).getTime();
        const nowTime: number = now.getTime();

        const openPoint: number = (nowTime - openTime) / (1000 * 60) * 2;
        const durationPoint: number = (closeTime - openTime) / (1000 * 60) * -0.5;
        const ratingPoint: number = 4.9 * 10 + 15;
        const imagePoint: number = session.image_url ? 50 : 0;
        const visibilityPoint: number = session.visibility === 'PUBLIC' ? 40 : 0;
        const playsPoint: number = 20 * 3;

        const point: number = openPoint + durationPoint + ratingPoint + imagePoint + visibilityPoint + playsPoint;

        const quiz: quizType = {
            id: session.id,
            title: session.title,
            description: session.description,
            image: session.image_url,
            difficulty: session.difficulty,
            category: session.category,
            visibility: session.visibility,
            timeLimit: session.time_limit,
            plays: 20,
            rating: 4.9,
            ratingCount: 15,
        };

        return { quiz, point };
    });

    return scores;
}
