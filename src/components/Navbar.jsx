import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="site-header">
      <nav className="nav-inner" aria-label="Main navigation">
        <Link className="wordmark" to="/#top" aria-label="Tastoria home">Tastoria</Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
        <div className={`nav-links${menuOpen ? ' is-open' : ''}`}>
          <a href="/#top" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="/#story" aria-current={location.pathname === '/' ? 'page' : undefined} onClick={() => setMenuOpen(false)}>About</a>
          <a href="/#table" onClick={() => setMenuOpen(false)}>Chef Details</a>
          <a href="/#visit" onClick={() => setMenuOpen(false)}>Order</a>
          <Link to="/contact" aria-current={location.pathname === '/contact' ? 'page' : undefined} onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
        <div className="nav-actions">
          <Link className="admin-link" to="/admin">Admin</Link>
          <a className="order-button" href="/#visit">Order now <span aria-hidden="true">↗</span></a>
        </div>
      </nav>
    </header>
  )
}