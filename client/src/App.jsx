import { useState, useEffect } from 'react'

function App() {
  const [backendStatus, setBackendStatus] = useState('checking...')

  useEffect(() => {
    fetch('http://localhost:5000/api/health')
      .then((res) => res.json())
      .then((data) => setBackendStatus(data.status === 'ok' ? 'Connected (Grove & Co. API)' : 'Error'))
      .catch(() => setBackendStatus('Offline (Start backend with npm run dev in /server)'))
  }, [])

  return (
    <main className="min-h-screen bg-background text-ink flex flex-col justify-between">
      {/* Header */}
      <header className="border-b border-border bg-surface/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container-main py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-display font-semibold tracking-tight text-accent-primary">Grove & Co.</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent-secondary/15 text-accent-secondary font-medium">Furniro</span>
          </div>
          <div className="flex items-center space-x-4 text-sm font-medium">
            <span className="text-ink-muted">Backend API:</span>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
              backendStatus.includes('Connected')
                ? 'bg-success/15 text-success'
                : 'bg-error/15 text-error'
            }`}>
              <span className={`w-2 h-2 rounded-full ${backendStatus.includes('Connected') ? 'bg-success animate-pulse' : 'bg-error'}`} />
              {backendStatus}
            </span>
          </div>
        </div>
      </header>

      {/* Hero Welcome Card */}
      <section className="container-main py-16 flex-1 flex flex-col items-center justify-center text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-medium">
            Phase 0 & 1 Complete • Ready for Phase 2
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium text-ink leading-tight">
            Crafted for Comfort, Designed for Living.
          </h1>

          <p className="text-ink-muted text-lg max-w-xl mx-auto leading-relaxed">
            Welcome to the local development environment for <strong className="text-ink font-semibold">Grove & Co.</strong> (Furniro). Frontend styling and backend API services are live and synchronized.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              type="button"
              className="btn-primary"
              onClick={() => alert('Phase 2 (Authentication & Storefront) is starting next!')}
            >
              Explore Design System
            </button>
            <a
              href="http://localhost:5000/api/health"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              Check Backend Health ↗
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 bg-surface">
        <div className="container-main flex flex-col sm:flex-row items-center justify-between text-xs text-ink-muted gap-4">
          <p>© 2026 Grove & Co. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span>Tailwind CSS v4</span>
            <span>Vite + React</span>
            <span>Express + MongoDB</span>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default App
