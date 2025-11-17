// Frontend/src/pages/Admin/AdminKategoriPage.jsx
// (WILAYAH PJ 1)

import { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';

export default function AdminKategoriPage() {
  // State untuk menyimpan daftar kategori
  const [kategoriList, setKategoriList] = useState([]);
  // State untuk form (Tambah Kategori Baru)
  const [newKategoriNama, setNewKategoriNama] = useState('');
  // State untuk error
  const [error, setError] = useState(null);
  // State untuk loading
  const [loading, setLoading] = useState(true);

  // --- 1. FUNGSI FETCH DATA (READ) ---
  const fetchKategori = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get('/admin/kategori');
      setKategoriList(response.data);
    } catch (err) {
      setError('Gagal mengambil data kategori.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Panggil fetchKategori() saat komponen pertama kali dimuat
  useEffect(() => {
    fetchKategori();
  }, []); // [] artinya hanya dijalankan sekali

  // --- 2. FUNGSI TAMBAH DATA (CREATE) ---
  const handleCreate = async (e) => {
    e.preventDefault();
    setError(null);

    if (!newKategoriNama) {
      setError('Nama kategori tidak boleh kosong.');
      return;
    }

    try {
      // Tembak API POST
      await axiosClient.post('/admin/kategori', {
        nama_kategori: newKategoriNama,
      });
      // Jika berhasil, bersihkan form
      setNewKategoriNama('');
      // Ambil ulang data dari DB agar daftar ter-update
      fetchKategori();
    } catch (err) {
      if (err.response && err.response.data.nama_kategori) {
        setError(err.response.data.nama_kategori[0]); // Tampilkan error validasi
      } else {
        setError('Gagal menambah kategori.');
      }
    }
  };

  // --- 3. FUNGSI HAPUS DATA (DELETE) ---
  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
      return;
    }

    try {
      // Tembak API DELETE
      await axiosClient.delete(`/admin/kategori/${id}`);
      // Ambil ulang data
      fetchKategori();
    } catch (err) {
      setError('Gagal menghapus kategori.');
    }
  };

  // --- (Fungsi UPDATE bisa ditambahkan nanti) ---

  // Tampilan Loading
  if (loading) {
    return <div>Loading data kategori...</div>;
  }

  // Tampilan JSX (HTML)
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">Manajemen Kategori</h1>
      
      {/* 1. FORM TAMBAH KATEGORI */}
      <div className="mt-6 mb-8 rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-xl font-semibold">Tambah Kategori Baru</h2>
        <form onSubmit={handleCreate} className="mt-4 flex space-x-4">
          <input
            type="text"
            value={newKategoriNama}
            onChange={(e) => setNewKategoriNama(e.target.value)}
            placeholder="Nama Kategori (cth: Seminar)"
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Tambah
          </button>
        </form>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>

      {/* 2. TABEL DAFTAR KATEGORI */}
      <div className="overflow-x-auto rounded-lg bg-white shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Nama Kategori
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Slug
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {kategoriList.length > 0 ? (
              kategoriList.map((kategori) => (
                <tr key={kategori.id}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                    {kategori.nama_kategori}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {kategori.slug}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    {/* (Tombol Edit akan ada di sini) */}
                    <button
                      onClick={() => handleDelete(kategori.id)}
                      className="ml-4 text-red-600 hover:text-red-900"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                  Belum ada data kategori.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}