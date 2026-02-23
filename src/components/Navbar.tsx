import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Trophy, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CLUB_INFO } from '../data/clubData';

export const Navbar = ({ isDarkMode, setIsDarkMode }: { isDarkMode: boolean, setIsDarkMode: (v: boolean) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Squad', href: '/squad' },
    { name: 'Fixtures', href: '/fixtures' },
    { name: 'Results', href: '/results' },
    { name: 'News', href: '/news' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isDarkMode ? 'bg-zinc-950/90 border-white/10' : 'bg-white/90 border-zinc-200'} backdrop-blur-md border-b py-4`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-[#f5a623] rounded-full flex items-center justify-center font-black text-black text-xl group-hover:scale-110 transition-transform">
            S
          </div>
          <span className={`text-xl font-black tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
            {CLUB_INFO.name}
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink 
              key={link.name} 
              to={link.href}
              className={({ isActive }) => 
                `text-sm font-semibold uppercase tracking-widest transition-colors ${
                  isActive 
                    ? 'text-[#f5a623]' 
                    : isDarkMode ? 'text-zinc-400 hover:text-[#f5a623]' : 'text-zinc-600 hover:text-[#f5a623]'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full transition-colors ${isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-black/5 text-zinc-900 hover:bg-black/10'}`}
          >
            {isDarkMode ? <Clock size={20} /> : <Trophy size={20} />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}
          >
            {isDarkMode ? <Clock size={20} /> : <Trophy size={20} />}
          </button>
          <button 
            className={isDarkMode ? 'text-white' : 'text-zinc-900'}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute top-full left-0 w-full border-b p-6 flex flex-col gap-4 md:hidden ${isDarkMode ? 'bg-zinc-900 border-white/10' : 'bg-white border-zinc-200'}`}
          >
            {navLinks.map((link) => (
              <NavLink 
                key={link.name} 
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => 
                  `text-lg font-bold uppercase tracking-widest ${
                    isActive 
                      ? 'text-[#f5a623]' 
                      : isDarkMode ? 'text-zinc-300 hover:text-[#f5a623]' : 'text-zinc-700 hover:text-[#f5a623]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
