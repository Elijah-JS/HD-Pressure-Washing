import { Facebook, Instagram, Quote } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { site } from '@/lib/site';
import { cn } from '@/lib/cn';

const SOCIAL_ICON = { Facebook, Instagram } as const;

/**
 * Verbatim customer reviews from the public Thumbtack listing for
 * HD Pressure Washing. Quotes, names and dates are published as they
 * appear. No ratings, review counts or aggregate scores are shown -
 * those were not supplied with the source material.
 */
const REVIEWS = [
  {
    quote:
      'Cesar and his crew were fantastic. They were on time, explained what they were going to do, cleaned my roof and solar panels, took pictures for a before and after, and cleaned up their mess. I recommend them 10 times over.',
    name: 'Garrett L.',
    date: 'Nov 5, 2024',
  },
  {
    quote:
      'Roof cleaning was over my expectations. Cesar came on time, got straight to the point and I was more than happy with his work. I would highly recommend HD Pressure Washing.',
    name: 'Sara D.',
    date: 'Mar 5, 2025',
  },
  {
    quote: 'Cesar answered all my questions and did a great job!',
    name: 'Lisa V.',
    date: 'Jan 28, 2025',
  },
] as const;

/**
 * On a phone, three stacked cards is ~900px of vertical scrolling for content
 * the visitor skims. A snap-scrolling rail keeps all three at one card's
 * height and matches how people already read testimonials on mobile.
 * From md up it reverts to the three-column grid.
 */
const RAIL =
  'mt-8 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 ' +
  '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden ' +
  'sm:-mx-8 sm:px-8 ' +
  'md:mx-0 md:mt-10 md:grid md:grid-cols-3 md:items-stretch md:gap-6 md:overflow-visible md:px-0 md:pb-0';

const CARD =
  'flex w-[80vw] max-w-[20rem] shrink-0 snap-start flex-col rounded-2xl border ' +
  'md:w-auto md:max-w-none';

export function Reviews() {
  return (
    <section id="reviews" aria-label="What customers say" className="scroll-mt-24 bg-white py-14 sm:py-20 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Reputation"
          title="What customers say"
          lede="Reviews from real HD Pressure Washing customers, published exactly as they were written."
          align="center"
        />

        <ul className={RAIL}>
          {REVIEWS.map((review, i) => (
            <li
              key={review.name + review.date}
              data-reveal=""
              style={{ '--reveal-delay': `${i * 80}ms` } as React.CSSProperties}
              className={cn(CARD, 'border-ink-900/8 bg-bone p-6 shadow-subtle sm:p-7')}
            >
              <Quote className="size-6 text-brand-600" strokeWidth={2} aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-ink-700">
                {review.quote}
              </blockquote>
              <footer className="mt-6 border-t border-ink-900/8 pt-5">
                <p className="text-[0.9375rem] font-semibold text-ink-900">{review.name}</p>
                <p className="mt-0.5 text-sm text-ink-500">{review.date}</p>
              </footer>
            </li>
          ))}
        </ul>

        <p
          data-reveal=""
          className="mt-6 text-center text-xs font-medium tracking-wide text-ink-400 sm:mt-7"
        >
          Source: Thumbtack
        </p>

        <div
          data-reveal=""
          className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center"
        >
          <span className="text-sm text-ink-500">See our work on</span>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {site.social.map((profile) => {
              const Icon = SOCIAL_ICON[profile.name as keyof typeof SOCIAL_ICON];
              return (
                <a
                  key={profile.name}
                  href={profile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-ink-900/12 bg-white px-4 py-2.5 text-[0.875rem] font-semibold text-ink-800 transition-colors duration-200 hover:border-ink-900/25 hover:text-brand-600"
                >
                  <Icon className="size-4" strokeWidth={2} aria-hidden="true" />
                  {profile.name}
                </a>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
