import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertExpoRegistrationSchema, type InsertExpoRegistration } from "@shared/schema";
import { useLocation } from "wouter";
import { pixelEvents } from "@/lib/pixel";

export default function ExpoRegister() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [expoName, setExpoName] = useState<string>("");

  const form = useForm<InsertExpoRegistration>({
    resolver: zodResolver(insertExpoRegistrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      businessName: "",
      expoName: "",
    },
  });

  const { mutate: submitRegistration, isPending } = useMutation({
    mutationFn: async (data: InsertExpoRegistration) => {
      return await apiRequest<any>("POST", "/api/expo-registrations", data);
    },
    onSuccess: () => {
      pixelEvents.registration({ value: 0 });
      toast({
        title: "Success",
        description: "Registration submitted successfully!",
      });
      form.reset();
      setTimeout(() => setLocation("/"), 2000);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit registration",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: InsertExpoRegistration) => {
    submitRegistration(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
      <div className="max-w-md mx-auto">
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl">Expo Registration</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="expoName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expo Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g., Young Expo"
                          data-testid="input-expo-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Your full name"
                          data-testid="input-full-name"
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
                          {...field}
                          type="email"
                          placeholder="your@email.com"
                          data-testid="input-email"
                        />
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
                        <Input
                          {...field}
                          placeholder="10-digit phone number"
                          data-testid="input-phone"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Your business name"
                          data-testid="input-business-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full"
                  data-testid="button-submit-registration"
                >
                  {isPending ? "Submitting..." : "Register Now"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
