// Frontend/src/router.jsx
// (PJ 1 - GATEKEEPER)

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import ProtectedRoute from './components/Common/ProtectedRoute.jsx';
import AdminLayout from './components/Common/AdminLayout.jsx'; // <-- Layout Admin

// Import Halaman YANG SUDAH ADA
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import AdminDashboardPage from './pages/Admin/AdminDashboardPage.jsx';
import AdminKategoriPage from './pages/Admin/AdminKategoriPage.jsx';

// Halaman-halaman ini belum ada, jadi kita KOMENTARI dulu
// import AcaraDetailPage from './pages/AcaraDetailPage.jsx';
// import AgendaSayaPage from './pages/AgendaSayaPage.jsx';


// Definisikan rute
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      // == Rute Publik (PJ 2 & 3) ==
      { path: '/', element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      // { path: '/acara/:slug', element: <AcaraDetailPage /> }, // Belum ada
      // { path: '/agenda-saya', element: <AgendaSayaPage /> }, // Belum ada
      
      // == RUTE ADMIN TERPROTEKSI (PJ 1) ==
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
    ]
  }
]);

const AppRouter = () => <RouterProvider router={router} />;
export default AppRouter;