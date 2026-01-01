import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
  Lightbulb, 
  Target, 
  Users, 
  BookOpen, 
  Rocket,
  CheckCircle2,
  Sparkles,
  GraduationCap,
  Briefcase,
  ArrowRight
} from "lucide-react";
import {
  ScrollFadeUp,
  ScrollFadeLeft,
  ScrollFadeRight,
  StaggerContainer,
  StaggerItem,
  PulsingGlow
} from "@/lib/animations";
import califphLifeSchoolLogo from "@assets/PhotoshopExtension_Image_1764498269153.png";
import keralaEconomicForumLogo from "@assets/KERALA ECONOMIC FORUM LOGO RESOLUTION 00_1764498454572.png";
import festivalCreatorsImage from "@assets/cube_rotate_1765692614588.jpg";

export default function About() {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-teal-50 via-cyan-100/50 to-teal-50 dark:from-teal-950/30 dark:via-cyan-900/20 dark:to-teal-950/30">
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeUp>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-6" data-testid="text-about-title">
                About Kerala Startup Fest
              </h1>
              <p className="text-lg text-muted-foreground">
                Discover the vision, mission, and people behind Kerala's most exciting startup festival.
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
                  <Sparkles className="w-7 h-7 text-primary" />
                </motion.div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6" data-testid="text-festival-creates">
                  A Festival That Creates Founders
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Kerala Startup Fest (KSF) is a first-of-its-kind startup festival designed for 
                  students and young adults.
                </p>
                <p className="text-muted-foreground mb-6">Our aim is simple:</p>
                <ul className="space-y-4">
                  {[
                    "Take ideas from classrooms and conversations",
                    "Give them the right guidance, platform and network",
                    "Help them grow into real, working startups"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <motion.div 
                        className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5"
                        whileHover={{ scale: 1.2 }}
                      >
                        <ArrowRight className="w-3 h-3 text-primary" />
                      </motion.div>
                      <span className="text-muted-foreground">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </ScrollFadeLeft>
            <ScrollFadeRight>
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="rounded-3xl overflow-hidden shadow-xl">
                  <img 
                    src={festivalCreatorsImage} 
                    alt="Kerala Startup Fest 2026 - A Festival That Creates Founders"
                    className="w-full h-auto object-cover"
                    data-testid="img-festival-creators"
                  />
                </div>
              </motion.div>
            </ScrollFadeRight>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <ScrollFadeUp>
              <motion.div 
                className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <Users className="w-7 h-7 text-primary" />
              </motion.div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6" data-testid="text-why-started">
                Why We Started KSF
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Many young people have ideas. But they do not know where to start, whom to talk to, 
                or how to get support.
              </p>
              <p className="text-muted-foreground mb-8">
                KSF is created to solve this gap by bringing:
              </p>
            </ScrollFadeUp>
            
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4" staggerDelay={0.1}>
              <StaggerItem>
                <motion.div whileHover={{ scale: 1.05, y: -3 }} transition={{ duration: 0.2 }}>
                  <Card className="border-primary/20 h-full">
                    <CardContent className="p-5 flex items-center gap-4">
                      <Briefcase className="w-8 h-8 text-primary flex-shrink-0" />
                      <span className="font-medium">Experienced entrepreneurs</span>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
              <StaggerItem>
                <motion.div whileHover={{ scale: 1.05, y: -3 }} transition={{ duration: 0.2 }}>
                  <Card className="border-primary/20 h-full">
                    <CardContent className="p-5 flex items-center gap-4">
                      <Users className="w-8 h-8 text-primary flex-shrink-0" />
                      <span className="font-medium">Mentors and trainers</span>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
              <StaggerItem>
                <motion.div whileHover={{ scale: 1.05, y: -3 }} transition={{ duration: 0.2 }}>
                  <Card className="border-primary/20 h-full">
                    <CardContent className="p-5 flex items-center gap-4">
                      <Target className="w-8 h-8 text-primary flex-shrink-0" />
                      <span className="font-medium">Venture capitalists and investors</span>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
              <StaggerItem>
                <motion.div whileHover={{ scale: 1.05, y: -3 }} transition={{ duration: 0.2 }}>
                  <Card className="border-primary/20 h-full">
                    <CardContent className="p-5 flex items-center gap-4">
                      <GraduationCap className="w-8 h-8 text-primary flex-shrink-0" />
                      <span className="font-medium">Students and youth</span>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            </StaggerContainer>
            
            <ScrollFadeUp delay={0.3}>
              <p className="text-center text-lg font-medium text-primary mt-8">
                all under one roof for two powerful days.
              </p>
            </ScrollFadeUp>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <ScrollFadeUp>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-8 text-center" data-testid="text-what-believe">
                What We Believe
              </h2>
            </ScrollFadeUp>
            <StaggerContainer className="space-y-6" staggerDelay={0.1}>
              {[
                {
                  title: "Entrepreneurship should be democratic",
                  desc: "It should not be limited to a few people with connections."
                },
                {
                  title: "Real exposure to business",
                  desc: "School and college youth must get real exposure to business, not just theory."
                },
                {
                  title: "Education must connect to execution",
                  desc: "So that ideas can turn into income, jobs and impact."
                }
              ].map((item, index) => (
                <StaggerItem key={index}>
                  <motion.div 
                    className="flex items-start gap-4 p-6 rounded-xl bg-background border border-border"
                    whileHover={{ scale: 1.02, x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium mb-1">{item.title}</p>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
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
              <PulsingGlow className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8" />
              </PulsingGlow>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6" data-testid="text-our-goal">
                Our Goal
              </h2>
              <p className="text-xl sm:text-2xl font-medium mb-6 opacity-90 max-w-2xl mx-auto">
                Our core goal is to launch <span className="font-bold">100 startups</span> from the fest.
              </p>
              <p className="opacity-80 max-w-xl mx-auto">
                Even if only a few ideas become successful companies, the exposure and confidence 
                gained by participants will stay for life.
              </p>
            </motion.div>
          </ScrollFadeUp>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeUp>
            <h2 className="text-4xl sm:text-6xl font-bold text-center mb-12" style={{ fontFamily: "'Big Shoulders Display', sans-serif" }}>
              ORGANISED BY
            </h2>
          </ScrollFadeUp>
          
          <div className="flex flex-col items-center justify-center gap-12 max-w-4xl mx-auto">
            <motion.div 
              className="flex flex-col items-center text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="mb-6 flex items-center justify-center h-32">
                <img src={keralaEconomicForumLogo} alt="Kerala Economic Forum" className="h-full w-auto object-contain" />
              </div>
              <h3 className="font-semibold text-xl">Kerala Economic Forum</h3>
            </motion.div>

            <div className="text-muted-foreground font-medium uppercase tracking-widest text-sm">
              Venue
            </div>

            <motion.div 
              className="flex flex-col items-center text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-center p-6 rounded-xl bg-background border border-border shadow-sm">
                <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-2">Venture Arcade</h3>
                <p className="text-muted-foreground">Mavoor Rd, above Croma, Thondayad, Kozhikode, Kerala</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
