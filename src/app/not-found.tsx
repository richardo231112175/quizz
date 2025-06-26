'use client';

import Link from 'next/link';
import { type JSX } from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/Button';

export default function NotFound(): JSX.Element {
    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-5 bg-background">
            <div className="text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <h1 className="text-9xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">404</h1>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                    <h2 className="text-3xl font-semibold text-foreground mt-4">Page Not Found</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="mt-8">
                    <Link href="/">
                        <Button size="lg" className="gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};
