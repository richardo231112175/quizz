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

type QuestionEditDialogProps = {
    question: Question;
    updateQuestion: (question: Question) => void;
};

export default function QuestionEditDialog({ question, updateQuestion }: QuestionEditDialogProps): JSX.Element {
    const {
        localQuestion,
        setLocalQuestion,
        handleImageChange,
        addAnswer,
        handleMultipleChoiceAnswerChange,
        handleImageDelete,
    }: useQuestionEditDialogType = useQuestionEditDialog({ question });

    const fileInputRef: RefObject<HTMLInputElement | null> = useRef<HTMLInputElement>(null);

    return (
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-track-muted/50 scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40">
            <DialogHeader>
                <DialogTitle>Edit Question</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Question Text</Label>
                    <Textarea
                        value={localQuestion.question}
                        onChange={(e) => setLocalQuestion({ ...localQuestion, question: e.target.value })}
                        placeholder="Enter your question"
                        required
                        className="resize-none scrollbar-thin scrollbar-track-muted/50 scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Time Limit (seconds)</Label>
                        <Input
                            type="number"
                            min="5"
                            max="300"
                            value={localQuestion.timeLimit}
                            onChange={(e) => setLocalQuestion({ ...localQuestion, timeLimit: parseInt(e.target.value) || 0 })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Max Score</Label>
                        <Input
                            type="number"
                            min="1"
                            max="100"
                            value={localQuestion.maxScore}
                            onChange={(e) => setLocalQuestion({ ...localQuestion, maxScore: parseInt(e.target.value) || 0 })}
                            required
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Question Image (Optional)</Label>
                    <div className="flex items-center gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <ImagePlus className="h-4 w-4 mr-2" />
                            {localQuestion.image ? 'Change Image' : 'Upload Image'}
                        </Button>
                        {localQuestion.image && (
                            <div>
                                <span className="text-sm text-muted-foreground">
                                    {localQuestion.image.name}
                                </span>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleImageDelete}
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
                    />
                </div>
                {localQuestion.type === 'open_ended' ? (
                    <div className="space-y-2">
                        <Label>Correct Answer</Label>
                        <Textarea
                            value={localQuestion.correctAnswer}
                            onChange={(e) => setLocalQuestion({ ...localQuestion, correctAnswer: e.target.value })}
                            placeholder="Enter the correct answer"
                            required
                            className="resize-none scrollbar-thin scrollbar-track-muted/50 scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40"
                        />
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Label>Answers</Label>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addAnswer}
                            >
                                <Plus className="h-4 w-4 mr-2" /> Add Answer
                            </Button>
                        </div>
                        <div className="space-y-2">
                            {localQuestion.answers.map((answer) => (
                                <div key={answer.id} className="flex items-start gap-2">
                                    {localQuestion.type === 'single_choice' ? (
                                        <input
                                            type="radio"
                                            checked={answer.isCorrect}
                                            onChange={() => {
                                                setLocalQuestion({
                                                    ...localQuestion,
                                                    answers: localQuestion.answers.map((a) => ({
                                                        ...a,
                                                        isCorrect: a.id === answer.id,
                                                    })),
                                                });
                                            }}
                                            className="mt-3 accent-current"
                                        />
                                    ) : (
                                        <Checkbox
                                            checked={answer.isCorrect}
                                            onCheckedChange={(checked) => handleMultipleChoiceAnswerChange(answer.id, !!checked)}
                                            className="mt-3"
                                        />
                                    )}
                                    <Input
                                        value={answer.text}
                                        onChange={(e) => setLocalQuestion({
                                            ...localQuestion,
                                            answers: localQuestion.answers.map((a) =>
                                                a.id === answer.id ? { ...a, text: e.target.value } : a
                                            ),
                                        })}
                                        placeholder="Enter answer"
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setLocalQuestion({
                                            ...localQuestion,
                                            answers: localQuestion.answers.filter((a) => a.id !== answer.id),
                                        })}
                                        disabled={localQuestion.answers.length <= 2}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className="flex justify-end gap-2">
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="button" onClick={() => updateQuestion(localQuestion)}>Save Changes</Button>
                    </DialogClose>
                </div>
            </div>
        </DialogContent>
    );
}
