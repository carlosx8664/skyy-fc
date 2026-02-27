import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Squad } from './pages/Squad';
import { WatchLive } from './pages/WatchLive';
import { News } from './pages/News';
import { NewsDetail } from './pages/NewsDetail';
import { Gallery } from './pages/Gallery';

const PageLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="pt-32">
    {children}
  </div>
);

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-[#EFDC43] selection:text-black ${isDarkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'}`}>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <main className="min-h-[80vh]">
        <Routes>
          <Route path="/"         element={<Home       isDarkMode={isDarkMode} />} />
          <Route path="/squad"    element={<PageLayout><Squad     isDarkMode={isDarkMode} /></PageLayout>} />
          <Route path="/watch"    element={<PageLayout><WatchLive isDarkMode={isDarkMode} /></PageLayout>} />
          <Route path="/news"     element={<PageLayout><News      isDarkMode={isDarkMode} /></PageLayout>} />
          <Route path="/news/:id" element={<PageLayout><NewsDetail isDarkMode={isDarkMode} /></PageLayout>} />
          <Route path="/gallery"  element={<PageLayout><Gallery   isDarkMode={isDarkMode} /></PageLayout>} />
        </Routes>
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
