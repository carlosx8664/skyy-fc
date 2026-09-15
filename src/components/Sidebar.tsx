import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { client } from '../lib/sanityClient';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
const urlFor = (source: any) => builder.image(source).width(96).height(96).url();

// ── Change this if your Skyy FC team is named differently in Sanity ──
const SKYY_TEAM_NAME = 'Skyy FC';

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

interface RawResult {
  _id: string;
  homeTeamId: string;
  homeTeamName: string;
  awayTeamId: string;
  awayTeamName: string;
  homeScore: number;
  awayScore: number;
}

interface StandingRow {
  teamId: string;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
  isSkyy: boolean;
  position: number;
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

// ─── Compute standings from raw results ──────────────────────────────────────
const computeStandings = (results: RawResult[]): StandingRow[] => {
  const table = new Map<string, Omit<StandingRow, 'position' | 'isSkyy' | 'gd'>>();

  const ensure = (id: string, name: string) => {
    if (!table.has(id)) {
      table.set(id, {
        teamId: id,
        team: name,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        gf: 0,
        ga: 0,
        points: 0,
      });
    }
    return table.get(id)!;
  };

  for (const r of results) {
    if (
      r.homeScore == null || r.awayScore == null ||
      !r.homeTeamId || !r.awayTeamId
    ) continue;

    const home = ensure(r.homeTeamId, r.homeTeamName);
    const away = ensure(r.awayTeamId, r.awayTeamName);

    home.played++;  away.played++;
    home.gf += r.homeScore;  home.ga += r.awayScore;
    away.gf += r.awayScore;  away.ga += r.homeScore;

    if (r.homeScore > r.awayScore) {
      home.won++;  home.points += 3;
      away.lost++;
    } else if (r.homeScore < r.awayScore) {
      away.won++;  away.points += 3;
      home.lost++;
    } else {
      home.drawn++;  home.points += 1;
      away.drawn++;  away.points += 1;
    }
  }

  return [...table.values()]
    .map((row) => ({
      ...row,
      gd: row.gf - row.ga,
      isSkyy: row.team.trim().toLowerCase() === SKYY_TEAM_NAME.toLowerCase(),
    }))
    .sort((a, b) =>
      b.points - a.points ||
      b.gd - a.gd ||
      b.gf - a.gf ||
      a.team.localeCompare(b.team)
    )
    .map((row, i) => ({ ...row, position: i + 1 }));
};

export const Sidebar = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [latestResult, setLatestResult] = useState<LatestResult | null>(null);
  const [standings, setStandings]       = useState<StandingRow[]>([]);
  const [loading, setLoading]           = useState(true);

  const today = new Date();
  const [calendarDate, setCalendarDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  useEffect(() => {
    // ── Latest result — ONLY Skyy FC matches ──
    client
      .fetch<LatestResult | null>(
        `*[
          _type == "result"
          && (homeTeam->name match "Skyy*" || awayTeam->name match "Skyy*")
        ] | order(date desc)[0] {
          _id, homeScore, awayScore, date, outcome,
          homeTeam-> { name, shortName, logo },
          awayTeam-> { name, shortName, logo }
        }`
      )
      .then((data) => { if (data) setLatestResult(data); })
      .catch((err) => console.error('❌ Result error:', err));

    // ── Standings — ALL results in the league ──
    client
      .fetch<RawResult[]>(
        `*[_type == "result" && defined(homeScore) && defined(awayScore)] {
          _id,
          homeScore,
          awayScore,
          "homeTeamId":   homeTeam->_id,
          "homeTeamName": homeTeam->name,
          "awayTeamId":   awayTeam->_id,
          "awayTeamName": awayTeam->name
        }`
      )
      .then((data) => {
        setStandings(computeStandings(data ?? []));
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Standings error:', err);
        setLoading(false);
      });
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
  const daysInMonth    = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(calYear, calMonth, 1).getDay();
  const prevMonth = () => setCalendarDate(new Date(calYear, calMonth - 1, 1));
  const nextMonth = () => setCalendarDate(new Date(calYear, calMonth + 1, 1));
  const isToday = (day: number) =>
    day === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();

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

      {/* ── Standings (auto-computed from results) ── */}
      <div id="standings" className={`border rounded-sm overflow-hidden ${isDarkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-zinc-200 shadow-sm'}`}>
        <SidebarHeader title="2026/27 Standings" />
        <div className="p-0">
          {loading ? (
            <div className="p-6 text-center">
              <p className="text-zinc-500 text-sm animate-pulse">Loading standings...</p>
            </div>
          ) : standings.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-zinc-500 text-sm">No results recorded yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className={`sticky top-0 uppercase font-bold ${isDarkMode ? 'bg-zinc-900 text-zinc-500' : 'bg-white text-zinc-400'}`}>
                  <tr>
                    <th className="px-3 py-2">Pos</th>
                    <th className="px-3 py-2">Club</th>
                    <th className="px-2 py-2 text-center">P</th>
                    <th className="px-2 py-2 text-center">W</th>
                    <th className="px-2 py-2 text-center">D</th>
                    <th className="px-2 py-2 text-center">L</th>
                    <th className="px-2 py-2 text-center">GD</th>
                    <th className="px-3 py-2 text-right">Pts</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDarkMode ? 'divide-white/5' : 'divide-zinc-100'}`}>
                  {standings.map((row) => (
                    <tr
                      key={row.teamId}
                      className={row.isSkyy ? (isDarkMode ? 'bg-[#EFDC43]/10' : 'bg-[#EFDC43]/5') : ''}
                    >
                      <td className="px-3 py-3 font-bold text-zinc-400">{row.position}</td>
                      <td className={`px-3 py-3 font-bold whitespace-nowrap ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                        {row.team}
                      </td>
                      <td className="px-2 py-3 text-center text-zinc-400">{row.played}</td>
                      <td className="px-2 py-3 text-center text-zinc-400">{row.won}</td>
                      <td className="px-2 py-3 text-center text-zinc-400">{row.drawn}</td>
                      <td className="px-2 py-3 text-center text-zinc-400">{row.lost}</td>
                      <td className="px-2 py-3 text-center text-zinc-400">
                        {row.gd > 0 ? `+${row.gd}` : row.gd}
                      </td>
                      <td className="px-3 py-3 text-right font-black text-[#EFDC43]">{row.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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