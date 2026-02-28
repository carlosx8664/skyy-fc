import React, { useEffect, useState } from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { client } from '../lib/sanityClient';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
const urlFor = (source: any) => builder.image(source).width(64).url();

interface Team {
  name: string;
  shortName: string;
  logo: any;
}

interface Fixture {
  _id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  venue: string;
  kickOff: string;
}

export const MatchPanel = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(`*[_type == "fixture" && date > now()] | order(date asc)[0...3] {
        _id,
        date,
        venue,
        kickOff,
        homeTeam -> { name, shortName, logo },
        awayTeam -> { name, shortName, logo }
      }`)
      .then((data: Fixture[]) => {
        setFixtures(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleLeagueTableClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('standings');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Always point countdown at the first future fixture
  const now = new Date();
  const upcomingFixtures = fixtures.filter(fx => new Date(fx.date) > now);
  const nextFixture = upcomingFixtures[0] ?? fixtures[0];
  const nextFixtureDate = nextFixture?.date ?? '';
  const { days, hours, mins, secs } = useCountdown(nextFixtureDate);
  const venue = nextFixture?.venue ?? 'TBD';

  const leagueTableBtn = (
    <a
      href="#standings"
      onClick={handleLeagueTableClick}
      className="text-xs font-bold border rounded-full px-3 py-1 transition hover:opacity-70 whitespace-nowrap"
      style={{ borderColor: '#EFDC43', color: '#EFDC43' }}>
      League Table →
    </a>
  );

  return (
    <aside className={`rounded-2xl border p-6 flex flex-col gap-5 backdrop-blur-md
      ${isDarkMode
        ? 'bg-white/5 border-white/10 text-white'
        : 'bg-black/5 border-black/10 text-zinc-900'}`}>

      {/* TOP */}
      <div className="flex flex-col gap-3">

        {/* Mobile only: League Table on its own row above Next Fixture */}
        <div className="flex justify-end md:hidden">
          {leagueTableBtn}
        </div>

        {/* Next Fixture row — League Table sits inline here on desktop */}
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase"
              style={{ color: '#EFDC43' }}>Next Fixture</span>
            <h4 className="text-sm font-semibold mt-1 opacity-70">{venue}</h4>
          </div>
          {/* Desktop only */}
          <div className="hidden md:flex">
            {leagueTableBtn}
          </div>
        </div>
      </div>

      {/* COUNTDOWN */}
      {loading ? (
        <div className="flex justify-center py-3">
          <span className="text-xs opacity-40 animate-pulse">Loading fixtures...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-3 py-3">
          {[
            { val: days,  label: 'Days' },
            { val: hours, label: 'Hours' },
            { val: mins,  label: 'Min' },
            { val: secs,  label: 'Sec' },
          ].map(({ val, label }, i) => (
            <React.Fragment key={label}>
              {i > 0 && <span className="text-2xl font-bold opacity-30">:</span>}
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black tabular-nums" style={{ color: '#EFDC43' }}>
                  {val}
                </span>
                <small className="text-[10px] uppercase tracking-widest opacity-50">{label}</small>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}

      {/* FIXTURES LIST */}
      <div className="flex flex-col gap-3">
        {fixtures.map((fx) => {
          const kickOff = fx.kickOff ?? new Date(fx.date).toLocaleTimeString('en-GB', {
            hour: '2-digit', minute: '2-digit'
          });
          const dateLabel = new Date(fx.date).toLocaleDateString('en-GB', {
            weekday: 'short', day: 'numeric', month: 'short'
          });
          const isPast = new Date(fx.date) <= now;

          return (
            <div key={fx._id}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 transition
                ${isPast ? 'opacity-40' : ''}
                ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>

              {/* Home logo */}
              {fx.homeTeam?.logo ? (
                <img src={urlFor(fx.homeTeam.logo)} alt={fx.homeTeam.name}
                  className="w-8 h-8 object-contain rounded-full" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center
                  text-[9px] font-bold opacity-60">
                  {fx.homeTeam?.shortName?.slice(0, 2) ?? '??'}
                </div>
              )}

              {/* Match info */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate">
                  {fx.homeTeam?.name} vs {fx.awayTeam?.name}
                </p>
                <p className="text-[11px] opacity-50">{dateLabel} • {kickOff}</p>
              </div>

              {/* Away logo */}
              {fx.awayTeam?.logo ? (
                <img src={urlFor(fx.awayTeam.logo)} alt={fx.awayTeam.name}
                  className="w-8 h-8 object-contain rounded-full" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center
                  text-[9px] font-bold opacity-60">
                  {fx.awayTeam?.shortName?.slice(0, 2) ?? '??'}
                </div>
              )}

            </div>
          );
        })}

        {!loading && fixtures.length === 0 && (
          <p className="text-xs opacity-40 text-center py-2">No upcoming fixtures</p>
        )}
      </div>

    </aside>
  );
};