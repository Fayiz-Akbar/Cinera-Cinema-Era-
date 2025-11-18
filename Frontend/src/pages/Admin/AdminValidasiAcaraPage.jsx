// Frontend/src/pages/Admin/AdminValidasiAcaraPage.jsx

import { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import { format } from 'date-fns';

export default function AdminValidasiAcaraPage() {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState({
        isOpen: false,
        id: null,
        status: null, // 'Published' or 'Rejected'
        catatan: '',
        acaraJudul: '',
    });

    const fetchSubmissions = async () => {
        setLoading(true);
        try {
            // GET /api/admin/validasi/acara
            const response = await axiosClient.get('/admin/validasi/acara');
            setSubmissions(response.data);
            setError(null);
        } catch (err) {
            console.error("Fetch Error:", err);
            setError('Gagal mengambil data pengajuan acara. Pastikan Backend berjalan.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const openModal = (submission, status) => {
        setModal({
            isOpen: true,
            id: submission.id,
            status: status,
            catatan: '',
            acaraJudul: submission.judul,
        });
    };

    const closeModal = () => {
        setModal({ isOpen: false, id: null, status: null, catatan: '', acaraJudul: '' });
        setError(null); 
    };

    const handleValidation = async (e) => {
        e.preventDefault();
        setError(null);
        
        try {
            // POST /api/admin/validasi/acara/{id}
            await axiosClient.post(`/admin/validasi/acara/${modal.id}`, {
                status: modal.status,
                catatan_admin_acara: modal.catatan.trim(),
            });

            closeModal();
            fetchSubmissions();
        } catch (err) {
            console.error("Validation Error:", err);
            const msg = err.response?.data?.message || 'Gagal menyimpan validasi. Coba lagi.';
            setError(msg);
        }
    };
    
    // Helper untuk format waktu
    const formatDateTime = (dateTime) => {
        // Menggunakan date-fns format 'dd MMM yyyy, HH:mm'
        return dateTime ? format(new Date(dateTime), 'dd MMM yyyy, HH:mm') : '-';
    };


    // --- JSX Component (Modal) ---
    const ModalValidation = () => {
        if (!modal.isOpen) return null;

        const isPublished = modal.status === 'Published';
        const title = isPublished ? 'Publikasikan Acara' : 'Tolak Acara';
        const buttonText = isPublished ? 'Publikasikan' : 'Tolak Permanen';
        const buttonColor = isPublished ? 'bg-primary hover:bg-primary-hover focus:ring-primary' : 'bg-red-600 hover:bg-red-700 focus:ring-red-500';
        const inputBorder = isPublished ? 'focus:border-primary focus:ring-primary' : 'focus:border-red-500 focus:ring-red-500';
        const requiredNote = !isPublished;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70">
                <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">
                    <h3 className={`text-2xl font-bold ${isPublished ? 'text-primary' : 'text-red-600'} mb-4`}>
                        {title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Anda akan memproses acara **{modal.acaraJudul}**. Acara berstatus 'Published' akan tampil di portal utama.
                    </p>

                    <form onSubmit={handleValidation}>
                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Catatan Admin {requiredNote && <span className="text-red-500">*</span>}
                            </label>
                            <textarea
                                rows="3"
                                value={modal.catatan}
                                onChange={(e) => setModal({ ...modal, catatan: e.target.value })}
                                required={requiredNote}
                                className={`block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-1 ${inputBorder} sm:text-sm`}
                                placeholder={isPublished ? "Opsional: Cek terakhir sebelum tayang." : "Wajib: Jelaskan alasan penolakan (misal: Poster tidak jelas, informasi kurang lengkap)."}
                            />
                        </div>

                        {error && (
                            <div className="mb-4 rounded-md bg-red-50 p-3 text-sm font-medium text-red-800">
                                {error}
                            </div>
                        )}

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                className={`rounded-lg px-4 py-2 text-sm font-medium text-white shadow-md transition-colors ${buttonColor}`}
                            >
                                {buttonText}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };
    // --- END Modal Component ---

    return (
        <div className="mx-auto max-w-7xl">
            <h1 className="text-3xl font-bold text-secondary">
                Validasi Pengajuan Acara
            </h1>
            <p className="mt-1 text-gray-500 mb-6">
                Tinjau kelengkapan dan kelayakan acara yang diajukan. Hanya acara berstatus 'Published' yang tampil di portal publik. Total: {submissions.length} Pending.
            </p>
            
            {submissions.length === 0 ? (
                <div className="rounded-lg bg-green-50 p-6 text-center shadow-xl border-t-4 border-green-500">
                    <p className="text-lg font-semibold text-green-800">Semua pengajuan acara telah diverifikasi. Tidak ada data pending saat ini.</p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-lg bg-white shadow-xl">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-secondary">
                                    Acara & Kategori
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-secondary">
                                    Penyelenggara
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-secondary">
                                    Waktu
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider text-secondary">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {submissions.map((acara) => (
                                <tr key={acara.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-secondary">
                                        <div className="font-bold">{acara.judul}</div>
                                        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                            {acara.kategori?.nama_kategori || 'Tanpa Kategori'}
                                        </span>
                                        <div className="mt-2 text-xs text-gray-500">
                                            {/* Link ke detail Acara opsional di masa depan */}
                                            <a href="#" className="text-blue-500 hover:text-blue-700 font-medium mr-2">
                                                Cek Detail Event
                                            </a>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        <div className="font-medium text-gray-900">{acara.penyelenggara.nama_penyelenggara}</div>
                                        <div className="text-xs">Diajukan oleh: {acara.pengaju.nama}</div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-xs text-gray-500">
                                        <div className="font-medium">Mulai: {formatDateTime(acara.waktu_mulai)}</div>
                                        <div className="font-medium">Selesai: {formatDateTime(acara.waktu_selesai)}</div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                        {/* Tautan ke poster */}
                                        <a href={acara.poster_url || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 mr-3">
                                            Cek Poster
                                        </a>
                                        <button
                                            onClick={() => openModal(acara, 'Published')}
                                            className="rounded-md bg-primary px-3 py-1.5 text-white shadow-sm hover:bg-primary-hover mr-3 transition-colors"
                                        >
                                            Publish
                                        </button>
                                        <button
                                            onClick={() => openModal(acara, 'Rejected')}
                                            className="rounded-md bg-red-500 px-3 py-1.5 text-white shadow-sm hover:bg-red-600 transition-colors"
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            
            <ModalValidation />
        </div>
    );
}