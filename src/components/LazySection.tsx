import React, { Suspense, useEffect, useRef, useState, ComponentType, ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  minHeight?: string;
}

export function LazySection({ children, className = '', minHeight = '400px' }: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '600px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    // Give the newly mounted section a frame to layout, then let
    // GSAP ScrollTrigger recalculate trigger positions.
    const id = requestAnimationFrame(() => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('architect:section-mounted'));
      }
    });
    return () => cancelAnimationFrame(id);
  }, [visible]);

  return (
    <div ref={ref} className={className} style={{ minHeight: visible ? undefined : minHeight }}>
      {visible ? children : null}
    </div>
  );
}

export function lazyComponent<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  return React.lazy(factory);
}

export function SuspenseBoundary({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="w-full flex items-center justify-center py-24 opacity-40 font-mono-code text-xs tracking-widest text-white/50">
          LOADING_MODULE...
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
