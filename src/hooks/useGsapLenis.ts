import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export function useGsapLenis() {
  useLayoutEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    // 1. Initialize Lenis Smooth Scroll — desktop only, and never for
    //    users who prefer reduced motion. Native scroll is cheaper and
    //    more reliable on touch devices.
    let lenis: Lenis | null = null;
    let updateTicker: ((time: number) => void) | null = null;
    if (!isTouchDevice && !prefersReducedMotion) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.1,
      });

      // Synchronize Lenis scroll position with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      updateTicker = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(updateTicker);
      gsap.ticker.lagSmoothing(0);
    }

    // 2. Setup GSAP Scroll-into-view Animations (hero entrance runs in an
    //    early inline script in index.astro, independent of React hydration)
    const ctx = gsap.context(() => {
      // Skip scroll-reveal animations entirely when reduced motion is requested.
      if (prefersReducedMotion) return;

      // --- Scroll-into-view Animations for Sections ---

      // Logo Strip Wave Ribbon Section
      gsap.from('#section-text-loop', {
        scrollTrigger: {
          trigger: '#section-text-loop',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 35,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Project Cards Section
      gsap.from('#section-project-cards', {
        scrollTrigger: {
          trigger: '#section-project-cards',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 45,
        duration: 0.9,
        ease: 'power2.out',
      });

      // Process Section
      gsap.from('#section-process', {
        scrollTrigger: {
          trigger: '#section-process',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 45,
        duration: 0.9,
        ease: 'power2.out',
      });

      // Testimonials Cassette Section
      gsap.from('#section-testimonials', {
        scrollTrigger: {
          trigger: '#section-testimonials',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 45,
        duration: 0.9,
        ease: 'power2.out',
      });

      // About Section
      gsap.from('#section-about', {
        scrollTrigger: {
          trigger: '#section-about',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 45,
        duration: 0.9,
        ease: 'power2.out',
      });

      // Team Section
      gsap.from('#section-team', {
        scrollTrigger: {
          trigger: '#section-team',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 45,
        duration: 0.9,
        ease: 'power2.out',
      });

      // FAQ Section
      gsap.from('#section-faq', {
        scrollTrigger: {
          trigger: '#section-faq',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 45,
        duration: 0.9,
        ease: 'power2.out',
      });

      // Footer
      gsap.from('footer', {
        scrollTrigger: {
          trigger: 'footer',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 50,
        duration: 0.9,
        ease: 'power2.out',
      });
    });

    // Lazy-loaded sections mount after the initial context is created.
    // Recalculate all trigger positions whenever a lazy section appears.
    const handleSectionMounted = () => ScrollTrigger.refresh();
    if (typeof window !== 'undefined') {
      window.addEventListener('architect:section-mounted', handleSectionMounted);
    }

    // Below-fold sections are render-skipped until they approach the viewport
    // (content-visibility: auto). When one renders, its real height replaces
    // the reserved height, so refresh trigger positions to keep the
    // scroll-reveal animations firing at the correct scroll offsets.
    let sectionObserver: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      sectionObserver = new IntersectionObserver(
        () => ScrollTrigger.refresh(),
        { rootMargin: '1000px' }
      );
      document.querySelectorAll('main section').forEach((section) => {
        sectionObserver?.observe(section);
      });
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('architect:section-mounted', handleSectionMounted);
      }
      if (sectionObserver) sectionObserver.disconnect();
      ctx.revert();
      if (lenis) lenis.destroy();
      if (updateTicker) gsap.ticker.remove(updateTicker);
    };
  }, []);
}
