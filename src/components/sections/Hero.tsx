import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { site } from '@/lib/site';

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-navy-950">
      {/*
        Phone: one frame. A full-frame wash (desktop-like, not a blackout)
        plus a shorter bottom scrim. Copy sits in the optical middle so the
        first screen reads logo → headline → CTA. Tablet/desktop overlays
        are unchanged.
      */}
      <div className="absolute inset-0">
        <picture>
          <source media="(max-width: 767px)" srcSet="/images/hero-portrait.webp" />
          <img
            src="/images/hero.webp"
            alt="Pressure washing a residential entry walkway and driveway in the Inland Empire"
            fetchPriority="high"
            decoding="async"
            width={1920}
            height={1079}
            className="hero-drift absolute inset-0 size-full object-cover object-[center_24%] md:object-[32%_center] lg:object-center"
          />
        </picture>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/40 to-navy-950/78 md:hidden"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[min(20rem,48%)] bg-gradient-to-t from-navy-950/75 via-navy-950/28 to-transparent md:hidden"
        />

        {/* Tablet: a left reading column, photo stays alive on the right. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-gradient-to-r from-navy-950 from-[12%] via-navy-950/78 via-[48%] to-transparent md:block lg:hidden"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 hidden h-32 bg-gradient-to-t from-navy-950/50 to-transparent md:block lg:hidden"
        />

        {/* Desktop: full-frame washes, copy sits in the left half. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-gradient-to-b from-navy-950/85 via-navy-950/30 to-navy-950/92 lg:block"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-gradient-to-r from-navy-950/92 via-navy-950/40 to-transparent lg:block"
        />
      </div>

      <Container className="relative">
        <div className="flex max-md:min-h-[min(max(36.75rem,78svh),42.5rem)] max-md:min-[375px]:min-h-[min(max(38.25rem,80svh),44rem)] flex-col justify-center pt-[4.75rem] pb-[max(2.75rem,env(safe-area-inset-bottom))] md:flex md:min-h-[min(44rem,72svh)] md:flex-row md:items-center md:justify-start md:pt-36 md:pb-16 lg:min-h-[46rem] lg:pb-20">
          <div className="max-w-[22.5rem] min-[390px]:max-w-[24rem] sm:max-w-md md:max-w-xl lg:max-w-2xl">
            <h1
              data-reveal=""
              className="font-display text-[1.75rem] leading-[1.14] font-bold text-white [text-shadow:0_2px_18px_rgba(3,15,28,0.35)] min-[375px]:text-[1.875rem] min-[390px]:text-[2rem] min-[430px]:text-[2.125rem] sm:text-[clamp(2.15rem,1.2rem+3.2vw,3.35rem)] sm:leading-[1.08] md:[text-shadow:none] lg:text-[clamp(2.15rem,1.2rem+3.4vw,4rem)] lg:leading-[1.03]"
            >
              <span className="md:hidden">
                Professional
                <br />
                exterior cleaning
                <br />
                across the
                <br />
                <span className="text-brand-300">Inland Empire</span>
              </span>
              <span className="hidden md:inline lg:hidden">
                Professional
                <br />
                exterior cleaning
                <br />
                across the <span className="text-brand-300">Inland Empire</span>
              </span>
              <span className="hidden lg:inline">
                Professional exterior cleaning across the{' '}
                <span className="text-brand-300">Inland Empire</span>
              </span>
            </h1>

            <p
              data-reveal=""
              style={{ '--reveal-delay': '70ms' } as React.CSSProperties}
              className="mt-2.5 inline-flex items-center gap-1.5 text-[0.6875rem] font-medium tracking-[0.04em] text-brand-300 sm:mt-5 sm:text-[0.75rem] sm:tracking-wide sm:text-brand-300/90"
            >
              <MapPin className="size-3 opacity-90 sm:size-3.5" strokeWidth={2.5} aria-hidden="true" />
              <span className="sm:hidden">Fontana, CA · Inland Empire</span>
              <span className="hidden sm:inline">Fontana, CA &middot; Serving the Inland Empire</span>
            </p>

            <p
              data-reveal=""
              style={{ '--reveal-delay': '140ms' } as React.CSSProperties}
              className="mt-2.5 max-w-[22rem] text-[0.9375rem] leading-[1.55] text-white/88 [text-shadow:0_1px_12px_rgba(3,15,28,0.3)] sm:mt-6 sm:max-w-md sm:text-[1.0625rem] sm:leading-relaxed sm:text-white/80 md:[text-shadow:none] lg:max-w-xl lg:text-lg"
            >
              <span className="md:hidden">
                Pressure washing, house washing, roof and solar cleaning for homes and businesses
                across the Inland Empire.
              </span>
              <span className="hidden md:inline">
                Pressure washing, house washing, roof and solar panel cleaning for homes and
                businesses throughout Fontana, Rancho Cucamonga, Redlands and surrounding
                communities.
              </span>
            </p>

            <div
              data-reveal=""
              style={{ '--reveal-delay': '220ms' } as React.CSSProperties}
              className="mt-4 flex flex-col items-start gap-1 sm:mt-8 sm:flex-row sm:items-center sm:gap-5 lg:mt-9 lg:gap-3"
            >
              <Button href="#quote" size="lg">
                Get a Free Quote
                <ArrowRight
                  className="size-4 transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover/btn:translate-x-1"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </Button>
              <a
                href="#results"
                className="inline-flex min-h-11 items-center gap-1.5 text-[0.875rem] font-medium text-white/62 transition-colors hover:text-white lg:hidden"
              >
                View Our Work
                <ArrowRight className="size-3.5 opacity-80" strokeWidth={2.25} aria-hidden="true" />
              </a>
              <div className="hidden lg:block">
                <Button href="#results" variant="onDark" size="lg">
                  View Our Work
                </Button>
              </div>
            </div>

            <a
              data-reveal=""
              style={{ '--reveal-delay': '280ms' } as React.CSSProperties}
              href={`tel:${site.phone.raw}`}
              className="mt-1.5 inline-flex min-h-11 items-center gap-2 text-[0.8125rem] text-white/62 transition-colors hover:text-white/80 sm:mt-6 sm:min-h-0 sm:text-sm sm:text-white/55 sm:hover:text-white/80"
            >
              <Phone className="size-3.5" strokeWidth={2} aria-hidden="true" />
              <span className="hidden sm:inline">Prefer to talk it through?</span>
              <span className="tnum font-medium text-white/70 sm:text-white/90">{site.phone.display}</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
