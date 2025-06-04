import { type Metadata } from 'next';
import { type ReactNode, type JSX } from 'react';

export const metadata: Metadata = {
    title: 'Categories - Quizz',
    description: 'Explore our diverse collection of quizzes across various categories. Find the perfect quiz for your interests.',
};

type CategoriesLayoutProps = {
    children: ReactNode;
};

export default function CategoriesLayout({ children }: CategoriesLayoutProps): JSX.Element {
    return <>{children}</>;
}
