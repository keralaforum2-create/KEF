import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Rocket } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/sessions", label: "Sessions & Contests" },
  { href: "/participate", label: "Participate" },
  { href: "/partners", label: "Partners" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
];

export function Navigation() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Rocket className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-serif font-bold text-lg hidden sm:block">KSF 2026</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" data-testid="nav-desktop">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={location === item.href ? "secondary" : "ghost"}
                  size="sm"
                  className="font-medium"
                  data-testid={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/participate">
              <Button className="hidden sm:flex font-semibold" data-testid="button-register-nav">
                Register Now
              </Button>
            </Link>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-4 mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                      <Rocket className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="font-serif font-bold text-lg">KSF 2026</span>
                  </div>
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                      <Button
                        variant={location === item.href ? "secondary" : "ghost"}
                        className="w-full justify-start font-medium"
                        data-testid={`nav-mobile-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                  <div className="pt-4 border-t border-border">
                    <Link href="/participate" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full font-semibold" data-testid="button-register-mobile">
                        Register Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
