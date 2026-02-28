import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Newspaper, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { client } from '../lib/sanityClient';
import { Sidebar } from '../components/Sidebar';
import { MatchPanel } from '../components/MatchPanel';
import { PartnersBar } from '../components/PartnersBar';
import { Store } from '../components/Store';

import hero1 from '../assets/hero1.jpg';
import hero2 from '../assets/hero2.jpg';
import hero3 from '../assets/hero3.jpg';

const HERO_IMAGES = [hero1, hero2, hero3];
const SLIDE_INTERVAL = 5000;
const NEWS_PER_PAGE = 4;

interface ClubInfo {
  tagline: string;
}

interface StoryArticle {
  _id: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
  showCoverImage?: boolean;
}

export const Home = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [clubInfo, setClubInfo]          = useState<ClubInfo>({ tagline: 'Division One League' });
  const [stories, setStories]            = useState<StoryArticle[]>([]);
  const [loading, setLoading]            = useState(true);
  const [currentSlide, setCurrentSlide]  = useState(0);
  const [newsPage, setNewsPage]          = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, SLIDE_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  useEffect(() => {
    setClubInfo({ tagline: 'No Size!' });

    // ✅ Updated to fetch "stories" (latest first)
    client
      .fetch(`*[_type == "stories"] | order(date desc)[0...12] {
        _id,
        title,
        date,
        excerpt,
        "image": image.asset->url,
        showCoverImage
      }`)
      .then((data: StoryArticle[]) => {
        setStories(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    }).toUpperCase();

  const totalPages = Math.ceil(stories.length / NEWS_PER_PAGE);
  const pagedStories = stories.slice(newsPage * NEWS_PER_PAGE, (newsPage + 1) * NEWS_PER_PAGE);

  const goToPage = (p: number) => {
    setNewsPage(p);
    document.getElementById('news-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading && stories.length === 0) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <p className={`text-xl font-bold animate-pulse ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
          Loading Latest Stories...
        </p>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-20">

      {/* ── Hero Section with MatchPanel overlay ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

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

        <div className="absolute inset-0 z-10 bg-black/60" />

        <div
          className="absolute inset-x-0 bottom-0 z-20 h-64 pointer-events-none"
          style={{
            background: isDarkMode
              ? 'linear-gradient(to bottom, transparent, #09090b)'
              : 'linear-gradient(to bottom, transparent, #fafafa)',
          }}
        />

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
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

        <div className="relative z-30 w-full max-w-7xl mx-auto px-4 md:px-6 py-24 md:py-32
          flex flex-col lg:flex-row items-center gap-8 md:gap-12">

          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-bold tracking-[0.3em] uppercase mb-4 block"
              style={{ color: '#EFDC43' }}>
              SKYY FC 2026
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase
              leading-none text-white drop-shadow-lg mb-6">
              The Season<br />
              <span style={{ color: '#EFDC43' }}>In Motion</span>
            </h1>

            <p className="text-base md:text-lg text-white/70 mb-2">Results. Momentum. Moments.</p>
            <p className="text-sm text-white/50 mb-8 md:mb-10">"{clubInfo.tagline}"</p>

            <ul className="flex gap-8 md:gap-10">
              {[
                { value: '7',  label: 'Wins' },
                { value: '28', label: 'Goals' },
                { value: '32', label: 'Players' },
              ].map(({ value, label }) => (
                <li key={label} className="flex flex-col">
                  <strong className="text-3xl md:text-4xl font-black text-white">{value}</strong>
                  <span className="text-xs uppercase tracking-widest text-white/50">{label}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="w-full lg:w-[420px] flex-shrink-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <MatchPanel isDarkMode={isDarkMode} />
          </motion.div>
        </div>
      </section>

      {/* ── Partners Bar ── */}
      <PartnersBar isDarkMode={isDarkMode} />

      {/* ── Main Content Grid ── */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">

        {/* Left Column: Latest Stories */}
        <div id="news-section" className="lg:col-span-8 space-y-10 md:space-y-12">

          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#EFDC43]/10 text-[#EFDC43]">
                <Newspaper size={20} />
              </div>
              <h2 className={`text-2xl md:text-3xl font-bold tracking-tight uppercase
                ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                Latest Stories
              </h2>
            </div>
            {totalPages > 1 && (
              <span className={`text-xs font-bold uppercase tracking-widest
                ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                {newsPage + 1}/{totalPages}
              </span>
            )}
          </div>

          {/* Stories */}
          <div className="space-y-10 md:space-y-12">
            {pagedStories.map((story) => (
              <motion.article
                key={story._id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col sm:flex-row gap-5 md:gap-8 pb-10 md:pb-12 border-b last:border-0 group
                  ${isDarkMode ? 'border-white/5' : 'border-zinc-200'}`}
              >
                {/* Thumbnail */}
                <Link
                  to={`/news/${story._id}`}
                  className={`w-full sm:w-52 md:w-64 h-44 md:h-48 flex-shrink-0 rounded-sm overflow-hidden border relative
                    ${isDarkMode ? 'border-white/10' : 'border-zinc-200'}`}
                >
                  {story.image ? (
                    <img
                      src={story.image}
                      alt={story.title}
                      className="absolute inset-0 w-full h-full object-cover
                        transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />
                  )}
                </Link>

                {/* Date + Title + Continue */}
                <div className="flex flex-col justify-center gap-2">
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                    {formatDate(story.date)}
                  </p>
                  <Link to={`/news/${story._id}`}>
                    <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tight leading-none
                      group-hover:text-[#EFDC43] transition-colors
                      ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                      {story.title}
                    </h3>
                  </Link>
                  <Link
                    to={`/news/${story._id}`}
                    className="text-sm font-bold text-[#EFDC43] hover:opacity-80
                      transition-opacity flex items-center gap-1 mt-1 md:mt-2"
                  >
                    Continue <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 pt-4">
              <button
                onClick={() => goToPage(newsPage - 1)}
                disabled={newsPage === 0}
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
                    ${i === newsPage
                      ? 'bg-[#EFDC43] text-black'
                      : isDarkMode
                        ? 'bg-white/5 text-zinc-400 hover:bg-white/10'
                        : 'bg-black/5 text-zinc-500 hover:bg-black/10'}`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => goToPage(newsPage + 1)}
                disabled={newsPage === totalPages - 1}
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
      </main>

      {/* ── Store ── */}
      <Store isDarkMode={isDarkMode} />

    </div>
  );
};
