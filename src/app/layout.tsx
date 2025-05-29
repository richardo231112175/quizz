import { type ReactNode, type JSX } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

type AppLayoutProps = {
    children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps): JSX.Element {
    return (
        <ClerkProvider>
            <html className="scroll-smooth">
                <body className="min-h-dvh relative text-base antialiased">
                    { children }
                </body>
            </html>
        </ClerkProvider>
    );
}
