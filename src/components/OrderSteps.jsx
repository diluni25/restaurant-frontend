import { useLocation } from "react-router-dom";

export default function OrderSteps() {
  const { pathname } = useLocation();

  const current = pathname === "/cart" ? 1 : pathname === "/checkout" ? 2 : 3;

  const steps = ["Your cart", "Checkout", "Confirmation"];

  return (
    <div className="order-steps">
      {steps.map((label, index) => {
        const step = index + 1;

        return (
          <div
            key={label}
            className={`order-step ${
              current === step ? "current" : current > step ? "done" : ""
            }`}
          >
            <span>{current > step ? "✓" : step}</span>
            {label}
          </div>
        );
      })}
    </div>
  );
}
