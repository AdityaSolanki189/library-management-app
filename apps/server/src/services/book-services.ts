import { addBookSchemaPayload } from '@repo/shared/schema';
import { desc, eq } from 'drizzle-orm';
import { books } from '../schema/book';
import { db } from '../utils/db';
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

    if (!newBook) {
        throw new BackendError('INTERNAL_ERROR', {
            message: 'Failed to add book',
        });
    }

    return { book: newBook, success: true };
}

export async function getAllBooks() {
    // Fetch all books, sort by createdAt in descending order
    const allBooks = await db
        .select()
        .from(books)
        .orderBy(desc(books.createdAt));

    if (!allBooks) {
        throw new BackendError('INTERNAL_ERROR', {
            message: 'Failed to fetch books',
        });
    }

    return {
        books: allBooks,
        success: true,
    };
}

export async function getLatestBooks() {
    // Fetch latest 5 books, sort by createdAt in descending order
    const latestBooks = await db
        .select()
        .from(books)
        .orderBy(desc(books.createdAt))
        .limit(5);

    return latestBooks;
}

export async function getBookById(id: string) {
    const book = await db.select().from(books).where(eq(books.id, id)).limit(1);

    if (book.length === 0) {
        throw new BackendError('NOT_FOUND', {
            message: `Book with ID ${id} not found`,
        });
    }

    return {
        book: book[0],
        success: true,
    };
}

export async function updateBook(
    id: string,
    updateFields: Partial<addBookSchemaPayload>,
) {
    const book = await getBookById(id);

    if (!book) {
        throw new BackendError('NOT_FOUND', {
            message: `Book with ID ${id} not found`,
        });
    }

    const updatedBook = await db
        .update(books)
        .set(updateFields)
        .where(eq(books.id, id))
        .returning({
            id: books.id,
            title: books.title,
        });

    return updatedBook;
}

export async function deleteBook(id: string) {
    const book = await getBookById(id);

    if (!book) {
        throw new BackendError('NOT_FOUND', {
            message: `Book with ID ${id} not found`,
        });
    }

    const deletedBook = await db
        .delete(books)
        .where(eq(books.id, id))
        .returning({
            id: books.id,
            title: books.title,
        });

    return deletedBook;
}
