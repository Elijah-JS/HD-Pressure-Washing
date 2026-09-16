import type { Metadata, Viewport } from 'next';
import { Archivo, Inter } from 'next/font/google';
import { site } from '@/lib/site';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  weight: ['600', '700', '800'],
  variable: '--font-archivo',
});

const TITLE = 'Pressure Washing in Fontana, CA | HD Pressure Washing';
const DESCRIPTION =
  'Professional pressure washing and exterior cleaning for homes and businesses in Fontana, Rancho Cucamonga, Redlands and the Inland Empire. House washing, roof, driveway, gutter, window and solar panel cleaning. Free quotes.';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: TITLE,
    template: `%s | ${site.name}`,
  },
  description: DESCRIPTION,
  applicationName: site.name,
  keywords: [
    'pressure washing Fontana CA',
    'pressure washing Inland Empire',
    'exterior cleaning Fontana',
    'house washing Fontana',
    'roof cleaning Inland Empire',
    'driveway cleaning Fontana',
    'solar panel cleaning Rancho Cucamonga',
    'gutter cleaning Redlands',
    'window cleaning Inland Empire',
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    siteName: site.name,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: `${site.name} - professional exterior cleaning across the Inland Empire`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/apple-touch-icon.png',
  },
  category: 'Home Services',
  formatDetection: {
    telephone: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#00121f',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${inter.variable} ${archivo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
