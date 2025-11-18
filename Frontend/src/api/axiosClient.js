// Frontend/src/api/axiosClient.js
// (KODE YANG DIPERBAIKI)

import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true, // Ini sudah benar
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

/*
// Untuk auth berbasis cookie (stateful), ini tidak diperlukan
// dan bisa menyebabkan kebingungan.
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('AUTH_TOKEN'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
*/

export default axiosClient;