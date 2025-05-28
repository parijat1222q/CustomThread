
"use client";

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp } from 'lucide-react';
import type { Design } from '@/types';
import { toast } from '@/hooks/use-toast';
import { voteForDesign } from '@/services/designService'; // Import the service
import { useState } from 'react';
import { auth } from '@/lib/firebaseConfig'; // Import auth to check if user is logged in

interface DesignCardProps {
  design: Design;
  showVoteButton?: boolean;
}

export function DesignCard({ design, showVoteButton = true }: DesignCardProps) {
  const [isVoting, setIsVoting] = useState(false);
  // It's better to get the current user state from a context or a hook in a real app,
  // but for simplicity here, we can directly check auth.currentUser.
  // This might not be perfectly reactive to auth state changes within this component alone.
  const currentUser = auth.currentUser;


  const handleVote = async () => {
    if (!currentUser) {
      toast({
        title: "Login Required",
        description: "Please log in to vote for designs.",
        variant: "destructive",
      });
      // Optionally redirect to login page: router.push('/auth');
      return;
    }

    if (isVoting) return;
    setIsVoting(true);

    try {
      await voteForDesign(design.id);
      toast({
        title: "Vote Cast!",
        description: `You voted for "${design.name}". Refresh to see the updated count.`,
      });
      // In a real app, you might want to optimistically update the UI
      // or refetch data to show the new vote count without a full refresh.
      // For example, by passing a callback to update the design prop or managing state globally.
    } catch (error) {
      console.error("Error voting for design:", error);
      toast({
        title: "Vote Failed",
        description: "Could not cast your vote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVoting(false);
    }
  };

  // Ensure votes is a number before calling toLocaleString
  const currentVotes = typeof design.votes === 'number' ? design.votes : 0;

  return (
    <Card className="overflow-hidden shadow-lg transition-all hover:shadow-xl flex flex-col h-full group">
      <CardHeader className="p-0">
        <div className="aspect-[3/3.5] w-full overflow-hidden relative">
          <Image
            src={design.imageUrl || 'https://placehold.co/600x700.png'} // Fallback image
            alt={design.name || 'Design image'}
            fill // Changed from layout="fill" for Next 13+ Image component
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" // Provide sizes for responsiveness
            style={{ objectFit: 'cover' }} // Explicitly set objectFit as a style
            className="transition-transform duration-300 group-hover:scale-105"
            priority={false} // Set to true for above-the-fold images if needed
            data-ai-hint="clothing design"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold mb-1">{design.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          By {design.creatorDisplayName || 'Anonymous Creator'}
        </CardDescription>
        {design.description && <p className="mt-2 text-xs text-foreground/80 line-clamp-2">{design.description}</p>}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <ThumbsUp className="mr-1.5 h-4 w-4 text-accent" />
          {currentVotes.toLocaleString()} votes
        </div>
        {showVoteButton && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleVote} 
            disabled={isVoting || !currentUser}
            className="w-full sm:w-auto"
            aria-label={`Vote for ${design.name}`}
          >
            {isVoting ? (
              "Voting..."
            ) : (
              <>
                <ThumbsUp className="mr-2 h-4 w-4" /> Vote
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
