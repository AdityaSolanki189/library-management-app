"use server";

import {
    signInSchema,
    signInSchemaPayload,
    signUpSchema,
    signUpSchemaPayload,
} from '@repo/shared/schema';
import { apiUrl } from '../config';
import { cookies } from 'next/headers';
import { stat } from 'fs';

const cookieConfig = {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
    domain: process.env.HOST ?? 'localhost',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
}

export const signUpWithCredentials = async (params: signUpSchemaPayload) => {
    const { fullName, email, universityId, universityCard, password } = params;

    console.log(params);

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

    await handleSignInResponse(response);

    return {
        status: response.status,
    };
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

        const cookieStorage = await cookies();
        cookieStorage.set('jwt', token, cookieConfig);
    } catch (error) {
        throw new Error('Failed to parse JSON response');
    }
};
