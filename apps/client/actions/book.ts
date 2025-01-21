import { apiUrl } from "../config";
import { getSession } from "../lib/sessions";

export async function getLatestBooks() {
    const session = await getSession();

    if (!session) {
        return null;
    }

    try {
        const response = await fetch(`${apiUrl}/api/book/latest`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch books data.');
        }

        const books = await response.json();
        return books;
    } catch (error) {
        // console.error('Error fetching user data:', error);
        return null;
    }
}

export async function getBookById(id: string) {
    const session = await getSession();

    if (!session) {
        return null;
    }

    try {
        const response = await fetch(`${apiUrl}/api/book/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch book data.');
        }

        const book = await response.json();
        return book;
    } catch (error) {
        // console.error('Error fetching user data:', error);
        return null;
    }
}
