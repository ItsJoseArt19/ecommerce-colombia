import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AdminPage from '../pages/AdminPage';

export default function AdminRoutes() {
  const { isAuthenticated, loading, userRole } = useAuth();

  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (userRole !== 'admin') return <Navigate to="/" replace />;

  return (
    <Routes>
      <Route index element={<AdminPage />} />
    </Routes>
  );
}
