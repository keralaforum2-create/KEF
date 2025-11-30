import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Lightbulb, 
  Target, 
  Presentation, 
  TrendingUp, 
  Award,
  ArrowRight,
  Rocket,
  BookOpen,
  Briefcase,
  GraduationCap,
  Building2,
  HandshakeIcon
} from "lucide-react";
import califphLifeSchoolLogo from "@assets/PhotoshopExtension_Image_1764498269153.png";
import keralaEconomicForumLogo from "@assets/KERALA ECONOMIC FORUM LOGO RESOLUTION 00_1764498454572.png";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">7-8 January 2026</span>
            <span className="text-muted-foreground">|</span>
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Calicut Beach</span>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight" data-testid="text-hero-title">
            Kerala Startup Fest
            <span className="block text-primary">2026</span>
          </h1>
          
          <p className="text-xl sm:text-2xl font-medium text-muted-foreground mb-4 max-w-3xl mx-auto" data-testid="text-hero-subtitle">
            A two-day mega startup festival that turns ideas into action.
          </p>
          
          <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Kerala Startup Fest (KSF) is a first-of-its-kind event where students, young adults, 
            mentors and investors come together to build real startups. It is not just motivation. 
            It is about learning, pitching, winning, and launching.
          </p>
          
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-10">
            <Users className="w-4 h-4 text-primary" />
            <span>High school to age 29</span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/participate#register">
              <Button size="lg" className="font-semibold text-base px-8" data-testid="button-register-hero">
                Register Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="font-semibold text-base px-8" data-testid="button-brochure">
              Download Brochure
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 section-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6" data-testid="text-what-is-ksf">
              What is Kerala Startup Fest?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Kerala Startup Fest is a two-day startup festival designed to transform ideas into real action. 
              Thousands of students and young people will attend theme-based expert sessions, take part in contests, 
              pitch their ideas, and get a chance to win prizes and capital from venture capitalists and 
              business leaders present at the venue.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 section-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-center mb-4 text-foreground" data-testid="text-why-different">
            Why is KSF Different?
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto font-medium">
            This isn't your typical startup event. Here's what sets us apart.
          </p>
          
          <div className="flex overflow-x-hidden gap-6 pb-4 scrollbar-hide auto-scroll">
            <div className="bg-white rounded-xl p-6 hover-elevate flex-shrink-0 w-80 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-yellow-900">Not Just Motivation Talks</h3>
              <p className="text-yellow-800/70 text-sm">
                Real, practical sessions designed to give you actionable knowledge.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 hover-elevate flex-shrink-0 w-80 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-yellow-900">Expert-Led Sessions</h3>
              <p className="text-yellow-800/70 text-sm">
                Theme-based sessions handled by real business people, not just speakers.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 hover-elevate flex-shrink-0 w-80 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-4">
                <Presentation className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-yellow-900">Live Idea Pitching</h3>
              <p className="text-yellow-800/70 text-sm">
                Pitch your ideas directly in front of investors and venture capitalists.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 hover-elevate flex-shrink-0 w-80 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-yellow-900">Win Prizes & Funding</h3>
              <p className="text-yellow-800/70 text-sm">
                Chance to win prizes and funding, not just certificates.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 hover-elevate flex-shrink-0 w-80 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-yellow-900">Open to All Ages</h3>
              <p className="text-yellow-800/70 text-sm">
                From high school students to youngsters up to 29 years of age.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 hover-elevate flex-shrink-0 w-80 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-yellow-900">Real Action</h3>
              <p className="text-yellow-800/70 text-sm">
                Build real startups, not just business plans on paper.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 hover-elevate flex-shrink-0 w-80 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-yellow-900">Not Just Motivation Talks</h3>
              <p className="text-yellow-800/70 text-sm">
                Real, practical sessions designed to give you actionable knowledge.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 hover-elevate flex-shrink-0 w-80 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-yellow-900">Expert-Led Sessions</h3>
              <p className="text-yellow-800/70 text-sm">
                Theme-based sessions handled by real business people, not just speakers.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 hover-elevate flex-shrink-0 w-80 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-4">
                <Presentation className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-yellow-900">Live Idea Pitching</h3>
              <p className="text-yellow-800/70 text-sm">
                Pitch your ideas directly in front of investors and venture capitalists.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 hover-elevate flex-shrink-0 w-80 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-yellow-900">Win Prizes & Funding</h3>
              <p className="text-yellow-800/70 text-sm">
                Chance to win prizes and funding, not just certificates.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 hover-elevate flex-shrink-0 w-80 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-yellow-900">Open to All Ages</h3>
              <p className="text-yellow-800/70 text-sm">
                From high school students to youngsters up to 29 years of age.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 hover-elevate flex-shrink-0 w-80 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-yellow-900">Real Action</h3>
              <p className="text-yellow-800/70 text-sm">
                Build real startups, not just business plans on paper.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-8" data-testid="text-what-happens">
              What Happens at KSF?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl p-8 border border-primary/20 hover-elevate">
                <div className="w-14 h-14 rounded-xl bg-primary/30 flex items-center justify-center mx-auto mb-4">
                  <Presentation className="w-7 h-7 text-primary" />
                </div>
                <p className="font-serif text-4xl font-bold text-primary mb-2">8</p>
                <p className="font-semibold text-lg text-foreground">Expert Sessions</p>
                <p className="text-sm text-muted-foreground mt-2">Theme-based masterclasses from industry leaders</p>
              </div>
              
              <div className="bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl p-8 border border-secondary/20 hover-elevate">
                <div className="w-14 h-14 rounded-xl bg-secondary/30 flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-7 h-7 text-secondary" />
                </div>
                <p className="font-serif text-4xl font-bold text-secondary mb-2">13</p>
                <p className="font-semibold text-lg text-foreground">Themes Covered</p>
                <p className="text-sm text-muted-foreground mt-2">From ideas to execution and everything in between</p>
              </div>
              
              <div className="bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl p-8 border border-accent/20 hover-elevate">
                <div className="w-14 h-14 rounded-xl bg-accent/30 flex items-center justify-center mx-auto mb-4">
                  <Award className="w-7 h-7 text-accent" />
                </div>
                <p className="font-serif text-4xl font-bold text-accent mb-2">7</p>
                <p className="font-semibold text-lg text-foreground">Contests</p>
                <p className="text-sm text-muted-foreground mt-2">Compete, showcase, and win amazing prizes</p>
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              KSF is built around powerful sessions and exciting contests that cover the full journey of a 
              startup — from idea, to team, to market, to money.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Link href="/sessions">
              <Button size="lg" variant="outline" className="font-semibold" data-testid="button-explore-sessions">
                Explore Sessions & Contests
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 sm:p-12 text-center text-primary-foreground">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6" data-testid="text-big-goal">
              Our Big Goal
            </h2>
            <p className="text-xl sm:text-2xl font-medium mb-6 opacity-90">
              Kerala Startup Fest aims to launch <span className="font-bold">100 startups</span> from this festival.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-8">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="font-semibold">Democratise</p>
                <p className="text-sm opacity-80">Entrepreneurship</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="font-semibold">Empower</p>
                <p className="text-sm opacity-80">School & College Youth</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="font-semibold">Bridge</p>
                <p className="text-sm opacity-80">Education & Execution</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-center mb-4" data-testid="text-who-can-join">
            Who Can Join KSF?
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            KSF welcomes participants from different backgrounds and roles.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover-elevate">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Students & Young People</h3>
                <p className="text-sm text-muted-foreground mb-2">(13-29 years)</p>
                <p className="text-muted-foreground">
                  Learn, compete, pitch ideas, and start your business journey.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-elevate">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Schools & Colleges</h3>
                <p className="text-muted-foreground">
                  Send your students, form teams, and build a strong startup culture on campus.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-elevate">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <HandshakeIcon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Mentors & Investors</h3>
                <p className="text-muted-foreground">
                  Guide young founders, discover fresh ideas, and support real ventures.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center mt-10">
            <Link href="/participate">
              <Button size="lg" className="font-semibold" data-testid="button-how-to-participate">
                See How to Participate
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-center mb-12" data-testid="text-organised-by">
            Organised By
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover-elevate">
              <CardContent className="p-8">
                <div className="mb-6 flex items-center justify-center">
                  <img src={califphLifeSchoolLogo} alt="Caliph Life School" className="h-20 w-auto object-contain" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Caliph Life School</h3>
                <p className="text-muted-foreground">
                  India's first Life School, focusing on real-life skills, entrepreneurship and holistic education.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-elevate">
              <CardContent className="p-8">
                <div className="mb-6 flex items-center justify-center">
                  <img src={keralaEconomicForumLogo} alt="Kerala Economic Forum" className="h-20 w-auto object-contain" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Kerala Economic Forum</h3>
                <p className="text-muted-foreground">
                  A platform to promote business, startups and entrepreneurs in Kerala.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
