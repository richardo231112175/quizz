'use server';

import { GoogleGenAI, Type, type GenerateContentConfig, type ContentListUnion, type GenerateContentResponse } from '@google/genai';
import prisma from '@/lib/prisma';
import { QuestionType } from '../../../../../../../generated';

type Question = {
    question: { time_limit: number };
    start_time: Date | null;
    end_time: Date | null;
};

export type startQuestionReturn = {
    timeLimit: number;
    endTime: Date;
};

export async function startQuestion(id: number): Promise<startQuestionReturn | void> {
    try {
        const question: Question | null = await prisma.playDetail.findUnique({
            where: { id },
            select: {
                question: {
                    select: { time_limit: true },
                },
                start_time: true,
                end_time: true,
            },
        });

        if (!question) return;

        if (question.end_time) {
            return { timeLimit: question.question.time_limit, endTime: question.end_time };
        }

        const now: Date = new Date();
        const endTime: Date = new Date(now.getTime() + question.question.time_limit * 1000);

        await prisma.playDetail.update({
            where: { id },
            data: {
                start_time: now,
                end_time: endTime,
            },
        });

        return { timeLimit: question.question.time_limit, endTime };
    } catch {}
}

type Question2 = {
    start_time: Date | null;
    end_time: Date | null;
    question: {
        question: string;
        max_score: number;
        time_limit: number;
        type: QuestionType;
        single_choice_correct: string | null;
        multiple_choice_correct: string | null;
        open_ended_answer_key: string | null;
    };
    play: { id: number };
};

type aggregateType = {
    _sum: { score: number | null };
};

export type submitAnswerReturn = {
    timeTaken: number;
    score: number;
    correctAnswer: string | string[];
    isFinished: boolean;
    finishTime?: number;
    playId: number;
};

export async function submitAnswer(id: number, answer: string | string[] | null): Promise<submitAnswerReturn | void> {
    try {
        const question: Question2 | null = await prisma.playDetail.findUnique({
            where: { id },
            select: {
                start_time: true,
                end_time: true,
                question: {
                    select: {
                        question: true,
                        max_score: true,
                        time_limit: true,
                        type: true,
                        single_choice_correct: true,
                        multiple_choice_correct: true,
                        open_ended_answer_key: true,
                    },
                },
                play: {
                    select: { id: true },
                },
            },
        });

        if (!question) return;

        const now: Date = new Date();

        const timeLimit: number = question.question.time_limit;
        const timeTaken: number = Math.min(Math.floor((now.getTime() - question.start_time!.getTime()) / 1000), timeLimit);
        const maxScore: number = question.question.max_score;

        const ratio: number = Math.min(timeTaken / timeLimit, 1);

        let timeFactor: number;
        if (ratio <= 0.4) {
            timeFactor = 1;
        } else if (ratio <= 0.7) {
            timeFactor = 0.8;
        } else if (ratio <= 0.9) {
            timeFactor = 0.6;
        } else {
            timeFactor = 0.4;
        }

        const correctnessScore: number = await checkScoreCorrectness(question, answer);
        const finalScore: number = correctnessScore * timeFactor * maxScore;

        await prisma.playDetail.update({
            where: { id },
            data: {
                answer: answer === null ? null : typeof answer === 'string' ? answer : JSON.stringify(answer),
                score: finalScore,
                time_taken: timeTaken,
            },
        });

        const [
            aggregate,
            playDetailsCount,
            finishedPlayDetailsCount,
        ]: [
            aggregateType,
            number,
            number,
        ] = await Promise.all([
            prisma.playDetail.aggregate({
                _sum: { score: true },
                where: { play_id: question.play.id },
            }),
            prisma.playDetail.count({
                where: { play_id: question.play.id },
            }),
            prisma.playDetail.count({
                where: {
                    play_id: question.play.id,
                    end_time: { not: null },
                },
            }),
        ]);

        const totalScore: number = aggregate._sum.score ?? 0;
        const isFinished: boolean = finishedPlayDetailsCount === playDetailsCount;

        type resultType = {
            id: number;
            start_time: Date;
            end_time: Date;
            finish_time: Date | null;
        }

        const result: resultType | null = await prisma.play.update({
            where: { id: question.play.id },
            data: {
                final_score: totalScore,
                ...(isFinished ? { finish_time: new Date() } : {}),
            },
            select: {
                id: true,
                start_time: true,
                end_time: true,
                finish_time: true,
            },
        });

        const now2: Date = new Date();
        const isFinished2: boolean = isFinished || now2 >= result.end_time || result.finish_time !== null;
        const questionTime: number = Math.floor((result.end_time.getTime() - result.start_time.getTime()) / 1000);
        const finishedTime: number | null = result.finish_time ? Math.floor((result.finish_time.getTime() - result.start_time.getTime()) / 1000) : null;

        return {
            timeTaken: timeTaken,
            score: finalScore,
            correctAnswer: question.question.type === 'SINGLE_CHOICE'
                ? question.question.single_choice_correct!
                : question.question.type === 'MULTIPLE_CHOICE'
                    ? JSON.parse(question.question.multiple_choice_correct!)
                    : question.question.open_ended_answer_key!,
            isFinished: isFinished2,
            finishTime: isFinished2 ? finishedTime !== null ? finishedTime : questionTime : undefined,
            playId: result.id,
        };
    } catch {}
}

async function checkScoreCorrectness(question: Question2, answer: string | string[] | null): Promise<number> {
    switch (question.question.type) {

    case 'SINGLE_CHOICE':
        if (typeof answer === 'string' && answer === question.question.single_choice_correct) {
            return 1;
        }
        return 0;

    case 'MULTIPLE_CHOICE':
        if (Array.isArray(answer)) {
            const correct: string[] = JSON.parse(question.question.multiple_choice_correct || '[]');
            if (!Array.isArray(correct) || correct.length === 0) return 0;

            const correctSet: Set<string> = new Set(correct);
            const answerSet: Set<string> = new Set(answer);

            const totalCorrect: number = correct.filter((option) => answerSet.has(option)).length;
            const totalIncorrect: number = answer.filter((option) => !correctSet.has(option)).length;

            const netCorrect: number = totalCorrect - totalIncorrect;
            const maxPossible: number = correct.length;

            return Math.max(0, Math.min(1, netCorrect / maxPossible));
        }
        return 0;

    case 'OPEN_ENDED':
        if (typeof answer === 'string' && question.question.open_ended_answer_key) {
            const ai: GoogleGenAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

            const model: string = 'gemini-2.5-flash';
            const contents: ContentListUnion = prompt(question.question.question, question.question.open_ended_answer_key, answer);
            const config: GenerateContentConfig = {
                thinkingConfig: {
                    thinkingBudget: -1,
                },
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        score: { type: Type.NUMBER },
                    },
                    required: [ 'score' ],
                    propertyOrdering: [ 'score' ],
                },
            };

            try {
                const response: GenerateContentResponse = await ai.models.generateContent({ model, contents, config });

                if (response.text) {
                    const promptResults: { score: number } = await JSON.parse(response.text);
                    return promptResults.score;
                }
            } catch {}
        }
        return 0;

    default:
        return 0;
    }
}

function prompt(question: string, correctAnswer: string, answer: string): ContentListUnion {
    return [
        {
            role: 'user',
            parts: [
                {
                    text: `
You are a strict but fair evaluator. Compare the following:
- Question: What is the main function of white blood cells?
- Correct Answer: To fight infections
- User Answer: to protect the body against infections and foreign invaders

Your task is to:
- Identify how well the user answer addresses the question.
- Compare it against the correct answer for accuracy, completeness, and relevance.
- Return a single JSON object with only score

Where score is a decimal between 0 and 1 (inclusive), with:
- 1 meaning completely correct,
- 0 meaning completely incorrect,
- Values in between for partial correctness.

Be concise, objective, and base the score only on factual correctness and completeness.
                    `,
                },
            ],
        },
        {
            role: 'model',
            parts: [
                {
                    text: `
Considering the Evaluation**

I'm currently focused on the user's request. My role, as a strict but fair evaluator, is becoming clear.  The question: "What is the main function of white blood cells?" will be compared to the provided correct answer. I am ready to dissect and evaluate.


**Revising the Criteria**

I've revised the scoring criteria to better reflect partial correctness. It seems the user's response adequately addresses the core function. I'm now refining the comparison process to pinpoint the nuances in both answers.  My focus is on ensuring a fair and precise score.


**Evaluating the Response**

I've carefully analyzed the user's answer, considering its completeness and accuracy compared to the correct answer. The user's response, "to protect the body against infections and foreign invaders," broadens the correct answer ("To fight infections") in a way that remains entirely accurate and even improves it by being more comprehensive. This expansion doesn't detract from the core function but strengthens it. I am now finalizing the score.


**Confirming the Scope**

I'm now fully immersed in the comparison phase. After thorough scrutiny, I've confirmed the user's answer is accurate, addressing the core concept of fighting infections. The additional detail, "and foreign invaders," isn't just valid; it's a more encompassing term that strengthens the response. My evaluation is nearing completion.
                    `,
                },
                {
                    text: `
\`\`\`json
{
  "score": 1.0
}
\`\`\`
                    `,
                },
            ],
        },
        {
            role: 'user',
            parts: [
                {
                    text: `
You are a strict but fair evaluator. Compare the following:
- Question: ${question}
- Correct Answer: ${correctAnswer}
- User Answer: ${answer}

Your task is to:
- Identify how well the user answer addresses the question.
- Compare it against the correct answer for accuracy, completeness, and relevance.
- Return a single JSON object with only score

Where score is a decimal between 0 and 1 (inclusive), with:
- 1 meaning completely correct,
- 0 meaning completely incorrect,
- Values in between for partial correctness.

Be concise, objective, and base the score only on factual correctness and completeness.
                    `,
                },
            ],
        },
    ];
}
