'use client';

import AuthForm from '../../../components/AuthForm';
import { signUpSchema } from '@repo/shared';
import { signUpWithCredentials } from '../../../actions/auth';

const Page = () => (
    <AuthForm
        type="SIGN_UP"
        schema={signUpSchema}
        defaultValues={{
            email: '',
            password: '',
            fullName: '',
            universityId: 0,
            universityCard: '',
        }}
        onSubmit={signUpWithCredentials}
    />
);

export default Page;
