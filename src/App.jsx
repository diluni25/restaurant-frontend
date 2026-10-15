import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from "./context/CartContext";

import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";

import SiteNavbar from "./components/SiteNavbar";
import SiteFooter from "./components/SiteFooter";
import AdminLayout from "./components/admin/AdminLayout";
import MenuManagement from "./pages/MenuManagement";
import ChefManagement from "./pages/ChefManagement";

import "./admin.css";
import "./App.css";
import "./order.css";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<MenuManagement />} />
            <Route path="menu" element={<MenuManagement />} />
            <Route path="chefs" element={<ChefManagement />} />
          </Route>

          <Route
            path="/cart"
            element={
              <div className="tastoria">
                <SiteNavbar />
                <CartPage />
                <SiteFooter />
              </div>
            }
          />

          <Route
            path="/checkout"
            element={
              <div className="tastoria">
                <SiteNavbar />
                <CheckoutPage />
                <SiteFooter />
              </div>
            }
          />

          <Route
            path="/order-confirmation"
            element={
              <div className="tastoria">
                <SiteNavbar />
                <OrderConfirmationPage />
                <SiteFooter />
              </div>
            }
          />

          <Route path="*" element={<HomePage />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
