import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ContactPage() {
  const [submittedName, setSubmittedName] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setSubmittedName(formData.get('name').trim())
    event.currentTarget.reset()
  }

  return (
    <div className="site-shell contact-shell" id="top">
      <Navbar />
      <main>
        <section className="contact-hero" aria-labelledby="contact-title">
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2200&q=85" alt="The warmly lit dining room at Tastoria" />
          <div className="contact-hero-copy">
            <span className="eyebrow">The door is open</span>
            <h1 id="contact-title">Come with a question.<br />Leave with a table.</h1>
          </div>
          <span className="contact-hero-index">MAYFAIR · LONDON</span>
        </section>

        <section className="contact-content page-width">
          <div className="contact-intro">
            <span className="eyebrow">Contact &amp; reservations</span>
            <h2>Let’s make a night of it.</h2>
            <p>Planning dinner, a private celebration, or a visit with a dietary question? Tell us a little about it and our team will help make the details feel easy.</p>

            <div className="contact-details">
              <div className="contact-detail-row"><span className="contact-detail-mark">01</span><div><b>Find the table</b><address>17 Marlowe Street<br />Mayfair, London</address><a href="https://maps.google.com/?q=17+Marlowe+Street+Mayfair+London" target="_blank" rel="noreferrer">Get directions <span>↗</span></a></div></div>
              <div className="contact-detail-row"><span className="contact-detail-mark">02</span><div><b>Call or write</b><a href="tel:+440417853555">041 785 3555</a><a href="mailto:tastoria@gmail.com">tastoria@gmail.com</a></div></div>
              <div className="contact-detail-row contact-hours"><span className="contact-detail-mark">03</span><div><b>At the hearth</b><dl><div><dt>Tue–Thu</dt><dd>5–10 pm</dd></div><div><dt>Fri–Sat</dt><dd>5–11 pm</dd></div><div><dt>Sunday</dt><dd>4–9 pm</dd></div><div><dt>Monday</dt><dd>Closed</dd></div></dl></div></div>
            </div>
            <Link className="contact-admin-link" to="/admin/messages">Team member? Open guest messages <span>↗</span></Link>
          </div>

          <div className="contact-form-wrap">
            <div className="contact-form-heading"><span className="eyebrow">A note to our team</span><h2>How can we help?</h2><p>We usually reply within one service day.</p></div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <label>Your name<input name="name" autoComplete="name" placeholder="First and last name" required /></label>
                <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
              </div>
              <div className="contact-form-row">
                <label>What are you planning?<select name="topic" defaultValue="reservation"><option value="reservation">A table reservation</option><option value="private-dining">Private dining</option><option value="celebration">A celebration</option><option value="dietary">A dietary question</option><option value="other">Something else</option></select></label>
                <label>Preferred date <span className="optional-label">Optional</span><input name="date" type="date" /></label>
              </div>
              <label>Your message<textarea name="message" rows="5" placeholder="Share any details that will help us plan..." required /></label>
              <div className="contact-submit-row"><p>Your note goes straight to our hospitality team.</p><button className="contact-submit" type="submit">Send an inquiry <span>↗</span></button></div>
              {submittedName && <p className="contact-confirmation" role="status">Thanks, {submittedName}. Your inquiry is ready for the Tastoria team.</p>}
            </form>
          </div>
        </section>

        <section className="contact-note-band"><div className="page-width"><span className="eyebrow">Good to know</span><p>For same-day table availability, calling is the quickest way to reach us. For larger parties, please include your preferred date and guest count in your note.</p></div></section>
      </main>
      <Footer />
    </div>
  )
}