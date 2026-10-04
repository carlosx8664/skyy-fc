import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, Send, MessageCircle } from 'lucide-react';
import { client } from '../lib/sanityClient';
import { Sidebar } from '../components/Sidebar';
import { PortableText } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';

interface Comment {
  id: string;
  name: string;
  text: string;
  timestamp: string;
}

interface Article {
  _id: string;
  title: string;
  slug?: string;      // 👈 added
  date: string;
  excerpt: string;
  author?: string;
  image?: any;
  showCoverImage?: boolean;
  body?: any;
}

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).toUpperCase();

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

// Detects old-style Sanity UUIDs (a51af50e-8c72-414f-8f87-11fcbc8d9226)
const isUUID = (s: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s);

// Set the document title for SEO + share previews
const setMeta = (title: string, description: string) => {
  document.title = title;

  const setTag = (attr: 'name' | 'property', key: string, content: string) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setTag('name', 'description', description);
  setTag('property', 'og:title', title);
  setTag('property', 'og:description', description);
  setTag('property', 'og:type', 'article');
  setTag('property', 'og:url', window.location.href);
  setTag('name', 'twitter:card', 'summary_large_image');
  setTag('name', 'twitter:title', title);
  setTag('name', 'twitter:description', description);
};

export const NewsDetail = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    if (!id) return;

    // If the URL param is a UUID → fetch by _id (legacy links).
    // Otherwise → fetch by slug.current (new links).
    const legacy = isUUID(id);

    const query = legacy
      ? `*[_type == "stories" && _id == $value][0]{
          _id, title, "slug": slug.current, date, excerpt, author,
          showCoverImage, body, image
        }`
      : `*[_type == "stories" && slug.current == $value][0]{
          _id, title, "slug": slug.current, date, excerpt, author,
          showCoverImage, body, image
        }`;

    client
      .fetch(query, { value: id })
      .then((data: Article | null) => {
        if (!data) {
          setArticle(null);
          setLoading(false);
          return;
        }

        // If we hit a legacy UUID URL and the story has a slug, silently
        // rewrite the URL bar to the new one.
        if (legacy && data.slug) {
          navigate(`/news/${data.slug}`, { replace: true });
        }

        setArticle(data);
        setLoading(false);

        // SEO meta
        if (data.title) {
          setMeta(
            `${data.title} | SKYY FC`,
            data.excerpt || `${data.title} — Skyy FC news`
          );
        }
      })
      .catch((err) => {
        console.error('❌ Story fetch error:', err);
        setLoading(false);
      });

    // Load comments using the story _id as key so both old and new URLs
    // share the same comment thread.
    // (We'll re-fetch them once the article loads, using its _id.)
  }, [id, navigate]);

  // Load comments whenever the article's _id is known
  useEffect(() => {
    if (!article?._id) return;
    const saved = localStorage.getItem(`comments-${article._id}`);
    if (saved) setComments(JSON.parse(saved));
  }, [article?._id]);

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim() || !article?._id) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      name: name.trim(),
      text: text.trim(),
      timestamp: new Date().toLocaleString('en-GB'),
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem(`comments-${article._id}`, JSON.stringify(updated));
    setName('');
    setText('');
  };

  if (loading) {
    return (
      <div
        className={`pt-6 pb-24 flex items-center justify-center ${
          isDarkMode ? 'text-white' : 'text-zinc-900'
        }`}
      >
        <p className="text-xl font-bold animate-pulse">Loading Article...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="pt-6 pb-24 max-w-7xl mx-auto px-6">
        <p className="text-zinc-500">Article not found.</p>
        <Link
          to="/news"
          className="text-[#EFDC43] font-bold mt-4 inline-block"
        >
          ← Back to News
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-6 pb-24 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* ── Main Content ── */}
        <div className="lg:col-span-8">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500
              hover:text-[#EFDC43] uppercase tracking-widest mb-8 transition-colors"
          >
            <ChevronLeft size={16} /> Back to News
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="text-[10px] font-bold text-[#EFDC43] uppercase tracking-widest">
              {formatDate(article.date)}
              {article.author && ` • ${article.author}`}
            </span>
            <h1
              className={`text-3xl md:text-4xl font-black uppercase tracking-tight
              mt-2 leading-tight ${
                isDarkMode ? 'text-white' : 'text-zinc-900'
              }`}
            >
              {article.title}
            </h1>
          </motion.div>

          {article.showCoverImage && article.image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mb-8"
            >
              <img
                src={urlFor(article.image).width(1200).fit('max').url()}
                alt={article.title}
                className={`w-full max-h-[500px] object-contain rounded-sm border
                  ${
                    isDarkMode
                      ? 'border-white/10'
                      : 'border-zinc-200'
                  }`}
              />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mb-10"
          >
            <p
              className={`text-lg leading-relaxed ${
                isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              {article.excerpt}
            </p>
          </motion.div>

          {article.body && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`prose max-w-none mb-10 ${
                isDarkMode ? 'prose-invert' : ''
              }`}
            >
              <PortableText value={article.body} />
            </motion.div>
          )}

          <div
            className={`h-px w-full mb-10 ${
              isDarkMode ? 'bg-white/10' : 'bg-zinc-200'
            }`}
          />

          {/* Comments */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <MessageCircle size={20} className="text-[#EFDC43]" />
              <h3
                className={`text-xl font-bold uppercase tracking-tight ${
                  isDarkMode ? 'text-white' : 'text-zinc-900'
                }`}
              >
                Comments ({comments.length})
              </h3>
            </div>

            <form onSubmit={handleComment} className="mb-10">
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-4 py-3 rounded-sm text-sm border outline-none
                    focus:border-[#EFDC43] transition-colors
                    ${
                      isDarkMode
                        ? 'bg-zinc-800 border-white/10 text-white placeholder:text-zinc-500'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400'
                    }`}
                />
                <textarea
                  placeholder="Write a comment..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-sm text-sm border outline-none
                    focus:border-[#EFDC43] transition-colors resize-none
                    ${
                      isDarkMode
                        ? 'bg-zinc-800 border-white/10 text-white placeholder:text-zinc-500'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400'
                    }`}
                />
                <button
                  type="submit"
                  className="self-end flex items-center gap-2 bg-[#EFDC43] text-black
                    text-sm font-bold uppercase tracking-widest px-6 py-3 rounded-sm
                    hover:opacity-90 transition-opacity"
                >
                  Post Comment <Send size={14} />
                </button>
              </div>
            </form>

            {comments.length === 0 ? (
              <p className="text-zinc-500 text-sm">
                No comments yet. Be the first!
              </p>
            ) : (
              <div className="space-y-4">
                {comments.map((c) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-5 rounded-sm border ${
                      isDarkMode
                        ? 'bg-zinc-900 border-white/5'
                        : 'bg-white border-zinc-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-sm font-bold ${
                          isDarkMode
                            ? 'text-white'
                            : 'text-zinc-900'
                        }`}
                      >
                        {c.name}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {c.timestamp}
                      </span>
                    </div>
                    <p
                      className={`text-sm leading-relaxed ${
                        isDarkMode
                          ? 'text-zinc-400'
                          : 'text-zinc-600'
                      }`}
                    >
                      {c.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <Sidebar isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
};