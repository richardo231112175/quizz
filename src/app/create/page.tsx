'use client';

import { useState, type JSX, type Dispatch, type SetStateAction, type ChangeEvent, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImagePlus, Plus, Trash2, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { Textarea } from '@/components/Textarea';
import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';

type Answer = {
    id: string;
    text: string;
    isCorrect: boolean;
};

type BaseQuestion = {
    id: string;
    question: string;
    timeLimit: number;
    maxScore: number;
    image: File | null;
};

type SingleChoiceQuestion = BaseQuestion & {
    type: 'single_choice';
    answers: Answer[];
};

type MultipleChoiceQuestion = BaseQuestion & {
    type: 'multiple_choice';
    answers: Answer[];
};

type OpenEndedQuestion = BaseQuestion & {
    type: 'open_ended';
    correctAnswer: string;
};

type Question = SingleChoiceQuestion | MultipleChoiceQuestion | OpenEndedQuestion;

export default function CreateQuizPage(): JSX.Element {
    const [ questions, setQuestions ]: [ Question[], Dispatch<SetStateAction<Question[]>> ] = useState<Question[]>([]);
    const [ title, setTitle ]: [ string, Dispatch<SetStateAction<string>> ] = useState<string>('');
    const [ description, setDescription ]: [ string, Dispatch<SetStateAction<string>> ] = useState<string>('');

    function handleImageChange(e: ChangeEvent<HTMLInputElement>, questionId?: string): void {
        const file: File | undefined = e.target.files?.[0];
        if (file && questionId) {
            setQuestions(questions.map((q) => q.id === questionId ? { ...q, image: file } : q));
        }
    }

    function addQuestion(type: 'single_choice' | 'multiple_choice' | 'open_ended'): void {
        const baseQuestion: BaseQuestion = {
            id: uuidv4(),
            question: '',
            timeLimit: 30,
            maxScore: 10,
            image: null,
        };

        let newQuestion: Question;

        if (type === 'single_choice') {
            newQuestion = {
                ...baseQuestion,
                type: 'single_choice',
                answers: [
                    { id: uuidv4(), text: '', isCorrect: false },
                    { id: uuidv4(), text: '', isCorrect: false },
                ],
            };
        } else if (type === 'multiple_choice') {
            newQuestion = {
                ...baseQuestion,
                type: 'multiple_choice',
                answers: [
                    { id: uuidv4(), text: '', isCorrect: false },
                    { id: uuidv4(), text: '', isCorrect: false },
                ],
            };
        } else {
            newQuestion = {
                ...baseQuestion,
                type: 'open_ended',
                correctAnswer: '',
            };
        }

        setQuestions([ ...questions, newQuestion ]);
    };

    function removeQuestion(id: string): void {
        setQuestions(questions.filter((q) => q.id !== id));
    }

    function updateQuestion(id: string, updates: Partial<BaseQuestion>): void {
        setQuestions(questions.map((q) => q.id === id ? { ...q, ...updates } : q));
    }

    function addAnswer(questionId: string): void {
        setQuestions(questions.map((q) => {
            if (q.id !== questionId || q.type === 'open_ended') {
                return q;
            }
            return { ...q, answers: [ ...q.answers, { id: uuidv4(), text: '', isCorrect: false } ] };
        }));
    };

    function removeAnswer(questionId: string, answerId: string): void {
        setQuestions(questions.map((q) => {
            if (q.id !== questionId || q.type === 'open_ended') {
                return q;
            }
            return { ...q, answers: q.answers.filter((a) => a.id !== answerId) };
        }));
    };

    function updateRadioCorrectAnswer(questionId: string, answerId: string): void {
        setQuestions(questions.map((q) => {
            if (q.id !== questionId || q.type !== 'single_choice') {
                return q;
            }
            return { ...q, answers: q.answers.map((a) => ({ ...a, isCorrect: a.id === answerId })) };
        }));
    };

    function updateAnswer(questionId: string, answerId: string, updates: Partial<Answer> | string): void {
        setQuestions(questions.map((q) => {
            if (q.id !== questionId || q.type === 'open_ended') {
                return q;
            }
            return { ...q, answers: q.answers.map((a) => a.id === answerId
                ? { ...a, ...(typeof updates === 'string' ? { text: updates } : updates) }
                : a),
            };
        }));
    };

    function updateOpenEndedAnswer(questionId: string, answer: string): void {
        setQuestions(questions.map((q) => q.id === questionId ? { ...q, correctAnswer: answer } : q));
    };

    async function handleSubmit(e: FormEvent): Promise<void> {
        e.preventDefault();
        console.log('Submitting quiz...');
    };

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Create a New Quiz</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Design your quiz content and questions</p>
                </div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <form onSubmit={handleSubmit}>
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Quiz Title</Label>
                                    <Input
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter quiz title"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description (Optional)</Label>
                                    <Textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Describe your quiz"
                                        className="resize-none"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle>Questions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex flex-wrap gap-2">
                                    <Button type="button" variant="outline" onClick={() => addQuestion('single_choice')}>
                                        <Plus className="h-4 w-4 mr-2" /> Single Choice
                                    </Button>
                                    <Button type="button" variant="outline" onClick={() => addQuestion('multiple_choice')}>
                                        <Plus className="h-4 w-4 mr-2" /> Multiple Choice
                                    </Button>
                                    <Button type="button" variant="outline" onClick={() => addQuestion('open_ended')}>
                                        <Plus className="h-4 w-4 mr-2" /> Open Ended
                                    </Button>
                                </div>
                                <AnimatePresence>
                                    {questions.map((question, index) => (
                                        <motion.div
                                            key={question.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="border rounded-lg p-4 space-y-4"
                                        >
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-lg font-semibold">
                                                    Question {index + 1}
                                                    <span className="ml-2">
                                                        {question.type === 'open_ended' ? '(Open Ended)' : question.type === 'multiple_choice' ? '(Multiple Choice)' : '(Single Choice)'}
                                                    </span>
                                                </h3>
                                                <Button type="button" variant="ghost" size="sm" onClick={() => removeQuestion(question.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label>Question Text</Label>
                                                    <Textarea
                                                        value={question.question}
                                                        onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
                                                        placeholder="Enter your question"
                                                        required
                                                        className="resize-none"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label>Time Limit (seconds)</Label>
                                                        <Input
                                                            type="number"
                                                            min="5"
                                                            max="600"
                                                            value={question.timeLimit}
                                                            onChange={(e) => updateQuestion(question.id, { timeLimit: parseInt(e.target.value) })}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Max Score</Label>
                                                        <Input
                                                            type="number"
                                                            min="1"
                                                            max="100"
                                                            value={question.maxScore}
                                                            onChange={(e) => updateQuestion(question.id, { maxScore: parseInt(e.target.value) })}
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
                                                            onClick={() => document.getElementById(`question-image-${question.id}`)?.click()}
                                                        >
                                                            <ImagePlus className="h-4 w-4 mr-2" />
                                                            {question.image ? 'Change Image' : 'Upload Image'}
                                                        </Button>
                                                        {question.image && (
                                                            <span className="text-sm text-muted-foreground">
                                                                {question.image.name}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <input
                                                        id={`question-image-${question.id}`}
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => handleImageChange(e, question.id)}
                                                    />
                                                </div>
                                                {question.type === 'open_ended' ? (
                                                    <div className="space-y-2">
                                                        <Label>Correct Answer</Label>
                                                        <Textarea
                                                            value={question.correctAnswer}
                                                            onChange={(e) => updateOpenEndedAnswer(question.id, e.target.value)}
                                                            placeholder="Enter the correct answer"
                                                            required
                                                            className="resize-none"
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
                                                                onClick={() => addAnswer(question.id)}
                                                            >
                                                                <Plus className="h-4 w-4 mr-2" /> Add Answer
                                                            </Button>
                                                        </div>
                                                        <div className="space-y-2">
                                                            {question.answers.map((answer) => (
                                                                <div key={answer.id} className="flex items-start gap-2">
                                                                    {question.type === 'single_choice' ? (
                                                                        <input
                                                                            type="radio"
                                                                            checked={answer.isCorrect}
                                                                            onChange={() => updateRadioCorrectAnswer(question.id, answer.id)}
                                                                            className="mt-3 accent-current"
                                                                        />
                                                                    ) : (
                                                                        <Checkbox
                                                                            checked={answer.isCorrect}
                                                                            onCheckedChange={(checked) => updateAnswer(question.id, answer.id, { isCorrect: checked as boolean })}
                                                                            className="mt-3"
                                                                        />
                                                                    )}
                                                                    <Input
                                                                        value={answer.text}
                                                                        onChange={(e) => updateAnswer(question.id, answer.id, { text: e.target.value })}
                                                                        placeholder="Enter answer"
                                                                        required
                                                                    />
                                                                    <Button
                                                                        type="button"
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        onClick={() => removeAnswer(question.id, answer.id)}
                                                                        disabled={question.answers.length <= 2}
                                                                    >
                                                                        <X className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </CardContent>
                        </Card>
                        <div className="flex justify-end">
                            <Button type="submit" size="lg">Create Quiz</Button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
