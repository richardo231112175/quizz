import {  type JSX, type RefObject } from 'react';
import { useRef } from 'react';
import { ImagePlus, Plus, Trash2, X } from 'lucide-react';
import { DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/Dialog';
import { Label } from '@/components/Label';
import { Textarea } from '@/components/Textarea';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import { type Question } from '../../hooks';
import { useQuestionEditDialog, type useQuestionEditDialogType } from './hooks';
import { type parsedQuestionError } from '../../actions';

type QuestionEditDialogProps = {
    question: Question;
    updateQuestion: (question: Question) => void;
    error: parsedQuestionError[] | undefined;
    isSubmitting: boolean;
};

export default function QuestionEditDialog({ question, updateQuestion, error, isSubmitting }: QuestionEditDialogProps): JSX.Element {
    const {
        handleImageChange,
        handleImageDelete,
        addAnswer,
        handleMultipleChoiceAnswerChange,
    }: useQuestionEditDialogType = useQuestionEditDialog({ question, updateQuestion, isSubmitting });

    const fileInputRef: RefObject<HTMLInputElement | null> = useRef<HTMLInputElement>(null);

    function getFieldError(field: string): string | undefined {
        return error?.find((e) => e.path === field)?.message;
    }

    function getAnswerError(answerIndex: number): string | undefined {
        if (question.type === 'open_ended') return undefined;
        return error?.find((e) => e.path === `${question.type === 'single_choice' ? 'singleChoiceOptions' : 'multipleChoiceOptions'}.${answerIndex}`)?.message;
    }

    const questionError: string | undefined = getFieldError('question');
    const timeLimitError: string | undefined = getFieldError('timeLimit');
    const maxScoreError: string | undefined = getFieldError('maxScore');
    const correctAnswerError: string | undefined = question.type === 'open_ended' ? getFieldError('openEndedAnswerKey') : undefined;
    const singleChoiceCorrectError: string | undefined = question.type === 'single_choice' ? getFieldError('singleChoiceCorrect') : undefined;
    const multipleChoiceCorrectError: string | undefined = question.type === 'multiple_choice' ? getFieldError('multipleChoiceCorrect') : undefined;

    return (
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-track-muted/50 scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40">
            <DialogHeader>
                <DialogTitle>Edit Question</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Question Text</Label>
                    <Textarea
                        value={question.question}
                        onChange={(e) => updateQuestion({ ...question, question: e.target.value })}
                        placeholder="Enter your question"
                        required
                        className={`resize-none scrollbar-thin scrollbar-track-muted/50 scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40 ${questionError ? 'border-red-500' : ''}`}
                        disabled={isSubmitting}
                    />
                    {questionError && (
                        <p className="text-sm text-red-500">{questionError}</p>
                    )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Time Limit (seconds)</Label>
                        <Input
                            type="number"
                            min="5"
                            max="300"
                            value={question.timeLimit}
                            onChange={(e) => updateQuestion({ ...question, timeLimit: parseInt(e.target.value) || 0 })}
                            required
                            className={timeLimitError ? 'border-red-500' : ''}
                            disabled={isSubmitting}
                        />
                        {timeLimitError && (
                            <p className="text-sm text-red-500">{timeLimitError}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label>Max Score</Label>
                        <Input
                            type="number"
                            min="1"
                            max="100"
                            value={question.maxScore}
                            onChange={(e) => updateQuestion({ ...question, maxScore: parseInt(e.target.value) || 0 })}
                            required
                            className={maxScoreError ? 'border-red-500' : ''}
                            disabled={isSubmitting}
                        />
                        {maxScoreError && (
                            <p className="text-sm text-red-500">{maxScoreError}</p>
                        )}
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Question Image (Optional)</Label>
                    <div className="flex items-center gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                if (isSubmitting) return;
                                fileInputRef.current?.click();
                            }}
                            disabled={isSubmitting}
                        >
                            <ImagePlus className="h-4 w-4 mr-2" />
                            {question.image ? 'Change Image' : 'Upload Image'}
                        </Button>
                        {question.image && (
                            <div>
                                <span className="text-sm text-muted-foreground">
                                    {question.image.name}
                                </span>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleImageDelete}
                                    disabled={isSubmitting}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                        disabled={isSubmitting}
                    />
                </div>
                {question.type === 'open_ended' ? (
                    <div className="space-y-2">
                        <Label>Correct Answer</Label>
                        <Textarea
                            value={question.correctAnswer}
                            onChange={(e) => updateQuestion({ ...question, correctAnswer: e.target.value })}
                            placeholder="Enter the correct answer"
                            required
                            className={`resize-none scrollbar-thin scrollbar-track-muted/50 scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40 ${correctAnswerError ? 'border-red-500' : ''}`}
                            disabled={isSubmitting}
                        />
                        {correctAnswerError && (
                            <p className="text-sm text-red-500">{correctAnswerError}</p>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div className="space-y-1">
                                <Label>Answers</Label>
                                {(singleChoiceCorrectError || multipleChoiceCorrectError) && (
                                    <p className="text-sm text-red-500">{singleChoiceCorrectError || multipleChoiceCorrectError}</p>
                                )}
                            </div>
                            <Button
                                disabled={question.answers.length >= 10 || isSubmitting}
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addAnswer}
                            >
                                <Plus className="h-4 w-4 mr-2" /> Add Answer
                            </Button>
                        </div>
                        <div className="space-y-2">
                            {question.answers.map((answer, index) => {
                                const answerError: string | undefined = getAnswerError(index);
                                return (
                                    <div key={answer.id} className="flex items-start gap-2">
                                        {question.type === 'single_choice' ? (
                                            <input
                                                type="radio"
                                                checked={answer.isCorrect}
                                                onChange={() => updateQuestion({
                                                    ...question,
                                                    answers: question.answers.map((a) => ({
                                                        ...a,
                                                        isCorrect: a.id === answer.id,
                                                    })),
                                                })}
                                                className="mt-3 accent-current"
                                                disabled={isSubmitting}
                                            />
                                        ) : (
                                            <Checkbox
                                                checked={answer.isCorrect}
                                                onCheckedChange={(checked) => handleMultipleChoiceAnswerChange(answer.id, !!checked)}
                                                className="mt-3"
                                                disabled={isSubmitting}
                                            />
                                        )}
                                        <div className="flex-1 space-y-1">
                                            <Input
                                                value={answer.text}
                                                onChange={(e) => updateQuestion({
                                                    ...question,
                                                    answers: question.answers.map((a) =>
                                                        a.id === answer.id ? { ...a, text: e.target.value } : a
                                                    ),
                                                })}
                                                placeholder="Enter answer"
                                                required
                                                className={answerError ? 'border-red-500' : ''}
                                                disabled={isSubmitting}
                                            />
                                            {answerError && (
                                                <p className="text-sm text-red-500">{answerError}</p>
                                            )}
                                        </div>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => updateQuestion({
                                                ...question,
                                                answers: question.answers.filter((a) => a.id !== answer.id),
                                            })}
                                            disabled={question.answers.length <= 2 || isSubmitting}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
                <div className="flex justify-end gap-2">
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Close</Button>
                    </DialogClose>
                </div>
            </div>
        </DialogContent>
    );
}
