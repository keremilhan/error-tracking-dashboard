import { Sidebar } from '.';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <main className="flex-col sm:flex-row flex h-full w-full">
            <Sidebar />
            <section className="h-full w-full p-5 mb-5 sm:p-10 flex justify-center align-center overflow-auto">
                <Outlet />
            </section>
        </main>
    );
};

export default Layout;
