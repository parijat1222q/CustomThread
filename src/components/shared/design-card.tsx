"use client";

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, MessageCircle } from 'lucide-react';
import type { Design } from '@/types';
import { toast } from '@/hooks/use-toast';

interface DesignCardProps {
  design: Design;
  showVoteButton?: boolean;
}

export function DesignCard({ design, showVoteButton = true }: DesignCardProps) {
  const handleVote = () => {
    // Placeholder vote logic
    toast({
      title: "Vote Cast!",
      description: `You voted for "${design.name}". (This is a demo action)`,
    });
    // In a real app, this would call an API to update votes
    // and potentially update the local state or refetch data.
  };

  return (
    <Card className="overflow-hidden shadow-lg transition-all hover:shadow-xl flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="aspect-[3/3.5] w-full overflow-hidden relative">
          <Image
            src={design.imageUrl}
            alt={design.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="clothing design"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold mb-1">{design.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">By {design.creator}</CardDescription>
        {design.description && <p className="mt-2 text-xs text-foreground/80 line-clamp-2">{design.description}</p>}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <ThumbsUp className="mr-1.5 h-4 w-4 text-accent" />
          {design.votes.toLocaleString()} votes
        </div>
        {showVoteButton && (
          <Button variant="outline" size="sm" onClick={handleVote} className="w-full sm:w-auto">
            <ThumbsUp className="mr-2 h-4 w-4" /> Vote
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
