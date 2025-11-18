// Frontend/src/components/Common/Navbar.jsx
// (PJ 1 - GATEKEEPER) - Navbar dengan logika Auth

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Mengakses data auth
import axiosClient from '../../api/axiosClient'; // Untuk panggil endpoint logout
import Button from './button'; 

export default function Navbar() {
  // Ambil user, token, dan fungsi logout dari AuthContext
  const { user, clearAuthData } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Panggil endpoint logout di Backend (yang membatalkan token/cookie)
      await axiosClient.post('/logout');
    } catch (e) {
      console.error('Gagal logout di backend:', e);
    } finally {
      // Hapus data Auth di Frontend
      clearAuthData();
      navigate('/login'); // Arahkan ke halaman login
    }
  };
  
  // Tentukan rute navigasi utama
  const navLinks = [
      { to: '/', label: 'Event' },
      // Tampilkan "Agenda Saya" hanya jika user sudah login
      ...(user ? [{ to: '/agenda-saya', label: 'Agenda Saya' }] : []),
  ];

  return (
    // Navbar menggunakan background putih bersih (Opsi 2)
    <nav className="bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Brand */}
          <Link to="/" className="flex-shrink-0">
            <span className="text-2xl font-bold text-secondary">
              Unila<span className="text-primary">Fest</span>
            </span>
          </Link>

          {/* Link Navigasi Utama */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navLinks.map((link) => (
                  <Link
                      key={link.to}
                      to={link.to}
                      // Gunakan kelas Amber/Primary untuk link aktif atau hover
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-secondary hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors"
                  >
                      {link.label}
                  </Link>
              ))}
          </div>

          {/* Area Akun dan Auth */}
          <div className="flex items-center space-x-4">
            {user ? (
              // --- TAMPILAN JIKA SUDAH LOGIN ---
              <div className="flex items-center space-x-4">
                {/* Nama Pengguna / Status Akun */}
                <span className="text-sm font-medium text-secondary">
                  <Link 
                    to={user.peran === 'Admin' ? '/admin/dashboard' : '/'} 
                    className='font-bold text-primary hover:underline'
                  >
                    {user.nama}
                  </Link>
                </span>
                
                {/* Tombol Logout */}
                <Button onClick={handleLogout} variant="light" className="text-sm text-secondary border border-gray-300">
                  Logout
                </Button>
              </div>
            ) : (
              // --- TAMPILAN JIKA BELUM LOGIN ---
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-sm font-medium text-secondary hover:text-primary transition-colors">
                  Login
                </Link>
                <Button to="/register" as={Link} variant="primary">
                  Daftar
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}