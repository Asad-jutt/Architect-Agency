import React from 'react';
import { HelpCircle, Terminal } from 'lucide-react';
import BlurText from './BlurText';

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

      <h3 className="text-sm sm:text-base font-syne font-bold text-white group-hover:text-[#C6FF00] transition-colors leading-snug faq-title">
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
          question: 'What does a website design agency do?',
          answer: 'A website design agency plans, designs, builds, and launches high-performance websites. ARCHITECT.EXE covers strategy, UI/UX design, custom development, Webflow CMS setup, SEO, animations, and post-launch support — one team for everything instead of juggling freelancers.',
          category: 'WEBSITE_DESIGN_AGENCY'
        },
        {
          id: 'q2',
          question: 'How long does it take to build a website?',
          answer: 'A standard custom website takes 2 to 4 weeks. Focused marketing sites can ship in about 2 weeks, while complex e-commerce, WebGL, and animation-heavy builds take 4 to 6 weeks. Expedited 10-day launch sprints are available for time-critical projects.',
          category: 'WEBSITE_TIMELINE'
        },
        {
          id: 'q3',
          question: 'How much does a custom website cost?',
          answer: 'Custom website projects typically range from $5,000 for a focused marketing site to $25,000+ for advanced WebGL, e-commerce, and animation-heavy builds. We scope every project individually and quote a fixed price before any work begins — no hidden fees.',
          category: 'WEBSITE_PRICING'
        },
        {
          id: 'q4',
          question: 'Website builder or web design agency: which is better?',
          answer: 'Website builders like Webflow, Framer, and Wix are great for fast DIY sites, while a web design agency delivers fully custom design, animations, SEO, and performance. Choose an agency when your website is your main sales channel and needs to stand out and rank.',
          category: 'BUILDER_VS_AGENCY'
        },
        {
          id: 'q9',
          question: 'Can you migrate my website from WordPress or Next.js?',
          answer: 'Yes. We handle full CMS schema migrations, 301 redirects, SEO preservation, and re-platforming to Webflow or React with zero downtime, so your traffic and rankings survive the move.',
          category: 'WEBSITE_MIGRATION'
        }
      ]
    },
    {
      id: 'row2',
      speed: '45s',
      direction: 'right',
      faqItems: [
        {
          id: 'q5',
          question: 'How fast will my website load on mobile?',
          answer: 'We guarantee 90+ Lighthouse mobile performance scores. We ship optimized DOM trees, compressed WebP/AVIF images, GPU-accelerated animations, and lazy-loaded assets so pages feel instant on 4G and 5G networks.',
          category: 'WEBSITE_PERFORMANCE'
        },
        {
          id: 'q6',
          question: 'Is my website SEO and AI-search friendly?',
          answer: 'Yes. Every site we build follows SEO and AEO (Answer Engine Optimization) best practices: semantic HTML, schema.org structured data, fast Core Web Vitals, clean URLs, and content structured to rank in Google, ChatGPT, and AI overviews.',
          category: 'WEBSITE_SEO'
        },
        {
          id: 'q7',
          question: 'Who owns the website code and design assets?',
          answer: 'You do. Clients keep 100% ownership of all code, Webflow projects, custom scripts, design tokens, and Figma source files from the day we hand the project over.',
          category: 'WEBSITE_OWNERSHIP'
        },
        {
          id: 'q8',
          question: 'Do you provide website maintenance and updates?',
          answer: 'Yes. Our retainer plans include content updates, CMS management, speed audits, security patches, and ongoing animation enhancements so your site stays fast, secure, and current after launch.',
          category: 'WEBSITE_MAINTENANCE'
        },
        {
          id: 'q10',
          question: 'How do I start a project with a web design agency?',
          answer: 'Hit the INITIATE_PROJECT button in the navbar or open the contact terminal to book a free 15-minute technical discovery call. We review your goals, budget, and timeline, then send a fixed quote within 48 hours.',
          category: 'WEBSITE_ONBOARDING'
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

        <BlurText
          as="h2"
          text="FAQ"
          highlight={['AQ']}
          animateBy="letters"
          direction="top"
          delay={120}
          stepDuration={0.45}
          className="font-syne font-extrabold text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white leading-tight justify-center"
        />

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
