import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import { client } from '../lib/sanityClient';
import { Sidebar } from '../components/Sidebar';

// ── Drop your 3 hero images into src/assets/ and update these imports ──
import hero1 from '../assets/hero1.jpg';
import hero2 from '../assets/hero2.jpg';
import hero3 from '../assets/hero3.jpg';

const HERO_IMAGES = [hero1, hero2, hero3];
const SLIDE_INTERVAL = 5000;

interface ClubInfo {
  tagline: string;
}

interface NewsArticle {
  _id: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
}

export const Home = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [clubInfo, setClubInfo] = useState<ClubInfo>({ tagline: 'Division One League' });
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-advance carousel
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, SLIDE_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  useEffect(() => {
    setClubInfo({ tagline: 'No Size!' });

    client
      .fetch(`*[_type == "news"] | order(date desc)[0...4] {
        _id,
        title,
        date,
        excerpt,
        "image": image.asset->url
      }`)
      .then((data: NewsArticle[]) => {
        setNews(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    }).toUpperCase();

  if (loading && news.length === 0) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <p className={`text-xl font-bold animate-pulse ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
          Loading Latest Highlights...
        </p>
      </div>
    );
  }

  return (
    <div className="pt-20">

      {/* ── Hero Section ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">

        {/* Crossfading background images */}
        <AnimatePresence>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${HERO_IMAGES[currentSlide]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </AnimatePresence>

        {/* Dark overlay to make text readable */}
        <div className="absolute inset-0 z-10 bg-black/50" />

        {/* Bottom gradient — blends into page background */}
        <div
          className="absolute inset-x-0 bottom-0 z-20 h-64 pointer-events-none"
          style={{
            background: isDarkMode
              ? 'linear-gradient(to bottom, transparent, #09090b)'
              : 'linear-gradient(to bottom, transparent, #fafafa)',
          }}
        />

        {/* Slide indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'w-8 bg-[#EFDC43]' : 'w-3 bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Hero text */}
        <div className="relative z-30 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-4 leading-none text-white drop-shadow-lg">
              SKYY <span className="text-[#EFDC43]">Football Club</span>
            </h1>
            <p className="text-xl font-light tracking-wide italic text-white/80 drop-shadow">
              "{clubInfo.tagline}"
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Main Content Grid ── */}
      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Left Column: Latest Highlights */}
        <div className="lg:col-span-8 space-y-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-[#EFDC43]/10 text-[#EFDC43]">
              <Newspaper size={24} />
            </div>
            <h2 className={`text-3xl font-bold tracking-tight uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              Latest Highlights
            </h2>
          </div>

          <div className="space-y-12">
            {news.map((article) => (
              <motion.article
                key={article._id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row gap-8 pb-12 border-b last:border-0 group ${isDarkMode ? 'border-white/5' : 'border-zinc-200'}`}
              >
                <div className={`w-full md:w-64 h-48 flex-shrink-0 rounded-sm overflow-hidden border relative ${isDarkMode ? 'border-white/10' : 'border-zinc-200'}`}>
                  {article.image ? (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                    {formatDate(article.date)}
                  </p>
                  <Link to={`/news/${article._id}`}>
                    <h3 className={`text-3xl font-black uppercase tracking-tight mb-4 group-hover:text-[#EFDC43] transition-colors leading-none ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                      {article.title}
                    </h3>
                  </Link>
                  <p className={`text-sm leading-relaxed mb-6 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {article.excerpt}
                  </p>
                  <Link
                    to={`/news/${article._id}`}
                    className="text-sm font-bold text-[#EFDC43] hover:text-[#EFDC43]/80 transition-colors flex items-center gap-1"
                  >
                    Watch Now <ArrowRight size={14} />
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
