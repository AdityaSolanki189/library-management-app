'use server';

import { apiUrl } from '../config';
import { getSession } from '../lib/sessions';

export async function getUser() {
    const session = await getSession();

    if (!session) {
        return null;
    }

    try {
        const response = await fetch(`${apiUrl}/api/user`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch user data.');
        }

        const user = await response.json();
        return user.user;
    } catch (error) {
        // console.error('Error fetching user data:', error);
        return null;
    }
}

export async function getAllUsers() {
    const session = await getSession();

    try {
        const response = await fetch(`${apiUrl}/api/admin/all-users`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
            },
        });

        if (!response.ok) {
            const responseData = await response.json();
            return { success: false, error: responseData.message };
        }

        const responseData = await response.json();
        return {
            success: responseData.success,
            users: responseData.users,
        };
    } catch (error: any) {
        console.error('Failed to get all users:', error);
        return {
            success: false,
            error: error.message,
        };
    }
}

export async function deleteUserById(userId: string) {
    const session = await getSession();

    try {
        const response = await fetch(`${apiUrl}/api/admin/delete/${userId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
            },
        });

        if (!response.ok) {
            const responseData = await response.json();
            return { success: false, error: responseData.message };
        }

        const responseData = await response.json();
        return {
            userId: responseData.userId,
            success: true,
        };
    } catch (error: any) {
        console.error('Failed to delete user:', error);
        return {
            success: false,
            error: error.message,
        };
    }
}
