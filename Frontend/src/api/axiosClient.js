// Frontend/src/api/axiosClient.js
// (KODE YANG DIPERBAIKI OLEH PJ 1)

import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

// AKTIFKAN INTERCEPTOR: Tambahkan token dari localStorage ke header setiap request
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('AUTH_TOKEN');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default axiosClient;