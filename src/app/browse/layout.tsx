import { type Metadata } from 'next';
import { type ReactNode, type JSX } from 'react';

export const metadata: Metadata = {
    title: 'Browse - Quizz',
    description: 'Browse all available quizzes and discover new challenges across different topics. Find your next quiz adventure.',
};

type BrowseLayoutProps = {
    children: ReactNode;
};

export default function BrowseLayout({ children }: BrowseLayoutProps): JSX.Element {
    return <>{children}</>;
}
