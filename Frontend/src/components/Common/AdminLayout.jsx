// Frontend/src/components/Common/AdminLayout.jsx
// (PJ 1 - GATEKEEPER) - Tampilan Baru (Light Theme)

import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axiosClient from '../../api/axiosClient';

// Komponen helper untuk NavLink agar bisa mendeteksi 'active'
const StyledNavLink = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block rounded-md px-4 py-2.5 text-sm font-medium ${
        isActive
          ? 'bg-primary-100 text-primary-600'
          : 'text-neutral-500 hover:bg-neutral-100' // <-- GANTI KE INI
      }`
    }
  >
    {children}
  </NavLink>
);

export default function AdminLayout() {
  const { user, clearAuthData } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosClient.post('/logout');
    } catch (e) {
      console.error('Gagal logout di backend:', e);
    } finally {
      clearAuthData();
      navigate('/login');
    }
  };

  return (
    // Latar belakang utama diubah jadi abu-abu muda
    <div className="flex h-screen bg-neutral-100">
      
      {/* Sidebar Navigasi (Putih dengan bayangan) */}
      <aside className="w-64 flex-shrink-0 bg-white shadow-lg">
        <div className="flex h-full flex-col p-4">
          {/* Logo & User */}
          <div>
            <h2 className="text-xl font-bold text-neutral-800">UnilaFest Admin</h2>
            <p className="text-sm text-neutral-500">
              Welcome, {user?.nama || 'Admin'}
            </p>
          </div>
          
          {/* Daftar Link Navigasi */}
          <nav className="mt-8 flex-1 space-y-2">
            <StyledNavLink to="/admin/dashboard">
              Dashboard
            </StyledNavLink>
            <StyledNavLink to="/admin/kategori">
              Manajemen Kategori
            </StyledNavLink>
            <StyledNavLink to="/admin/validasi-penyelenggara">
              Validasi Penyelenggara
            </StyledNavLink>
            <StyledNavLink to="/admin/validasi-acara">
              Validasi Acara
            </StyledNavLink>
          </nav>

          {/* Tombol Logout di bawah */}
          <div>
            <button
              onClick={handleLogout}
              className="block w-full rounded-md px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Konten Utama */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}