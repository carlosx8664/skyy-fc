import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Newspaper, ArrowLeft } from 'lucide-react';
import { NEWS } from '../data/clubData';
import { Sidebar } from '../components/Sidebar';

export const NewsDetail = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const { id } = useParams();
  const article = NEWS.find(n => n.id === Number(id));

  if (!article) {
    return <Navigate to="/news" />;
  }

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Article Content */}
        <div className="lg:col-span-8">
          <Link 
            to="/news" 
            className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-8 transition-colors ${isDarkMode ? 'text-zinc-500 hover:text-[#f5a623]' : 'text-zinc-400 hover:text-[#f5a623]'}`}
          >
            <ArrowLeft size={16} /> Back to Highlights
          </Link>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={`w-full h-96 rounded-sm mb-12 ${article.color}`}></div>
            
            <span className="text-xs font-bold text-[#f5a623] uppercase tracking-widest mb-4 block">{article.date}</span>
            <h1 className={`text-5xl font-black uppercase mb-8 leading-none tracking-tighter ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              {article.title}
            </h1>
            
            <div className={`text-xl leading-relaxed space-y-6 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <p className="font-bold text-2xl italic mb-8 border-l-4 border-[#f5a623] pl-6">
                {article.excerpt}
              </p>
              {article.content.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </motion.article>
        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:col-span-4">
          <Sidebar isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
};
