import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { client } from '../lib/sanityClient';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
const urlFor = (source: any) => builder.image(source).width(600).url();

interface Player {
  _id: string;
  name: string;
  number: number;
  position: string;
  role: string;
  foot: string;
  isCaptain: boolean;
  debut: string;
  home: string;
  tags: string[];
  bio: string;
  category: 'goalkeeper' | 'defender' | 'midfielder' | 'forward';
  image: any;
  stats: Record<string, string | number>;
}

const FILTERS = [
  { label: 'All',         value: 'all' },
  { label: 'GK',          value: 'goalkeeper' },
  { label: 'DEF',         value: 'defender' },
  { label: 'MID',         value: 'midfielder' },
  { label: 'FWD',         value: 'forward' },
];

const FILTERS_FULL = [
  { label: 'All',         value: 'all' },
  { label: 'Goalkeepers', value: 'goalkeeper' },
  { label: 'Defenders',   value: 'defender' },
  { label: 'Midfielders', value: 'midfielder' },
  { label: 'Forwards',    value: 'forward' },
];

export const Squad = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState('all');
  const [selected, setSelected] = useState<Player | null>(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "player"] | order(number asc) {
        _id, name, number, position, role, foot,
        isCaptain, debut, home, tags, bio, category, image, stats
      }`)
      .then((data: Player[]) => {
        setPlayers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Prevent body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  const filtered = filter === 'all'
    ? players
    : players.filter(p => p.category === filter);

  if (loading) {
    return (
      <div className={`pt-6 pb-24 flex items-center justify-center
        ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
        <p className="text-xl font-bold animate-pulse">Loading Squad...</p>
      </div>
    );
  }

  return (
    <div className={`pt-6 pb-24 ${isDarkMode ? 'bg-zinc-950' : 'bg-zinc-50'}`}>

      {/* ── Header ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8 md:mb-10
        flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
        <div>
          <h2 className={`text-4xl md:text-5xl font-black tracking-tight
            ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
            Our Squad
          </h2>
          <p className="text-xs font-bold tracking-[0.25em] uppercase mt-2"
            style={{ color: '#EFDC43' }}>
            Pick a name. See the story.
          </p>
        </div>

        {/* Mobile: abbreviated labels; Desktop: full labels */}
        <div className="flex flex-wrap gap-2">
          {/* Mobile filters */}
          <div className="flex gap-2 md:hidden">
            {FILTERS.map(f => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-3 py-2 rounded-full text-xs font-bold border transition
                  ${filter === f.value
                    ? 'text-black border-[#EFDC43]'
                    : isDarkMode
                      ? 'border-white/20 text-white hover:border-white/50'
                      : 'border-zinc-300 text-zinc-700 hover:border-zinc-500'}`}
                style={filter === f.value ? { backgroundColor: '#EFDC43' } : {}}>
                {f.label}
              </button>
            ))}
          </div>
          {/* Desktop filters */}
          <div className="hidden md:flex gap-2">
            {FILTERS_FULL.map(f => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-4 py-2 rounded-full text-xs font-bold border transition
                  ${filter === f.value
                    ? 'text-black border-[#EFDC43]'
                    : isDarkMode
                      ? 'border-white/20 text-white hover:border-white/50'
                      : 'border-zinc-300 text-zinc-700 hover:border-zinc-500'}`}
                style={filter === f.value ? { backgroundColor: '#EFDC43' } : {}}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Player Grid ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-5">
            {filtered.map((player, i) => (
              <motion.div
                key={player._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => setSelected(player)}
                className={`rounded-2xl overflow-hidden border cursor-pointer
                  transition hover:scale-[1.03] hover:border-[#EFDC43]
                  ${isDarkMode
                    ? 'bg-zinc-950 border-white/10'
                    : 'bg-white border-zinc-200'}`}>

                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-zinc-950">
                  {player.isCaptain && (
                    <div className="absolute top-3 left-3 z-10 w-7 h-7 rounded-sm
                      flex items-center justify-center text-[10px] font-black text-black"
                      style={{ backgroundColor: '#EFDC43' }}>
                      C
                    </div>
                  )}

                  <span className="absolute top-0 right-2 text-[80px] md:text-[100px] font-black
                    leading-none select-none z-0"
                    style={{ color: '#EFDC43', opacity: 0.12 }}>
                    {player.number}
                  </span>

                  {player.image ? (
                    <img
                      src={urlFor(player.image)}
                      alt={player.name}
                      className="absolute inset-0 w-full h-full object-cover object-top z-10"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <span className="text-5xl font-black opacity-20 text-white">
                        {player.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-x-0 bottom-0 h-16 z-20
                    bg-gradient-to-t from-zinc-950 to-transparent" />
                </div>

                <div className={`p-3 md:p-4 ${isDarkMode ? 'bg-zinc-950' : 'bg-white'}`}>
                  <p className={`font-black text-xs md:text-sm leading-tight
                    ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                    {player.name}
                  </p>
                  <p className={`text-[10px] md:text-[11px] mt-1 uppercase tracking-widest
                    ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    {player.position}
                  </p>
                </div>

              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className={`py-20 text-sm opacity-40 text-center
            ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
            No players in this category yet.
          </p>
        )}
      </div>

      {/* ── Player Profile Modal ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelected(null)}>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={e => e.stopPropagation()}
              className={`relative w-full sm:max-w-3xl rounded-t-2xl sm:rounded-2xl overflow-hidden
                max-h-[92vh] flex flex-col
                ${isDarkMode ? 'bg-zinc-900' : 'bg-white'}`}>

              {/* Mobile drag indicator */}
              <div className="flex justify-center pt-3 pb-1 sm:hidden">
                <div className="w-10 h-1 rounded-full bg-zinc-400/40" />
              </div>

              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full
                  bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
                <X size={16} className="text-white" />
              </button>

              <div className="flex flex-col sm:flex-row overflow-y-auto">

                {/* Player image - shorter on mobile */}
                <div className="relative w-full sm:w-72 h-52 sm:h-auto flex-shrink-0
                  overflow-hidden bg-zinc-950">

                  <span className="absolute top-2 right-2 font-black select-none z-0 leading-none"
                    style={{ color: '#EFDC43', opacity: 0.15, fontSize: '8rem' }}>
                    {selected.number}
                  </span>

                  {selected.image ? (
                    <img
                      src={urlFor(selected.image)}
                      alt={selected.name}
                      className="absolute inset-0 w-full h-full object-cover object-top z-10"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <span className="text-6xl font-black opacity-20"
                        style={{ color: '#EFDC43' }}>
                        {selected.number}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1 p-5 sm:p-6 md:p-8 overflow-y-auto">

                  <span className={`text-xs font-bold tracking-[0.3em] uppercase
                    opacity-40 block mb-2
                    ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    First Team
                  </span>

                  <h2 className={`text-3xl md:text-4xl font-black leading-tight mb-1
                    ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                    {selected.name}
                  </h2>

                  <p className="text-base font-semibold mb-4"
                    style={{ color: '#EFDC43' }}>
                    {selected.role}
                  </p>

                  <p className={`text-sm leading-relaxed mb-6
                    ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {selected.bio}
                  </p>

                  <div className={`grid grid-cols-2 gap-px rounded-xl overflow-hidden border mb-5
                    ${isDarkMode ? 'border-white/10' : 'border-zinc-200'}`}>
                    {[
                      { label: 'Debut',         value: selected.debut },
                      { label: 'Hometown',       value: selected.home },
                      { label: 'Preferred Foot', value: selected.foot },
                      { label: 'Position',       value: selected.position },
                    ].map(({ label, value }) => (
                      <div key={label}
                        className={`flex flex-col sm:flex-row sm:justify-between sm:items-center px-3 py-2 sm:px-4 sm:py-3
                          ${isDarkMode ? 'bg-white/5' : 'bg-zinc-50'}`}>
                        <span className={`text-[10px] font-bold uppercase tracking-wider
                          ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                          {label}
                        </span>
                        <span className={`text-xs font-bold mt-0.5 sm:mt-0
                          ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                          {value ?? '—'}
                        </span>
                      </div>
                    ))}
                  </div>

                  {selected.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selected.tags.map(tag => (
                        <span key={tag}
                          className={`text-[11px] font-bold uppercase tracking-wider
                            px-3 py-1 rounded-full border
                            ${isDarkMode
                              ? 'border-white/10 text-zinc-400'
                              : 'border-zinc-200 text-zinc-500'}`}>
                          • {tag}
                        </span>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};