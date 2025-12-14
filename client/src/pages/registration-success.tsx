import { useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function RegistrationSuccess() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (id) {
      const timer = setTimeout(() => {
        setLocation(`/ticket/${id}`);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [id, setLocation]);

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
              Registration Confirmed!
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

              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                <p className="text-muted-foreground">
                  Redirecting to your ticket...
                </p>
                <p className="text-sm text-muted-foreground">
                  A confirmation email has been sent to your registered email address.
                </p>
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
