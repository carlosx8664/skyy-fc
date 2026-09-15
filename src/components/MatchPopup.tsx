import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '../lib/sanityClient';

const builder = imageUrlBuilder(client);
const urlFor = (source: any) => builder.image(source).width(900).url();

interface MatchPopupProps {
  isDarkMode: boolean;
}

interface PopupFixture {
  _id: string;
  poster: any;
  date: string;
}

export const MatchPopup = ({ isDarkMode }: MatchPopupProps) => {
  const [fixture, setFixture] = useState<PopupFixture | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    client
      .fetch<PopupFixture | null>(
        `*[_type == "fixture"
            && defined(poster)
            && showPopup != false
            && date > now()]
          | order(date asc)[0] {
            _id,
            poster,
            date
          }`
      )
      .then((data) => {
        if (!data) return;

        const storageKey = `skyyfc_popup_${data._id}`;
        if (sessionStorage.getItem(storageKey)) return;

        setTimeout(() => {
          setFixture(data);
          requestAnimationFrame(() => setOpen(true));
        }, 900);
      })
      .catch(() => { /* silent */ });
  }, []);

  // Lock body scroll while popup is open — prevents scrollbar flicker
  useEffect(() => {
    if (!open) return;

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;

    document.body.style.overflow = 'hidden';
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
    };
  }, [open]);

  const handleClose = () => {
    if (fixture) sessionStorage.setItem(`skyyfc_popup_${fixture._id}`, '1');
    setOpen(false);
  };

  if (!fixture) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4
            bg-black/75 will-change-[opacity] md:backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ scale: 0.94, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative max-w-md w-full rounded-2xl overflow-hidden shadow-2xl
              will-change-transform
              ${isDarkMode ? 'bg-zinc-900' : 'bg-white'}`}
          >
            <button
              onClick={handleClose}
              aria-label="Close match popup"
              className="absolute top-3 right-3 z-10 p-2 rounded-full
                bg-black/60 hover:bg-black/80 text-white transition-colors"
            >
              <X size={18} strokeWidth={2.5} />
            </button>

            <img
              src={urlFor(fixture.poster)}
              alt="Upcoming match"
              className="w-full max-h-[85vh] object-contain block select-none"
              draggable={false}
            />

            <div className={`px-4 py-3 text-center text-[10px] font-black uppercase tracking-[0.3em]
              ${isDarkMode ? 'text-[#EFDC43]' : 'text-zinc-900'}`}>
              Next Match
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};