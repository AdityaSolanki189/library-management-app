import { render } from '@react-email/render';
import { signInSchema, signUpSchema } from '@repo/shared/schema';
import argon2 from 'argon2';
import { Buffer } from 'node:buffer';
import {
    type User,
    deleteUserSchema,
    updateUserSchema,
    verifyUserSchema,
} from '../schema/user';
import {
    addUser,
    deleteUser,
    getUserByEmail,
    updateUser,
    verifyUser,
} from '../services/user-services';
import { UserVerified } from '../templates/user-verified';
import { createHandler } from '../utils/create';
import { BackendError, getStatusFromErrorCode } from '../utils/errors';
import generateToken from '../utils/jwt';

export const handleUserLogin = createHandler(signInSchema, async (req, res) => {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (!user) throw new BackendError('USER_NOT_FOUND');

    const matchPassword = await argon2.verify(user.password, password, {
        salt: Buffer.from(user.salt, 'hex'),
    });
    if (!matchPassword) throw new BackendError('INVALID_PASSWORD');

    const token = generateToken(user.id, user.isAdmin);
    res.status(200).json({ token });
});

export const handleAddUser = createHandler(signUpSchema, async (req, res) => {
    const user = req.body;

    const existingUser = await getUserByEmail(user.email);

    if (existingUser) {
        throw new BackendError('CONFLICT', {
            message: 'User already exists',
        });
    }

    const { user: addedUser, code } = await addUser(user);

    // const status = await sendVerificationEmail(
    //     process.env.API_BASE_URL!,
    //     addedUser.name,
    //     addedUser.email,
    //     code,
    // );

    // if (status !== 200) {
    //     // await deleteUser(addedUser.email);
    //     throw new BackendError('INTERNAL_ERROR', {
    //         message: 'Failed to signup user',
    //     });
    // }

    res.status(201).json(addedUser);
});

export const handleVerifyUser = createHandler(
    verifyUserSchema,
    async (req, res) => {
        try {
            const { email, code } = req.body;
            await verifyUser(email, code);
            const template = render(
                UserVerified({
                    status: 'verified',
                    message: 'User verified successfully',
                }),
            );
            res.status(200).send(template);
        } catch (err) {
            if (err instanceof BackendError) {
                const template = render(
                    UserVerified({
                        status: 'invalid',
                        message: err.message,
                        error: 'Invalid Request',
                    }),
                );
                res.status(getStatusFromErrorCode(err.code)).send(template);
                return;
            }
            throw err;
        }
    },
);

export const handleDeleteUser = createHandler(
    deleteUserSchema,
    async (req, res) => {
        const { email } = req.body;

        const { user } = res.locals as { user: User };

        if (user.email !== email && !user.isAdmin) {
            throw new BackendError('UNAUTHORIZED', {
                message: 'You are not authorized to delete this user',
            });
        }

        const deletedUser = await deleteUser(email);

        res.status(200).json({
            user: deletedUser,
        });
    },
);

export const handleGetUser = createHandler(async (_req, res) => {
    const { user } = res.locals as { user: User };

    res.status(200).json({
        user: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            isAdmin: user.isAdmin,
            isVerified: user.isVerified,
            createdAt: user.createdAt,
        },
    });
});

export const handleUpdateUser = createHandler(
    updateUserSchema,
    async (req, res) => {
        const { user } = res.locals as { user: User };

        const { fullName, password, email } = req.body;

        const updatedUser = await updateUser(user, {
            fullName,
            password,
            email,
        });

        res.status(200).json({
            user: updatedUser,
        });
    },
);
