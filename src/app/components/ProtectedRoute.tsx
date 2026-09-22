import { Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  allowedRoles?: ('customer' | 'admin' | 'rider')[];
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  requireAuth = true,
  allowedRoles,
  redirectTo = '/login'
}: ProtectedRouteProps) {
  const { user } = useAuth();

  // Check if authentication is required
  if (requireAuth && !user) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check if user has the required role
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
