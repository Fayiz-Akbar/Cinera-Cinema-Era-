<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penyelenggara extends Model
{
    use HasFactory;

    protected $table = 'penyelenggara';
    protected $fillable = [
        'nama_penyelenggara',
        'tipe',
        'deskripsi_singkat',
        'logo_url',
        'dokumen_validasi_url',
    ];

    /**
     * Relasi 1-ke-Banyak: Satu Penyelenggara mengadakan banyak Acara.
     */
    public function acara()
    {
        return $this->hasMany(Acara::class, 'id_penyelenggara');
    }

    /**
     * Relasi Banyak-ke-Banyak: Satu Penyelenggara dikelola oleh banyak User.
     */
    public function pengelola()
    {
        return $this->belongsToMany(User::class, 'pengelola_penyelenggara', 'id_penyelenggara', 'id_pengguna')
            ->withPivot('status_tautan', 'catatan_admin')
            ->withTimestamps();
    }
}