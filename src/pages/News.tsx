import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Newspaper, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { client } from '../lib/sanityClient';
import { Sidebar } from '../components/Sidebar';

interface NewsArticle {
  _id: string;
  title: string;
  date: string;
  image?: string;
}

const fallbackColors = [
  'bg-gradient-to-br from-zinc-800 to-zinc-900',
  'bg-gradient-to-br from-amber-900 to-zinc-900',
  'bg-gradient-to-br from-zinc-700 to-zinc-900',
  'bg-gradient-to-br from-yellow-900 to-zinc-900',
];

const ARTICLES_PER_PAGE = 6;

export const News = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading]   = useState(true);
  const [page, setPage]         = useState(0);

  useEffect(() => {
    client
      .fetch(`*[_type == "news"] | order(date desc) {
        _id, title, date,
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
      day: 'numeric', month: 'long', year: 'numeric',
    }).toUpperCase();

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const paged      = articles.slice(page * ARTICLES_PER_PAGE, (page + 1) * ARTICLES_PER_PAGE);

  const goToPage = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className={`pt-6 pb-24 flex items-center justify-center ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
        <p className="text-xl font-bold animate-pulse">Loading News...</p>
      </div>
    );
  }

  if (!loading && articles.length === 0) {
    return (
      <div className="pt-6 pb-24 max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-12">
          <div className="p-2 rounded-lg bg-[#EFDC43]/10 text-[#EFDC43]">
            <Newspaper size={24} />
          </div>
          <h2 className={`text-3xl font-bold tracking-tight uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
            Latest News
          </h2>
        </div>
        <p className="text-zinc-500">No news articles yet. Check back soon.</p>
      </div>
    );
  }

  return (
    <div className="pt-6 pb-24 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Left Column: News List */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#EFDC43]/10 text-[#EFDC43]">
                <Newspaper size={24} />
              </div>
              <h2 className={`text-3xl font-bold tracking-tight uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                Latest News
              </h2>
            </div>
            {totalPages > 1 && (
              <span className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                Page {page + 1} of {totalPages}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {paged.map((article, index) => (
              <motion.article
                key={article._id}
                whileHover={{ y: -5 }}
                className={`rounded-sm overflow-hidden border flex flex-col
                  ${isDarkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-zinc-200 shadow-sm'}`}
              >
                {/* Cover image */}
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

                {/* Date + Title only */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#EFDC43] uppercase tracking-widest block mb-3">
                      {formatDate(article.date)}
                    </span>
                    <Link to={`/news/${article._id}`}>
                      <h3 className={`text-lg font-black uppercase leading-tight
                        hover:text-[#EFDC43] transition-colors
                        ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                        {article.title}
                      </h3>
                    </Link>
                  </div>

                  <Link
                    to={`/news/${article._id}`}
                    className="mt-5 text-xs font-bold uppercase tracking-widest
                      text-[#EFDC43] flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    Continue <ChevronRight size={14} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-12">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 0}
                className={`p-2 rounded-full transition-all
                  ${isDarkMode ? 'bg-white/5 text-white disabled:opacity-20' : 'bg-black/5 text-zinc-900 disabled:opacity-20'}`}
              >
                <ChevronLeft size={20} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i)}
                  className={`w-8 h-8 rounded-full text-xs font-black transition-all
                    ${i === page
                      ? 'bg-[#EFDC43] text-black'
                      : isDarkMode
                        ? 'bg-white/5 text-zinc-400 hover:bg-white/10'
                        : 'bg-black/5 text-zinc-500 hover:bg-black/10'}`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages - 1}
                className={`p-2 rounded-full transition-all
                  ${isDarkMode ? 'bg-white/5 text-white disabled:opacity-20' : 'bg-black/5 text-zinc-900 disabled:opacity-20'}`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:col-span-4">
          <Sidebar isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
};
