import { type ReactNode, type JSX } from 'react';
import './globals.css';

type AppLayoutProps = {
    children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps): JSX.Element {
    return (
        <html className="scroll-smooth">
            <body className="relative text-base antialiased">
                { children }
            </body>
        </html>
    );
}
