'use client';

import { useEffect } from 'react';

/**
 * Single global IntersectionObserver that reveals anything tagged
 * `data-reveal` as it scrolls into view, then stops watching it.
 *
 * Why one observer instead of a wrapper component per element:
 *  - no extra DOM nodes, so grid/flex layouts are never disturbed
 *  - server components can opt in with a plain attribute
 *  - if JS fails, CSS leaves the content visible (see globals.css)
 */
export function RevealProvider() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal=""]'));

    if (reduceMotion) {
      nodes.forEach((n) => n.setAttribute('data-reveal', 'shown'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-reveal', 'shown');
          observer.unobserve(entry.target);
        }
      },
      // Fire slightly before the element is fully on screen so the motion has
      // finished by the time the user is actually looking at it.
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return null;
}
