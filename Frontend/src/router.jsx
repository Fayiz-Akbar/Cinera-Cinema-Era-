// Frontend/src/router.jsx

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import ProtectedRoute from './components/Common/ProtectedRoute.jsx';
import AdminLayout from './components/Common/AdminLayout.jsx'; // <-- Layout Admin

<<<<<<< HEAD
// --- 1. IMPORT LAYOUT BARU KITA ---
import Layout from './components/Common/Layout.jsx'; 

// Import Halaman
=======
// Import Halaman YANG SUDAH ADA
>>>>>>> 4d71540ba6ce03c37bce028172f2ea014e7224f0
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import AdminDashboardPage from './pages/Admin/AdminDashboardPage.jsx';
import AdminKategoriPage from './pages/Admin/AdminKategoriPage.jsx';
<<<<<<< HEAD
import AcaraDetailPage from './pages/AcaraDetailPage.jsx';
import AgendaSayaPage from './pages/AgendaSayaPage.jsx';
// (Kita mungkin butuh 'Link' untuk 404 nanti)
=======

// Halaman-halaman ini belum ada, jadi kita KOMENTARI dulu
// import AcaraDetailPage from './pages/AcaraDetailPage.jsx';
// import AgendaSayaPage from './pages/AgendaSayaPage.jsx';
>>>>>>> 4d71540ba6ce03c37bce028172f2ea014e7224f0


// Definisikan rute
const router = createBrowserRouter([
  {
    element: <App />, // <-- Biarkan App.jsx sebagai root
    children: [
<<<<<<< HEAD
      
      // --- 2. GRUP RUTE PUBLIK (Bungkus dengan Layout) ---
      {
        element: <Layout />, // <-- Gunakan Layout di sini
        children: [
          { path: '/', element: <HomePage /> },
          { path: '/login', element: <LoginPage /> },
          { path: '/register', element: <RegisterPage /> },
          { path: '/acara/:slug', element: <AcaraDetailPage /> },
          { path: '/agenda-saya', element: <AgendaSayaPage /> },
        ]
      },
      // ----------------------------------------------------

      // --- 3. GRUP RUTE ADMIN (Biarkan seperti ini, sudah benar) ---
=======
      // == Rute Publik (PJ 2 & 3) ==
      { path: '/', element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      // { path: '/acara/:slug', element: <AcaraDetailPage /> }, // Belum ada
      // { path: '/agenda-saya', element: <AgendaSayaPage /> }, // Belum ada
      
      // == RUTE ADMIN TERPROTEKSI (PJ 1) ==
>>>>>>> 4d71540ba6ce03c37bce028172f2ea014e7224f0
      {
        element: <ProtectedRoute adminOnly={true} />, // Pos Satpam
        children: [
          {
            element: <AdminLayout />, // Bungkus dengan Layout
            children: [
              // Halaman-halaman ini akan muncul di <Outlet> AdminLayout
              {
                path: '/admin/dashboard',
                element: <AdminDashboardPage />,
              },
              {
                path: '/admin/kategori',
                element: <AdminKategoriPage />,
              },
            ]
          }
        ]
      },
      // (Kita bisa tambahkan rute 404 di sini nanti jika perlu)
    ]
  }
]);

const AppRouter = () => <RouterProvider router={router} />;
export default AppRouter;