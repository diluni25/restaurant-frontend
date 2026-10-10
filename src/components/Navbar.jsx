import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <nav className="nav-inner" aria-label="Main navigation">
        <a className="wordmark" href="#top" aria-label="Tastoria home">Tastoria</a>
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
          <a href="#top" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#story" aria-current="page" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#table" onClick={() => setMenuOpen(false)}>Chef Details</a>
          <a href="#visit" onClick={() => setMenuOpen(false)}>Order</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
        <div className="nav-actions">
          <a className="admin-link" href="#contact">Admin</a>
          <a className="order-button" href="#visit">Order now <span aria-hidden="true">↗</span></a>
        </div>
      </nav>
    </header>
  )
}