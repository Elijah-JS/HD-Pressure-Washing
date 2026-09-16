'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { site } from '@/lib/site';
import { cn } from '@/lib/cn';

/**
 * Persistent call / quote bar for small screens.
 *
 * Appears once the hero is behind you and hides again over the quote section,
 * where the same two actions are already on screen at full size.
 */
export function MobileCTABar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const quote = document.getElementById('quote');
    const footer = document.querySelector('footer');

    let pastHero = false;
    let overTarget = false;
    const sync = () => setVisible(pastHero && !overTarget);

    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.6;
      sync();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        // Any of the "already has CTAs" regions being on screen hides the bar.
        overTarget = entries.some((e) => e.isIntersecting);
        sync();
      },
      { threshold: 0 },
    );
    if (quote) observer.observe(quote);
    if (footer) observer.observe(footer);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-ink-900/10 bg-bone/95 backdrop-blur-md transition-transform duration-[350ms] ease-[var(--ease-out-soft)] sm:hidden',
        visible ? 'translate-y-0' : 'translate-y-full',
      )}
      aria-hidden={!visible}
    >
      <div className="flex gap-2.5 px-4 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
        <a
          href={`tel:${site.phone.raw}`}
          tabIndex={visible ? undefined : -1}
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-ink-900/15 bg-white text-[0.9375rem] font-semibold text-ink-900 active:bg-ink-50"
        >
          <Phone className="size-4 text-brand-600" strokeWidth={2.25} aria-hidden="true" />
          Call
        </a>
        <a
          href="#quote"
          tabIndex={visible ? undefined : -1}
          className="inline-flex h-12 flex-[1.45] items-center justify-center gap-2 rounded-full bg-brand-600 text-[0.9375rem] font-semibold text-white active:bg-brand-700"
        >
          Get a Free Quote
          <ArrowRight className="size-4" strokeWidth={2.5} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
