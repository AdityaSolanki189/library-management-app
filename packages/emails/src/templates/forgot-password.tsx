import {
    APP,
    FORGOT_PASSWORD_VALIDITY_DURATION_IN_MINUTES,
} from '@repo/shared/src';
import * as React from 'react';

interface ForgotPasswordEmailTemplateProps {
    firstName: string;
    url: string;
}

export const ForgotPasswordEmailTemplate: React.FC<
    Readonly<ForgotPasswordEmailTemplateProps>
> = ({ firstName, url }) => {
    return (
        <div>
            <h1>{`Hi ${firstName},`}</h1>
            <p>
                {`You recently requested to reset your password for your ${APP.TITLE} account.`}
            </p>
            <p>
                <>
                    To reset your password, click <a href={url}>here</a>.
                </>
            </p>
            <p>
                {`If you did not request a password reset, please ignore this email or reply to let us know. This password reset is only valid for the next ${FORGOT_PASSWORD_VALIDITY_DURATION_IN_MINUTES} minutes.`}
            </p>
            <p>{url}</p>

            <p>
                {'Thanks,'}
                <br />
                {APP.TITLE}
            </p>
        </div>
    );
};
