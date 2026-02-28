import React from 'react';
import { Facebook, MapPin, Phone, Mail, Globe } from 'lucide-react';
import skyyLogo from '../assets/skyyfc.png';

export const Footer = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const CLUB_INFO = {
    name: 'SKYY FC',
    description: 'Welcome to the Official page of Skyy Football Club (A Division One Club in Ghana).',
    address: 'Skyy House, Takoradi',
    phone: '054 923 2040',
    email: 'skyydirector@yahoo.com',
    website: 'skyyfc.com',
    websiteUrl: 'https://skyyfc.com',
    socials: {
      facebook: 'https://www.facebook.com/skyyfcdaboase/',
    },
  };

  const linkClass = `transition-colors hover:text-[#EFDC43] ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`;

  return (
    <footer className={`border-t pt-12 md:pt-16 pb-8 ${isDarkMode ? 'bg-zinc-950 border-white/5' : 'bg-white border-zinc-200'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* ── Main Footer Content ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-10 md:mb-12">

          {/* Col 1 — Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={skyyLogo} alt="SKYY FC" className="h-10 md:h-12 w-auto object-contain" />
              <span className={`text-lg md:text-xl font-black tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                {CLUB_INFO.name}
              </span>
            </div>
            <p className={`text-sm leading-relaxed max-w-xs ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
              {CLUB_INFO.description}
            </p>
          </div>

          {/* Col 2 — Contact Info */}
          <div>
            <h4 className={`text-xs font-black uppercase tracking-widest mb-4 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`https://maps.google.com/?q=Skyy+House+Takoradi+Ghana`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-start gap-2 ${linkClass}`}
                >
                  <MapPin size={14} className="text-[#EFDC43] mt-0.5 shrink-0" />
                  {CLUB_INFO.address}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CLUB_INFO.phone.replace(/\s/g, '')}`}
                  className={`flex items-center gap-2 ${linkClass}`}
                >
                  <Phone size={14} className="text-[#EFDC43] shrink-0" />
                  {CLUB_INFO.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CLUB_INFO.email}`}
                  className={`flex items-center gap-2 ${linkClass}`}
                >
                  <Mail size={14} className="text-[#EFDC43] shrink-0" />
                  {CLUB_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href={CLUB_INFO.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 ${linkClass}`}
                >
                  <Globe size={14} className="text-[#EFDC43] shrink-0" />
                  {CLUB_INFO.website}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 — Social */}
          <div>
            <h4 className={`text-xs font-black uppercase tracking-widest mb-4 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              Follow Us
            </h4>
            <a
              href={CLUB_INFO.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-3 text-sm font-bold transition-colors hover:text-[#EFDC43] ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isDarkMode ? 'bg-white/5 hover:bg-[#EFDC43] hover:text-black' : 'bg-black/5 hover:bg-[#EFDC43] hover:text-black'}`}>
                <Facebook size={18} />
              </div>
              Facebook
            </a>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className={`border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 ${isDarkMode ? 'border-white/5' : 'border-zinc-100'}`}>
          <p className={`text-[10px] uppercase tracking-[0.2em] ${isDarkMode ? 'text-zinc-600' : 'text-zinc-400'}`}>
            © {new Date().getFullYear()} {CLUB_INFO.name}. All Rights Reserved.
          </p>
          <p className={`text-[10px] uppercase tracking-[0.2em] ${isDarkMode ? 'text-zinc-600' : 'text-zinc-400'}`}>
            Ghana Division One League
          </p>
        </div>

      </div>
    </footer>
  );
};