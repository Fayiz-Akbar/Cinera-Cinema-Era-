<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PengelolaPenyelenggara extends Model
{
    use HasFactory;

    /**
     * Mendefinisikan tabel pivot secara eksplisit
     */
    protected $table = 'pengelola_penyelenggara';

    protected $fillable = [
        'id_pengguna',
        'id_penyelenggara',
        'status_tautan',
        'catatan_admin',
    ];
}