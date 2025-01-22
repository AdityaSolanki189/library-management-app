import { ReactNode } from 'react';

import { getUser } from '../../actions/user';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import "../styles.css";

const Layout = async ({ children }: { children: ReactNode }) => {
    const user = await getUser();

    return (
        <main className="flex min-h-screen w-full flex-row">
            <Sidebar user={user!} />

            <div className="admin-container">
                <Header user={user!} />
                {children}
            </div>
        </main>
    );
};
export default Layout;
