import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { getUser } from '../../actions/user';
import Header from '../../components/Header';
import ClientToast from '../../components/ClientToast';

const RootLayout = async ({ children }: { children: ReactNode }) => {
    return (
        <main className="root-container ">
            <div className="mx-auto min-h-screen w-full">
                <Header />
                {/* <ClientToast error={error} /> */}
                <div className="mt-16 pb-20">{children}</div>
            </div>
        </main>
    );
};

export default RootLayout;
