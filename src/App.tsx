// routes: Home, Explore, Groups list, Group detail, Schedule
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
import './lib/i18n';
import Home from './pages/Home';
import GroupsList from './pages/groups/GroupList';
import Schedule from './pages/groups/Schedule';


export default function App() {
  return (
    <div className="min-h-screen bg-primary-900">
      <Navbar />
      <main className="mx-auto max-w-7xl p-4 sm:p-6 space-y-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />

          <Route
            path="/groups"
            element={
              <ProtectedRoute>
                <GroupsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/groups/:id"
            element={
              <ProtectedRoute>
                <GroupDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/groups/:id/schedule"
            element={
              <ProtectedRoute>
                <Schedule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <Create />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/reset" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Toasts />
    </div>
  );
}