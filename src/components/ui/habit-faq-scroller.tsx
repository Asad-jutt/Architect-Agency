import React from 'react';
import { HelpCircle, Terminal } from 'lucide-react';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface FaqRow {
  id: string;
  speed?: string;
  direction?: 'left' | 'right';
  faqItems: FaqItem[];
}

export interface FaqData {
  mainTitle?: string;
  mainSubtitle?: string;
  rows: FaqRow[];
}

/**
 * FaqCard
 * Reusable card for a single FAQ item matching site's dark brutalist aesthetic.
 */
export const FaqCard: React.FC<FaqItem> = ({ question, answer, category = 'SYSTEM_QUERY' }) => {
  return (
    <div className="group flex flex-col items-start gap-3 p-5 sm:p-6 bg-[#12130F] border border-white/10 hover:border-[#C6FF00] rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(198,255,0,0.2)] w-[300px] sm:w-[380px] md:w-[420px] flex-shrink-0 faq-card text-left select-none">
      <div className="flex items-center justify-between w-full font-mono-code text-[10px] text-[#C6FF00] uppercase tracking-widest border-b border-white/10 pb-2">
        <span className="flex items-center gap-1.5 font-bold">
          <Terminal className="w-3 h-3 text-[#C6FF00]" />
          {category}
        </span>
        <span className="text-zinc-500 font-medium">// ARCHITECT.FAQ</span>
      </div>

      <h3 className="text-sm sm:text-base font-syne font-bold text-white group-hover:text-[#C6FF00] transition-colors leading-snug faq-title uppercase">
        {question}
      </h3>

      <p className="text-xs sm:text-sm text-zinc-300 font-mono-code leading-relaxed faq-answer">
        {answer}
      </p>
    </div>
  );
};

/**
 * HorizontalScroller
 * Wraps children and creates a seamless horizontal looping animation.
 */
export const HorizontalScroller: React.FC<{
  children: React.ReactNode;
  speed?: string;
  direction?: 'left' | 'right';
}> = ({ children, speed = '40s', direction = 'left' }) => {
  const animationClass =
    direction === 'right' ? 'animate-scroll-horizontal-reverse' : 'animate-scroll-horizontal';

  const style = { '--scroll-duration': speed } as React.CSSProperties;

  return (
    <div className="w-full overflow-hidden group relative scroller-mask">
      <div className={`flex ${animationClass}`} style={style}>
        <div className="flex items-stretch justify-center flex-shrink-0 gap-4 sm:gap-6 px-2">
          {children}
        </div>
        {/* duplicate for seamless loop */}
        <div className="flex items-stretch justify-center flex-shrink-0 gap-4 sm:gap-6 px-2" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};

export const DEFAULT_FAQ_DATA: FaqData = {
  mainTitle: 'FAQ',
  mainSubtitle: 'SYSTEM QUERY DIRECTORY // TRANSPARENT PROTOCOLS & ARCHITECTURAL SPECS',
  rows: [
    {
      id: 'row1',
      speed: '50s',
      direction: 'left',
      faqItems: [
        {
          id: 'q1',
          question: 'What is ARCHITECT.EXE and how do we work?',
          answer: 'We are a high-octane Webflow & web development agency specializing in unhinged creativity, liquid animations, and performance-first engineering.',
          category: 'AGENCY_PROFILE'
        },
        {
          id: 'q2',
          question: 'How fast can a project be delivered?',
          answer: 'Standard sprints take 2 to 4 weeks. High-priority rapid deployments can be expedited in 10-day shockwave cycles with dedicated operative pods.',
          category: 'TIMELINE'
        },
        {
          id: 'q3',
          question: 'Do you build custom Webflow interactive engines?',
          answer: 'Yes. We build bespoke GSAP, Three.js, WebGL, and custom JS integrations seamlessly inside Webflow CMS and React environments.',
          category: 'ENGINEERING'
        },
        {
          id: 'q7',
          question: 'Can we migrate from WordPress or Next.js?',
          answer: 'Effortlessly. We handle full CMS schema migrations, 301 redirects, SEO preservation, and structural re-platforming without downtime.',
          category: 'MIGRATION'
        }
      ]
    },
    {
      id: 'row2',
      speed: '45s',
      direction: 'right',
      faqItems: [
        {
          id: 'q4',
          question: 'Will my website be lightning fast on mobile?',
          answer: 'Guaranteed 90+ Lighthouse mobile performance scores. We optimize clean DOM trees, compressed webp/avif, and GPU-accelerated CSS.',
          category: 'PERFORMANCE'
        },
        {
          id: 'q5',
          question: 'Who owns the code and Webflow assets?',
          answer: 'You retain 100% full ownership of all Webflow projects, custom code scripts, design tokens, and source Figma files upon project delivery.',
          category: 'OWNERSHIP'
        },
        {
          id: 'q6',
          question: 'Do you provide post-launch maintenance?',
          answer: 'Yes. Our Operative Retainer program offers continuous updates, CMS management, speed audits, and ongoing animation enhancements.',
          category: 'RETAINER'
        },
        {
          id: 'q8',
          question: 'How do we start a project with ARCHITECT.EXE?',
          answer: 'Hit the INITIATE_PROJECT button in the navbar or trigger the contact terminal below to schedule a 15-minute technical discovery session.',
          category: 'ONBOARDING'
        }
      ]
    }
  ]
};

/**
 * FaqSection
 * Assembles title, subtitle, and multiple horizontal rows.
 */
export const FaqSection: React.FC<{ data?: FaqData }> = ({ data = DEFAULT_FAQ_DATA }) => {
  return (
    <section className="relative flex flex-col items-center gap-8 sm:gap-10 py-12 sm:py-16 md:py-20 w-full bg-black text-white border-t border-b border-white/10 select-none overflow-hidden" id="section-faq">
      {/* Background Cyber Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#C6FF00 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Header */}
      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 relative z-10 text-center">
        <div className="flex items-center justify-center gap-2 font-mono-code text-xs text-[#C6FF00] mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-[#C6FF00]" />
          <span className="uppercase tracking-widest font-bold">// KNOWLEDGE_BASE // PROTOCOL_FAQ</span>
        </div>

        <h2 className="font-syne font-extrabold text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white leading-tight">
          F<span className="text-[#C6FF00]">AQ</span>
        </h2>

        <p className="mt-2 font-mono-code text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto uppercase tracking-wide">
          {data.mainSubtitle}
        </p>
      </div>

      {/* Infinite Scroller Rows */}
      <div className="flex flex-col gap-5 sm:gap-6 z-10 w-full relative">
        {data.rows.map((row) => (
          <HorizontalScroller key={row.id} speed={row.speed} direction={row.direction}>
            {row.faqItems.map((item) => (
              <FaqCard key={item.id} {...item} />
            ))}
          </HorizontalScroller>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
