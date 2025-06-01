import { JSX } from 'react';

export default function RootLayout({
    children,
}: Readonly<{
  children: React.ReactNode
}>):JSX.Element {
    return (
        <>
            {children}
        </>
    );
}
