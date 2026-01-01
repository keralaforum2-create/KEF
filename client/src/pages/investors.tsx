import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react";
import { ScrollFadeUp, ScrollFadeLeft, ScrollFadeRight } from "@/lib/animations";
import investorImage from "@assets/Building Strong Relationships for Business Growth with a B2B PR_1764503880578.jpg";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInvestorApplicationSchema, type InsertInvestorApplication } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function Investors() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const form = useForm<InsertInvestorApplication>({
    resolver: zodResolver(insertInvestorApplicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      bio: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: InsertInvestorApplication) => apiRequest("POST", "/api/investor-applications", data),
    onSuccess: () => {
      toast({ title: "Application Submitted", description: "Thank you for your interest. We'll get back to you soon." });
      form.reset();
      setOpen(false);
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 via-cyan-100/50 to-teal-50 dark:from-blue-950/30 dark:via-cyan-900/20 dark:to-teal-950/30">
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeUp>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl sm:text-7xl font-bold mb-6" style={{ fontFamily: "'Big Shoulders Display', sans-serif" }} data-testid="text-investors-title">
                INVESTORS
              </h1>
              <p className="text-lg text-muted-foreground">
                Investment opportunities in Kerala's most promising startups.
              </p>
            </div>
          </ScrollFadeUp>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollFadeLeft>
              <div>
                <motion.div 
                  className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <TrendingUp className="w-7 h-7 text-primary" />
                </motion.div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6" data-testid="text-investor">
                  Join as Investor
                </h2>
                <p className="text-muted-foreground mb-6">
                  Kerala Startup Fest is a great place to discover promising startups and early-stage ideas with high potential.
                </p>
                <p className="text-muted-foreground mb-6">As an investor, you can:</p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Discover new investment opportunities early",
                    "Connect with passionate young founders",
                    "Support promising startups with funding",
                    "Build your portfolio in Kerala's startup ecosystem"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>

                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                      <Button className="font-semibold" data-testid="button-apply-investor">
                        Apply as Investor
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Apply as Investor</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="Enter your email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your phone number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>About You / Your Firm</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Briefly describe your investment focus or firm" 
                                  className="min-h-[100px]"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button 
                          type="submit" 
                          className="w-full" 
                          disabled={mutation.isPending}
                        >
                          {mutation.isPending ? "Submitting..." : "Submit Application"}
                        </Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
            </ScrollFadeLeft>
            <ScrollFadeRight>
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={investorImage} 
                  alt="Business Partnership" 
                  className="w-full h-full rounded-3xl object-cover shadow-lg"
                />
              </motion.div>
            </ScrollFadeRight>
          </div>
        </div>
      </section>
    </div>
  );
}
