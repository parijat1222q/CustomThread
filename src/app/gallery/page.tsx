
import { getAllDesigns } from '@/services/designService';
import { DesignCard } from '@/components/shared/design-card';
import { Container } from '@/components/shared/container';
import { GalleryVerticalEnd, AlertTriangle } from 'lucide-react';
import type { Metadata } from 'next';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata: Metadata = {
  title: 'Community Gallery',
  description: 'Explore unique apparel designs submitted by the CustomThread community. Vote for your favorites!',
};

export default async function GalleryPage() {
  let designs = [];
  let errorFetchingDesigns = null;

  try {
    // Fetch designs sorted by creation date by default
    designs = await getAllDesigns('createdAt', 'desc');
  } catch (error) {
    console.error("Failed to fetch designs for gallery:", error);
    errorFetchingDesigns = "We couldn't load the designs right now. Please try again later.";
  }

  return (
    <Container>
      <div className="text-center mb-12">
        <GalleryVerticalEnd className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-foreground">Community Gallery</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover the latest designs from our talented community. Your vote helps decide which creations make it to our shop!
        </p>
      </div>
      
      {/* Placeholder for filters/sorting - Future enhancement */}
      {/* <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-end"> ... </div> */}

      {errorFetchingDesigns && (
        <Alert variant="destructive" className="mb-8">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error Loading Designs</AlertTitle>
          <AlertDescription>{errorFetchingDesigns}</AlertDescription>
        </Alert>
      )}

      {!errorFetchingDesigns && designs.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {designs.map((design) => (
            <DesignCard key={design.id} design={design} />
          ))}
        </div>
      ) : (
        !errorFetchingDesigns && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No designs submitted yet. Be the first to share your creation!</p>
            {/* TODO: Link to design submission page once it's functional */}
          </div>
        )
      )}
    </Container>
  );
}
