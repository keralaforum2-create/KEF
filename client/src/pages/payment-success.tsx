import { useEffect, useState } from "react";
import { useLocation, useSearch } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, Ticket, AlertCircle } from "lucide-react";

interface RegistrationData {
  fullName: string;
  ticketCategory: string;
  registrationType: string;
  contestName?: string;
}

export default function PaymentSuccess() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const searchParams = new URLSearchParams(search);
  const registrationId = searchParams.get("registrationId");
  
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (registrationId) {
      fetch(`/api/ticket/${registrationId}`)
        .then(res => {
          if (!res.ok) {
            throw new Error("Failed to fetch");
          }
          return res.json();
        })
        .then(data => {
          if (data && !data.message && data.fullName) {
            setRegistrationData(data);
          } else {
            setError(true);
          }
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [registrationId]);

  const getTicketTypeDisplay = () => {
    if (!registrationData) return null;
    if (registrationData.registrationType === 'contest') {
      return registrationData.contestName || 'Contest Entry';
    }
    if (registrationData.ticketCategory === 'premium') {
      return 'Premium Pass';
    }
    return 'Normal Pass';
  };

  const viewTicket = () => {
    if (registrationId) {
      setLocation(`/ticket/${registrationId}`);
    }
  };

  if (!registrationId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-card flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center p-8">
          <p className="text-muted-foreground">Invalid registration. Please try registering again.</p>
          <Button onClick={() => setLocation("/participate")} className="mt-4">
            Go to Registration
          </Button>
        </Card>
      </div>
    );
  }

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
              {loading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : error ? (
                <div className="space-y-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      <p className="text-sm text-yellow-800 dark:text-yellow-300 font-medium">
                        Could not load registration details
                      </p>
                    </div>
                    <p className="text-xs text-yellow-700 dark:text-yellow-400">
                      Your payment was successful. Please check your email for confirmation.
                    </p>
                  </div>
                  <p className="text-lg font-mono font-bold text-muted-foreground" data-testid="text-registration-id">
                    {registrationId}
                  </p>
                </div>
              ) : (
                <>
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <p className="text-sm text-green-800 dark:text-green-300 font-medium mb-1">
                      Your Registration ID
                    </p>
                    <p className="text-lg font-mono font-bold text-green-600 dark:text-green-400" data-testid="text-registration-id">
                      {registrationId}
                    </p>
                  </div>

                  {getTicketTypeDisplay() && (
                    <div className="bg-card border rounded-lg p-4">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Ticket className="w-5 h-5 text-primary" />
                        <p className="text-sm text-muted-foreground font-medium">
                          Your Ticket Type
                        </p>
                      </div>
                      <p className="text-xl font-bold text-foreground" data-testid="text-ticket-type">
                        {getTicketTypeDisplay()}
                      </p>
                    </div>
                  )}

                  {registrationData && (
                    <p className="text-muted-foreground text-sm">
                      Welcome, <span className="font-medium text-foreground">{registrationData.fullName}</span>!
                    </p>
                  )}

                  <p className="text-muted-foreground text-sm">
                    A confirmation email with your ticket has been sent to your registered email address.
                  </p>
                </>
              )}

              <Button 
                onClick={viewTicket} 
                size="lg" 
                className="w-full"
                disabled={loading}
                data-testid="button-view-ticket"
              >
                <Ticket className="w-4 h-4 mr-2" />
                View & Download Your Ticket
              </Button>
            </motion.div>
          </CardContent>
        </Card>

        <motion.p 
          className="text-center text-muted-foreground text-sm mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          See you at Kerala Startup Fest 2026!
        </motion.p>
      </motion.div>
    </div>
  );
}
