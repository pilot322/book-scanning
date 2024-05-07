import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useScan from '../hooks/useScan';

const RequireNotInSession = () => {
    const { isScanning } = useScan();
    const location = useLocation();

    if (isScanning && location.pathname !== '/scan/session') {
        return <Navigate to="/scan/session" state={location.state || {}} replace />;
    }

    // If user is not in a scanning session but trying to navigate to the session page
    if (!isScanning && location.pathname === '/scan/session') {
        return <Navigate to="/" replace />;
    };

    return <Outlet />;
}

export default RequireNotInSession;