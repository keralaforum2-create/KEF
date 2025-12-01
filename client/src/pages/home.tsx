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

      <section className="relative py-24 sm:py-32 overflow-hidden bg-gradient-to-br from-red-100 via-rose-100 to-red-200">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-200/20 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-8 tracking-tight animate-fade-in-up text-gray-900" 
              data-testid="text-what-is-ksf"
            >
              What is{" "}
              <span className="text-red-600">Kerala Startup Fest</span>?
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed animate-fade-in-up animate-delay-200">
              Kerala Startup Fest is a{" "}
              <span className="font-semibold text-red-600">two-day startup festival</span>{" "}
              designed to{" "}
              <span className="font-semibold text-red-600">transform ideas into real action</span>.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-lg border border-gray-100 animate-fade-in-up animate-delay-100 group">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: "hsl(0 100% 50%)" }}>
                <Presentation className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg sm:text-xl mb-3 text-gray-900">Expert Sessions</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                <span className="font-medium text-primary">Theme-based expert sessions</span> from real business leaders
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-lg border border-gray-100 animate-fade-in-up animate-delay-200 group">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: "hsl(45 100% 50%)" }}>
                <Lightbulb className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="font-bold text-lg sm:text-xl mb-3 text-gray-900">Idea Pitching</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Pitch your ideas to <span className="font-medium text-primary">investors & VCs</span>
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-lg border border-gray-100 animate-fade-in-up animate-delay-300 group">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: "hsl(174 100% 29%)" }}>
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg sm:text-xl mb-3 text-gray-900">Competitions</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                <span className="font-medium text-primary">Win prizes and funding</span>, not just certificates
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-lg border border-gray-100 animate-fade-in-up animate-delay-400 group">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: "hsl(263 47% 35%)" }}>
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
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" fill="hsl(174 60% 90%)">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.42,118.92,150.61,71.25,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      <section className="py-20 section-teal-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-center mb-12" data-testid="text-why-different">
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

      <section className="py-20 section-purple-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-8 text-gray-900" data-testid="text-what-happens">
              What Happens at KSF?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
              KSF is built around powerful sessions and exciting contests that cover the full journey of a startup — from idea, to team, to market, to money.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
              {/* Card 1 - Red */}
              <div className="card-stagger-1 group relative bg-gradient-to-br from-red-50 to-red-100/50 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-red-100/50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-200/0 via-transparent to-red-100/0 group-hover:from-red-200/10 group-hover:to-red-100/10 transition-all duration-300" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "hsl(0 100% 50%)" }}>
                    <Presentation className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-serif text-5xl font-bold text-red-600 mb-3">8</p>
                  <p className="font-semibold text-lg text-gray-800 mb-2">Expert Sessions</p>
                  <p className="text-sm text-gray-600">Theme-based masterclasses from industry leaders</p>
                </div>
              </div>

              {/* Card 2 - Yellow */}
              <div className="card-stagger-2 group relative bg-gradient-to-br from-yellow-50 to-yellow-100/50 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-yellow-100/50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/0 via-transparent to-yellow-100/0 group-hover:from-yellow-200/10 group-hover:to-yellow-100/10 transition-all duration-300" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "hsl(45 100% 50%)" }}>
                    <Lightbulb className="w-8 h-8 text-gray-900" />
                  </div>
                  <p className="font-serif text-5xl font-bold text-yellow-600 mb-3">13</p>
                  <p className="font-semibold text-lg text-gray-800 mb-2">Themes</p>
                  <p className="text-sm text-gray-600">Diverse tracks covering all startup aspects</p>
                </div>
              </div>

              {/* Card 3 - Teal */}
              <div className="card-stagger-3 group relative bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-teal-100/50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-200/0 via-transparent to-teal-100/0 group-hover:from-teal-200/10 group-hover:to-teal-100/10 transition-all duration-300" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "hsl(174 100% 29%)" }}>
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-serif text-5xl font-bold text-teal-600 mb-3">7</p>
                  <p className="font-semibold text-lg text-gray-800 mb-2">Contests</p>
                  <p className="text-sm text-gray-600">Compete and win amazing prizes</p>
                </div>
              </div>

              {/* Card 4 - Purple */}
              <div className="card-stagger-4 group relative bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-purple-100/50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200/0 via-transparent to-purple-100/0 group-hover:from-purple-200/10 group-hover:to-purple-100/10 transition-all duration-300" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "hsl(263 47% 35%)" }}>
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-serif text-5xl font-bold text-purple-600 mb-3">100</p>
                  <p className="font-semibold text-lg text-gray-800 mb-2">Target Startups</p>
                  <p className="text-sm text-gray-600">Goal to launch from this festival</p>
                </div>
              </div>

              {/* Card 5 - Red (accent) */}
              <div className="card-stagger-5 group relative bg-gradient-to-br from-rose-50 to-rose-100/50 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-rose-100/50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-200/0 via-transparent to-rose-100/0 group-hover:from-rose-200/10 group-hover:to-rose-100/10 transition-all duration-300" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "hsl(0 100% 50%)" }}>
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-serif text-5xl font-bold text-rose-600 mb-3">2</p>
                  <p className="font-semibold text-lg text-gray-800 mb-2">Mega Days</p>
                  <p className="text-sm text-gray-600">7-8 January 2026 at Calicut Beach</p>
                </div>
              </div>
            </div>
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

      <section className="py-24 sm:py-32 relative overflow-hidden bg-gradient-to-br from-red-500 via-orange-500 to-red-600">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.3) 35px, rgba(255,255,255,0.3) 70px)'
          }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="mb-8 animate-fade-down">
              <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto icon-glow border border-white/20">
                <Target className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white tracking-wider animate-fade-up" data-testid="text-big-goal">
              Our Big Goal
            </h2>
            
            <p className="text-2xl sm:text-3xl font-semibold mb-8 text-white/95 animate-fade-up animate-delay-100">
              Kerala Startup Fest aims to launch{" "}
              <span className="relative inline-block">
                <span className="relative z-10">100 startups</span>
                <span className="absolute bottom-1 left-0 right-0 h-1 bg-yellow-300/50" />
              </span>
              {" "}from this festival.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto mt-12 mb-12">
              <div className="group animate-fade-up animate-delay-200 relative backdrop-blur-md bg-white/10 border border-white/30 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all duration-300">
                    <Lightbulb className="w-6 h-6 text-yellow-300" />
                  </div>
                  <p className="font-bold text-lg text-white mb-1">Democratise</p>
                  <p className="text-sm text-white/80">Entrepreneurship</p>
                </div>
              </div>
              
              <div className="group animate-fade-up animate-delay-300 relative backdrop-blur-md bg-white/10 border border-white/30 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all duration-300">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-bold text-lg text-white mb-1">Empower</p>
                  <p className="text-sm text-white/80">School & College Youth</p>
                </div>
              </div>
              
              <div className="group animate-fade-up animate-delay-400 relative backdrop-blur-md bg-white/10 border border-white/30 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all duration-300">
                    <TrendingUp className="w-6 h-6 text-cyan-300" />
                  </div>
                  <p className="font-bold text-lg text-white mb-1">Bridge</p>
                  <p className="text-sm text-white/80">Education & Execution</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
              <div className="animate-fade-up animate-delay-500 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-2xl font-bold text-white">5K+</p>
                <p className="text-xs text-white/80 mt-1">Students Impacted</p>
              </div>
              <div className="animate-fade-up animate-delay-500 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-2xl font-bold text-white">400+</p>
                <p className="text-xs text-white/80 mt-1">Teams Participating</p>
              </div>
              <div className="animate-fade-up animate-delay-500 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-2xl font-bold text-white">2</p>
                <p className="text-xs text-white/80 mt-1">Mega Days</p>
              </div>
              <div className="animate-fade-up animate-delay-500 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-2xl font-bold text-white">100</p>
                <p className="text-xs text-white/80 mt-1">Target Startups</p>
              </div>
            </div>
            
            <div className="animate-fade-up animate-delay-500">
              <Link href="/participate#register">
                <Button size="lg" className="font-semibold text-base px-8 bg-white text-red-600 hover:bg-yellow-300 transition-all duration-300" data-testid="button-be-part-of-mission">
                  Be Part of the 100 Startups
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="wave-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" fill="white">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.42,118.92,150.61,71.25,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      <section className="py-20 section-yellow-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-center mb-4" data-testid="text-who-can-join">
            Who Can Join KSF?
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            KSF welcomes participants from different backgrounds and roles.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover-elevate bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "hsl(0 100% 50%)" }}>
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Students & Young People</h3>
                <p className="text-sm text-muted-foreground mb-2">(13-29 years)</p>
                <p className="text-muted-foreground">
                  Learn, compete, pitch ideas, and start your business journey.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-elevate bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "hsl(45 100% 50%)" }}>
                  <Building2 className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Schools & Colleges</h3>
                <p className="text-muted-foreground">
                  Send your students, form teams, and build a strong startup culture on campus.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-elevate bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "hsl(174 100% 29%)" }}>
                  <HandshakeIcon className="w-8 h-8 text-white" />
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

      <section className="py-20 section-teal-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-center mb-12" data-testid="text-organised-by">
            Organised By
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover-elevate bg-white">
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
            
            <Card className="hover-elevate bg-white">
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
