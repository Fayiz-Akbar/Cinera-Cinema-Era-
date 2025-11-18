import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; // Nanti kita buat
import Footer from './Footer'; // Nanti kita buat

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-unila-light text-unila-deep">
      {/* Navbar akan selalu ada di bagian atas */}
      <Navbar />

      {/* Konten utama halaman akan dirender di sini */}
      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>

      {/* Footer akan selalu ada di bagian bawah */}
      <Footer />
    </div>
  );
}