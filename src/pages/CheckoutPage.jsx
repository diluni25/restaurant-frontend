import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import OrderSteps from "../components/OrderSteps";
import OrderSummary from "../components/OrderSummary";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const { items, count, subtotal, delivery, tax, total, setOrder, clear } =
    useCart();

  const [agree, setAgree] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!agree || !count) return;

    const form = new FormData(e.currentTarget);
    const details = Object.fromEntries(form.entries());

    const now = new Date();

    const orderNumber = `EG-${Math.floor(1000 + Math.random() * 9000)}`;

    setOrder({
      number: orderNumber,
      placedAt: now.toISOString(),
      details,
      items,
      subtotal,
      delivery,
      tax,
      total,
    });

    clear();
    navigate("/order-confirmation");
  };

  return (
    <main className="order-page">
      <div className="order-overline">
        <Link to="/cart">← Back to your cart</Link>
        <OrderSteps />
      </div>

      <p className="order-eyebrow">ONE STEP CLOSER TO THE HEARTH</p>

      <h1>Where shall we bring dinner?</h1>

      <p className="order-lead">
        A few details, and our kitchen will take it from here. All prices are in
        USD.
      </p>

      <div className="order-columns">
        <form id="checkout-form" onSubmit={handleSubmit}>
          <div className="checkout-panel">
            <div className="section-heading">
              <h2>
                <span>01</span> Your details
              </h2>
              <small>* Required fields</small>
            </div>

            <div className="form-grid">
              <label>
                First name *
                <input name="firstName" required placeholder="Jamie" />
              </label>

              <label>
                Last name *
                <input name="lastName" required placeholder="Rivera" />
              </label>

              <label>
                Email address *
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="jamie.rivera@example.com"
                />
              </label>

              <label>
                Phone number *
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="(917) 555-0186"
                />
              </label>
            </div>

            <p className="form-hint">
              We'll use these details only for your order confirmation and
              delivery updates.
            </p>

            <hr />

            <div className="section-heading">
              <h2>
                <span>02</span> Delivery address
              </h2>
            </div>

            <div className="form-grid">
              <label className="wide">
                Street address *
                <input name="street" required placeholder="128 Bergen Street" />
              </label>

              <div className="three-fields">
                <label>
                  Apartment / suite
                  <input name="apartment" placeholder="Apt 4B" />
                </label>

                <label>
                  City *
                  <input name="city" required placeholder="Brooklyn" />
                </label>

                <label>
                  ZIP code *
                  <input name="zip" required placeholder="11201" />
                </label>
              </div>

              <label>
                State *
                <select name="state" required defaultValue="">
                  <option value="" disabled>
                    Select state
                  </option>
                  <option>New York</option>
                  <option>California</option>
                  <option>Other</option>
                </select>
              </label>

              <label>
                Country *
                <select name="country" required defaultValue="United States">
                  <option>United States</option>
                  <option>Sri Lanka</option>
                  <option>Other</option>
                </select>
              </label>

              <label className="wide">
                Delivery instructions (optional)
                <textarea
                  name="instructions"
                  rows="4"
                  placeholder="Please ring the buzzer for 4B."
                />
              </label>
            </div>
          </div>

          <div className="checkout-panel finishing">
            <div className="section-heading">
              <h2>
                <span>03</span> The finishing details
              </h2>
            </div>

            <div className="selected-option">
              <span>
                ◉ &nbsp; Deliver as soon as possible
                <small>Estimated arrival in 35–45 minutes</small>
              </span>
              <b>$5.00</b>
            </div>

            <div className="selected-option secondary">
              <span>
                ▣ &nbsp; Cash on delivery
                <small>
                  Pay when your meal arrives. Please have the exact amount
                  ready.
                </small>
              </span>
              <b>✓</b>
            </div>

            <label className="terms">
              <input
                type="checkbox"
                checked={agree}
                required
                onChange={(e) => setAgree(e.target.checked)}
              />
              I confirm my delivery details and agree to the Terms and Privacy
              Policy.
            </label>
          </div>
        </form>

        <div>
          <OrderSummary checkout />

          <div className="order-side-copy">
            <p>
              Your order goes straight to our kitchen. No card details or online
              payment needed.
            </p>

            <p>
              Need a hand? Call <a href="tel:0417853555">041 785 3555</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
