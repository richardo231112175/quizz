'use client';

import { useRouter } from 'next/navigation';
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { type JSX } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/Dialog';
import { Button } from '@/components/Button';

interface SuccessDialogProps {
    isOpen: boolean;
}

export function SuccessDialog({ isOpen }: SuccessDialogProps): JSX.Element {
    const router: AppRouterInstance = useRouter();

    return (
        <Dialog open={isOpen} onOpenChange={() => {}}>
            <DialogContent className="sm:max-w-md" hideCloseButton>
                <DialogHeader>
                    <DialogTitle>Quiz Session Created Successfully!</DialogTitle>
                    <DialogDescription className="mt-2">
                        Your quiz session has been created successfully. You can now view it in your dashboard.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-2">
                    <Button
                        onClick={() => router.push('/dashboard?tab=sessions')}
                        className="w-full"
                    >
                        Go to Dashboard
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
