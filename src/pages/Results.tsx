import React from 'react';
import { motion } from 'motion/react';
import { Trophy } from 'lucide-react';
import { RESULTS } from '../data/clubData';

const ResultBadge = ({ result }: { result: string }) => {
  const colors = {
    W: "bg-emerald-500",
    D: "bg-amber-500",
    L: "bg-rose-500"
  };
  return (
    <span className={`${colors[result as keyof typeof colors]} text-white text-xs font-bold px-3 py-1 rounded-sm min-w-[32px] text-center`}>
      {result}
    </span>
  );
};

export const Results = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6">
      <div className="flex items-center gap-3 mb-12">
        <div className="p-2 rounded-lg bg-[#f5a623]/10 text-[#f5a623]">
          <Trophy size={24} />
        </div>
        <h2 className={`text-3xl font-bold tracking-tight uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Recent Results</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {RESULTS.map((res) => (
          <motion.div 
            key={res.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`p-8 rounded-sm border flex items-center justify-between gap-6 ${isDarkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-zinc-200 shadow-sm'}`}
          >
            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">{res.date}</p>
              <div className="flex items-center gap-4">
                <p className={`text-xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                  SKYY FC <span className="text-zinc-500 mx-1 text-sm font-normal">vs</span> {res.opponent}
                </p>
              </div>
              <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">{res.competition}</p>
            </div>

            <div className="flex flex-col items-end gap-3">
              <p className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>{res.score}</p>
              <ResultBadge result={res.result} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
