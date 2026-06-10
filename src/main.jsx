import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// ── CSS — ordre important (variables d'abord) ──
import './styles/global.css'
import './styles/PlayerCard.css'
import './styles/PackOpening.css'
import './styles/pages.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)