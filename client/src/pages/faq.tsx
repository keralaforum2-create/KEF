import { ArrowLeft, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollFadeUp, StaggerContainer, StaggerItem } from "@/lib/animations";
import { useState } from "react";

const faqItems = [
  {
    question: "Is offline registration available?",
    answer: "No. Offline registration is not available. All participants must register only through the official KSF website."
  },
  {
    question: "When does registration close?",
    answer: "Admissions will close soon and immediately once the venue reaches its capacity. We strongly recommend registering early to avoid missing out."
  },
  {
    question: "Where is Kerala Startup Fest held?",
    answer: "Venue: Aspin Courtyard, Calicut Beach, Kozhikode"
  },
  {
    question: "What are the event timings?",
    answer: "Day 1: 9:00 AM – 6:00 PM. After 6:00 PM, an exciting Idea Pitching Contest will be conducted. Day 2: 9:00 AM – 6:00 PM"
  },
  {
    question: "Is accommodation provided?",
    answer: "No, accommodation is not included in the ticket. However, our team will assist you in booking nearby hotels or rooms if required."
  },
  {
    question: "Is the registration fee for one day or two days?",
    answer: "The registration amount covers access to both days of Kerala Startup Fest."
  },
  {
    question: "Is food included in the ticket?",
    answer: "Food is provided only for Gold and Platinum category ticket holders."
  },
  {
    question: "Can I book a stall at Kerala Startup Fest?",
    answer: "Yes. You can book stalls to showcase your startup, brand, or services. Stall pricing starts from ₹5,000/-. To book a stall, contact: +91 9846131756"
  },
  {
    question: "Can I participate in multiple events?",
    answer: "Yes. A participant can register and participate in multiple events at Kerala Startup Fest. However, please note: Camera Craft is a recurring, multi-round event. Participants of Camera Craft are strongly advised not to register for other events, as schedules may overlap and full participation is required."
  },
  {
    question: "Is separate registration required for each event?",
    answer: "Yes. Each event requires separate registration, and separate fees apply for each event or contest."
  },
  {
    question: "Can I attend expert sessions and also participate in contests?",
    answer: "Yes. Participants can attend expert sessions and also take part in contests."
  },
  {
    question: "What pass do contest participants receive?",
    answer: "Participants who register for contests will receive a Silver Pass, which allows access to expert sessions."
  },
  {
    question: "Is contest registration mandatory?",
    answer: "Yes. Contest registration is mandatory to participate in any contest at KSF."
  },
  {
    question: "Whom can I contact for support or queries?",
    answer: "For any assistance related to registration, stalls, accommodation support, or general queries, please contact the KSF Support Team +91 9072344431 (Whatsapp Only) through the details provided on the website."
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="p-6 hover-elevate cursor-pointer" onClick={() => setIsOpen(!isOpen)} data-testid="card-faq-item">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 text-left">
          <h3 className="font-semibold text-gray-900 mb-2">{question}</h3>
          {isOpen && (
            <p className="text-gray-600 text-sm leading-relaxed">{answer}</p>
          )}
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          data-testid="icon-chevron"
        />
      </div>
    </Card>
  );
}

export default function FAQ() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link href="/">
          <Button variant="ghost" className="mb-8" data-testid="button-back">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-12">
          <ScrollFadeUp>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-900" data-testid="text-faq-title">
              Frequently Asked <span className="text-red-600">Questions</span>
            </h1>
          </ScrollFadeUp>
          <ScrollFadeUp delay={0.1}>
            <p className="text-lg text-gray-600">
              Find answers to common questions about Kerala Startup Fest 2026.
            </p>
          </ScrollFadeUp>
        </div>

        <StaggerContainer className="space-y-4" staggerDelay={0.05}>
          {faqItems.map((item, index) => (
            <StaggerItem key={index}>
              <FAQItem question={item.question} answer={item.answer} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-12 p-6 bg-blue-50 rounded-lg text-center border border-blue-100" data-testid="section-faq-contact">
          <h3 className="font-semibold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-gray-600 mb-4">
            Contact our support team for any queries not covered here.
          </p>
          <a href="mailto:support@keralastartusfest.com">
            <Button variant="outline" data-testid="button-contact-support">
              Contact Support
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
