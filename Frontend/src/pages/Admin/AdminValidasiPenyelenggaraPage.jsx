// Frontend/src/pages/Admin/AdminValidasiPenyelenggaraPage.jsx

import { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import { format } from 'date-fns';

export default function AdminValidasiPenyelenggaraPage() {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState({
        isOpen: false,
        id: null,
        status: null, // 'Approved' or 'Rejected'
        catatan: '',
        penyelenggaraNama: '',
    });

    const fetchSubmissions = async () => {
        setLoading(true);
        try {
            // GET /api/admin/validasi/penyelenggara
            const response = await axiosClient.get('/admin/validasi/penyelenggara');
            setSubmissions(response.data);
            setError(null);
        } catch (err) {
            console.error("Fetch Error:", err);
            setError('Gagal mengambil data pengajuan. Pastikan Backend berjalan.');
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
            penyelenggaraNama: submission.penyelenggara.nama_penyelenggara,
            id_pengguna: submission.pengguna.nama, // Tambahkan nama pengguna
        });
    };

    const closeModal = () => {
        setModal({ isOpen: false, id: null, status: null, catatan: '', penyelenggaraNama: '', id_pengguna: '' });
        setError(null);
    };

    const handleValidation = async (e) => {
        e.preventDefault();
        setError(null);
        
        try {
            // POST /api/admin/validasi/penyelenggara/{id}
            await axiosClient.post(`/admin/validasi/penyelenggara/${modal.id}`, {
                status_tautan: modal.status,
                catatan_admin: modal.catatan.trim(),
            });

            closeModal();
            fetchSubmissions();
        } catch (err) {
            console.error("Validation Error:", err);
            const msg = err.response?.data?.message || 'Gagal menyimpan validasi. Coba lagi.';
            setError(msg);
        }
    };

    // --- JSX Component (Modal) ---
    const ModalValidation = () => {
        if (!modal.isOpen) return null;

        const isApproved = modal.status === 'Approved';
        const title = isApproved ? 'Setujui Pengajuan' : 'Tolak Pengajuan';
        const buttonText = isApproved ? 'Setujui' : 'Tolak Permanen';
        const buttonColor = isApproved ? 'bg-primary hover:bg-primary-hover focus:ring-primary' : 'bg-red-600 hover:bg-red-700 focus:ring-red-500';
        const inputBorder = isApproved ? 'focus:border-primary focus:ring-primary' : 'focus:border-red-500 focus:ring-red-500';
        const requiredNote = !isApproved;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70">
                <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">
                    <h3 className={`text-2xl font-bold ${isApproved ? 'text-primary' : 'text-red-600'} mb-4`}>
                        {title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Anda akan memproses pengajuan **{modal.penyelenggaraNama}** (Diajukan oleh **{modal.id_pengguna}**).
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
                                placeholder={isApproved ? "Opsional: Beri selamat atau instruksi." : "Wajib: Jelaskan alasan penolakan."}
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
                Validasi Pengajuan Penyelenggara
            </h1>
            <p className="mt-1 text-gray-500 mb-6">
                Tinjau dan setujui tautan antara Pengguna (User) dan Penyelenggara (HIMA/UKM). Total: {submissions.length} Pending.
            </p>
            
            {submissions.length === 0 ? (
                <div className="rounded-lg bg-green-50 p-6 text-center shadow-xl border-t-4 border-green-500">
                    <p className="text-lg font-semibold text-green-800">Semua pengajuan telah diverifikasi! Tidak ada data pending saat ini.</p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-lg bg-white shadow-xl">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-secondary">
                                    Penyelenggara
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-secondary">
                                    Diajukan Oleh
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-secondary">
                                    Tanggal Ajuan
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider text-secondary">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {submissions.map((sub) => (
                                <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-secondary">
                                        <div className="font-bold">{sub.penyelenggara.nama_penyelenggara}</div>
                                        <div className="text-xs text-gray-500">{sub.penyelenggara.deskripsi_singkat || '-'}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        <div className="font-medium text-gray-900">{sub.pengguna.nama}</div>
                                        <div className="text-xs">{sub.pengguna.email}</div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        {format(new Date(sub.created_at), 'dd MMM yyyy, HH:mm')}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                        <button
                                            onClick={() => openModal(sub, 'Approved')}
                                            className="rounded-md bg-primary px-3 py-1.5 text-white shadow-sm hover:bg-primary-hover mr-3 transition-colors"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => openModal(sub, 'Rejected')}
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