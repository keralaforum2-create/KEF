import { motion } from "framer-motion";
import { ScrollFadeUp } from "@/lib/animations";

export default function Terms() {
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
              <h1 className="text-3xl lg:text-4xl font-bold mb-8" data-testid="text-terms-title">
                Terms and Conditions
              </h1>
              
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-muted-foreground">
                  <strong>Last Updated:</strong> December 2024
                </p>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">1. Introduction</h2>
                  <p className="text-muted-foreground">
                    Welcome to Kerala Startup Fest 2026. These Terms and Conditions govern your use of our website and participation in the event. By accessing our website or registering for the event, you agree to be bound by these terms.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">2. Event Registration</h2>
                  <p className="text-muted-foreground">
                    Registration for Kerala Startup Fest 2026 is subject to availability and eligibility criteria. Participants must be between high school age and 29 years old. Registration is confirmed only upon successful payment and receipt of confirmation.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">3. Payment Terms</h2>
                  <p className="text-muted-foreground">
                    All payments are processed securely through our payment partners. Registration fees are non-refundable except as specified in our Refund Policy. Prices are subject to change without prior notice for future registrations.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">4. Participant Conduct</h2>
                  <p className="text-muted-foreground">
                    All participants are expected to conduct themselves professionally and respectfully during the event. Any behavior deemed inappropriate, disruptive, or harmful may result in removal from the event without refund.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">5. Intellectual Property</h2>
                  <p className="text-muted-foreground">
                    All content, materials, and intellectual property presented at the event remain the property of their respective owners. Participants retain ownership of their own ideas and presentations unless otherwise agreed in writing.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">6. Photography and Media</h2>
                  <p className="text-muted-foreground">
                    By attending the event, you consent to being photographed and recorded. These materials may be used for promotional purposes by Kerala Startup Fest without additional compensation.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">7. Liability</h2>
                  <p className="text-muted-foreground">
                    Kerala Startup Fest and its organizers are not liable for any loss, damage, or injury to persons or property during the event. Participants attend at their own risk and are responsible for their personal belongings.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">8. Event Changes</h2>
                  <p className="text-muted-foreground">
                    The organizers reserve the right to modify the event schedule, speakers, or venue due to unforeseen circumstances. In case of event cancellation, registered participants will be notified and refunds will be processed as per our Refund Policy.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">9. Governing Law</h2>
                  <p className="text-muted-foreground">
                    These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts in Kozhikode, Kerala.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">10. Contact Information</h2>
                  <p className="text-muted-foreground">
                    For any questions regarding these Terms and Conditions, please contact us at:
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
