// Frontend/src/components/Common/Footer.jsx
// (PJ 1 - GATEKEEPER) - Footer Utama Halaman Publik

import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    // Footer menggunakan warna Dark Slate/Secondary (memberi kesan kontras & kuat)
    <footer className="bg-secondary text-white mt-12 border-t-4 border-primary">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
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

          {/* Kolom 2: Navigasi Cepat */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Navigasi</h4>
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
            </ul>
          </div>

          {/* Kolom 3: Resource */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Resource</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/login" className="text-gray-300 hover:text-primary transition-colors">
                  Login Admin
                </Link>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors">
                  Panduan Pengajuan
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors">
                  API Dokumentasi
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Kontak & Social Media */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Kontak</h4>
            <p className="text-sm text-gray-300">
              Email: info@unilafest.ac.id
            </p>
            <p className="text-sm text-gray-300 mt-2">
              (Kontak Resmi UnilaFest)
            </p>
            
            <div className="mt-4 flex space-x-4 text-xl">
              {/* Placeholder Social Icons */}
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Instagram">
                {/* SVG/Icon Instagram */}
                📸
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="X/Twitter">
                {/* SVG/Icon Twitter */}
                🐦
              </a>
            </div>
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