import Link from 'next/link';
import { type JSX } from 'react';
import { Button } from '@/components/Button';

export default function CTASection(): JSX.Element {
    return (
        <section className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-10">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:16px_16px]" />
                    <div className="relative z-10 text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-4">Ready to Create Your Own Quiz?</h2>
                        <p className="text-white/90 mb-8">
                            Share your knowledge and challenge others with your own custom quizzes. Easy to create, fun to play!
                        </p>
                        <Button size="lg" variant="secondary" asChild>
                            <Link href="/create">Get Started Now</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
