import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollFadeUp } from "@/lib/animations";

export default function Speakers() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link href="/">
          <Button variant="ghost" className="mb-8" data-testid="button-back">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-12">
          <ScrollFadeUp>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-900" data-testid="text-speakers-title">
              Our <span className="text-red-600">Speakers</span>
            </h1>
          </ScrollFadeUp>
          <ScrollFadeUp delay={0.1}>
            <p className="text-lg text-gray-600 max-w-2xl">
              Meet the industry leaders and experts who will be sharing their insights and experiences at Kerala Startup Fest 2026.
            </p>
          </ScrollFadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ScrollFadeUp>
            <Card className="p-6 text-center hover-elevate" data-testid="card-speaker">
              <div 
                className="w-20 h-20 rounded-full mx-auto mb-4 bg-gradient-to-br from-red-200 to-red-300"
                style={{ backgroundColor: "hsl(174 100% 29%)" }}
              />
              <h3 className="font-bold text-lg mb-2">Speaker Name</h3>
              <p className="text-sm text-gray-600 mb-3">Speaker Title & Company</p>
              <p className="text-sm text-gray-500">
                Expertise in startup ecosystem, business development, and innovation.
              </p>
            </Card>
          </ScrollFadeUp>

          <ScrollFadeUp delay={0.1}>
            <Card className="p-6 text-center hover-elevate" data-testid="card-speaker">
              <div 
                className="w-20 h-20 rounded-full mx-auto mb-4"
                style={{ backgroundColor: "hsl(174 100% 29%)" }}
              />
              <h3 className="font-bold text-lg mb-2">Speaker Name</h3>
              <p className="text-sm text-gray-600 mb-3">Speaker Title & Company</p>
              <p className="text-sm text-gray-500">
                Expertise in technology, digital transformation, and growth.
              </p>
            </Card>
          </ScrollFadeUp>

          <ScrollFadeUp delay={0.2}>
            <Card className="p-6 text-center hover-elevate" data-testid="card-speaker">
              <div 
                className="w-20 h-20 rounded-full mx-auto mb-4"
                style={{ backgroundColor: "hsl(174 100% 29%)" }}
              />
              <h3 className="font-bold text-lg mb-2">Speaker Name</h3>
              <p className="text-sm text-gray-600 mb-3">Speaker Title & Company</p>
              <p className="text-sm text-gray-500">
                Expertise in investment, funding strategies, and venture capital.
              </p>
            </Card>
          </ScrollFadeUp>
        </div>

        <div className="mt-12 p-6 bg-gray-50 rounded-lg text-center" data-testid="section-speakers-info">
          <p className="text-gray-600">
            The complete speaker list will be announced soon. Stay tuned for more updates!
          </p>
        </div>
      </div>
    </div>
  );
}
