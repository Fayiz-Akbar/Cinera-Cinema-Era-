// Frontend/src/router.jsx

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import ProtectedRoute from './components/Common/ProtectedRoute.jsx';
import AdminLayout from './components/Common/AdminLayout.jsx'; // <-- Layout Admin

// --- 1. IMPORT LAYOUT BARU KITA ---
import Layout from './components/Common/Layout.jsx'; 

// Import Halaman
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import AdminDashboardPage from './pages/Admin/AdminDashboardPage.jsx';
import AdminKategoriPage from './pages/Admin/AdminKategoriPage.jsx';
import AcaraDetailPage from './pages/AcaraDetailPage.jsx';
import AgendaSayaPage from './pages/AgendaSayaPage.jsx';
// (Kita mungkin butuh 'Link' untuk 404 nanti)


// Definisikan rute
const router = createBrowserRouter([
  {
    element: <App />, // <-- Biarkan App.jsx sebagai root
    children: [
      
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