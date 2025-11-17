<?php

namespace App\Http\Controllers;

use App\Models\User; // <-- Model User
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash; // <-- Untuk enkripsi password
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    /**
     * Menangani registrasi user baru.
     * (POST /api/register)
     */
    public function register(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:pengguna,email',
            'kata_sandi' => ['required', 'confirmed', Password::min(8)],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Buat user baru
        $user = User::create([
            'nama' => $request->nama,
            'email' => $request->email,
            'kata_sandi' => Hash::make($request->kata_sandi),
            'peran' => 'User', // Default peran adalah 'User'
        ]);

        // Buat token API untuk user
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Registrasi berhasil',
            'user' => $user,
            'token' => $token
        ], 201);
    }

    /**
     * Menangani login user.
     * (POST /api/login)
     */
    public function login(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'kata_sandi' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Coba autentikasi (cocokkan email & kata_sandi)
        // Kita harus spesifik memberitahu Auth untuk menggunakan 'kata_sandi'
        if (!Auth::attempt(['email' => $request->email, 'password' => $request->kata_sandi])) {
            return response()->json(['message' => 'Email atau password salah'], 401); // 401 Unauthorized
        }

        // Dapatkan data user
        $user = User::where('email', $request->email)->firstOrFail();

        // Hapus token lama (jika ada) dan buat token baru
        $user->tokens()->delete();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login berhasil',
            'user' => $user, // Kirim data user (termasuk peran)
            'token' => $token
        ]);
    }

    /**
     * Menangani logout user.
     * (POST /api/logout)
     */
    public function logout(Request $request)
    {
        // Hapus token yang sedang dipakai
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logout berhasil'], 200);
    }
}