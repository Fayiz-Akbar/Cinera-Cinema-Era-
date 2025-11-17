import axiosClient from "./axiosClient"; // <-- Menggunakan client yang sama

/**
 * Berisi semua API call untuk PJ 3 (Registrasi Pengguna)
 * Rute-rute ini memerlukan login (auth:sanctum),
 * axiosClient akan otomatis menanganinya.
 */
const registrationApi = {
  /**
   * Mendaftarkan user ke sebuah acara
   * (Sesuai dengan rute: POST /api/registration/daftar)
   * @param {number} idAcara - ID dari acara yang akan didaftar
   */
  daftarKeAcara: (idAcara) => {
    // Kirim 'id_acara' di dalam body request,
    // sesuai yang diharapkan PendaftaranController.php
    return axiosClient.post("/registration/daftar", { id_acara: idAcara });
  },

  /**
   * Mengambil "Agenda Saya" (acara yang sudah didaftar user)
   * (Sesuai dengan rute: GET /api/registration/agenda)
   */
  getAgendaSaya: () => {
    return axiosClient.get("/registration/agenda");
  },
};

export default registrationApi;