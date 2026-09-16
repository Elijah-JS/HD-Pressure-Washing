import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { site } from '@/lib/site';

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-navy-950">
      {/*
        Art direction rather than one crop for every screen: a 16:9 frame is
        mostly sky and gate once it is squeezed into a phone-shaped hero, so
        portrait screens get a portrait crop. <picture> means the browser
        downloads exactly one of them.
      */}
      <picture>
        <source media="(max-width: 639px)" srcSet="/images/hero-portrait.webp" />
        <img
          src="/images/hero.webp"
          alt="Pressure washing a residential entry walkway and driveway in the Inland Empire"
          fetchPriority="high"
          decoding="async"
          width={1920}
          height={1079}
          className="hero-drift absolute inset-0 -z-10 size-full object-cover object-[58%_center] sm:object-center"
        />
      </picture>

      {/* Scrims: one vertical for the header, one horizontal for the copy.
          The horizontal layer only exists from sm up, where the copy sits in
          the left half - stacking both on a phone crushes the photo to black. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-950/88 via-navy-950/40 to-navy-950/95 sm:from-navy-950/85 sm:via-navy-950/30 sm:to-navy-950/92"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-navy-950/92 via-navy-950/55 to-transparent sm:block lg:via-navy-950/40"
      />

      <Container className="relative">
        {/* Shorter on phones: the point of the hero is to get the headline,
            the CTA and the phone number on screen at once, not to fill the
            viewport. */}
        <div className="flex min-h-[32rem] flex-col justify-end pt-28 pb-11 sm:min-h-[40rem] sm:pt-36 sm:pb-14 lg:min-h-[46rem] lg:pb-20">
          <div className="max-w-2xl">
            <p
              data-reveal=""
              className="eyebrow inline-flex items-center gap-2 rounded-full border border-white/15 bg-navy-950/55 px-3 py-1.5 text-[0.6875rem] text-white/90 sm:px-3.5 sm:text-xs"
            >
              <MapPin className="size-3.5 text-brand-300" strokeWidth={2.5} aria-hidden="true" />
              Fontana, CA &middot; Serving the Inland Empire
            </p>

            <h1
              data-reveal=""
              style={{ '--reveal-delay': '80ms' } as React.CSSProperties}
              className="mt-5 text-[clamp(1.9375rem,1.05rem+4.3vw,4rem)] leading-[1.06] font-bold text-white sm:mt-6 sm:leading-[1.03]"
            >
              Professional exterior cleaning across the{' '}
              <span className="text-brand-300">Inland Empire</span>
            </h1>

            <p
              data-reveal=""
              style={{ '--reveal-delay': '160ms' } as React.CSSProperties}
              className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:mt-6 sm:text-lg"
            >
              Pressure washing, house washing, roof and solar panel cleaning for homes and
              businesses throughout Fontana, Rancho Cucamonga, Redlands and surrounding
              communities.
            </p>

            <div
              data-reveal=""
              style={{ '--reveal-delay': '240ms' } as React.CSSProperties}
              className="mt-7 flex flex-col gap-2.5 sm:mt-9 sm:flex-row sm:items-center sm:gap-3"
            >
              <Button href="#quote" size="lg" className="w-full sm:w-auto">
                Get a Free Quote
                <ArrowRight
                  className="size-4 transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover/btn:translate-x-1"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </Button>
              <Button href="#results" variant="onDark" size="lg" className="w-full sm:w-auto">
                View Our Work
              </Button>
            </div>

            {/* Click-to-call, kept distinct from the two buttons so the CTA
                hierarchy stays unambiguous. */}
            <div
              data-reveal=""
              style={{ '--reveal-delay': '300ms' } as React.CSSProperties}
              className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm sm:mt-8 sm:gap-x-4"
            >
              <span className="text-white/55">Prefer to talk it through?</span>
              <a
                href={`tel:${site.phone.raw}`}
                className="group -my-2 inline-flex items-center gap-2 py-2 font-semibold text-white transition-colors hover:text-brand-300"
              >
                <Phone className="size-4 text-brand-300" strokeWidth={2.5} aria-hidden="true" />
                <span className="tnum border-b border-white/25 pb-px transition-colors group-hover:border-brand-300">
                  {site.phone.display}
                </span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
