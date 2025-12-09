import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Lightbulb, 
  Scale, 
  Megaphone, 
  Settings, 
  UtensilsCrossed, 
  Wrench, 
  ShoppingCart, 
  Cpu,
  GraduationCap,
  Video,
  Users
} from "lucide-react";
import {
  ScrollFadeUp,
  CardWave
} from "@/lib/animations";

const sessions = [
  {
    id: 1,
    title: "Building the Startup Mindset & Getting Your Idea Off the Ground",
    tagline: "Think like a founder.",
    description: "How to think like a founder, validate ideas, and shape them into executable startup models.",
    icon: Lightbulb,
  },
  {
    id: 2,
    title: "Legal, Finance & Funding Basics Every Founder Must Know",
    tagline: "Building on a strong base.",
    description: "Company registration, compliance, taxation, funding stages, documentation, and financial discipline.",
    icon: Scale,
  },
  {
    id: 3,
    title: "Sales & Marketing Strategies That Actually Work",
    tagline: "Take your product to people.",
    description: "Understanding customers, positioning products, building brand presence, and converting leads into sales.",
    icon: Megaphone,
  },
  {
    id: 4,
    title: "Running the Show: Operations, Systems & People Management",
    tagline: "Running the engine smoothly.",
    description: "Creating efficient workflows, managing teams, and building a strong internal structure for your startup.",
    icon: Settings,
  },
  {
    id: 5,
    title: "The Business of Food: Opportunities in Food Tech",
    tagline: "Explore food-tech trends.",
    description: "Exploring packaged foods, cloud kitchens, health/nutrition products, and emerging food tech trends.",
    icon: UtensilsCrossed,
  },
  {
    id: 6,
    title: "Skills to Startups: Turning Talents into Income",
    tagline: "Turn your talent into income.",
    description: "How personal skills—design, content, craft, coding, communication—can be shaped into small businesses and ventures.",
    icon: Wrench,
  },
  {
    id: 7,
    title: "How to Build & Grow an Online Business",
    tagline: "Go digital. Go global.",
    description: "Selling on e-commerce platforms, running online stores, logistics, pricing, and scaling digital commerce.",
    icon: ShoppingCart,
  },
  {
    id: 8,
    title: "Tech, AI & Disruptive Innovation for Young Entrepreneurs",
    tagline: "Build with modern tech.",
    description: "Using software, apps, AI tools, and modern tech to build real, fundable products and solutions.",
    icon: Cpu,
  },
  {
    id: 9,
    title: "Learning to Lead: Education Models for Business Success",
    tagline: "Prepare for real-world challenges.",
    description: "Entrepreneurial learning, self-education systems, business thinking frameworks, and preparing for real-world challenges.",
    icon: GraduationCap,
  },
  {
    id: 10,
    title: "Digital Media / Smart Content and Media Strategies",
    tagline: "Build your digital presence.",
    description: "Crafting effective digital content, producing high impact video ads, building strong brand visibility and applying smart media strategies to reach, engage and convert the right audience.",
    icon: Video,
  },
];

export default function Sessions() {
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
                <Badge variant="secondary" className="mb-4 text-base px-4 py-2">10 Expert Sessions</Badge>
              </motion.div>
              <h2 className="font-serif text-5xl sm:text-6xl font-bold mb-6" data-testid="text-expert-sessions">
                Expert Sessions
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Kerala Startup Fest features 10 expert sessions covering everything from startup mindset to digital media mastery. These sessions are 
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
                  <div 
                    className="relative p-[3px] rounded-lg"
                    style={{
                      background: 'linear-gradient(135deg, #1E3A8A 0%, #1E3A8A 25%, #DC2626 25%, #DC2626 50%, #FACC15 50%, #FACC15 75%, #0D9488 75%, #0D9488 100%)'
                    }}
                  >
                    <Card className="group border-0 bg-white dark:bg-card h-full" data-testid={`card-session-${session.id}`}>
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
                  </div>
                </motion.div>
              </CardWave>
            ))}
          </div>
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
                  <Lightbulb className="w-8 h-8 text-primary" />
                </motion.div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4 text-foreground">
                  Ready to Learn?
                </h2>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-2">
                  Register now to participate in expert sessions at Kerala Startup Fest 2026.
                </p>
                <div className="flex items-center justify-center gap-2 text-muted-foreground mt-6">
                  <Users className="w-5 h-5" />
                  <span>Open for ages 13-29</span>
                </div>
              </motion.div>
            </div>
          </ScrollFadeUp>
        </div>
      </section>
    </div>
  );
}
