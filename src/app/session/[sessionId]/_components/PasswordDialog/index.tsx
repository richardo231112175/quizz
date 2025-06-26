import type { JSX, Dispatch, SetStateAction } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/Dialog';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { Button } from '@/components/Button';

type PasswordDialogProps = {
    pwd: string;
    setPwd: Dispatch<SetStateAction<string>>;
    showPwd: boolean;
    setShowPwd: Dispatch<SetStateAction<boolean>>;
    showPwdError: boolean;
    isStarting: boolean;
    startQuiz: () => Promise<void>;
};

export default function PasswordDialog({ pwd, setPwd, showPwd, setShowPwd, showPwdError, isStarting, startQuiz }: PasswordDialogProps): JSX.Element {
    return (
        <Dialog open={showPwd} onOpenChange={setShowPwd}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enter Password</DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                    <Label htmlFor="quiz-password">Password</Label>
                    <Input
                        id="quiz-password"
                        type="text"
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        autoFocus
                        required
                    />
                    {showPwdError && (
                        <div className="text-red-500 text-sm mt-1">Password is incorrect</div>
                    )}
                </div>
                <DialogFooter>
                    <Button type="button" variant="secondary" onClick={() => setShowPwd(false)}>
                        Cancel
                    </Button>
                    <Button type="submit" onClick={startQuiz} disabled={isStarting}>
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
