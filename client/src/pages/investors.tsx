import { motion } from "framer-motion";
import { ScrollFadeUp } from "@/lib/animations";

export default function Investors() {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 via-cyan-100/50 to-teal-50 dark:from-blue-950/30 dark:via-cyan-900/20 dark:to-teal-950/30">
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeUp>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-6" data-testid="text-investors-title">
                Investors
              </h1>
              <p className="text-lg text-muted-foreground">
                Investment opportunities in Kerala's most promising startups.
              </p>
            </div>
          </ScrollFadeUp>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground text-lg">Content coming soon...</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
