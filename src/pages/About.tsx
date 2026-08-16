import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Target, Zap, Eye, Shield, Star, ChevronDown, ChevronUp, Building2, Trophy, Award, Globe, Heart, Briefcase } from 'lucide-react';

const pillars = [
  { icon: Eye,    title: 'Vision',      text: 'Develop Skyy FC into a model professional club in Ghana known for quality Players and Management.' },
  { icon: Zap,    title: 'Fearlessness', text: "Players trained with the Eagle's five traits: Powerful Vision, Fearlessness, Tenacity, High Flyers, and Nurturing." },
  { icon: Target, title: 'Mission',     text: 'Uncover young soccer talents and provide the enabling environment to develop them into top-grade professional players.' },
  { icon: Users,  title: 'Community',   text: 'Promote and establish Eagle Supporters Clubs in neighboring communities and schools to grow fan base and goodwill.' },
  { icon: Shield, title: 'Strategy',    text: 'All players live in the Club House to promote teamwork. Annual pre-season scouting to refresh and develop the squad.' },
  { icon: Star,   title: 'Promotion',   text: 'Proactive on social media with exclusive promotional benefits on Skyy FC Time — Skyy Power FM, Fridays 2:30–3:00 PM.' },
];

// ─── Legacy/Partnership Section Component ──────────────────────────────────
const LegacySection = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className={`py-12 md:py-16 border-y ${isDarkMode ? 'border-white/5 bg-zinc-900/50' : 'border-zinc-200 bg-zinc-50'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left: Highlight */}
          <div className="lg:w-1/3 flex-shrink-0">
            <div className="sticky top-24">
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#EFDC43] block mb-2">
                Invest in a Legacy
              </span>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight
                ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                Corporate<br />
                <span className="text-[#EFDC43]">Partnership</span>
              </h2>
              <p className={`mt-3 text-sm ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Skyy FC Ghana Premier League Qualification Project 2026/2027
              </p>
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 bg-[#EFDC43] text-black font-black text-sm uppercase tracking-widest rounded-full hover:bg-[#EFDC43]/80 transition-colors"
              >
                {expanded ? 'Show Less' : 'Read More'}
                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
          </div>

          {/* Right: Content */}
          <div className={`lg:w-2/3 space-y-4 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            <div className={`text-sm leading-relaxed ${!expanded ? 'line-clamp-6' : ''}`}>
              <p className="mb-4 text-base font-medium italic">
                "When communities thrive, businesses thrive."
              </p>
              <p className="mb-4">
                For the past decade, Skyy FC has become far more than a football club. We have become a symbol of hope, youth empowerment, community pride, and regional identity for Wassa East and the Western Region.
              </p>
              <p className="mb-4">
                Today, we invite visionary corporate leaders and distinguished individuals to become partners in writing one of Ghana's greatest football success stories.
              </p>

              {expanded && (
                <>
                  {/* Historic Opportunity */}
                  <div className="my-6 p-4 md:p-6 rounded-xl bg-[#EFDC43]/10 border border-[#EFDC43]/20">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#EFDC43] mb-3">
                      A Historic Opportunity
                    </h3>
                    <p className="text-sm">
                      Skyy FC is on the verge of qualifying for the Ghana Premier League—the highest level of football in Ghana. Achieving this milestone will not only elevate our club but also create lasting economic, social, and branding opportunities for Wassa East, the Western Region, and every organization that chooses to stand with us. This is your opportunity to become part of history.
                    </p>
                  </div>

                  {/* Why Partner */}
                  <div className="my-6 p-4 md:p-6 rounded-xl bg-zinc-800/50 border border-white/10">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#EFDC43] mb-3">
                      Why Your Organisation Should Partner Skyy FC
                    </h3>
                    <p className="text-sm mb-3">Supporting Skyy FC is an investment in:</p>
                    <ul className="text-sm space-y-2 ml-4 list-disc">
                      <li>Youth development and employment opportunities</li>
                      <li>Community health and social cohesion</li>
                      <li>Sports tourism and local economic growth</li>
                      <li>Brand visibility across Ghana's football landscape</li>
                      <li>Corporate Social Responsibility with measurable community impact</li>
                      <li>A lasting legacy that generations will remember</li>
                    </ul>
                    <p className="text-sm mt-3 font-medium">
                      Every successful football story has visionary partners behind it. We invite you to become one of them.
                    </p>
                  </div>

                  {/* Legacy Project */}
                  <div className="my-6 p-4 md:p-6 rounded-xl bg-[#EFDC43]/5 border border-[#EFDC43]/10">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#EFDC43] mb-3 flex items-center gap-2">
                      <Building2 size={16} /> The Legacy Project
                    </h3>
                    <p className="text-sm mb-3">
                      As part of our Premier League qualification campaign, Skyy FC will construct a landmark <strong className={isDarkMode ? 'text-white' : 'text-zinc-900'}>Three-Storey Legacy Stand</strong> at St. Martin's Park featuring:
                    </p>
                    <ul className="text-sm space-y-2 ml-4 list-disc">
                      <li>Modern dressing rooms</li>
                      <li>A 1,000-seat grandstand</li>
                      <li>Hospitality and VIP facilities</li>
                      <li>A permanent <strong className={isDarkMode ? 'text-white' : 'text-zinc-900'}>Donors' Honour Wall</strong> recognizing all major contributors</li>
                    </ul>
                    <p className="text-sm mt-3">
                      Your organization's name can become a permanent part of this landmark development, celebrating your commitment to community transformation for decades to come.
                    </p>
                  </div>

                  {/* Recognition */}
                  <div className="my-6 p-4 md:p-6 rounded-xl bg-zinc-800/50 border border-white/10">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#EFDC43] mb-3">
                      Recognition for Our Partners
                    </h3>
                    <p className="text-sm mb-3">Corporate partners and major donors will enjoy recognition through opportunities such as:</p>
                    <ul className="text-sm space-y-2 ml-4 list-disc">
                      <li>Permanent recognition on the Legacy Honour Wall</li>
                      <li>Brand visibility at St. Martin's Park</li>
                      <li>Recognition on Skyy FC's official website and social media platforms</li>
                      <li>Media acknowledgements during the campaign</li>
                      <li>Invitations to official club events and project milestones</li>
                      <li>Association with one of Ghana's fastest-rising football clubs</li>
                    </ul>
                    <p className="text-sm mt-3 font-medium">
                      Together, we will create a legacy that extends beyond football.
                    </p>
                  </div>

                  {/* Invitation to Lead */}
                  <div className="my-6 p-4 md:p-6 rounded-xl bg-[#EFDC43]/10 border border-[#EFDC43]/20">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#EFDC43] mb-3">
                      An Invitation to Lead
                    </h3>
                    <p className="text-sm">
                      Great organisations do not wait for history to happen. They help create it. Whether your contribution is financial, logistical, infrastructural, equipment-based, or in professional services, your partnership will help transform dreams into reality.
                    </p>
                    <p className="text-sm mt-3">
                      We respectfully invite your Board, Executive Management, Foundation, or Family Office to join Operation Skyy FC to the Ghana Premier League.
                    </p>
                    <p className="text-sm mt-3 font-medium">
                      Together, we will inspire a generation.<br />
                      Together, we will transform communities.<br />
                      Together, we will take Wassa East to the Ghana Premier League.
                    </p>
                  </div>

                  {/* How to Contribute */}
                  <div className="my-6 p-4 md:p-6 rounded-xl bg-[#EFDC43]/5 border border-[#EFDC43]/10">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#EFDC43] mb-3">
                      Make Your Contribution
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="p-3 rounded-lg bg-black/20">
                        <p className="font-bold uppercase text-xs tracking-widest text-[#EFDC43]">Bank Transfer</p>
                        <p className="text-xs mt-1">Account: Skyy FC</p>
                        <p className="text-xs">Bank: Access Bank</p>
                        <p className="text-xs font-mono">1047000004991</p>
                      </div>
                      <div className="p-3 rounded-lg bg-black/20">
                        <p className="font-bold uppercase text-xs tracking-widest text-[#EFDC43]">Cheque</p>
                        <p className="text-xs mt-1">Payable to:</p>
                        <p className="text-xs font-mono">Skyy FC – Daboase</p>
                      </div>
                      <div className="p-3 rounded-lg bg-black/20">
                        <p className="font-bold uppercase text-xs tracking-widest text-[#EFDC43]">Mobile Money</p>
                        <p className="text-xs mt-1">Westserve</p>
                        <p className="text-xs font-mono">054 101 1128</p>
                      </div>
                      <div className="p-3 rounded-lg bg-black/20">
                        <p className="font-bold uppercase text-xs tracking-widest text-[#EFDC43]">Pickup Service</p>
                        <p className="text-xs mt-1 font-mono">024 090 2550</p>
                      </div>
                      <div className="p-3 rounded-lg bg-black/20 sm:col-span-2">
                        <p className="font-bold uppercase text-xs tracking-widest text-[#EFDC43]">In-Kind Donations</p>
                        <p className="text-xs mt-1">Skyy House, 1920 West Fijai</p>
                      </div>
                    </div>
                  </div>

                  {/* Message to Leaders */}
                  <div className="my-6 p-4 md:p-6 rounded-xl bg-zinc-800/50 border border-white/10 text-center">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#EFDC43] mb-3">
                      A Message to Visionary Leaders
                    </h3>
                    <p className="text-sm">
                      Every generation is remembered for the institutions it built and the dreams it made possible. Your partnership today can help create a football institution that will inspire thousands of young people, stimulate economic activity, and proudly represent Wassa East and the Western Region on Ghana's biggest football stage.
                    </p>
                    <p className="text-sm mt-3 font-bold">
                      Be remembered as one of the visionary partners who helped take Skyy FC to the Ghana Premier League.
                    </p>
                  </div>

                  <div className="text-center mt-8 pt-6 border-t border-white/10">
                    <p className="text-xl font-black uppercase tracking-tight text-[#EFDC43]">
                      TOGETHER WE SHINE.
                    </p>
                    <p className="text-sm mt-2 opacity-60">SKYY FC — NO SIZE</p>
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

// ─── History Section ─────────────────────────────────────────────────────
const HistorySection = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className={`py-12 md:py-16 ${isDarkMode ? 'border-white/5' : 'border-zinc-200'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 rounded-lg bg-[#EFDC43]/10 text-[#EFDC43]">
            <Trophy size={22} />
          </div>
          <h2 className={`text-2xl md:text-3xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
            Our History
          </h2>
        </div>

        <div className={`rounded-2xl p-6 md:p-10 border relative overflow-hidden
          ${isDarkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-zinc-200 shadow-sm'}`}>
          
          <div className="text-sm leading-relaxed space-y-4">
            <p className="text-base font-black uppercase tracking-tight text-[#EFDC43]">
              Skyy FC: A Decade of Ambition, Resilience and Excellence
            </p>
            <p className="text-sm font-medium">
              From Unbeaten Beginnings to Building the Future of Ghanaian Football
            </p>
            <p className="text-sm opacity-70">The story of Skyy FC-Daboase, in Western Region Ghana</p>

            <div className={`${!expanded ? 'line-clamp-8' : ''}`}>
              <p>
                Since entering competitive football in 2016, Skyy Football Club has established itself as one of Ghana's most respected Division One clubs. Driven by a commitment to youth development, professional management and attractive football, the club has consistently challenged for honours while shaping the careers of talented young footballers.
              </p>
              <p>
                Known as "The Pride of Wassa", Skyy FC's journey has been defined by resilience, discipline and an unwavering belief that success is built on strong foundations.
              </p>

              {expanded && (
                <>
                  <div className="my-6 p-4 md:p-6 rounded-xl bg-[#EFDC43]/10 border border-[#EFDC43]/20">
                    <h4 className="text-sm font-black uppercase tracking-widest text-[#EFDC43] mb-2">
                      An Unforgettable Beginning
                    </h4>
                    <p>
                      Skyy FC announced its arrival in Ghanaian football during the 2016/17 season with one of the most remarkable debut campaigns in recent memory.
                    </p>
                    <p className="mt-2">
                      The club won the Shama Zone League without defeat, conceding just one goal in ten league matches before going on to win the Western Region Middle League unbeaten. Victories over Bis Paradise and Sefwi All Stars secured promotion to the National Division One League, completing an extraordinary season without a single defeat.
                    </p>
                    <p className="mt-2 font-medium">It was the perfect introduction to competitive football and set the standard for the years ahead.</p>
                  </div>

                  <div className="my-6 p-4 md:p-6 rounded-xl bg-zinc-800/50 border border-white/10">
                    <h4 className="text-sm font-black uppercase tracking-widest text-[#EFDC43] mb-2">
                      Making an Immediate Impact
                    </h4>
                    <p>
                      Promotion brought new challenges, but Skyy FC adapted quickly to life in Division One. During the 2017/18 season, the club exceeded expectations by occupying third place before the competition was suspended following the "Number 12" investigations into Ghana football. The impressive start confirmed Skyy FC's ability to compete with established clubs despite being newcomers.
                    </p>
                  </div>

                  <div className="my-6 p-4 md:p-6 rounded-xl bg-[#EFDC43]/5 border border-[#EFDC43]/10">
                    <h4 className="text-sm font-black uppercase tracking-widest text-[#EFDC43] mb-2">
                      Consistency Through Change
                    </h4>
                    <p>
                      When the Ghana Football Association organised the 2018/19 Normalisation Committee competition, Skyy FC again demonstrated its quality by finishing top of Zone 2B and qualifying for the MTN FA Cup Round of 64.
                    </p>
                    <p className="mt-2">
                      The following season, before football was halted by the COVID-19 pandemic, Skyy FC sat at the top of the Division One League Zone Two table, reinforcing its reputation as one of the country's strongest second-tier clubs.
                    </p>
                  </div>

                  <div className="my-6 p-4 md:p-6 rounded-xl bg-zinc-800/50 border border-white/10">
                    <h4 className="text-sm font-black uppercase tracking-widest text-[#EFDC43] mb-2">
                      Knocking on the Premier League Door
                    </h4>
                    <p>
                      The 2020/21 campaign saw Skyy FC come agonisingly close to promotion. Finishing runners-up to Bibiani Gold Stars, the club also made history by winning the inaugural GFA Division One Top Eight Clubs Super Cup tournament, adding its first major national trophy to an already impressive record. The achievement reflected years of careful planning, technical excellence and player development.
                    </p>
                  </div>

                  <div className="my-6 p-4 md:p-6 rounded-xl bg-[#EFDC43]/10 border border-[#EFDC43]/20">
                    <h4 className="text-sm font-black uppercase tracking-widest text-[#EFDC43] mb-2">
                      Lessons Through Adversity
                    </h4>
                    <p>
                      Every successful club faces setbacks, and Skyy FC has never allowed disappointment to define its future. Despite disciplinary challenges and home match bans during the 2021/22 season, the club reached the MTN FA Cup Round of 16 before narrowly losing to Hearts of Oak, demonstrating determination and competitive spirit.
                    </p>
                  </div>

                  <div className="my-6 p-4 md:p-6 rounded-xl bg-zinc-800/50 border border-white/10">
                    <h4 className="text-sm font-black uppercase tracking-widest text-[#EFDC43] mb-2">
                      The Season That Captured Ghana
                    </h4>
                    <p>
                      Few Division One campaigns have generated as much discussion as Skyy FC's 2022/23 season. After climbing from 13th position to establish an eight-point lead at the top of the table, the club delivered one of the performances of the season with a commanding 3–0 victory over Nations FC.
                    </p>
                    <p className="mt-2">
                      A subsequent disciplinary ruling overturned the result, deducted points from Skyy FC and ultimately denied the club promotion to the Ghana Premier League.
                    </p>
                    <p className="mt-2">
                      Although promotion slipped away, the team's performances earned widespread admiration and produced some of the league's biggest individual honours. Goalkeeper Solomon Ohene Nimo was named Division One Goalkeeper of the Year, while Baba Hamadu Musah claimed both the Division One Top Scorer award with 20 goals and the Division One Best Player award.
                    </p>
                    <p className="mt-2">
                      Skyy FC also finished runners-up in the Division One Top Eight Super Cup after an impressive run that included victories over Bofoakwa Tano, Young Apostles, Nzema Kotoko and Heart of Lions.
                    </p>
                  </div>

                  <div className="my-6 p-4 md:p-6 rounded-xl bg-[#EFDC43]/5 border border-[#EFDC43]/10">
                    <h4 className="text-sm font-black uppercase tracking-widest text-[#EFDC43] mb-2">
                      Rising Again
                    </h4>
                    <p>
                      True champions respond positively to adversity. During the 2023/24 season, Skyy FC rebuilt confidently, finishing fourth in Division One while reaching the quarter-finals of the MTN FA Cup. The campaign reaffirmed the club's resilience and competitive strength.
                    </p>
                  </div>

                  <div className="my-6 p-4 md:p-6 rounded-xl bg-zinc-800/50 border border-white/10">
                    <h4 className="text-sm font-black uppercase tracking-widest text-[#EFDC43] mb-2">
                      Rebuilding for Long-Term Success
                    </h4>
                    <p>
                      Recognising the need to build sustainably, Skyy FC undertook one of the most significant rebuilding exercises in its history during the 2024/25 season. A new technical team headed by Coach Dennis Boateng and an almost entirely new squad were assembled and club house relocated to Skyy House in Takoradi and Gyandu Park became the temporary home turf for the club. The head coach baton was handed to Coach Bright Ellis eventually to steer the club successfully through the most challenging campaign, securing Division One status while laying the foundation for future growth.
                    </p>
                  </div>

                  <div className="my-6 p-4 md:p-6 rounded-xl bg-[#EFDC43]/10 border border-[#EFDC43]/20">
                    <h4 className="text-sm font-black uppercase tracking-widest text-[#EFDC43] mb-2">
                      Investing in Excellence
                    </h4>
                    <p>
                      The 2025/26 season reflected Skyy FC's long-term vision. The club invested heavily in strategic technical education. A director of the club, Adwoa Amofah progressed through CAF coaching qualifications to compliment investments in former Captains of the club Joseph K Yeboah and Emmanuel Ankobeah coaching education while son of club President, Kwaku Arthur completed specialist training as a Video Analyst. Returns on investment was promising in the short period Coach Adwoa acted as head Coach for a brief five matches period. Following a four match winning streak, Coach Adwoa was named the Ghana Division One Coach of the Month for December 2025 by Ghana Football Association.
                    </p>
                    <p className="mt-2">The return to St. Martin's Park in Daboase also strengthened the bond between the club and its supporters.</p>
                  </div>

                  <div className="my-6 p-4 md:p-6 rounded-xl bg-zinc-800/50 border border-white/10">
                    <h4 className="text-sm font-black uppercase tracking-widest text-[#EFDC43] mb-2">
                      A New Era Begins
                    </h4>
                    <p>
                      This new 2026/27 season marks another important chapter in Skyy FC's journey. With renewed investment in youth development, improved technical capacity with Coach Adwoa completing CAF license B training to assume head coach role ably supported by proven technical team and a strengthened organisational structure, the club is determined to transform potential into lasting success.
                    </p>
                    <p className="mt-2 font-medium">
                      The ambition remains clear: earn promotion to the Ghana Premier League while continuing to produce talented footballers capable of succeeding in Ghana and beyond.
                    </p>
                  </div>

                  <div className="my-6 p-4 md:p-6 rounded-xl bg-[#EFDC43]/5 border border-[#EFDC43]/10">
                    <h4 className="text-sm font-black uppercase tracking-widest text-[#EFDC43] mb-2">
                      More Than a Football Club
                    </h4>
                    <p>
                      Skyy FC's identity extends beyond results on the pitch. Through its residential player development model, community outreach programmes and Eagle Supporters Clubs, the club continues to invest in young people and strengthen its relationship with communities across the Western Region.
                    </p>
                    <p className="mt-2">
                      Every player is developed around the club's Eagle Philosophy, which emphasises vision, fearlessness, tenacity, excellence and the responsibility to inspire future generations.
                    </p>
                  </div>

                  <div className="my-6 p-4 md:p-6 rounded-xl bg-zinc-800/50 border border-white/10 text-center">
                    <h4 className="text-sm font-black uppercase tracking-widest text-[#EFDC43] mb-2">
                      The Journey Continues
                    </h4>
                    <p>
                      From an unbeaten debut season to becoming one of Ghana's most respected Division One clubs, Skyy Football Club has built a legacy founded on hard work, resilience and ambition.
                    </p>
                    <p className="mt-2 font-medium">
                      While many milestones have already been achieved, the club believes its greatest successes still lie ahead.
                    </p>
                    <p className="mt-2">
                      As The Pride of Wassa, Skyy FC remains committed to developing champions, building character and inspiring communities—one season, one player and one victory at a time.
                    </p>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#EFDC43] text-black font-black text-sm uppercase tracking-widest rounded-full hover:bg-[#EFDC43]/80 transition-colors mt-4"
            >
              {expanded ? 'Show Less' : 'Read Full History'}
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Main About Component ──────────────────────────────────────────────────
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

      {/* ── Legacy / Corporate Partnership Section ── */}
      <LegacySection isDarkMode={isDarkMode} />

      {/* ── History Section ── */}
      <HistorySection isDarkMode={isDarkMode} />

    </div>
  );
};