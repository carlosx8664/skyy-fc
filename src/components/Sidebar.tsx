import React, { useState, useEffect } from 'react';
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
  team: Team;
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

const TeamLogo = ({
  logo,
  fallback,
  isDarkMode,
}: {
  logo?: any;
  fallback: string;
  isDarkMode: boolean;
}) => (
  <div
    className={`w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden mb-2 ${
      isDarkMode ? 'bg-zinc-800' : 'bg-zinc-100'
    }`}
  >
    {logo ? (
      <img src={urlFor(logo)} alt={fallback} className="w-full h-full object-contain p-1" />
    ) : (
      <span className="text-xl font-black text-[#EFDC43]">⚡</span>
    )}
  </div>
);

const outcomeColor = (outcome: string) => {
  if (outcome === 'win') return 'bg-emerald-500';
  if (outcome === 'draw') return 'bg-amber-500';
  if (outcome === 'loss') return 'bg-rose-500';
  return 'bg-zinc-500';
};

const firstTwoWords = (s?: string) =>
  (s ?? '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .join(' ');

export const Sidebar = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [latestResult, setLatestResult] = useState<LatestResult | null>(null);
  const [standings, setStandings] = useState<LeagueTable[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch<LatestResult | null>(
        `*[_type == "result"] | order(date desc)[0] {
          _id, homeScore, awayScore, date, outcome,
          homeTeam-> { name, shortName, logo },
          awayTeam-> { name, shortName, logo }
        }`
      )
      .then((data) => {
        if (data) setLatestResult(data);
      })
      .catch((err) => console.error('❌ Result error:', err));

    client
      .fetch<LeagueTable[]>(
        `*[_type == "leagueTable"] | order(position asc) {
          _id,
          position,
          played,
          won,
          drawn,
          lost,
          points,
          isSkyy,
          "team": team->{
            name,
            shortName,
            logo
          }
        }`
      )
      .then((data) => {
        if (data) setStandings(data);
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
    return d
      .toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
      .toUpperCase();
  };

  return (
    <aside className="space-y-8">
      {/* ── Latest Result ── */}
      <div
        className={`border rounded-sm overflow-hidden ${
          isDarkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-zinc-200 shadow-sm'
        }`}
      >
        <SidebarHeader title="Latest Result" />
        <div className="p-6 text-center">
          {latestResult ? (
            <>
              <p className="text-[10px] font-bold text-zinc-500 uppercase mb-4">
                {formatDate(latestResult.date)}
              </p>

              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex-1 flex flex-col items-center">
                  <TeamLogo
                    logo={latestResult.homeTeam.logo}
                    fallback={latestResult.homeTeam.name}
                    isDarkMode={isDarkMode}
                  />
                  <span className="text-xs uppercase font-bold text-zinc-400 text-center leading-tight">
                    {latestResult.homeTeam.shortName ?? latestResult.homeTeam.name}
                  </span>
                </div>

                <span className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                  {latestResult.homeScore} - {latestResult.awayScore}
                </span>

                <div className="flex-1 flex flex-col items-center">
                  <TeamLogo
                    logo={latestResult.awayTeam.logo}
                    fallback={latestResult.awayTeam.name}
                    isDarkMode={isDarkMode}
                  />
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
                  <span
                    className={`${outcomeColor(latestResult.outcome)} text-white text-[10px] font-black px-2 py-0.5 rounded-sm`}
                  >
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
      <div
        id="standings"
        className={`border rounded-sm overflow-hidden ${
          isDarkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-zinc-200 shadow-sm'
        }`}
      >
        <SidebarHeader title="Standings" />

        {loading ? (
          <div className="p-6 text-center">
            <p className="text-zinc-500 text-sm animate-pulse">Loading standings...</p>
          </div>
        ) : (
          <div className="p-0">
            <table className="w-full text-left text-xs table-fixed">
              <thead
                className={`uppercase font-bold ${
                  isDarkMode ? 'bg-zinc-900 text-zinc-500' : 'bg-white text-zinc-400'
                }`}
              >
                <tr>
                  <th className="px-3 py-2 w-[44px]">Pos</th>
                  <th className="px-3 py-2">Club</th>
                  <th className="px-2 py-2 text-center w-[34px]">W</th>
                  <th className="px-2 py-2 text-center w-[34px]">D</th>
                  <th className="px-2 py-2 text-center w-[34px]">L</th>
                  <th className="px-3 py-2 text-right w-[46px]">Pts</th>
                </tr>
              </thead>

              <tbody className={`divide-y ${isDarkMode ? 'divide-white/5' : 'divide-zinc-100'}`}>
                {standings.map((row) => (
                  <tr
                    key={row._id}
                    className={row.isSkyy ? (isDarkMode ? 'bg-[#EFDC43]/10' : 'bg-[#EFDC43]/5') : ''}
                  >
                    <td className="px-3 py-3 font-bold text-zinc-400">{row.position}</td>

                    <td
                      className={`px-3 py-3 font-semibold text-[11px] leading-tight uppercase tracking-tight ${
                        isDarkMode ? 'text-white' : 'text-zinc-900'
                      }`}
                      title={row.team?.name ?? ''}
                    >
                      {row.team?.name ? firstTwoWords(row.team.name) : '—'}
                    </td>

                    <td className="px-2 py-3 text-center text-zinc-400">{row.won}</td>
                    <td className="px-2 py-3 text-center text-zinc-400">{row.drawn}</td>
                    <td className="px-2 py-3 text-center text-zinc-400">{row.lost}</td>
                    <td className="px-3 py-3 text-right font-black text-[#EFDC43]">{row.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Calendar hidden for now ── */}
    </aside>
  );
};
