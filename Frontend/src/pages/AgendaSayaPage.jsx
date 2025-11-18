import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import registrationApi from "../api/registrationApi";
import AgendaSayaList from "../components/Public/AgendaSayaList"; // <-- 1. Import list baru

export default function AgendaSayaPage() {
  const navigate = useNavigate();

  const [agendaList, setAgendaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // (Logika fetch data, redirect, dan error handling tetap sama persis)
  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        setLoading(true);
        const response = await registrationApi.getAgendaSaya();
        setAgendaList(response.data);
        setError(null);
      } catch (err) {
        console.error("Gagal mengambil agenda:", err);
        if (err.response && (err.response.status === 401 || err.response.status === 419)) {
          navigate("/login", {
            state: { message: "Silakan login untuk melihat agenda Anda." },
          });
        } else {
          setError("Gagal memuat agenda. Coba lagi nanti.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAgenda();
  }, [navigate]);

  // --- 2. Logika render yang dirapikan ---
  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-12">
          <p className="text-lg text-unila-medium">Memuat agenda Anda...</p>
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

    // Gunakan AgendaSayaList untuk menampilkan data
    return <AgendaSayaList agendaList={agendaList} />;
  };

  return (
    <div>
      {/* --- 3. Judul Halaman yang Aesthetic --- */}
      <h1 className="text-3xl md:text-4xl font-bold text-unila-deep mb-6 pb-4 border-b border-unila-light">
        Agenda Saya
      </h1>
      <p className="text-lg text-unila-dark mb-8">
        Berikut adalah semua acara yang telah Anda daftari.
      </p>

      {/* Render konten (Loading, Error, atau List) */}
      {renderContent()}
    </div>
  );
}