import { FAQS } from '@/components/sections/Faq';
import { NEARBY_AREAS, PRIMARY_AREAS, SERVICES, site } from '@/lib/site';

/**
 * Structured data for the homepage.
 *
 * Note what is deliberately absent: `aggregateRating`, `review`, `foundingDate`
 * and `award`. None of those are documented for this business, and Google
 * treats fabricated review markup as a manual-action offence. They can be added
 * the moment real values exist.
 */
export function buildJsonLd() {
  const businessId = `${site.url}/#business`;

  const business = {
    '@type': ['ProfessionalService', 'LocalBusiness'],
    '@id': businessId,
    name: site.name,
    description:
      'Professional pressure washing and exterior cleaning for residential and commercial properties in Fontana, California and the surrounding Inland Empire.',
    url: site.url,
    telephone: site.phone.raw,
    email: site.email,
    image: `${site.url}/images/hero.webp`,
    logo: `${site.url}/images/brand/logo.png`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: site.hours.schema.map((slot) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
    areaServed: [
      ...PRIMARY_AREAS.map((area) => ({
        '@type': 'City',
        name: area.city,
        addressRegion: site.address.region,
      })),
      ...NEARBY_AREAS.map((city) => ({
        '@type': 'City',
        name: city,
        addressRegion: site.address.region,
      })),
    ],
    sameAs: site.social.map((profile) => profile.href),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Exterior Cleaning Services',
      itemListElement: SERVICES.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
          serviceType: service.title,
          provider: { '@id': businessId },
          areaServed: PRIMARY_AREAS.map((area) => area.city),
        },
      })),
    },
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { '@id': businessId },
    inLanguage: 'en-US',
  };

  const faq = {
    '@type': 'FAQPage',
    '@id': `${site.url}/#faq`,
    mainEntity: FAQS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [business, website, faq],
  };
}
