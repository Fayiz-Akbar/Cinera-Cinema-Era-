<?php

namespace App\Http\Controllers\Registration; // <-- Pastikan namespace-nya benar

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Acara; // Import model Acara
use Illuminate\Support\Facades\Auth; // Import helper Auth

class PendaftaranController extends Controller
{
    /**
     * Sesuai rute: POST /registration/daftar
     * Mendaftarkan user yang sedang login ke sebuah acara.
     * Ini memerlukan login (sudah diatur oleh middleware 'auth:sanctum').
     */
    public function store(Request $request)
    {
        // 1. Validasi input: kita butuh 'id_acara'
        $request->validate([
            'id_acara' => 'required|integer|exists:acara,id',
        ]);

        // 2. Dapatkan user yang sedang login
        $user = Auth::user();

        // 3. Dapatkan ID acara dari request
        $idAcara = $request->id_acara;

        // 4. Cek apakah user sudah terdaftar di acara ini?
        // Kita gunakan relasi 'acaraYangDidafari' dari User.php
        $isAlreadyRegistered = $user->acaraYangDidafari()
                                    ->where('acara.id', $idAcara)
                                    ->exists();

        if ($isAlreadyRegistered) {
            return response()->json([
                'message' => 'Anda sudah terdaftar di acara ini.'
            ], 422); // 422 Unprocessable Entity
        }

        // 5. Jika belum, daftarkan user (attach ke pivot table)
        try {
            $user->acaraYangDidafari()->attach($idAcara);

            return response()->json([
                'message' => 'Pendaftaran berhasil!'
            ], 201); // 201 Created

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat mendaftar.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Sesuai rute: GET /registration/agenda
     * Menampilkan "Agenda Saya" (semua acara yang didaftar user).
     * Ini memerlukan login.
     */
    public function index()
    {
        // 1. Dapatkan user yang sedang login
        $user = Auth::user();

        // 2. Ambil semua acara yang didaftar oleh user ini
        // Kita gunakan relasi 'acaraYangDidafari' dari User.php
        $agendaSaya = $user->acaraYangDidafari()
                           ->with('kategori', 'penyelenggara') // Ambil relasi juga
                           ->orderBy('waktu_mulai', 'asc') // Urutkan bds waktu
                           ->get();

        return response()->json($agendaSaya);
    }
}