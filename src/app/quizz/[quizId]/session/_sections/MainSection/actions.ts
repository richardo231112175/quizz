'use server';

import { z } from 'zod/v4';
import { v4 as uuidv4 } from 'uuid';
import prisma from '@/lib/prisma';
import supabase from '@/lib/supabase';
import { QuizSessionSchema } from '@/validations/quiz-session';
import { type QuizSessionType } from './hooks';
import { type Counts } from '../../page';
import type { QuizSessionCategory, QuizSessionDifficulty, QuizSessionVisibility } from '../../../../../../../generated/client';

export type createQuizSessionReturn = {
    success: false;
    redirect: boolean;
    errors: parsedQuizSessionError[];
} | {
    success: true;
} | undefined;

export async function createQuizSession(quizId: number, form: QuizSessionType, counts: Counts): Promise<createQuizSessionReturn> {
    const quiz: boolean = !!await prisma.quiz.findUnique({
        where: { id: quizId },
    });

    if (!quiz) {
        return { success: false, redirect: true, errors: [] };
    }

    const parsedQuizSession: parseQuizSessionResult = parseQuizSession(form, counts);

    if (!parsedQuizSession) {
        return undefined;
    } else if (!parsedQuizSession.success) {
        return {
            success: false,
            redirect: false,
            errors: parsedQuizSession.errors,
        };
    }

    const upload: uploadImageResult | null = parsedQuizSession.data.image ? (await uploadImage(parsedQuizSession.data.image)) : null;

    if (upload !== null && !upload.success) {
        return {
            success: false,
            redirect: false,
            errors: [ { path: 'image', message: 'Failed to upload image' } ],
        };
    }

    try {
        await prisma.quizSession.create({
            data: {
                quiz_id: quizId,
                title: parsedQuizSession.data.title,
                description: parsedQuizSession.data.description,
                image_url: upload !== null && upload.success ? upload.path : null,
                category: parsedQuizSession.data.category.toUpperCase() as QuizSessionCategory,
                difficulty: parsedQuizSession.data.difficulty.toUpperCase() as QuizSessionDifficulty,
                time_limit: parsedQuizSession.data.time_limit,
                visibility: parsedQuizSession.data.visibility.toUpperCase() as QuizSessionVisibility,
                password: parsedQuizSession.data.password,
                single_choice: parsedQuizSession.data.single_choice,
                multiple_choice: parsedQuizSession.data.multiple_choice,
                open_ended: parsedQuizSession.data.open_ended,
                open_time: new Date(parsedQuizSession.data.open_time).toISOString(),
                close_time: new Date(parsedQuizSession.data.close_time).toISOString(),
            },
        });

        return { success: true };
    } catch {
        if (upload !== null && upload.success) {
            await supabase.storage.from('quizz').remove([ upload.path ]);
        }
    }
}

type parsedQuizSession = {
    quiz_id: number;
    title: string;
    description: string | null;
    image: File | null;
    category: string;
    difficulty: string;
    time_limit: number;
    visibility: string;
    password: string | null;
    single_choice: number;
    multiple_choice: number;
    open_ended: number;
    open_time: string;
    close_time: string;
};

export type parsedQuizSessionError = {
    path: string;
    message: string;
};

type parseQuizSessionResult = {
    success: true;
    data: parsedQuizSession;
} | {
    success: false;
    errors: parsedQuizSessionError[];
} | undefined;

function parseQuizSession(form: QuizSessionType, counts: Counts): parseQuizSessionResult {
    try {
        const parsedQuizSession: parsedQuizSession = QuizSessionSchema(counts.single_choice_count, counts.multiple_choice_count, counts.open_ended_count).parse({
            quiz_id: form.quizId,
            title: form.title,
            description: form.description,
            image: form.image,
            category: form.category,
            difficulty: form.difficulty,
            time_limit: form.timeLimit,
            visibility: form.visibility,
            password: form.password,
            single_choice: form.singleChoiceCount,
            multiple_choice: form.multipleChoiceCount,
            open_ended: form.openEndedCount,
            open_time: form.openTime,
            close_time: form.closeTime,
        });

        return {
            success: true,
            data: parsedQuizSession,
        };
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errors: parsedQuizSessionError[] = error.issues.map((issue) => ({
                path: issue.path.join('.'),
                message: issue.message,
            }));

            return {
                success: false,
                errors,
            };
        }
    }
}

type supabaseData = {
    id: string;
    path: string;
    fullPath: string;
} | null;

type uploadImageResult = {
    success: true;
    path: string;
} | {
    success: false;
}

async function uploadImage(file: File): Promise<uploadImageResult> {
    const { data, error }: { data: supabaseData , error: unknown} = await supabase.storage.from('quizz').upload(uuidv4(), file);

    if (error || data === null) {
        return { success: false };
    }

    return {
        success: true,
        path: data.path,
    };
}
