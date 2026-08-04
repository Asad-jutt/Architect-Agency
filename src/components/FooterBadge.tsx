import React from 'react';

interface FooterBadgeProps {
  playBeep: (freq?: number) => void;
}

export const FooterBadge: React.FC<FooterBadgeProps> = ({ playBeep }) => {
  return (
    <div className="fixed bottom-4 right-4 z-40 select-none">
      <div
        onClick={() => {
          playBeep(880);
        }}
        className="bg-white text-black font-mono-code font-bold text-xs px-3 py-2 flex items-center gap-2 border border-black shadow-[3px_3px_0px_#000000] hover:translate-x-0.5 hover:-translate-y-0.5 transition-transform cursor-pointer"
        title="Webflow Brutalist Template Replica"
        id="footer-webflow-badge"
      >
        {/* Webflow stylized W icon */}
        <svg
          className="w-4 h-4 fill-current text-black"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M22.5 4.5l-6 15h-4.5l-3.5-9-3.5 9h-4.5l-6-15h4.5l3.5 9 3.5-9h4.5l3.5 9 3.5-9h4.5z" />
        </svg>
        <span>Made in Webflow</span>
      </div>
    </div>
  );
};
