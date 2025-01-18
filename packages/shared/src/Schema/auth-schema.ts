import { z } from "zod";

//New Client Auth
export const signUpSchema = z.object({
    fullName: z.string().min(3),
    email: z.string().email(),
    universityId: z.coerce.number(),
    universityCard: z.string().nonempty('University Card is required'),
    password: z.string().min(8),
});
export type signInSchemaPayload = z.infer<typeof signInSchema>;

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});
export type signUpSchemaPayload = z.infer<typeof signUpSchema>;

export const SessionPayload = z.object({
    accessToken: z.string(),
});

export type SessionPayload = z.infer<typeof SessionPayload>;