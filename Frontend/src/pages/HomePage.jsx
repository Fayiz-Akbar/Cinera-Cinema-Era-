import { useState, useEffect } from "react";
import publicApi from "../api/publicApi";
import AcaraList from "../components/Public/AcaraList"; // <-- 1. Import komponen list baru

export default function HomePage() {
  const [acaraList, setAcaraList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // (Logika fetch data tetap sama)
  useEffect(() => {
    const fetchAcara = async () => {
      try {
        setLoading(true);
        const response = await publicApi.getPublicAcara();
        setAcaraList(response.data);
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

  // --- 2. Kita buat "Hero Section" di sini ---
  const renderHero = () => (
    <div className="bg-unila-deep text-white rounded-lg p-8 md:p-12 mb-8 text-center shadow-xl">
      <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
        Temukan Acara Terbaik di Unila
      </h1>
      <p className="text-lg text-unila-light mb-6 max-w-2xl mx-auto">
        Jelajahi berbagai Seminar, Lomba, dan Workshop terbaru.
        Semua informasi terpusat di satu tempat.
      </p>
      {/* Nanti kita letakkan komponen SearchFilter.jsx di sini */}
    </div>
  );

  // --- 3. Logika render utama disederhanakan ---
  const renderContent = () => {
    if (loading) {
      // Tampilan loading yang lebih baik
      return (
        <div className="text-center py-12">
          <p className="text-lg text-unila-medium">Memuat acara...</p>
          {/* Anda bisa tambahkan ikon spinner di sini */}
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
    
    // Gunakan AcaraList untuk menampilkan data
    return <AcaraList acaraList={acaraList} />;
  };

  return (
    <div>
      {/* Tampilkan Hero dan Konten */}
      {renderHero()}
      {renderContent()}
    </div>
  );
}