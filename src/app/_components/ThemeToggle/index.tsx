'use client';

import { useState, useEffect, type JSX, type Dispatch, type SetStateAction } from 'react';
import { useTheme, type UseThemeProps } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/Button';

export default function ThemeToggle(): JSX.Element {
    const [ mounted, setMounted ]: [ boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);
    const { theme, setTheme }: UseThemeProps = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="w-9 h-9 opacity-0" />
        );
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-9 h-9 rounded-full transition-transform hover:scale-110"
            aria-label="Toggle theme"
        >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
