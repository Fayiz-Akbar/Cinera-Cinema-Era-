// Frontend/src/router.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';

// --- Components & Layouts ---
import ProtectedRoute from './components/Common/ProtectedRoute.jsx';
import AdminLayout from './components/Common/AdminLayout.jsx'; // Layout Admin (Sidebar dll)
import Layout from './components/Common/Layout.jsx'; // Layout Publik (Navbar & Footer)

// --- Pages ---
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import AcaraDetailPage from './pages/AcaraDetailPage.jsx';
import AgendaSayaPage from './pages/AgendaSayaPage.jsx';

// --- Admin Pages ---
import AdminDashboardPage from './pages/Admin/AdminDashboardPage.jsx';
import AdminKategoriPage from './pages/Admin/AdminKategoriPage.jsx';

const router = createBrowserRouter([
  {
    element: <App />, // Root element
    children: [
      // ====================================================
      // 1. HALAMAN STANDALONE (Tanpa Navbar/Footer Utama)
      // ====================================================
      // Login & Register ditaruh di sini agar bersih
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },

      // ====================================================
      // 2. HALAMAN PUBLIK (Dengan Navbar & Footer)
      // ====================================================
      {
        element: <Layout />, // Membungkus halaman di bawahnya dengan Navbar/Footer
        children: [
          { path: '/', element: <HomePage /> },
          { path: '/acara/:slug', element: <AcaraDetailPage /> },
          { path: '/agenda-saya', element: <AgendaSayaPage /> },
        ]
      },

      // ====================================================
      // 3. HALAMAN ADMIN (Protected)
      // ====================================================
      {
        path: '/admin', // Prefix path
        element: <ProtectedRoute adminOnly={true} />, // Cek Login & Role
        children: [
          {
            element: <AdminLayout />, // Layout Admin
            children: [
              { path: 'dashboard', element: <AdminDashboardPage /> },
              { path: 'kategori', element: <AdminKategoriPage /> },
            ]
          }
        ]
      },
      
      // Fallback untuk 404 (Opsional)
      { path: '*', element: <div>404 Not Found</div> }
    ]
  }
]);

const AppRouter = () => <RouterProvider router={router} />;
export default AppRouter;