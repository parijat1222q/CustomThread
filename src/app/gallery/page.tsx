import { MOCK_GALLERY_DESIGNS } from '@/constants';
import { DesignCard } from '@/components/shared/design-card';
import { Container } from '@/components/shared/container';
import { GalleryVerticalEnd } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community Gallery',
  description: 'Explore unique apparel designs submitted by the CustomThread community. Vote for your favorites!',
};

export default function GalleryPage() {
  return (
    <Container>
      <div className="text-center mb-12">
        <GalleryVerticalEnd className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-foreground">Community Gallery</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover the latest designs from our talented community. Your vote helps decide which creations make it to our shop!
        </p>
      </div>
      
      {/* Placeholder for filters/sorting */}
      {/* <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-end">
        <Select>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="tees">T-Shirts</SelectItem>
            <SelectItem value="hoodies">Hoodies</SelectItem>
            <SelectItem value="jackets">Jackets</SelectItem>
          </SelectContent>
        </Select>
      </div> */}

      {MOCK_GALLERY_DESIGNS.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {MOCK_GALLERY_DESIGNS.map((design) => (
            <DesignCard key={design.id} design={design} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No designs submitted yet. Be the first!</p>
        </div>
      )}
    </Container>
  );
}
