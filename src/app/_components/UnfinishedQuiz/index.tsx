'use client';

import { type JSX } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/Dialog';
import { Button } from '@/components/Button';
import { useUnfinishedQuiz, type useUnfinishedQuizType } from './hooks';

export default function UnfinishedQuiz(): JSX.Element {
    const { show, abortQuiz, continueQuiz }: useUnfinishedQuizType = useUnfinishedQuiz();

    return (
        <Dialog open={show} onOpenChange={(open) => !open ? abortQuiz() : null}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Unfinished Quiz</DialogTitle>
                </DialogHeader>
                <div className="py-4 text-base">
                    You have an unfinished quiz session. Would you like to continue?
                </div>
                <DialogFooter>
                    <Button type="button" variant="secondary" onClick={abortQuiz}>
                        Abort
                    </Button>
                    <Button type="button" onClick={continueQuiz}>
                        Continue
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
