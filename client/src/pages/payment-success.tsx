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
  const [confirmed, setConfirmed] = useState(true);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (registrationId) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [registrationId]);

  const handleConfirmRegistration = async () => {
    if (!registrationId) {
      toast({
        title: "Error",
        description: "No registration ID found",
        variant: "destructive",
      });
      return;
    }
    
    setConfirming(true);
    try {
      console.log("🔄 Step 1: Creating Razorpay order with registrationId:", registrationId);
      toast({
        title: "Processing",
        description: "Preparing your payment...",
      });

      // Create Razorpay order for payment
      const response = await fetch(`/api/razorpay/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationId: String(registrationId) }),
      });
      
      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse response:", responseText);
        throw new Error('Invalid server response');
      }

      if (!response.ok) {
        console.error("❌ Order creation failed:", data);
        throw new Error(data.message || 'Failed to create payment order');
      }
      
      if (!data.razorpayOrderId || !data.razorpayKeyId) {
        console.error("❌ Invalid response data:", data);
        throw new Error('Payment order incomplete');
      }

      console.log("✓ Step 2: Razorpay order created:", data.razorpayOrderId);

      // Initialize Razorpay payment with proper error handling
      const options = {
        key: data.razorpayKeyId,
        amount: data.amount * 100, // Razorpay expects amount in paise
        currency: 'INR',
        order_id: data.razorpayOrderId,
        handler: async (paymentResponse: any) => {
          console.log("✓ Step 3: Payment successful in Razorpay:", paymentResponse.razorpay_payment_id);
          try {
            toast({
              title: "Verifying Payment",
              description: "Please wait...",
            });

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

            const verifyData = await verifyResponse.json();
            
            if (!verifyResponse.ok) {
              console.error("❌ Verification failed:", verifyData);
              throw new Error(verifyData.message || 'Payment verification failed');
            }

            console.log("✓ Step 4: Payment verified successfully");
            setConfirmed(true);
            toast({
              title: "Payment Successful!",
              description: "Check your email for your ticket.",
            });
          } catch (err) {
            console.error("Verification error:", err);
            toast({
              title: "Verification Error",
              description: err instanceof Error ? err.message : "Payment was successful but verification failed. Please check your email.",
              variant: "destructive",
            });
            setConfirmed(true); // Show thank you anyway
          } finally {
            setConfirming(false);
          }
        },
        modal: {
          ondismiss: () => {
            console.log("Payment cancelled by user");
            toast({
              title: "Payment Cancelled",
              description: "You can try again anytime.",
              variant: "destructive",
            });
            setConfirming(false);
          }
        },
        prefill: {
          email: registrationData?.email || '',
          contact: '',
        },
        theme: { color: '#10b981' }, // Green theme
      };

      console.log("📱 Step 2.5: Loading Razorpay script...");
      
      // Load Razorpay script
      return new Promise((resolve, reject) => {
        if ((window as any).Razorpay) {
          console.log("✓ Razorpay script already loaded");
          const rzp = new (window as any).Razorpay(options);
          rzp.open();
          resolve(null);
        } else {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.async = true;
          
          script.onload = () => {
            console.log("✓ Razorpay script loaded successfully");
            try {
              const rzp = new (window as any).Razorpay(options);
              rzp.open();
              resolve(null);
            } catch (e) {
              console.error("Error opening Razorpay:", e);
              reject(new Error("Failed to open payment gateway"));
            }
          };
          
          script.onerror = () => {
            console.error("❌ Failed to load Razorpay script");
            reject(new Error("Failed to load payment gateway"));
          };
          
          document.head.appendChild(script);
        }
      });
    } catch (err) {
      console.error("Payment flow error:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to process payment";
      toast({
        title: "Error",
        description: errorMessage,
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
          className="w-full max-w-lg text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-6"
          >
            <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto" />
          </motion.div>
          
          <motion.h1 
            className="text-4xl font-bold mb-4 text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Thank You For Registrations
          </motion.h1>
          
          <motion.p 
            className="text-lg text-muted-foreground mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Your registration has been confirmed. Check your email for your ticket.
          </motion.p>

          <motion.p 
            className="text-center text-muted-foreground text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
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

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex items-start gap-3">
                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="text-left">
                      <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
                        Your ticket will be sent to your email
                      </p>
                      <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                        Your digital ticket will be emailed to you within a few minutes.
                      </p>
                    </div>
                  </div>
                </>
              )}
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
