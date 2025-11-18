// Frontend/src/components/Common/AdminLayout.jsx
// (PJ 1 - GATEKEEPER) - Tampilan Admin Baru (Dark Sidebar)

import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axiosClient from '../../api/axiosClient';

// Komponen helper untuk NavLink agar bisa mendeteksi 'active'
const StyledNavLink = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block rounded-md px-4 py-3 text-sm transition-colors duration-150 ${
        isActive
          ? 'bg-primary-hover/50 text-white shadow-inner font-bold' // Aktif: Warna Amber redup + Teks Putih
          : 'text-gray-300 hover:bg-secondary/70' // Tidak aktif: Abu-abu muda + Hover gelap
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
    // Latar belakang utama (Bg konten) lebih terang
    <div className="flex h-screen bg-gray-100">
      
      {/* Sidebar Navigasi (Warna Secondary: Dark Slate) */}
      <aside className="w-64 flex-shrink-0 bg-secondary shadow-2xl border-r border-primary/20">
        <div className="flex h-full flex-col p-6">
          {/* Logo & User */}
          <div className="mb-8 border-b border-primary/30 pb-4">
            <h2 className="text-2xl font-extrabold text-primary">
              Admin<span className='text-white'>Fest</span>
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              {user?.peran || 'Admin'} Panel: {user?.nama || 'Guest'}
            </p>
          </div>
          
          {/* Daftar Link Navigasi */}
          <nav className="flex-1 space-y-2">
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
              className="block w-full rounded-md px-4 py-3 text-left text-sm font-medium text-red-400 hover:bg-red-900/50 transition-colors mt-4"
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