import { type JSX } from 'react';
import { Flag } from 'lucide-react';
import { Textarea } from '@/components/Textarea';

type OpenEndedProps = {
    answer: string;
    correctAnswer: string;
};

export default function OpenEnded({ answer, correctAnswer }: OpenEndedProps): JSX.Element {
    return (
        <>
            <div className="space-y-4">
                <Textarea
                    value={answer ?? ''}
                    disabled={true}
                    className="min-h-[120px] resize-none"
                />
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Flag className="h-4 w-4" /> Correct Answer
                </h3>
                <p className="text-muted-foreground">{correctAnswer}</p>
            </div>
        </>
    );
}
