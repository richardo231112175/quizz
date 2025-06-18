import { type Metadata } from 'next';
import { type ReactNode, type JSX } from 'react';

export const metadata: Metadata = {
    title: 'Edit Quiz - Quizz',
    description: 'Update the title and description of your quiz to better reflect its content.',
};

type EditLayoutProps = {
    children: ReactNode;
};

export default function EditLayout({ children }: EditLayoutProps): JSX.Element {
    return <>{children}</>;
}
