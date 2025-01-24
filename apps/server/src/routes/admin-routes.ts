import type { Router } from 'express';
import {
  handleDeleteAllUnverifiedUsers,
  handleDeleteUserById,
  handleGetAllUsers,
  handleGetAllVerifiedUsers,
} from '../controllers/admin-controllers';
import { authenticate } from '../middlewares/auth';
import { createRouter } from '../utils/create';
import { handleAddUser } from '../controllers/user-controllers';

export default createRouter((router: Router) => {
  router.use(
    authenticate({
      verifyAdmin: true,
    }),
  );

  router.get('/all-users', handleGetAllUsers);
  router.get('/all-verfied-users', handleGetAllVerifiedUsers);
  router.delete('/remove-unverified-users', handleDeleteAllUnverifiedUsers);
  router.delete('/delete/:userId', handleDeleteUserById);

  router.post('/add-user', handleAddUser);
});
