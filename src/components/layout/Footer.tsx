import { ArrowUp, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { NEARBY_AREAS, PRIMARY_AREAS, SERVICES, site } from '@/lib/site';

const SOCIAL_ICON = { Facebook, Instagram } as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-ink-300">
      <Container>
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-10 sm:gap-x-10 md:grid-cols-12 md:gap-y-12 md:py-16 lg:py-20">
          {/* Identity + contact */}
          <div className="col-span-2 md:col-span-12 lg:col-span-4">
            <Logo className="h-11 w-auto" />
            <p className="mt-4 max-w-xs text-[0.875rem] leading-relaxed text-ink-400 sm:mt-6 sm:text-[0.9375rem]">
              Professional pressure washing and exterior cleaning for homes and businesses across
              Fontana and the Inland Empire.
            </p>

            <ul className="mt-7 space-y-3.5 text-[0.9375rem]">
              <li>
                <a
                  href={`tel:${site.phone.raw}`}
                  className="group inline-flex items-center gap-3 font-semibold text-white transition-colors hover:text-brand-300"
                >
                  <Phone className="size-4 text-brand-400" strokeWidth={2} aria-hidden="true" />
                  <span className="tnum">{site.phone.display}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-3 break-all transition-colors hover:text-white"
                >
                  <Mail
                    className="size-4 shrink-0 text-brand-400"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 size-4 shrink-0 text-brand-400"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <address className="not-italic">
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.region} {site.address.postalCode}
                </address>
              </li>
            </ul>

            <ul className="mt-7 flex gap-2.5">
              {site.social.map((profile) => {
                const Icon = SOCIAL_ICON[profile.name as keyof typeof SOCIAL_ICON];
                return (
                  <li key={profile.name}>
                    <a
                      href={profile.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.name} on ${profile.name}`}
                      className="flex size-10 items-center justify-center rounded-full border border-white/12 text-ink-300 transition-colors duration-200 hover:border-white/30 hover:bg-white/5 hover:text-white"
                    >
                      <Icon className="size-[1.0625rem]" strokeWidth={1.9} aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Services */}
          <nav aria-labelledby="footer-services" className="md:col-span-4 lg:col-span-3">
            <h2 id="footer-services" className="text-xs font-semibold tracking-[0.14em] text-white uppercase">
              Services
            </h2>
            <ul className="mt-5 space-y-2.5 text-[0.9375rem]">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <a href="#services" className="text-ink-400 transition-colors hover:text-white">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Areas */}
          <nav aria-labelledby="footer-areas" className="md:col-span-4 lg:col-span-3">
            <h2 id="footer-areas" className="text-xs font-semibold tracking-[0.14em] text-white uppercase">
              Service Areas
            </h2>
            <ul className="mt-5 space-y-2.5 text-[0.9375rem]">
              {PRIMARY_AREAS.map((area) => (
                <li key={area.slug}>
                  <a
                    href="#service-areas"
                    className="text-ink-400 transition-colors hover:text-white"
                  >
                    {area.city}, CA
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-ink-400">
              Also serving {NEARBY_AREAS.slice(0, 4).join(', ')} and surrounding Inland Empire
              communities.
            </p>
          </nav>

          {/* Company */}
          <nav aria-labelledby="footer-company" className="md:col-span-4 lg:col-span-2">
            <h2 id="footer-company" className="text-xs font-semibold tracking-[0.14em] text-white uppercase">
              Company
            </h2>
            <ul className="mt-5 space-y-2.5 text-[0.9375rem]">
              <li>
                <a href="#about" className="text-ink-400 transition-colors hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#results" className="text-ink-400 transition-colors hover:text-white">
                  Our Work
                </a>
              </li>
              <li>
                <a href="#quote" className="text-ink-400 transition-colors hover:text-white">
                  Get a Quote
                </a>
              </li>
            </ul>

            <p className="mt-6 text-sm leading-relaxed text-ink-400">
              {site.hours.short}
              <br />
              Lic. No. {site.license}
            </p>
          </nav>
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-5 border-t border-white/10 py-7 sm:flex-row sm:items-center">
          <p className="text-sm text-ink-400">
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-400 transition-colors hover:text-white"
          >
            Back to top
            <span className="flex size-8 items-center justify-center rounded-full border border-white/12">
              <ArrowUp className="size-3.5" strokeWidth={2.25} aria-hidden="true" />
            </span>
          </a>
        </div>
      </Container>
    </footer>
  );
}
