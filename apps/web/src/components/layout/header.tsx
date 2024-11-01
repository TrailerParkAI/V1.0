'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function Header() {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/auth');

  if (isAuthPage) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Inqut
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/artists" className="hover:text-primary">
            Find Artists
          </Link>
          <Link href="/studios" className="hover:text-primary">
            Studios
          </Link>
          <Link href="/about" className="hover:text-primary">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/auth/login">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link href="/auth/register">
            <Button>Sign up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}