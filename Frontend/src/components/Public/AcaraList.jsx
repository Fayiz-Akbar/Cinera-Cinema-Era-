import CardAcara from '../Common/CardAcara'; // <-- Import kartu baru kita

/**
 * Komponen untuk menampilkan grid daftar acara.
 * Menerima prop 'acaraList'.
 */
export default function AcaraList({ acaraList }) {
  
  // Tampilan jika tidak ada acara
  if (acaraList.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-unila-medium">
          Belum ada acara yang dipublikasi.
        </p>
      </div>
    );
  }

  // Tampilan jika ada acara
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {acaraList.map((acara) => (
        <CardAcara key={acara.id} acara={acara} />
      ))}
    </div>
  );
}