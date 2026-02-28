import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, Send, MessageCircle } from 'lucide-react';
import { client } from '../lib/sanityClient';
import { Sidebar } from '../components/Sidebar';
import { PortableText } from '@portabletext/react';

interface Comment {
  id: string;
  name: string;
  text: string;
  timestamp: string;
}

interface Article {
  _id: string;
  title: string;
  date: string;
  excerpt: string;
  author?: string;
  image?: string;
  showCoverImage?: boolean;
  body?: any;
}

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).toUpperCase();

export const NewsDetail = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    if (!id) return;

    client
      .fetch(
        `*[_type == "stories" && _id == $id][0]{
          _id,
          title,
          date,
          excerpt,
          author,
          showCoverImage,
          body,
          "image": image.asset->url
        }`,
        { id }
      )
      .then((data: Article | null) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Story fetch error:', err);
        setLoading(false);
      });

    const saved = localStorage.getItem(`comments-${id}`);
    if (saved) setComments(JSON.parse(saved));
  }, [id]);

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      name: name.trim(),
      text: text.trim(),
      timestamp: new Date().toLocaleString('en-GB'),
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    if (id) {
      localStorage.setItem(`comments-${id}`, JSON.stringify(updated));
    }
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
          {/* Back Button */}
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500
              hover:text-[#EFDC43] uppercase tracking-widest mb-8 transition-colors"
          >
            <ChevronLeft size={16} /> Back to News
          </Link>

          {/* Date + Title */}
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

          {/* Cover Image */}
          {article.showCoverImage && article.image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mb-8"
            >
              <img
                src={article.image}
                alt={article.title}
                className={`w-full max-h-[500px] object-cover rounded-sm border
                  ${
                    isDarkMode
                      ? 'border-white/10'
                      : 'border-zinc-200'
                  }`}
              />
            </motion.div>
          )}

          {/* Excerpt */}
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

          {/* Full Body */}
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

          {/* Divider */}
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

            {/* Comment Form */}
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

            {/* Comment List */}
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
