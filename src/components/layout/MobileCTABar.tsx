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
    // Must be the page footer specifically: review cards render their own
    // <footer>, and a bare 'footer' selector matches one of those first, so
    // the real footer was never observed and the bar sat on top of it.
    const footer = document.querySelector('body > footer');

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
      { threshold: 0, rootMargin: '0px 0px 35% 0px' },
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
        'fixed inset-x-0 bottom-0 z-40 border-t border-ink-900/8 bg-bone/92 backdrop-blur-md transition-transform duration-[350ms] ease-[var(--ease-out-soft)] sm:hidden',
        visible ? 'translate-y-0' : 'translate-y-full',
      )}
      aria-hidden={!visible}
    >
      {/*
        Both actions share the row on a 40/60 split: `flex-[n_1_0%]` zeroes the
        basis, so the ratio is taken from the space left after padding and the
        gap rather than drifting with the label widths. Matching heights and a
        zero flex-basis on both also keeps them optically aligned at every
        width. Colour, not size, is what marks the quote button as primary.
      */}
      <div className="flex items-stretch gap-2.5 px-4 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
        <a
          href={`tel:${site.phone.raw}`}
          tabIndex={visible ? undefined : -1}
          className="inline-flex h-11 flex-[2_1_0%] items-center justify-center gap-2 rounded-full border border-ink-900/15 bg-white text-[0.875rem] font-semibold text-ink-900 active:bg-ink-50"
          aria-label={`Call ${site.phone.display}`}
        >
          <Phone className="size-4 shrink-0 text-brand-600" strokeWidth={2.25} aria-hidden="true" />
          Call
        </a>
        <a
          href="#quote"
          tabIndex={visible ? undefined : -1}
          className="inline-flex h-11 flex-[3_1_0%] items-center justify-center gap-1.5 rounded-full bg-brand-600 text-[0.875rem] font-semibold whitespace-nowrap text-white active:bg-brand-700"
        >
          Get a Free Quote
          <ArrowRight className="size-3.5 shrink-0" strokeWidth={2.5} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
