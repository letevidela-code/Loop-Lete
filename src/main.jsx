import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './x7.jsx'
import AboutPage from './about.jsx'
import './z3.css'

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

class PageErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error) {
    console.error('Loop Lete - error en página Yo:', error)
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <div className="app">
        <div className="x0" aria-hidden="true"><i /><i /><i /></div>
        <main className="xm" style={{ minHeight: '100vh', justifyContent: 'center' }}>
          <section className="xs" style={{ margin: 'auto', textAlign: 'center' }}>
            <span>LOOP LETE</span>
            <h1 style={{ fontSize: '4rem' }}>YO</h1>
            <h2>No pude mostrar esta sección.</h2>
            <p>{String(this.state.error?.message || this.state.error)}</p>
            <div className="xt" style={{ justifyContent: 'center' }}>
              <button onClick={this.props.onHome}>Volver a Inicio</button>
            </div>
          </section>
        </main>
      </div>
    )
  }
}

function Root() {
  const [page, setPage] = React.useState('home')

  React.useEffect(() => {
    if (page !== 'home') return undefined

    const interceptYo = (event) => {
      const target = event.target instanceof Element ? event.target : null
      const button = target?.closest('nav.x4 button')

      if (!button || button.textContent.trim() !== 'Yo') return

      event.preventDefault()
      event.stopPropagation()
      setPage('about')
      try { nativeScrollTo?.(0, 0) } catch {}
    }

    document.addEventListener('click', interceptYo, true)
    return () => document.removeEventListener('click', interceptYo, true)
  }, [page])

  const goHome = React.useCallback(() => {
    setPage('home')

    setTimeout(() => {
      const openMenu = document.querySelector('.x4.on')
      const menuButton = openMenu?.parentElement?.querySelector('.x3')
      if (openMenu && menuButton) menuButton.click()
      try { nativeScrollTo?.(0, 0) } catch {}
    }, 0)
  }, [])

  return (
    <>
      <div style={{ display: page === 'home' ? 'contents' : 'none' }}>
        <App />
      </div>

      {page === 'about' && (
        <PageErrorBoundary onHome={goHome}>
          <AboutPage onHome={goHome} />
        </PageErrorBoundary>
      )}
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />)
