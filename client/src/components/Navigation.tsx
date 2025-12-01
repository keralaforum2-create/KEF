import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Rocket, Home, Presentation, Users, Briefcase, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
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
  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0.6)", "rgba(255, 255, 255, 0.95)"]
  );

  const headerBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(8px)", "blur(12px)"]
  );

  const headerShadow = useTransform(
    scrollY,
    [0, 100],
    ["0 0 0 0 rgba(0,0,0,0)", "0 4px 20px -2px rgba(0,0,0,0.1)"]
  );

  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 border-b border-border"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          backgroundColor: headerBg,
          backdropFilter: headerBlur,
          WebkitBackdropFilter: headerBlur,
          boxShadow: headerShadow,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <Link href="/" className="flex items-center gap-2">
              <motion.img 
                src={logoImage} 
                alt="KSF 2026 Logo" 
                className="h-10 w-auto"
                data-testid="logo-ksf"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-1" data-testid="nav-desktop">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                >
                  <Link href={item.href}>
                    <Button
                      variant={location === item.href ? "secondary" : "ghost"}
                      size="sm"
                      className="font-medium"
                      data-testid={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {item.label}
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Link href="/participate#register">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                    <Button className="hidden sm:flex font-semibold" data-testid="button-register-nav">
                      Register Now
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col gap-4 mt-8">
                    <motion.div 
                      className="flex items-center gap-2 mb-4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img 
                        src={logoImage} 
                        alt="KSF 2026 Logo" 
                        className="h-10 w-auto"
                        data-testid="logo-ksf-mobile"
                      />
                    </motion.div>
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                      >
                        <Link href={item.href} onClick={() => setMobileOpen(false)}>
                          <Button
                            variant={location === item.href ? "secondary" : "ghost"}
                            className="w-full justify-start font-medium"
                            data-testid={`nav-mobile-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {item.label}
                          </Button>
                        </Link>
                      </motion.div>
                    ))}
                    <motion.div 
                      className="pt-4 border-t border-border"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <Link href="/participate#register" onClick={() => setMobileOpen(false)}>
                        <Button className="w-full font-semibold" data-testid="button-register-mobile">
                          Register Now
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Bottom Navigation */}
      <motion.nav 
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/95 backdrop-blur-md border-t border-border"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
      >
        <div className="flex items-center justify-around h-16">
          {mobileNavItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
            >
              <Link href={item.href}>
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
            </motion.div>
          ))}
        </div>
      </motion.nav>
    </>
  );
}
