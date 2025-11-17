// Frontend/src/App.jsx
// (PJ 1 - GATEKEEPER)

import React from 'react';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx'; // <-- IMPORT

function App() {
  return (
    // "Bungkus" seluruh aplikasi dengan AuthProvider
    <AuthProvider> 
      <div className="min-h-screen bg-gray-100">
        <main>
          {/* Halaman (LoginPage, HomePage, dll) akan muncul di sini */}
          <Outlet />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;