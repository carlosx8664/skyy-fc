import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Film,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Eye,
  MessageSquare,
  Send,
  Calendar,
  Check,
} from 'lucide-react';
import { client } from '../lib/sanityClient';

interface Comment {
  _key: string;
  author: string;
  text: string;
  createdAt: string;
}

interface MatchDoc {
  _id: string;
  title: string;
  slug: string;
  videoUrl: string;
  date?: string;
  season?: string;
  likes?: number;
  dislikes?: number;
  views?: number;
  comments?: Comment[];
}

const getEmbedUrl = (url: string, autoplay = true) => {
  if (!url) return null;
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  const longMatch = url.match(/[?&]v=([^?&]+)/);
  const embedMatch = url.match(/youtube\.com\/embed\/([^?&]+)/);
  const id = shortMatch?.[1] ?? longMatch?.[1] ?? embedMatch?.[1];
  if (!id) return null;
  return `https://www.youtube.com/embed/${id}?autoplay=${autoplay ? 1 : 0}&mute=1&rel=0&modestbranding=1`;
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  return d
    .toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    .toUpperCase();
};

const formatCount = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  return String(n);
};

const NAME_STORAGE_KEY = 'skyyfc_comment_name';

export const WatchMatch = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const { slug } = useParams<{ slug: string }>();
  const [match, setMatch] = useState<MatchDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [userLiked, setUserLiked] = useState<null | 'like' | 'dislike'>(null);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [posting, setPosting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Prefill name from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(NAME_STORAGE_KEY);
    if (saved) setCommentName(saved);
  }, []);

  // Fetch the match by slug
  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    setNotFound(false);

    client
      .fetch<MatchDoc | null>(
        `*[_type == "news" && slug.current == $slug][0]{
          _id, title, "slug": slug.current, "videoUrl": videoUrl, date, season,
          likes, dislikes, views,
          comments[]{_key, author, text, createdAt}
        }`,
        { slug }
      )
      .then((res) => {
        if (cancelled) return;
        if (!res) {
          setNotFound(true);
          setMatch(null);
        } else {
          setMatch(res);
        }
      })
      .catch((e) => {
        console.error('❌ Highlight fetch error:', e);
        if (!cancelled) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  // Reset like state when match changes
  useEffect(() => {
    setUserLiked(null);
  }, [match?._id]);

  // Increment views once per session per match
  useEffect(() => {
    if (!match?._id) return;
    const key = `viewed:${match._id}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, '1');

    setMatch((m) => (m ? { ...m, views: (m.views ?? 0) + 1 } : m));

    client
      .patch(match._id)
      .setIfMissing({ views: 0 })
      .inc({ views: 1 })
      .commit()
      .catch(() => {});
  }, [match?._id]);

  const handleLike = async () => {
    if (!match) return;
    const goingTo = userLiked === 'like' ? null : 'like';
    const likeDelta = goingTo === 'like' ? 1 : -1;
    const dislikeDelta = userLiked === 'dislike' ? -1 : 0;

    setMatch((m) =>
      m
        ? {
            ...m,
            likes: Math.max(0, (m.likes ?? 0) + likeDelta),
            dislikes: Math.max(0, (m.dislikes ?? 0) + dislikeDelta),
          }
        : m
    );
    setUserLiked(goingTo);

    try {
      let p = client.patch(match._id).setIfMissing({ likes: 0, dislikes: 0 });
      if (likeDelta === 1) p = p.inc({ likes: 1 });
      if (likeDelta === -1) p = p.dec({ likes: 1 });
      if (dislikeDelta === -1) p = p.dec({ dislikes: 1 });
      await p.commit();
    } catch (e) {
      console.error('❌ Like error:', e);
    }
  };

  const handleDislike = async () => {
    if (!match) return;
    const goingTo = userLiked === 'dislike' ? null : 'dislike';
    const dislikeDelta = goingTo === 'dislike' ? 1 : -1;
    const likeDelta = userLiked === 'like' ? -1 : 0;

    setMatch((m) =>
      m
        ? {
            ...m,
            dislikes: Math.max(0, (m.dislikes ?? 0) + dislikeDelta),
            likes: Math.max(0, (m.likes ?? 0) + likeDelta),
          }
        : m
    );
    setUserLiked(goingTo);

    try {
      let p = client.patch(match._id).setIfMissing({ likes: 0, dislikes: 0 });
      if (dislikeDelta === 1) p = p.inc({ dislikes: 1 });
      if (dislikeDelta === -1) p = p.dec({ dislikes: 1 });
      if (likeDelta === -1) p = p.dec({ likes: 1 });
      await p.commit();
    } catch (e) {
      console.error('❌ Dislike error:', e);
    }
  };

  const handlePostComment = async () => {
    if (!match || !commentText.trim() || !commentName.trim()) return;
    setPosting(true);

    const newComment: Comment = {
      _key: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      author: commentName.trim(),
      text: commentText.trim(),
      createdAt: new Date().toISOString(),
    };

    // Save name for next time
    localStorage.setItem(NAME_STORAGE_KEY, commentName.trim());

    setMatch((m) => (m ? { ...m, comments: [newComment, ...(m.comments ?? [])] } : m));
    setCommentText('');

    try {
      await client
        .patch(match._id)
        .setIfMissing({ comments: [] })
        .append('comments', [newComment])
        .commit();
    } catch (e) {
      console.error('❌ Comment post error:', e);
    } finally {
      setPosting(false);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    const shareData = { title: match?.title ?? 'Highlights', url };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // user cancelled share — ignore
    }
  };

  const t = {
    pageBg: isDarkMode ? 'bg-zinc-950' : 'bg-zinc-50',
    cardBg: isDarkMode ? 'bg-zinc-900' : 'bg-white',
    cardBorder: isDarkMode ? 'border-white/10' : 'border-zinc-200',
    text: isDarkMode ? 'text-white' : 'text-zinc-900',
    textMuted: isDarkMode ? 'text-zinc-400' : 'text-zinc-500',
    textFaint: isDarkMode ? 'text-zinc-500' : 'text-zinc-400',
    chipBg: isDarkMode ? 'bg-zinc-800' : 'bg-zinc-100',
    chipHover: isDarkMode ? 'hover:bg-zinc-700' : 'hover:bg-zinc-200',
    divider: isDarkMode ? 'border-white/5' : 'border-zinc-200',
  };

  // Loading
  if (loading) {
    return (
      <div className={`pt-6 pb-24 min-h-screen ${t.pageBg}`}>
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div
            className={`aspect-video rounded-2xl flex items-center justify-center ${
              isDarkMode ? 'bg-zinc-900' : 'bg-zinc-200'
            }`}
          >
            <p className={`text-sm animate-pulse ${t.textFaint}`}>Loading highlight...</p>
          </div>
        </div>
      </div>
    );
  }

  // Not found
  if (notFound || !match) {
    return (
      <div className={`pt-6 pb-24 min-h-screen ${t.pageBg}`}>
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <Link
            to="/highlights"
            className={`inline-flex items-center gap-2 text-xs font-black uppercase tracking-tight mb-6 ${t.textMuted} hover:text-[#EFDC43]`}
          >
            <ArrowLeft size={14} /> Back to all highlights
          </Link>
          <div
            className={`aspect-video rounded-2xl flex flex-col items-center justify-center border gap-3 ${t.cardBg} ${t.cardBorder}`}
          >
            <Film size={48} className="opacity-20" />
            <p className={`text-sm font-bold uppercase tracking-widest opacity-60 ${t.text}`}>
              Highlight not found
            </p>
            <p className={`text-xs opacity-50 ${t.textMuted}`}>
              This video doesn't exist or has been removed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const embedUrl = getEmbedUrl(match.videoUrl, true);
  const comments = match.comments ?? [];
  const likes = match.likes ?? 0;
  const dislikes = match.dislikes ?? 0;
  const views = match.views ?? 0;

  return (
    <div className={`pt-6 pb-24 min-h-screen ${t.pageBg}`}>
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        {/* Back link */}
        <Link
          to="/highlights"
          className={`inline-flex items-center gap-2 text-xs font-black uppercase tracking-tight mb-4 ${t.textMuted} hover:text-[#EFDC43]`}
        >
          <ArrowLeft size={14} /> Back to all highlights
        </Link>

        {/* Player */}
        {embedUrl ? (
          <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black">
            <iframe
              src={embedUrl}
              title={match.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : (
          <div
            className={`aspect-video rounded-2xl flex flex-col items-center justify-center border gap-3 ${t.cardBg} ${t.cardBorder}`}
          >
            <Film size={48} className="opacity-20" />
            <p className={`text-sm font-bold uppercase tracking-widest opacity-60 ${t.text}`}>
              Video URL missing
            </p>
          </div>
        )}

        {/* Title */}
        <h1
          className={`mt-5 text-xl md:text-2xl font-black uppercase tracking-tight leading-tight ${t.text}`}
        >
          {match.title}
        </h1>

        {/* Meta + actions */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className={`flex items-center gap-3 text-xs font-bold ${t.textMuted}`}>
            <span className="flex items-center gap-1.5">
              <Eye size={14} /> {formatCount(views)} views
            </span>
            {match.date && (
              <>
                <span className="opacity-40">•</span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} /> {formatDate(match.date)}
                </span>
              </>
            )}
            {match.season && (
              <>
                <span className="opacity-40">•</span>
                <span className="text-[#EFDC43]">{match.season}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div
              className={`flex items-center rounded-full overflow-hidden border ${t.cardBorder} ${t.chipBg}`}
            >
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-tight transition-colors ${
                  userLiked === 'like' ? 'bg-[#EFDC43] text-black' : `${t.text} ${t.chipHover}`
                }`}
              >
                <ThumbsUp size={14} /> {formatCount(likes)}
              </button>
              <div className={`w-px h-6 ${isDarkMode ? 'bg-white/10' : 'bg-zinc-300'}`} />
              <button
                onClick={handleDislike}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-tight transition-colors ${
                  userLiked === 'dislike' ? 'bg-red-500 text-white' : `${t.text} ${t.chipHover}`
                }`}
              >
                <ThumbsDown size={14} /> {formatCount(dislikes)}
              </button>
            </div>

            <button
              onClick={handleShare}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-tight border ${t.cardBorder} ${t.chipBg} ${t.text} ${t.chipHover}`}
            >
              {copied ? (
                <>
                  <Check size={14} /> Copied
                </>
              ) : (
                <>
                  <Share2 size={14} /> Share
                </>
              )}
            </button>
          </div>
        </div>

        {/* Comments */}
        <div className={`mt-10 pt-6 border-t ${t.divider}`}>
          <h3
            className={`flex items-center gap-2 text-sm font-black uppercase tracking-tight ${t.text}`}
          >
            <MessageSquare size={16} /> {comments.length}{' '}
            {comments.length === 1 ? 'Comment' : 'Comments'}
          </h3>

          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Your name"
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              className={`sm:w-40 px-3 py-2 rounded-lg text-sm border outline-none focus:border-[#EFDC43] ${t.cardBorder} ${t.cardBg} ${t.text}`}
            />
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
              className={`flex-1 px-3 py-2 rounded-lg text-sm border outline-none focus:border-[#EFDC43] ${t.cardBorder} ${t.cardBg} ${t.text}`}
            />
            <button
              onClick={handlePostComment}
              disabled={posting || !commentText.trim() || !commentName.trim()}
              className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#EFDC43] text-black text-xs font-black uppercase tracking-tight disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#EFDC43]/90"
            >
              <Send size={14} /> Post
            </button>
          </div>

          <div className="mt-6 space-y-5">
            {comments.length ? (
              comments.map((c) => (
                <div key={c._key} className="flex gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm shrink-0 ${t.chipBg} ${t.text}`}
                  >
                    {c.author.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <p className={`text-xs font-black uppercase ${t.text}`}>{c.author}</p>
                      <p className={`text-[10px] ${t.textFaint}`}>
                        {new Date(c.createdAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <p
                      className={`text-sm mt-1 ${
                        isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
                      }`}
                    >
                      {c.text}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className={`text-sm ${t.textMuted}`}>No comments yet. Be the first!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};