import { Link, Navigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { money } from "../data/cartData";
import OrderSteps from "../components/OrderSteps";

import chef from "../assets/cart/chef.png";

export default function OrderConfirmationPage() {
  const { order } = useCart();

  if (!order) {
    return <Navigate to="/cart" replace />;
  }

  const {
    details: d,
    items,
    subtotal,
    delivery,
    tax,
    total,
    number,
    placedAt,
  } = order;

  const formatted = new Date(placedAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const arrival = new Date(
    new Date(placedAt).getTime() + 35 * 60000,
  ).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  const arrivalEnd = new Date(
    new Date(placedAt).getTime() + 45 * 60000,
  ).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <main className="order-page confirmation-page">
      <div className="order-overline">
        <span className="order-eyebrow">FROM OUR KITCHEN, WITH CARE</span>
        <OrderSteps />
      </div>

      <div className="confirmation-hero">
        <div>
          <p className="confirmed">
            <span>✓</span>
            ORDER CONFIRMED
          </p>

          <h1>
            Thank you, {d.firstName}.<br />
            The fire is on.
          </h1>

          <p className="order-lead">
            Your meal is in good hands. Your confirmation details are shown
            below for {d.email}, and our kitchen is getting started.
          </p>

          <p className="confirm-meta">
            Order #{number}
            &nbsp;&nbsp;
            <small>{formatted}</small>
          </p>
        </div>

        <img src={chef} alt="Chef preparing your order" />
      </div>

      <div className="status-bar">
        <div>
          <span>✓</span>
          <p>
            Order received
            <small>Confirmed</small>
          </p>
        </div>

        <div>
          <span>♨</span>
          <p>
            At the hearth
            <small>Your meal is being prepared</small>
          </p>
        </div>

        <div>
          <span>♧</span>
          <p>
            At your door
            <small>
              Estimated {arrival}–{arrivalEnd}
            </small>
          </p>
        </div>
      </div>

      <div className="order-columns confirmation-columns">
        <section className="receipt">
          <div className="receipt-heading">
            <h2>Your evening's menu</h2>

            <button onClick={() => window.print()}>
              Print receipt &nbsp; ▤
            </button>
          </div>

          <div className="receipt-items">
            {items.map((item) => (
              <div className="receipt-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div>
                  <h3>{item.name}</h3>
                  <small>
                    {item.quantity} × {money(item.price)}
                  </small>
                </div>

                <strong>{money(item.price * item.quantity)}</strong>
              </div>
            ))}
          </div>

          <div className="totals">
            <div>
              <span>
                Subtotal · {items.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                items
              </span>
              <span>{money(subtotal)}</span>
            </div>

            <div>
              <span>Delivery</span>
              <span>{money(delivery)}</span>
            </div>

            <div>
              <span>Tax (10%)</span>
              <span>{money(tax)}</span>
            </div>
          </div>

          <div className="total-line">
            <span>Total</span>
            <strong>{money(total)}</strong>
          </div>

          <div className="payment-amount">
            Cash on delivery · Amount due
            <strong>{money(total)}</strong>
          </div>
        </section>

        <div>
          <section className="receipt address-receipt">
            <h2>Coming to you</h2>

            <small>ESTIMATED DELIVERY</small>

            <p className="arrival">
              {arrival}–{arrivalEnd}
            </p>

            <hr />

            <p>
              {d.firstName} {d.lastName}
            </p>

            <p className="muted">
              {d.street}
              {d.apartment ? `, ${d.apartment}` : ""}
              <br />
              {d.city}, {d.state} {d.zip}
              <br />
              {d.country}
            </p>

            <p className="muted">{d.phone}</p>

            {d.instructions && (
              <div className="driver-note">
                <small>NOTE FOR OUR DRIVER</small>
                <p>{d.instructions}</p>
              </div>
            )}
          </section>

          <div className="order-side-copy">
            <h2>Need to change something?</h2>

            <p>
              Give us a call with your order number. We're happy to help before
              your meal leaves the kitchen.
            </p>

            <a href="tel:0417853555">041 785 3555 · Order #{number}</a>
          </div>
        </div>
      </div>

      <div className="confirmation-actions">
        <Link className="order-primary" to="/order">
          Explore the menu →
        </Link>

        <Link className="secondary-button" to="/chefs">
          Meet our chefs
        </Link>
      </div>
    </main>
  );
}
