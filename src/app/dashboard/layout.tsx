import { type Metadata } from 'next';
import { type ReactNode, type JSX } from 'react';

export const metadata: Metadata = {
    title: 'Dashboard - Quizz',
    description: 'Dashboard for managing your quizzes and sessions.',
};

type DashboardLayoutProps = {
    children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps): JSX.Element {
    return <>{children}</>;
}
