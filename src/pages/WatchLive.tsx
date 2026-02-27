import React, { useEffect, useState } from 'react';
import { client } from '../lib/sanityClient';
import { Radio } from 'lucide-react';

interface LiveStream {
  isLive: boolean;
  youtubeUrl: string;
  matchTitle: string;
}

const getEmbedUrl = (url: string) => {
  if (!url) return null;
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=1&mute=1&rel=0&modestbranding=1`;
  const longMatch = url.match(/[?&]v=([^?&]+)/);
  if (longMatch) return `https://www.youtube.com/embed/${longMatch[1]}?autoplay=1&mute=1&rel=0&modestbranding=1`;
  return null;
};

export const WatchLive = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [stream, setStream]   = useState<LiveStream | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(`*[_type == "liveStream"][0] {
        isLive,
        youtubeUrl,
        matchTitle
      }`)
      .then((data: LiveStream) => {
        setStream(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const embedUrl = stream?.youtubeUrl ? getEmbedUrl(stream.youtubeUrl) : null;

  return (
    <div className={`pt-6 pb-24 min-h-screen ${isDarkMode ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-[#EFDC43]/10 text-[#EFDC43]">
            <Radio size={24} />
          </div>
          <div>
            <h1 className={`text-4xl font-black tracking-tight uppercase
              ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              Watch Live
            </h1>
            {stream?.matchTitle && (
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                {stream.matchTitle}
              </p>
            )}
          </div>

          {stream?.isLive && (
            <span className="ml-auto flex items-center gap-2 px-3 py-1 rounded-full
              bg-red-600 text-white text-xs font-black uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Live
            </span>
          )}
        </div>

        {loading ? (
          <div className={`aspect-video rounded-2xl flex items-center justify-center
            ${isDarkMode ? 'bg-zinc-900' : 'bg-zinc-200'}`}>
            <p className={`text-sm animate-pulse ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
              Loading stream...
            </p>
          </div>

        ) : stream?.isLive && embedUrl ? (
          <div className="aspect-video rounded-2xl overflow-hidden border border-white/10">
            <iframe
              src={embedUrl}
              title={stream.matchTitle ?? 'SKYY FC Live'}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

        ) : (
          <div className={`aspect-video rounded-2xl flex flex-col items-center justify-center
            border gap-4 ${isDarkMode ? 'bg-zinc-900 border-white/10' : 'bg-zinc-100 border-zinc-200'}`}>
            <Radio size={48} className="opacity-20"
              style={{ color: isDarkMode ? 'white' : 'black' }} />
            <p className={`text-sm font-bold uppercase tracking-widest opacity-40
              ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              No live match right now
            </p>
            <p className={`text-xs opacity-30 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Check back on matchday
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
