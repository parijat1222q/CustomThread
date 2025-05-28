import { Container } from '@/components/shared/container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from '@/components/auth/login-form';
import { SignupForm } from '@/components/auth/signup-form';
import { User } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account Access',
  description: 'Login to your CustomThread account or create a new one to start designing and voting.',
};

export default function AuthPage() {
  return (
    <Container className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] py-12"> {/* 8rem approx navbar + footer height */}
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <User className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-3xl font-bold text-foreground">Welcome to CustomThread</h1>
            <p className="text-muted-foreground">Access your account or join our community.</p>
        </div>
        <Card className="shadow-xl">
          <CardContent className="p-0"> {/* Remove padding from CardContent if Tabs already have it */}
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-t-lg rounded-b-none">
                <TabsTrigger value="login" className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Login</TabsTrigger>
                <TabsTrigger value="signup" className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="p-6">
                <LoginForm />
              </TabsContent>
              <TabsContent value="signup" className="p-6">
                <SignupForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
