'use client';

import { type JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/Button';
import { Dialog, DialogTrigger } from '@/components/Dialog';
import UnknownError from '../../_components/UnknownError';
import BasicInformationForm from '../../_components/BasicInformationForm';
import Questions from '../../_components/Questions';
import EditedDialog from '../../_components/EditedDialog';
import DeletedDialog from '../../_components/DeletedDialog';
import DeleteConfirmDialog from '../../_components/DeleteConfirmDialog';
import { useMainSection, type useMainSectionType } from './hooks';
import { type DatabaseQuiz } from '../../page';

export default function MainSection({ quizz }: { quizz: DatabaseQuiz }): JSX.Element {
    const {
        quiz,
        setQuiz,
        unknownError,
        quizErrors,
        isSubmitting,
        showEditedDialog,
        showDeletedDialog,
        handleSubmit,
        handleDelete,
    }: useMainSectionType = useMainSection(quizz);

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <div className="relative text-center mb-12">
                        <Button variant="ghost" asChild className="absolute right-full top-0">
                            <Link href="/dashboard">
                                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
                            </Link>
                        </Button>
                        <h1 className="text-4xl font-bold tracking-tight mb-4">Edit Quiz</h1>
                        <p className="text-lg text-muted-foreground">Update your quiz title and description</p>
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
                        <Questions questions={quizz.questions} />
                        <div className="flex justify-between">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button type="button" variant="destructive" size="lg" disabled={isSubmitting}>
                                        Delete Quiz
                                    </Button>
                                </DialogTrigger>
                                <DeleteConfirmDialog handleDelete={handleDelete} isSubmitting={isSubmitting} />
                            </Dialog>
                            <Button type="submit" size="lg" disabled={isSubmitting}>
                                Edit Quiz
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </div>
            <EditedDialog isOpen={showEditedDialog} />
            <DeletedDialog isOpen={showDeletedDialog} />
        </div>
    );
}
