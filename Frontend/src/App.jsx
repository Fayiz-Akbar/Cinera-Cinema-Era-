// Frontend/src.App.jsx
// (PJ 1 - GATEKEEPER)

import React from 'react';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx'; // <-- BIARKAN INI

function App() {
  return (
    // "Bungkus" seluruh aplikasi dengan AuthProvider
    <AuthProvider> 
      {/* Hapus <div className="min-h-screen bg-gray-100">
        Biarkan Outlet merender Layout.jsx (publik) atau AdminLayout.jsx (admin).
        Merekalah yang akan bertanggung jawab atas warna latar belakang.
      */}
      <Outlet />
    </AuthProvider>
  );
}

export default App;