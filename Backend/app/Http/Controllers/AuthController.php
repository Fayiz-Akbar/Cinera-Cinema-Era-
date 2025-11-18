<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;      // <-- PENTING: Untuk cek password manual
use Illuminate\Support\Facades\Validator; // <-- PENTING: Untuk validasi

class AuthController extends Controller
{
    /**
     * Handle Login Request
     */
    public function login(Request $request)
    {
        // 1. Validasi Input
        // Pastikan frontend mengirim 'email' dan 'password'
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        // 2. Cari User secara manual berdasarkan Email
        $user = User::where('email', $request->email)->first();

        // 3. Cek Password secara manual
        // Kita bandingkan input 'password' dengan hash di kolom 'kata_sandi' di database.
        // Jika user tidak ditemukan ATAU password salah, kirim error 401.
        if (!$user || !Hash::check($request->password, $user->kata_sandi)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Email atau kata sandi salah.',
            ], 401);
        }

        // 4. (Opsional) Hapus token lama agar login bersifat single-device
        // $user->tokens()->delete();

        // 5. Buat Token Baru (Laravel Sanctum)
        $token = $user->createToken('auth_token')->plainTextToken;

        // 6. Kembalikan Response Sukses
        return response()->json([
            'status' => 'success',
            'message' => 'Login berhasil',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ]);
    }

    /**
     * Handle Register Request
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:pengguna,email', // Cek tabel 'pengguna'
            'password' => 'required|string|min:8', // Hapus 'confirmed' jika form frontend tidak ada konfirmasi password
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Buat user baru
        $user = User::create([
            'nama' => $request->nama,
            'email' => $request->email,
            'kata_sandi' => Hash::make($request->password), // Manual hash ke kolom 'kata_sandi'
            'peran' => 'User', // Default role
        ]);

        // Langsung buat token agar user otomatis login setelah register
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Registrasi berhasil',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ], 201);
    }

    /**
     * Handle Logout Request
     */
    public function logout(Request $request)
    {
        // Hapus token yang sedang dipakai saat ini (Current Access Token)
        if ($request->user()) {
            $request->user()->currentAccessToken()->delete();
        }

        return response()->json([
            'message' => 'Logout berhasil'
        ]);
    }
}