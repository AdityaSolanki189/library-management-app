import type { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { createRouter } from '../utils/create';
import { handleCreateBook } from '../controllers/book-controllers';

export default createRouter((router: Router) => {
    router.use(
        authenticate({
            verifyAdmin: true,
        }),
    );

    router.post('/create', handleCreateBook);
});
