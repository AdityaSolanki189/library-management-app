'use client';

import React from 'react';
import AuthForm from '../../../components/AuthForm';
import { signInSchema } from '@repo/shared';
import { signInWithCredentials } from '../../../actions/auth';

const Page = () => (
    <AuthForm
        type="SIGN_IN"
        schema={signInSchema}
        defaultValues={{
            email: '',
            password: '',
        }}
        onSubmit={signInWithCredentials}
    />
);

export default Page;
