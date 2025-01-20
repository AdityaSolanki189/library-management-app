import { addBook, checkBookExistence } from '../services/book-services';
import { createHandler } from '../utils/create';
import { addBookSchema } from '@repo/shared/schema';
import { BackendError } from '../utils/errors';

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
