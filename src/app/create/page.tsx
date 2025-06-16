'use client';

import { type JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/Button';
import UnknownError from './_components/UnknownError';
import BasicInformationForm from './_components/BasicInformationForm';
import QuestionsForm from './_components/QuestionsForm';
import { SuccessDialog } from './_components/SuccessDialog';
import { useCreateQuiz, type useCreateQuizType } from './hooks';

export default function CreateQuizPage(): JSX.Element {
    const {
        quiz,
        setQuiz,
        questions,
        setQuestions,
        unknownError,
        quizErrors,
        questionErrors,
        isSubmitting,
        showSuccessDialog,
        handleSubmit,
    }: useCreateQuizType = useCreateQuiz();

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold tracking-tight mb-4">Create a New Quiz</h1>
                        <p className="text-lg text-muted-foreground">Design your quiz content and questions</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <AnimatePresence mode="wait">
                            {unknownError && <UnknownError />}
                        </AnimatePresence>
                        <BasicInformationForm
                            quiz={quiz}
                            setQuiz={setQuiz}
                            errors={quizErrors}
                            isSubmitting={isSubmitting}
                        />
                        <QuestionsForm
                            questions={questions}
                            setQuestions={setQuestions}
                            errors={questionErrors}
                            isSubmitting={isSubmitting}
                        />
                        <div className="flex justify-end">
                            <Button type="submit" size="lg" disabled={isSubmitting}>Create Quiz</Button>
                        </div>
                    </form>
                </motion.div>
            </div>
            <SuccessDialog isOpen={showSuccessDialog} />
        </div>
    );
}
