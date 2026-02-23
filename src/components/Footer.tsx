import React from 'react';
import { Facebook } from 'lucide-react';
import { CLUB_INFO } from '../data/clubData';

export const Footer = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <footer className={`border-t py-16 ${isDarkMode ? 'bg-zinc-950 border-white/5' : 'bg-white border-zinc-200'}`}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <div className="w-8 h-8 bg-[#f5a623] rounded-full flex items-center justify-center font-black text-black text-sm">S</div>
            <span className={`text-xl font-black tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              {CLUB_INFO.name}
            </span>
          </div>
          <p className="text-zinc-500 text-sm max-w-xs">
            The official website of {CLUB_INFO.name}. Based in {CLUB_INFO.location}.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-6">
          <div className="flex gap-6">
            <a 
              href={CLUB_INFO.socials.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isDarkMode ? 'bg-white/5 text-white hover:bg-[#f5a623] hover:text-black' : 'bg-black/5 text-zinc-900 hover:bg-[#f5a623] hover:text-black'}`}
            >
              <Facebook size={24} />
            </a>
          </div>
          <p className="text-zinc-600 text-[10px] uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} {CLUB_INFO.name}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
