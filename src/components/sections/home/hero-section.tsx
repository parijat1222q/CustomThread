import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/container';
import Image from 'next/image';

export function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-primary via-purple-700 to-accent text-primary-foreground overflow-hidden">
      <Container className="py-20 md:py-32 text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold !tracking-tight">
          Design. Vote. Wear.
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-primary-foreground/80">
          Join a community of creators and fashion enthusiasts. Submit your unique designs, vote for your favorites, and shop exclusive apparel brought to life by your choices.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link href="/design">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transition-transform hover:scale-105 w-full sm:w-auto">
              Start Designing
            </Button>
          </Link>
          <Link href="/gallery">
            <Button size="lg" variant="outline" className="text-primary-foreground border-primary-foreground/50 hover:bg-primary-foreground/10 w-full sm:w-auto">
              Explore Gallery
            </Button>
          </Link>
        </div>
      </Container>
      {/* Optional: decorative background elements */}
      <div className="absolute inset-0 opacity-10 z-0">
         {/* Example subtle pattern or image - ensure it's very subtle */}
         {/* <Image src="/path-to-subtle-pattern.svg" layout="fill" objectFit="cover" alt="background pattern" /> */}
      </div>
    </div>
  );
}
