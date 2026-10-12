import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-main page-width">
        <Link className="footer-brand" to="/#top">
          <span className="wordmark">Tastoria</span>
          <span className="footer-tagline">Fire. Season. Soul.</span>
        </Link>
        <div className="footer-block">
          <span className="footer-label">Come by</span>
          <p>17 Marlowe Street<br />Mayfair, London</p>
        </div>
        <div className="footer-block">
          <span className="footer-label">From our hearth</span>
          <p>Tue–Sun · 12:00–22:00</p>
        </div>
        <div className="footer-block footer-contact">
          <a href="tel:+440417853555">041 785 3555</a>
          <a href="mailto:tastoria@gmail.com">tastoria@gmail.com</a>
        </div>
        <nav className="footer-workspace" aria-label="Workspace links">
          <span className="footer-label">Quick links</span>
          <Link to="/contact">Contact &amp; reservations</Link>
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/messages">Guest messages</Link>
        </nav>
      </div>
      <div className="footer-bottom page-width">
        <p>© 2026 Ember &amp; Grain. Thoughtfully made, warmly shared.</p>
        <div>
          <a href="#contact">Privacy policy</a>
          <a href="#contact">Terms</a>
          <a href="#contact">Allergen information</a>
        </div>
      </div>
    </footer>
  )
}