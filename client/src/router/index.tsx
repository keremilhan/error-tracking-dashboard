import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import { Home, Profile, Settings, Error, Dashboard, Auth, PublicRoute, PrivateRoute } from '../pages';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'dashboard',
                element: <PrivateRoute />,
                children: [{ index: true, element: <Dashboard /> }],
            },
            {
                path: 'auth',
                element: <PublicRoute />,
                children: [{ index: true, element: <Auth /> }],
            },
            {
                path: 'profile',
                element: <PrivateRoute />,
                children: [{ index: true, element: <Profile /> }],
            },
            {
                path: 'settings',
                element: <PrivateRoute />,
                children: [{ index: true, element: <Settings /> }],
            },
        ],
    },
]);
