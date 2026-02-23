import React from 'react';
import { Trophy, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { LATEST_RESULT, NEXT_MATCH, CLUB_INFO } from '../data/clubData';

const SidebarHeader = ({ title }: { title: string }) => (
  <div className="bg-[#f5a623] text-black px-4 py-3 font-black uppercase tracking-tighter text-sm">
    {title}
  </div>
);

const STANDINGS = [
  { pos: 1, club: "SKYY FC", pts: 25 },
  { pos: 2, club: "Star FC", pts: 22 },
  { pos: 3, club: "Coastal United", pts: 19 },
  { pos: 4, club: "Western Giants", pts: 16 },
  { pos: 5, club: "Gold City FC", pts: 13 },
];

export const Sidebar = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <aside className="space-y-8">
      {/* Latest Results Sidebar */}
      <div className={`border rounded-sm overflow-hidden ${isDarkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-zinc-200 shadow-sm'}`}>
        <SidebarHeader title="Latest Results" />
        <div className="p-6 text-center">
          <p className="text-[10px] font-bold text-zinc-500 uppercase mb-4">{LATEST_RESULT.date}</p>
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex-1 flex flex-col items-center">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl font-black text-[#f5a623] mb-2 ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-100'}`}>S</div>
            </div>
            <div className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              {LATEST_RESULT.homeScore} - {LATEST_RESULT.awayScore}
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl font-black text-zinc-400 mb-2 ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-100'}`}>O</div>
            </div>
          </div>
          <p className="text-xs font-black text-[#f5a623] uppercase tracking-widest">
            {LATEST_RESULT.homeTeam} V {LATEST_RESULT.awayTeam}
          </p>
        </div>
      </div>

      {/* Next Match Sidebar */}
      <div className={`border rounded-sm overflow-hidden ${isDarkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-zinc-200 shadow-sm'}`}>
        <SidebarHeader title="Next Match" />
        <div className="p-6 text-center">
          <p className="text-xs font-black text-[#f5a623] uppercase tracking-widest mb-6">
            {NEXT_MATCH.homeTeam} V {NEXT_MATCH.awayTeam}
          </p>
          <div className="grid grid-cols-4 gap-2">
            {Object.entries(NEXT_MATCH.countdown).map(([unit, value]) => (
              <div key={unit}>
                <p className={`text-2xl font-black leading-none ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>{value}</p>
                <p className="text-[10px] text-zinc-500 uppercase font-bold mt-1">{unit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar Sidebar */}
      <div className={`border rounded-sm overflow-hidden shadow-xl ${isDarkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-zinc-200'}`}>
        <SidebarHeader title="February 2026" />
        <div className="p-4">
          <div className={`grid grid-cols-7 gap-1 text-center mb-4 border-b pb-2 ${isDarkMode ? 'border-white/5' : 'border-zinc-100'}`}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <span key={d} className="text-[10px] font-black text-zinc-400">{d}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {Array.from({ length: 28 }, (_, i) => i + 1).map(d => (
              <span key={d} className={`text-xs py-2 rounded-sm transition-colors ${d === 23 ? 'bg-[#f5a623] text-black font-black' : (isDarkMode ? 'text-zinc-300 hover:bg-white/5' : 'text-zinc-600 hover:bg-black/5')}`}>
                {d}
              </span>
            ))}
          </div>
          <div className={`flex justify-between mt-6 pt-4 border-t text-[10px] uppercase font-black text-zinc-500 ${isDarkMode ? 'border-white/5' : 'border-zinc-100'}`}>
            <span className="flex items-center gap-1 cursor-pointer hover:text-[#f5a623] transition-colors"><ChevronLeft size={12} /> Jan</span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-[#f5a623] transition-colors">Mar <ChevronRight size={12} /></span>
          </div>
        </div>
      </div>

      {/* Standings Sidebar */}
      <div className={`border rounded-sm overflow-hidden ${isDarkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-zinc-200 shadow-sm'}`}>
        <SidebarHeader title="Standings" />
        <div className="p-0">
          <table className="w-full text-left text-xs">
            <thead className={`uppercase font-bold ${isDarkMode ? 'bg-white/5 text-zinc-500' : 'bg-zinc-50 text-zinc-400'}`}>
              <tr>
                <th className="px-4 py-2">Pos</th>
                <th className="px-4 py-2">Club</th>
                <th className="px-4 py-2 text-right">Pts</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-white/5' : 'divide-zinc-100'}`}>
              {STANDINGS.map((row) => (
                <tr key={row.pos} className={row.club === "SKYY FC" ? (isDarkMode ? 'bg-[#f5a623]/10' : 'bg-[#f5a623]/5') : ''}>
                  <td className="px-4 py-3 font-bold text-zinc-400">{row.pos}</td>
                  <td className={`px-4 py-3 font-bold ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>{row.club}</td>
                  <td className="px-4 py-3 text-right font-black text-[#f5a623]">{row.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </aside>
  );
};
