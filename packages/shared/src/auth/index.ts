import { z } from 'zod';
import { type UserRole } from '../users';

export const SIGN_UP_METHODS = ['password', 'google', 'facebook'] as const;
export type SignUpMethod = (typeof SIGN_UP_METHODS)[number];

// Declarations
export interface AuthUser {
    id: string;
    first_name: string;
    last_name: string;
    email_address: string;
    username: string;
    role: UserRole;
    is_email_address_verified: boolean;
}

type SignUpResponse = AuthUser;
type LoginResponse = AuthUser;

export const SignUpWithPasswordSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    username: z.string().toLowerCase(),
    email: z.string().email(),
    password: z.string().min(8).max(255),
});
export type SignUpWithPasswordPayload = z.infer<
    typeof SignUpWithPasswordSchema
>;
export type SignUpWithPasswordResponse = SignUpResponse;

// Login with email and password
export const LoginWithEmailPasswordSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(255),
});
export type LoginWithEmailPasswordPayload = z.infer<
    typeof LoginWithEmailPasswordSchema
>;
export type LoginWithEmailPasswordResponse = LoginResponse;

// Login with username and password
export const LoginWithUsernamePasswordSchema = z.object({
    username: z.string(),
    password: z.string().min(8).max(255),
});
export type LoginWithUsernamePasswordPayload = z.infer<
    typeof LoginWithUsernamePasswordSchema
>;
export type LoginWithUsernamePasswordResponse = LoginResponse;

// Forgot password
export const ForgotPasswordSchema = z.object({
    email: z.string().email(),
});
export type ForgotPasswordPayload = z.infer<typeof ForgotPasswordSchema>;
export type ForgotPasswordResponse = true;

// Reset password
export const ResetPasswordSchema = z.object({
    token: z.string(),
    password: z.string().min(8).max(255),
    passwordAgain: z.string().min(8).max(255),
});
export type ResetPasswordPayload = z.infer<typeof ResetPasswordSchema>;
export type ResetPasswordResponse = boolean;

// Send verify email
export const SendVerifyEmailTokenSchema = z.object({
    email_address: z.string(),
});
export type SendVerifyEmailTokenPayload = z.infer<
    typeof SendVerifyEmailTokenSchema
>;
export type SendVerifyEmailTokenResponse = true;

// Verify email
export const VerifyEmailSchema = z.object({
    token: z.string(),
});
export type VerifyEmailPayload = z.infer<typeof VerifyEmailSchema>;
export type VerifyEmailResponse = boolean;

//New Client Auth
export const signUpSchema = z.object({
    fullName: z.string().min(3),
    email: z.string().email(),
    universityId: z.coerce.number(),
    universityCard: z.string().nonempty('University Card is required'),
    password: z.string().min(8),
});

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export const bookSchema = z.object({
    title: z.string().trim().min(2).max(100),
    description: z.string().trim().min(10).max(1000),
    author: z.string().trim().min(2).max(100),
    genre: z.string().trim().min(2).max(50),
    rating: z.coerce.number().min(1).max(5),
    totalCopies: z.coerce.number().int().positive().lte(10000),
    coverUrl: z.string().nonempty(),
    coverColor: z
        .string()
        .trim()
        .regex(/^#[0-9A-F]{6}$/i),
    videoUrl: z.string().nonempty(),
    summary: z.string().trim().min(10),
});
