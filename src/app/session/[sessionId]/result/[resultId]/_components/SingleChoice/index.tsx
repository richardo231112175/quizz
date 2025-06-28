import { type JSX } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

type SingleChoiceProps = {
    options: string[];
    answer: string;
    correctAnswer: string;
}

export default function SingleChoice({ options, answer, correctAnswer }: SingleChoiceProps): JSX.Element {
    return (
        <div className="space-y-3">
            {options.map((option, index) => {
                const isSelected: boolean = option === answer;
                const className: string = option === correctAnswer
                    ? 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : isSelected
                        ? 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900 dark:text-red-300'
                        : 'hover:bg-muted';

                return (
                    <button key={index} disabled={true} className={`w-full p-4 text-left border-2 rounded-lg transition-all border-border ${className} cursor-default`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                                {isSelected && <div className="w-2 h-2 bg-current rounded-full" />}
                            </div>
                            <span className="flex-1">{option}</span>
                            {isSelected && option === correctAnswer && <CheckCircle className="h-5 w-5 text-green-600" />}
                            {isSelected && option !== correctAnswer && <XCircle className="h-5 w-5 text-red-600" />}
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
