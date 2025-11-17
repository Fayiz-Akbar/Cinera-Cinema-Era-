// Frontend/src/context/AuthContext.jsx
// (PJ 1 - GATEKEEPER)

import { createContext, useContext, useState } from 'react';

// Buat Context
const AuthContext = createContext();

// Buat Provider (Pembungkus)
export const AuthProvider = ({ children }) => {
  // Cek localStorage apakah sudah ada data dari login sebelumnya
  const [user, setUser] = useState(() => 
    JSON.parse(localStorage.getItem('AUTH_USER')) || null
  );
  const [token, setToken] = useState(() => 
    localStorage.getItem('AUTH_TOKEN') || null
  );

  const setAuthData = (data, authToken) => {
    // 1. Set state di React
    setUser(data);
    setToken(authToken);

    // 2. Simpan ke localStorage
    localStorage.setItem('AUTH_USER', JSON.stringify(data));
    localStorage.setItem('AUTH_TOKEN', authToken);
  };

  const clearAuthData = () => {
    // 1. Hapus state di React
    setUser(null);
    setToken(null);

    // 2. Hapus dari localStorage
    localStorage.removeItem('AUTH_USER');
    localStorage.removeItem('AUTH_TOKEN');
  };

  return (
    <AuthContext.Provider value={{ user, token, setAuthData, clearAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

// Buat "Custom Hook" agar gampang dipakai
export const useAuth = () => useContext(AuthContext);