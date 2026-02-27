import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Images, X, ChevronLeft, ChevronRight, Calendar, Image } from 'lucide-react';
import { client } from '../lib/sanityClient';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
const urlFor = (source: any, width = 800) =>
  builder.image(source).width(width).auto('format').url();

interface GalleryImage {
  _key: string;
  asset: any;
  caption?: string;
}

interface Album {
  _id: string;
  title: string;
  coverImage?: any;
  date?: string;
  matchday?: number;
  category?: string;
  images: GalleryImage[];
}

export const Gallery = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeAlbum, setActiveAlbum] = useState<Album | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    client
      .fetch<Album[]>(`*[_type == "gallery"] | order(date desc) {
        _id,
        title,
        coverImage,
        date,
        matchday,
        category,
        images[] {
          _key,
          asset,
          caption
        }
      }`)
      .then((data) => {
        if (data) setAlbums(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Lightbox keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (lightboxIndex === null || !activeAlbum) return;
    if (e.key === 'ArrowRight') setLightboxIndex((i) => Math.min((i ?? 0) + 1, activeAlbum.images.length - 1));
    if (e.key === 'ArrowLeft')  setLightboxIndex((i) => Math.max((i ?? 0) - 1, 0));
    if (e.key === 'Escape')     setLightboxIndex(null);
  }, [lightboxIndex, activeAlbum]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when lightbox or album is open
  useEffect(() => {
    document.body.style.overflow = (lightboxIndex !== null || activeAlbum) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex, activeAlbum]);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric',
    }).toUpperCase();

  const categoryLabel = (cat?: string) => {
    const map: Record<string, string> = {
      highlights: 'Match Highlights',
      training:   'Training',
      bts:        'Behind the Scenes',
      fans:       'Fan Zone',
      other:      'Other',
    };
    return cat ? (map[cat] ?? cat) : '';
  };

  if (loading) {
    return (
      <div className={`pt-6 pb-24 flex items-center justify-center ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
        <p className="text-xl font-bold animate-pulse">Loading Gallery...</p>
      </div>
    );
  }

  if (!loading && albums.length === 0) {
    return (
      <div className="pt-6 pb-24 max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-12">
          <div className="p-2 rounded-lg bg-[#EFDC43]/10 text-[#EFDC43]">
            <Images size={24} />
          </div>
          <h2 className={`text-3xl font-bold tracking-tight uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
            Gallery
          </h2>
        </div>
        <p className="text-zinc-500">No albums yet. Check back soon.</p>
      </div>
    );
  }

  return (
    <div className="pt-6 pb-24 max-w-7xl mx-auto px-6">

      {/* ── Page Header ── */}
      <div className="flex items-center gap-3 mb-12">
        <div className="p-2 rounded-lg bg-[#EFDC43]/10 text-[#EFDC43]">
          <Images size={24} />
        </div>
        <h2 className={`text-3xl font-bold tracking-tight uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
          Gallery
        </h2>
      </div>

      {/* ── Album Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {albums.map((album) => (
          <motion.div
            key={album._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => setActiveAlbum(album)}
            className={`group cursor-pointer rounded-sm overflow-hidden border ${
              isDarkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-zinc-200 shadow-sm'
            }`}
          >
            {/* Cover Image */}
            <div className="relative aspect-video overflow-hidden bg-zinc-800">
              {album.coverImage ? (
                <img
                  src={urlFor(album.coverImage, 600)}
                  alt={album.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Image size={40} className="text-zinc-600" />
                </div>
              )}
              {/* Image count badge */}
              <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-wider">
                {album.images?.length ?? 0} photos
              </div>
              {/* Category badge */}
              {album.category && (
                <div className="absolute top-3 left-3 bg-[#EFDC43] text-black text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-wider">
                  {categoryLabel(album.category)}
                </div>
              )}
            </div>

            {/* Album Info */}
            <div className="p-4">
              <h3 className={`font-black uppercase tracking-tight text-sm mb-1 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                {album.title}
              </h3>
              <div className="flex items-center gap-3 text-[10px] uppercase font-bold text-zinc-500">
                {album.date && (
                  <span className="flex items-center gap-1">
                    <Calendar size={10} />
                    {formatDate(album.date)}
                  </span>
                )}
                {album.matchday && (
                  <span className="text-[#EFDC43]">Matchday {album.matchday}</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Album Modal ── */}
      <AnimatePresence>
        {activeAlbum && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
            style={{ backgroundColor: 'rgba(0,0,0,0.95)' }}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-md border-b border-white/10">
              <div>
                <h3 className="text-white font-black uppercase tracking-tight text-lg">
                  {activeAlbum.title}
                </h3>
                <p className="text-zinc-500 text-xs uppercase font-bold mt-0.5">
                  {activeAlbum.images?.length ?? 0} photos
                  {activeAlbum.date && ` · ${formatDate(activeAlbum.date)}`}
                </p>
              </div>
              <button
                onClick={() => setActiveAlbum(null)}
                className="text-zinc-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              >
                <X size={24} />
              </button>
            </div>

            {/* Image Grid */}
            <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {activeAlbum.images?.map((img, index) => (
                <motion.div
                  key={img._key}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.02 }}
                  onClick={() => setLightboxIndex(index)}
                  className="relative aspect-square overflow-hidden rounded-sm cursor-pointer group"
                >
                  <img
                    src={urlFor(img, 400)}
                    alt={img.caption ?? `Photo ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {img.caption && (
                    <div className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-[10px] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {img.caption}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && activeAlbum && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.98)' }}
          >
            {/* Close */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 z-10"
            >
              <X size={28} />
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-zinc-400 text-sm font-bold uppercase tracking-widest">
              {lightboxIndex + 1} / {activeAlbum.images.length}
            </div>

            {/* Prev */}
            <button
              onClick={() => setLightboxIndex((i) => Math.max((i ?? 0) - 1, 0))}
              disabled={lightboxIndex === 0}
              className="absolute left-4 text-zinc-400 hover:text-white disabled:opacity-20 transition-colors p-3 rounded-full hover:bg-white/10"
            >
              <ChevronLeft size={32} />
            </button>

            {/* Image */}
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={urlFor(activeAlbum.images[lightboxIndex], 1400)}
              alt={activeAlbum.images[lightboxIndex]?.caption ?? ''}
              className="max-h-[85vh] max-w-[85vw] object-contain rounded-sm"
            />

            {/* Caption */}
            {activeAlbum.images[lightboxIndex]?.caption && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-zinc-300 text-sm text-center px-6">
                {activeAlbum.images[lightboxIndex].caption}
              </div>
            )}

            {/* Next */}
            <button
              onClick={() => setLightboxIndex((i) => Math.min((i ?? 0) + 1, activeAlbum.images.length - 1))}
              disabled={lightboxIndex === activeAlbum.images.length - 1}
              className="absolute right-4 text-zinc-400 hover:text-white disabled:opacity-20 transition-colors p-3 rounded-full hover:bg-white/10"
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
