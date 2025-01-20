import { InferSelectModel } from 'drizzle-orm';
import {
    integer,
    pgTable,
    text,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';

export const books = pgTable('books', {
    id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
    title: varchar('title', { length: 255 }).notNull(),
    author: varchar('author', { length: 255 }).notNull(),
    genre: text('genre').notNull(),
    rating: integer('rating').notNull(),
    coverUrl: text('cover_url').notNull(),
    coverColor: varchar('cover_color', { length: 7 }).notNull(),
    description: text('description').notNull(),
    totalCopies: integer('total_copies').notNull().default(1),
    availableCopies: integer('available_copies').notNull().default(0),
    videoUrl: text('video_url').notNull(),
    summary: varchar('summary').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export type Book = InferSelectModel<typeof books>;
