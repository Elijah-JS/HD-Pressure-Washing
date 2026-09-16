import Image from 'next/image';
import { ArrowRight, Info } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { BeforeAfterSlider, type BeforeAfterPair } from '@/components/ui/BeforeAfterSlider';
import { cn } from '@/lib/cn';

/**
 * Photos are tagged by the service shown in them. They are deliberately NOT
 * captioned with client names, cities or dates - no such records were
 * available, and inventing them would be inventing a portfolio.
 */
const GALLERY: { src: string; alt: string; tag: string; span: string }[] = [
  {
    src: '/images/work/entry-walkway.webp',
    alt: 'High-pressure cleaning of a concrete entry walkway beside landscaped hedges',
    tag: 'Pressure Washing',
    span: 'col-span-2 row-span-2',
  },
  {
    src: '/images/work/solar-array.webp',
    alt: 'Rooftop solar panel array after cleaning',
    tag: 'Solar Panel Cleaning',
    span: 'col-span-1 row-span-2',
  },
  {
    src: '/images/work/commercial-facade.webp',
    alt: 'Technician washing the facade of a commercial building',
    tag: 'Commercial',
    span: 'col-span-1 row-span-2',
  },
  {
    src: '/images/work/gutter-clearing.webp',
    alt: 'Roof gutter being flushed clear of packed pine needles',
    tag: 'Gutter Cleaning',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/images/work/window-detail.webp',
    alt: 'Window glass being squeegeed to a streak-free finish',
    tag: 'Window Cleaning',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/images/work/tile-roof.webp',
    alt: 'Technician cleaning a red tile roof',
    tag: 'Roof Cleaning',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/images/work/wood-deck.webp',
    alt: 'Wooden deck boards being cleaned with a pressure washer',
    tag: 'Pressure Washing',
    span: 'col-span-1 row-span-1',
  },
];

/**
 * PLACEHOLDER: the client has no before/after pairs on file. The slider is
 * fully functional - supply `beforeSrc` here and it renders immediately.
 */
const FEATURED_PAIR: BeforeAfterPair = {
  afterSrc: '/images/work/driveway-concrete.webp',
  afterAlt: 'Cleaned concrete driveway surface',
  caption: 'Driveway & concrete restoration',
  location: 'Before / after comparison',
};

export function Results() {
  return (
    <section id="results" className="scroll-mt-24 bg-navy-950 py-14 sm:py-20 lg:py-32">
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="Our Work"
          title="The results speak before we do"
          lede="Exterior cleaning is judged with the eyes, not a brochure. Here is the kind of work we turn out across the Inland Empire."
        />

        {/* Featured before / after */}
        <div className="mt-9 grid grid-cols-1 gap-8 sm:mt-14 sm:gap-10 lg:grid-cols-12 lg:gap-14">
          <div
            data-reveal=""
            className="lg:col-span-7"
          >
            <BeforeAfterSlider pair={FEATURED_PAIR} />
            <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-ink-400">
              <Info className="mt-0.5 size-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
              Sample frame. Drag the handle to see how it works &mdash; HD&rsquo;s own before and
              after photos drop straight into this component.
            </p>
          </div>

          <div
            data-reveal=""
            style={{ '--reveal-delay': '120ms' } as React.CSSProperties}
            className="flex flex-col justify-center lg:col-span-5"
          >
            <h3 className="font-display text-2xl leading-tight font-semibold text-white sm:text-[1.75rem]">
              Surfaces get restored, not just rinsed
            </h3>
            <p className="mt-4 leading-relaxed text-ink-300">
              We match the method to the surface: high pressure where concrete can take it, a
              gentle soft wash where siding, stucco and roofing cannot. That is the difference
              between a surface that looks clean for a week and one that looks right for a season.
            </p>
            <ul className="mt-7 space-y-3.5">
              {[
                'Pressure and chemistry matched to each surface',
                'Biodegradable products, safe around plants and pets',
                'A clear scope and price agreed before any work starts',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-[0.9375rem] text-ink-200">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-400"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mosaic */}
        <ul className="mt-10 grid auto-rows-[7rem] grid-cols-2 gap-2.5 sm:mt-14 sm:auto-rows-[10rem] sm:gap-4 lg:mt-20 lg:auto-rows-[11.5rem] lg:grid-cols-4">
          {GALLERY.map((item, i) => (
            <li
              key={item.src + item.tag}
              data-reveal=""
              style={{ '--reveal-delay': `${Math.min(i, 4) * 60}ms` } as React.CSSProperties}
              className={cn('group relative overflow-hidden rounded-xl bg-navy-900', item.span)}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 30vw, 50vw"
                className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.07]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgb(0 18 31 / 0.88) 0%, rgb(0 18 31 / 0.55) 20%, rgb(0 18 31 / 0.08) 52%)',
                }}
              />
              <span className="absolute bottom-3 left-3 text-[0.6875rem] font-semibold tracking-[0.12em] text-white/85 uppercase sm:bottom-4 sm:left-4">
                {item.tag}
              </span>
            </li>
          ))}
        </ul>

        <div
          data-reveal=""
          className="mt-10 flex flex-col items-start gap-4 border-t border-white/10 pt-8 sm:mt-12 sm:pt-10 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-md text-[0.9375rem] leading-relaxed text-ink-300">
            Want to see what we can do with your property? Send a few photos with your quote
            request.
          </p>
          <Button href="#quote" size="lg" className="w-full shrink-0 sm:w-auto">
            Get a Free Quote
            <ArrowRight
              className="size-4 transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover/btn:translate-x-1"
              strokeWidth={2.5}
              aria-hidden="true"
            />
          </Button>
        </div>
      </Container>
    </section>
  );
}
