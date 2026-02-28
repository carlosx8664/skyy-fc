import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Trophy, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import skyyLogo from '../assets/skyyfc.png';

export const Navbar = ({ isDarkMode, setIsDarkMode }: { isDarkMode: boolean, setIsDarkMode: (v: boolean) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home',       href: '/' },
    { name: 'Squad',      href: '/squad' },
    { name: 'Watch Live', href: '/watch' },
    { name: 'Gallery',    href: '/gallery' },
    { name: 'News',       href: '/news' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isDarkMode ? 'bg-zinc-950/90 border-white/10' : 'bg-white/90 border-zinc-200'} backdrop-blur-md border-b h-16 md:h-28 flex items-center`}>
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">

        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src={skyyLogo}
            alt="SKYY FC"
            className="h-10 md:h-20 w-auto object-contain group-hover:scale-110 transition-transform"
          />
          <div className="flex flex-col leading-tight">
            <span className={`text-base md:text-xl font-black tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              SKYY FC
            </span>
            <span className={`text-[9px] md:text-[10px] font-semibold tracking-widest uppercase ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Division One · Daboase
            </span>
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) =>
                `text-sm font-semibold uppercase tracking-widest transition-colors ${
                  isActive
                    ? 'text-[#EFDC43]'
                    : isDarkMode ? 'text-zinc-400 hover:text-[#EFDC43]' : 'text-zinc-600 hover:text-[#EFDC43]'
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

        {/* ── Mobile Toggle ── */}
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

      {/* ── Mobile Menu ── */}
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
                      ? 'text-[#EFDC43]'
                      : isDarkMode ? 'text-zinc-300 hover:text-[#EFDC43]' : 'text-zinc-700 hover:text-[#EFDC43]'
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