import { MOCK_FEATURED_DESIGNS } from '@/constants';
import { DesignCard } from '@/components/shared/design-card';
import { Container } from '@/components/shared/container';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function FeaturedDesignsSection() {
  return (
    <Container>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-foreground">Featured Designs</h2>
        <Link href="/gallery">
            <Button variant="link" className="text-primary hover:text-primary/80">
                View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_FEATURED_DESIGNS.map((design) => (
          <DesignCard key={design.id} design={design} />
        ))}
      </div>
    </Container>
  );
}
