import axiosClient from "./axiosClient"; // <-- Menggunakan client yang sudah ada

/**
 * Berisi semua API call untuk PJ 3 (Publik)
 */
const publicApi = {
  /**
   * Mengambil semua acara yang 'Published'
   * (Sesuai dengan rute: GET /api/acara)
   */
  getPublicAcara: () => {
    return axiosClient.get("/acara");
  },

  /**
   * Mengambil detail satu acara berdasarkan slug
   * (Sesuai dengan rute: GET /api/acara/{slug})
   */
  getAcaraDetailBySlug: (slug) => {
    return axiosClient.get(`/acara/${slug}`);
  },

  /**
   * Mengambil semua kategori untuk filter
   * (Sesuai dengan rute: GET /api/kategori)
   */
  getAllKategori: () => {
    return axiosClient.get("/kategori");
  },
};

export default publicApi;