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
        Schema::create('penyelenggara', function (Blueprint $table) {
            $table->id();
            $table->string('nama_penyelenggara');
            $table->enum('tipe', ['Internal', 'Eksternal']); // Membedakan HIMA/UKM dengan instansi luar
            $table->string('deskripsi_singkat')->nullable();
            $table->string('logo_url')->nullable(); // Path ke file logo
            $table->string('dokumen_validasi_url')->nullable(); // Path ke file PDF/dokumen proposal
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penyelenggara');
    }
};