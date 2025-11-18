// Frontend/src/components/Common/Footer.jsx
// (PJ 1 - GATEKEEPER) - Footer Utama Halaman Publik

import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    // Footer menggunakan warna Dark Slate/Secondary (memberi kesan kontras & kuat)
    <footer className="bg-secondary text-white mt-12 border-t-4 border-primary">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* >> PERUBAHAN: Ubah grid menjadi 3 kolom (2 kolom di mobile) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          
          {/* Kolom 1: Logo & Deskripsi */}
          <div>
            <h3 className="text-3xl font-extrabold text-primary mb-3">
              Unila<span className="text-white">Fest</span>
            </h3>
            <p className="text-sm text-gray-400">
              Portal terpusat untuk semua event Kampus Universitas Lampung.
              Mengatasi fragmentasi informasi agar Anda tidak ketinggalan.
            </p>
          </div>

          {/* Kolom 2: Navigasi Cepat (Eks-Kolom 2) */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Navigasi Cepat</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary transition-colors">
                  Jelajahi Event
                </Link>
              </li>
              <li>
                <Link to="/agenda-saya" className="text-gray-300 hover:text-primary transition-colors">
                  Agenda Saya
                </Link>
              </li>
              <li>
                <Link to="/ajukan-penyelenggara" className="text-gray-300 hover:text-primary transition-colors">
                  Ajukan Organisasi
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-primary transition-colors">
                  Login Admin
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Kolom 3: Kontak & Social Media (Eks-Kolom 4) */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Kontak Resmi</h4>
            <p className="text-sm text-gray-300">
              Email: info@unilafest.ac.id
            </p>
            <p className="text-sm text-gray-300 mt-2">
              (Kontak Resmi UnilaFest)
            </p>
        
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-primary/50">
          <p className="text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} UnilaFest. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}