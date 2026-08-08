import React from 'react';
import {
  Twitter,
  Linkedin,
  Github,
  Mail,
  Terminal,
  Cpu,
  ArrowUpRight,
  Shield,
  Layers
} from 'lucide-react';
import BlurText from './BlurText';

export interface FooterLink {
  label: string;
  href: string;
  onClick?: () => void;
}

export interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

export interface FooterProps {
  brandName?: string;
  brandDescription?: string;
  socialLinks?: SocialLink[];
  navLinks?: FooterLink[];
  creatorName?: string;
  creatorUrl?: string;
  brandIcon?: React.ReactNode;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({
  brandName = "ARCHITECT.EXE",
  brandDescription = "UNHINGED CREATIVITY & HIGH-PERFORMANCE WEBFLOW ENGINEERING // BUILDING LIQUID DIGITAL SURFACES FOR WORLD-CLASS BRANDS.",
  socialLinks,
  navLinks,
  creatorName = "ARCHITECT_OPERATIVES",
  creatorUrl = "/",
  brandIcon,
  className = ""
}) => {
  const defaultSocialLinks: SocialLink[] = socialLinks || [
    {
      icon: <Twitter className="w-5 h-5" />,
      href: "https://twitter.com",
      label: "Twitter",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com",
      label: "GitHub",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:hello@architect.exe",
      label: "Email",
    },
  ];

  const defaultNavLinks: FooterLink[] = navLinks || [
    { label: "// SELECTED_WORKS", href: "/works" },
    { label: "// OUR_PROCESS", href: "/#section-process" },
    { label: "// OPERATIVES", href: "/#section-team" },
    { label: "// PROTOCOL_FAQ", href: "/#section-faq" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hashIndex = href.indexOf('#');
    if (hashIndex < 0) return;
    const targetId = href.slice(hashIndex);
    const targetPath = href.slice(0, hashIndex) || '/';
    const onTargetPage =
      targetPath === '/' || window.location.pathname.startsWith(targetPath);
    if (onTargetPage) {
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = `/${targetId}`;
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className={`relative w-full overflow-hidden bg-black text-white select-none ${className}`}>
      <footer className="border-t border-white/10 bg-black relative overflow-x-hidden">
        {/* Subtle Background Cyber Grid */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#C6FF00 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="max-w-7xl flex flex-col justify-between mx-auto min-h-[30rem] sm:min-h-[34rem] md:min-h-[38rem] relative p-4 sm:p-6 md:p-8 py-10 sm:py-14 z-10">
          
          {/* Header & Brand Section */}
          <div className="flex flex-col mb-12 sm:mb-16 md:mb-0 w-full">
            <div className="w-full flex flex-col items-center text-center">
              
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#12130F] border border-white/10 rounded-full font-mono-code text-[11px] text-[#C6FF00] mb-6">
                <span className="w-2 h-2 rounded-full bg-[#C6FF00] animate-ping" />
                <span className="uppercase tracking-widest font-bold">// SYSTEM_STATUS: ONLINE_24/7</span>
              </div>

              {/* Brand Title & Description */}
              <div className="space-y-3 flex flex-col items-center max-w-2xl">
                <div className="flex items-center gap-2">
                  <BlurText
                    as="span"
                    text={brandName}
                    highlight={['EXE']}
                    animateBy="letters"
                    direction="top"
                    delay={70}
                    stepDuration={0.4}
                    className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase"
                  />
                </div>
                <p className="font-mono-code text-xs sm:text-sm text-zinc-400 font-medium text-center leading-relaxed px-4 sm:px-0">
                  {brandDescription}
                </p>
              </div>

              {/* Social Links */}
              {defaultSocialLinks.length > 0 && (
                <div className="flex flex-wrap justify-center mb-8 mt-6 gap-3 sm:gap-4">
                  {defaultSocialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-3 sm:p-3 bg-[#12130F] border border-white/10 hover:border-[#C6FF00] rounded-lg text-zinc-400 hover:text-[#C6FF00] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(198,255,0,0.2)]"
                      aria-label={link.label}
                    >
                      <div className="w-5 h-5 transition-transform duration-300 group-hover:scale-110">
                        {link.icon}
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {/* Navigation Links */}
              {defaultNavLinks.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 font-mono-code text-xs sm:text-sm font-semibold text-zinc-300 max-w-full px-2">
                  {defaultNavLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="px-3 py-1.5 hover:text-[#C6FF00] transition-all duration-300 hover:bg-[#12130F] rounded border border-transparent hover:border-white/10 uppercase tracking-wider flex items-center gap-1"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Bar Details */}
          <div className="mt-16 sm:mt-20 md:mt-24 flex flex-col gap-3 sm:gap-4 md:gap-0 items-center justify-center md:flex-row md:items-center md:justify-between border-t border-white/10 pt-6 px-2 sm:px-4">
            <p className="font-mono-code text-xs text-zinc-400 text-center md:text-left flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-[#C6FF00]" />
              <span>© {new Date().getFullYear()} {brandName}. ALL RIGHTS RESERVED.</span>
            </p>

            <div className="flex items-center gap-4">
              {creatorName && (
                <a
                  href={creatorUrl}
                  onClick={(e) => {
                    if (creatorUrl === '#') e.preventDefault();
                  }}
                  className="font-mono-code text-xs text-zinc-400 hover:text-[#C6FF00] transition-colors duration-300 flex items-center gap-1"
                >
                  <span>CRAFTED BY {creatorName.toUpperCase()}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}

              {/* Back to top trigger */}
            </div>
          </div>
        </div>

        {/* Giant Background Text - Infinite Marquee */}
        <div
          className="absolute bottom-24 md:bottom-16 left-1/2 -translate-x-1/2 w-full overflow-hidden z-0 pointer-events-none select-none"
          style={{ maxWidth: '98vw' }}
        >
          <div className="flex animate-scroll-horizontal" style={{ '--scroll-duration': '35s' } as React.CSSProperties}>
            {[0, 1].map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1}
                className="flex-shrink-0 whitespace-nowrap px-2 uppercase bg-gradient-to-b from-white/35 via-white/15 to-transparent bg-clip-text text-transparent leading-none font-syne font-extrabold tracking-tighter"
                style={{ fontSize: 'clamp(3.5rem, 13vw, 11rem)', marginRight: '0.5em' }}
              >
                {brandName}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Floating Interactive Logo Pill */}
        <div 
          onClick={scrollToTop}
          className="absolute group hover:border-[#C6FF00] duration-300 shadow-[0_0_25px_rgba(198,255,0,0.25)] bottom-20 md:bottom-16 backdrop-blur-md rounded-2xl bg-black/80 left-1/2 border border-white/20 flex items-center justify-center p-2 -translate-x-1/2 z-20 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
          title="Return to System Top"
        >
          <div className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 bg-[#C6FF00] rounded-xl flex items-center justify-center shadow-lg group-hover:bg-white transition-colors duration-300">
            {brandIcon || (
              <Terminal className="w-4 sm:w-6 md:w-7 h-4 sm:h-6 md:h-7 text-black group-hover:text-black transition-colors" />
            )}
          </div>
        </div>

        {/* Glowing Horizon Line */}
        <div className="absolute bottom-28 sm:bottom-24 backdrop-blur-sm h-[1px] bg-gradient-to-r from-transparent via-[#C6FF00]/40 to-transparent w-full left-1/2 -translate-x-1/2 pointer-events-none" />

        {/* Bottom Ambient Glow Shadow */}
        <div className="bg-gradient-to-t from-black via-black/80 blur-[1em] to-transparent absolute bottom-20 w-full h-20 pointer-events-none" />
      </footer>
    </section>
  );
};

export default Footer;
