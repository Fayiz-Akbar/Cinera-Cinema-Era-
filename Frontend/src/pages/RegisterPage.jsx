// Frontend/src/pages/RegisterPage.jsx
// (WILAYAH PJ 2) - UI Sesuai Tema Opsi 2 (Golden Siger)

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; // Tidak diperlukan saat register
import axiosClient from '../api/axiosClient'; // <-- Klien API

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
    setSuccess(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Cek konfirmasi password di sisi klien
    if (formData.password !== formData.password_confirmation) {
        setError('Konfirmasi password tidak cocok.');
        return;
    }

    try {
      // Endpoint register sudah didaftarkan di routes/api.php
      const response = await axiosClient.post('/register', {
        nama: formData.nama,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      });
      
      // Jika registrasi berhasil, biasanya backend Laravel akan mengembalikan data user
      if (response.status === 201 || response.status === 200) {
        setSuccess('Pendaftaran berhasil! Anda akan diarahkan ke halaman login.');
        
        // Arahkan ke halaman login setelah 3 detik
        setTimeout(() => {
            navigate('/login');
        }, 3000);

      } else {
         setError('Respon pendaftaran tidak valid.');
      }

    } catch (err) {
      console.error("Register error:", err);
      if (err.response && err.response.status === 422) {
        // Handle error validasi Laravel
        const errors = err.response.data.errors;
        let errorMessage = 'Terjadi kesalahan validasi: ';

        // Kumpulkan semua pesan error
        for (const key in errors) {
          errorMessage += `${errors[key].join(', ')} `;
        }
        setError(errorMessage);
      } else {
        setError('Terjadi kesalahan jaringan atau server. Coba lagi nanti.');
      }
    }
  };

  return (
    // Menggunakan bg-gray-50 untuk tampilan bersih (seperti di LoginPage)
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        {/* Judul menggunakan warna primary (Amber) */}
        <h2 className="text-center text-3xl font-bold text-primary">
          Daftar ke UnilaFest
        </h2>
        <p className="mt-2 text-center text-gray-600">
            Daftar sebagai Pengguna untuk mulai mengajukan organisasi/event.
        </p>
        
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          
          {/* Tampilkan Error atau Success */}
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          )}
          {success && (
            <div className="rounded-md bg-green-50 p-4">
              <p className="text-sm font-medium text-green-800">{success}</p>
            </div>
          )}

          {/* Input Nama */}
          <div>
            <label htmlFor="nama" className="sr-only">Nama Lengkap</label>
            <input
              id="nama"
              name="nama"
              type="text"
              required
              className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
              placeholder="Nama Lengkap"
              value={formData.nama}
              onChange={handleChange}
            />
          </div>

          {/* Input Email */}
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
              placeholder="Alamat Email (Contoh: user@example.com)"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          {/* Input Password */}
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
              placeholder="Password (Min. 8 Karakter)"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Input Konfirmasi Password */}
          <div>
            <label htmlFor="password_confirmation" className="sr-only">Konfirmasi Password</label>
            <input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              required
              className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
              placeholder="Konfirmasi Password"
              value={formData.password_confirmation}
              onChange={handleChange}
            />
          </div>

          <div>
            <button
              type="submit"
              // Background tombol menggunakan primary (Amber) dan hover ke primary-hover
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
            >
              Daftar Akun
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Sudah punya akun?{' '}
          {/* Link menggunakan warna primary (Amber) */}
          <Link to="/login" className="font-medium text-primary hover:text-primary-hover">
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
}