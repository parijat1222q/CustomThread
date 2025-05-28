import { MOCK_SHOP_PRODUCTS } from '@/constants';
import { ProductCard } from '@/components/shared/product-card';
import { Container } from '@/components/shared/container';
import { ShoppingBag, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop Winning Designs',
  description: 'Purchase exclusive, community-voted winning apparel designs from the CustomThread shop.',
};

export default function ShopPage() {
  return (
    <Container>
      <div className="text-center mb-12">
        <ShoppingBag className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-foreground">Shop Winning Designs</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our collection of unique apparel, brought to life by the community's votes. Limited edition and exclusive to CustomThread.
        </p>
      </div>
      
      {/* Placeholder for checkout button / cart summary */}
      {/* <div className="my-8 p-6 bg-card rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center">
        <div>
            <h3 className="text-xl font-semibold text-card-foreground">Your Cart (3 items)</h3>
            <p className="text-muted-foreground text-sm">Total: $159.97</p>
        </div>
        <Button size="lg" className="mt-4 sm:mt-0 bg-accent hover:bg-accent/90 text-accent-foreground">
            <CreditCard className="mr-2 h-5 w-5" /> Proceed to Checkout
        </Button>
      </div> */}

      {MOCK_SHOP_PRODUCTS.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {MOCK_SHOP_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">The shop is currently empty. Winning designs will appear here soon!</p>
        </div>
      )}
       {/* Simple Checkout Flow Placeholder */}
       {MOCK_SHOP_PRODUCTS.length > 0 && (
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-foreground mb-4">Ready to Checkout?</h3>
          <p className="text-muted-foreground mb-6">
            Our full checkout experience is coming soon. For now, this is a demonstration.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <CreditCard className="mr-2 h-5 w-5" />
            Proceed to Checkout (Demo)
          </Button>
        </div>
      )}
    </Container>
  );
}
