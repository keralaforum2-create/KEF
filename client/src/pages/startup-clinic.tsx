import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { insertStartupClinicSchema } from "@shared/schema";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function StartupClinic() {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [bookedTicket, setBookedTicket] = useState<"yes" | "no" | "">("");
  const [ticketNumber, setTicketNumber] = useState("");
  const [consultationTopic, setConsultationTopic] = useState("");
  const [verifiedTicket, setVerifiedTicket] = useState<any>(null);
  const [verifyError, setVerifyError] = useState(false);
  const { toast } = useToast();

  const verifyTicketMutation = useMutation({
    mutationFn: async (ticket: string) => {
      const response = await fetch(`/api/verify-ticket/${ticket}`);
      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      if (data.valid) {
        setVerifiedTicket(data);
        setVerifyError(false);
      } else {
        setVerifiedTicket(null);
        setVerifyError(true);
        toast({ 
          title: "Ticket not found", 
          description: "Please enter a valid registration ID",
          variant: "destructive" 
        });
      }
    },
    onError: () => {
      setVerifyError(true);
      toast({ 
        title: "Error", 
        description: "Failed to verify ticket",
        variant: "destructive" 
      });
    },
  });

  const submitMutation = useMutation({
    mutationFn: async () => {
      const data: any = {
        fullName,
        email,
        businessName,
        bookedTicket,
      };

      if (bookedTicket === "yes") {
        data.ticketNumber = ticketNumber;
      }

      if (consultationTopic) {
        data.consultationTopic = consultationTopic;
      }

      return await apiRequest("POST", "/api/startup-clinic", data);
    },
    onSuccess: () => {
      toast({ title: "Registration submitted successfully!" });
      setFullName("");
      setEmail("");
      setBusinessName("");
      setBookedTicket("");
      setTicketNumber("");
      setConsultationTopic("");
      setVerifiedTicket(null);
      setStep(1);
      queryClient.invalidateQueries({ queryKey: ["/api/startup-clinic"] });
    },
    onError: () => {
      toast({ 
        title: "Error submitting registration",
        variant: "destructive" 
      });
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-t-lg">
              <CardTitle className="text-2xl sm:text-3xl">Startup Clinic Consultation</CardTitle>
              <CardDescription className="text-teal-50">
                One-to-One guidance from startup experts and professionals
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-8 space-y-8">
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-base font-medium">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="Your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="h-10"
                      data-testid="input-full-name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-medium">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-10"
                      data-testid="input-email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessName" className="text-base font-medium">
                      Business Name / Organisation <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="businessName"
                      placeholder="Your business or organisation name"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="h-10"
                      data-testid="input-business-name"
                    />
                  </div>

                  <Button 
                    onClick={() => {
                      if (fullName && email && businessName) {
                        setStep(2);
                      } else {
                        toast({ 
                          title: "Required fields missing",
                          variant: "destructive"
                        });
                      }
                    }}
                    className="w-full bg-teal-600 hover:bg-teal-700"
                    data-testid="button-next-step1"
                  >
                    Next
                  </Button>
                </motion.div>
              )}

              {/* Step 2: Ticket Verification */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p className="font-semibold text-blue-900 dark:text-blue-100">
                      Did you book your ticket for Kerala Startup Fest 2026?
                    </p>
                  </div>

                  <RadioGroup value={bookedTicket} onValueChange={(val: any) => setBookedTicket(val)}>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer" data-testid="radio-yes">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes" className="flex-1 cursor-pointer font-medium">
                        Yes, I have a ticket
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer" data-testid="radio-no">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no" className="flex-1 cursor-pointer font-medium">
                        No, I don't have a ticket yet
                      </Label>
                    </div>
                  </RadioGroup>

                  {bookedTicket === "yes" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="ticketNumber" className="font-medium">
                          Registration ID / Ticket Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="ticketNumber"
                          placeholder="e.g., KSF-ABC123-XYZ"
                          value={ticketNumber}
                          onChange={(e) => setTicketNumber(e.target.value)}
                          className="h-10"
                          data-testid="input-ticket-number"
                        />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          You received this when you registered for the event
                        </p>
                      </div>

                      <Button
                        onClick={() => {
                          if (ticketNumber.trim()) {
                            verifyTicketMutation.mutate(ticketNumber);
                          } else {
                            toast({
                              title: "Enter ticket number",
                              variant: "destructive"
                            });
                          }
                        }}
                        variant="outline"
                        className="w-full"
                        disabled={verifyTicketMutation.isPending}
                        data-testid="button-verify-ticket"
                      >
                        {verifyTicketMutation.isPending ? "Verifying..." : "Verify Ticket"}
                      </Button>

                      {verifiedTicket && (
                        <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                          <div>
                            <p className="font-semibold text-green-900 dark:text-green-100">Ticket verified!</p>
                            <p className="text-sm text-green-800 dark:text-green-200">{verifiedTicket.fullName}</p>
                          </div>
                        </div>
                      )}

                      {verifyError && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                          <p className="font-semibold text-red-900 dark:text-red-100">Ticket not found</p>
                        </div>
                      )}
                    </motion.div>
                  )}

                  <div className="flex gap-3">
                    <Button 
                      onClick={() => setStep(1)}
                      variant="outline"
                      className="flex-1"
                      data-testid="button-back-step2"
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={() => {
                        if (!bookedTicket) {
                          toast({ 
                            title: "Please select an option",
                            variant: "destructive"
                          });
                        } else if (bookedTicket === "yes" && !verifiedTicket) {
                          toast({ 
                            title: "Please verify your ticket first",
                            variant: "destructive"
                          });
                        } else {
                          setStep(3);
                        }
                      }}
                      className="flex-1 bg-teal-600 hover:bg-teal-700"
                      data-testid="button-next-step2"
                    >
                      Next
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Consultation Topic & Submit */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <Label htmlFor="topic" className="text-base font-medium">
                      What would you like to consult about? (Optional)
                    </Label>
                    <Textarea
                      id="topic"
                      placeholder="e.g., Market validation, Fundraising strategy, Product development roadmap, etc."
                      value={consultationTopic}
                      onChange={(e) => setConsultationTopic(e.target.value)}
                      className="min-h-[120px]"
                      data-testid="textarea-consultation-topic"
                    />
                  </div>

                  <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <div className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-green-900 dark:text-green-100">
                        <p className="font-semibold mb-1">Ready to submit</p>
                        <p>Your consultation request will be reviewed by our startup experts and they will reach out to you shortly.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={() => setStep(2)}
                      variant="outline"
                      className="flex-1"
                      data-testid="button-back-step3"
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={() => submitMutation.mutate()}
                      disabled={submitMutation.isPending}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      data-testid="button-submit-consultation"
                    >
                      {submitMutation.isPending ? "Submitting..." : "Submit Consultation Request"}
                    </Button>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
