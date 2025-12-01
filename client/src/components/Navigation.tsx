import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Rocket, Home, Presentation, Users, Briefcase, Phone } from "lucide-react";
import { useState } from "react";
import logoImage from "@assets/LOGO_00-removebg-preview_1764561853084.png";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/sessions", label: "Sessions & Contests" },
  { href: "/participate", label: "Participate" },
  { href: "/partners", label: "Partners" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
];

const mobileNavItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/sessions", label: "Sessions", icon: Presentation },
  { href: "/participate", label: "Participate", icon: Users },
  { href: "/partners", label: "Partners", icon: Briefcase },
  { href: "/contact", label: "Contact", icon: Phone },
];

export function Navigation() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <Link href="/" className="flex items-center gap-2">
              <img 
                src={logoImage} 
                alt="KSF 2026 Logo" 
                className="h-10 w-auto"
                data-testid="logo-ksf"
              />
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
              <Link href="/participate#register">
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
                      <img 
                        src={logoImage} 
                        alt="KSF 2026 Logo" 
                        className="h-10 w-auto"
                        data-testid="logo-ksf-mobile"
                      />
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
                      <Link href="/participate#register" onClick={() => setMobileOpen(false)}>
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

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/95 backdrop-blur-md border-t border-border">
        <div className="flex items-center justify-around h-16">
          {mobileNavItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={location === item.href ? "secondary" : "ghost"}
                size="icon"
                className="flex flex-col items-center justify-center"
                data-testid={`mobile-bottom-nav-${item.label.toLowerCase()}`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs mt-0.5">{item.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
