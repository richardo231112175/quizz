'use client';

import { type JSX } from 'react';
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes';

export default function ThemeProvider({ children, ...props }: ThemeProviderProps): JSX.Element {
    return (
        <NextThemesProvider {...props}>
            {children}
        </NextThemesProvider>
    );
}
