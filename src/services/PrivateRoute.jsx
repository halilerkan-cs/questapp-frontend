import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

const PrivateRoute = () => {
  const user = useAuth();
  if (user.userId === null) return <Navigate to="/auth/login" />;
  return <Outlet />;
};

export default PrivateRoute;
