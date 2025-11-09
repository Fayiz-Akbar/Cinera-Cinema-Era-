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
        Schema::create('pengelola_penyelenggara', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_pengguna')->constrained('pengguna')->onDelete('cascade');
            $table->foreignId('id_penyelenggara')->constrained('penyelenggara')->onDelete('cascade');
            
            // Kolom ini MENEGAKKAN aturan validasi Admin
            $table->enum('status_tautan', ['Pending', 'Approved', 'Rejected'])->default('Pending');
            $table->text('catatan_admin')->nullable(); // Alasan jika ditolak
            
            $table->timestamps();

            // Memastikan satu pengguna tidak bisa mendaftar duplikat ke penyelenggara yang sama
            $table->unique(['id_pengguna', 'id_penyelenggara']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengelola_penyelenggara');
    }
};