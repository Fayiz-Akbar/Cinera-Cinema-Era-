<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kategori; // <-- Import Model Kategori
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator; // <-- Import Validator
use Illuminate\Support\Str; // <-- Import Str untuk membuat slug

class KategoriController extends Controller
{
    /**
     * Menampilkan semua kategori.
     * (GET /api/admin/kategori)
     */
    public function index()
    {
        $kategori = Kategori::orderBy('nama_kategori', 'asc')->get();
        return response()->json($kategori);
    }

    /**
     * Menyimpan kategori baru.
     * (POST /api/admin/kategori)
     */
    public function store(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'nama_kategori' => 'required|string|max:255|unique:kategori,nama_kategori',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422); // 422 Unprocessable Entity
        }

        // Buat dan simpan kategori baru
        $kategori = Kategori::create([
            'nama_kategori' => $request->nama_kategori,
            'slug' => Str::slug($request->nama_kategori, '-'),
        ]);

        return response()->json($kategori, 201); // 201 Created
    }

    /**
     * Menampilkan satu kategori.
     * (GET /api/admin/kategori/{id})
     */
    public function show(string $id)
    {
        $kategori = Kategori::find($id);

        if (!$kategori) {
            return response()->json(['message' => 'Kategori tidak ditemukan'], 404);
        }

        return response()->json($kategori);
    }

    /**
     * Memperbarui kategori.
     * (PUT /api/admin/kategori/{id})
     */
    public function update(Request $request, string $id)
    {
        $kategori = Kategori::find($id);

        if (!$kategori) {
            return response()->json(['message' => 'Kategori tidak ditemukan'], 404);
        }

        // Validasi input (unique tapi abaikan ID saat ini)
        $validator = Validator::make($request->all(), [
            'nama_kategori' => 'required|string|max:255|unique:kategori,nama_kategori,' . $id,
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Update kategori
        $kategori->update([
            'nama_kategori' => $request->nama_kategori,
            'slug' => Str::slug($request->nama_kategori, '-'),
        ]);

        return response()->json($kategori);
    }

    /**
     * Menghapus kategori.
     * (DELETE /api/admin/kategori/{id})
     */
    public function destroy(string $id)
    {
        $kategori = Kategori::find($id);

        if (!$kategori) {
            return response()->json(['message' => 'Kategori tidak ditemukan'], 404);
        }

        $kategori->delete();

        return response()->json(null, 204); // 204 No Content
    }
}