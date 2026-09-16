import { Plus } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { site } from '@/lib/site';

/**
 * Answers adapted from the FAQ the client already publishes on their location
 * pages. Nothing here promises anything they do not already promise.
 * Kept in sync with the FAQPage structured data in lib/schema.ts.
 */
export const FAQS = [
  {
    q: 'How often should I have my property cleaned?',
    a: 'It depends on how exposed the property is to dirt, dust and shade. As a general rule we suggest a full exterior clean at least once a year, and more often for surfaces under trees or facing heavy traffic.',
  },
  {
    q: 'Is pressure washing safe for my home?',
    a: 'Yes, when the method matches the surface. Concrete and hardscape take high pressure well. Siding, stucco, roofing and painted surfaces get a low-pressure soft wash instead, which cleans without driving water where it should not go.',
  },
  {
    q: 'Do you offer free quotes?',
    a: 'Yes. Every quote is free and carries no obligation. We confirm the scope and the price before any work begins.',
  },
  {
    q: 'What areas do you serve?',
    a: 'We are based in Fontana and work throughout the Inland Empire, including Rancho Cucamonga, Redlands and the surrounding communities. If you are nearby but not listed, call and ask.',
  },
  {
    q: 'Do you work with businesses as well as homes?',
    a: 'We do. Storefronts, facades, walkways, parking areas and shared spaces, scheduled around your operating hours so the work does not interrupt business.',
  },
  {
    q: 'What products do you use?',
    a: 'Eco-friendly, biodegradable cleaning solutions selected to be effective on grime while staying safe around family, pets and landscaping.',
  },
];

export function Faq() {
  return (
    <section aria-labelledby="faq-heading" className="bg-bone py-14 sm:py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <SectionHeading
              eyebrow="Common Questions"
              title="Good to know before you book"
              as="h2"
            />
            <p
              data-reveal=""
              style={{ '--reveal-delay': '120ms' } as React.CSSProperties}
              className="mt-5 text-[0.9375rem] leading-relaxed text-ink-500"
            >
              Still unsure about something? Call{' '}
              <a
                href={`tel:${site.phone.raw}`}
                className="tnum py-2 font-semibold whitespace-nowrap text-ink-900 underline decoration-brand-500/40 underline-offset-4 transition-colors hover:text-brand-600"
              >
                {site.phone.display}
              </a>{' '}
              and ask &mdash; {site.hours.short}.
            </p>
            <span id="faq-heading" className="sr-only">
              Frequently asked questions
            </span>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-ink-900/10">
              {FAQS.map((item, i) => (
                /* Native disclosure: keyboard accessible with no JS at all. */
                <details
                  key={item.q}
                  data-reveal=""
                  style={{ '--reveal-delay': `${Math.min(i, 3) * 60}ms` } as React.CSSProperties}
                  className="group border-b border-ink-900/10"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                    <h3 className="font-display text-[1.0625rem] leading-snug font-semibold text-ink-900 transition-colors group-hover:text-brand-700">
                      {item.q}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="flex size-8 shrink-0 items-center justify-center rounded-full border border-ink-900/10 bg-white text-ink-500 transition-all duration-300 ease-[var(--ease-out-soft)] group-hover:border-ink-900/20 group-open:rotate-45 group-open:border-brand-500 group-open:bg-brand-500 group-open:text-white"
                    >
                      <Plus className="size-4" strokeWidth={2.25} />
                    </span>
                  </summary>
                  <p className="max-w-2xl pr-12 pb-6 text-[0.9375rem] leading-relaxed text-ink-600">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
