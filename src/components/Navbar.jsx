import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Fuchsius Restaurant</h1>
      <div className="space-x-6">
        <Link to="/" className="hover:text-orange-400">Home</Link>
        <Link to="/about" className="hover:text-orange-400">About</Link>
        <Link to="/chefs" className="hover:text-orange-400">Chefs</Link>
        <Link to="/order" className="hover:text-orange-400">Order Online</Link>
        <Link to="/contact" className="hover:text-orange-400">Contact</Link>
      </div>
    </nav>
  );
}