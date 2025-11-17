// Frontend/src/router.jsx
// (PJ 1 - GATEKEEPER)

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import ProtectedRoute from './components/Common/ProtectedRoute.jsx';
import AdminLayout from './components/Common/AdminLayout.jsx'; // <-- IMPORT

// Import Halaman
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import AdminDashboardPage from './pages/Admin/AdminDashboardPage.jsx';
import AdminKategoriPage from './pages/Admin/AdminKategoriPage.jsx';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      // == Rute Publik (PJ 2 & 3) ==
      { path: '/', element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },

      // == RUTE ADMIN TERPROTEKSI (PJ 1) ==
      {
        element: <ProtectedRoute adminOnly={true} />,
        children: [
          // Gunakan AdminLayout sebagai "bungkus"
          {
            element: <AdminLayout />, // <-- BUNGKUS DENGAN LAYOUT
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