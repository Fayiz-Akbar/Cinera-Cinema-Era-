// Frontend/src/pages/LoginPage.jsx

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <-- Hook Global State
import axiosClient from '../api/axiosClient'; // <-- Klien API

export default function LoginPage() {
  // State untuk form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Hook dari Global State dan Router
  const { setAuthData } = useAuth();
  const navigate = useNavigate();

  // Fungsi saat form di-submit
  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Bersihkan error lama

    try {
      // 1. Tembak API login
      // PENTING: Backend (Validator) mengharapkan key 'password'
      const response = await axiosClient.post('/login', {
        email: email,
        password: password, // <-- SUDAH DIPERBAIKI (sebelumnya: kata_sandi)
      });
      
      const user = response.data.user;
      const token = response.data.access_token;

      if (user && token) {
        setAuthData(user, token);

        // 3. Cek Peran (Admin vs User)
        if (user.peran === 'Admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      } else {
         setError('Respon login tidak valid.');
      }

    } catch (err) {
      // 4. Jika gagal
      console.error("Login error:", err);
      if (err.response && (err.response.status === 401 || err.response.status === 422)) {
        // Ambil pesan error spesifik dari backend
        setError(err.response.data.message || 'Email atau password salah.');
      } else {
        setError('Terjadi kesalahan jaringan. Coba lagi nanti.');
      }
    }
  };

  return (
    // Mengganti background jadi unila-light
    <div className="flex min-h-screen items-center justify-center bg-unila-light">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        {/* Judul menggunakan unila-deep */}
        <h2 className="text-center text-3xl font-bold text-unila-deep">
          Login ke UnilaFest
        </h2>
        
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              // Ganti border & ring jadi unila
              className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-unila focus:outline-none focus:ring-1 focus:ring-unila sm:text-sm"
              placeholder="Alamat Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              // Ganti border & ring jadi unila
              className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-unila focus:outline-none focus:ring-1 focus:ring-unila sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              // Ganti background tombol jadi unila dan hover unila-dark
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-unila px-4 py-2 text-sm font-medium text-white hover:bg-unila-dark focus:outline-none focus:ring-2 focus:ring-unila focus:ring-offset-2 transition-colors"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Belum punya akun?{' '}
          {/* Ganti warna link jadi unila */}
          <Link to="/register" className="font-medium text-unila hover:text-unila-dark">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}