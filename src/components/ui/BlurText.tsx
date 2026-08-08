import { motion, type Transition, type Easing } from 'motion/react';
import { useEffect, useRef, useState, useMemo, type ElementType } from 'react';

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, number | string>;
  animationTo?: Record<string, number | string>[];
  easing?: Easing;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  as?: ElementType;
  highlight?: string[];
  highlightClassName?: string;
}

const buildKeyframes = (from: Record<string, number | string>, steps: Record<string, number | string>[]) => {
  const keys = new Set<string>([...Object.keys(from), ...steps.flatMap((s) => Object.keys(s))]);

  const keyframes: Record<string, (number | string)[]> = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px 0px -20% 0px',
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35,
  as: Tag = 'p',
  highlight = [],
  highlightClassName = 'text-[#C6FF00]',
}: BlurTextProps) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current as Element);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5,
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const isHighlighted = useMemo(() => {
    const arr = new Array<boolean>(text.length).fill(false);
    const lower = text.toLowerCase();
    highlight.forEach((h) => {
      const hl = h.toLowerCase();
      if (!hl) return;
      let idx = lower.indexOf(hl);
      while (idx !== -1) {
        for (let i = idx; i < idx + hl.length && i < arr.length; i++) arr[i] = true;
        idx = lower.indexOf(hl, idx + 1);
      }
    });
    return arr;
  }, [text, highlight]);

  const elements = useMemo(() => {
    if (animateBy === 'letters') {
      return Array.from(text).map((c, i) => ({ text: c, highlight: isHighlighted[i], trailing: false }));
    }
    let offset = 0;
    return text.split(' ').map((word) => {
      const hl = word.length > 0 && Array.from(word).every((c, i) => isHighlighted[offset + i]);
      offset += word.length + 1;
      return { text: word, highlight: hl, trailing: true };
    });
  }, [text, animateBy, isHighlighted]);

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  return (
    <Tag ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition: Transition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing,
        };

        return (
          <motion.span
            className={`inline-block will-change-[transform,filter,opacity]${segment.highlight ? ` ${highlightClassName}` : ''}`}
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
          >
            {segment.text === ' ' ? '\u00A0' : segment.text}
            {segment.trailing && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        );
      })}
    </Tag>
  );
};

export default BlurText;
