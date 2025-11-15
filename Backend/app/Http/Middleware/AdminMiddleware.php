<?php

namespace App\Http;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Cek apakah user sudah login DAN memiliki peran 'Admin'
        if (Auth::check() && Auth::user()->peran == 'Admin') {
            // Jika ya, izinkan request lanjut
            return $next($request);
        }

        // Jika tidak, kirim respons 'Tidak diizinkan'
        return response()->json([
            'message' => 'Unauthorized. Anda harus menjadi Admin untuk mengakses rute ini.'
        ], 403); // 403 Forbidden
    }
}