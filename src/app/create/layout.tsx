import { type Metadata } from 'next';
import { type ReactNode, type JSX } from 'react';

export const metadata: Metadata = {
    title: 'Create Quiz - Quizz',
    description: 'Create your own custom quiz with multiple question types including single choice, multiple choice, and open-ended questions.',
};

type CreateLayoutProps = {
    children: ReactNode;
};

export default function CreateLayout({ children }: CreateLayoutProps): JSX.Element {
    return <>{children}</>;
}
