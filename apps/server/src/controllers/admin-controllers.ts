import {
    deleteAllUnverifiedUsers,
    getAllUsers,
    getAllVerifiedUsers,
} from '../services/admin-services';
import { createHandler } from '../utils/create';
import { BackendError } from '../utils/errors';

export const handleGetAllVerifiedUsers = createHandler(async (_req, res) => {
    const users = await getAllVerifiedUsers();
    res.status(200).json({
        users,
    });
});

export const handleGetAllUsers = createHandler(async (_req, res) => {
    const users = await getAllUsers();

    if (users.length === 0) {
        throw new BackendError('NOT_FOUND', {
            message: 'No users found',
        });
    }

    res.status(200).json({
        users: users,
        success: true,
    });
});

export const handleDeleteAllUnverifiedUsers = createHandler(
    async (_req, res) => {
        const unverfiedUsersCount = await deleteAllUnverifiedUsers();
        res.status(200).json({
            message: `${unverfiedUsersCount} unverified users deleted successfully`,
        });
    },
);
