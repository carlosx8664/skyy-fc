import React from 'react';
import homeJersey from '../assets/home jersey.png';
import awayJersey from '../assets/away jersey.png';

const products = [
  {
    name: 'Home Jersey',
    price: 'GHC 100',
    img: homeJersey,
    waMsg: 'Hello%2C%20I%20would%20like%20to%20buy%20a%20Home%20Jersey%2025/26'
  },
  {
    name: 'Away Jersey',
    price: 'GHC 100',
    img: awayJersey,
    waMsg: 'Hello%2C%20I%20would%20like%20to%20buy%20an%20Away%20Jersey%2025/26'
  },
  {
    name: 'Signed Jersey',
    price: 'GHC 129',
    img: homeJersey,
    waMsg: 'Hello%2C%20I%20would%20like%20to%20buy%20a%20Signed%20Jersey',
    highlight: true
  },
];

export const Store = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <section className={`py-16 px-4 md:px-8 ${isDarkMode ? 'bg-zinc-950' : 'bg-white'}`}>
    <div className="mb-10">
      <h2 className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
        OFFICIAL STORE
      </h2>
      <p className={`text-sm mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
        Matchday wear. Limited drops. Authentic pieces.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <article key={p.name}
          className={`rounded-2xl overflow-hidden border transition hover:scale-[1.02]
            ${isDarkMode ? 'bg-zinc-900 border-white/10' : 'bg-zinc-50 border-zinc-200'}`}>
          <div className="aspect-square overflow-hidden bg-zinc-800">
            <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
          </div>
          <div className="p-4 flex items-center justify-between">
            <div>
              <h4 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                {p.name}
              </h4>
              <span className="text-sm font-black mt-0.5 block"
                style={{ color: p.highlight ? '#EFDC43' : isDarkMode ? 'white' : '#18181b' }}>
                {p.price}
              </span>
            </div>
            <a href={`https://wa.me/233208161814?text=${p.waMsg}`}
              target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 rounded-full text-xs font-bold border transition hover:opacity-70"
              style={{ borderColor: '#EFDC43', color: '#EFDC43' }}>
              Buy →
            </a>
          </div>
        </article>
      ))}
    </div>
  </section>
);
