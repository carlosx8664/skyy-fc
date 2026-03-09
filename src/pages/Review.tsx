import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { client } from '../lib/sanityClient';

const seasons = [
  {
    year: '2016/2017',
    title: 'Maiden Season',
    subtitle: 'Division Two — Unbeaten Champions',
    result: 'Promoted',
    resultColor: 'bg-emerald-500',
    body: `Skyy FC's very first season in Division Two. Competed in the 6-club Shama Zone competition alongside Pokumsco, Ajax, Esmaman FC, Unicorn FC and Shalom FC — winning the middle league slot with an unbeaten record, conceding just one goal in 10 matches.

Progressed through the Western Region middle league at Gyandu Park, beating Arsenals Babies and Rail Stars. At the Division One promotional super league at Essipon Stadium, Skyy FC beat hot favourites Bis Paradise in the semis and Sefwi All Stars in the final — earning promotion to the National Division One still unbeaten all season.`,
    stats: [{ label: 'Players', value: '26' }, { label: 'Coaches', value: '2' }, { label: 'Goals Conceded', value: '1' }],
  },
  {
    year: '2017/2018',
    title: 'Anas 12 Season',
    subtitle: 'Division One Debut',
    result: 'Truncated',
    resultColor: 'bg-amber-500',
    body: `Skyy FC's first season at Division One level. Competed against Swedru All Blacks, Sekondi Hasaacas, New Edubiase, Samartex, Goldstars, Nzema Kotoko, Asokwa Deportivo, Achikens, Unistar Academy, BYF, Pacific Heroes, Cape Coast Vipers and Proud Utd.

The league was truncated midway after Matchday 15. New Edubiase had opened a seven-point lead with Goldstars 2nd — and new boys Skyy FC sitting 3rd in hot pursuit with the same points.`,
    stats: [{ label: 'Players', value: '32' }, { label: 'Coaches', value: '3' }, { label: 'Matchdays Played', value: '15' }],
  },
  {
    year: '2018/2019',
    title: 'Normalization Season',
    subtitle: 'Zone 2B — First Place',
    result: 'P1',
    resultColor: 'bg-emerald-500',
    body: `The non-competitive Normalization Committee season. Skyy FC was grouped with Swedru All Blacks, Sekondi Hasaacas, Samartex, Nzema Kotoko, Unistar Academy, Vipers and Proud Utd in Zone 2B covering the Western South and Central regions.

Skyy FC finished in first position and progressed to the R64 of the MTN FA Cup competition.`,
    stats: [{ label: 'Players', value: '32' }, { label: 'Coaches', value: '3' }, { label: 'Zone Finish', value: '1st' }],
  },
  {
    year: '2019/2020',
    title: 'COVID Season',
    subtitle: 'Topped Zone 2 — Season Voided',
    result: 'Voided',
    resultColor: 'bg-amber-500',
    body: `Skyy FC's third year in Division One. The new Kurt Okraku GFA Administration season was stopped after Matchday 13 due to COVID-19 government restrictions.

Despite the curtailment, Skyy FC topped the DOL Zone 2 table ahead of Goldstars and Samartex, and had reached the MTN FA Cup R64.`,
    stats: [{ label: 'Players', value: '32' }, { label: 'Coaches', value: '4' }, { label: 'Matchdays', value: '13' }],
  },
  {
    year: '2020/2021',
    title: 'First Full Season',
    subtitle: '2nd Place & Super Cup Winners',
    result: '2nd Place',
    resultColor: 'bg-emerald-500',
    body: `Skyy FC's first fully completed Division One season. Competing against 15 experienced clubs, Skyy FC finished second only to Bibiani Goldstars, reached Round 32 of the MTN FA Cup, and won the maiden edition of the GFA 8 Top Division One Clubs Nationwide Super Cup.

A 3-match home ban and GH₵5,000 fine following supporter misconduct against match officials in the crucial New Edubiase draw hurt promotion ambitions.`,
    stats: [{ label: 'Players', value: '32' }, { label: 'Coaches', value: '4' }, { label: 'League Finish', value: '2nd' }],
  },
  {
    year: '2021/2022',
    title: 'Super Cup Treble',
    subtitle: '6th Place — Hearts of Oak FA Cup Run',
    result: '6th Place',
    resultColor: 'bg-zinc-500',
    body: `Skyy FC finished 6th behind Samartex, Nzema Kotoko, BYFA, New Edubiase and Swedru All Blacks. An 11-match home ban and GH₵7,000 fine for supporter misconduct at St Martin's Park derailed promotion ambitions.

Highlights: won the GFA DOL Top 8 Super Cup at Madina Astro Turf, beating Tema Youth on penalties after a 1-1 draw. Reached the Round of 16 of the MTN FA Cup before falling gallantly to Accra Hearts of Oak 0-1 at Accra Sports Stadium.`,
    stats: [{ label: 'Players', value: '30' }, { label: 'Coaches', value: '4' }, { label: 'League Finish', value: '6th' }],
  },
  {
    year: '2022/2023',
    title: 'Best Season Yet',
    subtitle: 'Denied Promotion — FA Cup Semi-Finals',
    result: 'Controversy',
    resultColor: 'bg-rose-500',
    body: `Skyy FC's most dramatic season. After a poor start — losing two away games on Matchday 2 & 3 — Coach Johnson Smith took charge. By Matchday 20, Skyy FC had opened a 3-point gap over Nations FC.

Then: Coach Smith went AWOL, snatched by Nations FC. Skyy FC beat Nations 3-0 without a head coach, opening a 6-point lead — only for a protest ruling to deduct 6 points and 3 goals, handing Nations the promotion spot. Skyy FC reached the MTN FA Cup semi-finals before losing 2-1 to eventual winners Dreams FC at Abramkese.`,
    stats: [{ label: 'Players', value: '30' }, { label: 'Coaches', value: '5' }, { label: 'Cup Run', value: 'Semi-Final' }],
  },
  {
    year: '2023/2024',
    title: 'Quarter-Final Cup Run',
    subtitle: '4th Place Finish',
    result: '4th Place',
    resultColor: 'bg-zinc-500',
    body: `Tagged as Ghana's best Division One club, Skyy FC began as promotion favourites. At the Super Cup, they beat Premier League clubs Bofoakwa and Kpando Heart of Lions, plus tough DOL rivals Young Apostles and Nzema Kotoko — before losing the final 1-0 to Bofoakwa Tano FC.

Key player losses (Baba Musah to Samartex, Prince Acquah to Nations) and mid-season coaching changes to Coach Felix Tamakloe affected the campaign. Reached the MTN FA Cup quarter-finals before penalty elimination at Sunyani. Finished 4th.`,
    stats: [{ label: 'Players', value: '27' }, { label: 'Coaches', value: '5' }, { label: 'League Finish', value: '4th' }],
  },
  {
    year: '2024/2025',
    title: 'A Season to Forget',
    subtitle: '11th Place — Worst Performance',
    result: '11th Place',
    resultColor: 'bg-rose-500',
    body: `Skyy FC's 6th competitive Division One season was the most turbulent. An attempted sale of the league slot to Rainmakers FC fell through. Only 10 of 27 players were retained; 25 new players were rushed in. Home venue was relocated from Daboase to Gyandu Park, alienating the loyal Wassa East fanbase.

After losing the first five matches, head coach Dennis Agyekum Boateng was replaced by Bright Ellis. Skyy FC was eliminated at R64 of the MTN FA Cup by Sekondi Even Wise FC. The club spent most of the season fighting relegation, ultimately finishing 11th — the club's worst-ever result.`,
    stats: [{ label: 'Players', value: '37' }, { label: 'Coaches', value: '5' }, { label: 'League Finish', value: '11th' }],
  },
];


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

export const Review = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [current, setCurrent] = useState(0);
  const [standings, setStandings] = useState<LeagueTable[]>([]);
  const [standingsLoading, setStandingsLoading] = useState(true);

  useEffect(() => {
    client
      .fetch<LeagueTable[]>(
        `*[_type == "leagueTable"] | order(position asc) {
          _id, position, "team": team->name, played, won, drawn, lost, points, isSkyy
        }`
      )
      .then((data) => {
        if (data) setStandings(data);
        setStandingsLoading(false);
      })
      .catch(() => setStandingsLoading(false));
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + seasons.length) % seasons.length);
  const next = () => setCurrent((c) => (c + 1) % seasons.length);

  const season = seasons[current];

  return (
    <div className={`pb-24 ${isDarkMode ? 'bg-zinc-950' : 'bg-zinc-50'}`}>

      {/* ── Hero Banner ── */}
      <section className={`relative py-16 md:py-24 px-4 md:px-6 border-b overflow-hidden
        ${isDarkMode ? 'border-white/5' : 'border-zinc-200'}`}>
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #EFDC43 0, #EFDC43 1px, transparent 0, transparent 50%)', backgroundSize: '24px 24px' }} />

        <div className="relative max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs font-bold tracking-[0.3em] uppercase block mb-3" style={{ color: '#EFDC43' }}>
              2016 — Present · Ghana Division One
            </span>
            <h1 className={`text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none mb-6
              ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              Performance<br /><span style={{ color: '#EFDC43' }}>Review</span>
            </h1>
            <p className={`text-lg md:text-xl max-w-2xl leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Nine seasons. Every triumph, every setback — the full story of Skyy FC's journey.
            </p>
          </motion.div>

          {/* Season summary pills */}
          <div className="flex flex-wrap gap-3 mt-8">
            {[
              { label: '9 Seasons', color: '' },
              { label: '2× Super Cup', color: '' },
              { label: 'FA Cup Semi-Final', color: '' },
              { label: 'Unbeaten Debut', color: '' },
            ].map((tag) => (
              <span key={tag.label}
                className={`text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border
                  ${isDarkMode ? 'border-white/10 text-zinc-400' : 'border-zinc-300 text-zinc-500'}`}>
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Carousel + Standings two-column layout ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12">

        {/* Left: Carousel */}
        <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 rounded-lg bg-[#EFDC43]/10 text-[#EFDC43]"><Trophy size={22} /></div>
          <h2 className={`text-2xl md:text-3xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
            Season by Season
          </h2>
        </div>

        {/* Year nav */}
        <div className="flex flex-wrap gap-2 mb-8">
          {seasons.map((s, i) => (
            <button
              key={s.year}
              onClick={() => setCurrent(i)}
              className={`text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border transition-all
                ${i === current
                  ? 'text-black border-[#EFDC43]'
                  : isDarkMode ? 'border-white/10 text-zinc-500 hover:border-white/30' : 'border-zinc-200 text-zinc-400 hover:border-zinc-400'}`}
              style={i === current ? { backgroundColor: '#EFDC43' } : {}}>
              {s.year.split('/')[0]}
            </button>
          ))}
        </div>

        {/* Carousel card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className={`rounded-2xl border overflow-hidden ${isDarkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-zinc-200 shadow-sm'}`}>

              {/* Card header */}
              <div className="bg-[#EFDC43] px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-black text-xs font-black uppercase tracking-widest">{season.year}</p>
                  <h3 className="text-black text-xl md:text-2xl font-black uppercase leading-tight">{season.title}</h3>
                  <p className="text-black/60 text-xs font-semibold mt-0.5">{season.subtitle}</p>
                </div>
                <span className={`${season.resultColor} text-white text-xs font-black px-3 py-1.5 rounded-full whitespace-nowrap`}>
                  {season.result}
                </span>
              </div>

              {/* Card body */}
              <div className="p-6 md:p-8">
                <p className={`text-sm md:text-base leading-relaxed whitespace-pre-line mb-8
                  ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  {season.body}
                </p>

                {/* Stats row */}
                <div className={`grid grid-cols-3 gap-px rounded-xl overflow-hidden border
                  ${isDarkMode ? 'border-white/5' : 'border-zinc-100'}`}>
                  {season.stats.map(({ label, value }) => (
                    <div key={label} className={`flex flex-col items-center py-4 px-2
                      ${isDarkMode ? 'bg-white/5' : 'bg-zinc-50'}`}>
                      <span className="text-2xl md:text-3xl font-black" style={{ color: '#EFDC43' }}>{value}</span>
                      <span className={`text-[10px] uppercase tracking-widest font-bold mt-1 text-center
                        ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Prev / Next */}
          <div className="flex items-center justify-between mt-5">
            <button
              onClick={prev}
              className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full border transition
                ${isDarkMode ? 'border-white/10 text-zinc-400 hover:border-white/30 hover:text-white' : 'border-zinc-200 text-zinc-500 hover:border-zinc-400'}`}>
              <ChevronLeft size={14} /> Prev
            </button>
            <span className={`text-xs font-bold ${isDarkMode ? 'text-zinc-600' : 'text-zinc-400'}`}>
              {current + 1} / {seasons.length}
            </span>
            <button
              onClick={next}
              className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full border transition
                ${isDarkMode ? 'border-white/10 text-zinc-400 hover:border-white/30 hover:text-white' : 'border-zinc-200 text-zinc-500 hover:border-zinc-400'}`}>
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>

        </div>{/* end left column */}

        {/* Right: Standings — hidden on mobile */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-8">
          <div className="">
            <div className={`border rounded-sm overflow-hidden ${isDarkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-zinc-200 shadow-sm'}`}>
              <div className="bg-[#EFDC43] text-black px-4 py-3 font-black uppercase tracking-tighter text-sm">
                2025/26 Standings
              </div>
              <div className="p-0">
                {standingsLoading ? (
                  <div className="p-6 text-center">
                    <p className="text-zinc-500 text-sm animate-pulse">Loading standings...</p>
                  </div>
                ) : (
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
                      {standings.map((row) => (
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
                )}
              </div>
            </div>
          </div>
          </div>
        </div>{/* end right column */}

        </div>{/* end two-column flex */}
      </section>

    </div>
  );
};