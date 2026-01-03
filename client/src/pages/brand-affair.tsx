import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Heart, CheckCircle2, Star, Zap, Shield, Gavel } from "lucide-react";
import { ScrollFadeUp, StaggerContainer, StaggerItem } from "@/lib/animations";

export default function BrandAffair() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-20 h-20 rounded-3xl bg-red-100 flex items-center justify-center mx-auto mb-8 shadow-inner"
            >
              <Heart className="w-12 h-12 text-red-600" />
            </motion.div>
            
            <ScrollFadeUp>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                THE GREAT BRAND <span className="text-red-600">LOVE AFFAIR</span>
              </h1>
              <p className="text-xl sm:text-2xl text-red-600 font-bold mb-8 uppercase tracking-widest">
                FREE Brand Makeover worth ₹25 lakhs
              </p>
            </ScrollFadeUp>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-gray-700">
            <ScrollFadeUp delay={0.1}>
              <p className="text-xl font-medium leading-relaxed mb-8">
                We have some really exciting news for startups across Kerala. 
                Kerala Startup Fest 2026, in collaboration with Young Indians and Origami, 
                is launching <span className="text-red-600 font-bold">The Great Brand Love Affair</span> — 
                a FREE Brand Makeover worth ₹25 lakhs for promising startup brands.
              </p>
            </ScrollFadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <ScrollFadeUp delay={0.2}>
                <Card className="h-full border-red-100 bg-red-50/30">
                  <CardContent className="pt-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Star className="text-yellow-500 fill-yellow-500 w-6 h-6" />
                      What’s this about?
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                        <span>Selected startups will get a chance to present a short rebranding elevator pitch.</span>
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                        <span>From these, one lucky startup will win a complete business brand makeover — absolutely free.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </ScrollFadeUp>

              <ScrollFadeUp delay={0.3}>
                <Card className="h-full border-gray-100 bg-gray-50/30">
                  <CardContent className="pt-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Zap className="text-blue-600 w-6 h-6" />
                      Who can apply?
                    </h3>
                    <p className="text-lg">
                      Any startup brand from Kerala that believes it’s ready for a serious upgrade. 
                      Whether you're just starting or looking to scale, this is your chance.
                    </p>
                  </CardContent>
                </Card>
              </ScrollFadeUp>
            </div>

            <ScrollFadeUp delay={0.4}>
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">What does the winner get?</h3>
              <p className="text-center mb-8">A power-packed transformation that includes:</p>
            </ScrollFadeUp>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              <StaggerItem>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                    <Star className="w-6 h-6 text-red-600" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Complete Brand Makeover</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Brand strategy, idea-driven storytelling, brand identity, and mood boards (Powered by Origami & Bloombox)
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Leadership & People Transformation</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    “Winning to Lead” program for founders and future leaders (Powered by Carpediem)
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-teal-600" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Digital & AI Transformation</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Digital process assessment, AI opportunity mapping, and adoption roadmap (Powered by Avohi Labs)
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                    <Gavel className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Legal & IP Support</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Up to 10 hours of pro bono legal and intellectual property services (Powered by Fox Mandal)
                  </p>
                </div>
              </StaggerItem>
            </StaggerContainer>

            <ScrollFadeUp delay={0.5}>
              <div className="bg-red-600 rounded-3xl p-8 text-white mb-16 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Zap className="w-32 h-32" />
                </div>
                <h4 className="text-2xl font-bold flex items-center gap-2 mb-4 relative z-10">
                  ✨ Bonus Surprise
                </h4>
                <p className="text-lg relative z-10 opacity-90">
                  And who knows… there might even be funding support 👀 (We love a good plot twist!)
                </p>
              </div>
            </ScrollFadeUp>

            <div className="text-center mt-12 py-12 border-t border-gray-100">
              <ScrollFadeUp>
                <p className="text-2xl font-bold text-gray-900 mb-8">
                  💡 Interested? Apply now and start the love affair
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a 
                    href="https://www.brandloveaffair.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <Button 
                      size="lg" 
                      className="bg-red-600 hover:bg-red-700 text-white font-black px-12 py-8 text-2xl rounded-2xl shadow-xl hover-elevate w-full"
                      data-testid="page-button-apply-brand-love-affair"
                    >
                      Apply Now
                    </Button>
                  </a>
                  <Link href="/" className="w-full sm:w-auto">
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="px-8 py-8 text-lg rounded-2xl w-full"
                    >
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </ScrollFadeUp>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
