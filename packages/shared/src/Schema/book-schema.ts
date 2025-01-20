import { z } from 'zod';

export const addBookSchema = z.object({
    title: z.string().min(3).max(100).nonempty('Title is required'),
    description: z
        .string()
        .min(3)
        .max(1000)
        .nonempty('Description is required'),
    author: z.string().min(2).max(100).nonempty('Author is required'),
    genre: z.string().min(2).max(100).nonempty('Genre is required'),
    rating: z.number().int().min(1).max(10),
    coverUrl: z.string().url().nonempty('Cover URL is required'),
    videoUrl: z.string().url().nonempty('Video URL is required'),
    coverColor: z.string().min(3).max(7).nonempty('Cover Color is required'),
    totalCopies: z.number().int().min(1),
    availableCopies: z.number().int().min(0),
    summary: z.string().min(3).max(1000).nonempty('Summary is required'),
});

export type addBookSchemaPayload = z.infer<typeof addBookSchema>;
