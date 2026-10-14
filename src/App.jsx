import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Menu from './pages/public-pages/Menu';
import Home from './pages/public-pages/Home';
import AboutContentManager from './pages/admin/AboutContentManager';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Menu />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin/aboutcontentmanager" element={<AboutContentManager />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;