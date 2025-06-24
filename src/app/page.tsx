import { type JSX } from 'react';
import HeroSection from './_sections/HeroSection';
import FeaturedQuizzes from './_sections/FeaturedQuizzes';
import CategoriesSection from './_sections/CategoriesSection';
import CTASection from './_sections/CTASection';

export default function AppPage(): JSX.Element {
    return (
        <>
            <HeroSection />
            <FeaturedQuizzes />
            <CategoriesSection />
            <CTASection />
        </>
    );
}
