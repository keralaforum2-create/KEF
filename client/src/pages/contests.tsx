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
    title: "Business Quiz – School Edition",
    description: "A fast-paced challenge that tests business awareness, startup knowledge, and decision-making skills.",
    icon: Brain,
    badge: "Grade 12 & Below",
  },
  {
    id: 2,
    slug: "the-pitch-room",
    title: "The Pitch Room",
    description: "Where bold ideas meet real opportunities—pitch your concept and convince the evaluators in minutes.",
    icon: Mic,
    badge: "Age 10 to 29",
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
    title: "Just a Minute (JAM)",
    description: "A one-minute fun battle of spontaneity, wit, speed, and presence of mind.",
    icon: Trophy,
    badge: "All Participants",
  },
];

export default function Contests() {
  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 bg-gradient-to-b from-card to-background">
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
                    <Card className="h-full group" data-testid={`card-contest-${contest.id}`}>
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
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeUp>
            <motion.div 
              className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 sm:p-12 text-center text-primary-foreground"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6"
                animate={{ 
                  boxShadow: [
                    "0 0 0 0 rgba(255, 255, 255, 0)",
                    "0 0 20px 10px rgba(255, 255, 255, 0.2)",
                    "0 0 0 0 rgba(255, 255, 255, 0)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Trophy className="w-8 h-8" />
              </motion.div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
                Ready to Compete?
              </h2>
              <p className="text-lg opacity-90 max-w-xl mx-auto mb-2">
                Register now to participate in contests at Kerala Startup Fest 2026.
              </p>
              <div className="flex items-center justify-center gap-2 opacity-80 mt-6">
                <Users className="w-5 h-5" />
                <span>Open for ages 10-29</span>
              </div>
            </motion.div>
          </ScrollFadeUp>
        </div>
      </section>
    </div>
  );
}
