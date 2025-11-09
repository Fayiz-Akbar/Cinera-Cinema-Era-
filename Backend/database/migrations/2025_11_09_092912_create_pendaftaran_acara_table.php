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
        Schema::create('pendaftaran_acara', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_pengguna')->constrained('pengguna')->onDelete('cascade');
            $table->foreignId('id_acara')->constrained('acara')->onDelete('cascade');
            
            // Menambah waktu_dibuat sebagai "waktu_pendaftaran"
            $table->timestamps(); 

            // Pengguna hanya bisa mendaftar satu kali ke acara yang sama
            $table->unique(['id_pengguna', 'id_acara']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pendaftaran_acara');
    }
};