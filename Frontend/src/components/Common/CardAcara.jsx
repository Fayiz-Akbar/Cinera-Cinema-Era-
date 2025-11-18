import { Link } from 'react-router-dom';
// --- 1. Import ikon yang kita butuhkan ---
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

/**
 * Komponen Card (Kartu) yang reusable dan aesthetic
 * untuk menampilkan 1 item Acara.
 * Menerima prop 'acara' yang berisi 1 objek acara.
 */
export default function CardAcara({ acara }) {
  
  // Format tanggal menjadi "18 Nov"
  const formattedDate = new Date(acara.waktu_mulai).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
  });

  return (
    // Gunakan <Link> agar seluruh kartu bisa diklik
    <Link 
      to={`/acara/${acara.slug}`} 
      className="block bg-white rounded-lg shadow-lg overflow-hidden group 
                 hover:shadow-2xl transition-all duration-300"
    >
      {/* Bagian Gambar/Poster */}
      <div className="w-full h-48 bg-unila-light flex items-center justify-center overflow-hidden">
        {acara.poster_url ? (
          <img 
            src={acara.poster_url} 
            alt={acara.judul} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          />
        ) : (
          <span className="text-unila-medium">Belum ada Poster</span>
        )}
      </div>

      {/* Bagian Konten Teks */}
      <div className="p-4">
        {/* Badge Kategori */}
        <span className="inline-block bg-unila-extradark text-white text-xs 
                       font-semibold px-3 py-1 rounded-full uppercase mb-2">
          {acara.kategori.nama_kategori}
        </span>

        {/* Judul Acara */}
        <h3 className="text-lg font-bold text-unila-deep mb-2 truncate group-hover:text-unila-dark"
            title={acara.judul} // Tooltip jika teks terpotong
        >
          {acara.judul}
        </h3>

        {/* Penyelenggara */}
        <p className="text-sm text-unila-medium mb-4 truncate">
          Oleh: {acara.penyelenggara.nama_penyelenggara}
        </p>

        {/* --- 2. Perubahan di sini (Emoji diganti Ikon) --- */}
        {/* Detail (Lokasi & Tanggal) */}
        <div className="border-t border-unila-light pt-3">
          <div className="flex items-center text-sm text-unila-dark mb-1">
            {/* Ganti emoji 🗓️ dengan ikon */}
            <FaCalendarAlt className="mr-2 text-unila-medium" /> 
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center text-sm text-unila-dark">
            {/* Ganti emoji 📍 dengan ikon */}
            <FaMapMarkerAlt className="mr-2 text-unila-medium" /> 
            <span>{acara.lokasi}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}