// Frontend/src/pages/Admin/AdminDashboardPage.jsx

import React from 'react';
// Import Link diperlukan untuk navigasi antar halaman
import { Link } from 'react-router-dom'; 

// Data Mockup untuk ilustrasi statistik
const STATS = [
  {
    title: 'Penyelenggara Baru',
    value: '7',
    unit: 'Pending',
    // Menggunakan warna Amber terang (primary-100)
    color: 'bg-primary-100 text-primary-hover', 
  },
  {
    title: 'Pengajuan Acara',
    value: '12',
    unit: 'Pending',
    // Menggunakan warna merah (Danger)
    color: 'bg-red-100 text-red-600', 
  },
  {
    title: 'Acara Publik',
    value: '45',
    unit: 'Published',
    color: 'bg-green-100 text-green-600',
  },
  {
    title: 'Total Pengguna',
    value: '840',
    unit: 'Aktif',
    // Menggunakan warna netral Dark Slate/Secondary
    color: 'bg-gray-100 text-secondary', 
  },
];

// Komponen Card Statistik
const StatCard = ({ title, value, unit, color, icon }) => (
  // Menggunakan template literal untuk kelas agar bisa menggunakan variabel CSS dari index.css
  <div className={`rounded-lg p-6 shadow-md transition-shadow duration-300 hover:shadow-lg ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium opacity-80">{title}</p>
        <p className="mt-1 text-3xl font-extrabold">{value}</p>
        <p className="text-xs opacity-70 mt-1">{unit}</p>
      </div>
      <span className="text-4xl">{icon}</span>
    </div>
  </div>
);


// >>> BARIS KRUSIAL YANG MEMPERBAIKI ERROR 'DOES NOT PROVIDE AN EXPORT NAMED DEFAULT' <<<
export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-7xl">
      {/* Header Dashboard */}
      <div className="flex items-center justify-between border-b pb-4 mb-8">
        <h1 className="text-4xl font-extrabold text-secondary">
          Dashboard Admin
        </h1>
        <p className="text-gray-500">Ringkasan cepat sistem UnilaFest (Data Mockup)</p>
      </div>

      {/* Grid Statistik */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Bagian Prioritas/Validasi Cepat */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-secondary border-l-4 border-primary pl-3 mb-6">
          Tindakan Mendesak
        </h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          
          {/* Card untuk Validasi Penyelenggara */}
          <div className="rounded-lg bg-white p-6 shadow-xl border-t-4 border-primary">
            <h3 className="text-lg font-semibold text-secondary flex justify-between items-center">
              Validasi Penyelenggara
              <span className="text-sm font-bold bg-primary text-white px-2 py-1 rounded-full">{STATS[0].value} Pending</span>
            </h3>
            <p className="mt-2 text-gray-500">Tinjau dan setujui HIMA/UKM baru sebelum mereka dapat mengajukan acara.</p>
            <div className="mt-4 text-right">
              <Link
                to="/admin/validasi-penyelenggara"
                className="text-primary font-semibold hover:underline"
              >
                Lihat Semua →
              </Link>
            </div>
          </div>
          
          {/* Card untuk Validasi Acara */}
          <div className="rounded-lg bg-white p-6 shadow-xl border-t-4 border-red-500">
            <h3 className="text-lg font-semibold text-secondary flex justify-between items-center">
              Persetujuan Acara
              <span className="text-sm font-bold bg-red-600 text-white px-2 py-1 rounded-full">{STATS[1].value} Pending</span>
            </h3>
            <p className="mt-2 text-gray-500">Periksa detail acara dan poster sebelum dipublikasikan ke portal utama.</p>
            <div className="mt-4 text-right">
              <Link
                to="/admin/validasi-acara"
                className="text-red-600 font-semibold hover:underline"
              >
                Lihat Semua →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}