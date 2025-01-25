import { apiUrl } from '../config';
import { getSession } from '../lib/sessions';

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
            const responseData = await response.json();
            return {
                success: false,
                error: responseData.message,
            };
        }

        const responseData = await response.json();
        return {
            success: responseData.success,
            books: responseData.books,
        };
    } catch (error: any) {
        console.error('Error fetching latest books:', error);
        return {
            success: false,
            error: error.message,
        };
    }
}

export const getBookById = async (bookId: string) => {
    const session = await getSession();
    try {
        const response = await fetch(`${apiUrl}/api/book/${bookId}`, {
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
        console.log(responseData);
        return {
            success: responseData.success,
            book: responseData.book,
        };
    } catch (error: any) {
        console.error('Failed to get book by id:', error);
        return {
            success: false,
            error: error.message,
        };
    }
};
