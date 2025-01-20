import type { Router } from 'express';
import adminRoutes from '../routes/admin-routes';
import userRoutes from '../routes/user-routes';
import { createRouter } from '../utils/create';
import bookRoutes from './book-routes';

export default createRouter((router: Router) => {
  router.use('/admin', adminRoutes);
  router.use('/user', userRoutes);
  router.use('/book', bookRoutes);
});
