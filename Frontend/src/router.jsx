// Frontend/src/router.jsx

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';

// Import Halaman (Masih error? Tidak apa-apa, kita akan buat filenya)
// Wilayah PJ 2
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

// Wilayah PJ 3
import HomePage from './pages/HomePage.jsx';

// Wilayah PJ 1
import AdminDashboardPage from './pages/Admin/AdminDashboardPage.jsx';
import AdminKategoriPage from './pages/Admin/AdminKategoriPage.jsx';


// Definisikan rute
const router = createBrowserRouter([
  {
    // Layout Induk (App.jsx)
    element: <App />,
    children: [
      // == Rute PJ 3 (Publik) ==
      {
        path: '/',
        element: <HomePage />,
      },
      // == Rute PJ 2 (Auth) ==
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      // == Rute PJ 1 (Admin) ==
      {
        path: '/admin/dashboard',
        element: <AdminDashboardPage />,
      },
      {
        path: '/admin/kategori',
        element: <AdminKategoriPage />,
      },
      // ... (rute lain akan ditambah di sini)
    ]
  }
]);

const AppRouter = () => <RouterProvider router={router} />;
export default AppRouter;