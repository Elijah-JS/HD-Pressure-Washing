import { ArrowRight, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { NEARBY_AREAS, PRIMARY_AREAS, site } from '@/lib/site';

export function ServiceAreas() {
  return (
    <section id="service-areas" className="scroll-mt-24 bg-bone py-14 sm:py-20 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-9 lg:grid-cols-12 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <SectionHeading
              eyebrow="Where We Work"
              title="Serving Fontana and the wider Inland Empire"
              lede="Professional pressure washing and exterior cleaning throughout Fontana, Rancho Cucamonga, Redlands and the surrounding Inland Empire communities."
            />

            <div
              data-reveal=""
              style={{ '--reveal-delay': '180ms' } as React.CSSProperties}
              className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center"
            >
              <Button href="#quote">Check Your Address</Button>
              <a
                href={`tel:${site.phone.raw}`}
                className="-my-1 inline-flex items-center gap-2 px-1 py-3 text-[0.9375rem] font-semibold text-ink-700 transition-colors hover:text-brand-600"
              >
                <span className="tnum">{site.phone.display}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            {/* Primary cities: typographic rows on hairlines, not three boxes. */}
            <ul className="border-t border-ink-900/10">
              {PRIMARY_AREAS.map((area, i) => (
                <li
                  key={area.slug}
                  data-reveal=""
                  style={{ '--reveal-delay': `${i * 80}ms` } as React.CSSProperties}
                  className="group border-b border-ink-900/10"
                >
                  <a
                    href="#quote"
                    aria-label={`Request a free quote for ${area.city}`}
                    className="flex items-center gap-4 py-5 sm:gap-8 sm:py-7"
                  >
                    <span
                      aria-hidden="true"
                      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-brand-600 shadow-subtle ring-1 ring-ink-900/6 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white"
                    >
                      <MapPin className="size-[1.0625rem]" strokeWidth={2} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-xl leading-tight font-semibold text-ink-900 sm:text-2xl">
                        {area.city}
                        <span className="text-ink-400">, CA</span>
                      </span>
                      <span className="mt-1.5 block text-[0.9375rem] leading-snug text-ink-500">
                        {area.blurb}
                      </span>
                    </span>

                    <ArrowRight
                      className="size-5 shrink-0 text-ink-300 transition-all duration-300 ease-[var(--ease-out-soft)] group-hover:translate-x-1 group-hover:text-brand-600"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div data-reveal="" className="mt-8">
              <h3 className="text-[0.6875rem] font-semibold tracking-[0.12em] text-ink-400 uppercase">
                Also covering
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {NEARBY_AREAS.map((city) => (
                  <li
                    key={city}
                    className="rounded-full border border-ink-900/10 bg-white px-3.5 py-1.5 text-[0.8125rem] font-medium text-ink-600"
                  >
                    {city}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-ink-500">
                Not listed? Give us a call &mdash; if you are in the Inland Empire, there is a good
                chance we cover you.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
