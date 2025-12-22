import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Brain,
  Trophy,
  Camera,
  Mic,
  Users,
  ArrowRight
} from "lucide-react";
import {
  ScrollFadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/lib/animations";

const contests = [
  {
    id: 1,
    slug: "business-quiz",
    title: "National Level Inter School Business Quiz",
    description: "A national level inter-school business quiz testing real-world business awareness and brand knowledge. Team-based (2 members per team). Registration: ₹99 per team.",
    icon: Brain,
    badge: "Grade 8-12",
  },
  {
    id: 2,
    slug: "the-pitch-room",
    title: "The Pitch Room",
    description: "Where bold ideas meet real opportunities—pitch your concept and convince the evaluators in minutes.",
    icon: Mic,
    badge: "No Age Limit",
  },
  {
    id: 3,
    slug: "camera-craft",
    title: "Camera Craft – Photo & Video Challenge",
    description: "Showcase your storytelling skills through powerful photos, creative videos, and visual narratives.",
    icon: Camera,
    badge: "All Participants",
  },
  {
    id: 4,
    slug: "jam",
    title: "State Level Just A Minute (JAM) Contest",
    description: "Malayalam-only one-minute battle of spontaneity, wit, and presence of mind. Entry fee: ₹199 per participant.",
    icon: Trophy,
    badge: "School & College",
  },
];

export default function Contests() {
  return (
    <div className="min-h-screen pt-20 bg-white dark:bg-background">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeUp>
            <div className="text-center mb-16">
              <motion.div 
                className="inline-block mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <Badge variant="secondary" className="mb-4 text-base px-4 py-2">4 Contests</Badge>
              </motion.div>
              <h2 className="font-serif text-5xl sm:text-6xl font-bold mb-6" data-testid="text-contests-title">
                KSF Contests
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                KSF is action-focused. We have exciting contests for school students and youngsters. 
                These contests are designed to test business knowledge, creativity, communication and quick thinking.
              </p>
            </div>
          </ScrollFadeUp>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto" staggerDelay={0.08}>
            {contests.map((contest) => (
              <StaggerItem key={contest.id}>
                <Link href={`/contests/${contest.slug}`}>
                  <motion.div whileHover={{ scale: 1.03, y: -5 }} transition={{ duration: 0.2 }} className="cursor-pointer">
                    <div 
                      className="relative p-[3px] rounded-lg h-full"
                      style={{
                        background: 'linear-gradient(135deg, #1E3A8A 0%, #1E3A8A 25%, #DC2626 25%, #DC2626 50%, #FACC15 50%, #FACC15 75%, #0D9488 75%, #0D9488 100%)'
                      }}
                    >
                      <Card className="h-full group border-0 bg-white dark:bg-card" data-testid={`card-contest-${contest.id}`}>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <motion.div 
                              className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors"
                              whileHover={{ rotate: 10, scale: 1.1 }}
                            >
                              <contest.icon className="w-7 h-7 text-primary" />
                            </motion.div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{contest.title}</h3>
                                <Badge variant="outline" className="text-xs">{contest.badge}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{contest.description}</p>
                              <div className="flex items-center gap-1 mt-3 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                <span>Learn More</span>
                                <ArrowRight className="w-4 h-4" />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeUp>
            <div className="relative">
              <div 
                className="absolute right-0 top-0 bottom-0 w-1.5 rounded-r-lg"
                style={{
                  background: 'linear-gradient(180deg, #1E3A8A 0%, #1E3A8A 25%, #DC2626 25%, #DC2626 50%, #FACC15 50%, #FACC15 75%, #0D9488 75%, #0D9488 100%)'
                }}
              />
              <div 
                className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-lg"
                style={{
                  background: 'linear-gradient(180deg, #1E3A8A 0%, #1E3A8A 25%, #DC2626 25%, #DC2626 50%, #FACC15 50%, #FACC15 75%, #0D9488 75%, #0D9488 100%)'
                }}
              />
              <motion.div 
                className="bg-white dark:bg-card border border-border rounded-lg p-8 sm:p-12 text-center"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
                  animate={{ 
                    boxShadow: [
                      "0 0 0 0 rgba(239, 68, 68, 0)",
                      "0 0 20px 10px rgba(239, 68, 68, 0.1)",
                      "0 0 0 0 rgba(239, 68, 68, 0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Trophy className="w-8 h-8 text-primary" />
                </motion.div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4 text-foreground">
                  Ready to Compete?
                </h2>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-2">
                  Register now to participate in contests at Kerala Startup Fest 2026.
                </p>
                <div className="flex items-center justify-center gap-2 text-muted-foreground mt-6">
                  <Users className="w-5 h-5" />
                  <span>Open to All Ages</span>
                </div>
              </motion.div>
            </div>
          </ScrollFadeUp>
        </div>
      </section>
    </div>
  );
}
