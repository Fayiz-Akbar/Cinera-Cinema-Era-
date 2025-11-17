<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Acara; // <-- Import Model Acara
use App\Models\Kategori; // <-- Import Model Kategori

class PublicAcaraController extends Controller
{
    /**
     * Sesuai rute: GET /acara
     * Menampilkan daftar semua acara yang sudah 'Published'.
     * Ini untuk HomePage (PJ 3).
     */
    public function index()
    {
        // 1. Ambil data Acara
        // 2. Filter HANYA yang statusnya 'Published' (sesuai aturan bisnis)
        // 3. Ambil juga relasi 'kategori' dan 'penyelenggara' (Eager Loading)
        // 4. Urutkan berdasarkan yang paling baru
        $acara = Acara::where('status', 'Published')
                      ->with('kategori', 'penyelenggara') //
                      ->latest() // Mengurutkan dari yang terbaru (created_at)
                      ->get();

        // Kembalikan data sebagai JSON
        return response()->json($acara);
    }

    /**
     * Sesuai rute: GET /acara/{slug}
     * Menampilkan detail satu acara berdasarkan SLUG.
     * Ini untuk Halaman AcaraDetailPage.jsx (PJ 3).
     */
    public function show($slug) // <-- Menerima $slug dari URL
    {
        try {
            // Ambil 1 acara berdasarkan SLUG,
            // pastikan statusnya 'Published' dan ambil relasinya
            $acara = Acara::where('slug', $slug) // <-- Cari berdasarkan 'slug'
                          ->where('status', 'Published')
                          ->with('kategori', 'penyelenggara')
                          ->firstOrFail(); // firstOrFail akan error 404 jika tidak ketemu

            return response()->json($acara);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Jika acara tidak ditemukan (atau statusnya bukan Published)
            return response()->json([
                'message' => 'Acara tidak ditemukan atau belum dipublikasi.'
            ], 404);
        }
    }

    /**
     * Sesuai rute: GET /kategori
     * Mengambil semua kategori untuk fitur Filter.
     * Ini untuk komponen SearchFilter.jsx (PJ 3).
     */
    public function getAllKategori()
    {
        $kategori = Kategori::orderBy('nama_kategori', 'asc')->get();
        return response()->json($kategori);
    }
}