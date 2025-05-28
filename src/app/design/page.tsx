"use client";

import { useState, type FormEvent } from 'react';
import { Container } from '@/components/shared/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud, Palette } from 'lucide-react';
import Image from 'next/image';
import { toast } from '@/hooks/use-toast';

export default function DesignPage() {
  const [designName, setDesignName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFile(null);
      setPreview(null);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Placeholder submission logic
    if (!file || !designName) {
      toast({
        title: "Missing Information",
        description: "Please provide a design name and upload a file.",
        variant: "destructive",
      });
      return;
    }
    console.log('Design Submitted:', { designName, description, fileName: file.name });
    toast({
      title: "Design Submitted!",
      description: `"${designName}" has been submitted for review. (This is a demo action)`,
    });
    // Reset form
    setDesignName('');
    setDescription('');
    setFile(null);
    setPreview(null);
    // In a real app, this would involve uploading the file and saving design data.
  };

  return (
    <Container>
      <div className="text-center mb-12">
        <Palette className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-foreground">Unleash Your Creativity</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Our intuitive design tool is coming soon! In the meantime, you can upload your masterpiece and share it with the community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Upload Your Design</CardTitle>
            <CardDescription>Share your unique apparel design with the world.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="design-file" className="text-sm font-medium">Design File (Image)</Label>
                <Input 
                  id="design-file" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="mt-1" 
                  required
                />
                 {preview && (
                  <div className="mt-4 border rounded-md p-2 bg-muted/50">
                    <p className="text-sm font-medium mb-2">Preview:</p>
                    <Image src={preview} alt="Design preview" width={200} height={200} className="rounded-md object-contain max-h-48 mx-auto" data-ai-hint="design preview" />
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="design-name" className="text-sm font-medium">Design Name</Label>
                <Input 
                  id="design-name" 
                  type="text" 
                  value={designName} 
                  onChange={(e) => setDesignName(e.target.value)} 
                  placeholder="e.g., Cosmic Dream Hoodie" 
                  className="mt-1" 
                  required
                />
              </div>
              <div>
                <Label htmlFor="description" className="text-sm font-medium">Description (Optional)</Label>
                <Textarea 
                  id="description" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Tell us about your design..." 
                  className="mt-1" 
                  rows={4}
                />
              </div>
              <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                <UploadCloud className="mr-2 h-5 w-5" /> Submit Design
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="bg-muted/30 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Design Tool Coming Soon!</h2>
          <Image 
            src="https://placehold.co/600x400/E0E0E0/777.png?text=Interactive+Design+Canvas" 
            alt="Design tool placeholder" 
            width={600} 
            height={400} 
            className="rounded-lg mb-6 shadow-md"
            data-ai-hint="design tool" 
          />
          <p className="text-muted-foreground mb-4">
            We're hard at work building an amazing, user-friendly design tool that will allow you to create stunning apparel designs directly in your browser. 
            Expect features like:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Easy-to-use interface</li>
            <li>Vast library of graphics and fonts</li>
            <li>Real-time 3D apparel mockups</li>
            <li>Color customization and pattern tools</li>
          </ul>
          <p className="text-muted-foreground mt-4">Stay tuned for updates!</p>
        </div>
      </div>
    </Container>
  );
}
