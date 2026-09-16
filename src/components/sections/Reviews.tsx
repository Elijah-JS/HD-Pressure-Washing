import { Facebook, Instagram, Quote } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ReviewExcerpt } from '@/components/ui/ReviewExcerpt';
import { site } from '@/lib/site';

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

export function Reviews() {
  return (
    <section id="reviews" aria-label="What customers say" className="scroll-mt-24 bg-white py-10 sm:py-20 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Reputation"
          title="What customers say"
          lede="Reviews from real HD Pressure Washing customers, published exactly as they were written."
          ledeClassName="hidden lg:block"
          align="center"
        />

        {/* Phone + tablet: editorial snap carousel. One card leads, the next
            peeks so swipe is obvious. Desktop is the three-column grid. */}
        <ul
          className={
            'mt-6 -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 ' +
            '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden ' +
            'sm:-mx-8 sm:px-8 md:-mx-10 md:gap-4 md:px-10 ' +
            'lg:hidden'
          }
        >
          {REVIEWS.map((review) => (
            <li
              key={review.name + review.date}
              className="flex w-[min(86vw,22rem)] shrink-0 snap-start snap-always flex-col rounded-2xl bg-bone px-4 py-4 md:w-[min(52vw,24rem)] md:px-5 md:py-5"
            >
              <Quote className="size-4 text-brand-600" strokeWidth={2} aria-hidden="true" />
              <blockquote className="mt-2.5 text-[0.9375rem] leading-[1.55] text-ink-700">
                <span className="md:hidden">
                  <ReviewExcerpt text={review.quote} />
                </span>
                <span className="hidden md:inline">{review.quote}</span>
              </blockquote>
              <p className="mt-3 text-[0.8125rem] font-semibold text-ink-900">
                {review.name}
                <span className="font-normal text-ink-400"> · {review.date}</span>
              </p>
            </li>
          ))}
        </ul>

        <ul className="mt-10 hidden grid-cols-3 items-stretch gap-6 lg:grid">
          {REVIEWS.map((review, i) => (
            <li
              key={review.name + review.date}
              data-reveal=""
              style={{ '--reveal-delay': `${i * 80}ms` } as React.CSSProperties}
              className="flex flex-col rounded-2xl border border-ink-900/8 bg-bone p-7 shadow-subtle"
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

        <p className="mt-4 text-center text-[0.6875rem] font-medium tracking-wide text-ink-400 sm:mt-7">
          Source: Thumbtack
        </p>

        <div
          data-reveal=""
          className="mt-5 flex items-center justify-center gap-2 sm:mt-10 sm:gap-3"
        >
          <span className="hidden text-sm text-ink-500 sm:inline">See our work on</span>
          {site.social.map((profile) => {
            const Icon = SOCIAL_ICON[profile.name as keyof typeof SOCIAL_ICON];
            return (
              <a
                key={profile.name}
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 py-2 text-[0.8125rem] font-semibold text-ink-700 sm:border sm:border-ink-900/12 sm:bg-white sm:px-4 sm:text-[0.875rem] sm:text-ink-800"
              >
                <Icon className="size-3.5 sm:size-4" strokeWidth={2} aria-hidden="true" />
                {profile.name}
              </a>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
