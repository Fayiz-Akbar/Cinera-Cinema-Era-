import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const commonLinkClasses = "px-3 py-2 rounded-md text-sm font-medium";
  const activeLinkClasses = "bg-unila-dark text-white";
  const inactiveLinkClasses = "text-unila-light hover:bg-unila-dark hover:text-white";

  return (
    <nav className="bg-unila-deep p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Nama Proyek */}
        <div className="flex items-center">
          <Link to="/" className="text-white text-2xl font-bold tracking-wider">
            UnilaFest
          </Link>
        </div>

        {/* Navigasi Utama */}
        <div className="hidden md:flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${commonLinkClasses} ${activeLinkClasses}` : `${commonLinkClasses} ${inactiveLinkClasses}`
            }
          >
            Beranda
          </NavLink>
          <NavLink
            to="/events" // Nanti kita buat halaman ini atau pakai '/'
            className={({ isActive }) =>
              isActive ? `${commonLinkClasses} ${activeLinkClasses}` : `${commonLinkClasses} ${inactiveLinkClasses}`
            }
          >
            Semua Acara
          </NavLink>
          <NavLink
            to="/agenda-saya"
            className={({ isActive }) =>
              isActive ? `${commonLinkClasses} ${activeLinkClasses}` : `${commonLinkClasses} ${inactiveLinkClasses}`
            }
          >
            Agenda Saya
          </NavLink>
          {/* Tambahkan link lain seperti "Tentang Kami", "Kontak" jika ada */}
        </div>

        {/* Tombol Login/Register atau Profil User */}
        <div className="flex items-center space-x-4">
          {/* Ini nanti akan diisi dengan logika autentikasi (misal: if user logged in, show profile, else show login/register) */}
          <Link
            to="/login"
            className="bg-unila-dark text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-unila-extradark transition-colors"
          >
            Masuk
          </Link>
          <Link
            to="/register"
            className="border border-unila-dark text-unila-dark px-4 py-2 rounded-md text-sm font-medium hover:bg-unila-dark hover:text-white transition-colors"
          >
            Daftar
          </Link>
        </div>

        {/* Mobile menu button (akan ditambahkan nanti) */}
        {/* <div className="md:hidden">
          <button className="text-white">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div> */}
      </div>
    </nav>
  );
}