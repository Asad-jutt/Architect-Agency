/**
 * Shared section-scrolling helpers.
 *
 * Sections on the home page are rendered as server-side HTML (so the DOM
 * always contains them), but heavy interactive islands hydrate lazily.
 * scrollToSection() keeps polling until the target element is in the DOM,
 * and requestSectionScroll() lets any component ask MotionProvider to scroll.
 */

export interface ScrollRequest {
  id: string;
  nonce: number;
}

export function scrollToSection(sectionId: string) {
  if (typeof window === 'undefined') return;

  const attempt = () => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      return true;
    }
    return false;
  };

  if (attempt()) return;

  const start = Date.now();
  const interval = window.setInterval(() => {
    if (attempt() || Date.now() - start > 5000) {
      window.clearInterval(interval);
    }
  }, 120);
}

export function requestSectionScroll(sectionId: string) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent<ScrollRequest>('architect:scroll-request', {
      detail: { id: sectionId, nonce: Date.now() },
    })
  );
}
