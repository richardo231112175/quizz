/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { z } from 'zod/v4';

export function QuizSessionSchema(single_choice: number, multiple_choice: number, open_ended: number) {
    return z.object({
        quiz_id: z.number(),
        title: z.string()
            .min(1, 'Title is required')
            .max(100, 'Title cannot exceed 100 characters'),
        description: z.string()
            .max(1000, 'Description cannot exceed 1000 characters')
            .nullable()
            .transform((val) => val || null),
        image: z.instanceof(File)
            .nullable()
            .refine(
                (file) => file === null || file.type.startsWith('image/'),
                { message: 'Only image files are allowed' }
            )
            .refine(
                (file) => file === null || file.size <= 5 * 1024 * 1024,
                { message: 'Image must not exceed 5MB' }
            ),
        category: z.string()
            .refine((val) => [ 'science', 'history', 'geography', 'technology', 'arts', 'sports', 'music', 'health' ].includes(val), {
                message: 'Invalid category',
            }),
        difficulty: z.string()
            .refine((val) => [ 'Easy', 'Medium', 'Hard' ].includes(val), {
                message: 'Invalid difficulty',
            }),
        time_limit: z.number()
            .min(1, 'Time limit must be at least 1 minutes')
            .max(120, 'Time limit cannot exceed 120 minutes'),
        visibility: z.string()
            .refine((val) => [ 'public', 'private' ].includes(val), {
                message: 'Invalid visibility',
            }),
        password: z.string(),
        single_choice: z.number()
            .min(0, 'Single choice questions must be at least 0')
            .refine((val) => val <= single_choice, {
                message: `Single choice questions cannot exceed ${single_choice}`,
            }),
        multiple_choice: z.number()
            .min(0, 'Multiple choice questions must be at least 0')
            .refine((val) => val <= multiple_choice, {
                message: `Multiple choice questions cannot exceed ${multiple_choice}`,
            }),
        open_ended: z.number()
            .min(0, 'Open ended questions must be at least 0')
            .refine((val) => val <= open_ended, {
                message: `Open ended questions cannot exceed ${open_ended}`,
            }),
        open_time: z.string()
            .min(1, 'Open time is required')
            .refine((val) => {
                const now: Date = new Date();
                const open: Date = new Date(val);
                return open.getTime() > now.getTime();
            }, {
                message: 'Open time must be at least 1 minute from now',
            }),
        close_time: z.string()
            .min(1, 'Close time is required'),
    }).transform((data) => {
        return { ...data, password: data.visibility === 'private' ? data.password : null };
    }).refine((data) => {
        if (data.visibility === 'private') {
            return data.password!.length >= 3;
        }
        return true;
    }, {
        path: [ 'password' ],
        message: 'Password must be at least 3 characters',
    }).refine((data) => {
        if (data.visibility === 'private') {
            return data.password!.length <= 100;
        }
        return true;
    }, {
        path: [ 'password' ],
        message: 'Password cannot exceed 100 characters',
    }).refine((data) => {
        const open: Date = new Date(data.open_time);
        const close: Date = new Date(data.close_time);
        return close.getTime() > open.getTime();
    }, {
        path: [ 'close_time' ],
        message: 'Close time must be after open time',
    }).refine((data) => {
        const open: Date = new Date(data.open_time);
        const close: Date = new Date(data.close_time);
        return close.getTime() >= open.getTime() + 5 * 60 * 1000;
    }, {
        path: [ 'close_time' ],
        message: 'Close time must be at least 5 minutes after open time',
    }).refine((data) => {
        const questions: number = data.single_choice + data.multiple_choice + data.open_ended;
        return questions > 0;
    }, {
        path: [ 'questions' ],
        message: 'At least 1 question is required',
    });
}
