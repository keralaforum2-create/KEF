import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Calendar, Users, Instagram, Facebook, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollFadeUp, StaggerContainer, StaggerItem } from "@/lib/animations";
import logoPath from "@assets/LOGO_00-removebg-preview_1764577293415.png";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <ScrollFadeUp>
      <footer className={`bg-card border-t border-border ${className || ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16">
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12" staggerDelay={0.1}>
              <StaggerItem>
                <div>
                  <div className="flex items-center gap-2 mb-4 hover-elevate">
                    <img 
                      src={logoPath}
                      alt="Kerala Startup Fest Logo"
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    A two-day mega startup festival that turns ideas into action.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>7-8 January 2026</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span>No age limit</span>
                  </div>
                </div>
              </StaggerItem>


              <StaggerItem>
                <div>
                  <h4 className="font-semibold mb-4">Contact</h4>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <Mail className="w-4 h-4 text-primary mt-0.5" />
                      <a href="mailto:keralastartupfest@gmail.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-email">
                        keralastartupfest@gmail.com
                      </a>
                    </li>
                    <li className="flex items-start gap-2">
                      <Phone className="w-4 h-4 text-primary mt-0.5" />
                      <a href="tel:+919072344431" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-phone">
                        +91 9072344431
                      </a>
                    </li>
                    <li className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex flex-col gap-3">
                        <span className="text-sm text-muted-foreground">
                          Kerala Economic Forum , Venture Arcade, Mavoor Rd, above Croma, Thondayad, Kozhikode, Kerala
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Caliph Life School, Puduppadi, Thamarassery, Kerala 673586, India
                        </span>
                      </div>
                    </li>
                  </ul>
                  
                  <div className="flex gap-3">
                    <a 
                      href="https://www.instagram.com/keralastartupfest/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-muted hover:bg-primary/10 transition-colors" 
                      data-testid="footer-link-instagram"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5 text-muted-foreground hover:text-primary" />
                    </a>
                    <a 
                      href="https://www.facebook.com/share/1AohFaocTo/?mibextid=wwXIfr" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-muted hover:bg-primary/10 transition-colors" 
                      data-testid="footer-link-facebook"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5 text-muted-foreground hover:text-primary" />
                    </a>
                    <a 
                      href="https://www.youtube.com/@KeralaStartupFest" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-muted hover:bg-primary/10 transition-colors" 
                      data-testid="footer-link-youtube"
                      aria-label="YouTube"
                    >
                      <Youtube className="w-5 h-5 text-muted-foreground hover:text-primary" />
                    </a>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div>
                  <h4 className="font-semibold mb-4">Partner with KSF</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Join hands with Kerala Startup Fest and support Kerala's startup ecosystem.
                  </p>
                  <Link href="/partners">
                    <Button size="sm" variant="outline" className="font-semibold" data-testid="footer-button-partner">
                      Become a Partner
                    </Button>
                  </Link>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>

          <motion.div 
            className="border-t border-border py-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground text-center sm:text-left">
                &copy; 2026 Kerala Startup Fest. All rights reserved.
              </p>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-terms">
                  Terms & Conditions
                </Link>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-privacy">
                  Privacy Policy
                </Link>
                <Link href="/refund" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-refund">
                  Refund Policy
                </Link>
                <Link href="/shipping" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-shipping">
                  Shipping Policy
                </Link>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-contact">
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </ScrollFadeUp>
  );
}
