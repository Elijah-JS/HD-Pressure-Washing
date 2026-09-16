'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { site } from '@/lib/site';
import { cn } from '@/lib/cn';

/**
 * Persistent quote bar for small screens.
 *
 * One dominant conversion control at a time: hidden while the hero CTA is
 * still on screen, visible after the hero scrolls away, and hidden again
 * as the quote form approaches so the form itself is the conversion.
 */
export function MobileCTABar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('top');
    const quote = document.getElementById('quote');
    const footer = document.querySelector('footer');

    let pastHero = false;
    let overTarget = false;
    const sync = () => setVisible(pastHero && !overTarget);

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        pastHero = !entry || entry.intersectionRatio < 0.18;
        sync();
      },
      { threshold: [0, 0.12, 0.18, 0.4, 0.7] },
    );

    const targetObserver = new IntersectionObserver(
      (entries) => {
        overTarget = entries.some((e) => e.isIntersecting);
        sync();
      },
      // Fire a little early so the bar yields before the form is covered.
      { threshold: 0, rootMargin: '0px 0px 25% 0px' },
    );

    if (hero) heroObserver.observe(hero);
    if (quote) targetObserver.observe(quote);
    if (footer) targetObserver.observe(footer);

    return () => {
      heroObserver.disconnect();
      targetObserver.disconnect();
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
      <div className="flex gap-2 px-4 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
        <a
          href={`tel:${site.phone.raw}`}
          tabIndex={visible ? undefined : -1}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full px-4 text-[0.875rem] font-semibold text-ink-800 active:bg-ink-900/5"
        >
          <Phone className="size-4 text-brand-600" strokeWidth={2.25} aria-hidden="true" />
          Call
        </a>
        <a
          href="#quote"
          tabIndex={visible ? undefined : -1}
          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-brand-600 text-[0.9375rem] font-semibold text-white active:bg-brand-700"
        >
          Get a Free Quote
          <ArrowRight className="size-4" strokeWidth={2.5} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
