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
      const response = await axiosClient.post('/login', {
        email: email,
        kata_sandi: password,
      });

      // 2. Jika sukses, simpan data ke Global State & localStorage
      const { user, token } = response.data;
      setAuthData(user, token);

      // 3. Cek Peran (INI PENTING UNTUK ANDA, PJ 1)
      if (user.peran === 'Admin') {
        // Jika Admin, lempar ke Dashboard Admin
        navigate('/admin/dashboard');
      } else {
        // Jika User biasa, lempar ke Homepage
        navigate('/');
      }

    } catch (err) {
      // 4. Jika gagal
      if (err.response && err.response.status === 401) {
        setError('Email atau password salah.');
      } else {
        setError('Terjadi kesalahan. Coba lagi nanti.');
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-center text-3xl font-bold text-gray-900">
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
              className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
              className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Tombol Login */}
          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Belum punya akun?{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}