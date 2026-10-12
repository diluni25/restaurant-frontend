import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white">
      {/* Temporary direct header nav if Navbar has issues */}
      <nav className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#1a1a1a]">
        <h1 className="font-serif font-bold text-lg text-orange-400">Resturant</h1>
        <div className="flex gap-4 text-xs">
          <a href="/menu" className="hover:text-orange-400">Menu</a>
          <a href="/cart" className="hover:text-orange-400">Cart</a>
          <a href="/contact" className="hover:text-orange-400">Contact</a>
        </div>
      </nav>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="p-6 border-t border-gray-800 text-center text-xs text-gray-500 bg-[#1a1a1a]">
        © 2026 Resturant Frontend. All rights reserved.
      </footer>
    </div>
  );
}