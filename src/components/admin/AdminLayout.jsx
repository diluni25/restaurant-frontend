import { NavLink, Link, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Utensils,
  ShoppingBag,
  ChefHat,
  FileText,
  Image,
  Mail,
  ExternalLink,
  LockKeyhole,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Menu", path: "/admin/menu", icon: Utensils },
  { label: "Orders", path: "/admin/orders", icon: ShoppingBag },
  { label: "Chefs", path: "/admin/chefs", icon: ChefHat },
  { label: "Page Content", path: "/admin/content", icon: FileText },
  { label: "Images", path: "/admin/images", icon: Image },
  { label: "Contact Messages", path: "/admin/messages", icon: Mail },
];

export default function AdminLayout() {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link className="admin-logo" to="/">
          Ember <em>&</em> Grain
          <small>FIRE. SEASON. SOUL.</small>
        </Link>

        <div className="admin-nav-title">RESTAURANT ADMIN</div>

        <nav className="admin-nav">
          {navItems.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/admin"}
              className={({ isActive }) =>
                `admin-nav-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={17} strokeWidth={1.6} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <Link className="admin-view-site" to="/">
            View website <ExternalLink size={15} />
          </Link>

          <div className="admin-account">
            <span className="admin-avatar">AM</span>
            <div>
              <strong>Alex Morgan</strong>
              <small>Administrator</small>
            </div>
          </div>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div>
            Workspace <span>/</span> Restaurant administration
          </div>

          <div className="admin-session">
            <LockKeyhole size={14} />
            <span>Admin workspace</span>
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>

        <footer className="admin-bottom-footer">
          <span>Changes are saved in this browser.</span>
          <span>Ember & Grain · Restaurant administration</span>
        </footer>
      </div>
    </div>
  );
}
