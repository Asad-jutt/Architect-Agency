export const SITE_URL = 'https://architect.exe';
export const SITE_NAME = 'ARCHITECT.EXE';
export const SITE_NAME_LEGAL = 'ARCHITECT.EXE Studio';
export const SITE_DESCRIPTION =
  'ARCHITECT.EXE is a high-performance web design and development agency building Webflow, React and Three.js sites with liquid animations and uncompromising performance.';
export const SITE_IMAGE =
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop';

export function absoluteUrl(path = '') {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
