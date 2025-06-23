import { Book, Code, FlaskRound as Flask, Globe, HeartPulse, Music, Palette, Trophy, type LucideIcon } from 'lucide-react';

export type categoryType = {
    id: string;
    name: string;
    icon: LucideIcon;
    color: string;
    description: string;
};

export type Categories = 'science' | 'history' | 'geography' | 'technology' | 'arts' | 'sports' | 'music' | 'health';

export const categories: categoryType[] = [
    {
        id: 'science',
        name: 'Science',
        icon: Flask,
        color: 'from-blue-500 to-cyan-400',
        description: 'Test your knowledge in physics, chemistry, biology, and more',
    },
    {
        id: 'history',
        name: 'History',
        icon: Book,
        color: 'from-amber-500 to-yellow-400',
        description: 'Journey through time with historical facts and events',
    },
    {
        id: 'geography',
        name: 'Geography',
        icon: Globe,
        color: 'from-emerald-500 to-green-400',
        description: 'Explore countries, capitals, and geographical wonders',
    },
    {
        id: 'technology',
        name: 'Technology',
        icon: Code,
        color: 'from-violet-500 to-purple-400',
        description: 'Stay updated with tech trends and computer science',
    },
    {
        id: 'arts',
        name: 'Arts',
        icon: Palette,
        color: 'from-pink-500 to-rose-400',
        description: 'Discover the world of art, music, and literature',
    },
    {
        id: 'sports',
        name: 'Sports',
        icon: Trophy,
        color: 'from-orange-500 to-red-400',
        description: 'Challenge yourself with sports trivia and facts',
    },
    {
        id: 'music',
        name: 'Music',
        icon: Music,
        color: 'from-indigo-500 to-blue-400',
        description: 'Test your knowledge of music history and theory',
    },
    {
        id: 'health',
        name: 'Health',
        icon: HeartPulse,
        color: 'from-rose-500 to-pink-400',
        description: 'Learn about health, wellness, and medical science',
    },
];
