import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

export default function Partners() {
  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-6" data-testid="text-partners-title">
              Investors, Mentors & Sponsors
            </h1>
            <p className="text-lg text-muted-foreground">
              Partner with Kerala Startup Fest and be part of Kerala's biggest startup movement.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6" data-testid="text-investor-mentor">
                Join as Investor or Mentor
              </h2>
              <p className="text-muted-foreground mb-6">
                Kerala Startup Fest is a great place to meet fresh minds, early-stage ideas and future founders.
              </p>
              <p className="text-muted-foreground mb-6">As an investor or mentor, you can:</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Discover new ideas early</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Guide young entrepreneurs</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Support promising startups with funding, time or networks</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Be part of a long-term startup movement in Kerala</span>
                </li>
              </ul>
              <Link href="/contact">
                <Button className="font-semibold" data-testid="button-apply-investor">
                  Apply as Investor / Mentor
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent flex items-center justify-center">
                <div className="text-center p-8">
                  <Handshake className="w-24 h-24 text-primary mx-auto mb-6 opacity-80" />
                  <p className="font-serif text-2xl font-bold text-primary">Shape the Future</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent flex items-center justify-center">
                <div className="text-center p-8">
                  <Building2 className="w-24 h-24 text-primary mx-auto mb-6 opacity-80" />
                  <p className="font-serif text-2xl font-bold text-primary">Brand & Impact</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Megaphone className="w-7 h-7 text-primary" />
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6" data-testid="text-sponsor">
                Partner with KSF
              </h2>
              <p className="text-muted-foreground mb-6">
                Kerala Startup Fest is a high-visibility platform with thousands of students, 
                educators, professionals and entrepreneurs.
              </p>
              <p className="text-muted-foreground mb-6">As a sponsor or brand partner, you get:</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Strong brand visibility at the venue and in all materials</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Engagement with young, aspirational audience</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Participation in contests, sessions and media content</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Association with Kerala's new startup movement</span>
                </li>
              </ul>
              <Link href="/contact">
                <Button className="font-semibold" data-testid="button-enquire-sponsorship">
                  Enquire for Sponsorship
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-center mb-12" data-testid="text-why-partner">
            Why Partner with Kerala Startup Fest?
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Card className="hover-elevate">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Support Youth</h3>
                <p className="text-sm text-muted-foreground">
                  Support young entrepreneurs at an early stage
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-elevate">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Create Jobs</h3>
                <p className="text-sm text-muted-foreground">
                  Help launch new startups and create jobs
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-elevate">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Build Goodwill</h3>
                <p className="text-sm text-muted-foreground">
                  Build long-term visibility in the startup ecosystem
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-elevate">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Star className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Positive Impact</h3>
                <p className="text-sm text-muted-foreground">
                  Be part of Kerala's economic growth movement
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 sm:p-12 text-center text-primary-foreground">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
              Become a Partner
            </h2>
            <p className="text-lg opacity-90 max-w-xl mx-auto mb-8">
              Join us in shaping Kerala's startup ecosystem. Contact us to explore partnership opportunities.
            </p>
            <Link href="/contact">
              <Button variant="secondary" size="lg" className="font-semibold" data-testid="button-contact-partners">
                Get in Touch
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
