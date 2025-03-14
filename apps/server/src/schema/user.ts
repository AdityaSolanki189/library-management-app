import type { InferSelectModel } from 'drizzle-orm';
import {
    boolean,
    integer,
    pgTable,
    text,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const users = pgTable('users', {
    id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
    fullName: varchar('fullName', { length: 255 }).notNull(),
    email: text('email').notNull().unique(),
    isAdmin: boolean('is_admin').notNull().default(false),
    password: text('password').notNull(),
    isVerified: boolean('is_verified').notNull().default(false),
    salt: text('salt').notNull(),
    code: text('code').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    universityId: integer('university_id').notNull().unique(),
    universityCard: text('university_card').notNull(),
});

export const selectUserSchema = createSelectSchema(users, {
    email: (schema) =>
        schema.email.email().regex(/^([\w.%-]+@[a-z0-9.-]+\.[a-z]{2,6})*$/i),
});

export const verifyUserSchema = z.object({
    email: selectUserSchema.shape.email,
    code: selectUserSchema.shape.code,
});

export const deleteUserSchema = z.object({
    body: selectUserSchema.pick({
        email: true,
    }),
});

export const loginSchema = z.object({
    body: selectUserSchema.pick({
        email: true,
        password: true,
    }),
});

export const addUserSchema = z.object({
    body: selectUserSchema.pick({
        fullName: true,
        email: true,
        password: true,
        universityId: true,
        universityCard: true,
    }),
});

export const updateUserSchema = z.object({
    body: selectUserSchema
        .pick({
            fullName: true,
            email: true,
            password: true,
        })
        .partial(),
});

export const newUserSchema = z.object({
    body: selectUserSchema.pick({
        fullName: true,
        email: true,
        password: true,
        universityId: true,
        universityCard: true,
    }),
});

export type User = InferSelectModel<typeof users>;
export type NewUser = z.infer<typeof newUserSchema>['body'];
export type UpdateUser = z.infer<typeof updateUserSchema>['body'];
