import { ReactNode } from 'react';

import { getUser } from '../../actions/user';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

const Layout = async ({ children }: { children: ReactNode }) => {
    const user = await getUser();

    return (
        <main className="flex min-h-screen w-full flex-row bg-pattern bg-cover bg-top bg-dark-200 px-5 xs:px-10 md:px-16">
            <Sidebar user={user!} />

            <div className="admin-container">
                <Header user={user!} />
                {children}
            </div>
        </main>
    );
};
export default Layout;
