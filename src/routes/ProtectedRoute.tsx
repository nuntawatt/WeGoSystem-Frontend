// apps/frontend/src/routes/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const loc = useLocation();

  if (loading) {
    return (
      <section className="container-app py-8">
        <div className="card p-4">Loading…</div>
      </section>
    );
  }

  if (!user) {
    return <Navigate to="/auth/signin" replace state={{ from: loc }} />;
  }

  return <>{children}</>;
}
