import { type JSX } from 'react';
import HeroSection from './_sections/HeroSection';
import FeaturedQuizzes from './_sections/FeaturedQuizzes';
import CategoriesSection from './_sections/CategoriesSection';
import CTASection from './_sections/CTASection';

export default function Home(): JSX.Element {
    return (
        <>
            <HeroSection />
            <FeaturedQuizzes />
            <CategoriesSection />
            <CTASection />
        </>
    );
}
