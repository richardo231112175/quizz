'use server';

import { type QuizSessionCategory } from '../../generated';
import { categories } from '@/lib/categories';
import prisma from '@/lib/prisma';

type countType = {
    category: QuizSessionCategory;
    _count: { category: number };
};

export type fetchCategoryReturn = {
    id: string;
    count: number;
};

export async function fetchCategory(): Promise<fetchCategoryReturn[]> {
    const counts: unknown = await prisma.quizSession.groupBy({
        by: [ 'category' ],
        _count: { category: true },
    });

    return categories.map((cat) => {
        const found: countType | undefined = (counts as countType[]).find((c) => c.category === cat.id.toUpperCase());

        return {
            id: cat.id,
            count: found ? found._count.category : 0,
        };
    });
}
