import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export function useGsapLenis() {
  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
    });

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // 2. Setup GSAP Page Load & Scroll Animations
    const ctx = gsap.context(() => {
      // --- Page Load Sequence (Hero Section) ---
      const heroTl = gsap.timeline({ 
        defaults: { ease: 'power3.out', duration: 0.6 },
        onComplete: () => {
          gsap.set(['#btn-initialize-system', '#heading-architect', '#sticker-release', '#sticker-dna'], { clearProps: 'all' });
        }
      });

      heroTl
        .from('header', { y: -30, opacity: 0, duration: 0.5 })
        .from('#heading-architect', { y: 30, opacity: 0, duration: 0.6 }, '-=0.2')
        .from('#sticker-release', { scale: 0, rotation: -12, opacity: 0, ease: 'back.out(1.5)' }, '-=0.3')
        .from('#sticker-dna', { scale: 0, rotation: 12, opacity: 0, ease: 'back.out(1.5)' }, '-=0.3')
        .from('#btn-initialize-system', { y: 20, opacity: 0 }, '-=0.3')
        .from('#status-container-click', { x: 20, opacity: 0 }, '-=0.4');

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

    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
    };
  }, []);
}
