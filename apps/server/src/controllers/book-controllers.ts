import {
    addBook,
    checkBookExistence,
    deleteBook,
    getAllBooks,
    getBookById,
    updateBook,
} from '../services/book-services';
import { createHandler } from '../utils/create';
import { addBookSchema, updateBookSchema } from '@repo/shared/schema';
import { BackendError } from '../utils/errors';
import { get } from 'http';

export const handleCreateBook = createHandler(
    addBookSchema,
    async (_req, res) => {
        const { title, author } = _req.body;

        // Check if book already exists
        const existingBook = await checkBookExistence(title, author);

        if (existingBook.length > 0) {
            throw new BackendError('CONFLICT', {
                message: 'Book already exists',
            });
        }

        // Add book to database
        const newBook = await addBook(_req.body);

        res.status(201).json(newBook);
    },
);

export const handleGetAllBooks = createHandler(async (_req, res) => {
    const allBooks = await getAllBooks();

    res.status(200).json(allBooks);
});

export const handleGetBookById = createHandler(async (_req, res) => {
    const { id } = _req.params;

    const book = await getBookById(id);

    if (!book) {
        throw new BackendError('NOT_FOUND', {
            message: `Book with ID ${id} not found`,
        });
    }

    res.status(200).json(book);
});

export const handleUpdateBookById = createHandler(
    updateBookSchema,
    async (_req, res) => {
        const { id } = _req.params;
        const updateFields = _req.body;

        if (Object.keys(updateFields).length === 0) {
            throw new BackendError('BAD_REQUEST', {
                message: 'No fields provided for update',
            });
        }

        if (updateFields.title && updateFields.author) {
            const existingBook = await checkBookExistence(
                updateFields.title,
                updateFields.author,
            );

            if (existingBook.length > 0 && existingBook[0].id !== id) {
                throw new BackendError('CONFLICT', {
                    message:
                        'Another book with the same title and author already exists',
                });
            }
        }

        const updatedBook = await updateBook(id, updateFields);

        if (updatedBook.length === 0) {
            throw new BackendError('NOT_FOUND', {
                message: `Book with ID ${id} not found`,
            });
        }

        res.status(200).json({
            message: 'Book updated successfully',
            book: updateBook,
            success: true,
        });
    },
);

export const handleDeleteBook = createHandler(async (_req, res) => {
    const { id } = _req.params;

    const deletedBook = await deleteBook(id);

    if (deleteBook.length === 0) {
        throw new BackendError('NOT_FOUND', {
            message: `Book with ID ${id} not found`,
        });
    }

    res.status(200).json({
        message: 'Book deleted successfully',
        book: deletedBook,
        success: true,
    });
});
