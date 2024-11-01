import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function LandingHero() {
  return (
    <section className="pt-32 pb-24 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Find Your Perfect <span className="text-primary">Tattoo Artist</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Connect with talented tattoo artists, explore their portfolios, and book your next tattoo session seamlessly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/register">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/artists">
            <Button variant="outline" size="lg">
              Browse Artists
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}