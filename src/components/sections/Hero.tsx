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
        {/* Full-viewport on phones so the first screen is one composed frame
            rather than a short hero with the next section already crowding in. */}
        <div className="flex min-h-svh flex-col justify-end pt-24 pb-16 sm:min-h-[40rem] sm:pt-36 sm:pb-14 lg:min-h-[46rem] lg:pb-20">
          <div className="max-w-2xl">
            <h1
              data-reveal=""
              className="text-[clamp(1.875rem,1.05rem+4.1vw,4rem)] leading-[1.06] font-bold text-white sm:leading-[1.03]"
            >
              Professional exterior cleaning across the{' '}
              <span className="text-brand-300">Inland Empire</span>
            </h1>

            <p
              data-reveal=""
              style={{ '--reveal-delay': '70ms' } as React.CSSProperties}
              className="mt-3.5 inline-flex items-center gap-1.5 text-[0.6875rem] font-medium tracking-wide text-brand-300 sm:mt-5 sm:text-[0.75rem]"
            >
              <MapPin className="size-3 opacity-90 sm:size-3.5" strokeWidth={2.5} aria-hidden="true" />
              <span className="sm:hidden">Fontana, CA &middot; Inland Empire</span>
              <span className="hidden sm:inline">Fontana, CA &middot; Serving the Inland Empire</span>
            </p>

            <p
              data-reveal=""
              style={{ '--reveal-delay': '140ms' } as React.CSSProperties}
              className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-white/75 sm:mt-6 sm:text-lg"
            >
              Pressure washing, house washing, roof and solar panel cleaning for homes and
              businesses throughout Fontana, Rancho Cucamonga, Redlands and surrounding
              communities.
            </p>

            <div
              data-reveal=""
              style={{ '--reveal-delay': '220ms' } as React.CSSProperties}
              className="mt-6 flex flex-col items-start gap-3.5 sm:mt-9 sm:flex-row sm:items-center sm:gap-3"
            >
              <Button href="#quote" size="lg">
                Get a Free Quote
                <ArrowRight
                  className="size-4 transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover/btn:translate-x-1"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </Button>
              {/* Text treatment on phones so it cannot compete with the primary
                  button. From sm up it becomes a secondary button in the row. */}
              <a
                href="#results"
                className="inline-flex items-center gap-1.5 py-1 text-[0.9375rem] font-semibold text-white/80 transition-colors hover:text-white sm:hidden"
              >
                View Our Work
                <ArrowRight className="size-3.5" strokeWidth={2.25} aria-hidden="true" />
              </a>
              <div className="hidden sm:block">
                <Button href="#results" variant="onDark" size="lg">
                  View Our Work
                </Button>
              </div>
            </div>

            <a
              data-reveal=""
              style={{ '--reveal-delay': '280ms' } as React.CSSProperties}
              href={`tel:${site.phone.raw}`}
              className="mt-5 inline-flex items-center gap-2 text-[0.8125rem] text-white/55 transition-colors hover:text-white/80 sm:mt-7 sm:text-sm"
            >
              <Phone className="size-3.5" strokeWidth={2} aria-hidden="true" />
              <span className="hidden sm:inline">Prefer to talk it through?</span>
              <span className="tnum font-medium text-white/90">{site.phone.display}</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
