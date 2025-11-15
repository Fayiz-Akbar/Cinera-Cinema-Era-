<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PengelolaPenyelenggara; // <-- Model PIVOT
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ValidasiPenyelenggaraController extends Controller
{
    /**
     * Mengambil semua pengajuan penyelenggara yang masih 'Pending'.
     * (GET /api/admin/validasi/penyelenggara)
     */
    public function index()
    {
        // Ambil data pivot yang statusnya 'Pending'
        // 'with' akan mengambil data dari relasi 'penyelenggara' dan 'pengguna'
        // yang baru saja kita buat di Model.
        $submissions = PengelolaPenyelenggara::where('status_tautan', 'Pending')
            ->with('penyelenggara', 'pengguna')
            ->latest()
            ->get();

        return response()->json($submissions);
    }

    /**
     * Memvalidasi (Approve/Reject) satu pengajuan penyelenggara.
     * (POST /api/admin/validasi/penyelenggara/{id})
     * {id} di sini adalah ID dari tabel 'pengelola_penyelenggara'
     */
    public function validatePenyelenggara(Request $request, string $id)
    {
        // 1. Validasi input dari Admin
        $validator = Validator::make($request->all(), [
            'status_tautan' => ['required', Rule::in(['Approved', 'Rejected'])],
            'catatan_admin' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // 2. Cari data pengajuan di tabel pivot
        $submission = PengelolaPenyelenggara::find($id);

        if (!$submission) {
            return response()->json(['message' => 'Data pengajuan tidak ditemukan'], 404);
        }

        // 3. Update status dan tambahkan catatan
        $submission->update([
            'status_tautan' => $request->status_tautan,
            'catatan_admin' => $request->catatan_admin,
        ]);

        return response()->json([
            'message' => 'Validasi berhasil disimpan.',
            'data' => $submission
        ]);
    }
}