import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Lightbulb, 
  Scale, 
  Megaphone, 
  Settings, 
  TrendingUp, 
  Wrench, 
  Globe, 
  BookOpen,
  Brain,
  Trophy,
  Camera,
  Sparkles,
  MapPin,
  Users
} from "lucide-react";
import {
  ScrollFadeUp,
  StaggerContainer,
  StaggerItem,
  CardWave
} from "@/lib/animations";

const sessions = [
  {
    id: 1,
    title: "Incubation & Pitching",
    tagline: "From idea to pitch.",
    description: "Learn how to shape an idea, check if it is practical, and present it with clarity, confidence and impact.",
    icon: Lightbulb,
  },
  {
    id: 2,
    title: "Legal Compliances & Finance",
    tagline: "Building on a strong base.",
    description: "Understand the basics of company registrations, legal compliances, taxation, funding options and money management for startups.",
    icon: Scale,
  },
  {
    id: 3,
    title: "Sales & Marketing",
    tagline: "Take your product to people.",
    description: "Learn how to understand customers, build a brand, promote your idea and convert interest into real sales.",
    icon: Megaphone,
  },
  {
    id: 4,
    title: "Operations & People Management",
    tagline: "Running the engine smoothly.",
    description: "Find out how to create simple systems, set workflows, and manage teams so that your startup runs in an organised way.",
    icon: Settings,
  },
  {
    id: 5,
    title: "Trending Business",
    tagline: "New-age opportunities.",
    description: "Explore high-potential business ideas and new models that are trending in today's world – from tech startups to creative ventures.",
    icon: TrendingUp,
  },
  {
    id: 6,
    title: "Skills as Business",
    tagline: "Turn your talent into income.",
    description: "See how personal skills like craft, design, tech, writing, art and communication can be converted into sustainable businesses.",
    icon: Wrench,
  },
  {
    id: 7,
    title: "Online Business & Social Media Strategy",
    tagline: "Go digital. Go global.",
    description: "Learn how to use websites, apps, e-commerce, content and social media platforms to grow and scale your business online.",
    icon: Globe,
  },
  {
    id: 8,
    title: "My Story",
    tagline: "Real journeys. Real lessons.",
    description: "Listen to founders and creators who share their real stories — struggles, failures, turning points and success.",
    icon: BookOpen,
  },
];

const contests = [
  {
    id: 1,
    title: "Business Quiz (School Level)",
    description: "A business awareness quiz for school students. Tests basic business concepts, brands, current affairs and sharp thinking.",
    icon: Brain,
    badge: "School Level",
  },
  {
    id: 2,
    title: "Business Quiz (Commoners)",
    description: "An open-category quiz for college students, aspiring entrepreneurs and young adults. Covers startups, markets, companies, founders and business trends.",
    icon: Brain,
    badge: "Up to Age 25",
  },
  {
    id: 3,
    title: "Idea Pitching (School Level)",
    description: "A platform for school innovators to present their startup ideas. Students can pitch, get feedback, win prizes and stand a chance to get funding and support.",
    icon: Lightbulb,
    badge: "School Level",
  },
  {
    id: 4,
    title: "Idea Pitching (Commoner Category)",
    description: "Open to all up to age 29. Pitch your idea in front of mentors and investors, get real feedback, win prizes and a chance for capital and long-term support.",
    icon: Lightbulb,
    badge: "Up to Age 29",
  },
  {
    id: 5,
    title: "The Media Person",
    description: "A creative contest to identify photography, videography and content creation skills. Open for participants up to age 25. Capture the spirit of KSF through photos, videos, reels and posts.",
    icon: Camera,
    badge: "Up to Age 25",
  },
  {
    id: 6,
    title: "Spot Events",
    description: "Quick, fun and challenging on-the-spot events. Designed to test creativity, problem-solving and entrepreneurial instincts.",
    icon: Sparkles,
    badge: "All Participants",
  },
  {
    id: 7,
    title: "Treasure Hunt",
    description: "An exciting treasure hunt with a startup twist. Teams solve clues, complete tasks and learn business lessons along the way.",
    icon: MapPin,
    badge: "Team Event",
  },
];

export default function Sessions() {
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
                <Badge variant="secondary" className="mb-4 text-base px-4 py-2">8 Expert Sessions</Badge>
              </motion.div>
              <h2 className="font-serif text-5xl sm:text-6xl font-bold mb-6" data-testid="text-expert-sessions">
                Expert Sessions
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Kerala Startup Fest has 13 themes clubbed into 8 expert sessions. These sessions are 
                handled by people who are actually in business — founders, professionals, investors and creators.
              </p>
            </div>
          </ScrollFadeUp>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sessions.map((session, index) => (
              <CardWave key={session.id} index={index}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="group border-2 border-primary/20 hover:border-primary/50 transition-colors bg-gradient-to-br from-background to-card h-full" data-testid={`card-session-${session.id}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-4">
                        <motion.div 
                          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center group-hover:from-primary/50 group-hover:to-primary/20 transition-all"
                          whileHover={{ rotate: 10, scale: 1.1 }}
                        >
                          <session.icon className="w-7 h-7 text-primary" />
                        </motion.div>
                        <span className="font-serif text-2xl font-bold text-primary/40 group-hover:text-primary/60 transition-colors">{String(index + 1).padStart(2, '0')}</span>
                      </div>
                      <h3 className="font-semibold text-lg leading-tight">{session.title}</h3>
                      <p className="text-sm text-primary font-medium mt-2">{session.tagline}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">{session.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </CardWave>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeUp>
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">7 Contests</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4" data-testid="text-contests">
                Contests at KSF
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                KSF is action-focused. We have contests for school students and youngsters up to age 29. 
                These contests are designed to test business knowledge, creativity, communication and startup thinking.
              </p>
            </div>
          </ScrollFadeUp>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto" staggerDelay={0.08}>
            {contests.map((contest) => (
              <StaggerItem key={contest.id}>
                <motion.div whileHover={{ scale: 1.03, y: -5 }} transition={{ duration: 0.2 }}>
                  <Card className="h-full" data-testid={`card-contest-${contest.id}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <motion.div 
                          className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0"
                          whileHover={{ rotate: 10, scale: 1.1 }}
                        >
                          <contest.icon className="w-7 h-7 text-primary" />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{contest.title}</h3>
                            <Badge variant="outline" className="text-xs">{contest.badge}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{contest.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
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
                Register now to participate in sessions and contests at Kerala Startup Fest 2026.
              </p>
              <div className="flex items-center justify-center gap-2 opacity-80 mt-6">
                <Users className="w-5 h-5" />
                <span>Open for ages 13-29</span>
              </div>
            </motion.div>
          </ScrollFadeUp>
        </div>
      </section>
    </div>
  );
}
