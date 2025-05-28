import { Container } from '@/components/shared/container';
import { Info, Users, Zap, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about CustomThread - where community, creativity, and fashion intersect. Design, vote, and wear unique apparel.',
};

export default function AboutPage() {
  return (
    <Container>
      <div className="text-center mb-12">
        <Info className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-foreground">About CustomThread</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          We believe fashion should be collaborative, creative, and driven by the community. CustomThread is a platform where your designs can come to life.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-semibold text-foreground mb-4">Our Concept: Community-Powered Fashion</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            At CustomThread, we're revolutionizing the way apparel is created and discovered. We empower individuals to become designers and curators. Our platform provides the tools and the stage for creativity to flourish.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The process is simple: you design, the community votes, and the best designs become real, high-quality products available in our shop. This means every item you find at CustomThread is not just a piece of clothing, but a story of collective creativity and popular choice.
          </p>
        </div>
        <div>
          <Image 
            src="https://placehold.co/600x450/8F00FF/FFFFFF.png?text=Community+Collaboration" 
            alt="Community collaboration in fashion" 
            width={600} 
            height={450} 
            className="rounded-lg shadow-xl object-cover"
            data-ai-hint="team collaboration" 
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-foreground text-center mb-10">Why CustomThread?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
            <Users className="mx-auto h-12 w-12 text-accent mb-3" />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Empowering Creators</h3>
            <p className="text-sm text-muted-foreground">Whether you're a professional designer or a passionate hobbyist, your vision matters. We provide the platform for your designs to be seen and celebrated.</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
            <Zap className="mx-auto h-12 w-12 text-accent mb-3" />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Unique & Authentic</h3>
            <p className="text-sm text-muted-foreground">Shop apparel that's truly unique, chosen by a discerning community. Stand out with designs you won't find anywhere else.</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
            <ShoppingCart className="mx-auto h-12 w-12 text-accent mb-3" />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Democratized Fashion</h3>
            <p className="text-sm text-muted-foreground">We're breaking down traditional fashion barriers. Here, trends are set by the people, for the people. Only the best designs become products.</p>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-foreground mb-4">Join the Movement</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Be part of a new era in fashion. Sign up today to start designing, voting, and shaping the future of apparel.
        </p>
        {/* <Link href="/auth">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Get Started
          </Button>
        </Link> */}
      </div>
    </Container>
  );
}
