import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { client } from '../lib/sanityClient';

interface Team {
  name: string;
  shortName?: string;
}

interface Fixture {
  _id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  venue: string;
  kickOff: string;
  matchday: number;
}

export const Fixtures = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch<Fixture[]>(`*[_type == "fixture"] | order(date asc) {
        _id,
        homeTeam-> { name, shortName },
        awayTeam-> { name, shortName },
        date,
        venue,
        kickOff,
        matchday
      }`)
      .then((data) => {
        if (data) setFixtures(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return {
      day:   d.toLocaleDateString('en-GB', { weekday: 'short' }).toUpperCase(),
      date:  d.getDate(),
      month: d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase(),
    };
  };

  if (loading) {
    return (
      <div className={`pt-32 pb-24 flex items-center justify-center ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
        <p className="text-xl font-bold animate-pulse">Loading Fixtures...</p>
      </div>
    );
  }

  if (!loading && fixtures.length === 0) {
    return (
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-12">
          <div className="p-2 rounded-lg bg-[#EFDC43]/10 text-[#EFDC43]">
            <CalendarIcon size={24} />
          </div>
          <h2 className={`text-3xl font-bold tracking-tight uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
            Upcoming Fixtures
          </h2>
        </div>
        <p className="text-zinc-500">No upcoming fixtures at the moment. Check back soon.</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6">
      <div className="flex items-center gap-3 mb-12">
        <div className="p-2 rounded-lg bg-[#EFDC43]/10 text-[#EFDC43]">
          <CalendarIcon size={24} />
        </div>
        <h2 className={`text-3xl font-bold tracking-tight uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
          Upcoming Fixtures
        </h2>
      </div>

      <div className="space-y-6">
        {fixtures.map((fixture) => {
          const formatted = formatDate(fixture.date);
          const homeName = fixture.homeTeam?.shortName ?? fixture.homeTeam?.name ?? 'TBD';
          const awayName = fixture.awayTeam?.shortName ?? fixture.awayTeam?.name ?? 'TBD';
          return (
            <motion.div
              key={fixture._id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`p-8 rounded-sm border flex flex-col md:flex-row items-center justify-between gap-8 ${isDarkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-zinc-200 shadow-sm'}`}
            >
              <div className="flex items-center gap-8 flex-1">
                <div className="text-center min-w-[80px]">
                  <p className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                    {formatted.date}
                  </p>
                  <p className="text-xs font-bold text-[#EFDC43] uppercase">{formatted.day}</p>
                  <p className="text-xs text-zinc-500 uppercase">{formatted.month}</p>
                </div>
                <div className={`h-12 w-px hidden md:block ${isDarkMode ? 'bg-white/10' : 'bg-zinc-200'}`} />
                <div>
                  <p className={`text-xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                    {homeName}{' '}
                    <span className="text-zinc-500 mx-2 text-sm font-normal">vs</span>{' '}
                    {awayName}
                  </p>
                  {fixture.matchday && (
                    <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">
                      Matchday {fixture.matchday} — Ghana Division One
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:items-end gap-2">
                <div className="flex items-center gap-2 text-sm font-bold text-zinc-400">
                  <Clock size={16} className="text-[#EFDC43]" />
                  {fixture.kickOff}
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500 uppercase">
                  <MapPin size={14} />
                  {fixture.venue}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
