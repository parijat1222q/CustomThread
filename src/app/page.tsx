import { HeroSection } from '@/components/sections/home/hero-section';
import { FeaturedDesignsSection } from '@/components/sections/home/featured-designs-section';
import { HowItWorksSection } from '@/components/sections/home/how-it-works-section';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/container';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedDesignsSection />
      <HowItWorksSection />
      <Container className="text-center py-16">
        <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Make Your Mark?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Start designing, explore the gallery, or see what's trending. Your next favorite piece of apparel is waiting to be discovered or created.
        </p>
        <Link href="/gallery">
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transition-transform hover:scale-105">
            Get Started Now
          </Button>
        </Link>
      </Container>
    </>
  );
}
