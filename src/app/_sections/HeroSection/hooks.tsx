import { useEffect, useState, type JSX, type Dispatch, type SetStateAction } from 'react';
import { BrainCog, PenTool, Trophy } from 'lucide-react';
import { type Variants } from 'framer-motion';

type featureType = {
    icon: JSX.Element;
    title: string;
    description: string;
};

export type useHeroSectionType = {
    isVisible: boolean;
    container: Variants;
    item: Variants;
    features: featureType[];
};

export function useHeroSection(): useHeroSectionType {
    const [ isVisible, setIsVisible ]: [ boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const features: featureType[] = [
        {
            icon: <BrainCog className="h-8 w-8 mb-4 text-indigo-500" />,
            title: 'Diverse Categories',
            description: "From science to pop culture, we've got quizzes for every interest.",
        },
        {
            icon: <PenTool className="h-8 w-8 mb-4 text-purple-500" />,
            title: 'Easy Creation',
            description: 'Build your own quizzes in minutes with our intuitive creator tool.',
        },
        {
            icon: <Trophy className="h-8 w-8 mb-4 text-pink-500" />,
            title: 'Compete & Win',
            description: 'Challenge friends and climb the leaderboards.',
        },
    ];

    return { isVisible, container, item, features };
}
