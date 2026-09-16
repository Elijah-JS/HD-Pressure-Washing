import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { QuoteForm } from '@/components/sections/QuoteForm';
import { site } from '@/lib/site';

export function Quote() {
  return (
    /* Flat navy. A large blurred brand-blue radial used to sit behind this
       section; it was pure decoration, it was the first thing the eye landed
       on, and the white form panel already provides all the separation this
       section needs. */
    <section id="quote" className="scroll-mt-24 bg-navy-900 py-10 sm:py-20 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-9 lg:grid-cols-12 lg:gap-16">
          {/* Pitch + direct contact */}
          <div className="lg:col-span-5">
            <div data-reveal="" className="eyebrow mb-3 flex items-center gap-3 text-brand-300 sm:mb-4">
              <span aria-hidden="true" className="h-px w-7 bg-brand-300/60" />
              Free Quote
            </div>

            <h2
              data-reveal=""
              style={{ '--reveal-delay': '60ms' } as React.CSSProperties}
              className="text-[1.6875rem] leading-[1.18] font-bold text-white sm:text-[clamp(1.85rem,1.15rem+2.4vw,3rem)] sm:leading-[1.1]"
            >
              Ready to restore your property?
            </h2>

            <p
              data-reveal=""
              style={{ '--reveal-delay': '120ms' } as React.CSSProperties}
              className="mt-3 max-w-md text-[0.875rem] leading-[1.55] text-ink-300 sm:mt-5 sm:text-[1.0625rem] sm:leading-relaxed"
            >
              Tell us what needs cleaning and we will get you a free, no-obligation quote. Prefer
              to talk it through? Calling is usually quickest.
            </p>

            {/* Phone gets its own emphasis - it is the highest-intent action. */}
            <a
              data-reveal=""
              style={{ '--reveal-delay': '180ms' } as React.CSSProperties}
              href={`tel:${site.phone.raw}`}
              className="group mt-5 flex min-h-14 items-center gap-3 rounded-2xl border border-white/12 bg-white/5 p-3.5 transition-colors duration-300 hover:border-white/25 hover:bg-white/10 sm:mt-9 sm:min-h-16 sm:gap-4 sm:p-5"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white sm:size-12">
                <Phone className="size-5" strokeWidth={2.25} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold tracking-[0.12em] text-ink-400 uppercase">
                  Call us direct
                </span>
                <span className="tnum mt-1 block font-display text-2xl leading-none font-bold text-white">
                  {site.phone.display}
                </span>
              </span>
            </a>

            <dl
              data-reveal=""
              style={{ '--reveal-delay': '240ms' } as React.CSSProperties}
              className="mt-5 hidden space-y-4 border-t border-white/10 pt-7 sm:mt-8 sm:space-y-5 sm:pt-8 md:block"
            >
              <ContactRow icon={Clock} label="Hours">
                {site.hours.display}
              </ContactRow>
              <ContactRow icon={Mail} label="Email">
                <a
                  href={`mailto:${site.email}`}
                  className="break-all transition-colors hover:text-brand-300"
                >
                  {site.email}
                </a>
              </ContactRow>
              <ContactRow icon={MapPin} label="Based in">
                {site.address.street}, {site.address.city} {site.address.region}{' '}
                {site.address.postalCode}
              </ContactRow>
            </dl>
          </div>

          {/* Form */}
          <div
            data-reveal=""
            style={{ '--reveal-delay': '120ms' } as React.CSSProperties}
            className="lg:col-span-7"
          >
            <QuoteForm />
          </div>
        </div>
      </Container>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <Icon className="mt-0.5 size-[1.125rem] shrink-0 text-brand-300" strokeWidth={1.9} />
      <div className="min-w-0">
        <dt className="text-xs font-semibold tracking-[0.12em] text-ink-400 uppercase">{label}</dt>
        <dd className="mt-1 text-[0.9375rem] leading-relaxed text-ink-200">{children}</dd>
      </div>
    </div>
  );
}
