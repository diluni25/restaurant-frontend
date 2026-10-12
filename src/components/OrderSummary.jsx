import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { money } from "../data/cartData";

export default function OrderSummary({ checkout = false }) {
  const { items, count, subtotal, delivery, tax, total } = useCart();

  return (
    <aside className="order-summary">
      <h2>Your order</h2>

      {checkout && (
        <div className="order-mini-items">
          {items.map((item) => (
            <div className="mini-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div>
                <strong>{item.name}</strong>
                <small>
                  Qty {item.quantity} ·{money(item.price)} each
                </small>
              </div>

              <span>{money(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
      )}

      <div className="totals">
        <div>
          <span>Subtotal · {count} items</span>
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

      <div className="delivery-note">
        ◷ &nbsp; At your door in 35–45 min
        <small>Fresh from the hearth, packed with care.</small>
      </div>

      {checkout ? (
        <button
          className="order-primary"
          type="submit"
          form="checkout-form"
          disabled={!count}
        >
          Place order · {money(total)} →
        </button>
      ) : (
        <Link
          className="order-primary"
          to="/checkout"
          onClick={(e) => {
            if (!count) e.preventDefault();
          }}
        >
          Continue to checkout →
        </Link>
      )}

      <p className="payment-note">
        Pay on delivery · No online payment required
      </p>
    </aside>
  );
}
