'use client';

import Link from 'next/link';
import { type JSX } from 'react';
import { Menu, X } from 'lucide-react';
import { SignedIn, SignedOut, UserButton, SignInButton, SignOutButton } from '@clerk/nextjs';
import { Button } from '@/components/Button';
import ThemeToggle from '../ThemeToggle';
import { cn } from '@/lib/utils';
import { useNavbar, type useNavbarType } from './hooks';

export default function Navbar(): JSX.Element {
    const { isScrolled, isMenuOpen, setIsMenuOpen, toggleMenu, handleProfileClick, navLinks }: useNavbarType = useNavbar();

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
                        <div className="ml-4 flex items-center">
                            <SignedIn>
                                <UserButton appearance={{ elements: { avatarBox: 'w-9 h-9' } }} />
                            </SignedIn>
                            <SignedOut>
                                <SignInButton>
                                    <Button size="sm">Sign In</Button>
                                </SignInButton>
                            </SignedOut>
                        </div>
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
                    <SignedIn>
                        <div onClick={handleProfileClick} tabIndex={0} role="button" className="flex items-center gap-3 px-3 py-2 mb-2 cursor-pointer hover:bg-muted rounded-md transition-colors">
                            <UserButton appearance={{ elements: { avatarBox: 'w-10 h-10', userButtonTrigger: 'pointer-events-none' } }} />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-foreground">My Account</p>
                                <p className="text-xs text-muted-foreground">View profile and settings</p>
                            </div>
                        </div>
                        <div className="h-px bg-border mb-2" />
                    </SignedIn>
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors">
                            {link.label}
                        </Link>
                    ))}
                    <SignedIn>
                        <div className="pt-2 px-3">
                            <SignOutButton>
                                <Button variant="secondary" className="w-full">Sign Out</Button>
                            </SignOutButton>
                        </div>
                    </SignedIn>
                    <SignedOut>
                        <div className="pt-2 px-3">
                            <SignInButton>
                                <Button className="w-full">Sign In</Button>
                            </SignInButton>
                        </div>
                    </SignedOut>
                </div>
            </div>
        </nav>
    );
};
