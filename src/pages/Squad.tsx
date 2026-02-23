import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { SQUAD } from '../data/clubData';

export const Squad = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const playersPerPage = 6;
  const totalPages = Math.ceil(SQUAD.length / playersPerPage);

  const currentPlayers = SQUAD.slice(
    currentPage * playersPerPage,
    (currentPage + 1) * playersPerPage
  );

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#f5a623]/10 text-[#f5a623]">
            <Users size={24} />
          </div>
          <h2 className={`text-3xl font-bold tracking-tight uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>The Squad</h2>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className={`p-2 rounded-full transition-all ${isDarkMode ? 'bg-white/5 text-white disabled:opacity-20' : 'bg-black/5 text-zinc-900 disabled:opacity-20'}`}
          >
            <ChevronLeft size={24} />
          </button>
          <span className={`text-sm font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
            Page {currentPage + 1} of {totalPages}
          </span>
          <button 
            onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
            disabled={currentPage === totalPages - 1}
            className={`p-2 rounded-full transition-all ${isDarkMode ? 'bg-white/5 text-white disabled:opacity-20' : 'bg-black/5 text-zinc-900 disabled:opacity-20'}`}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        <AnimatePresence mode="wait">
          {currentPlayers.map((player) => (
            <motion.div 
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className={`relative aspect-[3/4] rounded-sm overflow-hidden mb-4 border flex items-center justify-center ${isDarkMode ? 'bg-zinc-800 border-white/5' : 'bg-zinc-100 border-zinc-200'}`}>
                {/* Player Photo Placeholder */}
                <div className="text-6xl font-black opacity-10 group-hover:opacity-20 transition-opacity">
                  {player.initials}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="text-4xl font-black text-[#f5a623] opacity-50 group-hover:opacity-100 transition-opacity">
                    #{player.number}
                  </span>
                </div>
              </div>
              <h3 className={`text-lg font-bold uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>{player.name}</h3>
              <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">{player.position}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
