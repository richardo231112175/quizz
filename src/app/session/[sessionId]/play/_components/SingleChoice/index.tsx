import { type JSX } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

type SingleChoiceProps = {
    options: string[];
    answer: string | null;
    setAnswer: (answer: string) => void;
    correctAnswer: string | null;
    disabled: boolean;
}

export default function SingleChoice({ options, answer, setAnswer, correctAnswer, disabled }: SingleChoiceProps): JSX.Element {
    return (
        <div className="space-y-3">
            {options.map((option, index) => {
                const isSelected: boolean = option === answer;
                const className: string = isSelected ? (
                    option === correctAnswer
                        ? 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900 dark:text-red-300'
                ) : 'hover:bg-muted';

                return (
                    <motion.button
                        key={index}
                        onClick={() => setAnswer(option)}
                        disabled={!!correctAnswer || disabled}
                        whileHover={!correctAnswer ? { scale: 1.01 } : {}}
                        whileTap={!correctAnswer ? { scale: 0.99 } : {}}
                        className={`w-full p-4 text-left border-2 rounded-lg transition-all ${isSelected && !correctAnswer ? 'border-primary bg-primary/5' : 'border-border'} ${className} ${correctAnswer ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                                {isSelected && <div className="w-2 h-2 bg-current rounded-full" />}
                            </div>
                            <span className="flex-1">{option}</span>
                            {isSelected && option === correctAnswer && <CheckCircle className="h-5 w-5 text-green-600" />}
                            {isSelected && option !== correctAnswer && <XCircle className="h-5 w-5 text-red-600" />}
                        </div>
                    </motion.button>
                );
            })}
        </div>
    );
}
