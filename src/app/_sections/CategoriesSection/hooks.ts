import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';
import { type Variants } from 'framer-motion';
import { categories as libCategories, type categoryType } from '@/lib/categories';
import { fetchCategory, type fetchCategoryReturn } from '@/lib/fetchCategory';

export type categoriesType = categoryType & {
    count: number;
}

export type useCategoriesSectionType = {
    container: Variants;
    item: Variants;
    categories: categoriesType[];
};

export function useCategoriesSection(): useCategoriesSectionType {
    const [ categories, setCategories ]: [ categoriesType[], Dispatch<SetStateAction<categoriesType[]>> ] = useState<categoriesType[]>([]);

    useEffect(() => {
        async function fetch(): Promise<void> {
            const fetchedCategories: fetchCategoryReturn[] = await fetchCategory();
            setCategories(libCategories.map((category) => {
                const count: number = fetchedCategories.find((cat) => cat.id === category.id)!.count;
                return { ...category, count };
            }));
        }

        fetch();
    });

    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return { container, item, categories };
}
