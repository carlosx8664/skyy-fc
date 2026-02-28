import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Trophy } from 'lucide-react';
import { client } from '../lib/sanityClient';

interface Team {
  name: string;
  shortName?: string;
}

interface Result {
  _id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  date: string;
  outcome: 'win' | 'draw' | 'loss';
  report?: string;
}

const ResultBadge = ({ outcome }: { outcome: string }) => {
  const config = {
    win:  { color: 'bg-emerald-500', label: 'W' },
    draw: { color: 'bg-amber-500',   label: 'D' },
    loss: { color: 'bg-rose-500',    label: 'L' },
  };
  const { color, label } = config[outcome as keyof typeof config] ?? { color: 'bg-zinc-500', label: '?' };
  return (
    <span className={`${color} text-white text-xs font-bold px-3 py-1 rounded-sm min-w-[32px] text-center`}>
      {label}
    </span>
  );
};

export const Results = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch<Result[]>(`*[_type == "result"] | order(date desc) {
        _id,
        homeTeam-> { name, shortName },
        awayTeam-> { name, shortName },
        homeScore,
        awayScore,
        date,
        outcome,
        report
      }`)
      .then((data) => {
        if (data) setResults(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).toUpperCase();

  const getMatchInfo = (result: Result) => {
    const homeName = result.homeTeam?.name ?? '';
    const awayName = result.awayTeam?.name ?? '';
    const skyyIsHome = homeName.toUpperCase().includes('SKYY');
    const opponent = skyyIsHome
      ? (result.awayTeam?.shortName ?? awayName)
      : (result.homeTeam?.shortName ?? homeName);
    const score = skyyIsHome
      ? `${result.homeScore} — ${result.awayScore}`
      : `${result.awayScore} — ${result.homeScore}`;
    return { opponent, score };
  };

  if (loading) {
    return (
      <div className={`pt-20 md:pt-32 pb-24 flex items-center justify-center ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
        <p className="text-xl font-bold animate-pulse">Loading Results...</p>
      </div>
    );
  }

  if (!loading && results.length === 0) {
    return (
      <div className="pt-20 md:pt-32 pb-24 max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center gap-3 mb-10 md:mb-12">
          <div className="p-2 rounded-lg bg-[#EFDC43]/10 text-[#EFDC43]">
            <Trophy size={24} />
          </div>
          <h2 className={`text-2xl md:text-3xl font-bold tracking-tight uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
            Recent Results
          </h2>
        </div>
        <p className="text-zinc-500">No results yet. Check back after the next match!</p>
      </div>
    );
  }

  return (
    <div className="pt-20 md:pt-32 pb-24 max-w-7xl mx-auto px-4 md:px-6">
      <div className="flex items-center gap-3 mb-10 md:mb-12">
        <div className="p-2 rounded-lg bg-[#EFDC43]/10 text-[#EFDC43]">
          <Trophy size={24} />
        </div>
        <h2 className={`text-2xl md:text-3xl font-bold tracking-tight uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
          Recent Results
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {results.map((res) => {
          const { opponent, score } = getMatchInfo(res);
          return (
            <motion.div
              key={res._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`p-5 md:p-8 rounded-sm border flex items-center justify-between gap-4 md:gap-6 ${isDarkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-zinc-200 shadow-sm'}`}
            >
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                  {formatDate(res.date)}
                </p>
                <p className={`text-base md:text-xl font-black uppercase tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                  SKYY FC{' '}
                  <span className="text-zinc-500 mx-1 text-sm font-normal">vs</span>{' '}
                  <span className="break-words">{opponent}</span>
                </p>
                <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">
                  Ghana Division One
                </p>
                {res.report && (
                  <p className="text-xs text-zinc-400 mt-2 italic line-clamp-2">
                    {res.report}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <p className={`text-2xl md:text-3xl font-black ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                  {score}
                </p>
                <ResultBadge outcome={res.outcome} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};