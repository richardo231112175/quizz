'use client';

import Link from 'next/link';
import { useState, useEffect, type JSX, type Dispatch, type SetStateAction } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/Button';
import ThemeToggle from '../ThemeToggle';
import { cn } from '@/lib/utils';

type navLinkType = {
    href: string;
    label: string;
};

export default function Navbar(): JSX.Element {
    const [ isMenuOpen, setIsMenuOpen ]: [ boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);
    const [ isScrolled, setIsScrolled ]: [ boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);

    useEffect(() => {
        function handleScroll(): void {
            setIsScrolled(window.scrollY > 10);
        }

        window.addEventListener('scroll', handleScroll);

        return (): void => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    function toggleMenu(): void {
        setIsMenuOpen(!isMenuOpen);
    }

    const navLinks: navLinkType[] = [
        { href: '/create', label: 'Create Quiz' },
        { href: '/browse', label: 'Browse Quizzes' },
        { href: '/categories', label: 'Categories' },
        { href: '/about', label: 'About' },
    ];

    return (
        <nav className={cn('fixed w-full z-50 transition-all duration-300', isScrolled ? 'bg-background/95 backdrop-blur-md border-b' : 'bg-transparent')}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Quizz</span>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="text-foreground/80 hover:text-foreground transition-colors px-3 py-2 rounded-md text-sm font-medium">
                                {link.label}
                            </Link>
                        ))}
                        <ThemeToggle />
                        <Button size="sm" className="ml-4">Sign In</Button>
                    </div>
                    <div className="flex md:hidden">
                        <ThemeToggle />
                        <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 ml-3 rounded-md text-foreground focus:outline-none" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={cn(isMenuOpen ? 'block' : 'hidden', 'md:hidden transition-all duration-300 ease-in-out')}>
                <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md border-b">
                    {navLinks.map((link) => (
                        <Link key={link.href} onClick={() => setIsMenuOpen(false)} href={link.href} className="block px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors">
                            {link.label}
                        </Link>
                    ))}
                    <div className="pt-2">
                        <Button className="w-full">Sign In</Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
