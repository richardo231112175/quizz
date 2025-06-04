'use client';

import { type JSX } from 'react';
import { useTheme, type UseThemeProps } from 'next-themes';
import { ClerkProvider as ClerkProviderComponent } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

type ClerkProviderProps = {
    children: JSX.Element;
};

export default function ClerkProvider({ children }: ClerkProviderProps): JSX.Element {
    const { theme }: UseThemeProps = useTheme();

    return (
        <ClerkProviderComponent appearance={{ baseTheme: theme === 'dark' ? dark : undefined }}>
            {children}
        </ClerkProviderComponent>
    );
}
