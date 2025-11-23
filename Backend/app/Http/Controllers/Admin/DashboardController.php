<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Acara;
use App\Models\PengelolaPenyelenggara;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Mengembalikan data statistik untuk dashboard Admin.
     * GET /api/admin/dashboard-stats
     */
    public function index(Request $request)
    {
        // 1. Hitung Statistik Kartu Utama
        // Menghitung jumlah data berdasarkan status tertentu
        $counts = [
            'penyelenggara_pending' => PengelolaPenyelenggara::where('status_tautan', 'Pending')->count(),
            'acara_pending' => Acara::where('status', 'Pending')->count(),
            'acara_published' => Acara::where('status', 'Published')->count(),
            'total_user' => User::count(),
        ];

        // 2. Hitung Pie Chart (Status Pengajuan Acara)
        // Format data disesuaikan dengan library Recharts di Frontend (name, value)
        $submissionStatus = [
            [
                'name' => 'Published',
                'value' => Acara::where('status', 'Published')->count()
            ],
            [
                'name' => 'Rejected',
                'value' => Acara::where('status', 'Rejected')->count()
            ],
            [
                'name' => 'Pending',
                'value' => Acara::where('status', 'Pending')->count()
            ],
        ];

        // 3. Hitung Grafik Tren Registrasi (Line Chart) 
        // Menggunakan parameter 'range' dari request (default: 6m = 6 bulan)
        $range = $request->query('range', '6m'); 
        
        // Tentukan batas waktu awal (startDate) dan format tampilan tanggal
        $startDate = now();
        $format = 'Y-m-d'; // Default
        
        switch ($range) {
            case '1w':
                $startDate = now()->subWeek();
                $format = 'D'; // Nama hari (Sen, Sel...)
                break;
            case '1m':
                $startDate = now()->subMonth();
                $format = 'd M'; // Tanggal (01 Jan)
                break;
            case '3m':
                $startDate = now()->subMonths(3);
                $format = 'M Y'; // Bulan (Jan 2025)
                break;
            case '6m':
                $startDate = now()->subMonths(6);
                $format = 'M Y';
                break;
            case '1y':
                $startDate = now()->subYear();
                $format = 'M Y';
                break;
        }

        // Query Aggregate: Menghitung jumlah user baru per tanggal/bulan
        // Menggunakan DB::raw untuk kompatibilitas (sesuaikan sintaks DATE() jika pakai PostgreSQL)
        $users = User::select(DB::raw("DATE(created_at) as date"), DB::raw('count(*) as count'))
            ->where('created_at', '>=', $startDate)
            ->groupBy('date')
            ->orderBy('date', 'ASC')
            ->get();

        // Format data agar sesuai dengan Recharts { label: '...', count: 10 }
        $trendData = [];
        foreach($users as $u) {
            $trendData[] = [
                'label' => Carbon::parse($u->date)->format($format),
                'count' => $u->count
            ];
        }

        // Kembalikan semua data dalam format JSON
        return response()->json([
            'counts' => $counts,
            'submission_status' => $submissionStatus,
            'registration_trend' => $trendData
        ]);
    }
}