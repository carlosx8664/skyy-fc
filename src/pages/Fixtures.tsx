import React from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { FIXTURES } from '../data/clubData';

export const Fixtures = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6">
      <div className="flex items-center gap-3 mb-12">
        <div className="p-2 rounded-lg bg-[#f5a623]/10 text-[#f5a623]">
          <CalendarIcon size={24} />
        </div>
        <h2 className={`text-3xl font-bold tracking-tight uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Upcoming Fixtures</h2>
      </div>

      <div className="space-y-6">
        {FIXTURES.map((fixture) => (
          <motion.div 
            key={fixture.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`p-8 rounded-sm border flex flex-col md:flex-row items-center justify-between gap-8 ${isDarkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-zinc-200 shadow-sm'}`}
          >
            <div className="flex items-center gap-8 flex-1">
              <div className="text-center min-w-[80px]">
                <p className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>{fixture.date.split(' ')[1].replace(',', '')}</p>
                <p className="text-xs font-bold text-[#f5a623] uppercase">{fixture.date.split(' ')[0]}</p>
              </div>
              <div className={`h-12 w-px hidden md:block ${isDarkMode ? 'bg-white/10' : 'bg-zinc-200'}`}></div>
              <div>
                <p className={`text-xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                  {fixture.homeTeam} <span className="text-zinc-500 mx-2 text-sm font-normal">vs</span> {fixture.awayTeam}
                </p>
                <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">{fixture.competition}</p>
              </div>
            </div>

            <div className="flex flex-col md:items-end gap-2">
              <div className="flex items-center gap-2 text-sm font-bold text-zinc-400">
                <Clock size={16} className="text-[#f5a623]" />
                {fixture.time}
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500 uppercase">
                <MapPin size={14} />
                {fixture.venue}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
