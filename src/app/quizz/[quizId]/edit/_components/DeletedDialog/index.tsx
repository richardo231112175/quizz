'use client';

import { useRouter } from 'next/navigation';
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { type JSX } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/Dialog';
import { Button } from '@/components/Button';

interface DeletedDialogProps {
    isOpen: boolean;
}

export default function DeletedDialog({ isOpen }: DeletedDialogProps): JSX.Element {
    const router: AppRouterInstance = useRouter();

    return (
        <Dialog open={isOpen} onOpenChange={() => {}}>
            <DialogContent className="sm:max-w-md" hideCloseButton>
                <DialogHeader>
                    <DialogTitle>Quiz Deleted Successfully!</DialogTitle>
                    <DialogDescription className="mt-2">
                        The quiz has been permanently removed from your account.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-2">
                    <Button
                        onClick={() => router.push('/dashboard')}
                        className="w-full"
                    >
                        Go to Dashboard
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
