import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Film,
  PlayCircle,
  Calendar,
  Eye,
  MessageSquare,
  ThumbsUp,
  Radio,
} from 'lucide-react';
import { client } from '../lib/sanityClient';

interface LiveStream {
  _id: string;
  isLive: boolean;
  youtubeUrl: string;
  matchTitle: string;
  views?: number;
  likes?: number;
}

interface ReplayMatch {
  _id: string;
  title: string;
  slug: string;
  videoUrl: string;
  date?: string;
  season?: string;
  likes?: number;
  views?: number;
  comments?: { _key: string }[];
}

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  return d
    .toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
    .toUpperCase();
};

const formatCount = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  return String(n);
};

const getSeasonFromDate = (dateStr?: string): string => {
  if (!dateStr) return '2026/27';
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const month = d.getMonth();
  if (month >= 8) return `${year}/${year + 1}`;
  return `${year - 1}/${year}`;
};

export const WatchLive = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [stream, setStream] = useState<LiveStream | null>(null);
  const [replays, setReplays] = useState<ReplayMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState<string>('all');

  const availableSeasons = useMemo(() => {
    const seasons = new Set(replays.map((m) => m.season || getSeasonFromDate(m.date)));
    return Array.from(seasons).sort(
      (a, b) => parseInt(b.split('/')[0]) - parseInt(a.split('/')[0])
    );
  }, [replays]);

  const filteredReplays = useMemo(() => {
    if (selectedSeason === 'all') return replays;
    return replays.filter((m) => (m.season || getSeasonFromDate(m.date)) === selectedSeason);
  }, [replays, selectedSeason]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const [live, past] = await Promise.all([
          client.fetch<LiveStream | null>(
            `*[_type == "liveStream"][0]{
              _id, isLive, youtubeUrl, matchTitle, views, likes
            }`
          ),
          client.fetch<ReplayMatch[]>(
            `*[_type == "news" && defined(videoUrl) && defined(slug.current)] | order(date desc){
              _id, title, "slug": slug.current, "videoUrl": videoUrl, date, season,
              likes, views,
              "comments": comments[]{_key}
            }`
          ),
        ]);
        if (cancelled) return;
        setStream(live);
        setReplays(past ?? []);
      } catch (e) {
        console.error('❌ Highlights grid fetch error:', e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const isLive = !!stream?.isLive;

  const t = {
    pageBg: isDarkMode ? 'bg-zinc-950' : 'bg-zinc-50',
    cardBg: isDarkMode ? 'bg-zinc-900' : 'bg-white',
    cardBorder: isDarkMode ? 'border-white/5' : 'border-zinc-200',
    text: isDarkMode ? 'text-white' : 'text-zinc-900',
    textMuted: isDarkMode ? 'text-zinc-400' : 'text-zinc-500',
  };

  return (
    <div className={`pt-6 pb-24 min-h-screen ${t.pageBg}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-10 md:mb-12">
          <div className="p-2 rounded-lg bg-[#EFDC43]/10 text-[#EFDC43]">
            <Film size={24} />
          </div>
          <h2 className={`text-2xl md:text-3xl font-bold tracking-tight uppercase ${t.text}`}>
            Highlights
          </h2>
          {isLive && (
            <span className="ml-auto flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> Live Now
            </span>
          )}
        </div>

        {/* Live card — static banner while stream is on */}
        {isLive && stream && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 rounded-sm overflow-hidden border-2 border-red-500/40 ${
              isDarkMode ? 'bg-zinc-900' : 'bg-white'
            }`}
          >
            <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-red-900 via-zinc-900 to-black">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> Live
                </div>
                <Radio size={56} className="text-white/80" />
              </div>
              <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-wider">
                Streaming Now
              </div>
            </div>
            <div className="p-4">
              <h3 className={`font-black uppercase tracking-tight text-base mb-1 ${t.text}`}>
                {stream.matchTitle}
              </h3>
              <p className={`text-[11px] uppercase font-bold ${t.textMuted}`}>
                Watch live on our Facebook page
              </p>
            </div>
          </motion.div>
        )}

        {/* Season filter */}
        {availableSeasons.length > 1 && !loading && (
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedSeason('all')}
              className={`px-4 py-2 rounded-full text-sm font-black uppercase tracking-tight transition-all whitespace-nowrap ${
                selectedSeason === 'all'
                  ? 'bg-[#EFDC43] text-black'
                  : isDarkMode
                  ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                  : 'bg-zinc-200 text-zinc-600 hover:bg-zinc-300'
              }`}
            >
              All
            </button>
            {availableSeasons.map((season) => (
              <button
                key={season}
                onClick={() => setSelectedSeason(season)}
                className={`px-4 py-2 rounded-full text-sm font-black uppercase tracking-tight transition-all whitespace-nowrap ${
                  selectedSeason === season
                    ? 'bg-[#EFDC43] text-black'
                    : isDarkMode
                    ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                    : 'bg-zinc-200 text-zinc-600 hover:bg-zinc-300'
                }`}
              >
                {season}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <p className={`text-sm animate-pulse ${t.textMuted}`}>Loading highlights...</p>
        ) : filteredReplays.length === 0 ? (
          <p className={`text-sm ${t.textMuted}`}>No highlights yet. Check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredReplays.map((m) => (
              <Link key={m._id} to={`/highlights/${m.slug}`} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`group cursor-pointer rounded-sm overflow-hidden border ${
                    isDarkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-zinc-200 shadow-sm'
                  }`}
                >
                  {/* Placeholder thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-950">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle
                        size={48}
                        className="text-[#EFDC43] opacity-80 transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    {m.season && (
                      <div className="absolute top-3 left-3 bg-[#EFDC43] text-black text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-wider">
                        {m.season}
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3
                      className={`font-black uppercase tracking-tight text-sm mb-2 line-clamp-2 ${t.text}`}
                    >
                      {m.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[10px] uppercase font-bold text-zinc-500 flex-wrap">
                      {m.date && (
                        <span className="flex items-center gap-1">
                          <Calendar size={10} />
                          {formatDate(m.date)}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Eye size={10} />
                        {formatCount(m.views ?? 0)}
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp size={10} />
                        {formatCount(m.likes ?? 0)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare size={10} />
                        {m.comments?.length ?? 0}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}

        {!loading && filteredReplays.length > 0 && (
          <p className={`mt-10 text-center text-xs uppercase font-bold ${t.textMuted}`}>
            <Film size={12} className="inline mr-1" />
            {filteredReplays.length} highlight{filteredReplays.length !== 1 ? 's' : ''} available
          </p>
        )}
      </div>
    </div>
  );
};