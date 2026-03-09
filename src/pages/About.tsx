import React from 'react';
import { motion } from 'motion/react';
import { Users, Target, Zap, Eye, Shield, Star } from 'lucide-react';

const pillars = [
  { icon: Eye,    title: 'Vision',      text: 'Develop Skyy FC into a model professional club in Ghana known for quality Players and Management.' },
  { icon: Zap,    title: 'Fearlessness', text: "Players trained with the Eagle's five traits: Powerful Vision, Fearlessness, Tenacity, High Flyers, and Nurturing." },
  { icon: Target, title: 'Mission',     text: 'Uncover young soccer talents and provide the enabling environment to develop them into top-grade professional players.' },
  { icon: Users,  title: 'Community',   text: 'Promote and establish Eagle Supporters Clubs in neighboring communities and schools to grow fan base and goodwill.' },
  { icon: Shield, title: 'Strategy',    text: 'All players live in the Club House to promote teamwork. Annual pre-season scouting to refresh and develop the squad.' },
  { icon: Star,   title: 'Promotion',   text: 'Proactive on social media with exclusive promotional benefits on Skyy FC Time — Skyy Power FM, Fridays 2:30–3:00 PM.' },
];

export const About = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <div className={`pb-24 ${isDarkMode ? 'bg-zinc-950' : 'bg-zinc-50'}`}>

      {/* ── Hero Banner ── */}
      <section className={`relative py-16 md:py-24 px-4 md:px-6 border-b overflow-hidden
        ${isDarkMode ? 'border-white/5' : 'border-zinc-200'}`}>
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #EFDC43 0, #EFDC43 1px, transparent 0, transparent 50%)', backgroundSize: '24px 24px' }} />

        <div className="relative max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs font-bold tracking-[0.3em] uppercase block mb-3" style={{ color: '#EFDC43' }}>
              Est. 2016 · Daboase, Ghana
            </span>
            <h1 className={`text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none mb-6
              ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              About<br /><span style={{ color: '#EFDC43' }}>Skyy FC</span>
            </h1>
            <p className={`text-lg md:text-xl max-w-2xl leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              The Pride of Wassa. Developing Ghana's next generation of eagle-grade professional footballers.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-3 mt-8">
            {['No Size', 'The Pride of Wassa', 'Skyy Blue & Yellow', 'The Eagle'].map((tag) => (
              <span key={tag}
                className={`text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border
                  ${isDarkMode ? 'border-white/10 text-zinc-400' : 'border-zinc-300 text-zinc-500'}`}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Model ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 rounded-lg bg-[#EFDC43]/10 text-[#EFDC43]"><Target size={22} /></div>
          <h2 className={`text-2xl md:text-3xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
            Our Model
          </h2>
        </div>

        <div className={`rounded-2xl p-6 md:p-10 mb-10 border relative overflow-hidden
          ${isDarkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-zinc-200 shadow-sm'}`}>
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-5 -translate-y-1/2 translate-x-1/2"
            style={{ background: '#EFDC43' }} />
          <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
            Vision
          </p>
          <p className={`text-lg md:text-2xl font-bold leading-relaxed ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
            "To develop Skyy FC into a model professional club in Ghana known for the quality of Players and Management reflected in performances on and off the pitch."
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`rounded-xl p-5 border group hover:border-[#EFDC43]/50 transition-colors
                ${isDarkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-zinc-200 shadow-sm'}`}>
              <div className="w-9 h-9 rounded-lg bg-[#EFDC43]/10 flex items-center justify-center mb-4">
                <Icon size={18} style={{ color: '#EFDC43' }} />
              </div>
              <h3 className={`text-sm font-black uppercase tracking-widest mb-2 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                {title}
              </h3>
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};