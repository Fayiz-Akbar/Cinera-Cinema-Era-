<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('acara', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->string('slug')->unique();
            $table->text('deskripsi');
            $table->string('poster_url')->nullable();
            
            // Relasi inti
            $table->foreignId('id_pengaju')->constrained('pengguna')->onDelete('restrict');
            $table->foreignId('id_penyelenggara')->constrained('penyelenggara')->onDelete('restrict');
            $table->foreignId('id_kategori')->constrained('kategori')->onDelete('restrict');

            // Detail Logistik
            $table->string('lokasi');
            $table->dateTime('waktu_mulai');
            $table->dateTime('waktu_selesai');
            
            // Kolom untuk link GForm / WA
            $table->string('link_pendaftaran')->nullable(); 
            
            // Kolom validasi Admin
            $table->enum('status', ['Draft', 'Pending', 'Approved', 'Rejected', 'Published', 'Cancelled'])
                  ->default('Draft');
            
            $table->text('catatan_admin_acara')->nullable();
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('acara');
    }
};