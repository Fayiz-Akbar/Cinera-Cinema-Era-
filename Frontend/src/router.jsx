// Frontend/src/router.jsx
// (PJ 1 - GATEKEEPER)

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import ProtectedRoute from './components/Common/ProtectedRoute.jsx';
import AdminLayout from './components/Common/AdminLayout.jsx';

// Import Halaman
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import AdminDashboardPage from './pages/Admin/AdminDashboardPage.jsx';
import AdminKategoriPage from './pages/Admin/AdminKategoriPage.jsx';
import AcaraDetailPage from './pages/AcaraDetailPage.jsx'; // (Sudah kita tambahkan)

// --- 1. IMPORT HALAMAN BARU KITA (PJ 3) ---
import AgendaSayaPage from './pages/AgendaSayaPage.jsx';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      // == Rute Publik (PJ 2 & 3) ==
      { path: '/', element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/acara/:slug', element: <AcaraDetailPage /> },
      
      // --- 2. TAMBAHKAN RUTE AGENDA SAYA (PJ 3) ---
      // Rute ini memerlukan login, tapi kita tangani di dalam
      // komponen halamannya (redirect jika belum login)
      {
        path: '/agenda-saya',
        element: <AgendaSayaPage />,
      },
      // ---------------------------------------------

      // == RUTE ADMIN TERPROTEKSI (PJ 1) ==
      {
        element: <ProtectedRoute adminOnly={true} />,
        children: [
          {
            element: <AdminLayout />,
            children: [
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
    ]
  }
]);

const AppRouter = () => <RouterProvider router={router} />;
export default AppRouter;