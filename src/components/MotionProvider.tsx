import { useEffect } from 'react';
import { useGsapLenis } from '../hooks/useGsapLenis';
import { scrollToSection, type ScrollRequest } from '../utils/scroll';

export default function MotionProvider() {
  useGsapLenis();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      scrollToSection(hash.slice(1));
    }

    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ScrollRequest>).detail;
      if (detail?.id) scrollToSection(detail.id);
    };
    window.addEventListener('architect:scroll-request', handler);
    return () => window.removeEventListener('architect:scroll-request', handler);
  }, []);

  return null;
}
