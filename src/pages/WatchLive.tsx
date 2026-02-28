import React, { useEffect, useMemo, useState } from 'react';
import { client } from '../lib/sanityClient';
import { Radio, PlayCircle, Lock } from 'lucide-react';

interface LiveStream {
  isLive: boolean;
  youtubeUrl: string;
  matchTitle: string;
}

interface ReplayMatch {
  _id: string;
  title: string;
  videoUrl: string;
  date?: string;
}

const getEmbedUrl = (url: string, autoplay: boolean) => {
  if (!url) return null;

  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  const longMatch = url.match(/[?&]v=([^?&]+)/);
  const id = shortMatch?.[1] ?? longMatch?.[1];

  if (!id) return null;

  const ap = autoplay ? 1 : 0;
  return `https://www.youtube.com/embed/${id}?autoplay=${ap}&mute=1&rel=0&modestbranding=1`;
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }).toUpperCase();
};

export const WatchLive = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [stream, setStream] = useState<LiveStream | null>(null);
  const [replays, setReplays] = useState<ReplayMatch[]>([]);
  const [selectedReplayId, setSelectedReplayId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setLoading(true);
      try {
        const [live, past] = await Promise.all([
          client.fetch<LiveStream | null>(
            `*[_type == "liveStream"][0]{
              isLive,
              youtubeUrl,
              matchTitle
            }`
          ),
          client.fetch<ReplayMatch[]>(
            `*[_type == "news" && defined(videoUrl)] | order(date desc){
              _id,
              title,
              "videoUrl": videoUrl,
              date
            }`
          ),
        ]);

        if (cancelled) return;

        setStream(live);
        setReplays(past ?? []);

        // Auto-select latest replay ONLY if not live
        if (!(live?.isLive) && (past?.length ?? 0) > 0) {
          setSelectedReplayId(past[0]._id);
        } else {
          setSelectedReplayId(null);
        }
      } catch (e) {
        console.error('❌ Watch fetch error:', e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const isLive = !!stream?.isLive;
  const liveEmbedUrl = stream?.youtubeUrl ? getEmbedUrl(stream.youtubeUrl, true) : null;

  const selectedReplay = useMemo(
    () => replays.find((r) => r._id === selectedReplayId) ?? null,
    [replays, selectedReplayId]
  );

  const replayEmbedUrl = selectedReplay?.videoUrl ? getEmbedUrl(selectedReplay.videoUrl, true) : null;

  const activeTitle = isLive ? stream?.matchTitle ?? 'LIVE' : selectedReplay?.title ?? 'WATCH';
  const activeEmbedUrl = isLive ? liveEmbedUrl : replayEmbedUrl;

  return (
    <div className={`pt-6 pb-24 min-h-screen ${isDarkMode ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-[#EFDC43]/10 text-[#EFDC43]">
            <Radio size={24} />
          </div>

          <div>
            <h1 className={`text-4xl font-black tracking-tight uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              Watch
            </h1>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
              {activeTitle}
            </p>
          </div>

          {isLive && (
            <span className="ml-auto flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Live
            </span>
          )}
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Player */}
          <div className="lg:col-span-8">
            {loading ? (
              <div className={`aspect-video rounded-2xl flex items-center justify-center ${isDarkMode ? 'bg-zinc-900' : 'bg-zinc-200'}`}>
                <p className={`text-sm animate-pulse ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                  Loading...
                </p>
              </div>
            ) : activeEmbedUrl ? (
              <div className="aspect-video rounded-2xl overflow-hidden border border-white/10">
                <iframe
                  src={activeEmbedUrl}
                  title={activeTitle}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <div
                className={`aspect-video rounded-2xl flex flex-col items-center justify-center border gap-4 ${
                  isDarkMode ? 'bg-zinc-900 border-white/10' : 'bg-zinc-100 border-zinc-200'
                }`}
              >
                <Radio size={48} className="opacity-20" style={{ color: isDarkMode ? 'white' : 'black' }} />
                <p className={`text-sm font-bold uppercase tracking-widest opacity-40 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                  {isLive ? 'Live match link missing' : 'Pick a match to watch'}
                </p>
                <p className={`text-xs opacity-30 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  {isLive ? 'Set liveStream.youtubeUrl in Sanity' : 'No video selected'}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className={`border rounded-2xl overflow-hidden ${isDarkMode ? 'bg-zinc-900 border-white/10' : 'bg-white border-zinc-200 shadow-sm'}`}>
              <div className="bg-[#EFDC43] text-black px-4 py-3 font-black uppercase tracking-tighter text-sm flex items-center justify-between">
                <span>Previous matches</span>
                {isLive && (
                  <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                    <Lock size={14} /> Locked
                  </span>
                )}
              </div>

              <div className="p-3">
                {loading ? (
                  <p className={`text-sm p-3 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Loading matches...</p>
                ) : replays.length === 0 ? (
                  <p className={`text-sm p-3 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>No previous matches yet.</p>
                ) : (
                  <div className="space-y-2">
                    {replays.map((m) => {
                      const active = m._id === selectedReplayId;
                      const disabled = isLive;

                      return (
                        <button
                          key={m._id}
                          disabled={disabled}
                          onClick={() => setSelectedReplayId(m._id)}
                          className={[
                            'w-full text-left rounded-xl px-3 py-3 border transition',
                            disabled ? 'opacity-40 cursor-not-allowed' : 'hover:border-[#EFDC43]/60',
                            active ? 'border-[#EFDC43] bg-[#EFDC43]/10' : (isDarkMode ? 'border-white/10 bg-zinc-950/30' : 'border-zinc-200 bg-white'),
                          ].join(' ')}
                          title={disabled ? 'Live match is on. Replays are disabled.' : m.title}
                        >
                          <div className="flex items-start gap-3">
                            <PlayCircle className={`${active ? 'text-[#EFDC43]' : (isDarkMode ? 'text-zinc-400' : 'text-zinc-500')}`} size={18} />
                            <div className="min-w-0">
                              <p className={`font-black uppercase tracking-tight text-sm ${isDarkMode ? 'text-white' : 'text-zinc-900'} truncate`}>
                                {m.title}
                              </p>
                              {m.date && (
                                <p className={`text-[11px] mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                                  {formatDate(m.date)}
                                </p>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {isLive && (
                  <p className={`text-[11px] mt-3 px-1 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
                    Live match is on—replays will unlock when live ends.
                  </p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
