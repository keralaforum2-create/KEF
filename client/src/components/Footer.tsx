import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Calendar, Users } from "lucide-react";
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
            <motion.div 
              className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl p-8 mb-16 border border-primary/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="max-w-2xl">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4">
                  Be part of Kerala's new startup wave
                </h3>
                <p className="text-muted-foreground mb-6">
                  Join Kerala Startup Fest and help turn ideas into real businesses.
                </p>
                <Link href="/participate#register">
                  <Button size="lg" className="font-semibold" data-testid="button-register-footer">
                    Register Now
                  </Button>
                </Link>
              </div>
            </motion.div>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12" staggerDelay={0.1}>
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
                    <span>High school to age 29</span>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div>
                  <h4 className="font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-about">
                        About KSF
                      </Link>
                    </li>
                    <li>
                      <Link href="/sessions" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-sessions">
                        Sessions
                      </Link>
                    </li>
                    <li>
                      <Link href="/contests" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-contests">
                        Contests
                      </Link>
                    </li>
                    <li>
                      <Link href="/participate" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-participate">
                        How to Participate
                      </Link>
                    </li>
                    <li>
                      <Link href="/partners" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-partners">
                        Partners & Sponsors
                      </Link>
                    </li>
                  </ul>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div>
                  <h4 className="font-semibold mb-4">Contact</h4>
                  <ul className="space-y-3">
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
                      <MapPin className="w-4 h-4 text-primary mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        Caliph Life School, Thammaressery<br />
                        Kozhikode, Kerala, India
                      </span>
                    </li>
                  </ul>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div>
                  <h4 className="font-semibold mb-4">Organised By</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-sm">Kerala Economic Forum</p>
                      <p className="text-xs text-muted-foreground">Promoting Kerala's startup ecosystem</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">Caliph Life School</p>
                      <p className="text-xs text-muted-foreground">India's first Life School</p>
                    </div>
                  </div>
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
              <div className="flex items-center gap-6">
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
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
