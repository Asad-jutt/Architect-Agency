import { useState, useEffect } from 'react';
import { PROJECTS_LIST, ProjectData } from '../data/projectsData';

const SANITY_ENABLED =
  typeof import.meta !== 'undefined' &&
  (Boolean((import.meta as any).env?.PUBLIC_SANITY_PROJECT_ID) ||
    Boolean((import.meta as any).env?.VITE_SANITY_PROJECT_ID));

export function useProjects() {
  const [projects, setProjects] = useState<ProjectData[]>(PROJECTS_LIST);
  const [loading, setLoading] = useState(SANITY_ENABLED);

  useEffect(() => {
    let cancelled = false;
    if (!SANITY_ENABLED) {
      setLoading(false);
      return;
    }
    import('../lib/sanity')
      .then(({ fetchSanityProjects }) => fetchSanityProjects())
      .then((remote) => {
        if (cancelled) return;
        if (remote && remote.length > 0) setProjects(remote);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { projects, loading };
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(SANITY_ENABLED);

  useEffect(() => {
    let cancelled = false;
    if (!SANITY_ENABLED) {
      setLoading(false);
      return;
    }
    import('../lib/sanity')
      .then(({ fetchSanityTestimonials }) => fetchSanityTestimonials())
      .then((remote) => {
        if (cancelled) return;
        if (remote && remote.length > 0) setTestimonials(remote);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { testimonials, loading };
}

export function useFaqs() {
  const [faqs, setFaqs] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(SANITY_ENABLED);

  useEffect(() => {
    let cancelled = false;
    if (!SANITY_ENABLED) {
      setLoading(false);
      return;
    }
    import('../lib/sanity')
      .then(({ fetchSanityFaqs }) => fetchSanityFaqs())
      .then((remote) => {
        if (cancelled) return;
        if (remote && remote.length > 0) setFaqs(remote);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { faqs, loading };
}
