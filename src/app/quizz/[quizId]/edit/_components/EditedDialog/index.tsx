'use client';

import { useRouter } from 'next/navigation';
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { type JSX } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/Dialog';
import { Button } from '@/components/Button';

interface EditedDialogProps {
    isOpen: boolean;
}

export default function EditedDialog({ isOpen }: EditedDialogProps): JSX.Element {
    const router: AppRouterInstance = useRouter();

    return (
        <Dialog open={isOpen} onOpenChange={() => {}}>
            <DialogContent className="sm:max-w-md" hideCloseButton>
                <DialogHeader>
                    <DialogTitle>Quiz Edited Successfully!</DialogTitle>
                    <DialogDescription className="mt-2">
                        Your quiz details have been edited. You can view the changes in your dashboard.
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
