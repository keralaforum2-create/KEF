import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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
  HandshakeIcon,
  Download
} from "lucide-react";
import {
  HeroAnimation,
  HeroSubAnimation,
  ScrollFadeUp,
  ScrollFadeLeft,
  ScrollFadeRight,
  StaggerContainer,
  StaggerItem,
  CardWave,
  PulsingGlow,
  ScrollFadeDown
} from "@/lib/animations";
import waveElement from "@assets/keral_startup_element_1764698110061.png";
import cubeLogo from "@assets/cube_1764739470058.png";
import caliphLifeSchoolLogo from "@assets/PhotoshopExtension_Image-removebg-preview_1764739146810.png";
import keralaEconomicForumLogo from "@assets/Screenshot_2025-11-29_222342-removebg-preview-removebg-preview_1764759226182.png";
import ksfHandbook from "@assets/KSF_HANDBOOK_KEF_1764768821195.pdf";

export default function Home() {
  const partnersRef = useRef<HTMLDivElement>(null);
  const partnersInView = useInView(partnersRef, { once: true, margin: "-50px" });

  return (
    <div className="min-h-screen">
      {/* Hero Section with New Design */}
      <section className="relative min-h-[100vh] flex flex-col justify-between overflow-hidden bg-white">
        {/* Large faded background text */}
        <div className="bg-text-large hidden lg:block">FEST'26</div>
        
        {/* Main Content */}
        <div className="relative z-10 flex-grow flex items-center pt-8 md:pt-12">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Left - Rotating 3D Cube Logo */}
              <HeroAnimation>
                <motion.div 
                  className="flex justify-center lg:justify-center order-2 lg:order-1"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className="rotating-logo-container" data-testid="rotating-cube-logo">
                    <img 
                      src={cubeLogo} 
                      alt="Kerala Startup Fest Logo" 
                      className="rotating-logo w-72 sm:w-80 md:w-96 lg:w-[420px] h-auto"
                    />
                  </div>
                </motion.div>
              </HeroAnimation>
              
              {/* Right - Text Content */}
              <div className="text-center lg:text-left order-1 lg:order-2">
                <HeroSubAnimation delay={0.2}>
                  <p className="hero-tagline text-sm sm:text-base font-medium tracking-[0.25em] text-gray-400 mb-6 uppercase">
                    First of its kind in the state
                  </p>
                </HeroSubAnimation>
                
                <HeroAnimation>
                  <motion.h1 
                    className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight text-gray-800 leading-[0.9]" 
                    data-testid="text-hero-title"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                  >
                    KERALA<br />
                    STARTUP<br />
                    <span className="inline-flex items-baseline">
                      FEST<span className="text-red-600">`26</span>
                    </span>
                  </motion.h1>
                </HeroAnimation>
                
                <HeroSubAnimation delay={0.5}>
                  <div className="mb-10">
                    <p className="text-xl sm:text-2xl font-bold text-gray-700 mb-1 tracking-wide">
                      2026 JAN 7-8
                    </p>
                    <p className="text-lg sm:text-xl font-semibold text-gray-500 tracking-widest">
                      KOZHIKODE
                    </p>
                  </div>
                </HeroSubAnimation>
                
                <HeroSubAnimation delay={0.6}>
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                    <Link href="/participate#register">
                      <div 
                        className="relative p-[3px] rounded-md min-w-[200px] shadow-xl"
                        style={{
                          background: 'linear-gradient(90deg, #1E3A8A 0%, #1E3A8A 25%, #DC2626 25%, #DC2626 50%, #FACC15 50%, #FACC15 75%, #0D9488 75%, #0D9488 100%)'
                        }}
                        data-testid="button-register-hero"
                      >
                        <Button 
                          size="lg" 
                          className="font-bold text-base px-10 py-6 bg-white text-gray-800 w-full text-lg border-0 rounded-[4px]" 
                        >
                          Register Now
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </div>
                    </Link>
                    <a href={ksfHandbook} download="KSF_Handbook.pdf">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="font-bold text-base px-10 py-6 border-2 border-gray-700 text-gray-700 min-w-[200px] text-lg" 
                        data-testid="button-brochure"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Download Brochure
                      </Button>
                    </a>
                  </div>
                </HeroSubAnimation>
              </div>
            </div>
          </div>
        </div>
        
      </section>

      {/* What is Kerala Startup Fest Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden bg-gradient-to-br from-yellow-100 via-yellow-50 to-amber-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-200/20 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <ScrollFadeUp>
              <h2 
                className="section-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-8 tracking-tight text-gray-900" 
                data-testid="text-what-is-ksf"
              >
                What is{" "}
                <span className="text-red-600">Kerala Startup Fest</span>?
              </h2>
            </ScrollFadeUp>
            <ScrollFadeUp delay={0.1}>
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                Kerala Startup Fest is a{" "}
                <span className="font-semibold text-red-600">two-day startup festival</span>{" "}
                designed to{" "}
                <span className="font-semibold text-red-600">transform ideas into real action</span>.
              </p>
            </ScrollFadeUp>
          </div>
          
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8" staggerDelay={0.1}>
            <StaggerItem>
              <Link href="/sessions" data-testid="link-expert-sessions">
                <div 
                  className="relative p-[3px] rounded-2xl shadow-lg hover-elevate cursor-pointer h-full"
                  style={{
                    background: 'linear-gradient(90deg, #1E3A8A 0%, #1E3A8A 25%, #DC2626 25%, #DC2626 50%, #FACC15 50%, #FACC15 75%, #0D9488 75%, #0D9488 100%)'
                  }}
                >
                  <div className="bg-white rounded-[13px] p-6 sm:p-8 text-center h-full">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" 
                      style={{ backgroundColor: "hsl(174 100% 29%)" }}
                    >
                      <Presentation className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-lg sm:text-xl mb-3 text-gray-900">Expert Sessions</h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      <span className="font-medium text-primary">Theme-based expert sessions</span> from real business leaders
                    </p>
                  </div>
                </div>
              </Link>
            </StaggerItem>
            
            <StaggerItem>
              <Link href="/participate" data-testid="link-idea-pitching">
                <div 
                  className="relative p-[3px] rounded-2xl shadow-lg hover-elevate cursor-pointer h-full"
                  style={{
                    background: 'linear-gradient(90deg, #1E3A8A 0%, #1E3A8A 25%, #DC2626 25%, #DC2626 50%, #FACC15 50%, #FACC15 75%, #0D9488 75%, #0D9488 100%)'
                  }}
                >
                  <div className="bg-white rounded-[13px] p-6 sm:p-8 text-center h-full">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" 
                      style={{ backgroundColor: "hsl(174 100% 29%)" }}
                    >
                      <Lightbulb className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-lg sm:text-xl mb-3 text-gray-900">Idea Pitching</h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Pitch your ideas to <span className="font-medium text-primary">investors & VCs</span>
                    </p>
                  </div>
                </div>
              </Link>
            </StaggerItem>
            
            <StaggerItem>
              <Link href="/contests" data-testid="link-competitions">
                <div 
                  className="relative p-[3px] rounded-2xl shadow-lg hover-elevate cursor-pointer h-full"
                  style={{
                    background: 'linear-gradient(90deg, #1E3A8A 0%, #1E3A8A 25%, #DC2626 25%, #DC2626 50%, #FACC15 50%, #FACC15 75%, #0D9488 75%, #0D9488 100%)'
                  }}
                >
                  <div className="bg-white rounded-[13px] p-6 sm:p-8 text-center h-full">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" 
                      style={{ backgroundColor: "hsl(174 100% 29%)" }}
                    >
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-lg sm:text-xl mb-3 text-gray-900">Competitions</h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      <span className="font-medium text-primary">Win prizes and funding</span>, not just certificates
                    </p>
                  </div>
                </div>
              </Link>
            </StaggerItem>
            
            <StaggerItem>
              <Link href="/partners" data-testid="link-vc-networking">
                <div 
                  className="relative p-[3px] rounded-2xl shadow-lg hover-elevate cursor-pointer h-full"
                  style={{
                    background: 'linear-gradient(90deg, #1E3A8A 0%, #1E3A8A 25%, #DC2626 25%, #DC2626 50%, #FACC15 50%, #FACC15 75%, #0D9488 75%, #0D9488 100%)'
                  }}
                >
                  <div className="bg-white rounded-[13px] p-6 sm:p-8 text-center h-full">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" 
                      style={{ backgroundColor: "hsl(174 100% 29%)" }}
                    >
                      <Briefcase className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-lg sm:text-xl mb-3 text-gray-900">Networking</h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Connect with <span className="font-medium text-primary">entrepreneurs</span> and business leaders
                    </p>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          </StaggerContainer>
        </div>
        
        <div className="wave-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" fill="hsl(174 60% 90%)">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.42,118.92,150.61,71.25,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Why is KSF Different Section */}
      <section className="py-20 section-teal-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeUp>
            <h2 className="section-heading text-3xl sm:text-4xl font-bold text-center mb-12" data-testid="text-why-different">
              Why is KSF Different?
            </h2>
          </ScrollFadeUp>
          
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
                <p className="text-lg font-medium text-gray-800 whitespace-nowrap">Live pitching in front of investors</p>
              </div>
              
              <div className="bg-white rounded-xl px-8 py-5 flex items-center gap-4 flex-shrink-0 shadow-sm border border-gray-100 mx-3">
                <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
                <p className="text-lg font-medium text-gray-800 whitespace-nowrap">Chance to win prizes and funding, not only certificates</p>
              </div>
              
              <div className="bg-white rounded-xl px-8 py-5 flex items-center gap-4 flex-shrink-0 shadow-sm border border-gray-100 mx-3">
                <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
                <p className="text-lg font-medium text-gray-800 whitespace-nowrap">Open for school students and youngsters</p>
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
                <p className="text-lg font-medium text-gray-800 whitespace-nowrap">Live pitching in front of investors</p>
              </div>
              
              <div className="bg-white rounded-xl px-8 py-5 flex items-center gap-4 flex-shrink-0 shadow-sm border border-gray-100 mx-3">
                <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
                <p className="text-lg font-medium text-gray-800 whitespace-nowrap">Chance to win prizes and funding, not only certificates</p>
              </div>
              
              <div className="bg-white rounded-xl px-8 py-5 flex items-center gap-4 flex-shrink-0 shadow-sm border border-gray-100 mx-3">
                <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
                <p className="text-lg font-medium text-gray-800 whitespace-nowrap">Open for school students and youngsters</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens at KSF Section with Wave Animation */}
      <section className="py-20 section-purple-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <ScrollFadeUp>
              <h2 className="section-heading text-4xl sm:text-5xl font-bold mb-8 text-gray-900" data-testid="text-what-happens">
                What Happens at KSF?
              </h2>
            </ScrollFadeUp>
            <ScrollFadeUp delay={0.1}>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
                KSF is built around powerful sessions and exciting contests that cover the full journey of a startup — from idea, to team, to market, to money.
              </p>
            </ScrollFadeUp>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 mb-12">
              {/* Card 1 - 2 Mega Days */}
              <CardWave index={0}>
                <div className="group relative bg-gradient-to-br from-red-50 to-red-100/50 rounded-2xl p-6 shadow-md border border-red-100/50 overflow-hidden h-full hover-elevate">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-200/0 via-transparent to-red-100/0 group-hover:from-red-200/10 group-hover:to-red-100/10 transition-all duration-300" />
                  <div className="relative z-10 text-center">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" 
                      style={{ backgroundColor: "hsl(0 100% 50%)" }}
                    >
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-serif text-4xl font-bold text-red-600 mb-2">2</p>
                    <p className="font-semibold text-sm text-gray-800">Mega Days</p>
                  </div>
                </div>
              </CardWave>

              {/* Card 2 - 4 Contests */}
              <CardWave index={1}>
                <div className="group relative bg-gradient-to-br from-yellow-50 to-yellow-100/50 rounded-2xl p-6 shadow-md border border-yellow-100/50 overflow-hidden h-full hover-elevate">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/0 via-transparent to-yellow-100/0 group-hover:from-yellow-200/10 group-hover:to-yellow-100/10 transition-all duration-300" />
                  <div className="relative z-10 text-center">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" 
                      style={{ backgroundColor: "hsl(45 100% 50%)" }}
                    >
                      <Award className="w-6 h-6 text-gray-900" />
                    </div>
                    <p className="font-serif text-4xl font-bold text-yellow-600 mb-2">4</p>
                    <p className="font-semibold text-sm text-gray-800">Contests</p>
                  </div>
                </div>
              </CardWave>

              {/* Card 3 - 10 Themes */}
              <CardWave index={2}>
                <div className="group relative bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-2xl p-6 shadow-md border border-teal-100/50 overflow-hidden h-full hover-elevate">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-200/0 via-transparent to-teal-100/0 group-hover:from-teal-200/10 group-hover:to-teal-100/10 transition-all duration-300" />
                  <div className="relative z-10 text-center">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" 
                      style={{ backgroundColor: "hsl(174 100% 29%)" }}
                    >
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-serif text-4xl font-bold text-teal-600 mb-2">10</p>
                    <p className="font-semibold text-sm text-gray-800">Themes</p>
                  </div>
                </div>
              </CardWave>

              {/* Card 4 - 20 Investors */}
              <CardWave index={3}>
                <div className="group relative bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-6 shadow-md border border-purple-100/50 overflow-hidden h-full hover-elevate">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-200/0 via-transparent to-purple-100/0 group-hover:from-purple-200/10 group-hover:to-purple-100/10 transition-all duration-300" />
                  <div className="relative z-10 text-center">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" 
                      style={{ backgroundColor: "hsl(263 47% 35%)" }}
                    >
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-serif text-4xl font-bold text-purple-600 mb-2">20</p>
                    <p className="font-semibold text-sm text-gray-800">Investors</p>
                  </div>
                </div>
              </CardWave>

              {/* Card 5 - 40 Speakers */}
              <CardWave index={4}>
                <div className="group relative bg-gradient-to-br from-rose-50 to-rose-100/50 rounded-2xl p-6 shadow-md border border-rose-100/50 overflow-hidden h-full hover-elevate">
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-200/0 via-transparent to-rose-100/0 group-hover:from-rose-200/10 group-hover:to-rose-100/10 transition-all duration-300" />
                  <div className="relative z-10 text-center">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" 
                      style={{ backgroundColor: "hsl(0 100% 50%)" }}
                    >
                      <Presentation className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-serif text-4xl font-bold text-rose-600 mb-2">40</p>
                    <p className="font-semibold text-sm text-gray-800">Speakers</p>
                  </div>
                </div>
              </CardWave>

              {/* Card 6 - 100 Target Startups */}
              <CardWave index={5}>
                <div className="group relative bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 shadow-md border border-blue-100/50 overflow-hidden h-full hover-elevate">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-200/0 via-transparent to-blue-100/0 group-hover:from-blue-200/10 group-hover:to-blue-100/10 transition-all duration-300" />
                  <div className="relative z-10 text-center">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" 
                      style={{ backgroundColor: "hsl(220 70% 50%)" }}
                    >
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-serif text-4xl font-bold text-blue-600 mb-2">100</p>
                    <p className="font-semibold text-sm text-gray-800">Target Startups</p>
                  </div>
                </div>
              </CardWave>

              {/* Card 7 - 1000+ Participants */}
              <CardWave index={6}>
                <div className="group relative bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-6 shadow-md border border-green-100/50 overflow-hidden h-full hover-elevate">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-200/0 via-transparent to-green-100/0 group-hover:from-green-200/10 group-hover:to-green-100/10 transition-all duration-300" />
                  <div className="relative z-10 text-center">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" 
                      style={{ backgroundColor: "hsl(140 70% 40%)" }}
                    >
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-serif text-3xl font-bold text-green-600 mb-2">1000+</p>
                    <p className="font-semibold text-sm text-gray-800">Participants</p>
                  </div>
                </div>
              </CardWave>
            </div>
          </div>
          
          <ScrollFadeUp>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link href="/sessions">
                <Button size="lg" variant="outline" className="font-semibold" data-testid="button-explore-sessions">
                  Explore Sessions
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/contests">
                <Button size="lg" variant="outline" className="font-semibold" data-testid="button-explore-contests">
                  Explore Contests
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </ScrollFadeUp>
        </div>
      </section>

      {/* Our Big Goal Section with Pulsing Glow */}
      <section className="py-24 sm:py-32 relative overflow-hidden bg-gradient-to-br from-red-600 via-red-500 to-red-700">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.3) 35px, rgba(255,255,255,0.3) 70px)'
          }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <ScrollFadeDown>
              <div className="mb-8">
                <PulsingGlow className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto border border-white/20">
                  <Target className="w-12 h-12 text-white" />
                </PulsingGlow>
              </div>
            </ScrollFadeDown>
            
            <ScrollFadeDown delay={0.1}>
              <h2 className="section-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white tracking-wider" data-testid="text-big-goal">
                Our Big Goal
              </h2>
            </ScrollFadeDown>
            
            <ScrollFadeUp delay={0.2}>
              <p className="text-2xl sm:text-3xl font-semibold mb-8 text-white/95">
                Kerala Startup Fest aims to launch{" "}
                <span className="font-bold">100 startups</span>
                {" "}from this festival.
              </p>
            </ScrollFadeUp>
            
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto mt-12 mb-12" staggerDelay={0.1}>
              <StaggerItem>
                <div className="group relative backdrop-blur-md bg-white/10 border border-white/30 rounded-2xl p-8 transition-all duration-300 hover-elevate">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all duration-300">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-bold text-lg text-white mb-1">Democratise</p>
                    <p className="text-sm text-white/80">Entrepreneurship</p>
                  </div>
                </div>
              </StaggerItem>
              
              <StaggerItem>
                <div className="group relative backdrop-blur-md bg-white/10 border border-white/30 rounded-2xl p-8 transition-all duration-300 hover-elevate">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all duration-300">
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-bold text-lg text-white mb-1">Empower</p>
                    <p className="text-sm text-white/80">School & College Youth</p>
                  </div>
                </div>
              </StaggerItem>
              
              <StaggerItem>
                <div className="group relative backdrop-blur-md bg-white/10 border border-white/30 rounded-2xl p-8 transition-all duration-300 hover-elevate">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all duration-300">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-bold text-lg text-white mb-1">Bridge</p>
                    <p className="text-sm text-white/80">Education & Execution</p>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
            
            <StaggerContainer className="grid grid-cols-2 gap-4 max-w-xl mx-auto mb-12" staggerDelay={0.05}>
              <StaggerItem>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <p className="text-2xl font-bold text-white">5K+</p>
                  <p className="text-xs text-white/80 mt-1">Students Impacted</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <p className="text-2xl font-bold text-white">400+</p>
                  <p className="text-xs text-white/80 mt-1">Teams Participating</p>
                </div>
              </StaggerItem>
            </StaggerContainer>
            
            <ScrollFadeUp delay={0.3}>
              <Link href="/participate#register">
                <Button size="lg" className="font-semibold bg-white text-red-600 shadow-lg" data-testid="button-join-goal">
                  Join the Movement
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </ScrollFadeUp>
          </div>
        </div>
        
        <div className="wave-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" fill="white">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </section>

      {/* Organised by Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeUp>
            <h2 className="section-heading text-3xl sm:text-4xl font-bold text-center mb-12" data-testid="text-organised-by">
              Organised by
            </h2>
          </ScrollFadeUp>
          
          <motion.div 
            ref={partnersRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-20"
            initial="hidden"
            animate={partnersInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
          >
            <motion.div 
              className="flex flex-col items-center text-center"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <div className="h-24 flex items-center justify-center mb-4">
                <img 
                  src={caliphLifeSchoolLogo} 
                  alt="Caliph Life School"
                  className="h-20 w-auto object-contain"
                  data-testid="img-caliph-life-school"
                />
              </div>
              <h3 className="font-semibold text-lg">Caliph Life School</h3>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center text-center"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <div className="h-24 flex items-center justify-center mb-4">
                <img 
                  src={keralaEconomicForumLogo} 
                  alt="Kerala Economic Forum"
                  className="h-20 w-auto object-contain"
                  data-testid="img-kerala-economic-forum"
                />
              </div>
              <h3 className="font-semibold text-lg">Kerala Economic Forum</h3>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
