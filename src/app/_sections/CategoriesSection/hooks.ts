import { type Variants } from 'framer-motion';

export type useCategoriesSectionType = {
    container: Variants;
    item: Variants;
};

export function useCategoriesSection(): useCategoriesSectionType {
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

    return { container, item };
}
