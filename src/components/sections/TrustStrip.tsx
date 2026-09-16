import { Building2, Leaf, MapPin, ReceiptText } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Container } from '@/components/ui/Container';

/**
 * Only claims that appear on the client's own website are used here.
 * No counts, ratings, years in business or awards - none are documented.
 */
const POINTS: { icon: LucideIcon; label: string; detail: string }[] = [
  {
    icon: Building2,
    label: 'Residential & Commercial',
    detail: 'Homes, storefronts and property managers',
  },
  {
    icon: ReceiptText,
    label: 'Free Estimates',
    detail: 'Scope and price agreed before we start',
  },
  {
    icon: MapPin,
    label: 'Local to the Inland Empire',
    detail: 'Based in Fontana, California',
  },
  {
    icon: Leaf,
    label: 'Eco-Friendly Products',
    detail: 'Biodegradable, safe around pets',
  },
];

export function TrustStrip() {
  return (
    <section aria-label="Why customers choose us" className="border-b border-ink-900/8 bg-white">
      <Container>
        {/*
          Two columns and labels only on phones. Four stacked rows of
          label-plus-detail pushed the services section a full screen further
          down, and these four points are the kind of thing a visitor reads in
          a glance - the supporting line is desktop detail, not the message.
        */}
        <ul className="grid grid-cols-2 gap-x-4 gap-y-4 py-4 sm:gap-x-8 sm:py-8 md:gap-x-10 md:gap-y-6 md:py-9 xl:grid-cols-4 xl:gap-0 xl:py-0">
          {POINTS.map(({ icon: Icon, label, detail }, i) => (
            <li
              key={label}
              data-reveal=""
              style={{ '--reveal-delay': `${i * 70}ms` } as React.CSSProperties}
              className="flex items-start gap-2.5 sm:gap-3.5 xl:px-7 xl:py-8 [&:not(:first-child)]:xl:border-l [&:not(:first-child)]:xl:border-ink-900/8"
            >
              <Icon
                className="mt-px size-[1.125rem] shrink-0 text-brand-600 sm:mt-0.5 sm:size-5"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="text-[0.8125rem] leading-snug font-semibold text-ink-900 sm:text-[0.9375rem]">
                  {label}
                </p>
                <p className="mt-1 hidden text-sm leading-snug text-ink-500 sm:block">{detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
