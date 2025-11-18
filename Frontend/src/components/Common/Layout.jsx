// Frontend/src/components/Common/Layout.jsx
// (PJ 1 - GATEKEEPER) - Layout Utama untuk Halaman Publik

import React from 'react';
import Navbar from './Navbar'; // Pastikan case-nya: ./Navbar
import Footer from './Footer'; // Pastikan case-nya: ./Footer
// Tidak perlu import Outlet jika Anda menggunakan 'children'
// import { Outlet } from 'react-router-dom'; 

const Layout = ({ children }) => {
  return (
    // KRUSIAL: flex-col dan min-h-screen di root div
    <div className="flex flex-col min-h-screen bg-bgbody text-textmain">
      
      {/* 1. Navbar (sticky agar tetap di atas) */}
      <header className="sticky top-0 z-30">
        <Navbar />
      </header>

      {/* 2. Konten Utama */}
      {/* KRUSIAL: flex-1 memastikan bagian ini mengambil semua ruang sisa, 
         mendorong Footer ke bawah */}
      <main className="flex-1">
        {children} 
      </main>

      {/* 3. Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;