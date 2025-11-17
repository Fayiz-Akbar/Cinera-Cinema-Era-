// Frontend/src/api/axiosClient.js

import axios from 'axios';

// Buat instance axios
const axiosClient = axios.create({
  // URL dasar API Anda. Ambil dari .env jika ada,
  // jika tidak, hardcode URL backend Laravel Anda.
  baseURL: 'http://localhost:8000/api', // (Sesuaikan jika port beda)
  withCredentials: true, // Izinkan pengiriman cookie (penting untuk Sanctum)
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

// (Opsional tapi direkomendasikan) Interceptor untuk Token
// Ini akan otomatis menambahkan token auth ke setiap request
// setelah Anda membuat sistem login.
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('AUTH_TOKEN'); // (Nama token bisa Anda ganti)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;