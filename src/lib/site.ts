/**
 * Single source of truth for all business information.
 *
 * Every value below was verified against the live site at hdpressurewasher.com
 * unless explicitly noted. Nothing here is invented.
 *
 * -- PHONE NUMBER NOTE -------------------------------------------------------
 * The project brief supplied (909) 809-1966. The live website lists
 * 909-809-1720 consistently on every page (header, contact page, footer).
 * We use the website number as the source of truth. If 1966 is the correct
 * current number, change `phone.raw` and `phone.display` below - it
 * propagates everywhere, including the structured data.
 * ---------------------------------------------------------------------------
 */

export const site = {
  name: 'HD Pressure Washing',
  legalName: 'HD Pressure Washing',
  /** Replace with the real deployment origin before launch. */
  url: 'https://hdpressurewasher.com',
  tagline: 'Professional Exterior Cleaning Across the Inland Empire',

  phone: {
    /** E.164, used for tel: links and structured data */
    raw: '+19098091720',
    display: '(909) 809-1720',
  },

  email: 'cesar@hdpressurewasher.com',

  address: {
    street: '8972 Gentian Ave',
    city: 'Fontana',
    region: 'CA',
    regionName: 'California',
    postalCode: '92344',
    country: 'US',
  },

  /** Verified from the contact page. */
  hours: {
    display: 'Monday - Friday, 8:00 AM - 6:00 PM',
    /* Non-breaking hyphens (U+2011): inside the narrow two-up facts card
       this must wrap at the comma or not at all - a plain hyphen lets it
       break as "8AM-" / "6PM". */
    short: 'Mon‑Fri, 8AM‑6PM',
    schema: [
      {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
  },

  /** Fictitious Business Name filing shown in the current site footer. */
  license: 'FBN20240001972',

  /** Only profiles that actually exist and are linked from the current site. */
  social: [
    { name: 'Facebook', href: 'https://www.facebook.com/hdpressurewasher' },
    { name: 'Instagram', href: 'https://www.instagram.com/hd.pressurewashing' },
  ],
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Services', href: '#services' },
  { label: 'Results', href: '#results' },
  { label: 'About', href: '#about' },
  { label: 'Service Areas', href: '#service-areas' },
  { label: 'Contact', href: '#quote' },
] as const;

export type Service = {
  slug: string;
  title: string;
  short: string;
  /** Copy adapted from the descriptions on the client's existing service pages. */
  description: string;
  image: string;
  imageAlt: string;
  /** Existing live URL - preserve or 301 this when the site goes to production. */
  legacyUrl: string;
};

export const SERVICES: Service[] = [
  {
    slug: 'pressure-washing',
    title: 'Pressure Washing',
    short: 'Concrete, walkways, patios and hardscape',
    description:
      'Dirt, grime, mold and stains lifted off concrete, brick and stone - restoring the surface underneath instead of masking it.',
    image: '/images/services/pressure-washing.webp',
    imageAlt: 'Technician pressure washing a residential walkway with a high-pressure wand',
    legacyUrl: '/pressure-washing-services',
  },
  {
    slug: 'house-washing',
    title: 'House Washing',
    short: 'Gentle soft wash for siding and stucco',
    description:
      'A low-pressure soft wash that clears built-up grime from siding and stucco without forcing water behind your exterior.',
    image: '/images/services/house-washing.webp',
    imageAlt: 'Soft washing the exterior siding and trim of a home',
    legacyUrl: '/house-washing-services',
  },
  {
    slug: 'driveway-cleaning',
    title: 'Driveway Cleaning',
    short: 'Oil stains, tire marks and ground-in dirt',
    description:
      'Oil spots, tire marks and years of traffic film removed so the entrance to your property reads clean from the street.',
    image: '/images/services/driveway-cleaning.webp',
    imageAlt: 'Concrete driveway mid-clean, showing the line between dirty and cleaned surface',
    legacyUrl: '/driveway-cleaning-services',
  },
  {
    slug: 'roof-cleaning',
    title: 'Roof Cleaning',
    short: 'Algae, moss and lichen removal',
    description:
      'Algae, moss and lichen treated and cleared using roof-safe methods that protect shingles and tile while restoring the color.',
    image: '/images/services/roof-cleaning.webp',
    imageAlt: 'Technician cleaning a tile roof using an extension wand',
    legacyUrl: '/roof-cleaning-services',
  },
  {
    slug: 'gutter-cleaning',
    title: 'Gutter Cleaning',
    short: 'Clearing debris and restoring drainage',
    description:
      'Leaves, needles and sediment cleared out so water actually reaches the downspout instead of your fascia and foundation.',
    image: '/images/services/gutter-cleaning.webp',
    imageAlt: 'Roof gutter packed with pine needles being flushed clear',
    legacyUrl: '/gutter-cleaning-services',
  },
  {
    slug: 'solar-panel-cleaning',
    title: 'Solar Panel Cleaning',
    short: 'Dust and film removal for better output',
    description:
      'Inland Empire dust films over panels fast. We clear it safely so your array absorbs what it was sized to absorb.',
    image: '/images/services/solar-panel-cleaning.webp',
    imageAlt: 'Technician cleaning a rooftop solar panel array with a soft brush',
    legacyUrl: '/solar-panel-cleaning-services',
  },
  {
    slug: 'window-cleaning',
    title: 'Window Cleaning',
    short: 'Streak-free interior and exterior glass',
    description:
      'Glass, frames and tracks cleaned to a streak-free finish for homes and storefronts that need to look sharp up close.',
    image: '/images/services/window-cleaning.webp',
    imageAlt: 'Squeegee pulling a clean line across a residential window',
    legacyUrl: '/window-cleaning-services',
  },
  {
    slug: 'commercial-cleaning',
    title: 'Commercial Cleaning',
    short: 'Storefronts, facades and shared walkways',
    description:
      'Storefronts, facades, walkways and lots kept presentable on a schedule that works around your operating hours.',
    image: '/images/services/commercial-cleaning.webp',
    imageAlt: 'Commercial building facade being washed by a pressure washing technician',
    legacyUrl: '/commercial-cleaning-services',
  },
];

export type ServiceArea = {
  city: string;
  slug: string;
  blurb: string;
  /** Existing live location page - preserve or 301 when this site goes to production. */
  legacyUrl?: string;
};

/**
 * Fontana, Rancho Cucamonga and Redlands each have a dedicated page on the
 * existing site. The remaining cities are neighboring Inland Empire communities
 * covered under "surrounding areas" - they are listed as coverage, not as
 * dedicated landing pages.
 */
export const PRIMARY_AREAS: ServiceArea[] = [
  {
    city: 'Fontana',
    slug: 'fontana',
    blurb:
      'Home base. Driveways, house washing and roof cleaning across Fontana neighborhoods.',
    legacyUrl: '/pressure-washing-services-in-fontana-ca',
  },
  {
    city: 'Rancho Cucamonga',
    slug: 'rancho-cucamonga',
    blurb:
      'Residential exterior cleaning and solar panel service throughout Rancho Cucamonga.',
    legacyUrl: '/pressure-washing-services-in-rancho-cucamonga-ca',
  },
  {
    city: 'Redlands',
    slug: 'redlands',
    blurb: 'Homes, storefronts and shared walkways cleaned across the Redlands area.',
    legacyUrl: '/pressure-washing-services-in-redlands-ca',
  },
];

export const NEARBY_AREAS = [
  'Rialto',
  'Bloomington',
  'Colton',
  'San Bernardino',
  'Upland',
  'Ontario',
  'Loma Linda',
  'Highland',
] as const;

/**
 * Every URL currently in the live sitemap. Kept here so the eventual production
 * cutover can preserve or redirect each one rather than dropping earned SEO.
 * See README.md, "Existing SEO URLs".
 */
export const LEGACY_URLS = [
  '/',
  '/about-us',
  '/contact-us',
  '/services',
  '/pressure-washing-services',
  '/house-washing-services',
  '/driveway-cleaning-services',
  '/roof-cleaning-services',
  '/gutter-cleaning-services',
  '/solar-panel-cleaning-services',
  '/window-cleaning-services',
  '/commercial-cleaning-services',
  '/pressure-washing-services-in-fontana-ca',
  '/pressure-washing-services-in-rancho-cucamonga-ca',
  '/pressure-washing-services-in-redlands-ca',
] as const;
