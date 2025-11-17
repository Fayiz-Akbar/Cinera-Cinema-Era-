// Frontend/src/router.jsx
// (PJ 1 - GATEKEEPER)

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import ProtectedRoute from './components/Common/ProtectedRoute.jsx'; // <-- IMPORT

// Import Halaman
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import AdminDashboardPage from './pages/Admin/AdminDashboardPage.jsx';
import AdminKategoriPage from './pages/Admin/AdminKategoriPage.jsx';

// Definisikan rute
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      // == Rute Publik (PJ 2 & 3) ==
      { path: '/', element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },

      // == RUTE ADMIN TERPROTEKSI (PJ 1) ==
      // Rute ini dibungkus oleh "Pos Satpam"
      {
        element: <ProtectedRoute adminOnly={true} />, // <-- INI SATPAMNYA
        children: [
          // Semua halaman di sini HANYA bisa diakses Admin
          {
            path: '/admin/dashboard',
            element: <AdminDashboardPage />,
          },
          {
            path: '/admin/kategori',
            element: <AdminKategoriPage />,
          },
        ]
      },

      // == RUTE USER BIASA TERPROTEKSI (Contoh nanti) ==
      // {
      //   element: <ProtectedRoute />, // Satpam (tanpa adminOnly)
      //   children: [
      //     { path: '/agenda-saya', element: <AgendaSayaPage /> }
      //   ]
      // }
    ]
  }
]);

const AppRouter = () => <RouterProvider router={router} />;
export default AppRouter;