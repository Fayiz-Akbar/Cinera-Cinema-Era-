<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PengelolaPenyelenggara extends Model
{
    use HasFactory;

    protected $table = 'pengelola_penyelenggara';

    protected $fillable = [
        'id_pengguna',
        'id_penyelenggara',
        'status_tautan',
        'catatan_admin',
    ];

    // --- TAMBAHAN RELASI (PENTING) ---

    /**
     * Relasi Balik: Catatan pivot ini milik satu Penyelenggara.
     */
    public function penyelenggara()
    {
        return $this->belongsTo(Penyelenggara::class, 'id_penyelenggara');
    }

    /**
     * Relasi Balik: Catatan pivot ini milik satu Pengguna (User).
     */
    public function pengguna()
    {
        return $this->belongsTo(User::class, 'id_pengguna');
    }
}