<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Menu from './pages/public-pages/Menu';
import HomeContentManager from './pages/admin/HomeContentManager';
import AboutContentManager from './pages/admin/AboutContentManager';
=======
import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { DashboardPage, MessagesPage, OrderManagementPage } from './pages/AdminPages'
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

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
>>>>>>> 21d4506fc5beeef53a9d8bb18418d89a8deb22fb

export default function App() {
  return (
<<<<<<< HEAD
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/admin/homecontentmanager" element={<HomeContentManager />} />
        <Route path="/admin/aboutcontentmanager" element={<AboutContentManager />} />
      </Routes>
    </BrowserRouter>
  );
}
=======
    <div className="login-page">
      <div className="login-visual" aria-label="Restaurant dining room">
        <img
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80"
          alt="Warmly lit restaurant dining room"
        />
      </div>

      <main className="login-panel">
        <header className="login-brand" aria-label="Tastoria home">
          <span className="brand-mark">⟡</span>
          <span className="brand-word">Tastoria</span>
        </header>
        <p className="brand-subtitle">RESTAURANT ADMINISTRATION</p>

        <section className="login-card" aria-label="Admin login form">
          <h1>Admin login</h1>
          <p>Sign in to manage menus, orders, and promotions.</p>

          <form className="login-form" onSubmit={(event) => event.preventDefault()}>
            <label className="field">
              <span>Email address</span>
              <input type="email" defaultValue="admin@gmail.com" aria-label="Email address" />
            </label>

            <label className="field password-field">
              <span>Password</span>
              <div className="input-shell">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  aria-label="Password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword((current) => !current)}
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </button>
              </div>
            </label>

            <button type="button" className="text-link">Forgot password?</button>

            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me on this device</span>
            </label>

            <button type="submit" className="secure-login">SECURE LOGIN</button>
          </form>

          <p className="help-link">Need Help?</p>
        </section>
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<OrderManagementPage />} />
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/messages" element={<MessagesPage />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
>>>>>>> 21d4506fc5beeef53a9d8bb18418d89a8deb22fb
