import { useState, useEffect } from "react";
import publicApi from "../api/publicApi"; // <-- 1. Import API kita

export default function HomePage() {
  // 2. Siapkan 'state' untuk menyimpan data acara dan status loading
  const [acaraList, setAcaraList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. Gunakan useEffect untuk mengambil data saat komponen pertama kali di-load
  useEffect(() => {
    const fetchAcara = async () => {
      try {
        setLoading(true); // Mulai loading
        const response = await publicApi.getPublicAcara(); // Ambil data dari API
        setAcaraList(response.data); // Simpan data ke state
        setError(null); // Hapus error jika sukses
      } catch (err) {
        console.error("Gagal mengambil data acara:", err);
        setError("Gagal mengambil data acara. Coba lagi nanti."); // Simpan pesan error
      } finally {
        setLoading(false); // Selesai loading (baik sukses atau gagal)
      }
    };

    fetchAcara();
  }, []); // Array kosong [] berarti 'jalankan sekali saat load'

  // 4. Tampilkan status loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // 5. Tampilkan status error
  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  // 6. Tampilkan data jika sukses
  return (
    <div>
      <h1>Selamat Datang di UnilaFest</h1>
      <h2>Daftar Acara (Wilayah PJ 3)</h2>

      {/* Nanti kita akan ganti ini dengan komponen 'AcaraList.jsx' */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {acaraList.length > 0 ? (
          acaraList.map((acara) => (
            // Ini adalah 'card' sementara
            <div
              key={acara.id}
              style={{ border: "1px solid #ccc", padding: "16px", width: "300px" }}
            >
              <h3>{acara.judul}</h3>
              <p>
                <strong>Penyelenggara:</strong> {acara.penyelenggara.nama_penyelenggara}
              </p>
              <p>
                <strong>Kategori:</strong> {acara.kategori.nama_kategori}
              </p>
              <p>
                <strong>Lokasi:</strong> {acara.lokasi}
              </p>
              {/* Kita akan tambahkan link ke detail page di sini nanti */}
              <a href={`/acara/${acara.slug}`}>Lihat Detail</a>
            </div>
          ))
        ) : (
          <p>Belum ada acara yang dipublikasi.</p>
        )}
      </div>
    </div>
  );
}