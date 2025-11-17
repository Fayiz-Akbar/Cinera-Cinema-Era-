import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // <-- 1. Import 'useParams' untuk membaca URL
import publicApi from "../api/publicApi"; // <-- 2. Import API kita

export default function AcaraDetailPage() {
  // Ambil 'slug' dari parameter URL.
  // Nama 'slug' harus sama dengan yang ada di router.jsx (nanti kita buat: /acara/:slug)
  const { slug } = useParams();

  const [acara, setAcara] = useState(null); // State untuk 1 acara
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAcaraDetail = async () => {
      try {
        setLoading(true);
        // 3. Panggil API dengan slug yang didapat dari URL
        const response = await publicApi.getAcaraDetailBySlug(slug);
        setAcara(response.data); // Simpan data acara ke state
        setError(null);
      } catch (err) {
        console.error("Gagal mengambil detail acara:", err);
        setError("Gagal mengambil data acara. Mungkin acara tidak ditemukan.");
      } finally {
        setLoading(false);
      }
    };

    fetchAcaraDetail();
  }, [slug]); // 4. 'useEffect' akan dijalankan ulang jika 'slug' berubah

  // Tampilkan status loading
  if (loading) {
    return <div>Loading detail acara...</div>;
  }

  // Tampilkan status error
  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  // Tampilkan data jika sukses
  if (!acara) {
    return <div>Acara tidak ditemukan.</div>;
  }

  return (
    <div>
      {/* Nanti kita bisa tambahkan gambar poster di sini */}
      {/* <img src={acara.poster_url} alt={acara.judul} /> */}

      <h1>{acara.judul}</h1>

      <p>
        <strong>Penyelenggara:</strong> {acara.penyelenggara.nama_penyelenggara}
      </p>
      <p>
        <strong>Kategori:</strong> {acara.kategori.nama_kategori}
      </p>
      <p>
        <strong>Lokasi:</strong> {acara.lokasi}
      </p>
      <p>
        <strong>Waktu Mulai:</strong>{" "}
        {new Date(acara.waktu_mulai).toLocaleString("id-ID")}
      </p>
      <p>
        <strong>Waktu Selesai:</strong>{" "}
        {new Date(acara.waktu_selesai).toLocaleString("id-ID")}
      </p>

      <hr />

      <h3>Deskripsi</h3>
      <p>{acara.deskripsi}</p>

      <hr />

      {/* Tombol ini adalah FOKUS KITA SELANJUTNYA.
        Ini adalah bagian dari "Usecase Pendaftar" (PJ 3).
      */}
      <button style={{ padding: "10px 20px", fontSize: "16px" }}>
        Daftar Acara Ini
      </button>
    </div>
  );
}