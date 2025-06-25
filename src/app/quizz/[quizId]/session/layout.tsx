import { type Metadata } from 'next';
import { type ReactNode, type JSX } from 'react';

export const metadata: Metadata = {
    title: 'Create Session - Quizz',
    description: 'Start a new quiz session, customize your quiz experience and begin testing your knowledge.',
};

type SessionLayoutProps = {
    children: ReactNode;
};

export default function SessionLayout({ children }: SessionLayoutProps): JSX.Element {
    return <>{children}</>;
}
