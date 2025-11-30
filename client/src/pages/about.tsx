import { Card, CardContent } from "@/components/ui/card";
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

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-6" data-testid="text-about-title">
              About Kerala Startup Fest
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover the vision, mission, and people behind Kerala's most exciting startup festival.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6" data-testid="text-festival-creates">
                A Festival That Creates Founders
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Kerala Startup Fest (KSF) is a first-of-its-kind startup festival designed for 
                students and young adults.
              </p>
              <p className="text-muted-foreground mb-6">Our aim is simple:</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ArrowRight className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-muted-foreground">Take ideas from classrooms and conversations</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ArrowRight className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-muted-foreground">Give them the right guidance, platform and network</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ArrowRight className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-muted-foreground">Help them grow into real, working startups</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent flex items-center justify-center">
                <div className="text-center p-8">
                  <Lightbulb className="w-24 h-24 text-primary mx-auto mb-6 opacity-80" />
                  <p className="font-serif text-2xl font-bold text-primary">Ideas to Impact</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-primary" />
            </div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="border-primary/20">
                <CardContent className="p-5 flex items-center gap-4">
                  <Briefcase className="w-8 h-8 text-primary flex-shrink-0" />
                  <span className="font-medium">Experienced entrepreneurs</span>
                </CardContent>
              </Card>
              <Card className="border-primary/20">
                <CardContent className="p-5 flex items-center gap-4">
                  <Users className="w-8 h-8 text-primary flex-shrink-0" />
                  <span className="font-medium">Mentors and trainers</span>
                </CardContent>
              </Card>
              <Card className="border-primary/20">
                <CardContent className="p-5 flex items-center gap-4">
                  <Target className="w-8 h-8 text-primary flex-shrink-0" />
                  <span className="font-medium">Venture capitalists and investors</span>
                </CardContent>
              </Card>
              <Card className="border-primary/20">
                <CardContent className="p-5 flex items-center gap-4">
                  <GraduationCap className="w-8 h-8 text-primary flex-shrink-0" />
                  <span className="font-medium">Students and youth</span>
                </CardContent>
              </Card>
            </div>
            <p className="text-center text-lg font-medium text-primary mt-8">
              all under one roof for two powerful days.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-8 text-center" data-testid="text-what-believe">
              What We Believe
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 rounded-xl bg-background border border-border">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Entrepreneurship should be democratic</p>
                  <p className="text-muted-foreground text-sm">
                    It should not be limited to a few people with connections.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 rounded-xl bg-background border border-border">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Real exposure to business</p>
                  <p className="text-muted-foreground text-sm">
                    School and college youth must get real exposure to business, not just theory.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 rounded-xl bg-background border border-border">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Education must connect to execution</p>
                  <p className="text-muted-foreground text-sm">
                    So that ideas can turn into income, jobs and impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 sm:p-12 text-center text-primary-foreground">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8" />
            </div>
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
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-center mb-12" data-testid="text-who-behind">
            Who is Behind KSF?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover-elevate">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-4">Caliph Life School</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A residential life school that focuses on purpose, happiness, skills and real-world learning. 
                  Caliph strongly promotes student entrepreneurship and innovation.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-elevate">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Rocket className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-4">Kerala Economic Forum</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A group that aims to support business, startups and entrepreneurs in Kerala through 
                  networks, events, mentoring and collaborations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
