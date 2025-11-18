import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import publicApi from "../api/publicApi";
import registrationApi from "../api/registrationApi";

export default function AcaraDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [acara, setAcara] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isRegistering, setIsRegistering] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");

  // --- LOGIKA FETCH DATA (Tidak berubah) ---
  useEffect(() => {
    const fetchAcaraDetail = async () => {
      try {
        setLoading(true);
        const response = await publicApi.getAcaraDetailBySlug(slug);
        setAcara(response.data);
        setError(null);
      } catch (err) {
        console.error("Gagal mengambil detail acara:", err);
        setError("Gagal mengambil data acara. Mungkin acara tidak ditemukan.");
      } finally {
        setLoading(false);
      }
    };
    fetchAcaraDetail();
  }, [slug]);

  // --- LOGIKA PENDAFTARAN (Tidak berubah) ---
  const handleDaftar = async () => {
    setIsRegistering(true);
    setRegisterMessage("");
    try {
      const response = await registrationApi.daftarKeAcara(acara.id);
      setRegisterMessage(response.data.message);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401 || err.response.status === 419) {
          navigate("/login", { 
            state: { message: "Anda harus login untuk mendaftar acara." } 
          });
        } else if (err.response.status === 422) {
          setRegisterMessage(err.response.data.message);
        } else {
          setRegisterMessage("Terjadi kesalahan. Silakan coba lagi.");
        }
      } else {
        setRegisterMessage("Gagal terhubung ke server.");
      }
      console.error("Gagal mendaftar:", err);
    } finally {
      setIsRegistering(false);
    }
  };

  // --- TAMPILAN LOADING & ERROR (Diberi style) ---
  if (loading) {
    return <div className="text-center py-20 text-unila-medium text-lg">Memuat detail acara...</div>;
  }

  if (error) {
    return <div className="text-center py-20 bg-red-100 text-red-700 rounded-lg p-8">{error}</div>;
  }

  if (!acara) {
    return <div className="text-center py-20 text-unila-medium text-lg">Acara tidak ditemukan.</div>;
  }

  // --- 1. FUNGSI BARU: InfoBox (Komponen kecil) ---
  const InfoBox = ({ icon, title, content }) => (
    <div className="flex items-start">
      <span className="text-unila-dark text-xl mr-3 mt-1">{icon}</span>
      <div>
        <h4 className="text-sm font-semibold text-unila-medium uppercase tracking-wide">{title}</h4>
        <p className="text-md text-unila-deep font-medium">{content}</p>
      </div>
    </div>
  );

  // --- 2. TAMPILAN UTAMA (AESTHETIC) ---
  return (
    <div className="max-w-6xl mx-auto">
      {/* Wrapper Konten Utama */}
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Layout Grid: 2 Kolom (Poster & Info) */}
        <div className="grid grid-cols-1 md:grid-cols-12">
          
          {/* Kolom Kiri: Poster */}
          <div className="md:col-span-5">
            <div className="w-full h-64 md:h-full bg-unila-light flex items-center justify-center">
              {acara.poster_url ? (
                <img 
                  src={acara.poster_url} 
                  alt={acara.judul} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <span className="text-unila-medium">Belum ada Poster</span>
              )}
            </div>
          </div>

          {/* Kolom Kanan: Detail Info & Tombol Daftar */}
          <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between">
            <div>
              {/* Badge Kategori */}
              <span className="inline-block bg-unila-extradark text-white text-xs 
                             font-semibold px-3 py-1 rounded-full uppercase mb-2">
                {acara.kategori.nama_kategori}
              </span>
              
              {/* Judul */}
              <h1 className="text-3xl md:text-4xl font-bold text-unila-deep mb-4">
                {acara.judul}
              </h1>

              {/* Info Detail (Waktu, Lokasi, Penyelenggara) */}
              <div className="space-y-4 mb-6">
                <InfoBox 
                  icon="🗓️" 
                  title="Waktu" 
                  content={`${new Date(acara.waktu_mulai).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })} WIB`} 
                />
                <InfoBox 
                  icon="📍" 
                  title="Lokasi" 
                  content={acara.lokasi} 
                />
                <InfoBox 
                  icon="👥" 
                  title="Penyelenggara" 
                  content={acara.penyelenggara.nama_penyelenggara} 
                />
              </div>
            </div>

            {/* Tombol Daftar & Pesan Status */}
            <div className="mt-6 md:mt-0">
              <button 
                onClick={handleDaftar} 
                disabled={isRegistering}
                className="w-full text-white font-bold py-3 px-6 rounded-lg text-lg
                           bg-unila-dark hover:bg-unila-extradark 
                           transition-all duration-300
                           disabled:bg-unila-medium disabled:cursor-not-allowed"
              >
                {isRegistering ? "Memproses..." : "Daftar Acara Ini"}
              </button>
              
              {registerMessage && (
                <p className={`text-center mt-4 ${registerMessage.includes("berhasil") ? "text-green-600" : "text-red-600"}`}>
                  {registerMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bagian Deskripsi (di bawah kartu utama) */}
      <div className="bg-white rounded-lg shadow-xl mt-8 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-unila-deep mb-4 pb-2 border-b border-unila-light">
          Deskripsi Acara
        </h2>
        
        {/* Panggil ReadMore di sini */}
        <ReadMore>
          {acara.deskripsi}
        </ReadMore>
      </div>
    </div>
  );
}

// --- 3. KOMPONEN HELPER BARU: ReadMore ---
function ReadMore({ children, maxChars = 300 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const text = children;

  if (text.length <= maxChars) {
    return <p className="text-unila-dark leading-relaxed whitespace-pre-line">{text}</p>;
  }

  return (
    <div>
      <p className="text-unila-dark leading-relaxed whitespace-pre-line">
        {isExpanded ? text : `${text.substring(0, maxChars)}...`}
      </p> { /* <-- INI YANG SAYA PERBAIKI (sebelumnya </a< ) */ }
      <button 
        onClick={() => setIsExpanded(!isExpanded)} 
        className="text-unila-dark font-semibold hover:underline mt-2"
      >
        {isExpanded ? "Tampilkan lebih sedikit" : "Baca selengkapnya"}
      </button>
    </div>
  );
}