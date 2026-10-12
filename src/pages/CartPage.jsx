import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { products, money } from "../data/cartData";
import OrderSteps from "../components/OrderSteps";
import OrderSummary from "../components/OrderSummary";

export default function CartPage() {
  const { items, count, change, remove } = useCart();

  const bread = products.find((product) => product.id === "bread");

  return (
    <main className="order-page">
      <div className="order-overline">
        <Link to="/order">← Continue exploring the menu</Link>
        <OrderSteps />
      </div>

      <p className="order-eyebrow">YOUR EVENING, SORTED</p>

      <h1>A table full of good things.</h1>

      <p className="order-lead">
        Review your meal before we light the fire. You have {count} items in
        your cart.
      </p>

      <div className="order-columns">
        <div>
          <div className="cart-panel">
            <div className="cart-header">
              <span>YOUR SELECTION</span>
              <span>QUANTITY</span>
              <span>TOTAL</span>
            </div>

            {items.length > 0 ? (
              items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="cart-item-info">
                    <h2>{item.name}</h2>

                    <p>
                      {money(item.price)} each ·{item.category}
                    </p>

                    <button
                      type="button"
                      className="text-remove"
                      onClick={() => remove(item.id)}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="quantity">
                    <button
                      type="button"
                      onClick={() => change(item.id, -1)}
                      aria-label={`Decrease ${item.name}`}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() => change(item.id, 1)}
                      aria-label={`Increase ${item.name}`}
                    >
                      +
                    </button>
                  </div>

                  <strong className="item-total">
                    {money(item.quantity * item.price)}
                  </strong>
                </div>
              ))
            ) : (
              <p className="empty-cart">
                Your cart is empty. <Link to="/">Explore our dishes</Link>
              </p>
            )}

            <div className="cart-panel-foot">
              ♧ &nbsp; Thoughtfully packed in recyclable, earth-friendly
              packaging.
            </div>
          </div>

          <div className="upsell">
            <img src={bread.image} alt={bread.name} />

            <div>
              <p className="order-eyebrow">A LITTLE SOMETHING EXTRA</p>

              <h2>Hearth-baked sourdough</h2>

              <p>For the last of the rosemary jus. Cultured butter included.</p>
            </div>

            <button type="button" onClick={() => change("bread", 1)}>
              Add · $8 &nbsp; +
            </button>
          </div>
        </div>

        <div>
          <OrderSummary />

          <div className="order-side-copy">
            <h2>Made for your moment.</h2>

            <p>
              Every dish is cooked to order. Need to make a change or ask about
              allergens? Our kitchen is here to help.
            </p>

            <a href="tel:0417853555">041 785 3555</a>
          </div>
        </div>
      </div>
    </main>
  );
}
