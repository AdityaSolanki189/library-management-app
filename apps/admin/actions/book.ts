import { addBookSchema, addBookSchemaPayload } from '@repo/shared/schema';
import { apiUrl } from '../config';
import { getSession } from '../lib/sessions';

export const createBook = async (params: addBookSchemaPayload) => {
    const {
        title,
        description,
        author,
        genre,
        rating,
        coverUrl,
        videoUrl,
        coverColor,
        totalCopies,
        availableCopies,
        summary,
    } = params;

    // Validate the schema
    const verify = addBookSchema.parse(params);

    if (!verify) {
        throw new Error('Invalid schema');
    }

    const session = await getSession();
    // Send the request
    try {
        const response = await fetch(`${apiUrl}/api/book/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session?.accessToken}`,
            },
            body: JSON.stringify({
                title,
                description,
                author,
                genre,
                rating,
                coverUrl,
                videoUrl,
                coverColor,
                totalCopies,
                availableCopies,
                summary,
            }),
        });

        if (!response.ok) {
            const responseData = await response.json();
            return { success: false, error: responseData.message };
        }
        const responseData = await response.json();
        return {
            success: responseData.success,
        };
    } catch (error: any) {
        console.error('Failed to create book:', error);
        return {
            success: false,
            error: error.message,
        };
    }
};

export const getAllBooks = async () => {
    const session = await getSession();
    try {
        const response = await fetch(`${apiUrl}/api/book`, {
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
            books: responseData.books,
        };
    } catch (error: any) {
        console.error('Failed to get all books:', error);
        return {
            success: false,
            error: error.message,
        };
    }
};

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

export const deleteBookById = async (bookId: string) => {
    const session = await getSession();
    try {
        const response = await fetch(`${apiUrl}/api/book/${bookId}`, {
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
            success: responseData.success,
        };
    } catch (error: any) {
        console.error('Failed to delete book:', error);
        return {
            success: false,
            error: error.message,
        };
    }
};
