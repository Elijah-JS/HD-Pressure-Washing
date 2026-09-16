import { Container } from '@/components/ui/Container';

const STEPS = [
  {
    n: '01',
    title: 'Tell us about the property',
    body: 'Call us or send the quote form. A few photos and the address are usually enough to get started.',
  },
  {
    n: '02',
    title: 'Get a free quote',
    body: 'We confirm the scope and the price up front - free, no obligation, and no surprises once we arrive.',
  },
  {
    n: '03',
    title: 'We clean, you check the work',
    body: 'We schedule around you and get it done. Our job is not finished until you are happy with how it looks.',
  },
];

export function Process() {
  return (
    <section aria-labelledby="process-heading" className="bg-white py-10 sm:py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div data-reveal="" className="eyebrow mb-3 flex items-center gap-3 text-brand-600 sm:mb-4">
              <span aria-hidden="true" className="h-px w-7 bg-brand-500/50" />
              How It Works
            </div>
            <h2
              id="process-heading"
              data-reveal=""
              style={{ '--reveal-delay': '60ms' } as React.CSSProperties}
              className="text-[1.6875rem] leading-[1.18] font-bold sm:text-[clamp(1.85rem,1.2rem+2vw,2.5rem)] sm:leading-[1.1]"
            >
              Three steps, no runaround
            </h2>
          </div>

          <div className="relative lg:col-span-8">
            {/* Continuous hairline the steps hang off, rather than three boxes. */}
            <span
              aria-hidden="true"
              className="absolute top-2 bottom-2 left-[1.375rem] w-px bg-ink-900/10 md:top-0 md:bottom-auto md:left-0 md:h-px md:w-full"
            />
            <ol className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 lg:gap-10">
              {STEPS.map((step, i) => (
                <li
                  key={step.n}
                  data-reveal=""
                  style={{ '--reveal-delay': `${i * 90}ms` } as React.CSSProperties}
                  className="relative flex gap-5 pl-0 md:block md:pt-8"
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-0 hidden size-2 -translate-y-1/2 rounded-full bg-brand-500 ring-4 ring-white md:block"
                  />
                  <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-50 font-display text-xs font-bold text-brand-700 ring-1 ring-brand-500/15 ring-inset md:hidden">
                    {step.n}
                  </span>
                  <div className="min-w-0">
                    <span className="hidden font-display text-sm font-bold tracking-wide text-brand-600 md:block">
                      {step.n}
                    </span>
                    <h3 className="mt-0 font-display text-[1.0625rem] leading-snug font-semibold text-ink-900 md:mt-2.5">
                      {step.title}
                    </h3>
                    <p className="mt-1 hidden text-[0.9375rem] leading-relaxed text-ink-500 md:mt-2 md:block">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
