'use server';

import {
    signInSchema,
    signInSchemaPayload,
    signUpSchema,
    signUpSchemaPayload,
} from '@repo/shared/schema';
import { redirect } from 'next/navigation';
import { apiUrl } from '../config';
import { createSession, deleteSession, isValidToken } from '../lib/sessions';

export const signUpWithCredentials = async (params: signUpSchemaPayload) => {
    const { fullName, email, universityId, universityCard, password } = params;

    //Validate the schema
    const verify = signUpSchema.parse(params);

    if (!verify) {
        throw new Error('Invalid schema');
    }

    //Send the request
    const response = await fetch(`${apiUrl}/api/user/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fullName,
            email,
            universityId,
            universityCard,
            password,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to sign up');
    }

    return response.json();
};

export const signInWithCredentials = async (params: signInSchemaPayload) => {
    const { email, password } = params;

    await validateSchema(params);

    const response = await sendSignInRequest(email, password);

    const result = await handleSignInResponse(response);

    return result;
};

const validateSchema = (params: signInSchemaPayload) => {
    const verify = signInSchema.parse(params);

    if (!verify) {
        throw new Error('Invalid schema');
    }
};

const sendSignInRequest = async (email: string, password: string) => {
    const response = await fetch(`${apiUrl}/api/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to sign in');
    }

    return response;
};

const handleSignInResponse = async (response: Response) => {
    try {
        const { token } = await response.json();

        if (!token) {
            throw new Error('Token not found');
        }

        const isAdmin = await isValidToken(token);

        if(!isAdmin) {
            throw new Error('User is not an Admin');
        }

        await createSession({
            accessToken: token,
        });

        return {
            status: 200,
        }
    } catch (error: any) {
        // throw new Error('Failed to parse JSON response');
        return {
            status: 401,    // Unauthorized
            error: error.message,
        };
    }
};

export async function signout() {
    deleteSession();

    redirect('/sign-in');
}
