import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './x7.jsx'
import './z3.css'

// Mantiene compatible la llamada global `scrollTo(...)` usada por la app
// en navegadores móviles donde puede fallar al ejecutarse sin `window.`.
const nativeScrollTo = typeof window !== 'undefined' && typeof window.scrollTo === 'function'
  ? window.scrollTo.bind(window)
  : null

if (typeof window !== 'undefined') {
  window.scrollTo = (...args) => {
    try {
      nativeScrollTo?.(...args)
    } catch {
      try { nativeScrollTo?.(0, 0) } catch {}
    }
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
