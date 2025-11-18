// Frontend/src/pages/LoginPage.jsx
// (Wilayah PJ 2, dikerjakan PJ 1 untuk unblock)

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <-- Hook Global State kita
import axiosClient from '../api/axiosClient'; // <-- Klien API kita

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
      // ================================================================
      // PERBAIKAN DI SINI: Key harus 'password', bukan 'kata_sandi'
      // Backend (Validator) mengharapkan key bernama 'password'
      // ================================================================
      const response = await axiosClient.post('/login', {
        email: email,
        password: password, // <-- INI PERBAIKANNYA (sebelumnya: kata_sandi: password)
      });

      // 2. Jika sukses, simpan data ke Global State & localStorage
      // Pastikan response.data memiliki 'user' dan 'access_token'
      const user = response.data.user;
      const token = response.data.access_token; // Pastikan key-nya 'access_token'

      if (user && token) {
        setAuthData(user, token);

        // 3. Cek Peran (INI PENTING UNTUK ANDA, PJ 1)
        if (user.peran === 'Admin') {
          // Jika Admin, lempar ke Dashboard Admin
          navigate('/admin/dashboard');
        } else {
          // Jika User biasa, lempar ke Homepage
          navigate('/');
        }
      } else {
         setError('Respon login tidak valid.');
      }

    } catch (err) {
      // 4. Jika gagal
      if (err.response && (err.response.status === 401 || err.response.status === 422)) {
        // Ambil pesan error dari backend
        setError(err.response.data.message || 'Email atau password salah.');
      } else {
        setError('Terjadi kesalahan jaringan. Coba lagi nanti.');
        console.error("Login error:", err); // Tampilkan error di console
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-unila-light">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-center text-3xl font-bold text-unila-deep">
          Login ke UnilaFest
        </h2>
        
        {/* Formulir Login */}
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          
          {/* Menampilkan error jika ada */}
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          )}

          {/* Email */}
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-unila focus:outline-none focus:ring-unila sm:text-sm"
              placeholder="Alamat Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          {/* Password */}
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-unila focus:outline-none focus:ring-unila sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Tombol Login */}
          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-unila px-4 py-2 text-sm font-medium text-white hover:bg-unila-dark focus:outline-none focus:ring-2 focus:ring-unila focus:ring-offset-2"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Belum punya akun?{' '}
          <Link to="/register" className="font-medium text-unila hover:text-unila-dark">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}