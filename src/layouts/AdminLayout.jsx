import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      {/* Admin Sidebar / Header can go here */}
      <div className="w-64 bg-gray-900 p-6 border-r border-gray-800">
        <h2 className="text-xl font-bold text-orange-400">Admin Panel</h2>
        {/* Navigation links */}
      </div>
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}