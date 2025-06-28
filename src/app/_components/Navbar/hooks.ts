import { useClerk, useAuth } from '@clerk/nextjs';
import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';

type navLinkType = {
    href: string;
    label: string;
    authenticated: boolean;
};

export type useNavbarType = {
    isMenuOpen: boolean;
    isScrolled: boolean;
    setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
    toggleMenu: () => void;
    handleProfileClick: () => void;
    navLinks: navLinkType[];
};

export function useNavbar(): useNavbarType {
    const [ isMenuOpen, setIsMenuOpen ]: [ boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);
    const [ isScrolled, setIsScrolled ]: [ boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);

    const { openUserProfile }: ReturnType<typeof useClerk> = useClerk();
    const { isSignedIn }: ReturnType<typeof useAuth> = useAuth();

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

    function handleProfileClick(): void {
        openUserProfile();
    }

    const navLinks: navLinkType[] = [
        ...(isSignedIn ? [ { href: '/dashboard', label: 'Dashboard', authenticated: true } ] : []),
        { href: '/create', label: 'Create', authenticated: false },
        { href: '/browse', label: 'Browse', authenticated: false },
        { href: '/categories', label: 'Categories', authenticated: false },
    ];

    return {
        isMenuOpen,
        isScrolled,
        setIsMenuOpen,
        toggleMenu,
        handleProfileClick,
        navLinks,
    };
}
