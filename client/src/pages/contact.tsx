import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  Calendar,
  Clock
} from "lucide-react";
import {
  ScrollFadeUp,
  ScrollFadeLeft,
  ScrollFadeRight,
  StaggerContainer,
  StaggerItem
} from "@/lib/animations";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  userType: z.enum(["student", "teacher", "institution", "investor", "sponsor", "other"], {
    required_error: "Please select your category",
  }),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const formFieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.4,
      ease: "easeOut"
    }
  })
};

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      userType: undefined,
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-red-50 via-rose-100/50 to-red-50 dark:from-red-950/30 dark:via-rose-900/20 dark:to-red-950/30">
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeUp>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-6" data-testid="text-contact-title">
                Contact & Venue
              </h1>
              <p className="text-lg text-muted-foreground">
                Get in touch with us for any queries about Kerala Startup Fest 2026.
              </p>
            </div>
          </ScrollFadeUp>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <ScrollFadeLeft className="lg:col-span-3">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-6" data-testid="text-send-message">
                  Send Us a Message
                </h2>
                <Card>
                  <CardContent className="p-6 sm:p-8">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <motion.div
                          custom={0}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          variants={formFieldVariants}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                        >
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Your name" 
                                    {...field} 
                                    data-testid="input-name"
                                  />
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
                                  <Input 
                                    type="email" 
                                    placeholder="your@email.com" 
                                    {...field} 
                                    data-testid="input-email"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>
                        
                        <motion.div
                          custom={1}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          variants={formFieldVariants}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                        >
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone (Optional)</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="tel" 
                                    placeholder="+91 98765 43210" 
                                    {...field} 
                                    data-testid="input-phone"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="userType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>I am a</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger data-testid="select-user-type">
                                      <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="student">Student</SelectItem>
                                    <SelectItem value="teacher">Teacher</SelectItem>
                                    <SelectItem value="institution">Institution</SelectItem>
                                    <SelectItem value="investor">Investor</SelectItem>
                                    <SelectItem value="sponsor">Sponsor</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>
                        
                        <motion.div
                          custom={2}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          variants={formFieldVariants}
                        >
                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="How can we help you?" 
                                    className="min-h-[120px] resize-none"
                                    {...field} 
                                    data-testid="input-message"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>
                        
                        <motion.div
                          custom={3}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          variants={formFieldVariants}
                        >
                          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                            <Button 
                              type="submit" 
                              className="w-full sm:w-auto font-semibold"
                              disabled={mutation.isPending}
                              data-testid="button-submit-contact"
                            >
                              {mutation.isPending ? "Sending..." : "Submit"}
                              <Send className="w-4 h-4 ml-2" />
                            </Button>
                          </motion.div>
                        </motion.div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </ScrollFadeLeft>
            
            <ScrollFadeRight className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-6" data-testid="text-get-in-touch">
                  Get in Touch
                </h2>
                <p className="text-muted-foreground mb-6">
                  For any queries regarding registration, contests, partnerships or sponsorships, please contact us.
                </p>
                <StaggerContainer className="space-y-4" staggerDelay={0.1}>
                  <StaggerItem>
                    <motion.div 
                      className="flex items-start gap-4"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div 
                        className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Mail className="w-5 h-5 text-primary" />
                      </motion.div>
                      <div>
                        <p className="font-medium mb-1">Email</p>
                        <a 
                          href="mailto:keralastartupfest@gmail.com" 
                          className="text-muted-foreground hover:text-primary transition-colors"
                          data-testid="contact-email"
                        >
                          keralastartupfest@gmail.com
                        </a>
                      </div>
                    </motion.div>
                  </StaggerItem>
                  <StaggerItem>
                    <motion.div 
                      className="flex items-start gap-4"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div 
                        className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Phone className="w-5 h-5 text-primary" />
                      </motion.div>
                      <div>
                        <p className="font-medium mb-1">Phone</p>
                        <a 
                          href="tel:+919072344431" 
                          className="text-muted-foreground hover:text-primary transition-colors"
                          data-testid="contact-phone"
                        >
                          +91 9072344431
                        </a>
                      </div>
                    </motion.div>
                  </StaggerItem>
                </StaggerContainer>
              </div>
              
              <div>
                <h3 className="font-semibold text-xl mb-4" data-testid="text-venue">Venue</h3>
                <p className="text-muted-foreground mb-4">
                  Kerala Startup Fest 2026 will be held at:
                </p>
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <Card className="bg-background">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <motion.div 
                          className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <MapPin className="w-5 h-5 text-primary" />
                        </motion.div>
                        <div>
                          <h4 className="font-bold text-gray-900">Aspin Courtyards</h4>
                          <p className="font-medium">Aspin Courtyards</p>
                          <p className="text-muted-foreground text-sm">
                            Beach Road, Vellayil, Kozhikode<br />
                            Kerala, India
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
              
              <div>
                <h3 className="font-semibold text-xl mb-4">Event Details</h3>
                <StaggerContainer className="space-y-3" staggerDelay={0.1}>
                  <StaggerItem>
                    <motion.div 
                      className="flex items-center gap-3"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground">7-8 January 2026</span>
                    </motion.div>
                  </StaggerItem>
                  <StaggerItem>
                    <motion.div 
                      className="flex items-center gap-3"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Clock className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground">Two-day festival</span>
                    </motion.div>
                  </StaggerItem>
                </StaggerContainer>
              </div>
            </ScrollFadeRight>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeUp>
            <motion.div 
              className="aspect-video w-full max-w-4xl mx-auto rounded-2xl overflow-hidden bg-muted"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.7!2d75.7684!3d11.2588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65938563d4747%3A0x89793f46f48f484a!2sAspin%20Courtyards!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Event Location Map"
                data-testid="map-venue"
              />
            </motion.div>
          </ScrollFadeUp>
        </div>
      </section>
    </div>
  );
}
