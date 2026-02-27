import React from 'react';
import skyyPower from '../assets/skyy.png';
import wilsad from '../assets/wilsad.png';

export const PartnersBar = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <div className={`w-full py-6 px-6 flex items-center justify-center gap-12
    ${isDarkMode ? 'bg-zinc-950' : 'bg-zinc-100'}`}>

    <span className="text-sm font-bold tracking-[0.3em] uppercase
      text-zinc-400 whitespace-nowrap">
      Main Partners
    </span>

    <span className={`w-px h-32 ${isDarkMode ? 'bg-white/10' : 'bg-zinc-300'}`} />

    <div className="flex items-center gap-16">
      <img
        src={skyyPower}
        alt="Skyy Power"
        className="h-32 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
      />
      <img
        src={wilsad}
        alt="Wilsad Support Ltd"
        className="h-32 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
      />
    </div>

  </div>
);
