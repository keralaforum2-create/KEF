import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageCircle, Home, ArrowRight } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export default function RegistrationSuccess() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle2 className="w-20 h-20 text-white mx-auto mb-4" />
            </motion.div>
            <motion.h1 
              className="text-3xl font-bold text-white mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Thank You for Registering!
            </motion.h1>
            <motion.p 
              className="text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Kerala Startup Fest 2026
            </motion.p>
          </div>

          <CardContent className="p-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center space-y-6"
            >
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <p className="text-sm text-green-800 dark:text-green-300 font-medium mb-1">
                  Your Registration ID
                </p>
                <p className="text-lg font-mono font-bold text-green-600 dark:text-green-400" data-testid="text-registration-id">
                  {id}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-muted/50 rounded-lg p-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0">
                    <SiWhatsapp className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">
                      Your Ticket Will Be Sent to WhatsApp
                    </p>
                    <p className="text-sm text-muted-foreground">
                      We will send your event ticket to your registered WhatsApp number within 24 hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-muted/50 rounded-lg p-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">
                      Confirmation Email Sent
                    </p>
                    <p className="text-sm text-muted-foreground">
                      A confirmation email has been sent to your registered email address.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  If you don't receive your ticket within 24 hours, please contact us.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link href="/">
                    <Button variant="outline" data-testid="button-go-home">
                      <Home className="w-4 h-4 mr-2" />
                      Go to Home
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button data-testid="button-contact-us">
                      Contact Us
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-6"
        >
          <p className="text-sm text-muted-foreground">
            January 7-8, 2026 | Kozhikode
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
