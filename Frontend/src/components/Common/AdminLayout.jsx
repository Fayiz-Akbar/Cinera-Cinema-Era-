// Frontend/src/components/Common/AdminLayout.jsx
// (PJ 1 - GATEKEEPER)

import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axiosClient from '../../api/axiosClient';

export default function AdminLayout() {
  const { user, clearAuthData } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 1. Tembak API logout di backend
      await axiosClient.post('/logout');
    } catch (e) {
      console.error('Gagal logout di backend:', e);
    } finally {
      // 2. Hapus data di frontend & redirect
      clearAuthData();
      navigate('/login');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Navigasi */}
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
          <p className="text-sm text-gray-400">Welcome, {user?.nama || 'Admin'}</p>
        </div>
        <nav className="mt-4">
          <Link
            to="/admin/dashboard"
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/kategori"
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
          >
            Manajemen Kategori
          </Link>
          {/* (Link Validasi Acara & Penyelenggara akan ditambahkan di sini) */}
          
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-700"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Konten Utama */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* "Jendela" tempat halaman (Kategori, Dashboard) akan muncul */}
        <Outlet />
      </main>
    </div>
  );
}