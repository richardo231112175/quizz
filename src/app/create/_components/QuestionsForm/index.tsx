import { type JSX, type Dispatch, type SetStateAction } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Edit, Plus, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import { Button } from '@/components/Button';
import { Dialog, DialogTrigger } from '@/components/Dialog';
import QuestionEditDialog from '../QuestionEditDialog';
import { type Question } from '../../hooks';
import { useQuestionsForm, type useQuestionsFormType } from './hooks';

type QuestionsFormProps = {
    questions: Question[];
    setQuestions: Dispatch<SetStateAction<Question[]>>
};


export default function QuestionsForm({ questions, setQuestions }: QuestionsFormProps): JSX.Element {
    const {
        activeFilter,
        setActiveFilter,
        expandedQuestion,
        setExpandedQuestion,
        addQuestion,
        updateQuestion,
        removeQuestion,
        getFilteredQuestions,
        getQuestionTypeColor,
    }: useQuestionsFormType = useQuestionsForm({ questions, setQuestions });

    return (
        <Card className="mb-6">
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <CardTitle>Questions ({questions.length})</CardTitle>
                    <div className="flex flex-wrap gap-2">
                        <Button
                            type="button"
                            variant={activeFilter === 'single_choice' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setActiveFilter('single_choice')}
                            className="flex-1 sm:flex-none"
                        >
                            Single Choice ({questions.filter((q) => q.type === 'single_choice').length})
                        </Button>
                        <Button
                            type="button"
                            variant={activeFilter === 'multiple_choice' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setActiveFilter('multiple_choice')}
                            className="flex-1 sm:flex-none"
                        >
                            Multiple Choice ({questions.filter((q) => q.type === 'multiple_choice').length})
                        </Button>
                        <Button
                            type="button"
                            variant={activeFilter === 'open_ended' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setActiveFilter('open_ended')}
                            className="flex-1 sm:flex-none"
                        >
                            Open Ended ({questions.filter((q) => q.type === 'open_ended').length})
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {getFilteredQuestions().map((question, index) => (
                            <motion.div
                                key={question.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                                layout
                                className={`border rounded-lg shadow-sm ${getQuestionTypeColor(question.type)}`}
                            >
                                <div onClick={() => setExpandedQuestion(expandedQuestion === question.id ? null : question.id)} className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            {expandedQuestion === question.id ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                            <span className="font-medium">Question {index + 1}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div onClick={(e) => e.stopPropagation()}>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button type="button" variant="ghost" size="sm">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <QuestionEditDialog question={question} updateQuestion={updateQuestion}/>
                                                </Dialog>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeQuestion(question.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="mt-2 text-sm text-muted-foreground truncate">
                                        {question.question || 'No question text yet'}
                                    </div>
                                </div>
                                <AnimatePresence>
                                    {expandedQuestion === question.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="border-t bg-muted/20"
                                        >
                                            <div className="p-4 space-y-3">
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div className="font-medium truncate">
                                                        Time Limit: {question.timeLimit}s
                                                    </div>
                                                    <div className="font-medium truncate">
                                                        Max Score: {question.maxScore}
                                                    </div>
                                                </div>
                                                {question.type !== 'open_ended' ? (
                                                    <div>
                                                        <span className="font-medium text-sm">Answers:</span>
                                                        <ul className="mt-1 space-y-1">
                                                            {question.answers.map((answer) => (
                                                                <li key={answer.id} className="text-sm flex items-center gap-2">
                                                                    <span className={`w-2 h-2 shrink-0 rounded-full border ${answer.isCorrect ? 'bg-current' : 'border-current'}`} />
                                                                    {answer.text ? (
                                                                        <span className="min-w-0 break-words">{answer.text}</span>
                                                                    ) : (
                                                                        <span className="text-muted-foreground">Empty answer</span>
                                                                    )}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <span className="font-medium text-sm">Correct Answer:</span>
                                                        {question.correctAnswer ? (
                                                            <p className="text-sm mt-1 min-w-0 break-words">{question.correctAnswer}</p>
                                                        ) : (
                                                            <p className="text-sm mt-1 text-muted-foreground">Empty answer</p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={addQuestion}
                        className="w-full p-4 border-2 border-dashed rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus className="h-4 w-4" /> Add Question
                    </motion.button>
                </div>
            </CardContent>
        </Card>
    );
}
