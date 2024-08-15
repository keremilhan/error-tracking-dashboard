import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = () => {
    const {
        authState: { accessToken },
    } = useAuth();
    return accessToken ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoute;
