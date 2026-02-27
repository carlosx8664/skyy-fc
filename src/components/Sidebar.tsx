import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { client } from '../lib/sanityClient';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
const urlFor = (source: any) => builder.image(source).width(96).height(96).url();

interface Team {
  name: string;
  shortName?: string;
  logo?: any;
}

interface LatestResult {
  _id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  date: string;
  outcome: 'win' | 'draw' | 'loss';
}

interface LeagueTable {
  _id: string;
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
  isSkyy: boolean;
}

const SidebarHeader = ({ title }: { title: string }) => (
  <div className="bg-[#EFDC43] text-black px-4 py-3 font-black uppercase tracking-tighter text-sm">
    {title}
  </div>
);

const TeamLogo = ({ logo, fallback, isDarkMode }: { logo?: any; fallback: string; isDarkMode: boolean }) => (
  <div className={`w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden mb-2 ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
    {logo ? (
      <img src={urlFor(logo)} alt={fallback} className="w-full h-full object-contain p-1" />
    ) : (
      <span className="text-xl font-black text-[#EFDC43]">⚡</span>
    )}
  </div>
);

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

const outcomeColor = (outcome: string) => {
  if (outcome === 'win')  return 'bg-emerald-500';
  if (outcome === 'draw') return 'bg-amber-500';
  if (outcome === 'loss') return 'bg-rose-500';
  return 'bg-zinc-500';
};

export const Sidebar = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [latestResult, setLatestResult] = useState<LatestResult | null>(null);
  const [standings, setStandings]       = useState<LeagueTable[]>([]);
  const [loading, setLoading]           = useState(true);
  const [standingsPage, setStandingsPage] = useState(0);

  const today = new Date();
  const [calendarDate, setCalendarDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  useEffect(() => {
    client
      .fetch<LatestResult | null>(
        `*[_type == "result"] | order(date desc)[0] {
          _id, homeScore, awayScore, date, outcome,
          homeTeam-> { name, shortName, logo },
          awayTeam-> { name, shortName, logo }
        }`
      )
      .then((data) => { if (data) setLatestResult(data); })
      .catch((err) => console.error('❌ Result error:', err));

    client
      .fetch<LeagueTable[]>(
        `*[_type == "leagueTable"] | order(position asc) {
          _id, position, team, played, won, drawn, lost, points, isSkyy
        }`
      )
      .then((data) => {
        if (data) setStandings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return 'TBD';
    return d.toLocaleDateString('en-GB', {
      weekday: 'short', day: 'numeric', month: 'short',
    }).toUpperCase();
  };

  const calYear  = calendarDate.getFullYear();
  const calMonth = calendarDate.getMonth();
  const daysInMonth   = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(calYear, calMonth, 1).getDay();
  const prevMonth = () => setCalendarDate(new Date(calYear, calMonth - 1, 1));
  const nextMonth = () => setCalendarDate(new Date(calYear, calMonth + 1, 1));
  const isToday = (day: number) =>
    day === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();

  const pagedStandings = standings.slice(standingsPage * 8, standingsPage * 8 + 8);
  const totalPages     = Math.ceil(standings.length / 8);

  return (
    <aside className="space-y-8">

      {/* ── Latest Result ── */}
      <div className={`border rounded-sm overflow-hidden ${isDarkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-zinc-200 shadow-sm'}`}>
        <SidebarHeader title="Latest Result" />
        <div className="p-6 text-center">
          {latestResult ? (
            <>
              <p className="text-[10px] font-bold text-zinc-500 uppercase mb-4">
                {formatDate(latestResult.date)}
              </p>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex-1 flex flex-col items-center">
                  <TeamLogo logo={latestResult.homeTeam.logo} fallback={latestResult.homeTeam.name} isDarkMode={isDarkMode} />
                  <span className="text-xs uppercase font-bold text-zinc-400 text-center leading-tight">
                    {latestResult.homeTeam.shortName ?? latestResult.homeTeam.name}
                  </span>
                </div>
                <span className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                  {latestResult.homeScore} - {latestResult.awayScore}
                </span>
                <div className="flex-1 flex flex-col items-center">
                  <TeamLogo logo={latestResult.awayTeam.logo} fallback={latestResult.awayTeam.name} isDarkMode={isDarkMode} />
                  <span className="text-xs uppercase font-bold text-zinc-400 text-center leading-tight">
                    {latestResult.awayTeam.shortName ?? latestResult.awayTeam.name}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <p className="text-xs font-bold text-[#EFDC43] uppercase tracking-widest">
                  Ghana Division One
                </p>
                {latestResult.outcome && (
                  <span className={`${outcomeColor(latestResult.outcome)} text-white text-[10px] font-black px-2 py-0.5 rounded-sm`}>
                    {latestResult.outcome === 'win' ? 'W' : latestResult.outcome === 'draw' ? 'D' : 'L'}
                  </span>
                )}
              </div>
            </>
          ) : (
            <p className="text-zinc-500 text-sm">No recent results</p>
          )}
        </div>
      </div>

      {/* ── Standings ── */}
      <div className={`border rounded-sm overflow-hidden ${isDarkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-zinc-200 shadow-sm'}`}>
        <SidebarHeader title="Standings" />
        <div className="p-0">
          {loading ? (
            <div className="p-6 text-center">
              <p className="text-zinc-500 text-sm animate-pulse">Loading standings...</p>
            </div>
          ) : (
            <>
              <table className="w-full text-left text-xs">
                <thead className={`uppercase font-bold ${isDarkMode ? 'bg-white/5 text-zinc-500' : 'bg-zinc-50 text-zinc-400'}`}>
                  <tr>
                    <th className="px-3 py-2">Pos</th>
                    <th className="px-3 py-2">Club</th>
                    <th className="px-2 py-2 text-center">W</th>
                    <th className="px-2 py-2 text-center">D</th>
                    <th className="px-2 py-2 text-center">L</th>
                    <th className="px-3 py-2 text-right">Pts</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDarkMode ? 'divide-white/5' : 'divide-zinc-100'}`}>
                  {pagedStandings.map((row) => (
                    <tr
                      key={row._id}
                      className={row.isSkyy ? (isDarkMode ? 'bg-[#EFDC43]/10' : 'bg-[#EFDC43]/5') : ''}
                    >
                      <td className="px-3 py-3 font-bold text-zinc-400">{row.position}</td>
                      <td className={`px-3 py-3 font-bold ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                        {row.team}
                      </td>
                      <td className="px-2 py-3 text-center text-zinc-400">{row.won}</td>
                      <td className="px-2 py-3 text-center text-zinc-400">{row.drawn}</td>
                      <td className="px-2 py-3 text-center text-zinc-400">{row.lost}</td>
                      <td className="px-3 py-3 text-right font-black text-[#EFDC43]">{row.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className={`flex items-center justify-between px-4 py-3 border-t text-[10px] uppercase font-black ${isDarkMode ? 'border-white/5 text-zinc-500' : 'border-zinc-100 text-zinc-400'}`}>
                  <button
                    onClick={() => setStandingsPage(0)}
                    disabled={standingsPage === 0}
                    className={`flex items-center gap-1 transition-colors ${
                      standingsPage === 0
                        ? 'text-[#EFDC43] cursor-default'
                        : 'hover:text-[#EFDC43] cursor-pointer'
                    }`}
                  >
                    <ChevronLeft size={12} /> 1–8
                  </button>
                  <span className={isDarkMode ? 'text-zinc-600' : 'text-zinc-300'}>
                    {standingsPage === 0 ? 'Top Half' : 'Bottom Half'}
                  </span>
                  <button
                    onClick={() => setStandingsPage(1)}
                    disabled={standingsPage === 1}
                    className={`flex items-center gap-1 transition-colors ${
                      standingsPage === 1
                        ? 'text-[#EFDC43] cursor-default'
                        : 'hover:text-[#EFDC43] cursor-pointer'
                    }`}
                  >
                    9–16 <ChevronRight size={12} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ── Calendar ── */}
      <div className={`border rounded-sm overflow-hidden shadow-xl ${isDarkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-zinc-200'}`}>
        <SidebarHeader title={`${MONTH_NAMES[calMonth]} ${calYear}`} />
        <div className="p-4">
          <div className={`grid grid-cols-7 gap-1 text-center mb-4 border-b pb-2 ${isDarkMode ? 'border-white/5' : 'border-zinc-100'}`}>
            {['S','M','T','W','T','F','S'].map((d, i) => (
              <span key={i} className="text-[10px] font-black text-zinc-400">{d}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {Array.from({ length: firstDayOfWeek }).map((_, i) => <span key={`e-${i}`} />)}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => (
              <span key={d} className={`text-xs py-2 rounded-sm transition-colors ${
                isToday(d)
                  ? 'bg-[#EFDC43] text-black font-black'
                  : isDarkMode ? 'text-zinc-300 hover:bg-white/5' : 'text-zinc-600 hover:bg-black/5'
              }`}>
                {d}
              </span>
            ))}
          </div>
          <div className={`flex justify-between mt-6 pt-4 border-t text-[10px] uppercase font-black text-zinc-500 ${isDarkMode ? 'border-white/5' : 'border-zinc-100'}`}>
            <span onClick={prevMonth} className="flex items-center gap-1 cursor-pointer hover:text-[#EFDC43] transition-colors">
              <ChevronLeft size={12} />
              {MONTH_NAMES[calMonth === 0 ? 11 : calMonth - 1]?.slice(0, 3)}
            </span>
            <span onClick={nextMonth} className="flex items-center gap-1 cursor-pointer hover:text-[#EFDC43] transition-colors">
              {MONTH_NAMES[calMonth === 11 ? 0 : calMonth + 1]?.slice(0, 3)}
              <ChevronRight size={12} />
            </span>
          </div>
        </div>
      </div>

    </aside>
  );
};
