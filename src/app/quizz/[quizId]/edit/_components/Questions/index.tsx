import { type JSX } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import { Button } from '@/components/Button';
import { useQuestions, type useQuestionsType } from './hooks';
import { type DatabaseQuestion } from '../../page';

type QuestionsProps = {
    questions: DatabaseQuestion[];
};

export default function Questions({ questions }: QuestionsProps): JSX.Element {
    const {
        activeFilter,
        setActiveFilter,
        expandedQuestion,
        setExpandedQuestion,
        getFilteredQuestions,
        getQuestionTypeColor,
    }: useQuestionsType = useQuestions(questions);

    return (
        <Card className="mb-6">
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <CardTitle>Questions ({questions.length})</CardTitle>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button
                            type="button"
                            variant={activeFilter === 'SINGLE_CHOICE' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setActiveFilter('SINGLE_CHOICE')}
                            className="flex-1 sm:flex-none"
                        >
                            Single Choice ({questions.filter((q) => q.type === 'SINGLE_CHOICE').length})
                        </Button>
                        <Button
                            type="button"
                            variant={activeFilter === 'MULTIPLE_CHOICE' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setActiveFilter('MULTIPLE_CHOICE')}
                            className="flex-1 sm:flex-none"
                        >
                            Multiple Choice ({questions.filter((q) => q.type === 'MULTIPLE_CHOICE').length})
                        </Button>
                        <Button
                            type="button"
                            variant={activeFilter === 'OPEN_ENDED' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setActiveFilter('OPEN_ENDED')}
                            className="flex-1 sm:flex-none"
                        >
                            Open Ended ({questions.filter((q) => q.type === 'OPEN_ENDED').length})
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {getFilteredQuestions(activeFilter).map((question, index) => {
                            return (
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
                                        <div className="flex items-center gap-3">
                                            {expandedQuestion === question.id ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                            <span className="font-medium">Question {index + 1}</span>
                                        </div>
                                        <div className="mt-2 text-sm text-muted-foreground truncate">
                                            {question.question}
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
                                                            Time Limit: {question.time_limit}s
                                                        </div>
                                                        <div className="font-medium truncate">
                                                            Max Score: {question.max_score}
                                                        </div>
                                                    </div>
                                                    {question.type === 'SINGLE_CHOICE' ? (
                                                        <div>
                                                            <span className="font-medium text-sm">Answers:</span>
                                                            <ul className="mt-1 space-y-1">
                                                                {(JSON.parse(question.single_choice_options!) as string[]).map((answer) => {
                                                                    const isCorrectAnswer: boolean = answer === question.single_choice_correct;
                                                                    return (
                                                                        <li key={uuidv4()} className="text-sm flex items-center gap-2">
                                                                            <span className={`w-2 h-2 shrink-0 rounded-full border ${isCorrectAnswer ? 'bg-current' : 'border-current'}`} />
                                                                            <span className="min-w-0 break-words">{answer}</span>
                                                                        </li>
                                                                    );
                                                                })}
                                                            </ul>
                                                        </div>
                                                    ) : question.type === 'MULTIPLE_CHOICE' ? (
                                                        <div>
                                                            <span className="font-medium text-sm">Answers:</span>
                                                            <ul className="mt-1 space-y-1">
                                                                {(JSON.parse(question.multiple_choice_options!) as string[]).map((answer) => {
                                                                    const isCorrectAnswer: boolean = (JSON.parse(question.multiple_choice_correct!) as string[]).includes(answer);
                                                                    return (
                                                                        <li key={uuidv4()} className="text-sm flex items-center gap-2">
                                                                            <span className={`w-2 h-2 shrink-0 rounded-xs border ${isCorrectAnswer ? 'bg-current' : 'border-current'}`} />
                                                                            <span className="min-w-0 break-words">{answer}</span>
                                                                        </li>
                                                                    );
                                                                })}
                                                            </ul>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <span className="font-medium text-sm">Correct Answer:</span>
                                                            {question.open_ended_answer_key ? (
                                                                <p className="text-sm mt-1 min-w-0 break-words">{question.open_ended_answer_key}</p>
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
                            );
                        })}
                    </AnimatePresence>
                </div>
            </CardContent>
        </Card>
    );
}
