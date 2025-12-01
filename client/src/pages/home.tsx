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
import festivalBgImage from "@assets/stock_images/startup_festival_cro_9d4ccbd6.jpg";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#FF0000]">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-500 to-red-600" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-400/30 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-red-700/50 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
            <Calendar className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">7-8 January 2026</span>
            <span className="text-white/70">|</span>
            <MapPin className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Calicut Beach</span>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-white" data-testid="text-hero-title">
            Kerala Startup Fest
            <span className="block text-yellow-300">2026</span>
          </h1>
          
          <p className="text-xl sm:text-2xl font-medium text-white/90 mb-4 max-w-3xl mx-auto" data-testid="text-hero-subtitle">
            A two-day mega startup festival that turns ideas into action.
          </p>
          
          <p className="text-base sm:text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Kerala Startup Fest (KSF) is a first-of-its-kind event where students, young adults, 
            mentors and investors come together to build real startups. It is not just motivation. 
            It is about learning, pitching, winning, and launching.
          </p>
          
          <div className="flex items-center justify-center gap-2 text-sm text-white/80 mb-10">
            <Users className="w-4 h-4 text-yellow-300" />
            <span>High school to age 29</span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/participate#register">
              <Button size="lg" className="font-semibold text-base px-8 bg-white text-red-600 hover:bg-white/90" data-testid="button-register-hero">
                Register Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="font-semibold text-base px-8 border-white text-white hover:bg-white/10" data-testid="button-brochure">
              Download Brochure
            </Button>
          </div>
        </div>
      </section>

      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${festivalBgImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/85 to-white/95 backdrop-blur-[2px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-8 tracking-tight animate-fade-in-up" 
              data-testid="text-what-is-ksf"
            >
              What is{" "}
              <span className="text-primary">Kerala Startup Fest</span>?
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed animate-fade-in-up animate-delay-200">
              Kerala Startup Fest is a{" "}
              <span className="font-semibold text-primary">two-day startup festival</span>{" "}
              designed to{" "}
              <span className="font-semibold text-primary">transform ideas into real action</span>.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-center shadow-lg border border-gray-100 animate-fade-in-up animate-delay-100 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mx-auto mb-5 icon-hover group-hover:scale-110 transition-transform duration-300">
                <Presentation className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg sm:text-xl mb-3 text-gray-900">Expert Sessions</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                <span className="font-medium text-primary">Theme-based expert sessions</span> from real business leaders
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-center shadow-lg border border-gray-100 animate-fade-in-up animate-delay-200 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center mx-auto mb-5 icon-hover group-hover:scale-110 transition-transform duration-300">
                <Lightbulb className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="font-bold text-lg sm:text-xl mb-3 text-gray-900">Idea Pitching</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Pitch your ideas to <span className="font-medium text-primary">investors & VCs</span>
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-center shadow-lg border border-gray-100 animate-fade-in-up animate-delay-300 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center mx-auto mb-5 icon-hover group-hover:scale-110 transition-transform duration-300">
                <Award className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="font-bold text-lg sm:text-xl mb-3 text-gray-900">Competitions</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                <span className="font-medium text-primary">Win prizes and funding</span>, not just certificates
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-center shadow-lg border border-gray-100 animate-fade-in-up animate-delay-400 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-5 icon-hover group-hover:scale-110 transition-transform duration-300">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg sm:text-xl mb-3 text-gray-900">VC Networking</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Connect with <span className="font-medium text-primary">venture capitalists</span> & business leaders
              </p>
            </div>
          </div>
        </div>
        
        <div className="wave-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" fill="hsl(189 60% 90%)">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.42,118.92,150.61,71.25,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: "hsl(189 60% 90%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-center mb-12 text-foreground" data-testid="text-why-different">
            Why is KSF Different?
          </h2>
          
          <div className="auto-scroll-wrapper">
            <div className="auto-scroll gap-6 py-4">
              <div className="bg-white rounded-xl px-8 py-5 flex items-center gap-4 flex-shrink-0 shadow-sm border border-gray-100 mx-3">
                <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
                <p className="text-lg font-medium text-gray-800 whitespace-nowrap">Not just "business motivation talks"</p>
              </div>
              
              <div className="bg-white rounded-xl px-8 py-5 flex items-center gap-4 flex-shrink-0 shadow-sm border border-gray-100 mx-3">
                <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
                <p className="text-lg font-medium text-gray-800 whitespace-nowrap">Theme-based expert sessions handled by real business people</p>
              </div>
              
              <div className="bg-white rounded-xl px-8 py-5 flex items-center gap-4 flex-shrink-0 shadow-sm border border-gray-100 mx-3">
                <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
                <p className="text-lg font-medium text-gray-800 whitespace-nowrap">Live idea pitching in front of investors and venture capitalists</p>
              </div>
              
              <div className="bg-white rounded-xl px-8 py-5 flex items-center gap-4 flex-shrink-0 shadow-sm border border-gray-100 mx-3">
                <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
                <p className="text-lg font-medium text-gray-800 whitespace-nowrap">Chance to win prizes and funding, not only certificates</p>
              </div>
              
              <div className="bg-white rounded-xl px-8 py-5 flex items-center gap-4 flex-shrink-0 shadow-sm border border-gray-100 mx-3">
                <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
                <p className="text-lg font-medium text-gray-800 whitespace-nowrap">Open for high school students to youngsters up to 29 years of age</p>
              </div>

              <div className="bg-white rounded-xl px-8 py-5 flex items-center gap-4 flex-shrink-0 shadow-sm border border-gray-100 mx-3">
                <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
                <p className="text-lg font-medium text-gray-800 whitespace-nowrap">Not just "business motivation talks"</p>
              </div>
              
              <div className="bg-white rounded-xl px-8 py-5 flex items-center gap-4 flex-shrink-0 shadow-sm border border-gray-100 mx-3">
                <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
                <p className="text-lg font-medium text-gray-800 whitespace-nowrap">Theme-based expert sessions handled by real business people</p>
              </div>
              
              <div className="bg-white rounded-xl px-8 py-5 flex items-center gap-4 flex-shrink-0 shadow-sm border border-gray-100 mx-3">
                <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
                <p className="text-lg font-medium text-gray-800 whitespace-nowrap">Live idea pitching in front of investors and venture capitalists</p>
              </div>
              
              <div className="bg-white rounded-xl px-8 py-5 flex items-center gap-4 flex-shrink-0 shadow-sm border border-gray-100 mx-3">
                <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
                <p className="text-lg font-medium text-gray-800 whitespace-nowrap">Chance to win prizes and funding, not only certificates</p>
              </div>
              
              <div className="bg-white rounded-xl px-8 py-5 flex items-center gap-4 flex-shrink-0 shadow-sm border border-gray-100 mx-3">
                <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
                <p className="text-lg font-medium text-gray-800 whitespace-nowrap">Open for high school students to youngsters up to 29 years of age</p>
              </div>
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
