import { APP } from '@repo/shared/src';
import * as React from 'react';

interface VerifyEmailEmailTemplateProps {
    firstName: string;
    url: string;
    firstTime: boolean;
}

export const VerifyEmailEmailTemplate: React.FC<
    Readonly<VerifyEmailEmailTemplateProps>
> = ({ firstName, url }) => {
    return (
        <div>
            <h1>{`Hi ${firstName},`}</h1>
            <p>{`Click the link below to verify your account.`}</p>

            <p>{url}</p>

            <p>{`If you weren't expecting this email, please ignore it.`}</p>

            <p>
                {'Thanks,'}
                <br />
                {APP.TITLE}
            </p>
        </div>
    );
};
