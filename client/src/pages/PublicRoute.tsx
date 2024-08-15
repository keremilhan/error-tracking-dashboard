import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PublicRoute = () => {
    const {
        authState: { accessToken },
    } = useAuth();
    return accessToken ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
