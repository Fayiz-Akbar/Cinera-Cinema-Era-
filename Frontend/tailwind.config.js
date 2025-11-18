<<<<<<< HEAD
=======
// Frontend/tailwind.config.js

import colors from 'tailwindcss/colors'; // <-- 1. Import 'colors'

>>>>>>> 4d71540ba6ce03c37bce028172f2ea014e7224f0
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
<<<<<<< HEAD
      colors: {
        // Palet Warna UnilaFest dari Anda
        unila: {
          light: '#CBC9CC', // abu terang
          medium: '#9C90AA', // abu sedang
          DEFAULT: '#6E6189', // ungu keabu-abuan
          dark: '#443A67', // ungu gelap sedang
          extradark: '#211E46', // ungu gelap kuat
          deep: '#0A0B24', // ungu paling gelap (hampir hitam)
          black: '#000003', // hitam murni
        },
      },
      fontFamily: {
        // Anda bisa menambahkan font kustom di sini jika ingin
        // sans: ['Inter', 'sans-serif'],
      },
=======
      // --- 2. Tambahkan blok ini ---
      colors: {
        primary: colors.sky, // Buat 'primary' sebagai alias untuk 'sky'
      }
      // -------------------------
>>>>>>> 4d71540ba6ce03c37bce028172f2ea014e7224f0
    },
  },
  plugins: [],
}