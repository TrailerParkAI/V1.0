import { LandingHero } from '@/components/landing/hero';
import { Features } from '@/components/landing/features';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';

export default function Home() {
  return (
    <main>
      <Header />
      <LandingHero />
      <Features />
      <Footer />
    </main>
  );
}