import { Navigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../../services/auth';

export default function PrivateRoute({ children, role }) {
  const user = getCurrentUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to={user.role === 'ADMIN' ? '/admin/dashboard' : '/user/dashboard'} replace />;
  }

  return children;
}