import type { Router } from 'express';
import {
    handleCreateBook,
    handleDeleteBook,
    handleGetAllBooks,
    handleGetBookById,
    handleGetLatestBooks,
    handleUpdateBookById,
} from '../controllers/book-controllers';
import { authenticate } from '../middlewares/auth';
import { createRouter } from '../utils/create';

export default createRouter((router: Router) => {
    router.get('/', authenticate(), handleGetAllBooks);
    router.post(
        '/create',
        authenticate({
            verifyAdmin: true,
        }),
        handleCreateBook,
    );
    router.get('/latest', authenticate(), handleGetLatestBooks);
    router.get('/:id', authenticate(), handleGetBookById);
    router.patch(
        '/:id',
        authenticate({
            verifyAdmin: true,
        }),
        handleUpdateBookById,
    );
    router.delete(
        '/:id',
        authenticate({ verifyAdmin: true }),
        handleDeleteBook,
    );
});
