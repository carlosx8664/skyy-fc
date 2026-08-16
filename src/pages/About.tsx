import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Target, Zap, Eye, Shield, Star, ChevronDown, ChevronUp, Building2, Trophy, Award, Globe, Heart, Briefcase, TrendingUp, DollarSign, PieChart, BarChart3 } from 'lucide-react';

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

// ─── Financial Report Section ──────────────────────────────────────────────
const FinancialReportSection = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className={`py-12 md:py-16 border-y ${isDarkMode ? 'border-white/5 bg-zinc-900/50' : 'border-zinc-200 bg-zinc-50'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left: Highlight */}
          <div className="lg:w-1/3 flex-shrink-0">
            <div className="sticky top-24">
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#EFDC43] block mb-2">
                Financial Report
              </span>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight
                ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                Ten-Year<br />
                <span className="text-[#EFDC43]">Performance</span>
              </h2>
              <p className={`mt-3 text-sm ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                2016/17 – 2026/27
              </p>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
                Building a Sustainable Football Institution Through Strategic Investment
              </p>
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 bg-[#EFDC43] text-black font-black text-sm uppercase tracking-widest rounded-full hover:bg-[#EFDC43]/80 transition-colors"
              >
                {expanded ? 'Show Less' : 'Read Full Report'}
                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
          </div>

          {/* Right: Content */}
          <div className={`lg:w-2/3 space-y-4 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            <div className={`text-sm leading-relaxed ${!expanded ? 'line-clamp-6' : ''}`}>
              <p className="mb-4 font-medium">
                Over the past decade, Skyy Football Club has evolved from a newly established Division Two side into one of Ghana's most respected and professionally managed Division One football clubs.
              </p>
              <p className="mb-4">
                Founded on the principles of discipline, youth development and community impact, the Club has consistently invested in building a sustainable football institution rather than simply assembling competitive teams. This philosophy has enabled Skyy FC to remain financially stable while strengthening its technical capacity, improving player welfare and developing talent capable of competing at the highest levels.
              </p>
              <p className="mb-4">
                Since its inception in 2016, Skyy FC has been impacted by <strong className={isDarkMode ? 'text-white' : 'text-zinc-900'}>GH¢6.12m Equity injection</strong> and <strong className={isDarkMode ? 'text-white' : 'text-zinc-900'}>GH¢2.0m revenue reinvestment</strong>. These investments have produced modern coaching structures, improved infrastructure, enhanced player development systems and a recognised football brand throughout Ghana.
              </p>
              <p className="mb-4 font-medium">
                Today, Skyy FC is positioned not only as a competitive football club but as an investment platform capable of delivering sporting success, commercial growth and long-term value for strategic partners.
              </p>

              {expanded && (
                <>
                  {/* Financial Highlights */}
                  <div className="my-6 p-4 md:p-6 rounded-xl bg-[#EFDC43]/10 border border-[#EFDC43]/20">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#EFDC43] mb-4">
                      Ten-Year Financial Highlights
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg bg-black/20">
                        <p className="text-xs opacity-60">Total Income Generated</p>
                        <p className="text-xl font-black text-[#EFDC43]">GH¢8,119,040</p>
                      </div>
                      <div className="p-3 rounded-lg bg-black/20">
                        <p className="text-xs opacity-60">Revenue Generated</p>
                        <p className="text-xl font-black text-[#EFDC43]">GH¢2,000,000</p>
                      </div>
                      <div className="p-3 rounded-lg bg-black/20">
                        <p className="text-xs opacity-60">Total Operational Investment</p>
                        <p className="text-xl font-black text-[#EFDC43]">GH¢7,240,630</p>
                      </div>
                      <div className="p-3 rounded-lg bg-black/20">
                        <p className="text-xs opacity-60">Net Operating Surplus</p>
                        <p className="text-xl font-black text-[#EFDC43]">GH¢878,410</p>
                      </div>
                      <div className="p-3 rounded-lg bg-black/20 sm:col-span-2">
                        <p className="text-xs opacity-60">Growth in Annual Income</p>
                        <p className="text-lg font-black">
                          <span className="text-[#EFDC43]">GH¢115,000</span>
                          <span className="text-xs opacity-50 mx-2">(2016/17)</span>
                          <span className="text-zinc-500">→</span>
                          <span className="text-[#EFDC43]">GH¢1,254,000</span>
                          <span className="text-xs opacity-50 mx-2">(2025/26)</span>
                          <span className="text-xs text-green-500 font-bold">+990%</span>
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-black/20 sm:col-span-2">
                        <p className="text-xs opacity-60">Growth in Operating Budget</p>
                        <p className="text-lg font-black">
                          <span className="text-[#EFDC43]">GH¢104,160</span>
                          <span className="text-xs opacity-50 mx-2">→</span>
                          <span className="text-[#EFDC43]">GH¢1,048,750</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Financial Journey */}
                  <div className="my-6 p-4 md:p-6 rounded-xl bg-zinc-800/50 border border-white/10">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#EFDC43] mb-3">
                      Financial Journey
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-[#EFDC43]/80 mb-1">
                          Phase One (2016–2018) – Building the Foundation
                        </h4>
                        <p className="text-sm">
                          Skyy FC's maiden season established the financial discipline that continues to guide the Club today. Operating with an expenditure budget of just <strong className={isDarkMode ? 'text-white' : 'text-zinc-900'}>GH¢104,160</strong>, the Club successfully financed player recruitment, technical staff, match operations, club administration, marketing, and the promotion campaign. The season concluded with promotion to Division One while recording an operating surplus. The following year saw significant investment in infrastructure, particularly the development of St. Martin's Park, preparing the Club for professional football.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-[#EFDC43]/80 mb-1">
                          Phase Two (2018–2021) – Investing in Competitive Growth
                        </h4>
                        <p className="text-sm">
                          Following promotion, the Club increased investment in player recruitment, coaching staff, residential accommodation, medical support, match logistics, and football operations. During this period Skyy FC consistently challenged for Premier League promotion while maintaining responsible financial management. Operational expenditure increased from <strong className={isDarkMode ? 'text-white' : 'text-zinc-900'}>GH¢222,390</strong> to over <strong className={isDarkMode ? 'text-white' : 'text-zinc-900'}>GH¢652,000</strong> as the Club expanded professionally.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-[#EFDC43]/80 mb-1">
                          Phase Three (2021–2026) – Professional Expansion
                        </h4>
                        <p className="text-sm">
                          The Club entered a period of accelerated growth characterised by improved sponsorship income, increased player transfer revenue, expanded commercial activities, greater investment in player welfare, modern coaching education, and enhanced marketing. Annual incomes exceeded <strong className={isDarkMode ? 'text-white' : 'text-zinc-900'}>GH¢1.25 million</strong>, allowing continued investment without compromising operational stability.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Revenue Analysis */}
                  <div className="my-6 p-4 md:p-6 rounded-xl bg-[#EFDC43]/5 border border-[#EFDC43]/10">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#EFDC43] mb-3">
                      Revenue Analysis
                    </h3>
                    <p className="text-sm mb-3">Over the past decade, Skyy FC has diversified its revenue sources to reduce dependence on any single funding stream.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="p-3 rounded-lg bg-black/20">
                        <p className="font-bold text-[#EFDC43]">Shareholder Investment</p>
                        <p className="text-xs">Owner equity and shareholder loans provided the financial foundation that enabled the Club to establish itself as a competitive football institution.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-black/20">
                        <p className="font-bold text-[#EFDC43]">Corporate Sponsorship</p>
                        <p className="text-xs">Sponsorship income increased steadily as the Club strengthened its brand and reputation.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-black/20">
                        <p className="font-bold text-[#EFDC43]">Player Transfers</p>
                        <p className="text-xs">The emergence of player transfer income reflects the success of Skyy FC's youth development strategy. Investment in young footballers has become one of the Club's strongest commercial assets.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-black/20">
                        <p className="font-bold text-[#EFDC43]">Match-Day Revenue</p>
                        <p className="text-xs">Gate receipts continue to grow alongside supporter engagement and improved match-day experiences.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-black/20">
                        <p className="font-bold text-[#EFDC43]">Tournament Income</p>
                        <p className="text-xs">Participation in domestic competitions has generated additional revenue while increasing national exposure.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-black/20">
                        <p className="font-bold text-[#EFDC43]">Merchandise & Fundraising</p>
                        <p className="text-xs">Community fundraising and merchandise sales demonstrate the growing support for the Skyy FC brand.</p>
                      </div>
                    </div>
                  </div>

                  {/* Expenditure Analysis */}
                  <div className="my-6 p-4 md:p-6 rounded-xl bg-zinc-800/50 border border-white/10">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#EFDC43] mb-3">
                      Expenditure Analysis
                    </h3>
                    <p className="text-sm mb-3">The Club's financial philosophy prioritises investment that directly improves football performance.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="p-3 rounded-lg bg-black/20">
                        <p className="font-bold text-[#EFDC43]">Technical Development</p>
                        <p className="text-xs">Coaches, technical staff, performance analysis, and tactical development.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-black/20">
                        <p className="font-bold text-[#EFDC43]">Player Welfare</p>
                        <p className="text-xs">Residential accommodation, nutrition, medical care, transportation, and match preparation.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-black/20">
                        <p className="font-bold text-[#EFDC43]">Player Recruitment</p>
                        <p className="text-xs">Consistent investment in player acquisition has strengthened squad quality while creating future transfer opportunities.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-black/20">
                        <p className="font-bold text-[#EFDC43]">Infrastructure</p>
                        <p className="text-xs">Investment in St. Martin's Park and operational facilities has enhanced the Club's long-term capacity.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-black/20 sm:col-span-2">
                        <p className="font-bold text-[#EFDC43]">Brand Development</p>
                        <p className="text-xs">Media and marketing expenditure has significantly increased the Club's visibility, supporter engagement and commercial attractiveness.</p>
                      </div>
                    </div>
                  </div>

                  {/* Financial Performance Indicators */}
                  <div className="my-6 p-4 md:p-6 rounded-xl bg-[#EFDC43]/10 border border-[#EFDC43]/20">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#EFDC43] mb-3">
                      Financial Performance Indicators
                    </h3>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-black/20">
                        <p className="font-bold text-[#EFDC43]">Income Growth</p>
                        <p className="text-sm">Annual income increased from <strong className={isDarkMode ? 'text-white' : 'text-zinc-900'}>GH¢115,000</strong> to <strong className={isDarkMode ? 'text-white' : 'text-zinc-900'}>GH¢1,254,000</strong> within ten seasons.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-black/20">
                        <p className="font-bold text-[#EFDC43]">Commercial Growth</p>
                        <p className="text-sm">Commercial income has expanded through sponsorship, player transfers, equity injection, fundraising, merchandise, and tournament participation.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-black/20">
                        <p className="font-bold text-[#EFDC43]">Sustainable Investment</p>
                        <p className="text-sm">Rather than pursuing short-term success, Skyy FC has consistently reinvested resources into football development and organisational capacity.</p>
                      </div>
                    </div>
                  </div>

                  {/* Why Invest */}
                  <div className="my-6 p-4 md:p-6 rounded-xl bg-zinc-800/50 border border-white/10">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#EFDC43] mb-3">
                      Why Skyy FC Represents a Strong Investment Opportunity
                    </h3>
                    <ul className="text-sm space-y-2 ml-4 list-disc">
                      <li><strong className={isDarkMode ? 'text-white' : 'text-zinc-900'}>Proven Track Record:</strong> Ten consecutive years of football operations. Consistent participation in Ghana's Division One League. Strong governance and disciplined financial management.</li>
                      <li><strong className={isDarkMode ? 'text-white' : 'text-zinc-900'}>Successful Player Development:</strong> The Club has developed players who have generated significant transfer income, validating its football development model.</li>
                      <li><strong className={isDarkMode ? 'text-white' : 'text-zinc-900'}>Strong Brand Identity:</strong> Known as The Pride of Wassa, Skyy FC enjoys a growing reputation, an expanding supporter base and increasing media visibility.</li>
                      <li><strong className={isDarkMode ? 'text-white' : 'text-zinc-900'}>Growth Potential:</strong> With continued investment, the Club is well positioned to achieve promotion to the Ghana Premier League, expand commercial partnerships, increase player transfer revenues, strengthen digital media engagement, and enhance infrastructure.</li>
                    </ul>
                  </div>

                  {/* Sustainability Strategy */}
                  <div className="my-6 p-4 md:p-6 rounded-xl bg-[#EFDC43]/5 border border-[#EFDC43]/10">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#EFDC43] mb-3">
                      Financial Sustainability Strategy
                    </h3>
                    <p className="text-sm mb-3">Over the next five years, Skyy FC aims to strengthen financial independence by increasing internally generated revenue.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <div className="p-2 px-3 rounded-lg bg-black/20">
                        <p className="text-xs">• Expanding sponsorship portfolios</p>
                      </div>
                      <div className="p-2 px-3 rounded-lg bg-black/20">
                        <p className="text-xs">• Growing player transfer income</p>
                      </div>
                      <div className="p-2 px-3 rounded-lg bg-black/20">
                        <p className="text-xs">• Commercialising digital platforms</p>
                      </div>
                      <div className="p-2 px-3 rounded-lg bg-black/20">
                        <p className="text-xs">• Increasing merchandising</p>
                      </div>
                      <div className="p-2 px-3 rounded-lg bg-black/20">
                        <p className="text-xs">• Enhancing match-day experiences</p>
                      </div>
                      <div className="p-2 px-3 rounded-lg bg-black/20">
                        <p className="text-xs">• Developing football academies</p>
                      </div>
                      <div className="p-2 px-3 rounded-lg bg-black/20">
                        <p className="text-xs">• Investing in sports science and technology</p>
                      </div>
                      <div className="p-2 px-3 rounded-lg bg-black/20">
                        <p className="text-xs">• Building strategic corporate partnerships</p>
                      </div>
                    </div>
                    <p className="text-sm mt-3">The objective is to reduce reliance on shareholder funding while creating a self-sustaining football institution.</p>
                  </div>

                  {/* Future Outlook */}
                  <div className="my-6 p-4 md:p-6 rounded-xl bg-zinc-800/50 border border-white/10">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#EFDC43] mb-3">
                      Future Outlook
                    </h3>
                    <p className="text-sm">
                      The next decade represents an exciting opportunity for Skyy Football Club. With a proven operating history, sound financial management and a recognised commitment to player development, the Club is positioned to become one of Ghana's leading football institutions.
                    </p>
                    <p className="text-sm mt-2">
                      Skyy FC is actively seeking strategic investors and commercial partners who share its vision of building a professionally managed club capable of competing successfully at the highest level of Ghanaian and African football.
                    </p>
                  </div>

                  {/* Investor Invitation */}
                  <div className="my-6 p-4 md:p-6 rounded-xl bg-[#EFDC43]/10 border border-[#EFDC43]/20 text-center">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#EFDC43] mb-3">
                      Partner With Skyy Football Club
                    </h3>
                    <p className="text-sm">
                      Skyy FC welcomes partnerships with investors, sponsors and organisations seeking to support the growth of a dynamic football institution with measurable impact.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mt-3">
                      <span className="px-3 py-1 text-xs bg-black/20 rounded-full">Club sponsorship</span>
                      <span className="px-3 py-1 text-xs bg-black/20 rounded-full">Stadium naming rights</span>
                      <span className="px-3 py-1 text-xs bg-black/20 rounded-full">Youth academy partnerships</span>
                      <span className="px-3 py-1 text-xs bg-black/20 rounded-full">Infrastructure development</span>
                      <span className="px-3 py-1 text-xs bg-black/20 rounded-full">Player development programmes</span>
                      <span className="px-3 py-1 text-xs bg-black/20 rounded-full">CSR initiatives</span>
                      <span className="px-3 py-1 text-xs bg-black/20 rounded-full">Commercial & media partnerships</span>
                    </div>
                    <p className="text-sm mt-3 font-medium">
                      Together, we can build a football institution that delivers sporting success, develops young talent and creates sustainable value for all stakeholders.
                    </p>
                  </div>

                  {/* Conclusion */}
                  <div className="my-6 p-4 md:p-6 rounded-xl bg-zinc-800/50 border border-white/10 text-center">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#EFDC43] mb-3">
                      Conclusion
                    </h3>
                    <p className="text-sm">
                      The first ten years of Skyy Football Club have been defined by ambition, resilience and disciplined investment. From a modest inaugural budget to a multimillion-cedi football operation, the Club has laid a strong financial and organisational foundation for the future.
                    </p>
                    <p className="text-sm mt-2">
                      As Skyy FC enters its second decade, it remains committed to sound governance, sustainable growth and the pursuit of excellence on and off the pitch.
                    </p>
                    <p className="text-sm mt-2 font-medium">
                      Skyy Football Club is not only investing in football—it is investing in people, communities and the future of Ghanaian sport.
                    </p>
                    <p className="text-sm mt-3 text-[#EFDC43] font-black uppercase tracking-widest">
                      "Building Champions. Creating Value. Inspiring Communities."
                    </p>
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

      {/* ── Financial Report Section ── */}
      <FinancialReportSection isDarkMode={isDarkMode} />

    </div>
  );
};