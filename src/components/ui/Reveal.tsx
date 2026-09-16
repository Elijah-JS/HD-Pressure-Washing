'use client';

import { useEffect } from 'react';

/**
 * Single global IntersectionObserver that reveals anything tagged
 * `data-reveal` as it scrolls into view, then stops watching it.
 *
 * Progressive enhancement: CSS only hides `[data-reveal]` under `html.js`.
 * This provider is the only thing that adds that class, and it does so
 * after in-view nodes are already marked `shown`. If this module never
 * loads, `js` is never added and every section stays fully visible.
 */
export function RevealProvider() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const reveal = (node: HTMLElement) => node.setAttribute('data-reveal', 'shown');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach(reveal);
      return;
    }

    const viewport = () => {
      const height = window.innerHeight || document.documentElement.clientHeight;
      return { top: 0, bottom: height };
    };

    const inView = (node: HTMLElement) => {
      const rect = node.getBoundingClientRect();
      const { top, bottom } = viewport();
      return rect.bottom > top + 8 && rect.top < bottom - 8;
    };

    nodes.filter(inView).forEach(reveal);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );

    nodes.forEach((node) => {
      if (node.getAttribute('data-reveal') !== 'shown') observer.observe(node);
    });

    document.documentElement.classList.add('js');

    return () => observer.disconnect();
  }, []);

  return null;
}
