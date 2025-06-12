'use server';

import { z } from 'zod/v4';
import { QuizSchema } from '@/validations/quiz';
import { SingleChoiceQuestionSchema, MultipleChoiceQuestionSchema, OpenEndedQuestionSchema } from '@/validations/question';
import { type Question } from './hooks';

type parseQuizProps = {
    title: string;
    description: string;
};

export type parsedQuiz = {
    title: string;
    description: string | null;
};

export type parsedQuizError = {
    path: string;
    message: string;
};

export type parseQuizReturn = {
    success: true;
    data: parsedQuiz;
} | {
    success: false;
    errors: parsedQuizError[];
} | undefined;

type questionBase = {
    question: string;
    image: File | null;
    timeLimit: number;
    maxScore: number;
};

export type parsedSingleChoiceQuestion = questionBase & {
    type: 'single_choice';
    singleChoiceOptions: string[];
    singleChoiceCorrect: string;
};

export type parsedMultipleChoiceQuestion = questionBase & {
    type: 'multiple_choice';
    multipleChoiceOptions: string[];
    multipleChoiceCorrect: string[];
};

export type parsedOpenEndedQuestion = questionBase & {
    type: 'open_ended';
    openEndedAnswerKey: string;
};

export type parsedQuestion = parsedSingleChoiceQuestion | parsedMultipleChoiceQuestion | parsedOpenEndedQuestion;

export type parsedQuestionError = {
    questionId: string;
    path: string;
    message: string;
};

export type parseQuestionReturn = {
    success: true;
    data: parsedQuestion[];
} | {
    success: false;
    errors: parsedQuestionError[][];
} | undefined;

export async function parseQuiz({ title, description }: parseQuizProps): Promise<parseQuizReturn> {
    try {
        const quiz: parsedQuiz = QuizSchema.parse({ title, description });

        return {
            success: true,
            data: quiz,
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

export async function parseQuestion(questions: Question[]): Promise<parseQuestionReturn> {
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
