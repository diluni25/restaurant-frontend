import hero from '../assets/home/hero.png'
import ribeye from '../assets/home/ribeye.png'
import fish from '../assets/home/fish.png'
import dessert from '../assets/home/dessert.png'
import toast from '../assets/home/toast.png'
import pasta from '../assets/home/pasta.png'
import coffee from '../assets/home/coffee.png'
import chef from '../assets/home/chef.png'

const dishes = [
  { name: 'Fire-kissed ribeye', detail: 'Celeriac · bone jus · shallot', price: '$38', image: ribeye },
  { name: 'Charred market fish', detail: 'Fennel · preserved lemon · herbs', price: '$32', image: fish },
  { name: 'Cacao & ember', detail: 'Dark chocolate · smoked salt · cherry', price: '$16', image: dessert },
  { name: 'Artisan Sourdough Toast', detail: 'Smoked avocado, heirloom tomatoes, herbs', price: '$24', image: toast },
  { name: 'Truffle Wild Mushroom Pasta', detail: 'Handmade tagliatelle, parmesan cream, black truffle', price: '$32', image: pasta },
  { name: 'Signature Artisan Coffee', detail: 'Single-origin beans, steamed oat milk', price: '$9', image: coffee },
]

export default function HomePage() {
  return (
    <div className="tastoria">
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#home">Tastoria</a>
          <nav className="primary-nav" aria-label="Main navigation">
            <a className="active" href="#home">Home</a>
            <a href="/about">About</a>
            <a href="/chefs">Chef Details</a>
            <a href="/order">Order</a>
            <a href="/contact">Contact</a>
          </nav>
          <div className="header-actions">
            <a className="admin-link" href="/admin">ADMIN</a>
            <a className="order-button" href="/order">ORDER NOW <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </header>

      <main>
        <section className="home-hero" id="home" style={{ backgroundImage: `linear-gradient(90deg, rgba(12,9,7,.60), rgba(10,8,6,.07) 80%), url(${hero})` }}>
          <div className="hero-inner">
            <div className="hero-heading">
              <p className="eyebrow">Seasonal dining · Mayfair, London</p>
              <h1>Gather around<br />the fire.</h1>
            </div>
            <div className="hero-bottom">
              <a className="hero-cta" href="/order">Order Now <span aria-hidden="true">↗</span></a>
              <p className="hero-promise">Honest ingredients, open flames, and plates<br className="desktop-break" /> made for passing around.</p>
              <p className="hero-hours">Tonight<br />Dinner 5–11 pm</p>
            </div>
          </div>
        </section>

        <section className="featured-section" id="featured">
          <div className="section-intro">
            <div>
              <p className="eyebrow">From the hearth</p>
              <h2>Featured dishes</h2>
            </div>
            <p className="section-description">Our menu moves with the farms and the fire. These are a few plates<br className="desktop-break" /> we're especially excited to share right now.</p>
          </div>
          <div className="dish-grid">
            {dishes.map((dish) => (
              <article className="dish-card" key={dish.name}>
                <img src={dish.image} alt={dish.name} />
                <div className="dish-information">
                  <div className="dish-title-row">
                    <h3>{dish.name}</h3>
                    <span className="dish-price">{dish.price}</span>
                  </div>
                  <p>{dish.detail}</p>
                </div>
              </article>
            ))}
          </div>

          <section className="chef-feature" aria-label="Chef's counter">
            <img src={chef} alt="Chef preparing a beautifully plated dish" />
            <div className="chef-copy">
              <p className="chef-badge">Chef's counter · 8 seats nightly</p>
              <h2>Leave the menu<br /><span>to us.</span></h2>
              <p className="chef-description">A seven-course journey through flame, field, and season. Optional wine pairing available.<br />Reservations required 48 hours in advance. Available Tuesday through Sunday from 7:00 PM onwards.</p>
              <a className="chef-link" href="/contact">Reserve the counter <span aria-hidden="true">↗</span></a>
            </div>
          </section>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand"><a href="#home">Tastoria</a><small>FIRE. SEASON. SOUL.</small></div>
          <div><span className="footer-label">COME BY</span><p>17 Marlowe Street Mayfair, London</p></div>
          <div><span className="footer-label">FROM OUR HEARTH</span><p>Tue–Sun · 12:00–22:00</p></div>
          <div className="footer-contact"><a href="tel:0417853555">041 785 3555</a><a href="mailto:tastoria@gmail.com">tastoria@gmail.com</a></div>
        </div>
        <div className="footer-bottom"><p>© 2026 Ember &amp; Grain. Thoughtfully made, warmly shared.</p><div><a href="/privacy">Privacy policy</a><a href="/terms">Terms</a><a href="/allergens">Allergen information</a></div></div>
      </footer>
    </div>
  )
}
