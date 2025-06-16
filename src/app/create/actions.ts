'use server';

import { z } from 'zod/v4';
import { auth } from '@clerk/nextjs/server';
import { v4 as uuidv4 } from 'uuid';
import supabase from '@/lib/supabase';
import prisma from '@/lib/prisma';
import { QuizSchema } from '@/validations/quiz';
import { SingleChoiceQuestionSchema, MultipleChoiceQuestionSchema, OpenEndedQuestionSchema } from '@/validations/question';
import { type Quiz,type Question } from './hooks';

export type createQuizReturn = {
    success: true;
} | {
    success: false;
    errors: {
        quiz: parsedQuizError[];
        questions: parsedQuestionError[][];
    };
} | undefined;

type upload = {
    id: string;
    file: File;
}

export async function createQuiz(quiz: Quiz, questions: Question[]): Promise<createQuizReturn> {
    const parsedQuiz: parseQuizResult = parseQuiz({ title: quiz.title, description: quiz.description });
    const parsedQuestions: parseQuestionResult = parseQuestion(questions);
    const { userId }: { userId: string | null } = await auth();

    if (!parsedQuiz || !parsedQuestions || !userId) {
        return undefined;
    }

    if (!parsedQuiz.success || !parsedQuestions.success) {
        return {
            success: false,
            errors: {
                quiz: !parsedQuiz.success ? parsedQuiz.errors : [],
                questions: !parsedQuestions.success ? parsedQuestions.errors : [],
            },
        };
    }

    const uploadedImages: uploadImagesResult = await uploadImages(questions);

    if (!uploadedImages.success) {
        return {
            success: false,
            errors: {
                quiz: [],
                questions: uploadedImages.ids.map((id) => ([ {
                    questionId: id,
                    path: 'image',
                    message: 'Failed to upload image',
                } ])),
            },
        };
    }

    try {
        await prisma.quiz.create({
            data: {
                clerk_id: userId,
                title: parsedQuiz.data.title,
                description: parsedQuiz.data.description,
                questions: {
                    create: parsedQuestions.data.map((question, index) => ({
                        question: question.question,
                        image_url: uploadedImages.uploaded.find((upload) => upload.id === questions[index].id)?.path ?? null,
                        type: question.type === 'single_choice' ? 'SINGLE_CHOICE' : question.type === 'multiple_choice' ? 'MULTIPLE_CHOICE' : 'OPEN_ENDED',
                        time_limit: question.timeLimit,
                        max_score: question.maxScore,
                        single_choice_options: question.type === 'single_choice' ? question.singleChoiceOptions.join(',') : null,
                        single_choice_correct: question.type === 'single_choice' ? question.singleChoiceCorrect : null,
                        multiple_choice_options: question.type === 'multiple_choice' ? question.multipleChoiceOptions.join(',') : null,
                        multiple_choice_correct: question.type === 'multiple_choice' ? question.multipleChoiceCorrect.join(',') : null,
                        open_ended_answer_key: question.type === 'open_ended' ? question.openEndedAnswerKey : null,
                    })),
                },
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

type questionBase = {
    question: string;
    image: File | null;
    timeLimit: number;
    maxScore: number;
};

type parsedSingleChoiceQuestion = questionBase & {
    type: 'single_choice';
    singleChoiceOptions: string[];
    singleChoiceCorrect: string;
};

type parsedMultipleChoiceQuestion = questionBase & {
    type: 'multiple_choice';
    multipleChoiceOptions: string[];
    multipleChoiceCorrect: string[];
};

type parsedOpenEndedQuestion = questionBase & {
    type: 'open_ended';
    openEndedAnswerKey: string;
};

type parsedQuestion = parsedSingleChoiceQuestion | parsedMultipleChoiceQuestion | parsedOpenEndedQuestion;

export type parsedQuestionError = {
    questionId: string;
    path: string;
    message: string;
};

export type parseQuestionResult = {
    success: true;
    data: parsedQuestion[];
} | {
    success: false;
    errors: parsedQuestionError[][];
} | undefined;

function parseQuestion(questions: Question[]): parseQuestionResult {
    const parsedQuestions: parsedQuestion[] = [];
    const parseQuestionErrors: parsedQuestionError[][] = [];
    let unknownError: boolean = false;

    if (!questions.length) {
        return {
            success: false,
            errors: [ [ {
                questionId: 'questions',
                path: 'questions',
                message: 'At least 1 question is required',
            } ] ],
        };
    }

    questions.forEach((question) => {
        const baseQuestion: questionBase = {
            question: question.question,
            image: question.image,
            timeLimit: question.timeLimit,
            maxScore: question.maxScore,
        };

        try {
            if (question.type === 'single_choice') {
                const parsedQuestion: parsedSingleChoiceQuestion = SingleChoiceQuestionSchema.parse({
                    ...baseQuestion,
                    type: 'single_choice',
                    singleChoiceOptions: question.answers.map((answer) => answer.text),
                    singleChoiceCorrect: question.answers.find((answer) => answer.isCorrect)?.text ?? '',
                });
                return parsedQuestions.push(parsedQuestion);
            } else if (question.type === 'multiple_choice') {
                const parsedQuestion: parsedMultipleChoiceQuestion = MultipleChoiceQuestionSchema.parse({
                    ...baseQuestion,
                    type: 'multiple_choice',
                    multipleChoiceOptions: question.answers.map((answer) => answer.text),
                    multipleChoiceCorrect: question.answers.filter((answer) => answer.isCorrect).map((answer) => answer.text),
                });
                return parsedQuestions.push(parsedQuestion);
            } else {
                const parsedQuestion: parsedOpenEndedQuestion = OpenEndedQuestionSchema.parse({
                    ...baseQuestion,
                    type: 'open_ended',
                    openEndedAnswerKey: question.correctAnswer,
                });
                return parsedQuestions.push(parsedQuestion);
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errors: parsedQuestionError[] = error.issues.map((issue) => ({
                    questionId: question.id,
                    path: issue.path.join('.'),
                    message: issue.message,
                }));
                return parseQuestionErrors.push(errors);
            }
        }

        unknownError = true;
    });

    if (unknownError) {
        return undefined;
    }

    if (parseQuestionErrors.length) {
        return {
            success: false,
            errors: parseQuestionErrors,
        };
    }

    return {
        success: true,
        data: parsedQuestions,
    };
}

type supabaseData = {
    id: string;
    path: string;
    fullPath: string;
} | null;

type uploadSuccess = {
    success: true;
    id: string;
    path: string;
}

type uploadFail = {
    success: false;
    id: string;
}
type uploadedResult = uploadSuccess | uploadFail;

type uploadImagesResult = {
    success: true;
    uploaded: uploadSuccess[];
} | {
    success: false;
    ids: string[];
}

async function uploadImages(questions: Question[]): Promise<uploadImagesResult> {
    const uploads: upload[] = questions.reduce((acc, question) => {
        if (question.image !== null) {
            acc.push({
                id: question.id,
                file: question.image,
            });
        }

        return acc;
    }, [] as upload[]);

    const uploaded: uploadedResult[] = await Promise.all(uploads.map(async (upload) => {
        const { data, error }: { data: supabaseData , error: unknown} = await supabase.storage.from('quizz').upload(uuidv4(), upload.file);

        if (error || data === null) {
            return {
                success: false,
                id: upload.id,
            };
        }

        return {
            success: true,
            id: upload.id,
            path: data.path,
        };
    }));

    const failUpload: string[] = uploaded.filter((upload) => !upload.success).map((upload) => upload.id);

    if (failUpload.length) {
        const uploadedPaths: string[] = uploaded.filter((upload) => upload.success).map((upload) => upload.path);
        await supabase.storage.from('quizz').remove(uploadedPaths);

        return {
            success: false,
            ids: failUpload,
        };
    }

    return {
        success: true,
        uploaded: uploaded as uploadSuccess[],
    };
}
