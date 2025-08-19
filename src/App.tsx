// apps/frontend/src/App.tsx
// Purpose: App shell + routes. Uses ProtectedRoute for private pages.

import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Explore from './pages/Explore';
import GroupDetail from './pages/groups/GroupDetail';
import Create from './pages/Create';
import Profile from './pages/Profile';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import ResetPassword from './pages/auth/ResetPassword';
import ProtectedRoute from './routes/ProtectedRoute';
import Toasts from './components/Toasts';
import { useAuth } from './hooks/useAuth';
import './styles/index.css'; // make sure base styles are loaded
import './lib/i18n';

export default function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-primary-900">
      <Navbar />
      {/* ลดความกว้างให้บาลานซ์ขึ้นเล็กน้อย และปรับ padding */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10 space-y-6">
        <Routes>
          <Route path="/" element={<Explore />} />

          <Route
            path="/groups/:id"
            element={
              <ProtectedRoute authed={!!user}>
                <GroupDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create"
            element={
              <ProtectedRoute authed={!!user}>
                <Create />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute authed={!!user}>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/reset" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Toasts />
    </div>
  );
}
