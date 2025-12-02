import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useSearch } from "wouter";
import { z } from "zod";
import QRCode from "qrcode";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
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
  GraduationCap, 
  Users, 
  Lightbulb, 
  CheckCircle2, 
  ArrowRight,
  Trophy,
  Network,
  Presentation,
  Send,
  Building2,
  BookOpen,
  Rocket,
  QrCode,
  Download,
  X
} from "lucide-react";
import {
  ScrollFadeUp,
  ScrollFadeLeft,
  ScrollFadeRight,
  StaggerContainer,
  StaggerItem,
  CardWave,
  RotateIn
} from "@/lib/animations";
import qrCodeImage from "@assets/upi_qr_99 (1)_1764521056107.png";
import schoolsCollegesImage from "@assets/O sucesso está no topo de sua agenda Foto de alto ângulo de um grupo de empresários tendo uma reunião em um escritório _ Foto Premium_1764503607085.jpg";
import eventPosterImage from "@assets/Screenshot_2025-12-02_221240_1764693826335.png";

const registrationSchema = z.object({
  registrationType: z.enum(["expert-session", "contest"], {
    required_error: "Please select registration type",
  }),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  age: z.string().optional(),
  institution: z.string().optional(),
  contestName: z.string().optional(),
  participantType: z.enum(["school-student", "college-student", "common"]).optional(),
  schoolGrade: z.string().optional(),
  collegeYear: z.string().optional(),
  collegeCourse: z.string().optional(),
  teamMember1Name: z.string().optional(),
  teamMember1Email: z.string().optional(),
  teamMember1Phone: z.string().optional(),
  teamMember1Grade: z.string().optional(),
  teamMember1Age: z.string().optional(),
  teamMember2Name: z.string().optional(),
  teamMember2Email: z.string().optional(),
  teamMember2Phone: z.string().optional(),
  teamMember2Grade: z.string().optional(),
  teamMember2Age: z.string().optional(),
  paymentScreenshot: z.any().optional(),
  pitchStartupName: z.string().optional(),
  pitchElevatorPitch: z.string().max(300, "Elevator pitch must be under 50 words").optional(),
  pitchProblemStatement: z.string().optional(),
  pitchProposedSolution: z.string().optional(),
  pitchProductName: z.string().optional(),
  pitchProductDescription: z.string().optional(),
  pitchPricingModel: z.string().optional(),
  pitchCostPerUnit: z.string().optional(),
  pitchSellingPrice: z.string().optional(),
  pitchProfitPerUnit: z.string().optional(),
  pitchTotalCapitalRequired: z.string().optional(),
  pitchRevenuePerUser: z.string().optional(),
  pitchTargetCustomers: z.string().optional(),
  pitchMarketSize: z.string().optional(),
  pitchCompetitorAnalysis: z.string().optional(),
  pitchRevenueModel: z.string().optional(),
  pitchRevenueStreams: z.array(z.string()).optional(),
  pitchYear1Revenue: z.string().optional(),
  pitchYear2Revenue: z.string().optional(),
  pitchYear3Revenue: z.string().optional(),
  pitchYear4Revenue: z.string().optional(),
  pitchYear5Revenue: z.string().optional(),
  pitchExpectedRoi: z.string().optional(),
  pitchBreakevenPeriod: z.string().optional(),
  pitchFeasibilityReasons: z.string().optional(),
  pitchCurrentStage: z.string().optional(),
  pitchSupportingFiles: z.any().optional(),
  pitchDemoVideoLink: z.string().optional(),
  pitchDeclarationConfirmed: z.boolean().optional(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const contests = [
  "Business Quiz – School Edition",
  "The Pitch Room",
  "Camera Craft – Photo & Video Challenge",
  "Just a Minute (JAM)",
];

const benefits = [
  {
    icon: BookOpen,
    title: "Learn from Experts",
    description: "Learn directly from real entrepreneurs and experts",
  },
  {
    icon: Trophy,
    title: "Compete & Win",
    description: "Take part in high-quality contests and win prizes",
  },
  {
    icon: Presentation,
    title: "Pitch Your Ideas",
    description: "Pitch your startup idea to real investors",
  },
  {
    icon: Trophy,
    title: "Win Recognition",
    description: "Win prizes, recognition and possible funding",
  },
  {
    icon: Network,
    title: "Build Network",
    description: "Build contacts and friendships with like-minded people",
  },
];

const formFieldVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.4,
      ease: "easeOut"
    }
  })
};

export default function Participate() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      registrationType: undefined,
      fullName: "",
      email: "",
      phone: "",
      age: "",
      institution: "",
      contestName: "",
      participantType: undefined,
      schoolGrade: "",
      collegeYear: "",
      collegeCourse: "",
      teamMember1Name: "",
      teamMember1Email: "",
      teamMember1Phone: "",
      teamMember1Grade: "",
      teamMember1Age: "",
      teamMember2Name: "",
      teamMember2Email: "",
      teamMember2Phone: "",
      teamMember2Grade: "",
      teamMember2Age: "",
      paymentScreenshot: undefined,
      pitchStartupName: "",
      pitchElevatorPitch: "",
      pitchProblemStatement: "",
      pitchProposedSolution: "",
      pitchProductName: "",
      pitchProductDescription: "",
      pitchPricingModel: "",
      pitchCostPerUnit: "",
      pitchSellingPrice: "",
      pitchProfitPerUnit: "",
      pitchTotalCapitalRequired: "",
      pitchRevenuePerUser: "",
      pitchTargetCustomers: "",
      pitchMarketSize: "",
      pitchCompetitorAnalysis: "",
      pitchRevenueModel: "",
      pitchRevenueStreams: [],
      pitchYear1Revenue: "",
      pitchYear2Revenue: "",
      pitchYear3Revenue: "",
      pitchYear4Revenue: "",
      pitchYear5Revenue: "",
      pitchExpectedRoi: "",
      pitchBreakevenPeriod: "",
      pitchFeasibilityReasons: "",
      pitchCurrentStage: "",
      pitchSupportingFiles: undefined,
      pitchDemoVideoLink: "",
      pitchDeclarationConfirmed: false,
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(searchString);
    const contestParam = params.get("contest");
    const typeParam = params.get("type");
    if (contestParam) {
      const decodedContest = decodeURIComponent(contestParam);
      if (contests.includes(decodedContest)) {
        form.setValue("registrationType", "contest");
        form.setValue("contestName", decodedContest);
        setShowForm(true);
        setTimeout(() => {
          const registerSection = document.getElementById("register");
          if (registerSection) {
            registerSection.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    } else if (typeParam === "expert-session" || typeParam === "contest") {
      form.setValue("registrationType", typeParam);
      setShowForm(true);
      setTimeout(() => {
        const registerSection = document.getElementById("register");
        if (registerSection) {
          registerSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [searchString, form]);

  const registrationType = form.watch("registrationType");
  const contestName = form.watch("contestName");
  const participantType = form.watch("participantType");
  const isPitchRoom = contestName === "The Pitch Room";
  const isBusinessQuiz = contestName === "Business Quiz – School Edition";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("paymentScreenshot", file);
    }
  };

  const handleDownloadQR = () => {
    const link = document.createElement("a");
    link.href = qrCodeImage;
    link.download = "payment-qr-code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePitchFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("pitchSupportingFiles", file);
    }
  };

  const mutation = useMutation({
    mutationFn: async (data: RegistrationFormData) => {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("age", data.age);
      formData.append("institution", data.institution || "");
      formData.append("registrationType", data.registrationType);
      formData.append("contestName", data.contestName || "");
      formData.append("participantType", data.participantType || "");
      formData.append("schoolGrade", data.schoolGrade || "");
      formData.append("collegeYear", data.collegeYear || "");
      formData.append("collegeCourse", data.collegeCourse || "");
      formData.append("teamMember1Name", data.teamMember1Name || "");
      formData.append("teamMember2Name", data.teamMember2Name || "");
      
      if (data.paymentScreenshot instanceof File) {
        formData.append("paymentScreenshot", data.paymentScreenshot);
      }

      formData.append("pitchStartupName", data.pitchStartupName || "");
      formData.append("pitchElevatorPitch", data.pitchElevatorPitch || "");
      formData.append("pitchProblemStatement", data.pitchProblemStatement || "");
      formData.append("pitchProposedSolution", data.pitchProposedSolution || "");
      formData.append("pitchProductName", data.pitchProductName || "");
      formData.append("pitchProductDescription", data.pitchProductDescription || "");
      formData.append("pitchPricingModel", data.pitchPricingModel || "");
      formData.append("pitchCostPerUnit", data.pitchCostPerUnit || "");
      formData.append("pitchSellingPrice", data.pitchSellingPrice || "");
      formData.append("pitchProfitPerUnit", data.pitchProfitPerUnit || "");
      formData.append("pitchTotalCapitalRequired", data.pitchTotalCapitalRequired || "");
      formData.append("pitchRevenuePerUser", data.pitchRevenuePerUser || "");
      formData.append("pitchTargetCustomers", data.pitchTargetCustomers || "");
      formData.append("pitchMarketSize", data.pitchMarketSize || "");
      formData.append("pitchCompetitorAnalysis", data.pitchCompetitorAnalysis || "");
      formData.append("pitchRevenueModel", data.pitchRevenueModel || "");
      formData.append("pitchRevenueStreams", JSON.stringify(data.pitchRevenueStreams || []));
      formData.append("pitchYear1Revenue", data.pitchYear1Revenue || "");
      formData.append("pitchYear2Revenue", data.pitchYear2Revenue || "");
      formData.append("pitchYear3Revenue", data.pitchYear3Revenue || "");
      formData.append("pitchYear4Revenue", data.pitchYear4Revenue || "");
      formData.append("pitchYear5Revenue", data.pitchYear5Revenue || "");
      formData.append("pitchExpectedRoi", data.pitchExpectedRoi || "");
      formData.append("pitchBreakevenPeriod", data.pitchBreakevenPeriod || "");
      formData.append("pitchFeasibilityReasons", data.pitchFeasibilityReasons || "");
      formData.append("pitchCurrentStage", data.pitchCurrentStage || "");
      formData.append("pitchDemoVideoLink", data.pitchDemoVideoLink || "");
      formData.append("pitchDeclarationConfirmed", data.pitchDeclarationConfirmed ? "true" : "false");
      
      if (data.pitchSupportingFiles instanceof File) {
        formData.append("pitchSupportingFiles", data.pitchSupportingFiles);
      }
      
      return fetch("/api/register", {
        method: "POST",
        body: formData,
      }).then(res => res.json());
    },
    onSuccess: async (response: any) => {
      const regId = response.registration?.registrationId;
      if (regId) {
        setRegistrationId(regId);
        const ticketUrl = `${window.location.origin}/ticket/${regId}`;
        QRCode.toDataURL(ticketUrl).then(setQrCode).catch((err: any) => {
          console.error("Failed to generate QR code:", err);
          setQrCode("");
        });
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: RegistrationFormData) => {
    mutation.mutate(data);
  };

  const downloadQRCode = () => {
    if (!qrCode) return;
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = `ticket-${registrationId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const viewTicket = () => {
    if (registrationId) {
      setLocation(`/ticket/${registrationId}`);
    }
  };

  const closeModal = () => {
    setRegistrationId(null);
    setQrCode(null);
    form.reset();
  };

  if (registrationId) {
    return (
      <AnimatePresence>
        <motion.div 
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Card className="w-full max-w-md border-2 border-primary">
              <CardContent className="p-6 sm:p-8">
                <div className="flex justify-between items-start mb-4">
                  <motion.h1 
                    className="text-xl sm:text-2xl font-bold text-primary"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    Done!
                  </motion.h1>
                  <button
                    onClick={closeModal}
                    className="text-muted-foreground hover:text-foreground"
                    data-testid="button-close-modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <motion.div 
                  className="mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="bg-primary/10 rounded-lg p-3 text-center mb-3">
                    <p className="text-xs text-muted-foreground mb-1">Ticket ID</p>
                    <p className="text-xl font-bold text-primary font-mono">{registrationId}</p>
                  </div>

                  {qrCode ? (
                    <RotateIn delay={0.3}>
                      <div className="bg-background border border-border rounded-lg p-3">
                        <img src={qrCode} alt="QR" className="w-full rounded" data-testid="img-ticket-qr" />
                      </div>
                    </RotateIn>
                  ) : (
                    <div className="bg-background border border-border rounded-lg p-3 text-center text-xs text-muted-foreground">
                      QR generating...
                    </div>
                  )}
                </motion.div>

                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {qrCode && (
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={downloadQRCode}
                        variant="outline"
                        size="sm"
                        className="w-full gap-2"
                        data-testid="button-download-ticket-qr"
                      >
                        <Download className="w-3 h-3" />
                        Download
                      </Button>
                    </motion.div>
                  )}
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={viewTicket}
                      size="sm"
                      className="w-full gap-2"
                      data-testid="button-view-ticket"
                    >
                      <ArrowRight className="w-3 h-3" />
                      View Ticket
                    </Button>
                  </motion.div>
                  <Button
                    onClick={closeModal}
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    data-testid="button-close-success"
                  >
                    Done
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeUp>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-6" data-testid="text-participate-title">
                How to Participate
              </h1>
              <p className="text-lg text-muted-foreground">
                Join Kerala Startup Fest 2026 and be part of Kerala's biggest startup movement.
              </p>
            </div>
          </ScrollFadeUp>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeUp>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-center mb-4" data-testid="text-who-can-join">
              Who Can Join KSF?
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              KSF is open to a wide range of participants. Find your category below.
            </p>
          </ScrollFadeUp>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12" staggerDelay={0.1}>
            <StaggerItem>
              <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="h-full">
                  <CardContent className="p-8 text-center">
                    <motion.div 
                      className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <GraduationCap className="w-8 h-8 text-primary" />
                    </motion.div>
                    <h3 className="font-semibold text-xl mb-3">High School Students</h3>
                    <p className="text-muted-foreground text-sm">
                      Young innovators ready to explore the world of startups and entrepreneurship.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
            
            <StaggerItem>
              <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="h-full">
                  <CardContent className="p-8 text-center">
                    <motion.div 
                      className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Users className="w-8 h-8 text-primary" />
                    </motion.div>
                    <h3 className="font-semibold text-xl mb-3">College Students</h3>
                    <p className="text-muted-foreground text-sm">
                      University students looking to turn their ideas into reality.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
            
            <StaggerItem>
              <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="h-full">
                  <CardContent className="p-8 text-center">
                    <motion.div 
                      className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Lightbulb className="w-8 h-8 text-primary" />
                    </motion.div>
                    <h3 className="font-semibold text-xl mb-3">Young Entrepreneurs</h3>
                    <p className="text-muted-foreground text-sm">
                      Aspiring entrepreneurs up to age 29 with startup dreams.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
          
          <ScrollFadeUp delay={0.2}>
            <div className="max-w-2xl mx-auto">
              <h3 className="font-semibold text-lg mb-4 text-center">You can join as:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {["An individual", "A team", "From institution"].map((item, index) => (
                  <motion.div 
                    key={item}
                    className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollFadeUp>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeUp>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-center mb-12" data-testid="text-why-join">
              Why You Should Join
            </h2>
          </ScrollFadeUp>
          
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto" staggerDelay={0.08}>
            {benefits.map((benefit, index) => (
              <StaggerItem key={index}>
                <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ duration: 0.2 }}>
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <motion.div 
                          className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <benefit.icon className="w-6 h-6 text-primary" />
                        </motion.div>
                        <div>
                          <h3 className="font-semibold mb-1">{benefit.title}</h3>
                          <p className="text-sm text-muted-foreground">{benefit.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ScrollFadeLeft>
              <div>
                <motion.div 
                  className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Building2 className="w-7 h-7 text-primary" />
                </motion.div>
                <h2 className="font-serif text-3xl font-bold mb-6" data-testid="text-for-schools">
                  For Schools & Colleges
                </h2>
                <p className="text-muted-foreground mb-6">
                  Schools and colleges can register groups of students for KSF. This is a great chance to:
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Expose your students to startup thinking",
                    "Encourage innovation and leadership",
                    "Build your institution's image as a startup-friendly campus"
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
              </div>
            </ScrollFadeLeft>
            
            <ScrollFadeRight>
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={schoolsCollegesImage} 
                  alt="Schools and Colleges" 
                  className="w-full h-full rounded-3xl object-cover shadow-lg"
                />
              </motion.div>
            </ScrollFadeRight>
          </div>
        </div>
      </section>

      <section id="register" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <ScrollFadeUp>
              <div className="text-center mb-10">
                <motion.div 
                  className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  animate={{ 
                    boxShadow: [
                      "0 0 0 0 rgba(239, 68, 68, 0)",
                      "0 0 20px 10px rgba(239, 68, 68, 0.2)",
                      "0 0 0 0 rgba(239, 68, 68, 0)"
                    ]
                  }}
                  transition={{ 
                    boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <Rocket className="w-7 h-7 text-primary" />
                </motion.div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4" data-testid="text-registration">
                  Register Now
                </h2>
                <p className="text-muted-foreground">
                  {showForm 
                    ? "Fill out the form below to register for Kerala Startup Fest 2026. After registering, you will receive more details about the schedule, contests and guidelines."
                    : "Choose your registration type to get started with Kerala Startup Fest 2026."
                  }
                </p>
              </div>
            </ScrollFadeUp>
            
            <AnimatePresence mode="wait">
              {!showForm ? (
                <motion.div
                  key="poster-selection"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ScrollFadeUp delay={0.1}>
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <motion.div 
                          className="relative"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img 
                            src={eventPosterImage} 
                            alt="Kerala Startup Fest 2026" 
                            className="w-full h-auto object-contain"
                            data-testid="img-event-poster"
                          />
                        </motion.div>
                        <div className="p-6 sm:p-8 space-y-4">
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button 
                              size="lg" 
                              className="w-full font-semibold text-base"
                              onClick={() => {
                                form.setValue("registrationType", "expert-session");
                                setShowForm(true);
                              }}
                              data-testid="button-register-expert-session"
                            >
                              <GraduationCap className="w-5 h-5 mr-2" />
                              Register for Kerala Startup Fest Expert Session
                            </Button>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button 
                              size="lg" 
                              variant="outline"
                              className="w-full font-semibold text-base"
                              onClick={() => {
                                form.setValue("registrationType", "contest");
                                setShowForm(true);
                              }}
                              data-testid="button-register-contest"
                            >
                              <Trophy className="w-5 h-5 mr-2" />
                              Register for Kerala Startup Fest Contest
                            </Button>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </ScrollFadeUp>
                </motion.div>
              ) : (
                <motion.div
                  key="registration-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ScrollFadeUp delay={0.1}>
                    <div className="mb-4">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setShowForm(false);
                          form.setValue("registrationType", undefined as any);
                          form.setValue("contestName", "");
                        }}
                        data-testid="button-back-to-selection"
                      >
                        <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                        Back to selection
                      </Button>
                    </div>
                    <Card>
                      <CardContent className="p-6 sm:p-8">
                        <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
                          <p className="text-sm font-medium text-center">
                            Registering for: <span className="text-primary font-semibold">{registrationType === "expert-session" ? "Expert Session" : "Contest"}</span>
                          </p>
                        </div>
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                      <AnimatePresence>
                        {registrationType === "contest" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <FormField
                              control={form.control}
                              name="contestName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Select Contest</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger data-testid="select-contest">
                                        <SelectValue placeholder="Select a contest" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {contests.map((contest) => (
                                        <SelectItem key={contest} value={contest}>
                                          {contest}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <AnimatePresence>
                        {registrationType === "contest" && isPitchRoom && (
                          <motion.div 
                            className="border rounded-lg p-4 sm:p-6 bg-muted/20 space-y-8"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="text-center mb-6">
                              <h3 className="font-serif text-xl font-bold text-primary mb-2">THE PITCH BOX - Idea Submission Form</h3>
                              <p className="text-sm text-muted-foreground">Submit only realistic, execution-ready startup ideas.</p>
                            </div>

                            <div className="space-y-6">
                              <div className="border-b pb-4">
                                <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                  <Users className="w-5 h-5 text-primary" />
                                  Team Members
                                </h4>
                                <div className="space-y-6">
                                  <div className="bg-background/50 p-4 rounded-lg space-y-4">
                                    <p className="font-medium text-sm text-primary">Team Member 1</p>
                                    <FormField
                                      control={form.control}
                                      name="teamMember1Name"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Name</FormLabel>
                                          <FormControl>
                                            <Input 
                                              placeholder="Team member 1 name" 
                                              {...field} 
                                              data-testid="input-pitch-team-member-1-name"
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                      <FormField
                                        control={form.control}
                                        name="teamMember1Email"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                              <Input 
                                                type="email"
                                                placeholder="email@example.com" 
                                                {...field} 
                                                data-testid="input-pitch-team-member-1-email"
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                        control={form.control}
                                        name="teamMember1Phone"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                              <Input 
                                                type="tel"
                                                placeholder="+91 98765 43210" 
                                                {...field} 
                                                data-testid="input-pitch-team-member-1-phone"
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    </div>
                                    <FormField
                                      control={form.control}
                                      name="teamMember1Grade"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Grade</FormLabel>
                                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                              <SelectTrigger data-testid="select-pitch-team-member-1-grade">
                                                <SelectValue placeholder="Select grade" />
                                              </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                              <SelectItem value="6">Grade 6</SelectItem>
                                              <SelectItem value="7">Grade 7</SelectItem>
                                              <SelectItem value="8">Grade 8</SelectItem>
                                              <SelectItem value="9">Grade 9</SelectItem>
                                              <SelectItem value="10">Grade 10</SelectItem>
                                              <SelectItem value="11">Grade 11</SelectItem>
                                              <SelectItem value="12">Grade 12</SelectItem>
                                              <SelectItem value="college-1">College 1st Year</SelectItem>
                                              <SelectItem value="college-2">College 2nd Year</SelectItem>
                                              <SelectItem value="college-3">College 3rd Year</SelectItem>
                                              <SelectItem value="college-4">College 4th Year</SelectItem>
                                            </SelectContent>
                                          </Select>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                  
                                  <div className="bg-background/50 p-4 rounded-lg space-y-4">
                                    <p className="font-medium text-sm text-primary">Team Member 2</p>
                                    <FormField
                                      control={form.control}
                                      name="teamMember2Name"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Name</FormLabel>
                                          <FormControl>
                                            <Input 
                                              placeholder="Team member 2 name" 
                                              {...field} 
                                              data-testid="input-pitch-team-member-2-name"
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                      <FormField
                                        control={form.control}
                                        name="teamMember2Email"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                              <Input 
                                                type="email"
                                                placeholder="email@example.com" 
                                                {...field} 
                                                data-testid="input-pitch-team-member-2-email"
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                        control={form.control}
                                        name="teamMember2Phone"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                              <Input 
                                                type="tel"
                                                placeholder="+91 98765 43210" 
                                                {...field} 
                                                data-testid="input-pitch-team-member-2-phone"
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    </div>
                                    <FormField
                                      control={form.control}
                                      name="teamMember2Grade"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Grade</FormLabel>
                                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                              <SelectTrigger data-testid="select-pitch-team-member-2-grade">
                                                <SelectValue placeholder="Select grade" />
                                              </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                              <SelectItem value="6">Grade 6</SelectItem>
                                              <SelectItem value="7">Grade 7</SelectItem>
                                              <SelectItem value="8">Grade 8</SelectItem>
                                              <SelectItem value="9">Grade 9</SelectItem>
                                              <SelectItem value="10">Grade 10</SelectItem>
                                              <SelectItem value="11">Grade 11</SelectItem>
                                              <SelectItem value="12">Grade 12</SelectItem>
                                              <SelectItem value="college-1">College 1st Year</SelectItem>
                                              <SelectItem value="college-2">College 2nd Year</SelectItem>
                                              <SelectItem value="college-3">College 3rd Year</SelectItem>
                                              <SelectItem value="college-4">College 4th Year</SelectItem>
                                            </SelectContent>
                                          </Select>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="border-b pb-4">
                                <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">A</span>
                                  Basic Information
                                </h4>
                                <div className="space-y-4">
                                  <FormField
                                    control={form.control}
                                    name="pitchStartupName"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Proposed Startup / Idea Name</FormLabel>
                                        <FormControl>
                                          <Input 
                                            placeholder="Enter your startup/idea name" 
                                            {...field} 
                                            data-testid="input-pitch-startup-name"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="pitchElevatorPitch"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Elevator Pitch (Max 50 words)</FormLabel>
                                        <FormControl>
                                          <Textarea 
                                            placeholder="Describe your idea in 50 words or less" 
                                            {...field} 
                                            className="min-h-[80px]"
                                            data-testid="input-pitch-elevator"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>

                              <div className="border-b pb-4">
                                <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">B</span>
                                  Problem & Solution
                                </h4>
                                <div className="space-y-4">
                                  <FormField
                                    control={form.control}
                                    name="pitchProblemStatement"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Problem Statement</FormLabel>
                                        <p className="text-xs text-muted-foreground mb-2">Describe: Who faces this problem? Why does this require a solution?</p>
                                        <FormControl>
                                          <Textarea 
                                            placeholder="Describe the problem you're solving..." 
                                            {...field} 
                                            className="min-h-[100px]"
                                            data-testid="input-pitch-problem"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="pitchProposedSolution"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Proposed Solution</FormLabel>
                                        <p className="text-xs text-muted-foreground mb-2">Explain: How your product/service solves the problem, why it is practical and doable, why people will use it</p>
                                        <FormControl>
                                          <Textarea 
                                            placeholder="Describe your solution..." 
                                            {...field} 
                                            className="min-h-[100px]"
                                            data-testid="input-pitch-solution"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>

                              <div className="border-b pb-4">
                                <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">C</span>
                                  Product Details
                                </h4>
                                <div className="space-y-4">
                                  <FormField
                                    control={form.control}
                                    name="pitchProductName"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Proposed Product/Service Name</FormLabel>
                                        <FormControl>
                                          <Input 
                                            placeholder="Your product/service name" 
                                            {...field} 
                                            data-testid="input-pitch-product-name"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="pitchProductDescription"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Product Description</FormLabel>
                                        <p className="text-xs text-muted-foreground mb-2">Explain: Key features, how it works, prototype available? (Yes/No)</p>
                                        <FormControl>
                                          <Textarea 
                                            placeholder="Describe your product/service in detail..." 
                                            {...field} 
                                            className="min-h-[100px]"
                                            data-testid="input-pitch-product-desc"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  
                                  <div className="bg-background/50 p-4 rounded-lg space-y-4">
                                    <p className="font-medium text-sm">Pricing Plan</p>
                                    <FormField
                                      control={form.control}
                                      name="pitchPricingModel"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Pricing Model (for Services/Apps)</FormLabel>
                                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                              <SelectTrigger data-testid="select-pitch-pricing">
                                                <SelectValue placeholder="Select pricing model" />
                                              </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                              <SelectItem value="subscription">Subscription</SelectItem>
                                              <SelectItem value="freemium">Freemium</SelectItem>
                                              <SelectItem value="one-time-fee">One-time fee</SelectItem>
                                              <SelectItem value="product-sales">Product Sales</SelectItem>
                                            </SelectContent>
                                          </Select>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                      <FormField
                                        control={form.control}
                                        name="pitchCostPerUnit"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Cost per unit (if applicable)</FormLabel>
                                            <FormControl>
                                              <Input 
                                                type="number" 
                                                placeholder="0" 
                                                {...field} 
                                                data-testid="input-pitch-cost"
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                        control={form.control}
                                        name="pitchSellingPrice"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Selling price</FormLabel>
                                            <FormControl>
                                              <Input 
                                                type="number" 
                                                placeholder="0" 
                                                {...field} 
                                                data-testid="input-pitch-selling"
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                        control={form.control}
                                        name="pitchProfitPerUnit"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Expected profit per unit</FormLabel>
                                            <FormControl>
                                              <Input 
                                                type="number" 
                                                placeholder="0" 
                                                {...field} 
                                                data-testid="input-pitch-profit"
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                      <FormField
                                        control={form.control}
                                        name="pitchTotalCapitalRequired"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Total capital required for setting up</FormLabel>
                                            <FormControl>
                                              <Input 
                                                type="number" 
                                                placeholder="0" 
                                                {...field} 
                                                data-testid="input-pitch-total-capital"
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                        control={form.control}
                                        name="pitchRevenuePerUser"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Expected revenue per user/month</FormLabel>
                                            <FormControl>
                                              <Input 
                                                type="number" 
                                                placeholder="0" 
                                                {...field} 
                                                data-testid="input-pitch-revenue-user"
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="border-b pb-4">
                                <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">D</span>
                                  Market Details
                                </h4>
                                <div className="space-y-4">
                                  <FormField
                                    control={form.control}
                                    name="pitchTargetCustomers"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Target Customers</FormLabel>
                                        <p className="text-xs text-muted-foreground mb-2">Specify: Age group, Category (students, parents, businesses, etc.), Region (Kerala / India / Global), Why they will buy it</p>
                                        <FormControl>
                                          <Textarea 
                                            placeholder="Describe your target customers..." 
                                            {...field} 
                                            className="min-h-[100px]"
                                            data-testid="input-pitch-target"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="pitchMarketSize"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Market Size (Basic Approximation)</FormLabel>
                                        <p className="text-xs text-muted-foreground mb-2">Give simple calculations or estimates</p>
                                        <FormControl>
                                          <Textarea 
                                            placeholder="Provide your market size estimates..." 
                                            {...field} 
                                            className="min-h-[80px]"
                                            data-testid="input-pitch-market"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>

                              <div className="border-b pb-4">
                                <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">E</span>
                                  Competition & Uniqueness
                                </h4>
                                <FormField
                                  control={form.control}
                                  name="pitchCompetitorAnalysis"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Competitor Analysis</FormLabel>
                                      <p className="text-xs text-muted-foreground mb-2">Submit: At least 1 competitor, what they do, what you do better</p>
                                      <FormControl>
                                        <Textarea 
                                          placeholder="Describe your competitors and your competitive advantage..." 
                                          {...field} 
                                          className="min-h-[100px]"
                                          data-testid="input-pitch-competitor"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <div className="border-b pb-4">
                                <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">F</span>
                                  Execution Details
                                </h4>
                                <div className="space-y-4">
                                  <FormField
                                    control={form.control}
                                    name="pitchRevenueStreams"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Revenue Model - Choose your revenue stream(s)</FormLabel>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                                          {["Product sales", "Subscription", "Commission", "Franchise", "Service-based", "B2B / B2C"].map((stream) => (
                                            <div key={stream} className="flex items-center space-x-2">
                                              <Checkbox
                                                id={`stream-${stream}`}
                                                checked={(field.value || []).includes(stream)}
                                                onCheckedChange={(checked) => {
                                                  const current = field.value || [];
                                                  if (checked) {
                                                    field.onChange([...current, stream]);
                                                  } else {
                                                    field.onChange(current.filter((s: string) => s !== stream));
                                                  }
                                                }}
                                                data-testid={`checkbox-stream-${stream.toLowerCase().replace(/\s+/g, '-')}`}
                                              />
                                              <label
                                                htmlFor={`stream-${stream}`}
                                                className="text-sm font-medium leading-none cursor-pointer"
                                              >
                                                {stream}
                                              </label>
                                            </div>
                                          ))}
                                        </div>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="pitchRevenueModel"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Explain your revenue model</FormLabel>
                                        <FormControl>
                                          <Textarea 
                                            placeholder="Explain how you will generate revenue..." 
                                            {...field} 
                                            className="min-h-[80px]"
                                            data-testid="input-pitch-revenue-model"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  
                                  <div className="bg-background/50 p-4 rounded-lg space-y-4">
                                    <p className="font-medium text-sm">Expected ROI (5-Year Projection)</p>
                                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                                      <FormField
                                        control={form.control}
                                        name="pitchYear1Revenue"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel className="text-xs">Year 1</FormLabel>
                                            <FormControl>
                                              <Input 
                                                type="number" 
                                                placeholder="0" 
                                                {...field} 
                                                data-testid="input-pitch-year1"
                                              />
                                            </FormControl>
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                        control={form.control}
                                        name="pitchYear2Revenue"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel className="text-xs">Year 2</FormLabel>
                                            <FormControl>
                                              <Input 
                                                type="number" 
                                                placeholder="0" 
                                                {...field} 
                                                data-testid="input-pitch-year2"
                                              />
                                            </FormControl>
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                        control={form.control}
                                        name="pitchYear3Revenue"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel className="text-xs">Year 3</FormLabel>
                                            <FormControl>
                                              <Input 
                                                type="number" 
                                                placeholder="0" 
                                                {...field} 
                                                data-testid="input-pitch-year3"
                                              />
                                            </FormControl>
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                        control={form.control}
                                        name="pitchYear4Revenue"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel className="text-xs">Year 4</FormLabel>
                                            <FormControl>
                                              <Input 
                                                type="number" 
                                                placeholder="0" 
                                                {...field} 
                                                data-testid="input-pitch-year4"
                                              />
                                            </FormControl>
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                        control={form.control}
                                        name="pitchYear5Revenue"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel className="text-xs">Year 5</FormLabel>
                                            <FormControl>
                                              <Input 
                                                type="number" 
                                                placeholder="0" 
                                                {...field} 
                                                data-testid="input-pitch-year5"
                                              />
                                            </FormControl>
                                          </FormItem>
                                        )}
                                      />
                                    </div>
                                    <FormField
                                      control={form.control}
                                      name="pitchExpectedRoi"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Expected ROI %</FormLabel>
                                          <FormControl>
                                            <Input 
                                              placeholder="e.g., 150%" 
                                              {...field} 
                                              data-testid="input-pitch-roi"
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  </div>

                                  <FormField
                                    control={form.control}
                                    name="pitchBreakevenPeriod"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Break-even Period</FormLabel>
                                        <p className="text-xs text-muted-foreground mb-2">Explain how long to recover initial investment</p>
                                        <FormControl>
                                          <Input 
                                            placeholder="e.g., 18 months" 
                                            {...field} 
                                            data-testid="input-pitch-breakeven"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>

                              <div className="border-b pb-4">
                                <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">G</span>
                                  Reality Check & Feasibility
                                </h4>
                                <div className="space-y-4">
                                  <FormField
                                    control={form.control}
                                    name="pitchFeasibilityReasons"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Why This Idea Can Become a Real Startup</FormLabel>
                                        <p className="text-xs text-muted-foreground mb-2">Provide 5 reasons minimum</p>
                                        <FormControl>
                                          <Textarea 
                                            placeholder="1. Reason one...&#10;2. Reason two...&#10;3. Reason three...&#10;4. Reason four...&#10;5. Reason five..." 
                                            {...field} 
                                            className="min-h-[120px]"
                                            data-testid="input-pitch-feasibility"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="pitchCurrentStage"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Current Stage of Idea</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                          <FormControl>
                                            <SelectTrigger data-testid="select-pitch-stage">
                                              <SelectValue placeholder="Select current stage" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            <SelectItem value="concept-only">Concept only</SelectItem>
                                            <SelectItem value="sketch-prototype">Sketch / prototype ready</SelectItem>
                                            <SelectItem value="early-testing">Early testing done</SelectItem>
                                            <SelectItem value="selling-small">Selling in small scale</SelectItem>
                                            <SelectItem value="generating-revenue">Generating small revenue</SelectItem>
                                          </SelectContent>
                                        </Select>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>

                              <div className="border-b pb-4">
                                <h4 className="font-semibold text-lg mb-4">Upload Supporting Files (Optional)</h4>
                                <p className="text-xs text-muted-foreground mb-4">Prototype images, UI screens, Demo video link, Market validation</p>
                                <div className="space-y-4">
                                  <FormField
                                    control={form.control}
                                    name="pitchSupportingFiles"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Supporting Files</FormLabel>
                                        <FormControl>
                                          <div className="relative">
                                            <input
                                              type="file"
                                              accept="image/*,.pdf,.doc,.docx"
                                              onChange={handlePitchFilesChange}
                                              className="hidden"
                                              id="pitch-files"
                                              data-testid="input-pitch-files"
                                            />
                                            <motion.label
                                              htmlFor="pitch-files"
                                              className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 border-muted-foreground/20"
                                              whileHover={{ scale: 1.01, borderColor: "hsl(var(--primary))" }}
                                              transition={{ duration: 0.2 }}
                                            >
                                              <span className="text-sm font-medium">
                                                {field.value ? "File selected" : "Upload prototype images, UI screens, etc."}
                                              </span>
                                            </motion.label>
                                          </div>
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="pitchDemoVideoLink"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Demo Video Link (Optional)</FormLabel>
                                        <FormControl>
                                          <Input 
                                            type="url"
                                            placeholder="https://youtube.com/watch?v=..." 
                                            {...field} 
                                            data-testid="input-pitch-video"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>

                              <div className="bg-primary/5 p-4 rounded-lg">
                                <h4 className="font-semibold text-lg mb-4">Final Declaration</h4>
                                <FormField
                                  control={form.control}
                                  name="pitchDeclarationConfirmed"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value}
                                          onCheckedChange={field.onChange}
                                          data-testid="checkbox-pitch-declaration"
                                        />
                                      </FormControl>
                                      <div className="space-y-1 leading-none">
                                        <FormLabel className="text-sm font-normal cursor-pointer">
                                          I confirm this idea is original and I am serious about turning it into a real startup. I will participate in all three stages if shortlisted.
                                        </FormLabel>
                                      </div>
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <AnimatePresence>
                        {registrationType === "contest" && isBusinessQuiz && (
                          <motion.div 
                            className="border rounded-lg p-4 sm:p-6 bg-muted/20 space-y-6"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="text-center mb-4">
                              <h3 className="font-serif text-xl font-bold text-primary mb-2">Business Quiz - Team Registration</h3>
                              <p className="text-sm text-muted-foreground">Enter details for both team members</p>
                            </div>

                            <div className="space-y-6">
                              <div className="bg-background/50 p-4 rounded-lg space-y-4">
                                <p className="font-medium text-sm text-primary flex items-center gap-2">
                                  <Users className="w-4 h-4" />
                                  Team Member 1
                                </p>
                                <FormField
                                  control={form.control}
                                  name="teamMember1Name"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Name</FormLabel>
                                      <FormControl>
                                        <Input 
                                          placeholder="Team member 1 name" 
                                          {...field} 
                                          data-testid="input-quiz-team-member-1-name"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <FormField
                                    control={form.control}
                                    name="teamMember1Email"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                          <Input 
                                            type="email"
                                            placeholder="email@example.com" 
                                            {...field} 
                                            data-testid="input-quiz-team-member-1-email"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="teamMember1Phone"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                          <Input 
                                            type="tel"
                                            placeholder="+91 98765 43210" 
                                            {...field} 
                                            data-testid="input-quiz-team-member-1-phone"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                                <FormField
                                  control={form.control}
                                  name="teamMember1Age"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Age</FormLabel>
                                      <FormControl>
                                        <Input 
                                          type="text"
                                          placeholder="Age" 
                                          {...field} 
                                          data-testid="input-quiz-team-member-1-age"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              
                              <div className="bg-background/50 p-4 rounded-lg space-y-4">
                                <p className="font-medium text-sm text-primary flex items-center gap-2">
                                  <Users className="w-4 h-4" />
                                  Team Member 2
                                </p>
                                <FormField
                                  control={form.control}
                                  name="teamMember2Name"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Name</FormLabel>
                                      <FormControl>
                                        <Input 
                                          placeholder="Team member 2 name" 
                                          {...field} 
                                          data-testid="input-quiz-team-member-2-name"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <FormField
                                    control={form.control}
                                    name="teamMember2Email"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                          <Input 
                                            type="email"
                                            placeholder="email@example.com" 
                                            {...field} 
                                            data-testid="input-quiz-team-member-2-email"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="teamMember2Phone"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                          <Input 
                                            type="tel"
                                            placeholder="+91 98765 43210" 
                                            {...field} 
                                            data-testid="input-quiz-team-member-2-phone"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                                <FormField
                                  control={form.control}
                                  name="teamMember2Age"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Age</FormLabel>
                                      <FormControl>
                                        <Input 
                                          type="text"
                                          placeholder="Age" 
                                          {...field} 
                                          data-testid="input-quiz-team-member-2-age"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

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
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Your full name" 
                                  {...field} 
                                  data-testid="input-fullname"
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
                        custom={2}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={formFieldVariants}
                        className={isPitchRoom || isBusinessQuiz ? "" : "grid grid-cols-1 sm:grid-cols-2 gap-6"}
                      >
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
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
                        {!isPitchRoom && !isBusinessQuiz && (
                          <FormField
                            control={form.control}
                            name="age"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Age</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="text" 
                                    placeholder="Your age" 
                                    {...field} 
                                    data-testid="input-age"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </motion.div>

                      {!isPitchRoom && !isBusinessQuiz && (
                        <motion.div
                          custom={3}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          variants={formFieldVariants}
                        >
                          <FormField
                            control={form.control}
                            name="participantType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Type of Participant</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger data-testid="select-participant-type">
                                      <SelectValue placeholder="Select participant type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="school-student">School Student</SelectItem>
                                    <SelectItem value="college-student">College Student</SelectItem>
                                    <SelectItem value="common">Common</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>
                      )}

                      <AnimatePresence>
                        {participantType === "school-student" && !isPitchRoom && !isBusinessQuiz && (
                          <motion.div 
                            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <FormField
                              control={form.control}
                              name="schoolGrade"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Grade</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger data-testid="select-school-grade">
                                        <SelectValue placeholder="Select grade" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="6">Grade 6</SelectItem>
                                      <SelectItem value="7">Grade 7</SelectItem>
                                      <SelectItem value="8">Grade 8</SelectItem>
                                      <SelectItem value="9">Grade 9</SelectItem>
                                      <SelectItem value="10">Grade 10</SelectItem>
                                      <SelectItem value="11">Grade 11</SelectItem>
                                      <SelectItem value="12">Grade 12</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <AnimatePresence>
                        {participantType === "college-student" && !isPitchRoom && !isBusinessQuiz && (
                          <motion.div 
                            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <FormField
                              control={form.control}
                              name="collegeCourse"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Course</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="e.g., B.Tech CSE, BCA, B.Sc" 
                                      {...field} 
                                      data-testid="input-college-course"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="collegeYear"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Year</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger data-testid="select-college-year">
                                        <SelectValue placeholder="Select year" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="1">1st Year</SelectItem>
                                      <SelectItem value="2">2nd Year</SelectItem>
                                      <SelectItem value="3">3rd Year</SelectItem>
                                      <SelectItem value="4">4th Year</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <motion.div
                        custom={4}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={formFieldVariants}
                      >
                        <FormField
                          control={form.control}
                          name="institution"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Institution / Organization</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Your school, college or organization" 
                                  {...field} 
                                  data-testid="input-institution"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div 
                        className="border-t pt-6 mt-6"
                        custom={5}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={formFieldVariants}
                      >
                        <div className="text-center mb-6">
                          <motion.div 
                            className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <QrCode className="w-5 h-5 text-primary" />
                          </motion.div>
                          <h3 className="font-serif text-xl font-bold mb-2" data-testid="text-application-fees-form">
                            Application Fees
                          </h3>
                          <p className="text-sm text-muted-foreground font-medium">
                            Transfer ₹149/- to this UPI No: +91 86063 41939 or below QR
                          </p>
                        </div>

                        <div className="flex flex-col items-center gap-4">
                          <RotateIn delay={0.2}>
                            <div className="w-full max-w-xs">
                              <img 
                                src={qrCodeImage} 
                                alt="Payment QR Code" 
                                className="w-full rounded-xl border-2 border-primary/20"
                                data-testid="img-payment-qr-form"
                              />
                            </div>
                          </RotateIn>

                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={handleDownloadQR}
                              className="gap-2"
                              data-testid="button-download-qr"
                            >
                              <Download className="w-4 h-4" />
                              Download QR Code
                            </Button>
                          </motion.div>

                          <div className="text-center w-full">
                            <p className="text-sm text-muted-foreground mb-1">UPI ID:</p>
                            <p className="font-semibold text-sm break-all mb-4">javadivd8448-1@oksbi</p>
                            
                            <p className="text-sm text-muted-foreground mb-1">Amount:</p>
                            <p className="font-bold text-lg text-primary">₹149.00</p>
                          </div>

                          <p className="text-center text-muted-foreground font-medium text-sm">
                            Scan to pay with any UPI app
                          </p>
                        </div>
                      </motion.div>

                      <motion.div
                        custom={6}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={formFieldVariants}
                      >
                        <FormField
                          control={form.control}
                          name="paymentScreenshot"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Upload Payment Reference / Screenshot</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="payment-screenshot"
                                    data-testid="input-payment-screenshot"
                                  />
                                  <motion.label
                                    htmlFor="payment-screenshot"
                                    className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 border-muted-foreground/20"
                                    whileHover={{ scale: 1.01, borderColor: "hsl(var(--primary))" }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <span className="text-sm font-medium">
                                      {field.value ? "File selected" : "Choose file from gallery"}
                                    </span>
                                  </motion.label>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                      
                      <motion.div
                        custom={7}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={formFieldVariants}
                      >
                        <motion.div 
                          whileHover={{ scale: 1.03 }} 
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Button 
                            type="submit" 
                            size="lg"
                            className="w-full font-semibold"
                            disabled={mutation.isPending}
                            data-testid="button-submit-registration"
                          >
                            {mutation.isPending ? "Registering..." : "Register for KSF 2026"}
                            <Send className="w-4 h-4 ml-2" />
                          </Button>
                        </motion.div>
                      </motion.div>
                          </form>
                        </Form>
                      </CardContent>
                    </Card>
                  </ScrollFadeUp>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
