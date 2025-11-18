// Frontend/src/components/Common/CardAcara.jsx
// (PJ 1 - GATEKEEPER) - Komponen Card Acara Publik
// Menggunakan tema Amber/Primary.

import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const CardAcara = ({ acara }) => {
  if (!acara) return null;

  // Helper untuk format tanggal
  const formattedDate = (date) => {
    return date ? format(new Date(date), 'dd MMMM yyyy') : 'Tanggal Tidak Tersedia';
  };
  
  // Ambil data yang diperlukan
  const { 
      judul, 
      slug, 
      waktu_mulai, 
      penyelenggara, 
      kategori, 
      lokasi, 
      poster_url // Digunakan untuk background
  } = acara;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group">
      
      {/* Gambar Poster/Thumbnail */}
      <div 
        className="h-40 bg-cover bg-center flex items-end p-3 relative"
        style={{ 
          backgroundImage: `url(${poster_url || 'https://via.placeholder.com/600x400?text=Poster+Segera'})`,
          // Filter atau overlay agar teks di bawah terbaca
          backgroundSize: 'cover'
        }}
      >
        <div className="absolute inset-0 bg-secondary/30 transition-colors group-hover:bg-secondary/40"></div>
        {/* Kategori Badge */}
        <span className="relative z-10 text-xs font-semibold bg-primary text-white px-3 py-1 rounded-full shadow-md">
          {kategori?.nama_kategori || 'Umum'}
        </span>
      </div>

      {/* Detail Konten */}
      <div className="p-5">
        
        {/* Judul Acara (Link ke Detail Page) */}
        <Link to={`/acara/${slug}`} className="block">
          <h2 className="text-xl font-bold text-secondary hover:text-primary transition-colors line-clamp-2">
            {judul}
          </h2>
        </Link>
        
        {/* Penyelenggara */}
        <p className="mt-1 text-sm text-gray-600">
          Oleh: <span className="font-semibold text-primary">{penyelenggara?.nama_penyelenggara || 'Anonim'}</span>
        </p>

        <hr className="my-3 border-gray-100" />
        
        {/* Info Waktu & Lokasi */}
        <div className="space-y-1 text-sm text-gray-700">
          <p className="flex items-center">
            <span className="mr-2 text-primary">📅</span>
            {formattedDate(waktu_mulai)}
          </p>
          <p className="flex items-center">
            <span className="mr-2 text-primary">📍</span>
            {lokasi || 'Online/Venue'}
          </p>
        </div>

        {/* Tombol Lihat Detail */}
        <div className="mt-5">
          <Link
            to={`/acara/${slug}`}
            className="block text-center bg-gray-100 text-secondary border border-gray-200 py-2 rounded-lg font-semibold hover:bg-primary-100 hover:text-primary transition-colors"
          >
            Lihat Detail
          </Link>
        </div>

      </div>
    </div>
  );
};

export default CardAcara;