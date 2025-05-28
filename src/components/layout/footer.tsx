import Link from 'next/link';
import { ShoppingBasket, Twitter, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/80 text-foreground/70">
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <ShoppingBasket className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold text-primary">CustomThread</span>
            </Link>
            <p className="mt-2 text-sm">
              Community-powered fashion. Design, vote, and wear unique apparel.
            </p>
          </div>
          
          <div>
            <h3 className="text-md font-semibold text-foreground">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link href="/shop" className="hover:text-primary transition-colors">Shop</Link></li>
              <li><Link href="/auth" className="hover:text-primary transition-colors">My Account</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-md font-semibold text-foreground">Connect With Us</h3>
            <div className="mt-3 flex space-x-4">
              <Link href="#" aria-label="Twitter" className="hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="Instagram" className="hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="Facebook" className="hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm">
          <p>&copy; {currentYear} CustomThread. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
