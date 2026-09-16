import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { SERVICES } from '@/lib/site';

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-white py-14 sm:py-20 lg:py-32">
      <Container>
        <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="What We Clean"
            title="One crew for the whole exterior"
            lede="Everything outside the walls, handled by the same team - so you are not chasing four different contractors to get a property looking right."
          />
          <div
            data-reveal=""
            style={{ '--reveal-delay': '160ms' } as React.CSSProperties}
            className="hidden shrink-0 lg:block"
          >
            <Button href="#quote" variant="outline">
              Request a Free Quote
              <ArrowUpRight
                className="size-4 transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                strokeWidth={2.25}
                aria-hidden="true"
              />
            </Button>
          </div>
        </div>

        {/*
          Two columns from the smallest screen. One column meant eight
          full-width 4:3 tiles - roughly 2,300px of scrolling for a list the
          visitor is only scanning. Square crops at this size keep the subject
          readable where a wide crop would not.
        */}
        <ul className="mt-9 grid grid-cols-2 gap-x-3 gap-y-5 sm:mt-16 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <li
              key={service.slug}
              data-reveal=""
              style={{ '--reveal-delay': `${(i % 4) * 70}ms` } as React.CSSProperties}
            >
              <a
                href="#quote"
                aria-label={`${service.title} - request a free quote`}
                className="group block focus-visible:outline-none"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl bg-ink-100 group-focus-visible:ring-2 group-focus-visible:ring-brand-500 group-focus-visible:ring-offset-2 sm:aspect-4/3 sm:rounded-2xl">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-[700ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.06]"
                  />

                  {/* Weighted to the lower third so the type stays legible over
                      bright photos (solar panels, wet concrete) without
                      flattening the whole image. */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to top, rgb(0 18 31 / 0.94) 0%, rgb(0 18 31 / 0.78) 24%, rgb(0 18 31 / 0.34) 54%, rgb(0 18 31 / 0.05) 80%)',
                    }}
                  />

                  {/* Hover affordance only - hidden on touch, where there is
                      no hover and the whole tile is already tappable. */}
                  <span
                    aria-hidden="true"
                    className="absolute top-3.5 right-3.5 hidden size-9 translate-y-1 items-center justify-center rounded-full bg-navy-950/60 text-white opacity-0 transition-all duration-300 ease-[var(--ease-out-soft)] group-hover:translate-y-0 group-hover:opacity-100 lg:flex"
                  >
                    <ArrowUpRight className="size-4" strokeWidth={2.25} />
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
                    <h3 className="font-display text-[0.9375rem] leading-tight font-semibold text-white sm:text-lg">
                      {service.title}
                    </h3>
                    {/* The one-liner is detail, not navigation: at two columns
                        on a phone it turns each tile into a wall of text. */}
                    <p className="mt-1.5 hidden text-[0.8125rem] leading-snug text-white/75 sm:block">
                      {service.short}
                    </p>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile / tablet equivalent of the header CTA. */}
        <div data-reveal="" className="mt-8 sm:mt-12 lg:hidden">
          <Button href="#quote" size="lg" className="w-full sm:w-auto">
            Request a Free Quote
          </Button>
        </div>
      </Container>
    </section>
  );
}
