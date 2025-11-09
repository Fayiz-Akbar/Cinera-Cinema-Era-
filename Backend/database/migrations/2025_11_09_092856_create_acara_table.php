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
            $table->string('poster_url')->nullable(); // Path ke file gambar poster
            
            // Relasi inti
            $table->foreignId('id_pengaju')->constrained('pengguna')->onDelete('restrict');
            $table->foreignId('id_penyelenggara')->constrained('penyelenggara')->onDelete('restrict');
            $table->foreignId('id_kategori')->constrained('kategori')->onDelete('restrict');

            // Detail Logistik
            $table->string('lokasi');
            $table->dateTime('waktu_mulai');
            $table->dateTime('waktu_selesai');
            $table->decimal('harga', 10, 2)->default(0); // 0 untuk gratis
            $table->string('link_pendaftaran')->nullable(); // Jika pendaftaran di luar sistem
            
            // Kolom ini MENEGAKKAN aturan validasi Admin untuk event
            $table->enum('status', ['Draft', 'Pending', 'Approved', 'Rejected', 'Published', 'Cancelled'])
                  ->default('Draft');
            
            $table->text('catatan_admin_acara')->nullable(); // Alasan jika ditolak
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('acara');
    }
};