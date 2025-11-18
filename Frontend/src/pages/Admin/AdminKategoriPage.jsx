// Frontend/src/pages/Admin/AdminKategoriPage.jsx
// (WILAYAH PJ 1) - UI Final Sesuai Tema + Fitur EDIT/UPDATE

import { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';

export default function AdminKategoriPage() {
  const [kategoriList, setKategoriList] = useState([]);
  const [newKategoriNama, setNewKategoriNama] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // State untuk Editing
  const [editingKategoriId, setEditingKategoriId] = useState(null);
  const [editNama, setEditNama] = useState('');

  // --- 1. FUNGSI FETCH DATA (READ) ---
  const fetchKategori = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get('/admin/kategori');
      setKategoriList(response.data);
      setError(null);
    } catch (err) {
      setError('Gagal mengambil data kategori.');
      console.error("Fetch Kategori Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKategori();
  }, []);

  // --- 2. FUNGSI TAMBAH DATA (CREATE) ---
  const handleCreate = async (e) => {
    e.preventDefault();
    setError(null);
    if (!newKategoriNama.trim()) {
      setError('Nama kategori tidak boleh kosong.');
      return;
    }
    try {
      await axiosClient.post('/admin/kategori', {
        nama_kategori: newKategoriNama.trim(),
      });
      setNewKategoriNama('');
      fetchKategori();
    } catch (err) {
      if (err.response && err.response.data.nama_kategori) {
        setError(err.response.data.nama_kategori[0]);
      } else {
        setError('Gagal menambah kategori.');
      }
    }
  };
  
  // --- 3. FUNGSI START EDIT ---
  const handleEdit = (kategori) => {
    setEditingKategoriId(kategori.id);
    setEditNama(kategori.nama_kategori);
    setError(null);
  };
  
  // --- 4. FUNGSI CANCEL EDIT ---
  const handleCancelEdit = () => {
    setEditingKategoriId(null);
    setEditNama('');
    setError(null);
  };

  // --- 5. FUNGSI UPDATE DATA (UPDATE) ---
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);
    if (!editNama.trim()) {
      setError('Nama kategori tidak boleh kosong.');
      return;
    }
    
    try {
      await axiosClient.put(`/admin/kategori/${editingKategoriId}`, {
        nama_kategori: editNama.trim(),
      });
      fetchKategori(); // Refresh data
      handleCancelEdit(); // Selesai editing
    } catch (err) {
      if (err.response && err.response.data.nama_kategori) {
        setError(err.response.data.nama_kategori[0]);
      } else {
        setError('Gagal memperbarui kategori.');
      }
    }
  };

  // --- 6. FUNGSI HAPUS DATA (DELETE) ---
  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
      return;
    }
    try {
      await axiosClient.delete(`/admin/kategori/${id}`);
      fetchKategori();
    } catch (err) {
      setError('Gagal menghapus kategori.');
    }
  };

  // Tampilan Loading
  if (loading) {
    return <div className="text-lg text-primary">Sedang memuat data kategori...</div>;
  }

  // Tampilan JSX (HTML)
  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold text-secondary">Manajemen Kategori</h1>
      
      {/* 1. FORM TAMBAH KATEGORI */}
      <div className="mt-6 mb-8 rounded-lg bg-white p-6 shadow-xl border-t-4 border-primary">
        <h2 className="text-xl font-semibold text-secondary">Tambah Kategori Baru</h2>
        <form onSubmit={handleCreate} className="mt-4 flex space-x-4">
          <input
            type="text"
            value={newKategoriNama}
            onChange={(e) => setNewKategoriNama(e.target.value)}
            placeholder="Nama Kategori (cth: Seminar)"
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
          />
          <button
            type="submit"
            className="rounded-lg bg-primary px-6 py-2 text-white font-semibold shadow-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
          >
            Tambah Kategori
          </button>
        </form>
        {/* Error message untuk CREATE atau UPDATE akan muncul di sini */}
        {error && !editingKategoriId && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>

      {/* 2. TABEL DAFTAR KATEGORI */}
      <div className="overflow-x-auto rounded-lg bg-white shadow-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-secondary">
                Nama Kategori
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-secondary">
                Slug
              </th>
              <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider text-secondary">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {kategoriList.length > 0 ? (
              kategoriList.map((kategori) => (
                <tr key={kategori.id} className="hover:bg-gray-50 transition-colors">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-secondary">
                    {editingKategoriId === kategori.id ? (
                        // Mode Edit: Tampilkan Input
                        <form onSubmit={handleUpdate} className="flex">
                            <input
                                type="text"
                                value={editNama}
                                onChange={(e) => setEditNama(e.target.value)}
                                className="flex-1 rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                                autoFocus
                            />
                        </form>
                    ) : (
                        // Mode Normal: Tampilkan Nama
                        kategori.nama_kategori
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {kategori.slug}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    {editingKategoriId === kategori.id ? (
                        // Mode Edit: Tombol Simpan & Batal
                        <>
                            <button
                                onClick={handleUpdate}
                                className="text-white bg-primary px-3 py-1 rounded-md hover:bg-primary-hover mr-2 font-semibold"
                            >
                                Simpan
                            </button>
                            <button
                                onClick={handleCancelEdit}
                                className="text-gray-700 border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-200 font-semibold"
                            >
                                Batal
                            </button>
                        </>
                    ) : (
                        // Mode Normal: Tombol Edit & Hapus
                        <>
                            <button
                                onClick={() => handleEdit(kategori)}
                                className="text-primary hover:text-primary-hover mr-4 font-semibold"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(kategori.id)}
                                className="text-red-600 hover:text-red-800 font-semibold"
                            >
                                Hapus
                            </button>
                        </>
                    )}
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
      
      {/* Error message khusus untuk EDIT */}
      {error && editingKategoriId && <p className="mt-2 text-sm text-red-600 text-center">Gagal menyimpan: {error}</p>}
    </div>
  );
}