import Image from 'next/image';
import { CalendarClock, Layers, Leaf, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { site } from '@/lib/site';

/**
 * Every point below restates something the business already publishes about
 * itself. Nothing is escalated into a number, an award or a warranty.
 */
const REASONS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Layers,
    title: 'One crew, the whole exterior',
    body: 'Roof, siding, glass, gutters, driveway and solar - booked together instead of scheduled around four contractors.',
  },
  {
    icon: MapPin,
    title: 'Genuinely local',
    body: 'Based in Fontana and working across the Inland Empire, so scheduling does not depend on someone driving in from out of the area.',
  },
  {
    icon: Sparkles,
    title: 'Attention to the details',
    body: 'Edges, corners, tracks and transitions - the parts people notice afterwards are the parts we take time on.',
  },
  {
    icon: Leaf,
    title: 'Eco-friendly products',
    body: 'Biodegradable cleaning solutions chosen to be effective on grime and safe around family, pets and planting.',
  },
  {
    icon: ShieldCheck,
    title: 'Trained and insured',
    body: 'Professional-grade equipment handled by technicians trained for the surface they are working on.',
  },
  {
    icon: CalendarClock,
    title: 'Straightforward to book',
    body: 'Free, no-obligation quotes and flexible scheduling that works around how you actually use the property.',
  },
];

const FACTS: { label: string; value: React.ReactNode }[] = [
  { label: 'Based in', value: `${site.address.city}, ${site.address.region}` },
  { label: 'Serving', value: 'The Inland Empire' },
  { label: 'Hours', value: site.hours.short },
  {
    label: 'License',
    /* The filing number is a single unbreakable token wider than a cell of
       this card at 320px. <wbr> gives it one break opportunity after the
       prefix so it wraps cleanly instead of running into the next column. */
    value: (
      <>
        {site.license.slice(0, 3)}
        <wbr />
        {site.license.slice(3)}
      </>
    ),
  },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-bone py-14 sm:py-20 lg:py-32">
      <Container>
        {/*
          Two rows rather than two tall columns. A 5/7 split with all six
          reasons stacked on the right leaves the image column hundreds of
          pixels short, which reads as a hole rather than as whitespace.
        */}
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div
              data-reveal=""
              className="relative aspect-4/3 overflow-hidden rounded-2xl bg-ink-100 shadow-lift sm:aspect-3/4 sm:rounded-3xl lg:aspect-4/5"
            >
              <Image
                src="/images/about.webp"
                alt="Technician soft washing the exterior of a home"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="About HD Pressure Washing"
              title="A local crew that treats every property like the neighbors are watching"
            />

            <div
              data-reveal=""
              style={{ '--reveal-delay': '140ms' } as React.CSSProperties}
              className="mt-5 max-w-xl space-y-4 text-base leading-relaxed text-ink-600 sm:mt-6 sm:text-[1.0625rem]"
            >
              <p>
                HD Pressure Washing is an exterior cleaning company based in Fontana, California.
                We work on homes, storefronts and commercial properties across the Inland Empire -
                driveways and walkways, siding and stucco, roofs, gutters, glass and solar panels.
              </p>
              <p>
                The approach is simple: show up when we said we would, use the right method for
                the surface, and leave the property looking like someone cared about it. Every job
                gets the same attention, whether it is a single driveway or a full building
                exterior.
              </p>
            </div>

            {/* Verifiable business facts, kept next to the claim they support. */}
            <dl
              data-reveal=""
              style={{ '--reveal-delay': '200ms' } as React.CSSProperties}
              className="mt-7 grid grid-cols-2 gap-x-5 gap-y-4 rounded-2xl border border-ink-900/8 bg-white p-5 sm:mt-8 sm:gap-x-6 sm:gap-y-5 sm:p-6 xl:grid-cols-4"
            >
              {FACTS.map((fact) => (
                <div key={fact.label} className="min-w-0">
                  <dt className="text-[0.6875rem] font-semibold tracking-[0.12em] text-ink-400 uppercase">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-[0.8125rem] leading-snug font-semibold break-words text-ink-900 sm:text-sm">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Why choose HD - full width so the six points breathe evenly. */}
        <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-7 border-t border-ink-900/10 pt-10 sm:mt-14 sm:grid-cols-2 sm:gap-y-9 sm:pt-14 lg:mt-20 lg:grid-cols-3 lg:pt-16">
          {REASONS.map(({ icon: Icon, title, body }, i) => (
            <li
              key={title}
              data-reveal=""
              style={{ '--reveal-delay': `${(i % 3) * 80}ms` } as React.CSSProperties}
              /* Icon beside the text on phones, above it from sm up. Stacking
                 the icon adds ~60px of dead height per item, and six of those
                 is most of a screen. */
              className="flex gap-3.5 sm:block"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-500/12 ring-inset sm:mb-4 sm:size-11">
                <Icon className="size-[1.125rem] sm:size-5" strokeWidth={1.9} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-[1.0625rem] leading-snug font-semibold text-ink-900">
                  {title}
                </h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-500 sm:mt-2">
                  {body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
