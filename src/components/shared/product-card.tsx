"use client";

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '@/types';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const handleAddToCart = () => {
    // Placeholder add to cart logic
     toast({
      title: "Added to Cart!",
      description: `"${product.name}" has been added to your cart. (This is a demo action)`,
    });
    // In a real app, this would update cart state/context.
  };
  
  return (
    <Card className="overflow-hidden shadow-lg transition-all hover:shadow-xl flex flex-col h-full">
      <CardHeader className="p-0">
         <div className="aspect-[3/3.5] w-full overflow-hidden relative">
          <Image
            src={product.imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="fashion model"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold mb-1">{product.name}</CardTitle>
        <CardDescription className="text-xl font-bold text-primary mb-2">
          ${product.price.toFixed(2)}
        </CardDescription>
        <p className="text-xs text-foreground/80 line-clamp-3">{product.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
