'use client';

import { useRouter } from 'next/navigation';
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { JSX } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/Button';

export function BackButton(): JSX.Element {
    const router: AppRouterInstance = useRouter();

    return (
        <Button onClick={router.back} variant="ghost" asChild>
            <span>
                <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </span>
        </Button>
    );
}
