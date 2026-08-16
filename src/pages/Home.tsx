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

// ─── Campaign Section Component ──────────────────────────────────────────────
const CampaignSection = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className={`py-12 md:py-16 border-y ${isDarkMode ? 'border-white/5 bg-zinc-900/50' : 'border-zinc-200 bg-zinc-50'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left: Campaign Highlight */}
          <div className="lg:w-1/3 flex-shrink-0">
            <div className="sticky top-24">
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#EFDC43] block mb-2">
                Campaign 2026/27
              </span>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight
                ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                Together<br />
                <span className="text-[#EFDC43]">We Shine</span>
              </h2>
              <p className={`mt-3 text-sm ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Support Skyy FC's Ghana Premier League Qualification Project
              </p>
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 bg-[#EFDC43] text-black font-black text-sm uppercase tracking-widest rounded-full hover:bg-[#EFDC43]/80 transition-colors"
              >
                {expanded ? 'Show Less' : 'Read More'}
                <ArrowRight size={16} className={`transition-transform ${expanded ? 'rotate-90' : ''}`} />
              </button>
            </div>
          </div>

          {/* Right: Campaign Content */}
          <div className={`lg:w-2/3 space-y-4 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            <div className={`text-sm leading-relaxed ${!expanded ? 'line-clamp-6' : ''}`}>
              <p className="mb-4">
                For ten remarkable years, <strong className={isDarkMode ? 'text-white' : 'text-zinc-900'}>Skyy FC – Daboase</strong>, the Pride of Wassa East has carried the hopes of our people, providing professional football, inspiring young talent, and proudly raising the flag of Wassa East and the Western Region across Ghana.
              </p>
              <p className="mb-4">
                Now, we stand on the threshold of history. Our mission is clear: <strong className={isDarkMode ? 'text-white' : 'text-zinc-900'}>Qualify Skyy FC to the Ghana Premier League by May 2027.</strong>
              </p>
              <p className="mb-4">
                This is more than a football campaign. It is a movement to unite our communities, inspire the next generation, and place Wassa East on Ghana's biggest football stage.
              </p>

              {expanded && (
                <>
                  <div className="my-6 p-4 md:p-6 rounded-xl bg-[#EFDC43]/10 border border-[#EFDC43]/20">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#EFDC43] mb-3">
                      Become Part of Our Legacy
                    </h3>
                    <p className="text-sm">
                      We invite individuals, businesses, institutions, and friends of Skyy FC everywhere to join Operation Skyy FC to the Ghana Premier League. Your contribution is not just a donation—it is an investment in the dreams of thousands of young people and a lasting legacy for generations to come.
                    </p>
                  </div>

                  <div className="my-6 p-4 md:p-6 rounded-xl bg-zinc-800/50 border border-white/10">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#EFDC43] mb-3">
                      A Lasting Legacy
                    </h3>
                    <p className="text-sm mb-3">
                      As part of this ambitious project, Skyy FC will construct a <strong className={isDarkMode ? 'text-white' : 'text-zinc-900'}>three-storey Legacy Stand</strong> at St. Martin's Park featuring:
                    </p>
                    <ul className="text-sm space-y-2 ml-4 list-disc">
                      <li>Modern team changing rooms</li>
                      <li>A 1,000-seat spectator stand</li>
                      <li>A permanent <strong className={isDarkMode ? 'text-white' : 'text-zinc-900'}>Donors' Honour Wall</strong> celebrating everyone who made this dream possible</li>
                    </ul>
                    <p className="text-sm mt-3">Your generosity will forever be remembered.</p>
                  </div>

                  <div className="my-6 p-4 md:p-6 rounded-xl bg-[#EFDC43]/5 border border-[#EFDC43]/10">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#EFDC43] mb-3">
                      How to Contribute
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="p-3 rounded-lg bg-black/20">
                        <p className="font-bold uppercase text-xs tracking-widest text-[#EFDC43]">Bank Transfer</p>
                        <p className="text-xs mt-1">Account: Skyy FC</p>
                        <p className="text-xs">Bank: Access Bank</p>
                        <p className="text-xs font-mono">1047000004991</p>
                      </div>
                      <div className="p-3 rounded-lg bg-black/20">
                        <p className="font-bold uppercase text-xs tracking-widest text-[#EFDC43]">Mobile Money</p>
                        <p className="text-xs mt-1 font-mono">Westserve</p>
                        <p className="text-xs font-mono">054 101 1128</p>
                      </div>
                      <div className="p-3 rounded-lg bg-black/20">
                        <p className="font-bold uppercase text-xs tracking-widest text-[#EFDC43]">Pickup Service</p>
                        <p className="text-xs mt-1 font-mono">024 090 2550</p>
                      </div>
                      <div className="p-3 rounded-lg bg-black/20">
                        <p className="font-bold uppercase text-xs tracking-widest text-[#EFDC43]">In-Kind Donations</p>
                        <p className="text-xs mt-1">Skyy House</p>
                        <p className="text-xs">1920 West Fijai</p>
                      </div>
                    </div>
                    <p className="text-xs mt-3 opacity-70">You may also contribute directly on Skyy FC home match days.</p>
                  </div>

                  <div className="my-6 p-4 md:p-6 rounded-xl bg-[#EFDC43]/10 border border-[#EFDC43]/20 text-center">
                    <p className="text-sm font-bold uppercase tracking-widest text-[#EFDC43]">
                      🎟️ FREE ENTRY FOR HOME FANS
                    </p>
                    <p className="text-sm mt-1">
                      Thanks to our supporters, all Skyy FC Division One League home matches at St. Martin's Park are <strong className={isDarkMode ? 'text-white' : 'text-zinc-900'}>FREE</strong> for home fans. Seating protocols apply.
                    </p>
                  </div>

                  <div className="text-center mt-8">
                    <p className="text-lg font-black uppercase tracking-tight">
                      Together, we can make history.
                    </p>
                    <p className="text-lg font-black uppercase tracking-tight">
                      Together, we can take <span className="text-[#EFDC43]">Wassa East</span> to the Ghana Premier League.
                    </p>
                    <p className="text-xl font-black uppercase tracking-tight mt-2 text-[#EFDC43]">
                      Together We Shine.
                    </p>
                    <p className="text-xs mt-4 opacity-60">SKYY FC — NO SIZE</p>
                    <div className="flex items-center justify-center gap-4 mt-3 text-xs opacity-50">
                      <span>www.skyyfc.com</span>
                      <span>•</span>
                      <span>Follow us on Facebook</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Main Home Component ────────────────────────────────────────────────────
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

      {/* ── Campaign Section ── */}
      <CampaignSection isDarkMode={isDarkMode} />

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