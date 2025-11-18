import CardAcara from '../Common/CardAcara'; // <-- 1. KITA GUNAKAN KARTU YANG SAMA

/**
 * Komponen untuk menampilkan grid "Agenda Saya".
 * Menerima prop 'agendaList'.
 */
export default function AgendaSayaList({ agendaList }) {
  
  // Tampilan jika tidak ada agenda
  if (agendaList.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-lg">
        <p className="text-lg text-unila-medium">
          Anda belum terdaftar di acara manapun.
        </p>
        <p className="text-unila-dark mt-2">
          Mulai jelajahi acara dan daftarkan diri Anda!
        </p>
      </div>
    );
  }

  // Tampilan jika ada agenda
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {agendaList.map((acara) => (
        // 2. Kita pakai ulang CardAcara.jsx agar tampilannya konsisten
        <CardAcara key={acara.id} acara={acara} />
      ))}
    </div>
  );
}