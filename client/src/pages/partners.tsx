import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
  Users, 
  TrendingUp, 
  Lightbulb, 
  Heart, 
  Building2, 
  Megaphone,
  Eye,
  Handshake,
  ArrowRight,
  CheckCircle2,
  Star
} from "lucide-react";
import {
  ScrollFadeUp,
  ScrollFadeLeft,
  ScrollFadeRight,
  StaggerContainer,
  StaggerItem
} from "@/lib/animations";
import investorImage from "@assets/Building Strong Relationships for Business Growth with a B2B PR_1764503880578.jpg";
import partnershipImage from "@assets/WhatsApp Image 2025-11-30 at 14.13.34_f7725a9a_1764492241523.jpg";

export default function Partners() {
  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeUp>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-6" data-testid="text-partners-title">
                Investors, Mentors & Sponsors
              </h1>
              <p className="text-lg text-muted-foreground">
                Partner with Kerala Startup Fest and be part of Kerala's biggest startup movement.
              </p>
            </div>
          </ScrollFadeUp>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollFadeLeft>
              <div>
                <motion.div 
                  className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <Users className="w-7 h-7 text-primary" />
                </motion.div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6" data-testid="text-investor-mentor">
                  Join as Investor or Mentor
                </h2>
                <p className="text-muted-foreground mb-6">
                  Kerala Startup Fest is a great place to meet fresh minds, early-stage ideas and future founders.
                </p>
                <p className="text-muted-foreground mb-6">As an investor or mentor, you can:</p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Discover new ideas early",
                    "Guide young entrepreneurs",
                    "Support promising startups with funding, time or networks",
                    "Be part of a long-term startup movement in Kerala"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <Link href="/contact">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Button className="font-semibold" data-testid="button-apply-investor">
                      Apply as Investor / Mentor
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </ScrollFadeLeft>
            <ScrollFadeRight>
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={investorImage} 
                  alt="Business Partnership" 
                  className="w-full h-full rounded-3xl object-cover shadow-lg"
                />
              </motion.div>
            </ScrollFadeRight>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollFadeLeft className="order-2 lg:order-1">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={partnershipImage} 
                  alt="Partnership and Investment" 
                  className="w-full h-full rounded-3xl object-cover shadow-lg"
                />
              </motion.div>
            </ScrollFadeLeft>
            <ScrollFadeRight className="order-1 lg:order-2">
              <div>
                <motion.div 
                  className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <Megaphone className="w-7 h-7 text-primary" />
                </motion.div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6" data-testid="text-sponsor">
                  Partner with KSF
                </h2>
                <p className="text-muted-foreground mb-6">
                  Kerala Startup Fest is a high-visibility platform with thousands of students, 
                  educators, professionals and entrepreneurs.
                </p>
                <p className="text-muted-foreground mb-6">As a sponsor or brand partner, you get:</p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Strong brand visibility at the venue and in all materials",
                    "Engagement with young, aspirational audience",
                    "Participation in contests, sessions and media content",
                    "Association with Kerala's new startup movement"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <Link href="/contact">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Button className="font-semibold" data-testid="button-enquire-sponsorship">
                      Enquire for Sponsorship
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </ScrollFadeRight>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeUp>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-center mb-12" data-testid="text-why-partner">
              Why Partner with Kerala Startup Fest?
            </h2>
          </ScrollFadeUp>
          
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto" staggerDelay={0.1}>
            <StaggerItem>
              <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="h-full">
                  <CardContent className="p-6 text-center">
                    <motion.div 
                      className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <Heart className="w-7 h-7 text-primary" />
                    </motion.div>
                    <h3 className="font-semibold mb-2">Support Youth</h3>
                    <p className="text-sm text-muted-foreground">
                      Support young entrepreneurs at an early stage
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
            
            <StaggerItem>
              <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="h-full">
                  <CardContent className="p-6 text-center">
                    <motion.div 
                      className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <TrendingUp className="w-7 h-7 text-primary" />
                    </motion.div>
                    <h3 className="font-semibold mb-2">Create Jobs</h3>
                    <p className="text-sm text-muted-foreground">
                      Help launch new startups and create jobs
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
            
            <StaggerItem>
              <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="h-full">
                  <CardContent className="p-6 text-center">
                    <motion.div 
                      className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <Eye className="w-7 h-7 text-primary" />
                    </motion.div>
                    <h3 className="font-semibold mb-2">Build Goodwill</h3>
                    <p className="text-sm text-muted-foreground">
                      Build long-term visibility in the startup ecosystem
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
            
            <StaggerItem>
              <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="h-full">
                  <CardContent className="p-6 text-center">
                    <motion.div 
                      className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <Star className="w-7 h-7 text-primary" />
                    </motion.div>
                    <h3 className="font-semibold mb-2">Positive Impact</h3>
                    <p className="text-sm text-muted-foreground">
                      Be part of Kerala's economic growth movement
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeUp>
            <motion.div 
              className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 sm:p-12 text-center text-primary-foreground"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
                Become a Partner
              </h2>
              <p className="text-lg opacity-90 max-w-xl mx-auto mb-8">
                Join us in shaping Kerala's startup ecosystem. Contact us to explore partnership opportunities.
              </p>
              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="secondary" size="lg" className="font-semibold" data-testid="button-contact-partners">
                    Get in Touch
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </ScrollFadeUp>
        </div>
      </section>
    </div>
  );
}
