// Frontend/src/pages/Admin/AdminDashboardPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';

// --- KOMPONEN CARD ---
const StatCard = ({ title, value, unit, color, icon }) => (
  <div className={`rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold opacity-70 uppercase tracking-wider">{title}</p>
        <p className="mt-2 text-4xl font-extrabold">{value}</p>
        <p className="text-xs font-medium opacity-80 mt-1">{unit}</p>
      </div>
      <div className="p-3 bg-white/30 rounded-full backdrop-blur-sm">
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  </div>
);

export default function AdminDashboardPage() {
  // 1. State
  const [stats, setStats] = useState({
    penyelenggara_pending: 0,
    acara_pending: 0,
    acara_published: 0,
    total_user: 0,
  });
  
  // State untuk Data Grafik
  const [chartData, setChartData] = useState([]); 
  const [pieData, setPieData] = useState([]);     
  
  // State Filter Waktu (Default 6 bulan)
  const [timeRange, setTimeRange] = useState('6m'); 
  const [loading, setLoading] = useState(true);

  // Warna Pie Chart
  const COLORS = ['#10b981', '#ef4444', '#f59e0b']; 

  // 2. Fetch Data (Dijalankan saat komponen dimuat ATAU timeRange berubah)
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true); // Tampilkan loading kecil saat ganti filter
      try {
        // Kirim parameter 'range' ke backend
        const response = await axiosClient.get('/admin/dashboard-stats', {
            params: { range: timeRange }
        });
        
        setStats(response.data.counts);
        setChartData(response.data.registration_trend);
        setPieData(response.data.submission_status);

      } catch (err) {
        console.error("Gagal ambil data dashboard:", err);
        // Fallback data kosong jika error agar tidak crash
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [timeRange]); // <--- Efek dijalankan ulang setiap timeRange berubah

  return (
    <div className="mx-auto max-w-7xl pb-12">
      {/* Header Dashboard */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-6 mb-8">
        <div>
            <h1 className="text-4xl font-extrabold text-secondary tracking-tight">
            Dashboard Admin
            </h1>
            <p className="text-gray-500 mt-1">Ringkasan aktivitas real-time UnilaFest</p>
        </div>
        <div className="mt-4 md:mt-0 text-right">
            <span className="bg-primary-100 text-primary-hover px-4 py-2 rounded-full text-sm font-bold block md:inline">
                {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
        </div>
      </div>

      {/* 1. GRID STATISTIK */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
        <StatCard 
            title="Penyelenggara Baru" 
            value={stats.penyelenggara_pending} 
            unit="Perlu Validasi" 
            color="bg-gradient-to-br from-amber-50 to-amber-100 text-amber-700" 
            icon="" 
        />
        <StatCard 
            title="Pengajuan Acara" 
            value={stats.acara_pending} 
            unit="Perlu Review" 
            color="bg-gradient-to-br from-red-50 to-red-100 text-red-700" 
            icon="" 
        />
        <StatCard 
            title="Acara Aktif" 
            value={stats.acara_published} 
            unit="Tayang di Portal" 
            color="bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-700" 
            icon="" 
        />
        <StatCard 
            title="Total Pengguna" 
            value={stats.total_user} 
            unit="Akun Terdaftar" 
            color="bg-gradient-to-br from-slate-50 to-slate-100 text-slate-700" 
            icon="" 
        />
      </div>

      {/* 2. GRID GRAFIK */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        
        {/* Grafik Kiri: Tren Registrasi (Line Chart) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-secondary">Tren Registrasi Pengguna</h2>
            
            {/* DROPDOWN FILTER WAKTU */}
            <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5"
            >
                <option value="1w">1 Minggu Terakhir</option>
                <option value="1m">1 Bulan Terakhir</option>
                <option value="3m">3 Bulan Terakhir</option>
                <option value="6m">6 Bulan Terakhir</option>
                <option value="1y">1 Tahun Terakhir</option>
            </select>
          </div>
          
          <div className="h-[300px] w-full">
            {loading ? (
                <div className="flex h-full items-center justify-center text-gray-400">Mengambil data...</div>
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="label" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#d97706" 
                    strokeWidth={3}
                    dot={{ fill: '#d97706', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 8 }} 
                    name="User Baru"
                    />
                </LineChart>
                </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Grafik Kanan: Komposisi Status (Donut Chart) */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col">
          <h2 className="text-xl font-bold text-secondary mb-2">Status Acara</h2>
          <p className="text-sm text-gray-400 mb-6">Rasio persetujuan acara masuk</p>
          
          <div className="flex-1 relative min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-3xl font-bold text-secondary">
                    {pieData.reduce((acc, curr) => acc + curr.value, 0)}
                </p>
                <p className="text-xs text-gray-400">Total</p>
            </div>
          </div>

          {/* Legenda */}
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {pieData.map((entry, index) => (
                <div key={index} className="flex flex-col items-center p-2 rounded-lg bg-gray-50">
                    <div className="w-3 h-3 rounded-full mb-1" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="text-xs font-semibold text-gray-600">{entry.name}</span>
                    <span className="text-lg font-bold text-secondary">{entry.value}</span>
                </div>
            ))}
          </div>
        </div>
      </div>
      
       {/* 3. BAGIAN PRIORITAS (Tindakan Cepat) */}
       <div className="mt-8">
        <h2 className="text-xl font-bold text-secondary mb-6 flex items-center">
            <span className="w-2 h-8 bg-primary rounded-full mr-3"></span>
            Tindakan Mendesak
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card Validasi Penyelenggara */}
          <div className="group bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-primary cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
                <h3 className="text-lg font-bold text-secondary">Validasi Penyelenggara</h3>
                <p className="text-sm text-gray-500 mt-1 mb-4">
                    Terdapat <span className="font-bold text-primary">{stats.penyelenggara_pending} organisasi</span> baru menunggu persetujuan Anda.
                </p>
                <Link to="/admin/validasi-penyelenggara" className="inline-flex items-center text-primary font-semibold hover:underline">
                    Proses Sekarang →
                </Link>
            </div>
          </div>
          
          {/* Card Validasi Acara */}
          <div className="group bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-red-500 cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-100 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
                <h3 className="text-lg font-bold text-secondary">Validasi Acara</h3>
                <p className="text-sm text-gray-500 mt-1 mb-4">
                    Terdapat <span className="font-bold text-red-600">{stats.acara_pending} event</span> yang menunggu untuk dipublikasikan.
                </p>
                <Link to="/admin/validasi-acara" className="inline-flex items-center text-red-600 font-semibold hover:underline">
                    Proses Sekarang →
                </Link>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}