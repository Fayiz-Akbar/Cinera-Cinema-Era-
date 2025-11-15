<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kategori extends Model
{
    use HasFactory;

    protected $table = 'kategori';
    protected $fillable = ['nama_kategori', 'slug'];

    /**
     * Relasi 1-ke-Banyak: Satu Kategori memiliki banyak Acara.
     */
    public function acara()
    {
        return $this->hasMany(Acara::class, 'id_kategori');
    }
}