import { type JSX, type Dispatch, type SetStateAction } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/Button';
import { DialogPortal, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/Dialog';

type DeleteConfirmDialogProps = {
    handleDelete: () => Promise<void>;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function DeleteConfirmDialog({ handleDelete, setOpen }: DeleteConfirmDialogProps): JSX.Element {
    return (
        <DialogPortal>
            <DialogOverlay>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                                <AlertTriangle className="h-5 w-5 text-destructive" />
                            </div>
                            <DialogTitle>Delete Session</DialogTitle>
                        </div>
                        <DialogDescription className="mt-2">
                            Are you sure you want to delete this session? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-6">
                        <DialogClose asChild>
                            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button
                                variant="destructive"
                                onClick={() => {
                                    handleDelete();
                                    setOpen(false);
                                }}
                            >
                                Delete Session
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </DialogOverlay>
        </DialogPortal>
    );
}
