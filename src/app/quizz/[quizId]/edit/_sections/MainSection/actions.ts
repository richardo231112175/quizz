'use server';

import { z } from 'zod/v4';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { QuizSchema } from '@/validations/quiz';
import { type Quiz } from './hooks';

export type editQuizReturn = {
    success: true;
} | {
    success: false;
    errors: parsedQuizError[];
} | undefined;

export async function editQuiz(quizId: number, quiz: Quiz): Promise<editQuizReturn> {
    const parsedQuiz: parseQuizResult = parseQuiz({ title: quiz.title, description: quiz.description });
    const { userId }: { userId: string | null } = await auth();

    if (!parsedQuiz || !userId) {
        return undefined;
    }

    if (!parsedQuiz.success) {
        return {
            success: false,
            errors: parsedQuiz.errors,
        };
    }

    try {
        await prisma.quiz.update({
            where: {
                id: quizId,
                clerk_id: userId,
            },
            data: {
                title: parsedQuiz.data.title,
                description: parsedQuiz.data.description,
            },
        });
        return { success: true };
    } catch {}
}

export type deleteQuizReturn = {
    success: true;
} | undefined;

export async function deleteQuiz(quizId: number): Promise<deleteQuizReturn> {
    const { userId }: { userId: string | null } = await auth();

    if (!userId) {
        return undefined;
    }

    try {
        await prisma.quiz.delete({
            where: {
                id: quizId,
                clerk_id: userId,
            },
        });
        return { success: true };
    } catch {}
}

type parsedQuiz = {
    title: string;
    description: string | null;
};

export type parsedQuizError = {
    path: string;
    message: string;
};

export type parseQuizResult = {
    success: true;
    data: parsedQuiz;
} | {
    success: false;
    errors: parsedQuizError[];
} | undefined;

function parseQuiz(quiz: Quiz): parseQuizResult {
    try {
        const parsedQuiz: parsedQuiz = QuizSchema.parse(quiz);

        return {
            success: true,
            data: parsedQuiz,
        };
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errors: parsedQuizError[] = error.issues.map((issue) => ({
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
