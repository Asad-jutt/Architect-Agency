import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { ProjectData } from '../data/projectsData';

// Sanity Client setup (Astro & React compatible)
const metaEnv = (import.meta as any).env || {};
const projectId =
  metaEnv.PUBLIC_SANITY_PROJECT_ID ||
  metaEnv.VITE_SANITY_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID ||
  '';
const dataset =
  metaEnv.PUBLIC_SANITY_DATASET ||
  metaEnv.VITE_SANITY_DATASET ||
  process.env.SANITY_DATASET ||
  'production';

export const sanityEnabled = Boolean(projectId);

export const sanityClient = createClient({
  projectId: projectId || 'demo_architect',
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

export function imageUrlOf(source: any, width = 1200) {
  if (!source) return '';
  try {
    return urlFor(source).width(width).auto('format').url();
  } catch {
    return '';
  }
}

// Map a Sanity project document to the app's ProjectData shape.
function mapProjectToLocal(doc: any): ProjectData | null {
  if (!doc || !doc.title) return null;
  const accentColors = ['#C6FF00', '#FF007F', '#00FFFF', '#FFFFFF'];
  const imageUrl = imageUrlOf(doc.mainImage, 1200);
  const galleryRaw = Array.isArray(doc.galleryImages) ? doc.galleryImages : [];
  const galleryImages = galleryRaw.map((img: any, i: number) =>
    imageUrlOf(img, 1200) || imageUrl
  );
  const tags: string[] = Array.isArray(doc.tags) ? doc.tags : [];
  const category = tags[0] || 'WEBFLOW';
  return {
    id: doc._id || `sanity-${doc.title}`,
    slug: doc.slug?.current || doc._id || `sanity-${doc.title}`,
    number: doc.number || '--',
    title: doc.title.toUpperCase(),
    subtitle: doc.subtitle || '',
    category: category.toUpperCase() as ProjectData['category'],
    badge1: category.toUpperCase(),
    badge2: doc.year || '',
    year: doc.year || '',
    client: doc.client || 'UNKNOWN CLIENT',
    accentColor:
      (doc.accentColor && accentColors.includes(doc.accentColor) ? doc.accentColor : '#C6FF00'),
    imageUrl: imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=60&w=1200&auto=format&fit=crop',
    galleryImages: galleryImages.length > 0 ? galleryImages : [imageUrl || ''],
    description: doc.description || doc.fullOverview || '',
    fullOverview: doc.fullOverview || doc.description || '',
    challenge: doc.challenge || '',
    solution: doc.solution || '',
    techSpecs: {
      framework: doc.techFramework || 'Custom React Build',
      styling: doc.techStyling || 'Tailwind CSS',
      animations: doc.techAnimations || 'GSAP + Canvas',
      performanceScore: doc.performanceScore || '99/100',
      hosting: doc.hosting || 'Cloud Run',
    },
    metrics: Array.isArray(doc.metrics) ? doc.metrics.map((m: any) => ({ label: m.label, value: m.value })) : [],
    liveUrl: doc.liveUrl || undefined,
  };
}

// GROQ Queries with fallback safety
export async function fetchSanityProjects(): Promise<ProjectData[] | null> {
  try {
    if (!sanityEnabled) return null;
    const data = await sanityClient.fetch(
      `*[_type == "project"] | order(orderAsc asc) {
        _id, title, subtitle, description, year, mainImage, galleryImages, tags,
        liveUrl, orderAsc, fullOverview, challenge, solution, number, client, accentColor,
        techFramework, techStyling, techAnimations, performanceScore, hosting,
        metrics[]{ label, value }
      }`
    );
    if (!data || data.length === 0) return null;
    const mapped = data.map(mapProjectToLocal).filter(Boolean) as ProjectData[];
    return mapped.length > 0 ? mapped : null;
  } catch (err) {
    console.warn('[Sanity CMS] Using fallback project data:', err);
    return null;
  }
}

export async function fetchSanityFaqs() {
  try {
    if (!sanityEnabled) return null;
    const data = await sanityClient.fetch(`*[_type == "faq"] | order(rowOrder asc)`);
    return data && data.length > 0 ? data : null;
  } catch (err) {
    console.warn('[Sanity CMS] Using fallback FAQ data:', err);
    return null;
  }
}

export async function fetchSanityTestimonials() {
  try {
    if (!sanityEnabled) return null;
    const data = await sanityClient.fetch(`*[_type == "testimonial"]`);
    return data && data.length > 0 ? data : null;
  } catch (err) {
    console.warn('[Sanity CMS] Using fallback Testimonials data:', err);
    return null;
  }
}
