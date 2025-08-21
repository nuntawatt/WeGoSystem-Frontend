// Purpose: require auth
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({
  authed,
  children
}: {
  authed: boolean;
  children: React.ReactNode;
}) {
  const loc = useLocation();
  if (!authed) return <Navigate to="/auth/signin" state={{ from: loc }} replace />;
  return <>{children}</>;
}