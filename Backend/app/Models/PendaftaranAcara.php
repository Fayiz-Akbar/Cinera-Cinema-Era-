<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PendaftaranAcara extends Model
{
    use HasFactory;

    /**
     * Mendefinisikan tabel pivot secara eksplisit
     */
    protected $table = 'pendaftaran_acara';

    protected $fillable = [
        'id_pengguna',
        'id_acara',
    ];
}