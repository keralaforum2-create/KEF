import { motion } from "framer-motion";
import { ScrollFadeUp } from "@/lib/animations";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeUp>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl lg:text-4xl font-bold mb-8" data-testid="text-privacy-title">
                Privacy Policy
              </h1>
              
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-muted-foreground">
                  <strong>Last Updated:</strong> December 2024
                </p>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">1. Introduction</h2>
                  <p className="text-muted-foreground">
                    Kerala Startup Fest ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or register for our event.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">2. Information We Collect</h2>
                  <p className="text-muted-foreground">We may collect the following types of information:</p>
                  <ul className="text-muted-foreground list-disc pl-6">
                    <li><strong>Personal Information:</strong> Name, email address, phone number, date of birth, educational institution, and address when you register for the event.</li>
                    <li><strong>Payment Information:</strong> Payment details are processed securely through our payment partners and are not stored on our servers.</li>
                    <li><strong>Usage Data:</strong> Information about how you interact with our website, including IP address, browser type, and pages visited.</li>
                    <li><strong>Contest Submissions:</strong> Ideas, presentations, and materials submitted for contests and competitions.</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">3. How We Use Your Information</h2>
                  <p className="text-muted-foreground">We use the collected information for:</p>
                  <ul className="text-muted-foreground list-disc pl-6">
                    <li>Processing event registrations and payments</li>
                    <li>Communicating event updates and important information</li>
                    <li>Organizing and managing contests and competitions</li>
                    <li>Improving our website and event experience</li>
                    <li>Sending promotional materials (with your consent)</li>
                    <li>Complying with legal obligations</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">4. Information Sharing</h2>
                  <p className="text-muted-foreground">
                    We do not sell your personal information. We may share your information with:
                  </p>
                  <ul className="text-muted-foreground list-disc pl-6">
                    <li><strong>Event Partners:</strong> Sponsors and partners for networking purposes (with your consent)</li>
                    <li><strong>Service Providers:</strong> Third-party vendors who assist in organizing the event</li>
                    <li><strong>Payment Processors:</strong> For secure payment processing</li>
                    <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">5. Data Security</h2>
                  <p className="text-muted-foreground">
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">6. Your Rights</h2>
                  <p className="text-muted-foreground">You have the right to:</p>
                  <ul className="text-muted-foreground list-disc pl-6">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your information</li>
                    <li>Opt-out of promotional communications</li>
                    <li>Withdraw consent at any time</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">7. Cookies</h2>
                  <p className="text-muted-foreground">
                    Our website may use cookies to enhance your browsing experience. You can set your browser to refuse cookies, but some features of the website may not function properly.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">8. Third-Party Links</h2>
                  <p className="text-muted-foreground">
                    Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">9. Children's Privacy</h2>
                  <p className="text-muted-foreground">
                    For participants under 18 years of age, parental or guardian consent is required for registration. We do not knowingly collect information from children without appropriate consent.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">10. Changes to This Policy</h2>
                  <p className="text-muted-foreground">
                    We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">11. Contact Us</h2>
                  <p className="text-muted-foreground">
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <ul className="text-muted-foreground list-disc pl-6">
                    <li>Email: keralastartupfest@gmail.com</li>
                    <li>Phone: +91 9072344431</li>
                    <li>Address: Caliph Life School, Thammaressery, Kozhikode, Kerala, India</li>
                  </ul>
                </section>
              </div>
            </motion.div>
          </ScrollFadeUp>
        </div>
      </section>
    </div>
  );
}
