import { type JSX } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Flag } from 'lucide-react';
import { Textarea } from '@/components/Textarea';

type OpenEndedProps = {
    answer: string | null;
    setAnswer: (answer: string) => void;
    correctAnswer: string | null;
    isSubmitting: boolean;
};

export default function OpenEnded({ answer, setAnswer, correctAnswer, isSubmitting }: OpenEndedProps): JSX.Element {
    return (
        <>
            <div className="space-y-4">
                <Textarea
                    value={answer ?? ''}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    disabled={!!correctAnswer || isSubmitting}
                    className="min-h-[120px] resize-none"
                />
            </div>
            <AnimatePresence>
                {correctAnswer && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-muted/50 rounded-lg p-4"
                    >
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                            <Flag className="h-4 w-4" /> Correct Answer
                        </h3>
                        <p className="text-muted-foreground">{correctAnswer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
