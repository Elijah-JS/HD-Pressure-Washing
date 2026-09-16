'use client';

import { useCallback, useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { NAV_LINKS, site } from '@/lib/site';
import { cn } from '@/lib/cn';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('#top');

  /* Condense the header once the user leaves the hero. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Highlight the nav item for whichever section is currently in view. */
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.6] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* Lock body scroll and support Esc while the mobile sheet is open. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  /* Transparent bar sitting on the dark hero photo needs inverted controls. */
  const onDark = !scrolled;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-ink-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-[var(--ease-out-soft)]',
          scrolled
            ? 'border-b border-ink-900/10 bg-bone/95 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <Container>
          <div
            className={cn(
              'flex items-center justify-between transition-all duration-300 ease-[var(--ease-out-soft)]',
              scrolled ? 'h-14' : 'h-14 sm:h-20',
            )}
          >
            <a
              href="#top"
              aria-label={`${site.name} - back to top`}
              className="shrink-0 transition-opacity duration-200 hover:opacity-80"
            >
              <Logo priority className={cn(scrolled ? 'h-8' : 'h-9', 'w-auto sm:h-11')} />
            </a>

            {/* Tablet: a few destinations, no quote button. The hero still
                owns conversion so the bar can stay quiet. */}
            <nav aria-label="Primary" className="hidden md:block xl:hidden">
              <ul className="flex items-center gap-0.5">
                {NAV_LINKS.filter((link) => link.href !== '#top' && link.href !== '#quote').map(
                  (link) => {
                    const isActive = active === link.href;
                    const label = link.href === '#service-areas' ? 'Areas' : link.label;
                    return (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          aria-current={isActive ? 'true' : undefined}
                          className={cn(
                            'relative rounded-full px-2.5 py-2 text-[0.8125rem] font-medium transition-colors duration-200 lg:px-3 lg:text-[0.875rem]',
                            onDark
                              ? isActive
                                ? 'text-white'
                                : 'text-white/70 hover:text-white'
                              : isActive
                                ? 'text-ink-900'
                                : 'text-ink-600 hover:text-ink-900',
                          )}
                        >
                          {label}
                        </a>
                      </li>
                    );
                  },
                )}
              </ul>
            </nav>

            {/* Desktop navigation */}
            <nav aria-label="Primary" className="hidden xl:block">
              <ul className="flex items-center gap-1">
                {NAV_LINKS.map((link) => {
                  const isActive = active === link.href;
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        aria-current={isActive ? 'true' : undefined}
                        className={cn(
                          'relative rounded-full px-3.5 py-2 text-[0.9375rem] font-medium transition-colors duration-200',
                          // Over the dark hero the bar is transparent, so the
                          // nav has to invert or it disappears into the photo.
                          onDark
                            ? isActive
                              ? 'text-white'
                              : 'text-white/70 hover:text-white'
                            : isActive
                              ? 'text-ink-900'
                              : 'text-ink-600 hover:text-ink-900',
                        )}
                      >
                        {link.label}
                        <span
                          aria-hidden="true"
                          className={cn(
                            'absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left rounded-full bg-brand-500 transition-transform duration-300 ease-[var(--ease-out-soft)]',
                            isActive ? 'scale-x-100' : 'scale-x-0',
                          )}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-1 sm:gap-3">
              <a
                href={`tel:${site.phone.raw}`}
                className={cn(
                  'hidden min-h-11 items-center gap-2 rounded-full px-3 py-2 text-[0.9375rem] font-semibold transition-colors md:inline-flex',
                  onDark
                    ? 'text-white hover:bg-white/10'
                    : 'text-ink-900 hover:bg-ink-900/5',
                )}
              >
                <Phone
                  className={cn('size-4', onDark ? 'text-brand-300' : 'text-brand-600')}
                  strokeWidth={2.25}
                  aria-hidden="true"
                />
                <span className="tnum">{site.phone.display}</span>
              </a>

              {/* Desktop only. On smaller screens the hero owns the quote CTA
                  so the header can stay logo + menu - repeating the same
                  bright button in both places reads as pressure. */}
              <div className="hidden xl:block">
                <Button href="#quote" size="compact">
                  Get a Free Quote
                </Button>
              </div>

              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                aria-controls="mobile-menu"
                className={cn(
                  'inline-flex size-11 items-center justify-center rounded-full transition-colors md:hidden',
                  onDark ? 'text-white hover:bg-white/10' : 'text-ink-900 hover:bg-ink-900/5',
                )}
              >
                <Menu className="size-6" strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile sheet */}
      <div
        className={cn(
          'fixed inset-0 z-[60] md:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        aria-hidden={!open}
      >
        <div
          onClick={close}
          className={cn(
            'absolute inset-0 bg-ink-900/55 transition-opacity duration-300',
            open ? 'opacity-100' : 'opacity-0',
          )}
        />

        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className={cn(
            'absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-bone shadow-deep transition-transform duration-[350ms] ease-[var(--ease-out-soft)]',
            open ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <div className="flex h-20 items-center justify-between border-b border-ink-900/8 px-6">
            <Logo className="h-10 w-auto" />
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="inline-flex size-11 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-ink-900/5"
            >
              <X className="size-6" strokeWidth={2} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-4">
            <ul className="space-y-1">
              {NAV_LINKS.map((link, i) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={close}
                    style={{ transitionDelay: open ? `${80 + i * 45}ms` : '0ms' }}
                    className={cn(
                      'block border-b border-ink-900/6 py-4 font-display text-2xl font-semibold text-ink-900 transition-all duration-[400ms] ease-[var(--ease-out-soft)]',
                      open ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0',
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3 border-t border-ink-900/8 px-6 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <Button href="#quote" size="lg" onClick={close} className="w-full">
              Get a Free Quote
            </Button>
            <Button href={`tel:${site.phone.raw}`} variant="outline" size="lg" className="w-full">
              <Phone className="size-4 text-brand-600" strokeWidth={2.25} aria-hidden="true" />
              <span className="tnum">{site.phone.display}</span>
            </Button>
            <p className="pt-1 text-center text-sm text-ink-500">{site.hours.short}</p>
          </div>
        </div>
      </div>
    </>
  );
}
