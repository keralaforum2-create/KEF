import { motion } from "framer-motion";
import { ScrollFadeUp } from "@/lib/animations";

export default function Refund() {
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
              <h1 className="text-3xl lg:text-4xl font-bold mb-8" data-testid="text-refund-title">
                Refund Policy
              </h1>
              
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-muted-foreground">
                  <strong>Last Updated:</strong> December 2024
                </p>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">1. Overview</h2>
                  <p className="text-muted-foreground">
                    This Refund Policy outlines the conditions under which refunds may be granted for Kerala Startup Fest 2026 registrations. We aim to be fair and transparent in our refund process.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">2. Registration Cancellation by Participant</h2>
                  <p className="text-muted-foreground">
                    If you need to cancel your registration, the following refund schedule applies:
                  </p>
                  <ul className="text-muted-foreground list-disc pl-6">
                    <li><strong>More than 30 days before the event:</strong> Full refund minus processing fees (5%)</li>
                    <li><strong>15-30 days before the event:</strong> 50% refund</li>
                    <li><strong>Less than 15 days before the event:</strong> No refund</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">3. Event Cancellation by Organizers</h2>
                  <p className="text-muted-foreground">
                    In the unlikely event that Kerala Startup Fest 2026 is cancelled by the organizers due to unforeseen circumstances (such as natural disasters, government restrictions, or force majeure), all registered participants will receive a full refund of the registration fee.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">4. Event Postponement</h2>
                  <p className="text-muted-foreground">
                    If the event is postponed to a later date:
                  </p>
                  <ul className="text-muted-foreground list-disc pl-6">
                    <li>Registrations will automatically be transferred to the new date</li>
                    <li>Participants who cannot attend on the new date may request a full refund within 14 days of the postponement announcement</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">5. Transfer of Registration</h2>
                  <p className="text-muted-foreground">
                    If you are unable to attend, you may transfer your registration to another eligible person:
                  </p>
                  <ul className="text-muted-foreground list-disc pl-6">
                    <li>Transfer requests must be submitted at least 7 days before the event</li>
                    <li>The new participant must meet all eligibility requirements</li>
                    <li>A nominal transfer fee may apply</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">6. Contest Entry Fees</h2>
                  <p className="text-muted-foreground">
                    Contest entry fees are non-refundable once the submission deadline has passed. However, if you withdraw before the submission deadline, a partial refund may be considered on a case-by-case basis.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">7. Non-Refundable Items</h2>
                  <p className="text-muted-foreground">
                    The following are non-refundable under any circumstances:
                  </p>
                  <ul className="text-muted-foreground list-disc pl-6">
                    <li>Processing and transaction fees</li>
                    <li>Add-on purchases (merchandise, workshops, etc.) after delivery</li>
                    <li>No-show registrations</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">8. Refund Process</h2>
                  <p className="text-muted-foreground">
                    To request a refund:
                  </p>
                  <ol className="text-muted-foreground list-decimal pl-6">
                    <li>Send an email to keralastartupfest@gmail.com with the subject "Refund Request"</li>
                    <li>Include your registration ID, name, and reason for cancellation</li>
                    <li>Refund requests will be processed within 7-10 business days</li>
                    <li>Approved refunds will be credited to the original payment method within 15-20 business days</li>
                  </ol>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">9. Special Circumstances</h2>
                  <p className="text-muted-foreground">
                    In cases of medical emergencies or other exceptional circumstances, please contact us directly. We will review such cases individually and may offer full or partial refunds at our discretion.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">10. Contact Information</h2>
                  <p className="text-muted-foreground">
                    For refund-related queries, please contact us at:
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
