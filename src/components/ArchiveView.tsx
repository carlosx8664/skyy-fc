import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Archive, X } from 'lucide-react';
import { client } from '../lib/sanityClient';
import imageUrlBuilder from '@sanity/image-url';
import { getArchivedSquadBySeason } from '../lib/squadUtils';

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

interface ArchiveViewProps {
  isDarkMode: boolean;
  season: string;
  onClose: () => void;
}

export const ArchiveView = ({ isDarkMode, season, onClose }: ArchiveViewProps) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArchivedSquadBySeason(season)
      .then(data => {
        setPlayers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [season]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        className={`max-w-7xl mx-auto rounded-2xl p-6
          ${isDarkMode ? 'bg-zinc-900' : 'bg-white'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Archive size={24} className="text-amber-500" />
            <h2 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              {season} Archived Squad
            </h2>
            <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
              ({players.length} players)
            </span>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg hover:bg-white/10 transition`}
          >
            <X size={24} className={isDarkMode ? 'text-white' : 'text-zinc-900'} />
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <p className={`text-xl font-bold animate-pulse ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              Loading archived squad...
            </p>
          </div>
        ) : players.length === 0 ? (
          <div className="py-20 text-center">
            <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
              No archived players found for {season}.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {players.map((player) => (
              <div
                key={player._id}
                className={`rounded-xl overflow-hidden border
                  ${isDarkMode ? 'border-white/10 bg-zinc-800' : 'border-zinc-200 bg-zinc-50'}`}
              >
                <div className="relative h-40 overflow-hidden bg-zinc-950">
                  {player.image && (
                    <img
                      src={urlFor(player.image)}
                      alt={player.name}
                      className="w-full h-full object-cover object-top"
                    />
                  )}
                  <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-zinc-950 to-transparent" />
                </div>
                <div className="p-3">
                  <p className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                    {player.name}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    #{player.number} • {player.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};