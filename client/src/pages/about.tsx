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
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent flex items-center justify-center">
                  <div className="text-center p-8">
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 5, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Lightbulb className="w-24 h-24 text-primary mx-auto mb-6 opacity-80" />
                    </motion.div>
                    <p className="font-serif text-2xl font-bold text-primary">Ideas to Impact</p>
                  </div>
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
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-center mb-12" data-testid="text-who-behind">
              Who is Behind KSF?
            </h2>
          </ScrollFadeUp>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto" staggerDelay={0.15}>
            <StaggerItem>
              <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="h-full">
                  <CardContent className="p-8">
                    <motion.div 
                      className="mb-6 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <img src={califphLifeSchoolLogo} alt="Caliph Life School" className="h-24 w-auto object-contain" />
                    </motion.div>
                    <h3 className="font-semibold text-xl mb-4">Caliph Life School</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      A residential life school that focuses on purpose, happiness, skills and real-world learning. 
                      Caliph strongly promotes student entrepreneurship and innovation.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
            
            <StaggerItem>
              <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="h-full">
                  <CardContent className="p-8">
                    <motion.div 
                      className="mb-6 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <img src={keralaEconomicForumLogo} alt="Kerala Economic Forum" className="h-24 w-auto object-contain" />
                    </motion.div>
                    <h3 className="font-semibold text-xl mb-4">Kerala Economic Forum</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      A group that aims to support business, startups and entrepreneurs in Kerala through 
                      networks, events, mentoring and collaborations.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
