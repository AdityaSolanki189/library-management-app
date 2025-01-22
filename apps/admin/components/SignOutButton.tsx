'use client';

import { Button } from '@repo/ui/button';
import logout from '@repo/ui/icons/logout.svg';
import Image from 'next/image';
import { signout } from '../actions/auth';
import { type FC } from 'react';

const SignOutButton: FC = () => {
    const handleOnSignOut = async () => {
        await signout();
    };

    return (
        <Button onClick={handleOnSignOut}>
            <div className="link">
                <div className="relative size-5">
                    <Image
                        src={logout}
                        alt="icon"
                        fill
                        className="object-contain"
                    />
                </div>

                <p className="text-dark">Logout</p>
            </div>
        </Button>
    );
};

export default SignOutButton;
