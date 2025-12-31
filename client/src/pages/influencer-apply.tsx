import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Instagram, Facebook, Youtube } from "lucide-react";

const influencerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  instagramLink: z.string().url().optional().or(z.literal("")),
  facebookLink: z.string().url().optional().or(z.literal("")),
  youtubeLink: z.string().url().optional().or(z.literal(""))
}).refine(
  (data) => data.instagramLink || data.facebookLink || data.youtubeLink,
  {
    message: "At least one social media profile link is required",
    path: ["instagramLink"]
  }
);

type InfluencerForm = z.infer<typeof influencerSchema>;

export default function InfluencerApply() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InfluencerForm>({
    resolver: zodResolver(influencerSchema),
    defaultValues: {
      fullName: "",
      instagramLink: "",
      facebookLink: "",
      youtubeLink: ""
    }
  });

  const onSubmit = async (data: InfluencerForm) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/influencer-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      toast({
        title: "Application Submitted",
        description: "Thank you for applying! We'll review your application and get back to you soon."
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 sm:p-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Be an Influencer at KSF
            </h1>
            <p className="text-lg text-gray-600">
              Join India's most practical startup festival as an influencer and get exclusive benefits
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-lg mb-3 text-gray-900">Eligibility & Requirements</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Must be actively creating content on at least one platform: Facebook, Instagram, or YouTube</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Selected influencers will receive an Influencer Pass (includes all benefits of Platinum Pass)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Deliverables: 1 promotional video before the event, 1 experience video after</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Must collaborate/tag Kerala Startup Fest official pages on all related posts</span>
              </li>
            </ul>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Full Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your full name" 
                        {...field}
                        className="h-12"
                        data-testid="input-influencer-fullname"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <p className="text-base font-semibold text-gray-900">Social Media Profiles</p>
                <p className="text-sm text-gray-600 mb-4">At least one profile link is required</p>

                <FormField
                  control={form.control}
                  name="instagramLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-base">
                        <Instagram className="w-5 h-5 text-pink-600" />
                        Instagram Profile Link
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://instagram.com/yourprofile" 
                          {...field}
                          className="h-12"
                          data-testid="input-influencer-instagram"
                        />
                      </FormControl>
                      <FormDescription>Optional if you have other profiles</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="facebookLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-base">
                        <Facebook className="w-5 h-5 text-blue-600" />
                        Facebook Profile Link
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://facebook.com/yourprofile" 
                          {...field}
                          className="h-12"
                          data-testid="input-influencer-facebook"
                        />
                      </FormControl>
                      <FormDescription>Optional if you have other profiles</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="youtubeLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-base">
                        <Youtube className="w-5 h-5 text-red-600" />
                        YouTube Channel Link
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://youtube.com/@yourchannel" 
                          {...field}
                          className="h-12"
                          data-testid="input-influencer-youtube"
                        />
                      </FormControl>
                      <FormDescription>Optional if you have other profiles</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-bold"
                disabled={isSubmitting}
                data-testid="button-influencer-submit"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </Form>

          <p className="text-xs text-gray-500 text-center mt-6">
            By applying, you agree to collaborate with Kerala Startup Fest and tag our official pages on all posts related to the event.
          </p>
        </Card>
      </div>
    </div>
  );
}
