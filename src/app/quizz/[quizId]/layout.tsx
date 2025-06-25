import { type Metadata } from 'next';
import { type ReactNode, type JSX } from 'react';

export const metadata: Metadata = {
    title: 'Play - Quizz',
    description: 'Dive into this quiz and test your knowledge. View details, start answering, and challenge yourself with a variety of questions.',
};

type QuizzLayoutProps = {
    children: ReactNode;
};

export default function QuizzLayout({ children }: QuizzLayoutProps): JSX.Element {
    return <>{children}</>;
}
