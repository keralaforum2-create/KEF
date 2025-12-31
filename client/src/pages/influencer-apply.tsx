import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
  youtubeLink: z.string().url().optional().or(z.literal("")),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions to apply"
  })
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
      youtubeLink: "",
      termsAccepted: false
    }
  });

  const onSubmit = async (data: InfluencerForm) => {
    setIsSubmitting(true);
    try {
      const { termsAccepted, ...submitData } = data;
      const response = await fetch("/api/influencer-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData)
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

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-8">
                <h2 className="font-bold text-lg mb-4 text-gray-900">Terms and Conditions</h2>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Influencer Invitation | Kerala Startup Fest</h3>
                    <p>Kerala Startup Fest invites passionate content creators and influencers to be part of India's most practical startup festival.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Selected influencers will receive an Influencer Pass, which includes all benefits of the Platinum Pass.</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Eligibility</h3>
                    <ul className="space-y-1 ml-4">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>Must be actively creating content on at least one platform: Facebook, Instagram, or YouTube</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Deliverables</h3>
                    <ul className="space-y-1 ml-4">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>1 promotional video before the event</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>1 experience video after the event</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Collaboration Terms</h3>
                    <p>By applying, you agree to collaborate/tag Kerala Startup Fest official pages on all posts shared on any platform related to the event.</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">How it works</h3>
                    <ul className="space-y-1 ml-4">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>Apply through the official KSF website</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>Applications will be reviewed by the KSF team</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>Once accepted, the Influencer Pass will be generated and emailed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>The pass will be issued after the pre-event video is published</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="italic">If you create content that inspires, this is your chance to collaborate with Kerala Startup Fest and amplify impact.</p>
                  </div>
                </div>
              </div>

              <FormField
                control={form.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border border-gray-200 p-4 bg-gray-50">
                    <FormControl>
                      <Checkbox 
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        data-testid="checkbox-influencer-terms"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-base font-semibold cursor-pointer">
                        I agree to the terms and conditions
                      </FormLabel>
                      <FormDescription>
                        By checking this box, you confirm that you understand and accept all the terms, eligibility requirements, deliverables, and collaboration terms mentioned above.
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-bold"
                disabled={isSubmitting || !form.watch("termsAccepted")}
                data-testid="button-influencer-submit"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
