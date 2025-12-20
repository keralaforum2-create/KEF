import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "wouter";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollFadeUp } from "@/lib/animations";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const speakerSchema = z.object({
  founderName: z.string().min(2, "Name is required"),
  startupName: z.string().min(2, "Startup name is required"),
  designation: z.string().min(2, "Designation is required"),
  sector: z.string().min(2, "Sector is required"),
  yearFounded: z.string().min(4, "Year founded is required"),
  startupBrief: z.string().min(10, "Brief must be at least 10 characters").max(50, "Brief must be max 50 words"),
  startupStory: z.string().min(10, "Story must be at least 10 characters").max(75, "Story must be max 75 words"),
  whyFeature: z.string().max(50, "Max 50 words"),
  website: z.string().url("Must be a valid URL"),
  contactNumber: z.string().min(10, "Valid contact number required"),
  email: z.string().email("Valid email required"),
  agreedToFee: z.boolean().refine(val => val === true, "You must agree to the application fee"),
});

type SpeakerFormData = z.infer<typeof speakerSchema>;

export default function SpeakerRegister() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const form = useForm<SpeakerFormData>({
    resolver: zodResolver(speakerSchema),
    defaultValues: {
      founderName: "",
      startupName: "",
      designation: "",
      sector: "",
      yearFounded: "",
      startupBrief: "",
      startupStory: "",
      whyFeature: "",
      website: "",
      contactNumber: "",
      email: "",
      agreedToFee: false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: SpeakerFormData) => {
      if (!razorpayLoaded || !(window as any).Razorpay) {
        throw new Error("Razorpay is not loaded");
      }

      // Create Razorpay order
      const orderResponse = await apiRequest("/api/speaker-razorpay/create-order", {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          contactNumber: data.contactNumber,
          founderName: data.founderName,
          startupName: data.startupName,
        }),
      });

      if (!orderResponse.orderId) {
        throw new Error("Failed to create payment order");
      }

      return new Promise((resolve, reject) => {
        const options = {
          key: orderResponse.keyId,
          amount: 399900,
          currency: "INR",
          name: "Made in Kerala Podcast",
          description: "Podcast Speaker Application Fee",
          order_id: orderResponse.orderId,
          handler: async function (response: any) {
            try {
              // Verify payment
              const verifyResponse = await apiRequest("/api/speaker-razorpay/verify", {
                method: "POST",
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  applicationData: data,
                }),
              });

              if (verifyResponse.success) {
                resolve(verifyResponse);
              } else {
                reject(new Error("Payment verification failed"));
              }
            } catch (error) {
              reject(error);
            }
          },
          prefill: {
            name: data.founderName,
            email: data.email,
            contact: data.contactNumber,
          },
          theme: {
            color: "#dc2626",
          },
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.on("payment.failed", function (response: any) {
          reject(new Error("Payment failed: " + response.error.description));
        });
        razorpay.open();
      });
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Application Submitted",
        description: "Thank you for your application! We'll review it and contact you soon.",
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process payment",
        variant: "destructive",
      });
    },
  });

  if (submitted) {
    return (
      <div className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <ScrollFadeUp>
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl text-green-600">✓</span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Application Received!</h2>
                <p className="text-gray-600 mb-4">
                  Thank you for your interest in being a podcast speaker at Kerala Startup Fest 2026.
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Our team will review your application and contact you within 3-5 business days.
                </p>
                <Button onClick={() => navigate("/")} variant="default">
                  Return to Home
                </Button>
              </CardContent>
            </Card>
          </ScrollFadeUp>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <ScrollFadeUp>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/speakers")}
            className="mb-6"
            data-testid="button-back-to-speakers"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Speakers
          </Button>
        </ScrollFadeUp>

        <ScrollFadeUp delay={0.1}>
          <Card className="mb-8">
            <CardHeader className="bg-red-600 text-white rounded-t-lg">
              <CardTitle className="text-3xl">Made in Kerala - Podcast Speaker Application</CardTitle>
              <CardDescription className="text-red-100">
                Share your startup story in a 10-minute podcast episode
              </CardDescription>
            </CardHeader>
          </Card>
        </ScrollFadeUp>

        <ScrollFadeUp delay={0.2}>
          <Card>
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
                  {/* Founder Info Section */}
                  <div className="border-b pb-6">
                    <h3 className="text-lg font-semibold mb-4">Founder Information</h3>
                    
                    <FormField
                      control={form.control}
                      name="founderName"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel>Founder Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} data-testid="input-founder-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="designation"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel>Designation *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Founder, CEO, Co-founder" {...field} data-testid="input-designation" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel>Email ID *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 XXXXX XXXXX" {...field} data-testid="input-contact" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Startup Info Section */}
                  <div className="border-b pb-6">
                    <h3 className="text-lg font-semibold mb-4">Startup Information</h3>
                    
                    <FormField
                      control={form.control}
                      name="startupName"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel>Startup Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your startup name" {...field} data-testid="input-startup-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sector"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel>Startup Sector / Industry *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., EdTech, FoodTech, HealthTech, Media, D2C, Services" 
                              {...field} 
                              data-testid="input-sector"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="yearFounded"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel>Year Founded *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 2020" {...field} data-testid="input-year-founded" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website / Instagram / LinkedIn *</FormLabel>
                          <FormControl>
                            <Input placeholder="https://..." {...field} data-testid="input-website" />
                          </FormControl>
                          <FormDescription>
                            Provide any one of the above links
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Story & Content Section */}
                  <div className="border-b pb-6">
                    <h3 className="text-lg font-semibold mb-4">Your Story</h3>
                    
                    <FormField
                      control={form.control}
                      name="startupBrief"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel>Brief About Your Startup *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe your startup in max 50 words" 
                              className="resize-none h-24"
                              {...field}
                              data-testid="textarea-startup-brief"
                            />
                          </FormControl>
                          <FormDescription>
                            Maximum 50 words
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="startupStory"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel>Your Startup Story / Key Insight *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Share your startup journey or key insights in max 75 words" 
                              className="resize-none h-24"
                              {...field}
                              data-testid="textarea-startup-story"
                            />
                          </FormControl>
                          <FormDescription>
                            What would you like to share in the 10-minute podcast? Maximum 75 words
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="whyFeature"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Why Should We Feature Your Story?</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us why your story would be interesting (optional, max 50 words)" 
                              className="resize-none h-20"
                              {...field}
                              data-testid="textarea-why-feature"
                            />
                          </FormControl>
                          <FormDescription>
                            Optional - Maximum 50 words
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Fee Section */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="font-semibold mb-2">Application Fee</h3>
                    <p className="text-lg font-bold text-blue-600 mb-3">₹3,999</p>
                    <p className="text-sm text-gray-700 mb-3">
                      Full refund will be provided to applicants who are not selected.
                    </p>
                    <FormField
                      control={form.control}
                      name="agreedToFee"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <input 
                              type="checkbox" 
                              checked={field.value}
                              onChange={field.onChange}
                              data-testid="checkbox-agree-fee"
                              className="w-4 h-4"
                            />
                          </FormControl>
                          <label className="text-sm cursor-pointer">
                            I agree to the ₹3,999 application fee
                          </label>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Important Notes */}
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h3 className="font-semibold mb-2 text-amber-900">Important Notes</h3>
                    <ul className="text-sm text-amber-800 space-y-1">
                      <li>• Podcast duration: Maximum 10 minutes</li>
                      <li>• Selection is application-based</li>
                      <li>• Selected candidates will be contacted by the KSF team</li>
                      <li>• Final edited video will be delivered and branded with Kerala Economic Forum & KSF watermark</li>
                    </ul>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-3">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="flex-1 bg-red-600 hover:bg-red-700"
                      disabled={mutation.isPending || !razorpayLoaded}
                      data-testid="button-submit-speaker"
                    >
                      {mutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing Payment...
                        </>
                      ) : (
                        "Submit & Pay ₹3,999"
                      )}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="lg"
                      onClick={() => navigate("/speakers")}
                      data-testid="button-cancel-speaker"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </ScrollFadeUp>
      </div>
    </div>
  );
}
