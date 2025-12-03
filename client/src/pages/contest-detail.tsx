import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  Trophy, 
  Target, 
  CheckCircle, 
  Clock, 
  MapPin,
  Award,
  Lightbulb,
  Video,
  MessageSquare
} from "lucide-react";
import { ScrollFadeUp, StaggerContainer, StaggerItem } from "@/lib/animations";

interface ContestData {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  introduction: string;
  eligibility: string[];
  registrationFee?: string;
  stages: {
    title: string;
    description: string;
    details: string[];
    outcome?: string[];
    deadline?: string;
  }[];
  prizes: {
    title: string;
    amount: string;
  }[];
  additionalBenefits: string[];
  importantDates?: {
    event: string;
    date: string;
  }[];
}

const contestsData: Record<string, ContestData> = {
  "the-pitch-room": {
    id: "the-pitch-room",
    title: "The Pitch Room",
    tagline: "Where bold ideas meet real opportunities",
    badge: "Age 10 to 29",
    introduction: "The Pitch Room is Kerala Startup Fest's flagship idea-submission platform created to discover realistic, buildable, and scalable ideas from students and young innovators. This competition is not for imaginary concepts — we invite ideas that can be turned into real startups with proper execution, mentoring, and funding. Participants submit their ideas online → shortlisted innovators proceed to an online screening → the Top 10 finalists pitch live at Kerala Startup Fest 2026, directly in front of real funders, investors, startup advisors, and venture capitalists. Winners receive cash prizes up to ₹50,000, along with incubation support and opportunities for real funding.",
    eligibility: [
      "High school students, college students and young adults up to age 29",
      "Individuals or teams (maximum 3 members)",
      "Participants must be serious about converting their idea into a startup",
      "Participants should be available for all three stages"
    ],
    stages: [
      {
        title: "Stage 1 — Online Idea Submission",
        description: "Submit your ideas through the official Kerala Startup Fest website",
        details: [
          "Idea title",
          "Problem statement",
          "Proposed solution",
          "Target customers",
          "Uniqueness / innovation",
          "Why this idea can become a real startup",
          "Team members (if any)",
          "Contact details"
        ],
        outcome: [
          "Top entries will be shortlisted",
          "Selected participants will receive a mail confirming entry to Stage 2"
        ],
        deadline: "December 20, 11:59 PM"
      },
      {
        title: "Stage 2 — Online Screening",
        description: "Shortlisted participants attend a 10–15 minute online interaction with the Pitch Room Evaluation Panel",
        details: [
          "Clarity of idea",
          "Understanding of market",
          "Confidence in execution",
          "Team capability",
          "Readiness to turn idea into a real startup"
        ],
        outcome: [
          "Top 10 Finalists will be selected for the Grand Finale",
          "Participants will receive guidelines for Stage 3",
          "Finalists will be featured on Kerala Startup Fest's official social media",
          "All Finalists will receive prizes"
        ]
      },
      {
        title: "Stage 3 — Grand Finale",
        description: "Finalists must physically present their idea at Kerala Startup Fest 2026 – Jan 07 & 08 at Calicut",
        details: [
          "3-minute live pitch",
          "5-minute Q&A with investors and jury",
          "Presentation must be simple, visual, and professional",
          "PowerPoint, Prototype / demo (if applicable) is encouraged"
        ],
        outcome: [
          "Winners announced on stage",
          "Cash prizes",
          "Funding conversations may start immediately",
          "Networking with VCs, mentors, and founders",
          "Opportunity for incubation support through Kerala Economic Forum"
        ]
      }
    ],
    prizes: [
      { title: "1st Prize", amount: "₹25,000" },
      { title: "2nd Prize", amount: "₹10,000" },
      { title: "3rd Prize", amount: "₹5,000" }
    ],
    additionalBenefits: [
      "Present directly to real investors, funders & VCs",
      "Chance for funding, mentorship & incubation",
      "Media coverage through KSF social media",
      "Certificates for all finalists",
      "Opportunity to convert your idea into a real business",
      "Exciting special category prizes for all finalists"
    ],
    importantDates: [
      { event: "Last Date for Submission", date: "December 20, 2025" },
      { event: "Online Screening", date: "December 2025" },
      { event: "Grand Finale", date: "January 07-08, 2026" }
    ]
  },
  "business-quiz": {
    id: "business-quiz",
    title: "National Level Inter School Business Quiz",
    tagline: "Test your business knowledge and brand awareness",
    badge: "Grade 8-12",
    introduction: "A national level inter-school business quiz that tests real-world business awareness and brand knowledge. This quiz is designed for school students who are curious about the world of business, brands, and entrepreneurship.",
    eligibility: [
      "Open to Grade 8 to 12 students across the country",
      "Participation is strictly team-based (2 members per team)",
      "Both members must be from the same school",
      "A school may send any number of teams"
    ],
    registrationFee: "₹99 per team",
    stages: [
      {
        title: "Question Areas & Focus",
        description: "The quiz will test real-world business awareness and brand knowledge",
        details: [
          "Logos & Brand Identification",
          "Taglines & Slogans",
          "CEOs, Founders & Company Leadership",
          "Indian & Global Brands",
          "General Business Awareness (products, markets, mergers, recent trends)"
        ]
      },
      {
        title: "Rules & Guidelines",
        description: "Important rules for all participants",
        details: [
          "Teams must report strictly by 9:00 AM",
          "Use of mobile phones, smartwatches, or any digital aid is strictly prohibited",
          "Decisions of the quizmaster will be final and binding",
          "Any misconduct or malpractice will lead to immediate disqualification",
          "Round structure will be announced on the day based on number of teams"
        ]
      }
    ],
    prizes: [
      { title: "Winners", amount: "Certificates & Awards" },
      { title: "1st Runner-up", amount: "Certificates & Awards" },
      { title: "2nd Runner-up", amount: "Certificates & Awards" }
    ],
    additionalBenefits: [
      "All finalists will receive consolation prizes and certificates",
      "Opportunity to compete at national level",
      "Networking with like-minded students from across the country",
      "Experience the excitement of Kerala Startup Fest"
    ]
  },
  "camera-craft": {
    id: "camera-craft",
    title: "Camera Craft – Photo & Video Challenge",
    tagline: "Capture creativity through your lens",
    badge: "All Participants",
    introduction: "Showcase your photography and videography skills in this creative challenge. Capture the spirit of entrepreneurship, innovation, and the startup ecosystem through your unique perspective.",
    eligibility: [
      "Open to all age groups",
      "Individual or team participation",
      "Must submit original work only"
    ],
    stages: [
      {
        title: "Submission Phase",
        description: "Submit your best photos or videos online",
        details: [
          "Theme-based submissions",
          "Original content only",
          "High-quality resolution required"
        ]
      },
      {
        title: "Exhibition & Judging",
        description: "Selected works displayed at Kerala Startup Fest",
        details: [
          "Public exhibition at venue",
          "Expert jury evaluation",
          "People's choice voting"
        ]
      }
    ],
    prizes: [
      { title: "Best Photo", amount: "₹10,000" },
      { title: "Best Video", amount: "₹10,000" },
      { title: "People's Choice", amount: "₹5,000" }
    ],
    additionalBenefits: [
      "Featured on KSF social media",
      "Exhibition at the festival",
      "Networking with media professionals"
    ]
  },
  "jam": {
    id: "jam",
    title: "Just a Minute (JAM)",
    tagline: "One minute. One topic. Unlimited creativity.",
    badge: "All Participants",
    introduction: "A one-minute fun battle of spontaneity, wit, speed, and quick thinking. Participants are given a topic and must speak for exactly one minute without hesitation, repetition, or deviation. A classic challenge that tests your communication skills and presence of mind.",
    eligibility: [
      "Open to all age groups",
      "Individual participation only",
      "Must be comfortable speaking in English or Malayalam"
    ],
    stages: [
      {
        title: "Preliminary Rounds",
        description: "Multiple rounds to filter the best speakers",
        details: [
          "Random topic selection",
          "One minute speaking time",
          "Judged on fluency, content, and confidence"
        ]
      },
      {
        title: "Grand Finale",
        description: "Top speakers compete on stage",
        details: [
          "Live audience",
          "Challenging topics",
          "Expert jury panel"
        ]
      }
    ],
    prizes: [
      { title: "1st Prize", amount: "₹7,500" },
      { title: "2nd Prize", amount: "₹5,000" },
      { title: "3rd Prize", amount: "₹2,500" }
    ],
    additionalBenefits: [
      "Build public speaking confidence",
      "Certificates for all participants",
      "Chance to shine on the KSF stage"
    ]
  }
};

export default function ContestDetail() {
  const { contestId } = useParams<{ contestId: string }>();
  const contest = contestId ? contestsData[contestId] : null;

  if (!contest) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Contest Not Found</h2>
            <p className="text-muted-foreground mb-6">The contest you're looking for doesn't exist or details are coming soon.</p>
            <Link href="/contests">
              <Button data-testid="button-back-contests">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Contests
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <ScrollFadeUp>
            <Link href="/contests">
              <Button variant="ghost" className="mb-6" data-testid="button-back-contests">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Contests
              </Button>
            </Link>
          </ScrollFadeUp>

          <ScrollFadeUp delay={0.1}>
            <Badge variant="outline" className="mb-4">{contest.badge}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-contest-title">
              {contest.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">{contest.tagline}</p>
          </ScrollFadeUp>

          <ScrollFadeUp delay={0.2}>
            <div className="flex flex-wrap gap-4 mb-8">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                January 07-08, 2026
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Calicut, Kerala
              </Badge>
            </div>
          </ScrollFadeUp>

          <ScrollFadeUp delay={0.3}>
            <Link href={`/participate?contest=${encodeURIComponent(contest.title)}#register`}>
              <Button size="lg" data-testid="button-register-contest">
                Register Now
              </Button>
            </Link>
          </ScrollFadeUp>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <ScrollFadeUp>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-primary" />
                About This Contest
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {contest.introduction}
              </p>
            </div>
          </ScrollFadeUp>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-12 md:py-16 bg-card">
        <div className="container mx-auto px-4">
          <ScrollFadeUp>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                Who Can Participate
              </h2>
              <ul className="space-y-3">
                {contest.eligibility.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              {contest.registrationFee && (
                <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="font-semibold text-lg">
                    Registration Fee: <span className="text-primary">{contest.registrationFee}</span>
                  </p>
                </div>
              )}
            </div>
          </ScrollFadeUp>
        </div>
      </section>

      {/* Event Stages */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <ScrollFadeUp>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <Target className="w-6 h-6 text-primary" />
                Event Stages
              </h2>
            </div>
          </ScrollFadeUp>

          <StaggerContainer className="max-w-4xl mx-auto space-y-6" staggerDelay={0.1}>
            {contest.stages.map((stage, index) => (
              <StaggerItem key={index}>
                <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="font-bold text-primary">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">{stage.title}</h3>
                          <p className="text-muted-foreground mb-4">{stage.description}</p>
                          
                          {stage.deadline && (
                            <div className="flex items-center gap-2 mb-4 text-destructive">
                              <Clock className="w-4 h-4" />
                              <span className="font-medium">Deadline: {stage.deadline}</span>
                            </div>
                          )}

                          <div className="mb-4">
                            <h4 className="font-medium mb-2">What's Required:</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {stage.details.map((detail, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {stage.outcome && (
                            <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4">
                              <h4 className="font-medium mb-2 text-green-700 dark:text-green-400">Outcome:</h4>
                              <ul className="space-y-1">
                                {stage.outcome.map((item, i) => (
                                  <li key={i} className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                                    <CheckCircle className="w-4 h-4" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
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

      {/* Prizes */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
        <div className="container mx-auto px-4">
          <ScrollFadeUp>
            <div className="max-w-4xl mx-auto text-center mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                Prizes & Rewards
              </h2>
            </div>
          </ScrollFadeUp>

          <StaggerContainer className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
            {contest.prizes.map((prize, index) => (
              <StaggerItem key={index}>
                <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ duration: 0.2 }}>
                  <Card className="text-center">
                    <CardContent className="p-6">
                      <Award className={`w-12 h-12 mx-auto mb-4 ${
                        index === 0 ? 'text-yellow-500' : 
                        index === 1 ? 'text-gray-400' : 'text-orange-600'
                      }`} />
                      <h3 className="font-semibold mb-2">{prize.title}</h3>
                      <p className="text-2xl font-bold text-primary">{prize.amount}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollFadeUp delay={0.3}>
            <div className="max-w-3xl mx-auto mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 text-center">Additional Benefits</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {contest.additionalBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </ScrollFadeUp>
        </div>
      </section>

      {/* Important Dates */}
      {contest.importantDates && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <ScrollFadeUp>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-primary" />
                  Important Dates
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {contest.importantDates.map((date, index) => (
                    <Card key={index}>
                      <CardContent className="p-4 text-center">
                        <p className="text-sm text-muted-foreground mb-1">{date.event}</p>
                        <p className="font-semibold">{date.date}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </ScrollFadeUp>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <ScrollFadeUp>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Participate?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Don't miss this opportunity to showcase your talent at Kerala Startup Fest 2026!
            </p>
            <Link href={`/participate?contest=${encodeURIComponent(contest.title)}#register`}>
              <Button size="lg" variant="secondary" data-testid="button-register-now-bottom">
                Register Now
              </Button>
            </Link>
          </ScrollFadeUp>
        </div>
      </section>
    </div>
  );
}
