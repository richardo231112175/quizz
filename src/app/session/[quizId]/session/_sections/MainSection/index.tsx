'use client';

import { type JSX } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { BackButton } from '@/components/BackButton';
import SessionInformationForm from '../../_components/SessionInformationForm';
import QuizSettingForm from '../../_components/QuizSettingForm';
import QuestionConfigurationForm from '../../_components/QuestionConfigurationForm';
import ScheduleForm from '../../_components/ScheduleForm';
import UnknownError from '../../_components/UnknownError';
import { SuccessDialog } from '../../_components/SuccessDialog';
import { useMainSection, type useMainSectionType } from './hooks';
import { type Counts } from '../../page';

type MainSectionProps = {
    quizId: number;
    counts: Counts;
};

export default function MainSection({ quizId, counts }: MainSectionProps): JSX.Element {
    const { form, setForm, quizSessionErrors, unknownError, isSubmitting, showSuccessDialog, handleSubmit }: useMainSectionType = useMainSection(quizId, counts);

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center mb-12 space-y-4">
                        <div className="text-left">
                            <BackButton />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight mb-4">Create Quiz Session</h1>
                            <p className="text-lg text-muted-foreground">Configure the settings for your quiz session</p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <AnimatePresence mode="wait">
                            {unknownError && <UnknownError />}
                        </AnimatePresence>
                        <SessionInformationForm form={form} setForm={setForm} isSubmitting={isSubmitting} errors={quizSessionErrors} />
                        <QuizSettingForm form={form} setForm={setForm} isSubmitting={isSubmitting} errors={quizSessionErrors} />
                        <QuestionConfigurationForm form={form} setForm={setForm} isSubmitting={isSubmitting} counts={counts} errors={quizSessionErrors} />
                        <ScheduleForm form={form} setForm={setForm} isSubmitting={isSubmitting} errors={quizSessionErrors} />
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" size="lg" asChild disabled={isSubmitting}>
                                <Link href="/dashboard">Cancel</Link>
                            </Button>
                            <Button type="submit" size="lg" disabled={isSubmitting}>Create Session</Button>
                        </div>
                    </form>
                </motion.div>
            </div>
            <SuccessDialog isOpen={showSuccessDialog} />
        </div>
    );
}
