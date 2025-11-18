import { useState, useEffect } from "react";
import publicApi from "../api/publicApi";
import AcaraList from "../components/Public/AcaraList";
import SearchFilter from "../components/Public/SearchFilter"; // <-- 1. Import komponen baru

export default function HomePage() {
  const [acaraList, setAcaraList] = useState([]); // Daftar asli dari API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 2. State baru untuk menampung input filter ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedKategori, setSelectedKategori] = useState(""); // (ID kategori)

  // Logika fetch data (tetap sama)
  useEffect(() => {
    const fetchAcara = async () => {
      try {
        setLoading(true);
        const response = await publicApi.getPublicAcara();
        setAcaraList(response.data); // Simpan data asli
        setError(null);
      } catch (err) {
        console.error("Gagal mengambil data acara:", err);
        setError("Gagal mengambil data acara. Coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };
    fetchAcara();
  }, []);

  // --- 3. Fungsi Handler untuk menerima data dari SearchFilter ---
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleKategoriChange = (value) => {
    setSelectedKategori(value);
  };

  // --- 4. Logika Filtering (Client-side) ---
  const filteredAcara = acaraList.filter((acara) => {
    // Filter berdasarkan Search Term (Judul Acara)
    const matchSearch = acara.judul
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Filter berdasarkan Kategori
    // Jika selectedKategori kosong (""), lewati filter ini
    const matchKategori = !selectedKategori
      ? true
      : acara.id_kategori === parseInt(selectedKategori);

    return matchSearch && matchKategori;
  });

  // --- 5. Render Hero Section (tetap sama) ---
  const renderHero = () => (
    <div className="bg-unila-deep text-white rounded-lg p-8 md:p-12 mb-24 text-center shadow-xl relative">
      <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
        Temukan Acara Terbaik di Unila
      </h1>
      <p className="text-lg text-unila-light mb-6 max-w-2xl mx-auto">
        Jelajahi berbagai Seminar, Lomba, dan Workshop terbaru.
      </p>
      
      {/* 6. Sisipkan komponen SearchFilter di sini */}
      {/* Posisinya akan "melayang" di antara Hero dan List */}
      <div className="absolute -bottom-20 left-0 right-0 max-w-4xl mx-auto px-4">
        <SearchFilter 
          onSearchChange={handleSearchChange}
          onKategoriChange={handleKategoriChange}
        />
      </div>
    </div>
  );

  // Logika render konten (tetap sama, tapi pakai filteredAcara)
  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-12">
          <p className="text-lg text-unila-medium">Memuat acara...</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="text-center py-12 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      );
    }
    
    // 7. Gunakan AcaraList, tapi kirimkan data yang SUDAH DIFILTER
    return <AcaraList acaraList={filteredAcara} />;
  };

  return (
    <div>
      {renderHero()}
      {renderContent()}
    </div>
  );
}