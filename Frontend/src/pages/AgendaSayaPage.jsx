import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // <-- Import Link
import registrationApi from "../api/registrationApi"; // <-- Import API Registrasi

export default function AgendaSayaPage() {
  const navigate = useNavigate();

  // State untuk daftar agenda, loading, dan error
  const [agendaList, setAgendaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        setLoading(true);
        // Panggil API untuk mendapatkan agenda
        const response = await registrationApi.getAgendaSaya();
        setAgendaList(response.data); // Simpan data ke state
        setError(null);
      } catch (err) {
        console.error("Gagal mengambil agenda:", err);

        // --- INI PENTING ---
        // Jika error 401 (Unauthorized) atau 419 (Token Mismatch),
        // artinya user belum login.
        if (err.response && (err.response.status === 401 || err.response.status === 419)) {
          // Arahkan ke halaman login
          navigate("/login", {
            state: { message: "Silakan login untuk melihat agenda Anda." },
          });
        } else {
          // Error lainnya
          setError("Gagal memuat agenda. Coba lagi nanti.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAgenda();
  }, [navigate]); // 'navigate' dimasukkan sebagai dependency

  // Tampilkan status loading
  if (loading) {
    return <div>Loading agenda saya...</div>;
  }

  // Tampilkan status error (selain error login)
  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  // Tampilkan data jika sukses
  return (
    <div>
      <h1>Agenda Saya</h1>
      <p>Berikut adalah semua acara yang telah Anda daftari.</p>

      {/* Nanti kita akan ganti ini dengan komponen 'AgendaSayaList.jsx' */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {agendaList.length > 0 ? (
          agendaList.map((acara) => (
            <div
              key={acara.id}
              style={{ border: "1px solid #ccc", padding: "16px", width: "300px" }}
            >
              <h3>{acara.judul}</h3>
              <p>
                <strong>Kategori:</strong> {acara.kategori.nama_kategori}
              </p>
              <p>
                <strong>Lokasi:</strong> {acara.lokasi}
              </p>
              <p>
                <strong>Waktu:</strong>{" "}
                {new Date(acara.waktu_mulai).toLocaleString("id-ID")}
              </p>
              {/* Tambahkan Link kembali ke halaman detail */}
              <Link to={`/acara/${acara.slug}`}>Lihat Detail Acara</Link>
            </div>
          ))
        ) : (
          <p>Anda belum terdaftar di acara manapun.</p>
        )}
      </div>
    </div>
  );
}