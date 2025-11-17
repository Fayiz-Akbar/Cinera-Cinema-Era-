// Frontend/tailwind.config.js

import colors from 'tailwindcss/colors'; // <-- 1. Import 'colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // --- 2. Tambahkan blok ini ---
      colors: {
        primary: colors.sky, // Buat 'primary' sebagai alias untuk 'sky'
      }
      // -------------------------
    },
  },
  plugins: [],
}