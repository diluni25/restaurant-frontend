export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <a href="/">Tastoria</a>
          <small>FIRE. SEASON. SOUL.</small>
        </div>

        <div>
          <span className="footer-label">COME BY</span>
          <p>17 Marlowe Street Mayfair, London</p>
        </div>

        <div>
          <span className="footer-label">FROM OUR HEARTH</span>
          <p>Tue–Sun · 12:00–22:00</p>
        </div>

        <div className="footer-contact">
          <a href="tel:0417853555">041 785 3555</a>
          <a href="mailto:tastoria@gmail.com">tastoria@gmail.com</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Ember & Grain. Thoughtfully made, warmly shared.</p>

        <div>
          <a href="/privacy">Privacy policy</a>
          <a href="/terms">Terms</a>
          <a href="/allergens">Allergen information</a>
        </div>
      </div>
    </footer>
  );
}
