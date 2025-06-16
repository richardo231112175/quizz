/* eslint-disable @typescript-eslint/typedef */
import { z } from 'zod/v4';

const QuestionSchema = z.object({
    question: z.string()
        .min(1, 'Question is required')
        .max(1000, 'Question cannot exceed 1000 characters'),
    image: z.instanceof(File)
        .nullable()
        .refine(
            (file) => file === null || file.type.startsWith('image/'),
            { message: 'Only image files are allowed' }
        )
        .refine(
            (file) => file === null || file.size <= 2 * 1024 * 1024,
            { message: 'Image must not exceed 2MB' }
        ),
    timeLimit: z.number()
        .min(5, 'Time limit must be at least 5 seconds')
        .max(300, 'Time limit cannot exceed 300 seconds'),
    maxScore: z.number()
        .min(1, 'Max score must be at least 1')
        .max(100, 'Max score cannot exceed 100'),
});

export const SingleChoiceQuestionSchema = QuestionSchema.extend({
    type: z.literal('single_choice'),
    singleChoiceOptions: z.array(z.string().min(1, 'Answer is required'))
        .min(2, 'At least 2 options are required')
        .max(10, 'At most 10 options are allowed'),
    singleChoiceCorrect: z.string(),
}).refine((data) => {
    return data.singleChoiceOptions.includes(data.singleChoiceCorrect);
}, {
    message: 'Correct answer is not valid',
    path: [ 'singleChoiceCorrect' ],
});

export const MultipleChoiceQuestionSchema = QuestionSchema.extend({
    type: z.literal('multiple_choice'),
    multipleChoiceOptions: z.array(z.string().min(1, 'Answer is required'))
        .min(2, 'At least 2 options are required')
        .max(10, 'At most 10 options are allowed'),
    multipleChoiceCorrect: z.array(z.string()),
}).refine((data) => {
    return data.multipleChoiceCorrect.every((choice) => data.multipleChoiceOptions.includes(choice));
}, {
    message: 'Correct answers are not valid',
    path: [ 'multipleChoiceCorrect' ],
}).refine((data) => {
    return !!data.multipleChoiceCorrect.length;
}, {
    message: 'At least 1 correct answer is required',
    path: [ 'multipleChoiceCorrect' ],
});

export const OpenEndedQuestionSchema = QuestionSchema.extend({
    type: z.literal('open_ended'),
    openEndedAnswerKey: z.string()
        .min(1, 'Answer key is required'),
});
