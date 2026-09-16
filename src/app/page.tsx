import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileCTABar } from '@/components/layout/MobileCTABar';
import { RevealProvider } from '@/components/ui/Reveal';
import { Hero } from '@/components/sections/Hero';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { Services } from '@/components/sections/Services';
import { Results } from '@/components/sections/Results';
import { About } from '@/components/sections/About';
import { Process } from '@/components/sections/Process';
import { ServiceAreas } from '@/components/sections/ServiceAreas';
import { Reviews } from '@/components/sections/Reviews';
import { Faq } from '@/components/sections/Faq';
import { Quote } from '@/components/sections/Quote';
import { buildJsonLd } from '@/lib/schema';

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static, build-time value assembled from lib/site.ts - no user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
      />

      <Header />

      <main id="main" className="max-sm:pb-16">
        <Hero />
        <TrustStrip />
        <Services />
        <Results />
        <About />
        <Process />
        <ServiceAreas />
        <Reviews />
        <Faq />
        <Quote />
      </main>

      <Footer />
      <MobileCTABar />
      <RevealProvider />
    </>
  );
}
