import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { products } from "../data/cartData";

const CartContext = createContext(null);

const initialCart = {
  chicken: 2,
  burrata: 1,
  tart: 1,
};

export function CartProvider({ children }) {
  const [quantities, setQuantities] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("tastoria-cart"));

      return saved && typeof saved === "object" ? saved : initialCart;
    } catch {
      return initialCart;
    }
  });

  const [order, setOrder] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("tastoria-order") || "null");
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem("tastoria-cart", JSON.stringify(quantities));
  }, [quantities]);

  useEffect(() => {
    if (order) {
      sessionStorage.setItem("tastoria-order", JSON.stringify(order));
    }
  }, [order]);

  const change = (id, delta) => {
    setQuantities((previous) => ({
      ...previous,
      [id]: Math.max(0, (previous[id] || 0) + delta),
    }));
  };

  const remove = (id) => {
    setQuantities((previous) => ({
      ...previous,
      [id]: 0,
    }));
  };

  const items = useMemo(() => {
    return products
      .filter((product) => quantities[product.id] > 0)
      .map((product) => ({
        ...product,
        quantity: quantities[product.id],
      }));
  }, [quantities]);

  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const delivery = count > 0 ? 5 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + delivery + tax;

  const clear = () => setQuantities({});

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        subtotal,
        delivery,
        tax,
        total,
        change,
        remove,
        clear,
        order,
        setOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
