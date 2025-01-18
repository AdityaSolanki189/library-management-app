import {
    signInSchema,
    signInSchemaPayload,
    signUpSchema,
    signUpSchemaPayload,
} from '@repo/shared';
import { apiUrl } from '../config';

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

    console.log(params);
    //Validate the schema
    const verify = signInSchema.parse(params);

    if (!verify) {
        throw new Error('Invalid schema');
    }

    //Send the request
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

    return response.json();
};
