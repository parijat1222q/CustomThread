
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { NAV_LINKS } from '@/constants';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, ShoppingBasket, User, LogOut, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { auth } from '@/lib/firebaseConfig';
import type { User as FirebaseUser } from 'firebase/auth';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { toast } from '@/hooks/use-toast';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoadingAuth(false);
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const closeSheet = () => setIsSheetOpen(false);

  const handleLogout = async () => {
    closeSheet(); // Close sheet if open
    try {
      await signOut(auth);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      router.push('/'); // Redirect to home page after logout
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout Failed",
        description: "Could not log you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!isMounted) {
    // To avoid hydration mismatch, especially for Sheet and auth state
    // Render a minimal version or null until client-side hydration is complete
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <ShoppingBasket className="h-7 w-7 text-primary" />
            <span className="text-2xl font-bold text-primary">CustomThread</span>
          </Link>
          <div className="h-8 w-24 bg-muted rounded animate-pulse md:hidden"></div> {/* Placeholder for mobile menu button */}
          <div className="hidden md:flex h-8 w-32 bg-muted rounded animate-pulse"></div> {/* Placeholder for desktop auth button */}
        </div>
      </header>
    );
  }


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" onClick={closeSheet}>
          <ShoppingBasket className="h-7 w-7 text-primary" />
          <span className="text-2xl font-bold text-primary">CustomThread</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-foreground/70"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isLoadingAuth ? (
            <div className="h-9 w-36 bg-muted rounded animate-pulse"></div>
          ) : currentUser ? (
            <>
              {/* Can add user display name here later: <span className="text-sm text-foreground/80">Hi, {currentUser.displayName || currentUser.email}</span> */}
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <Link href="/auth">
              <Button variant="outline" size="sm">
                <User className="mr-2 h-4 w-4" />
                Login / Sign Up
              </Button>
            </Link>
          )}
        </div>

        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Toggle Menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[340px] bg-background p-6 flex flex-col">
              <div className="mb-8 flex items-center gap-2">
                 <ShoppingBasket className="h-7 w-7 text-primary" />
                <span className="text-xl font-bold text-primary">CustomThread</span>
              </div>
              <nav className="flex flex-col gap-y-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeSheet}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      pathname === link.href ? "text-primary" : "text-foreground/80"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto border-t pt-6">
                {isLoadingAuth ? (
                   <div className="h-11 w-full bg-muted rounded animate-pulse mb-3"></div>
                ) : currentUser ? (
                  <>
                    {/* <p className="text-sm text-center text-muted-foreground mb-3">Logged in as {currentUser.email}</p> */}
                    <Button variant="default" className="w-full" size="lg" onClick={handleLogout}>
                      <LogOut className="mr-2 h-5 w-5" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link href="/auth" onClick={closeSheet}>
                    <Button variant="default" className="w-full" size="lg">
                      <LogIn className="mr-2 h-5 w-5" />
                      Login / Sign Up
                    </Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
