/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
    },
  },
  plugins: [],
}