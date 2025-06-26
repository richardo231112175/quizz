/* eslint-disable @typescript-eslint/typedef */
import { z } from 'zod/v4';

export const QuizSchema = z.object({
    title: z.string()
        .min(1, 'Title is required')
        .max(100, 'Title cannot exceed 100 characters'),
    description: z.string()
        .max(1000, 'Description cannot exceed 1000 characters')
        .nullable()
        .transform((val) => val || null),
});
