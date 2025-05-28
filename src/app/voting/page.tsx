import { MOCK_GALLERY_DESIGNS } from '@/constants'; // Using gallery designs for now
import { DesignCard } from '@/components/shared/design-card';
import { Container } from '@/components/shared/container';
import { Vote } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vote for Designs',
  description: 'Browse trending apparel designs and cast your vote on CustomThread. Help choose the next winning products!',
};

// Simulate fetching trending designs (e.g., top 6 most voted)
const trendingDesigns = [...MOCK_GALLERY_DESIGNS]
  .sort((a, b) => b.votes - a.votes)
  .slice(0, 6);

export default function VotingPage() {
  return (
    <Container>
      <div className="text-center mb-12">
        <Vote className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-foreground">Trending Designs</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Your opinion matters! Vote for the designs you love and help them become official CustomThread products.
        </p>
      </div>

      {trendingDesigns.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {trendingDesigns.map((design) => (
            <DesignCard key={design.id} design={design} />
          ))}
        </div>
      ) : (
         <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No trending designs at the moment. Check back soon!</p>
        </div>
      )}
    </Container>
  );
}
