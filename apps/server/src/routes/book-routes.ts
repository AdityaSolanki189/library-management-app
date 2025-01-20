import type { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { createRouter } from '../utils/create';
import { handleCreateBook, handleGetAllBooks } from '../controllers/book-controllers';

export default createRouter((router: Router) => {
    router.post('/create', authenticate({
        verifyAdmin: true,
    }), handleCreateBook);

    router.get('/', handleGetAllBooks);
});
