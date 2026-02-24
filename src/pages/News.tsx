import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Newspaper, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { client } from '../lib/sanityClient';
import { Sidebar } from '../components/Sidebar';

interface NewsArticle {
  _id: string;
  title: string;
  date: string;
  excerpt: string;
  author?: string;
  image?: string;
}

// Fallback gradient colors if no image uploaded
const fallbackColors = [
  'bg-gradient-to-br from-zinc-800 to-zinc-900',
  'bg-gradient-to-br from-amber-900 to-zinc-900',
  'bg-gradient-to-br from-zinc-700 to-zinc-900',
  'bg-gradient-to-br from-yellow-900 to-zinc-900',
];

export const News = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(`*[_type == "news"] | order(date desc) {
        _id,
        title,
        date,
        excerpt,
        author,
        "image": image.asset->url
      }`)
      .then((data: NewsArticle[]) => {
        setArticles(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).toUpperCase();

  if (loading) {
    return (
      <div className={`pt-32 pb-24 flex items-center justify-center ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
        <p className="text-xl font-bold animate-pulse">Loading News...</p>
      </div>
    );
  }

  if (!loading && articles.length === 0) {
    return (
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-12">
          <div className="p-2 rounded-lg bg-[#EFDC43]/10 text-[#EFDC43]">
            <Newspaper size={24} />
          </div>
          <h2 className={`text-3xl font-bold tracking-tight uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
            Latest Highlights
          </h2>
        </div>
        <p className="text-zinc-500">No news articles yet. Check back soon.</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Left Column: News List */}
        <div className="lg:col-span-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2 rounded-lg bg-[#EFDC43]/10 text-[#EFDC43]">
              <Newspaper size={24} />
            </div>
            <h2 className={`text-3xl font-bold tracking-tight uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              Latest Highlights
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article, index) => (
              <motion.article
                key={article._id}
                whileHover={{ y: -5 }}
                className={`rounded-sm overflow-hidden border flex flex-col h-full ${isDarkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-zinc-200 shadow-sm'}`}
              >
                <Link to={`/news/${article._id}`} className="block">
                  <div className="h-48 overflow-hidden">
                    {article.image ? (
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className={`w-full h-full ${fallbackColors[index % fallbackColors.length]}`} />
                    )}
                  </div>
                </Link>

                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-[#EFDC43] uppercase tracking-widest">
                      {formatDate(article.date)}
                    </span>
                    {article.author && (
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                        {article.author}
                      </span>
                    )}
                  </div>

                  <Link to={`/news/${article._id}`}>
                    <h3 className={`text-xl font-bold uppercase mb-4 leading-tight hover:text-[#EFDC43] transition-colors ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                      {article.title}
                    </h3>
                  </Link>

                  <p className={`text-sm leading-relaxed mb-6 flex-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {article.excerpt}
                  </p>

                  <Link
                    to={`/news/${article._id}`}
                    className="text-sm font-bold uppercase tracking-widest text-[#EFDC43] flex items-center gap-2 hover:text-[#EFDC43]/80 transition-colors"
                  >
                    Watch Now <ChevronRight size={16} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:col-span-4">
          <Sidebar isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
};
