import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { DashboardPage, MessagesPage } from './pages/AdminPages'
import ContactPage from './pages/ContactPage'
import './App.css'
import './Admin.css'
import './Contact.css'

function AboutPage() {
  return (
    <div className="site-shell" id="top">
      <Navbar />
      <main>
        <section className="about-hero" aria-labelledby="about-title">
          <img
            className="about-hero-image"
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2200&q=85"
            alt="A candlelit table set for dinner at Tastoria"
          />
          <div className="about-hero-copy">
            <span className="eyebrow">Our story</span>
            <h1 id="about-title">Rooted in place. Led by fire.</h1>
          </div>
        </section>

        <section className="story-section page-width" id="story">
          <div className="story-lead">
            <span className="eyebrow">Since 2017</span>
            <h2>A neighborhood table built around the belief that the best food begins with respect.</h2>
          </div>
          <p>
            Tastoria began with a borrowed grill, a handful of local growers, and a simple idea: cook beautiful ingredients without getting in their way. What started as courtyard dinners became a permanent home for warm hospitality and elemental cooking.
          </p>
          <p>
            Today, our kitchen still works directly with small farms, ranchers, and fishers. The menu changes often, but our mission does not: to create honest food, treat people well, and make every table feel like the best one in the room.
          </p>
        </section>

        <section className="visit-panel page-width" id="visit">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=85"
            alt="A freshly prepared seasonal dish"
          />
          <div className="visit-details">
            <div>
              <span className="eyebrow">Find us</span>
              <h2>The Eastside</h2>
              <p>17 Marlowe Street<br />Mayfair, London</p>
            </div>
            <div className="hours">
              <span className="eyebrow">Opening hours</span>
              <dl>
                <div><dt>Tue–Thu</dt><dd>5–10 pm</dd></div>
                <div><dt>Fri–Sat</dt><dd>5–11 pm</dd></div>
                <div><dt>Sunday</dt><dd>4–9 pm</dd></div>
                <div><dt>Monday</dt><dd>Closed</dd></div>
              </dl>
            </div>
          </div>
        </section>

        <section className="gallery-section" id="table">
          <div className="gallery-heading page-width">
            <span className="eyebrow">Inside Tastoria</span>
            <h2>A seat at our table</h2>
          </div>
          <div className="gallery-grid page-width">
            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85" alt="The warmly lit Tastoria dining room" />
            <img src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=85" alt="Glasses raised around the dinner table" />
            <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85" alt="A rich chocolate layer cake" />
            <img src="https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=85" alt="Freshly made pancakes finished with fruit" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<DashboardPage />} />
        <Route path="/admin/messages" element={<MessagesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
