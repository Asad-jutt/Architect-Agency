import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Sanity Client setup (Astro & React compatible)
const metaEnv = (import.meta as any).env || {};
export const sanityClient = createClient({
  projectId: metaEnv.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || 'demo_architect',
  dataset: metaEnv.VITE_SANITY_DATASET || process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

// GROQ Queries with fallback safety
export async function fetchSanityProjects() {
  try {
    const data = await sanityClient.fetch(`*[_type == "project"] | order(orderAsc asc)`);
    return data && data.length > 0 ? data : null;
  } catch (err) {
    console.warn('[Sanity CMS] Using fallback project data:', err);
    return null;
  }
}

export async function fetchSanityFaqs() {
  try {
    const data = await sanityClient.fetch(`*[_type == "faq"]`);
    return data && data.length > 0 ? data : null;
  } catch (err) {
    console.warn('[Sanity CMS] Using fallback FAQ data:', err);
    return null;
  }
}

export async function fetchSanityTestimonials() {
  try {
    const data = await sanityClient.fetch(`*[_type == "testimonial"]`);
    return data && data.length > 0 ? data : null;
  } catch (err) {
    console.warn('[Sanity CMS] Using fallback Testimonials data:', err);
    return null;
  }
}
