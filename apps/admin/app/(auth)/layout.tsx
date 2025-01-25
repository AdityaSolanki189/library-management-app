import logo from '@repo/ui/icons/logo.svg';
import authLogo from '@repo/ui/images/auth-illustration.png';
import Image from 'next/image';
import { ReactNode } from 'react';

const AuthLayout = async ({ children }: { children: ReactNode }) => {
    return (
        <main className="auth-container">
            <section className="auth-form">
                <div className="auth-box">
                    <div className="flex flex-row gap-3">
                        <Image src={logo} alt="logo" width={37} height={37} />
                        <h1 className="text-2xl font-semibold text-white">
                            BookShelf Admin
                        </h1>
                    </div>

                    <div>{children}</div>
                </div>
            </section>

            <section className="auth-illustration">
                <Image
                    src={authLogo}
                    alt="auth illustration"
                    height={1000}
                    width={1000}
                    className="size-full object-cover"
                />
            </section>
        </main>
    );
};

export default AuthLayout;
