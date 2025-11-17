// Frontend/src/App.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  // Outlet adalah "jendela" di mana Halaman Anda
  // (HomePage, LoginPage, AdminDashboardPage) akan muncul.
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Nanti, Navbar global bisa ditaruh di sini.
        Contoh: <Navbar /> 
      */}
      
      <main>
        {/* Render halaman yang aktif di sini */}
        <Outlet />
      </main>

      {/* Nanti, Footer global bisa ditaruh di sini.
        Contoh: <Footer /> 
      */}
    </div>
  );
}

export default App;