import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = () => {
  const { isAuthenticated, isSessionChecking } = useAuth();
  const location = useLocation();

  if (isSessionChecking) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <span className="text-text-secondary text-lg font-medium">
          Loading...
        </span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
