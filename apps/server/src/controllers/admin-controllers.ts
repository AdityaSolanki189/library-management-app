import {
    deleteAllUnverifiedUsers,
    getAllUsers,
    getAllVerifiedUsers,
} from '../services/admin-services';
import { deleteUserById } from '../services/user-services';
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
        const unverifiedUsersCount = await deleteAllUnverifiedUsers();
        res.status(200).json({
            message: `${unverifiedUsersCount} unverified users deleted successfully`,
        });
    },
);

export const handleDeleteUserById = createHandler(async (req, res) => {
    const { userId } = req.params;
    const user = await deleteUserById(userId!);

    if (!user) {
        throw new BackendError('NOT_FOUND', {
            message: 'User not found',
        });
    }

    res.status(200).json({
        userId: user.id,
        message: 'User deleted successfully',
    });
});
