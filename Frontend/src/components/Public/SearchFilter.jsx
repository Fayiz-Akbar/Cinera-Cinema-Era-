import { useState, useEffect } from "react";
import publicApi from "../../api/publicApi"; // Import API publik kita

/**
 * Komponen Form untuk Search Bar dan Filter Kategori.
 * Komponen ini menerima props dari HomePage:
 * - onSearchChange: (value) => {}
 * - onKategoriChange: (value) => {}
 */
export default function SearchFilter({ onSearchChange, onKategoriChange }) {
  // State untuk menyimpan daftar kategori dari API
  const [kategoriList, setKategoriList] = useState([]);

  // Ambil data kategori dari API saat komponen di-load
  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const response = await publicApi.getAllKategori();
        setKategoriList(response.data);
      } catch (err) {
        console.error("Gagal mengambil kategori:", err);
      }
    };
    fetchKategori();
  }, []);

  // --- Helper function untuk styling ---
  const inputStyle = `
    w-full px-4 py-3 rounded-lg bg-white border border-unila-light 
    text-unila-deep placeholder-unila-medium 
    focus:outline-none focus:ring-2 focus:ring-unila-dark
  `;

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 -mt-16 relative z-10 
                    md:flex md:items-center md:space-x-4">
      
      {/* 1. Form Pencarian (Search Bar) */}
      <div className="flex-grow mb-4 md:mb-0">
        <label htmlFor="search" className="sr-only">Cari Acara</label>
        <input
          type="text"
          id="search"
          placeholder="Cari berdasarkan nama acara..."
          className={inputStyle}
          // Kirim data ke HomePage setiap kali ada ketikan
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* 2. Dropdown Filter Kategori */}
      <div className="w-full md:w-1/3 mb-4 md:mb-0">
        <label htmlFor="kategori" className="sr-only">Filter Kategori</label>
        <select
          id="kategori"
          className={inputStyle}
          // Kirim data ke HomePage setiap kali pilihan berubah
          onChange={(e) => onKategoriChange(e.target.value)}
        >
          <option value="">Semua Kategori</option>
          {kategoriList.map((kategori) => (
            <option key={kategori.id} value={kategori.id}>
              {kategori.nama_kategori}
            </option>
          ))}
        </select>
      </div>

      {/* (Kita bisa tambahkan filter Tanggal di sini nanti) */}

      {/* 3. Tombol Submit (Opsional, karena kita filter live) */}
      {/* <button className="w-full md:w-auto px-6 py-3 bg-unila-dark text-white font-bold rounded-lg 
                       hover:bg-unila-extradark transition-colors">
        Cari
      </button> */}
    </div>
  );
}