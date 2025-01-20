import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { getUser } from '../../actions/user';
import Header from '../../components/Header';
import ClientToast from '../../components/ClientToast';

const Layout = async ({ children }: { children: ReactNode }) => {
    let error = null;

    const session = await getUser();
    if (!session) {
        error = 'You have been Signed Out.';
        redirect('/sign-in');
    } 

    return (
        <main className="root-container">
            <div className="mx-auto max-w-7xl">
                <Header />
                <ClientToast error={error} />
                <div className="mt-20 pb-20">{children}</div>
            </div>
        </main>
    );
};

export default Layout;
