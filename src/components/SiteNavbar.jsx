export default function SiteNavbar() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="/">
          Tastoria
        </a>

        <nav className="primary-nav" aria-label="Main navigation">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/chefs">Chef Details</a>
          <a href="/order">Order</a>
          <a href="/contact">Contact</a>
        </nav>

        <div className="header-actions">
          <a className="admin-link" href="/admin">
            ADMIN
          </a>

          <a className="order-button" href="/order">
            ORDER NOW <span>↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}
