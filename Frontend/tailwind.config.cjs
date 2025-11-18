/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <-- Path ini sudah benar
  ],
  theme: {
    extend: {
      colors: {
        // Palet Warna UnilaFest (Tema Ungu)
        unila: {
          light: '#CBC9CC', // abu terang
          medium: '#9C90AA', // abu sedang
          DEFAULT: '#6E6189', // ungu keabu-abuan (UTAMA)
          dark: '#443A67', // ungu gelap sedang
          extradark: '#211E46', // ungu gelap kuat
          deep: '#0A0B24', // ungu paling gelap (hampir hitam)
          black: '#000003', // hitam murni
        },
      },
    },
  },
  plugins: [],
}