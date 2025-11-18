import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './router.jsx'; 

// --- PASTIKAN BARIS INI ADA ---
import './index.css'; 
// ------------------------------

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
)