import { motion } from "framer-motion";
import { ScrollFadeUp } from "@/lib/animations";

export default function Shipping() {
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
              <h1 className="text-3xl lg:text-4xl font-bold mb-8" data-testid="text-shipping-title">
                Shipping & Delivery Policy
              </h1>
              
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-muted-foreground">
                  <strong>Last Updated:</strong> December 2024
                </p>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">1. Nature of Service</h2>
                  <p className="text-muted-foreground">
                    Kerala Startup Fest is a live event and conference. The registration fee covers access to the event, sessions, workshops, and networking opportunities at the venue. This is a service-based offering and does not involve the shipping or delivery of physical goods.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">2. Digital Delivery</h2>
                  <p className="text-muted-foreground">
                    Upon successful registration and payment, participants will receive:
                  </p>
                  <ul className="text-muted-foreground list-disc pl-6">
                    <li><strong>Confirmation Email:</strong> Sent immediately to the registered email address containing registration details and a unique QR code ticket.</li>
                    <li><strong>Event Updates:</strong> Regular email communications about event schedules, speakers, and important announcements.</li>
                    <li><strong>Digital Ticket:</strong> A unique QR code ticket that can be accessed online and used for check-in at the venue.</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">3. Delivery Timeline</h2>
                  <p className="text-muted-foreground">
                    All digital confirmations are delivered instantly upon successful payment processing:
                  </p>
                  <ul className="text-muted-foreground list-disc pl-6">
                    <li><strong>Registration Confirmation:</strong> Within minutes of successful payment</li>
                    <li><strong>Event Ticket (QR Code):</strong> Immediately available in your confirmation email</li>
                    <li><strong>Event Updates:</strong> Sent periodically leading up to the event</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">4. Event Venue Access</h2>
                  <p className="text-muted-foreground">
                    The event will be held at a physical venue in Kozhikode, Kerala. Your registration grants you access to:
                  </p>
                  <ul className="text-muted-foreground list-disc pl-6">
                    <li>Entry to all sessions and workshops included in your registration tier</li>
                    <li>Access to networking areas and exhibition spaces</li>
                    <li>Event materials and resources provided at the venue</li>
                    <li>Refreshments and meals as specified in your registration package</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">5. Physical Materials at Event</h2>
                  <p className="text-muted-foreground">
                    While no products are shipped prior to the event, registered participants may receive physical materials at the venue, which may include:
                  </p>
                  <ul className="text-muted-foreground list-disc pl-6">
                    <li>Event badges and lanyards</li>
                    <li>Printed schedules and brochures</li>
                    <li>Certificates of participation (if applicable)</li>
                    <li>Promotional materials from sponsors</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">6. Contest Submissions</h2>
                  <p className="text-muted-foreground">
                    For contests and competitions, all submissions are made digitally through our online platform. No physical shipping of submissions is required.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">7. Issues with Digital Delivery</h2>
                  <p className="text-muted-foreground">
                    If you do not receive your confirmation email or digital ticket:
                  </p>
                  <ul className="text-muted-foreground list-disc pl-6">
                    <li>Check your spam or junk folder</li>
                    <li>Ensure you entered the correct email address during registration</li>
                    <li>Contact our support team for assistance</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">8. Contact Us</h2>
                  <p className="text-muted-foreground">
                    For any questions regarding this policy or issues with receiving your registration confirmation, please contact us:
                  </p>
                  <ul className="text-muted-foreground list-disc pl-6">
                    <li>Email: keralastartupfest@gmail.com</li>
                    <li>Phone: +91 9072344431</li>
                    <li>Address 1: Kerala Economic Forum , Venture Arcade, Mavoor Rd, above Croma, Thondayad, Kozhikode, Kerala</li>
                    <li>Address 2: Caliph Life School, Puduppadi, Thamarassery, Kerala 673586, India</li>
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
