import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CLUB_INFO, NEWS } from '../data/clubData';
import { Sidebar } from '../components/Sidebar';

export const Home = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#f5a623]/20 to-black">
          <div className={`absolute inset-0 bg-gradient-to-b ${isDarkMode ? 'from-zinc-950/50 via-zinc-950/80 to-zinc-950' : 'from-zinc-50/50 via-zinc-50/80 to-zinc-50'}`}></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={`text-6xl md:text-8xl font-black tracking-tighter uppercase mb-4 leading-none ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              SKYY <span className="text-[#f5a623]">FC</span>
            </h1>
            <p className={`text-xl font-light tracking-wide italic ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              "{CLUB_INFO.tagline}"
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Latest Highlights */}
        <div className="lg:col-span-8 space-y-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-[#f5a623]/10 text-[#f5a623]">
              <Newspaper size={24} />
            </div>
            <h2 className={`text-3xl font-bold tracking-tight uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Latest Highlights</h2>
          </div>
          
          <div className="space-y-12">
            {NEWS.map((article) => (
              <motion.article 
                key={article.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row gap-8 pb-12 border-b last:border-0 group ${isDarkMode ? 'border-white/5' : 'border-zinc-200'}`}
              >
                <div className={`w-full md:w-64 h-48 flex-shrink-0 rounded-sm overflow-hidden border ${isDarkMode ? 'border-white/10' : 'border-zinc-200'} ${article.color}`}>
                  {/* News Image Placeholder */}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">{article.date}</p>
                  <h3 className={`text-3xl font-black uppercase tracking-tight mb-4 group-hover:text-[#f5a623] transition-colors leading-none ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                    {article.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-6 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {article.excerpt}
                  </p>
                  <Link to={`/news/${article.id}`} className="text-sm font-bold text-[#f5a623] hover:text-[#f5a623]/80 transition-colors flex items-center gap-1">
                    Continue reading <ArrowRight size={14} />
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
      </main>
    </div>
  );
};
