import { useEffect, useState } from "react";
import { useLocation, useSearch } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, Mail, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RegistrationData {
  fullName: string;
  email: string;
  ticketCategory: string;
  registrationType: string;
  contestName?: string;
}

export default function PaymentSuccess() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const searchParams = new URLSearchParams(search);
  const registrationId = searchParams.get("registrationId");
  const { toast } = useToast();
  
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [confirming, setConfirming] = useState(false);

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

  const handleConfirmRegistration = async () => {
    if (!registrationId) return;
    
    setConfirming(true);
    try {
      // Create Razorpay order for payment
      const response = await fetch(`/api/razorpay/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationId }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create payment order');
      }
      
      const data = await response.json();
      
      if (!data.success || !data.razorpayOrderId) {
        throw new Error('Invalid payment order response');
      }

      // Initialize Razorpay payment
      const options = {
        key: data.razorpayKeyId,
        amount: data.amount,
        currency: 'INR',
        order_id: data.razorpayOrderId,
        handler: async (paymentResponse: any) => {
          try {
            const verifyResponse = await fetch(`/api/razorpay/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
                registrationId,
              }),
            });

            if (verifyResponse.ok) {
              setConfirmed(true);
              toast({
                title: "Payment Successful!",
                description: "Check your email for your ticket.",
              });
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (err) {
            toast({
              title: "Verification Error",
              description: "Payment was successful but verification failed. Please check your email.",
              variant: "destructive",
            });
          } finally {
            setConfirming(false);
          }
        },
        prefill: {
          email: registrationData?.email || '',
          contact: '',
        },
        theme: { color: '#3399cc' },
      };

      // Load and initialize Razorpay
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      };
      document.head.appendChild(script);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to process payment. Please try again.",
        variant: "destructive",
      });
      setConfirming(false);
    }
  };

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

  if (confirmed) {
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
                Thank You!
              </motion.h1>
              <motion.p 
                className="text-white/90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Your Registration is Confirmed
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
                    {registrationId}
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
                      Email Verification
                    </p>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    A verification link has been sent to your email. Please verify your registration to complete the process.
                  </p>
                </div>

                <Button 
                  onClick={() => setLocation("/participate")} 
                  size="lg" 
                  variant="outline"
                  className="w-full"
                  data-testid="button-return-home"
                >
                  Back to Home
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
              Payment Successful!
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

                  {registrationData && (
                    <p className="text-muted-foreground text-sm">
                      Welcome, <span className="font-medium text-foreground">{registrationData.fullName}</span>!
                    </p>
                  )}

                  <p className="text-muted-foreground text-sm">
                    Your payment has been processed successfully.
                  </p>
                </>
              )}

              <Button 
                onClick={handleConfirmRegistration} 
                size="lg" 
                className="w-full"
                disabled={loading || confirming}
                data-testid="button-confirm-registration"
              >
                {confirming ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Confirming...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Confirm Registration
                  </>
                )}
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
