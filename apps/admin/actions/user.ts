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

        const user: User = await response.json();
        
        return user;
    } catch (error) {
        // console.error('Error fetching user data:', error);
        return null;
    }
}

export interface User {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    isVerified: boolean;
    createdAt: string;
}

