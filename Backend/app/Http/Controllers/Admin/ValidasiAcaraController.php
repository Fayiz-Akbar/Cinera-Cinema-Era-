<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Acara; // <-- Import Model Acara
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ValidasiAcaraController extends Controller
{
    /**
     * Mengambil semua pengajuan acara yang masih 'Pending'.
     * (GET /api/admin/validasi/acara)
     */
    public function index()
    {
        // Ambil acara yang 'Pending', dan 'with' semua relasi
        // agar frontend bisa menampilkan info lengkap.
        $submissions = Acara::where('status', 'Pending')
            ->with('penyelenggara', 'pengaju', 'kategori')
            ->latest()
            ->get();

        return response()->json($submissions);
    }

    /**
     * Memvalidasi (Approve/Reject) satu pengajuan acara.
     * (POST /api/admin/validasi/acara/{id})
     * {id} di sini adalah ID dari tabel 'acara'.
     */
    public function validateAcara(Request $request, string $id)
    {
        // 1. Validasi input dari Admin
        // Status bisa 'Published' (Langsung tayang) atau 'Rejected'
        $validator = Validator::make($request->all(), [
            'status' => ['required', Rule::in(['Published', 'Rejected'])],
            'catatan_admin_acara' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // 2. Cari data acara
        $acara = Acara::find($id);

        if (!$acara) {
            return response()->json(['message' => 'Data acara tidak ditemukan'], 404);
        }

        // 3. Update status dan tambahkan catatan
        $acara->update([
            'status' => $request->status,
            'catatan_admin_acara' => $request->catatan_admin_acara,
        ]);

        // (Opsional: Kirim Notifikasi Email ke Pengaju/PJ 2)
        // ...

        return response()->json([
            'message' => 'Validasi acara berhasil disimpan.',
            'data' => $acara
        ]);
    }
}