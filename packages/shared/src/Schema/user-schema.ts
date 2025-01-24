import { z } from 'zod';

export const userSchema = z.object({
    id: z.number().int().min(1),
    fullName: z.string().min(3).max(100).nonempty('Full name is required'),
    email: z.string().email('Invalid email').nonempty('Email is required'),
    isAdmin: z.boolean(),
    isVerified: z.boolean(),
    universityId: z.number().int().min(1),
    universityCard: z
        .string()
        .min(3)
        .max(100)
        .nonempty('University card is required'),
});

export const updateUserSchema = userSchema.partial();

export type updateUserSchemaPayload = z.infer<typeof updateUserSchema>;

export interface User {
    id: string;
    fullName: string;
    email: string;
    isAdmin: boolean;
    isVerified: boolean;
    universityId: number;
    universityCard: string;
    createdAt: string;
}
