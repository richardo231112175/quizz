import { type JSX } from 'react';
import { Check, CheckCircle, XCircle } from 'lucide-react';

type MultipleChoiceProps = {
    options: string[];
    answers: string[];
    correctAnswers: string[];
}

export default function MultipleChoice({ options, answers, correctAnswers }: MultipleChoiceProps): JSX.Element {
    return (
        <div className="space-y-3">
            {options.map((option, index) => {
                const isSelected: boolean = answers.includes(option);
                const className: string = correctAnswers.includes(option)
                    ? 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : isSelected
                        ? 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900 dark:text-red-300'
                        : 'hover:bg-muted';

                return (
                    <button key={index} disabled={true} className={`w-full p-4 text-left border-2 rounded-lg transition-all border-border ${className} cursor-default`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                                {isSelected && <Check className="h-4 w-4" />}
                            </div>
                            <span className="flex-1">{option}</span>
                            {isSelected && correctAnswers.includes(option) && <CheckCircle className="h-5 w-5 text-green-600" />}
                            {isSelected && !correctAnswers.includes(option) && <XCircle className="h-5 w-5 text-red-600" />}
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
