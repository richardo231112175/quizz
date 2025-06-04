import './globals.css';
import { type Metadata } from 'next';
import { Inter } from 'next/font/google';
import { type NextFont } from 'next/dist/compiled/@next/font';
import { type ReactNode, type JSX } from 'react';
import ClerkProvider from './_components/ClerkProvider';
import ThemeProvider from './_components/ThemeProvider';
import Navbar from './_components/Navbar';
import { cn } from '@/lib/utils';

type AppLayoutProps = {
    children: ReactNode;
};

const inter: NextFont = Inter({ subsets: [ 'latin' ] });

export const metadata: Metadata = {
    title: 'Quizz - Create, Share & Play Quizzes',
    description: 'Create engaging quizzes, challenge friends, and test your knowledge with our fun quiz platform.',
};

export default function AppLayout({ children }: AppLayoutProps): JSX.Element {
    return (
        <html lang="en" className="scroll-smooth" suppressHydrationWarning>
            <body className={cn(inter.className, 'min-h-dvh relative text-base antialiased')}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <ClerkProvider>
                        <div>
                            <Navbar />
                            <main>
                                {children}
                            </main>
                        </div>
                    </ClerkProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
