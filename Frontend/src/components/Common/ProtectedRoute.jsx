// Frontend/src/components/Common/ProtectedRoute.jsx
// (PJ 1 - GATEKEEPER)

import { useAuth } from '../../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ adminOnly = false }) {
  const { user, token } = useAuth();

  // 1. Cek apakah user sudah login
  if (!token || !user) {
    // Jika belum, lempar ke halaman login
    return <Navigate to="/login" replace />;
  }

  // 2. Cek apakah rute ini hanya untuk Admin
  if (adminOnly && user.peran !== 'Admin') {
    // Jika user BUKAN admin, lempar ke Homepage
    return <Navigate to="/" replace />;
  }

  // 3. Jika lolos semua, tampilkan halamannya
  return <Outlet />;
}