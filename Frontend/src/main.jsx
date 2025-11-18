import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './router.jsx'; 

import './index.css'; // <-- PASTIKAN BARIS INI ADA

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
)