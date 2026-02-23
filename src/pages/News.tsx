import React from 'react';
import { motion } from 'motion/react';
import { Newspaper, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NEWS } from '../data/clubData';
import { Sidebar } from '../components/Sidebar';

export const News = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: News List */}
        <div className="lg:col-span-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2 rounded-lg bg-[#f5a623]/10 text-[#f5a623]">
              <Newspaper size={24} />
            </div>
            <h2 className={`text-3xl font-bold tracking-tight uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Latest Highlights</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {NEWS.map((article) => (
              <motion.article 
                key={article.id}
                whileHover={{ y: -5 }}
                className={`rounded-sm overflow-hidden border flex flex-col h-full ${isDarkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-zinc-200 shadow-sm'}`}
              >
                <Link to={`/news/${article.id}`} className="block">
                  <div className={`h-48 ${article.color}`}></div>
                </Link>
                <div className="p-8 flex flex-col flex-1">
                  <span className="text-[10px] font-bold text-[#f5a623] uppercase tracking-widest mb-3">{article.date}</span>
                  <Link to={`/news/${article.id}`}>
                    <h3 className={`text-xl font-bold uppercase mb-4 leading-tight hover:text-[#f5a623] transition-colors ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                      {article.title}
                    </h3>
                  </Link>
                  <p className={`text-sm leading-relaxed mb-6 flex-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {article.excerpt}
                  </p>
                  <Link to={`/news/${article.id}`} className="text-sm font-bold uppercase tracking-widest text-[#f5a623] flex items-center gap-2 hover:text-[#f5a623]/80 transition-colors">
                    Read More <ChevronRight size={16} />
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
