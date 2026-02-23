import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Squad } from './pages/Squad';
import { Fixtures } from './pages/Fixtures';
import { Results } from './pages/Results';
import { News } from './pages/News';
import { NewsDetail } from './pages/NewsDetail';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
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
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-[#f5a623] selection:text-black ${isDarkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'}`}>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      <main className="min-h-[80vh]">
        <Routes>
          <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
          <Route path="/squad" element={<Squad isDarkMode={isDarkMode} />} />
          <Route path="/fixtures" element={<Fixtures isDarkMode={isDarkMode} />} />
          <Route path="/results" element={<Results isDarkMode={isDarkMode} />} />
          <Route path="/news" element={<News isDarkMode={isDarkMode} />} />
          <Route path="/news/:id" element={<NewsDetail isDarkMode={isDarkMode} />} />
        </Routes>
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
