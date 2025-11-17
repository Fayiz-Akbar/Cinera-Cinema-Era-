// Frontend/src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './router.jsx' // <- Kita akan impor file router
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter /> {/* <- Render file router */}
  </React.StrictMode>,
)