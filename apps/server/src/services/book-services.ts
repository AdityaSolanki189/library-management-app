import { eq } from 'drizzle-orm';
import { Book, books } from '../schema/book';
import { db } from '../utils/db';
import { addBookSchemaPayload } from '@repo/shared/schema';
import { BackendError } from '../utils/errors';

export async function checkBookExistence(title: string, author: string) {
    const existingBook = await db
        .select()
        .from(books)
        .where(eq(books.title, title) && eq(books.author, author))
        .limit(1);

    return existingBook;
}

export async function addBook(book: addBookSchemaPayload) {
    const {
        title,
        description,
        author,
        genre,
        rating,
        coverUrl,
        videoUrl,
        coverColor,
        totalCopies,
        availableCopies,
        summary,
    } = book;

    const [newBook] = await db
        .insert(books)
        .values({
            title,
            description,
            author,
            genre,
            rating,
            coverUrl,
            videoUrl,
            coverColor,
            totalCopies,
            availableCopies,
            summary,
        })
        .returning({
            id: books.id,
            title: books.title,
        });

    if(!newBook) {
        throw new BackendError('INTERNAL_ERROR', {
            message: 'Failed to add book',
        });
    }

    return { book: newBook, success: true };
}
