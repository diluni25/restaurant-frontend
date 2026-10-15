import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Menu from './pages/public-pages/Menu';
import HomeContentManager from './pages/admin/HomeContentManager';
import AboutContentManager from './pages/admin/AboutContentManager';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/admin/homecontentmanager" element={<HomeContentManager />} />
        <Route path="/admin/aboutcontentmanager" element={<AboutContentManager />} />
      </Routes>
    </BrowserRouter>
  );
}