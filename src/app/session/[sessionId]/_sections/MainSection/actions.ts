'use server';

import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import type { QuestionType, QuizSessionVisibility } from '../../../../../../generated';

type questionType = {
    id: number,
    question: string,
    image_url: string | null,
    type: QuestionType,
    time_limit: number,
    max_score: number,
    single_choice_options: string | null,
    single_choice_correct: string | null,
    multiple_choice_options: string | null,
    multiple_choice_correct: string | null,
    open_ended_answer_key: string | null,
}

type resultType = {
    id: number;
    time_limit: number;
    visibility: QuizSessionVisibility;
    password: string | null;
    single_choice: number;
    multiple_choice: number;
    open_ended: number;
    open_time: Date;
    close_time: Date;
    quiz: { questions: questionType[] };
};

export async function startQuizAction(sessionId: number, password: string): Promise<number> {
    try {
        const { userId }: { userId: string | null } = await auth();
        if (!userId) return 400;

        const result: resultType | null = await prisma.quizSession.findUnique({
            where: { id: sessionId },
            select: {
                id: true,
                time_limit: true,
                visibility: true,
                password: true,
                single_choice: true,
                multiple_choice: true,
                open_ended: true,
                open_time: true,
                close_time: true,
                quiz: {
                    select: {
                        questions: {
                            select: {
                                id: true,
                                question: true,
                                image_url: true,
                                type: true,
                                time_limit: true,
                                max_score: true,
                                single_choice_options: true,
                                single_choice_correct: true,
                                multiple_choice_options: true,
                                multiple_choice_correct: true,
                                open_ended_answer_key: true,
                            },
                        },
                    },
                },
            },
        });

        const now: Date = new Date();

        if (!result) return 404;
        if (result.open_time > now || result.close_time < now) return 404;
        if (result.visibility === 'PRIVATE' && password === '') return 422;
        if (result.visibility === 'PRIVATE' && result.password !== password) return 401;

        const singleChoiceQuestions: questionType[] = [];
        const multipleChoiceQuestions: questionType[] = [];
        const openEndedQuestions: questionType[] = [];

        for (const question of result.quiz.questions) {
            if (question.type === 'SINGLE_CHOICE') singleChoiceQuestions.push(question);
            else if (question.type === 'MULTIPLE_CHOICE') multipleChoiceQuestions.push(question);
            else if (question.type === 'OPEN_ENDED') openEndedQuestions.push(question);
        }

        const selectedSingle: questionType[] = pickRandomQuestions<questionType>(singleChoiceQuestions, result.single_choice);
        const selectedMultiple: questionType[] = pickRandomQuestions<questionType>(multipleChoiceQuestions, result.multiple_choice);
        const selectedOpen: questionType[] = pickRandomQuestions<questionType>(openEndedQuestions, result.open_ended);

        const selectedQuestions: questionType[] = [
            ...selectedSingle,
            ...selectedMultiple,
            ...selectedOpen,
        ];

        const maxScore: number = selectedQuestions.reduce((sum, q) => sum + (q.max_score || 0), 0);
        const startTime: Date = new Date();
        const endTime: Date = new Date(startTime.getTime() + (result.time_limit * 60 * 1000));

        await prisma.play.create({
            data: {
                clerk_id: userId,
                quiz_session_id: result.id,
                max_score: maxScore,
                start_time: startTime,
                end_time: endTime,
                play_details: {
                    create: selectedQuestions.map((q) => ({
                        clerk_id: userId,
                        question_id: q.id,
                    })),
                },
            },
        });

        return 200;
    } catch (error) {
        console.log(error);
        return 400;
    }
}

function pickRandomQuestions<T>(questions: T[], n: number): T[] {
    const array: T[] = questions.slice();

    for (let i: number = array.length - 1; i > 0; i --) {
        const rand: number = Math.floor(Math.random() * (i + 1));
        [ array[i], array[rand] ] = [ array[rand], array[i] ];
    }

    return array.slice(0, n);
}
