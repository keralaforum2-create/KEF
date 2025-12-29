import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useSearch } from "wouter";
import { z } from "zod";
import QRCode from "qrcode";
import html2canvas from "html2canvas";
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
  X,
  Ticket,
  Check,
  CheckCircle,
  CreditCard,
  Loader2,
  ShieldCheck,
  Smartphone,
  AlertTriangle,
  User
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
import normalQrCodeImage from "@assets/199_1764728302342.png";
import premiumQrCodeImage from "@assets/upi_qr_799.png";
import businessQuizQrCodeImage from "@assets/99_1764749383754.png";
import bulkQrCodeImage from "@assets/upi_qr_bulk.png";
import eventPosterImage from "@assets/Screenshot_2025-12-02_221240_1764693826335.png";
import ticketBgImage from "@assets/Beige_Black_Minimalist_Event_Music_Festival_Concert_Ticket_1764742314478.png";
import jamPosterImage from "@assets/IMG_3895_1765874849748.jpeg";
import cameraCraftPosterImage from "@assets/IMG_3897_1765874870193.jpeg";
import businessQuizPosterImage from "@assets/IMG_3896_1765874882186.jpeg";
import pitchRoomPosterImage from "@assets/IMG_3894_1765874893392.jpeg";
import iAmAttendingPosterImage from "@assets/I_AM_ATTENDING_1765954025812.jpg";

const registrationSchema = z.object({
  registrationType: z.enum(["expert-session", "contest", "speaker"], {
    required_error: "Please select registration type",
  }),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  age: z.string().optional(),
  institution: z.string().min(2, "Institution/Organization name is required"),
  contestName: z.string().optional(),
  participantType: z.enum(["school-student", "college-student", "commoner"]).optional(),
  ticketCategory: z.enum(["silver", "gold", "platinum"]).optional(),
  referralCode: z.string().optional(),
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
  teamMember3Name: z.string().optional(),
  teamMember3Email: z.string().optional(),
  teamMember3Phone: z.string().optional(),
  teamMember3Grade: z.string().optional(),
  teamMember3Age: z.string().optional(),
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
  speakerPortfolio: z.any().optional(),
  speakerLinkedIn: z.string().optional(),
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
  const [downloading, setDownloading] = useState(false);
  const [submittedData, setSubmittedData] = useState<RegistrationFormData | null>(null);
  const [isProcessingOnlinePayment, setIsProcessingOnlinePayment] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [validatedGiftCode, setValidatedGiftCode] = useState<string | null>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const [registrationMode, setRegistrationMode] = useState<"individual" | "bulk">("individual");
  const [bulkFormData, setBulkFormData] = useState({
    institutionName: "",
    mentorName: "",
    mentorEmail: "",
    mentorPhone: "",
    numberOfStudents: "5",
    ticketCategory: "silver" as "silver" | "gold" | "platinum",
    paymentScreenshot: null as File | null,
  });
  const [bulkPaymentMethod, setBulkPaymentMethod] = useState<"qr" | "online">("online");
  const [bulkRegistrationId, setBulkRegistrationId] = useState<string | null>(null);
  const [bulkStudentTickets, setBulkStudentTickets] = useState<Array<{studentRegistrationId: string; studentNumber: string}>>([]);
  const [isBulkSubmitting, setIsBulkSubmitting] = useState(false);
  const [studentsPdfFile, setStudentsPdfFile] = useState<File | null>(null);
  const [uploadedPdfPath, setUploadedPdfPath] = useState<string | null>(null);
  const [showPosterModal, setShowPosterModal] = useState(false);
  const [generatedPoster, setGeneratedPoster] = useState<string | null>(null);
  const [isGeneratingPoster, setIsGeneratingPoster] = useState(false);
  
  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      registrationType: undefined,
      fullName: "",
      email: "",
      phone: "",
      age: "",
      institution: "",
      ticketCategory: undefined,
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
      teamMember3Name: "",
      teamMember3Email: "",
      teamMember3Phone: "",
      teamMember3Grade: "",
      teamMember3Age: "",
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

  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  
  useEffect(() => {
    if ((window as any).Razorpay) {
      setRazorpayLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => {
      console.error("Failed to load Razorpay script");
      setRazorpayLoaded(false);
    };
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const registrationType = form.watch("registrationType");
  const contestName = form.watch("contestName");
  const participantType = form.watch("participantType");
  const ticketCategory = form.watch("ticketCategory");
  const isBusinessQuiz = contestName === "Business Quiz – School Edition";
  const isPitchRoom = contestName === "The Pitch Room";

  const isRegistrationClosed = isBusinessQuiz || isPitchRoom;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle file upload as needed
      return file;
    }
  };

  const handleDownloadQR = () => {
    const link = document.createElement("a");
    const currentTicketCategory = form.getValues("ticketCategory");
    
    link.href = currentTicketCategory === "platinum" ? premiumQrCodeImage : normalQrCodeImage;
    link.download = currentTicketCategory === "platinum" ? "platinum-payment-qr-code.png" : "silver-payment-qr-code.png";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadTicketDirect = async () => {
    const ticketElement = document.getElementById("success-ticket-card");
    if (!ticketElement) return;
    
    try {
      setDownloading(true);
      const canvas = await html2canvas(ticketElement, {
        backgroundColor: "#ffffff",
        scale: 3,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });
      
      const link = document.createElement("a");
      link.download = `KSF-2026-Ticket-${registrationId}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Failed to download ticket:", err);
      toast({
        title: "Download Failed",
        description: "Please try again or use the View button to download.",
        variant: "destructive",
      });
    } finally {
      setDownloading(false);
    }
  };

  const handlePitchFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("pitchSupportingFiles", file);
    }
  };

  // Validate and apply gift code discount
  const validateGiftCode = async (code: string) => {
    if (!code.trim()) {
      setDiscountPercentage(0);
      setValidatedGiftCode(null);
      return;
    }
    try {
      const response = await fetch("/api/referral-codes/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.toUpperCase() })
      });
      if (response.ok) {
        const data = await response.json();
        setDiscountPercentage(data.discount || 0);
        setValidatedGiftCode(data.code);
        toast({
          title: "Gift code applied!",
          description: `${data.discount}% discount activated`,
        });
      } else {
        setDiscountPercentage(0);
        setValidatedGiftCode(null);
        toast({
          title: "Invalid gift code",
          description: "This gift code is not valid or has expired",
          variant: "destructive"
        });
      }
    } catch (error) {
      setDiscountPercentage(0);
      setValidatedGiftCode(null);
    }
  };

  // Get payment amount based on ticket type and contest
  const getPaymentAmount = () => {
    // Speaker registration has a fixed ₹3,999/- fee
    if (registrationType === "speaker") {
      return 3999;
    }
    
    let baseAmount = 199;
    if (isBusinessQuiz) baseAmount = 199;
    else if (ticketCategory === "platinum") baseAmount = 1499;
    else if (ticketCategory === "gold") baseAmount = 599;
    else baseAmount = 199; // silver
    
    // For Pitch Room, multiply amount by number of team members
    if (isPitchRoom) {
      let teamMemberCount = 0;
      if (form.watch("teamMember1Name")) teamMemberCount++;
      if (form.watch("teamMember2Name")) teamMemberCount++;
      if (form.watch("teamMember3Name")) teamMemberCount++;
      // If no team members entered, minimum is 1
      if (teamMemberCount === 0) teamMemberCount = 1;
      return 199 * teamMemberCount;
    }
    
    return baseAmount;
  };

  // Get discounted price
  const getDiscountedAmount = () => {
    const baseAmount = getPaymentAmount();
    if (discountPercentage > 0) {
      return Math.round(baseAmount - (baseAmount * discountPercentage / 100));
    }
    return baseAmount;
  };

  // Get bulk registration price per student
  const getBulkPricePerStudent = () => {
    if (bulkFormData.ticketCategory === "platinum") return 1499;
    if (bulkFormData.ticketCategory === "gold") return 599;
    return 199; // silver
  };

  // Get bulk registration total amount
  const getBulkTotalAmount = () => {
    const numStudents = parseInt(bulkFormData.numberOfStudents) || 0;
    return numStudents * getBulkPricePerStudent();
  };

  // Handle bulk registration submission
  const handleBulkRegistrationSubmit = async () => {
    if (!bulkFormData.institutionName || !bulkFormData.mentorName || !bulkFormData.mentorEmail || !bulkFormData.mentorPhone) {
      toast({
        title: "Please fill all required fields",
        description: "Institution name, mentor details are required.",
        variant: "destructive",
      });
      return;
    }

    const numStudents = parseInt(bulkFormData.numberOfStudents);
    if (isNaN(numStudents) || numStudents < 5) {
      toast({
        title: "Invalid number of students",
        description: "Minimum 5 students required for bulk registration.",
        variant: "destructive",
      });
      return;
    }

    if (bulkPaymentMethod === "qr") {
      // Handle QR payment with screenshot upload
      if (!bulkFormData.paymentScreenshot) {
        toast({
          title: "Payment screenshot required",
          description: "Please upload a screenshot of your payment confirmation.",
          variant: "destructive",
        });
        return;
      }
      await handleBulkQrPayment();
    } else {
      // Use online payment for bulk registration
      await handleBulkPhonePePayment();
    }
  };

  // Handle bulk QR payment with screenshot
  const handleBulkQrPayment = async () => {
    setIsBulkSubmitting(true);

    try {
      // Upload PDF first if provided
      let pdfPath = uploadedPdfPath;
      if (studentsPdfFile && !pdfPath) {
        const pdfFormData = new FormData();
        pdfFormData.append('studentsPdf', studentsPdfFile);
        const pdfResponse = await fetch('/api/upload-pdf', {
          method: 'POST',
          body: pdfFormData,
        });
        if (pdfResponse.ok) {
          const pdfResult = await pdfResponse.json();
          pdfPath = pdfResult.path;
          setUploadedPdfPath(pdfPath);
        }
      }

      const formData = new FormData();
      formData.append('institutionName', bulkFormData.institutionName);
      formData.append('mentorName', bulkFormData.mentorName);
      formData.append('mentorEmail', bulkFormData.mentorEmail);
      formData.append('mentorPhone', bulkFormData.mentorPhone);
      formData.append('numberOfStudents', bulkFormData.numberOfStudents);
      formData.append('ticketCategory', bulkFormData.ticketCategory);
      if (pdfPath) {
        formData.append('studentsPdfPath', pdfPath);
      }
      if (bulkFormData.paymentScreenshot) {
        formData.append('paymentScreenshot', bulkFormData.paymentScreenshot);
      }

      const response = await fetch('/api/bulk-register', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        toast({
          title: "Registration Successful!",
          description: `Bulk registration completed. Registration ID: ${result.bulkRegistration.bulkRegistrationId}`,
        });
        // Reset form
        setBulkFormData({
          institutionName: "",
          mentorName: "",
          mentorEmail: "",
          mentorPhone: "",
          numberOfStudents: "",
          ticketCategory: "silver",
          paymentScreenshot: null,
        });
        setStudentsPdfFile(null);
        setUploadedPdfPath(null);
      } else {
        const error = await response.json();
        toast({
          title: "Registration Failed",
          description: error.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Bulk registration error:", error);
      toast({
        title: "Registration Failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsBulkSubmitting(false);
    }
  };

  // Handle bulk PhonePe payment
  const handleBulkPhonePePayment = async () => {
    setIsProcessingOnlinePayment(true);

    try {
      // Upload PDF first if provided
      let pdfPath = uploadedPdfPath;
      if (studentsPdfFile && !uploadedPdfPath) {
        const formData = new FormData();
        formData.append('studentsPdf', studentsPdfFile);
        const uploadResponse = await fetch('/api/upload-students-pdf', {
          method: 'POST',
          body: formData,
        });
        const uploadData = await uploadResponse.json();
        if (uploadData.success) {
          pdfPath = uploadData.path;
          setUploadedPdfPath(pdfPath);
        }
      }

      const amount = getBulkTotalAmount();

      const bulkRegistrationData = {
        institutionName: bulkFormData.institutionName,
        mentorName: bulkFormData.mentorName,
        mentorEmail: bulkFormData.mentorEmail,
        mentorPhone: bulkFormData.mentorPhone,
        studentsPdf: pdfPath || "",
        numberOfStudents: bulkFormData.numberOfStudents,
        pricePerStudent: getBulkPricePerStudent().toString(),
        totalAmount: amount.toString(),
        ticketCategory: bulkFormData.ticketCategory,
        registrationType: "expert-session",
      };

      const response = await apiRequest("POST", "/api/bulk-phonepe/initiate", {
        bulkRegistrationData,
        amount,
      });

      const data = await response.json();

      if (data.success && data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        throw new Error(data.message || "Failed to initiate payment");
      }
    } catch (error: any) {
      toast({
        title: "Payment initiation failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsProcessingOnlinePayment(false);
    }
  };

  // Handle PhonePe online payment
  const handlePhonePePayment = async () => {
    // Validate form first
    const isValid = await form.trigger();
    if (!isValid) {
      toast({
        title: "Please complete the form",
        description: "Fill in all required fields before proceeding to payment.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessingOnlinePayment(true);

    try {
      const formData = form.getValues();
      const amount = getDiscountedAmount();

      const registrationData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        age: formData.age || "",
        institution: formData.institution || "",
        ticketCategory: formData.ticketCategory || "silver",
        registrationType: formData.registrationType,
        contestName: formData.contestName || "",
        sessionName: formData.registrationType === "expert-session" ? "Expert Session" : "",
        participantType: formData.participantType || "",
        schoolGrade: formData.schoolGrade || "",
        collegeYear: formData.collegeYear || "",
        collegeCourse: formData.collegeCourse || "",
        teamMember1Name: formData.teamMember1Name || "",
        teamMember1Email: formData.teamMember1Email || "",
        teamMember1Phone: formData.teamMember1Phone || "",
        teamMember1Grade: formData.teamMember1Grade || "",
        teamMember1Age: formData.teamMember1Age || "",
        teamMember2Name: formData.teamMember2Name || "",
        teamMember2Email: formData.teamMember2Email || "",
        teamMember2Phone: formData.teamMember2Phone || "",
        teamMember2Grade: formData.teamMember2Grade || "",
        teamMember2Age: formData.teamMember2Age || "",
        teamMember3Name: formData.teamMember3Name || "",
        teamMember3Email: formData.teamMember3Email || "",
        teamMember3Phone: formData.teamMember3Phone || "",
        teamMember3Grade: formData.teamMember3Grade || "",
        teamMember3Age: formData.teamMember3Age || "",
        pitchStartupName: formData.pitchStartupName || "",
        pitchElevatorPitch: formData.pitchElevatorPitch || "",
        pitchProblemStatement: formData.pitchProblemStatement || "",
        pitchProposedSolution: formData.pitchProposedSolution || "",
        pitchProductName: formData.pitchProductName || "",
        pitchProductDescription: formData.pitchProductDescription || "",
        pitchPricingModel: formData.pitchPricingModel || "",
        pitchCostPerUnit: formData.pitchCostPerUnit || "",
        pitchSellingPrice: formData.pitchSellingPrice || "",
        pitchProfitPerUnit: formData.pitchProfitPerUnit || "",
        pitchTotalCapitalRequired: formData.pitchTotalCapitalRequired || "",
        pitchRevenuePerUser: formData.pitchRevenuePerUser || "",
        pitchTargetCustomers: formData.pitchTargetCustomers || "",
        pitchMarketSize: formData.pitchMarketSize || "",
        pitchCompetitorAnalysis: formData.pitchCompetitorAnalysis || "",
        pitchRevenueModel: formData.pitchRevenueModel || "",
        pitchRevenueStreams: JSON.stringify(formData.pitchRevenueStreams || []),
        pitchYear1Revenue: formData.pitchYear1Revenue || "",
        pitchYear2Revenue: formData.pitchYear2Revenue || "",
        pitchYear3Revenue: formData.pitchYear3Revenue || "",
        pitchYear4Revenue: formData.pitchYear4Revenue || "",
        pitchYear5Revenue: formData.pitchYear5Revenue || "",
        pitchExpectedRoi: formData.pitchExpectedRoi || "",
        pitchBreakevenPeriod: formData.pitchBreakevenPeriod || "",
        pitchFeasibilityReasons: formData.pitchFeasibilityReasons || "",
        pitchCurrentStage: formData.pitchCurrentStage || "",
        pitchDemoVideoLink: formData.pitchDemoVideoLink || "",
        pitchDeclarationConfirmed: formData.pitchDeclarationConfirmed ? "true" : "false",
      };

      const response = await apiRequest("POST", "/api/phonepe/initiate", {
        registrationData,
        amount,
      });

      const data = await response.json();

      if (data.success && data.redirectUrl) {
        // Redirect to PhonePe payment page
        window.location.href = data.redirectUrl;
      } else {
        throw new Error(data.message || "Failed to initiate payment");
      }
    } catch (error: any) {
      console.error("PhonePe payment error:", error);
      toast({
        title: "Payment Failed",
        description: error.message || "Failed to initiate online payment. Please try again or use QR code.",
        variant: "destructive",
      });
    } finally {
      setIsProcessingOnlinePayment(false);
    }
  };

  // Handle Razorpay online payment
  const handleRazorpayPayment = async () => {
    if (!razorpayLoaded || !(window as any).Razorpay) {
      toast({
        title: "Payment not available",
        description: "Payment gateway is loading. Please try again in a moment or use QR code payment.",
        variant: "destructive",
      });
      return;
    }

    const isValid = await form.trigger();
    if (!isValid) {
      toast({
        title: "Please complete the form",
        description: "Fill in all required fields before proceeding to payment.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessingOnlinePayment(true);

    try {
      const formData = form.getValues();
      const amount = getDiscountedAmount();

      const registrationData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        age: formData.age || "",
        institution: formData.institution || "",
        ticketCategory: formData.ticketCategory || "silver",
        registrationType: formData.registrationType,
        contestName: formData.contestName || "",
        sessionName: formData.registrationType === "expert-session" ? "Expert Session" : "",
        participantType: formData.participantType || "",
        schoolGrade: formData.schoolGrade || "",
        collegeYear: formData.collegeYear || "",
        collegeCourse: formData.collegeCourse || "",
        teamMember1Name: formData.teamMember1Name || "",
        teamMember1Email: formData.teamMember1Email || "",
        teamMember1Phone: formData.teamMember1Phone || "",
        teamMember1Grade: formData.teamMember1Grade || "",
        teamMember1Age: formData.teamMember1Age || "",
        teamMember2Name: formData.teamMember2Name || "",
        teamMember2Email: formData.teamMember2Email || "",
        teamMember2Phone: formData.teamMember2Phone || "",
        teamMember2Grade: formData.teamMember2Grade || "",
        teamMember2Age: formData.teamMember2Age || "",
        teamMember3Name: formData.teamMember3Name || "",
        teamMember3Email: formData.teamMember3Email || "",
        teamMember3Phone: formData.teamMember3Phone || "",
        teamMember3Grade: formData.teamMember3Grade || "",
        teamMember3Age: formData.teamMember3Age || "",
        pitchStartupName: formData.pitchStartupName || "",
        pitchElevatorPitch: formData.pitchElevatorPitch || "",
        pitchProblemStatement: formData.pitchProblemStatement || "",
        pitchProposedSolution: formData.pitchProposedSolution || "",
        pitchProductName: formData.pitchProductName || "",
        pitchProductDescription: formData.pitchProductDescription || "",
        pitchPricingModel: formData.pitchPricingModel || "",
        pitchCostPerUnit: formData.pitchCostPerUnit || "",
        pitchSellingPrice: formData.pitchSellingPrice || "",
        pitchProfitPerUnit: formData.pitchProfitPerUnit || "",
        pitchTotalCapitalRequired: formData.pitchTotalCapitalRequired || "",
        pitchRevenuePerUser: formData.pitchRevenuePerUser || "",
        pitchTargetCustomers: formData.pitchTargetCustomers || "",
        pitchMarketSize: formData.pitchMarketSize || "",
        pitchCompetitorAnalysis: formData.pitchCompetitorAnalysis || "",
        pitchRevenueModel: formData.pitchRevenueModel || "",
        pitchRevenueStreams: JSON.stringify(formData.pitchRevenueStreams || []),
        pitchYear1Revenue: formData.pitchYear1Revenue || "",
        pitchYear2Revenue: formData.pitchYear2Revenue || "",
        pitchYear3Revenue: formData.pitchYear3Revenue || "",
        pitchYear4Revenue: formData.pitchYear4Revenue || "",
        pitchYear5Revenue: formData.pitchYear5Revenue || "",
        pitchExpectedRoi: formData.pitchExpectedRoi || "",
        pitchBreakevenPeriod: formData.pitchBreakevenPeriod || "",
        pitchFeasibilityReasons: formData.pitchFeasibilityReasons || "",
        pitchCurrentStage: formData.pitchCurrentStage || "",
        pitchDemoVideoLink: formData.pitchDemoVideoLink || "",
        pitchDeclarationConfirmed: formData.pitchDeclarationConfirmed ? "true" : "false",
      };

      const response = await apiRequest("POST", "/api/razorpay/create-order-new", {
        registrationData,
        amount,
      });

      const data = await response.json();

      if (!data.success || !data.order) {
        throw new Error(data.message || "Failed to create payment order");
      }

      const options = {
        key: data.keyId,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Kerala Startup Fest 2026",
        description: `Registration - ${formData.ticketCategory || 'silver'} ticket`,
        order_id: data.order.id,
        prefill: data.prefill,
        theme: {
          color: "#3B82F6",
        },
        handler: async function (response: any) {
          try {
            const verifyResponse = await apiRequest("POST", "/api/razorpay/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              toast({
                title: "Payment Successful!",
                description: "Your registration has been confirmed.",
              });
              window.location.href = `/payment-success?registrationId=${verifyData.registrationId}`;
            } else {
              throw new Error(verifyData.message || "Payment verification failed");
            }
          } catch (error: any) {
            toast({
              title: "Payment Verification Failed",
              description: error.message || "Please contact support.",
              variant: "destructive",
            });
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessingOnlinePayment(false);
            toast({
              title: "Payment Cancelled",
              description: "You can try again or use QR code payment.",
            });
          },
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      console.error("Razorpay payment error:", error);
      toast({
        title: "Payment Failed",
        description: error.message || "Failed to initiate payment. Please try QR code payment.",
        variant: "destructive",
      });
      setIsProcessingOnlinePayment(false);
    }
  };

  const mutation = useMutation({
    mutationFn: async (data: RegistrationFormData) => {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("age", data.age || "");
      formData.append("institution", data.institution || "");
      formData.append("ticketCategory", data.ticketCategory || "silver");
      formData.append("registrationType", data.registrationType);
      formData.append("contestName", data.contestName || "");
      formData.append("sessionName", data.registrationType === "expert-session" ? "Expert Session" : "");
      formData.append("participantType", data.participantType || "");
      formData.append("schoolGrade", data.schoolGrade || "");
      formData.append("collegeYear", data.collegeYear || "");
      formData.append("collegeCourse", data.collegeCourse || "");
      formData.append("referralCode", validatedGiftCode || data.referralCode || "");
      formData.append("teamMember1Name", data.teamMember1Name || "");
      formData.append("teamMember1Email", data.teamMember1Email || "");
      formData.append("teamMember1Phone", data.teamMember1Phone || "");
      formData.append("teamMember1Grade", data.teamMember1Grade || "");
      formData.append("teamMember1Age", data.teamMember1Age || "");
      formData.append("teamMember2Name", data.teamMember2Name || "");
      formData.append("teamMember2Email", data.teamMember2Email || "");
      formData.append("teamMember2Phone", data.teamMember2Phone || "");
      formData.append("teamMember2Grade", data.teamMember2Grade || "");
      formData.append("teamMember2Age", data.teamMember2Age || "");
      formData.append("teamMember3Name", data.teamMember3Name || "");
      formData.append("teamMember3Email", data.teamMember3Email || "");
      formData.append("teamMember3Phone", data.teamMember3Phone || "");
      formData.append("teamMember3Grade", data.teamMember3Grade || "");
      formData.append("teamMember3Age", data.teamMember3Age || "");

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
      
      const response = await fetch("/api/register", {
        method: "POST",
        body: formData,
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message || "Registration failed. Please try again.");
      }
      return json;
    },
    onSuccess: async (response: any) => {
      const regId = response.registration?.registrationId;
      if (!regId) {
        toast({
          title: "Registration Failed",
          description: response.message || "Failed to create registration. Please try again.",
          variant: "destructive",
        });
        return;
      }
      setLocation(`/registration-success/${regId}`);
    },
    onError: (error: Error) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: RegistrationFormData) => {
    // Validate referral code if entered
    if (data.referralCode && data.referralCode.trim()) {
      if (!validatedGiftCode) {
        toast({
          title: "Invalid gift code",
          description: "Please use a valid gift code or leave it empty. Click 'Apply' to validate the code first.",
          variant: "destructive"
        });
        return;
      }
    }
    
    // Check if payment is required
    const amount = getDiscountedAmount();
    if (amount > 0) {
      // Small delay to ensure form state is synced and UI is responsive
      setTimeout(() => {
        handleRazorpayPayment();
      }, 0);
    } else {
      setSubmittedData(data);
      mutation.mutate(data);
    }
  };

  const viewTicket = () => {
    if (registrationId) {
      setLocation(`/ticket/${registrationId}`);
    }
  };

  const closeModal = () => {
    setRegistrationId(null);
    setQrCode(null);
    setSubmittedData(null);
    form.reset();
  };

  const generateTicketNumber = (regId: string) => {
    const hash = regId.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);
    return String(hash).padStart(10, '0').slice(0, 10);
  };

  const openInNewTab = () => {
    if (registrationId) {
      window.open(`/ticket/${registrationId}`, '_blank');
    }
  };

  const closeBulkModal = () => {
    setBulkRegistrationId(null);
    setBulkStudentTickets([]);
    setBulkFormData({
      institutionName: "",
      mentorName: "",
      mentorEmail: "",
      mentorPhone: "",
      numberOfStudents: "5",
      ticketCategory: "silver",
      paymentScreenshot: null,
    });
  };

  // Bulk Registration Success State
  if (bulkRegistrationId && bulkStudentTickets.length > 0) {
    return (
      <AnimatePresence>
        <motion.div 
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full max-w-3xl my-8"
          >
            <Card className="border-2 border-primary bg-card/95 backdrop-blur max-h-[90vh] overflow-y-auto">
              <CardContent className="p-4 sm:p-6">
                <div className="flex justify-between items-center mb-6">
                  <motion.div 
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <h1 className="text-lg sm:text-xl font-bold text-foreground">Bulk Registration Successful!</h1>
                  </motion.div>
                  <button
                    onClick={closeBulkModal}
                    className="text-muted-foreground hover:text-foreground p-1"
                    data-testid="button-close-bulk-modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <motion.div 
                  className="mb-6 bg-primary/10 rounded-lg p-4 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <p className="text-sm text-muted-foreground mb-1">Bulk Registration ID</p>
                  <p className="text-xl font-bold text-primary font-mono">{bulkRegistrationId}</p>
                </motion.div>

                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="border-b pb-4 mb-4">
                    <h3 className="font-semibold text-lg mb-3 text-primary">Institution Details</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Institution:</span>
                        <p className="font-medium">{bulkFormData.institutionName}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Mentor Name:</span>
                        <p className="font-medium">{bulkFormData.mentorName}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Mentor Email:</span>
                        <p className="font-medium">{bulkFormData.mentorEmail}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Mentor Phone:</span>
                        <p className="font-medium">{bulkFormData.mentorPhone}</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-semibold text-lg mb-3 text-primary flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Student Tickets ({bulkStudentTickets.length})
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Each student will receive an individual ticket with unique QR code for event check-in.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                    {bulkStudentTickets.map((ticket, index) => (
                      <div 
                        key={ticket.studentRegistrationId}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border"
                      >
                        <div>
                          <p className="text-xs text-muted-foreground">Student {index + 1}</p>
                          <p className="font-mono text-sm font-medium">{ticket.studentRegistrationId}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(`/bulk-student-ticket/${ticket.studentRegistrationId}`, '_blank')}
                          data-testid={`button-view-student-ticket-${index}`}
                        >
                          <Ticket className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.p 
                  className="text-xs text-muted-foreground text-center mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Each student should use their unique ticket QR code for check-in at the venue.
                </motion.p>

                <motion.div 
                  className="flex justify-center gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <Button
                    onClick={() => window.open(`/bulk-ticket/${bulkRegistrationId}`, '_blank')}
                    variant="default"
                    data-testid="button-view-all-bulk-tickets"
                  >
                    <Ticket className="w-4 h-4 mr-2" />
                    View All Tickets
                  </Button>
                  <Button
                    onClick={closeBulkModal}
                    variant="outline"
                    data-testid="button-close-bulk-success"
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

  if (registrationId) {
    const ticketNumber = generateTicketNumber(registrationId);
    const isPitchRoomSubmission = submittedData?.contestName === "The Pitch Room";
    
    // Pitch Room Success Page with all submitted details
    if (isPitchRoomSubmission && submittedData) {
      return (
        <AnimatePresence>
          <motion.div 
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full max-w-3xl my-8"
            >
              <Card className="border-2 border-primary bg-card/95 backdrop-blur max-h-[90vh] overflow-y-auto">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex justify-between items-center mb-6">
                    <motion.div 
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <CheckCircle className="w-6 h-6 text-green-500" />
                      <h1 className="text-lg sm:text-xl font-bold text-foreground">Pitch Room Registration Successful!</h1>
                    </motion.div>
                    <button
                      onClick={closeModal}
                      className="text-muted-foreground hover:text-foreground p-1"
                      data-testid="button-close-pitch-modal"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <motion.div 
                    className="mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <div 
                      id="success-ticket-card"
                      ref={ticketRef}
                      className="relative rounded-lg overflow-hidden shadow-xl bg-white"
                      style={{ aspectRatio: "1024/361" }}
                    >
                      <img 
                        src={ticketBgImage} 
                        alt="Kerala Startup Fest 2026 Ticket" 
                        className="w-full h-full object-cover"
                      />
                      
                      {qrCode && (
                        <div 
                          className="absolute bg-white flex items-center justify-center rounded-sm"
                          style={{ 
                            top: '15%', 
                            left: '66%', 
                            width: '14%',
                            aspectRatio: '1/1',
                            padding: '2px'
                          }}
                        >
                          <img 
                            src={qrCode} 
                            alt="Ticket QR Code" 
                            className="w-full h-full object-contain"
                            data-testid="img-pitch-ticket-qr"
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-3 bg-primary/10 rounded-lg p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Your Ticket ID</p>
                      <p className="text-lg font-bold text-primary font-mono">{registrationId}</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="grid grid-cols-3 gap-2 mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={downloadTicketDirect}
                        disabled={downloading}
                        variant="default"
                        size="sm"
                        className="w-full gap-1"
                        data-testid="button-download-pitch-ticket"
                      >
                        <Download className="w-3 h-3" />
                        <span className="hidden sm:inline">{downloading ? "..." : "Download"}</span>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={openInNewTab}
                        variant="outline"
                        size="sm"
                        className="w-full gap-1"
                        data-testid="button-view-pitch-ticket"
                      >
                        <Ticket className="w-3 h-3" />
                        <span className="hidden sm:inline">View</span>
                      </Button>
                    </motion.div>
                    <Button
                      onClick={closeModal}
                      variant="ghost"
                      size="sm"
                      className="w-full gap-1"
                      data-testid="button-close-pitch-success-top"
                    >
                      <Check className="w-3 h-3" />
                      <span className="hidden sm:inline">Done</span>
                    </Button>
                  </motion.div>
                  
                  <motion.p 
                    className="text-xs text-muted-foreground text-center mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Scan the QR code at the venue for check-in. Save or download your ticket.
                  </motion.p>

                  <motion.div 
                    className="space-y-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    {/* Personal Details */}
                    <div className="border-b pb-4">
                      <h3 className="font-semibold text-lg mb-3 text-primary">Personal Details</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Full Name:</span>
                          <p className="font-medium">{submittedData.fullName}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Email:</span>
                          <p className="font-medium">{submittedData.email}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Phone:</span>
                          <p className="font-medium">{submittedData.phone}</p>
                        </div>
                        {submittedData.age && (
                          <div>
                            <span className="text-muted-foreground">Age:</span>
                            <p className="font-medium">{submittedData.age}</p>
                          </div>
                        )}
                        {submittedData.institution && (
                          <div>
                            <span className="text-muted-foreground">Institution:</span>
                            <p className="font-medium">{submittedData.institution}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Startup Details */}
                    <div className="border-b pb-4">
                      <h3 className="font-semibold text-lg mb-3 text-primary">Startup Details</h3>
                      <div className="space-y-3 text-sm">
                        {submittedData.pitchStartupName && (
                          <div>
                            <span className="text-muted-foreground">Startup Name:</span>
                            <p className="font-medium text-base">{submittedData.pitchStartupName}</p>
                          </div>
                        )}
                        {submittedData.pitchElevatorPitch && (
                          <div>
                            <span className="text-muted-foreground">Elevator Pitch:</span>
                            <p className="font-medium">{submittedData.pitchElevatorPitch}</p>
                          </div>
                        )}
                        {submittedData.pitchProblemStatement && (
                          <div>
                            <span className="text-muted-foreground">Problem Statement:</span>
                            <p className="font-medium">{submittedData.pitchProblemStatement}</p>
                          </div>
                        )}
                        {submittedData.pitchProposedSolution && (
                          <div>
                            <span className="text-muted-foreground">Proposed Solution:</span>
                            <p className="font-medium">{submittedData.pitchProposedSolution}</p>
                          </div>
                        )}
                        {submittedData.pitchProductName && (
                          <div>
                            <span className="text-muted-foreground">Product Name:</span>
                            <p className="font-medium">{submittedData.pitchProductName}</p>
                          </div>
                        )}
                        {submittedData.pitchProductDescription && (
                          <div>
                            <span className="text-muted-foreground">Product Description:</span>
                            <p className="font-medium">{submittedData.pitchProductDescription}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Financial Details */}
                    <div className="border-b pb-4">
                      <h3 className="font-semibold text-lg mb-3 text-primary">Financial Details</h3>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        {submittedData.pitchPricingModel && (
                          <div>
                            <span className="text-muted-foreground">Pricing Model:</span>
                            <p className="font-medium">{submittedData.pitchPricingModel}</p>
                          </div>
                        )}
                        {submittedData.pitchCostPerUnit && (
                          <div>
                            <span className="text-muted-foreground">Cost Per Unit:</span>
                            <p className="font-medium">{submittedData.pitchCostPerUnit}</p>
                          </div>
                        )}
                        {submittedData.pitchSellingPrice && (
                          <div>
                            <span className="text-muted-foreground">Selling Price:</span>
                            <p className="font-medium">{submittedData.pitchSellingPrice}</p>
                          </div>
                        )}
                        {submittedData.pitchProfitPerUnit && (
                          <div>
                            <span className="text-muted-foreground">Profit Per Unit:</span>
                            <p className="font-medium">{submittedData.pitchProfitPerUnit}</p>
                          </div>
                        )}
                        {submittedData.pitchTotalCapitalRequired && (
                          <div>
                            <span className="text-muted-foreground">Total Capital Required:</span>
                            <p className="font-medium">{submittedData.pitchTotalCapitalRequired}</p>
                          </div>
                        )}
                        {submittedData.pitchRevenuePerUser && (
                          <div>
                            <span className="text-muted-foreground">Revenue Per User:</span>
                            <p className="font-medium">{submittedData.pitchRevenuePerUser}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Market Analysis */}
                    <div className="border-b pb-4">
                      <h3 className="font-semibold text-lg mb-3 text-primary">Market Analysis</h3>
                      <div className="space-y-3 text-sm">
                        {submittedData.pitchTargetCustomers && (
                          <div>
                            <span className="text-muted-foreground">Target Customers:</span>
                            <p className="font-medium">{submittedData.pitchTargetCustomers}</p>
                          </div>
                        )}
                        {submittedData.pitchMarketSize && (
                          <div>
                            <span className="text-muted-foreground">Market Size:</span>
                            <p className="font-medium">{submittedData.pitchMarketSize}</p>
                          </div>
                        )}
                        {submittedData.pitchCompetitorAnalysis && (
                          <div>
                            <span className="text-muted-foreground">Competitor Analysis:</span>
                            <p className="font-medium">{submittedData.pitchCompetitorAnalysis}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Revenue Projections */}
                    {(submittedData.pitchYear1Revenue || submittedData.pitchYear2Revenue) && (
                      <div className="border-b pb-4">
                        <h3 className="font-semibold text-lg mb-3 text-primary">Revenue Projections</h3>
                        <div className="grid grid-cols-5 gap-2 text-sm text-center mb-3">
                          {submittedData.pitchYear1Revenue && (
                            <div className="bg-muted/30 p-2 rounded">
                              <span className="text-muted-foreground text-xs">Year 1</span>
                              <p className="font-medium">{submittedData.pitchYear1Revenue}</p>
                            </div>
                          )}
                          {submittedData.pitchYear2Revenue && (
                            <div className="bg-muted/30 p-2 rounded">
                              <span className="text-muted-foreground text-xs">Year 2</span>
                              <p className="font-medium">{submittedData.pitchYear2Revenue}</p>
                            </div>
                          )}
                          {submittedData.pitchYear3Revenue && (
                            <div className="bg-muted/30 p-2 rounded">
                              <span className="text-muted-foreground text-xs">Year 3</span>
                              <p className="font-medium">{submittedData.pitchYear3Revenue}</p>
                            </div>
                          )}
                          {submittedData.pitchYear4Revenue && (
                            <div className="bg-muted/30 p-2 rounded">
                              <span className="text-muted-foreground text-xs">Year 4</span>
                              <p className="font-medium">{submittedData.pitchYear4Revenue}</p>
                            </div>
                          )}
                          {submittedData.pitchYear5Revenue && (
                            <div className="bg-muted/30 p-2 rounded">
                              <span className="text-muted-foreground text-xs">Year 5</span>
                              <p className="font-medium">{submittedData.pitchYear5Revenue}</p>
                            </div>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          {submittedData.pitchExpectedRoi && (
                            <div>
                              <span className="text-muted-foreground">Expected ROI:</span>
                              <p className="font-medium">{submittedData.pitchExpectedRoi}</p>
                            </div>
                          )}
                          {submittedData.pitchBreakevenPeriod && (
                            <div>
                              <span className="text-muted-foreground">Breakeven Period:</span>
                              <p className="font-medium">{submittedData.pitchBreakevenPeriod}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Additional Info */}
                    <div>
                      <h3 className="font-semibold text-lg mb-3 text-primary">Additional Information</h3>
                      <div className="space-y-3 text-sm">
                        {submittedData.pitchFeasibilityReasons && (
                          <div>
                            <span className="text-muted-foreground">Why This Idea is Feasible:</span>
                            <p className="font-medium">{submittedData.pitchFeasibilityReasons}</p>
                          </div>
                        )}
                        {submittedData.pitchCurrentStage && (
                          <div>
                            <span className="text-muted-foreground">Current Stage:</span>
                            <p className="font-medium">{submittedData.pitchCurrentStage}</p>
                          </div>
                        )}
                        {submittedData.pitchDemoVideoLink && (
                          <div>
                            <span className="text-muted-foreground">Demo Video Link:</span>
                            <p className="font-medium text-primary break-all">{submittedData.pitchDemoVideoLink}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  <motion.p 
                    className="text-xs text-muted-foreground text-center mt-4 border-t pt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Your pitch has been submitted successfully. We will contact you with further details.
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      );
    }
    
    // Regular ticket success page for other registrations
    return (
      <AnimatePresence>
        <motion.div 
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full max-w-2xl"
          >
            <Card className="border-2 border-primary bg-card/95 backdrop-blur">
              <CardContent className="p-4 sm:p-6">
                <div className="flex justify-between items-center mb-4">
                  <motion.div 
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <h1 className="text-lg sm:text-xl font-bold text-foreground">Registration Successful!</h1>
                  </motion.div>
                  <button
                    onClick={closeModal}
                    className="text-muted-foreground hover:text-foreground p-1"
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
                  <div 
                    id="success-ticket-card"
                    ref={ticketRef}
                    className="relative rounded-lg overflow-hidden shadow-xl bg-white"
                    style={{ aspectRatio: "1024/361" }}
                  >
                    <img 
                      src={ticketBgImage} 
                      alt="Kerala Startup Fest 2026 Ticket" 
                      className="w-full h-full object-cover"
                    />
                    
                    {qrCode && (
                      <div 
                        className="absolute bg-white flex items-center justify-center rounded-sm"
                        style={{ 
                          top: '15%', 
                          left: '66%', 
                          width: '14%',
                          aspectRatio: '1/1',
                          padding: '2px'
                        }}
                      >
                        <img 
                          src={qrCode} 
                          alt="Ticket QR Code" 
                          className="w-full h-full object-contain"
                          data-testid="img-ticket-qr"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-3 bg-primary/10 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Your Ticket ID</p>
                    <p className="text-lg font-bold text-primary font-mono">{registrationId}</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="grid grid-cols-3 gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={downloadTicketDirect}
                      disabled={downloading}
                      variant="default"
                      size="sm"
                      className="w-full gap-1"
                      data-testid="button-download-ticket"
                    >
                      <Download className="w-3 h-3" />
                      <span className="hidden sm:inline">{downloading ? "..." : "Download"}</span>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={openInNewTab}
                      variant="outline"
                      size="sm"
                      className="w-full gap-1"
                      data-testid="button-view-ticket"
                    >
                      <Ticket className="w-3 h-3" />
                      <span className="hidden sm:inline">View</span>
                    </Button>
                  </motion.div>
                  <Button
                    onClick={closeModal}
                    variant="ghost"
                    size="sm"
                    className="w-full gap-1"
                    data-testid="button-close-success"
                  >
                    <Check className="w-3 h-3" />
                    <span className="hidden sm:inline">Done</span>
                  </Button>
                </motion.div>
                
                <motion.p 
                  className="text-xs text-muted-foreground text-center mt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Scan the QR code at the venue for check-in. Save or download your ticket.
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-yellow-50 via-amber-100/50 to-yellow-50 dark:from-yellow-950/30 dark:via-amber-900/20 dark:to-yellow-950/30">
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
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }} 
                transition={{ duration: 0.2 }}
                onClick={() => {
                  form.setValue("registrationType", "expert-session");
                  form.setValue("participantType", "school-student");
                  setShowForm(true);
                  setTimeout(() => {
                    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className="cursor-pointer"
              >
                <Card className="h-full">
                  <CardContent className="p-8 text-center">
                    <motion.div 
                      className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <GraduationCap className="w-8 h-8 text-primary" />
                    </motion.div>
                    <h3 className="font-semibold text-xl mb-3">School Students</h3>
                    <p className="text-muted-foreground text-sm">
                      Young innovators ready to explore the world of startups and entrepreneurship.
                    </p>
                    <Button className="mt-4 w-full" data-testid="button-join-school">
                      Register Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
            
            <StaggerItem>
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }} 
                transition={{ duration: 0.2 }}
                onClick={() => {
                  form.setValue("registrationType", "expert-session");
                  form.setValue("participantType", "college-student");
                  setShowForm(true);
                  setTimeout(() => {
                    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className="cursor-pointer"
              >
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
                    <Button className="mt-4 w-full" data-testid="button-join-college">
                      Register Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
            
            <StaggerItem>
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }} 
                transition={{ duration: 0.2 }}
                onClick={() => {
                  form.setValue("registrationType", "expert-session");
                  form.setValue("participantType", "commoner");
                  setShowForm(true);
                  setTimeout(() => {
                    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className="cursor-pointer"
              >
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
                      Aspiring young entrepreneurs with startup dreams.
                    </p>
                    <Button className="mt-4 w-full" data-testid="button-join-entrepreneur">
                      Register Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
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
                    className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      form.setValue("registrationType", "expert-session");
                      setShowForm(true);
                      setTimeout(() => {
                        document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    data-testid={`button-join-${item.toLowerCase().replace(/\s+/g, '-')}`}
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
                                setTimeout(() => {
                                  document.getElementById("register")?.scrollIntoView({ behavior: "smooth", block: "start" });
                                }, 100);
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
                                setTimeout(() => {
                                  document.getElementById("register")?.scrollIntoView({ behavior: "smooth", block: "start" });
                                }, 100);
                              }}
                              data-testid="button-register-contest"
                            >
                              <Trophy className="w-5 h-5 mr-2" />
                              Register for Kerala Startup Fest Contest
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
                              onClick={() => setLocation("/speaker-register")}
                              data-testid="button-register-podcast-speaker"
                            >
                              <Presentation className="w-5 h-5 mr-2" />
                              Register for Live Podcast Speaker
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
                        {!(registrationType === "contest" && isPitchRoom) && (
                          <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
                            <p className="text-sm font-medium text-center">
                              Registering for: <span className="text-primary font-semibold">
                                {registrationType === "expert-session" ? "Expert Session" : registrationType === "speaker" ? "Be a Podcast Speaker" : "Contest"}
                              </span>
                            </p>
                          </div>
                        )}
                        
                        {registrationType === "expert-session" && (
                          <div className="mb-6">
                            <p className="text-sm font-medium text-center mb-3">Registration Type</p>
                            <div className="flex justify-center gap-2">
                              <Button
                                type="button"
                                variant={registrationMode === "individual" ? "default" : "outline"}
                                onClick={() => setRegistrationMode("individual")}
                                data-testid="button-individual-registration"
                              >
                                <Users className="w-4 h-4 mr-2" />
                                Individual
                              </Button>
                              <Button
                                type="button"
                                variant={registrationMode === "bulk" ? "default" : "outline"}
                                onClick={() => setRegistrationMode("bulk")}
                                data-testid="button-bulk-registration"
                              >
                                <Building2 className="w-4 h-4 mr-2" />
                                Bulk (Institution)
                              </Button>
                            </div>
                            {registrationMode === "bulk" && (
                              <p className="text-xs text-muted-foreground text-center mt-2">
                                For schools/colleges registering 5+ students
                              </p>
                            )}
                          </div>
                        )}

                        <AnimatePresence>
                          {registrationType === "expert-session" && registrationMode === "bulk" && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="space-y-6 border rounded-lg p-6 bg-muted/20"
                            >
                              <div className="text-center mb-4">
                                <h3 className="font-semibold text-lg flex items-center justify-center gap-2">
                                  <Building2 className="w-5 h-5 text-primary" />
                                  Bulk Registration Form
                                </h3>
                                <p className="text-sm text-muted-foreground">Register multiple students from your institution</p>
                              </div>

                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-medium">Institution Name *</label>
                                  <Input
                                    placeholder="School / College Name"
                                    value={bulkFormData.institutionName}
                                    onChange={(e) => setBulkFormData({...bulkFormData, institutionName: e.target.value})}
                                    data-testid="input-bulk-institution"
                                  />
                                </div>

                                <div className="border-t pt-4">
                                  <h4 className="font-medium mb-3 flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    Mentor/Teacher Details
                                  </h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium">Mentor Name *</label>
                                      <Input
                                        placeholder="Teacher/Mentor Name"
                                        value={bulkFormData.mentorName}
                                        onChange={(e) => setBulkFormData({...bulkFormData, mentorName: e.target.value})}
                                        data-testid="input-bulk-mentor-name"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Mentor Email *</label>
                                      <Input
                                        type="email"
                                        placeholder="mentor@school.edu"
                                        value={bulkFormData.mentorEmail}
                                        onChange={(e) => setBulkFormData({...bulkFormData, mentorEmail: e.target.value})}
                                        data-testid="input-bulk-mentor-email"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Mentor Phone *</label>
                                      <Input
                                        type="tel"
                                        placeholder="+91 98765 43210"
                                        value={bulkFormData.mentorPhone}
                                        onChange={(e) => setBulkFormData({...bulkFormData, mentorPhone: e.target.value})}
                                        data-testid="input-bulk-mentor-phone"
                                      />
                                    </div>
                                    <div className="md:col-span-2">
                                      <label className="text-sm font-medium">Upload Students List (PDF)</label>
                                      <Input
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) {
                                            setStudentsPdfFile(file);
                                            setUploadedPdfPath(null);
                                          }
                                        }}
                                        className="mt-1"
                                        data-testid="input-bulk-students-pdf"
                                      />
                                      <p className="text-xs text-muted-foreground mt-1">Optional: Upload a PDF with student names/details</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Number of Students *</label>
                                      <Input
                                        type="number"
                                        min="5"
                                        placeholder="Minimum 5"
                                        value={bulkFormData.numberOfStudents}
                                        onChange={(e) => setBulkFormData({...bulkFormData, numberOfStudents: e.target.value})}
                                        data-testid="input-bulk-students-count"
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="border-t pt-4">
                                  <h4 className="font-medium mb-3 flex items-center gap-2">
                                    <Ticket className="w-4 h-4" />
                                    Select Ticket Type
                                  </h4>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div
                                      onClick={() => setBulkFormData({...bulkFormData, ticketCategory: "silver"})}
                                      className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                                        bulkFormData.ticketCategory === "silver"
                                          ? "border-gray-400 bg-gray-50 dark:bg-gray-950/30"
                                          : "border-gray-200 dark:border-gray-700 hover:border-gray-400"
                                      }`}
                                      data-testid="card-bulk-ticket-silver"
                                    >
                                      <div className="flex justify-between items-center">
                                        <span className="font-medium">Silver Ticket</span>
                                        <span className="font-bold text-gray-600">Rs 199/student</span>
                                      </div>
                                    </div>
                                    <div
                                      onClick={() => setBulkFormData({...bulkFormData, ticketCategory: "gold"})}
                                      className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                                        bulkFormData.ticketCategory === "gold"
                                          ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30"
                                          : "border-gray-200 dark:border-gray-700 hover:border-yellow-400"
                                      }`}
                                      data-testid="card-bulk-ticket-gold"
                                    >
                                      <div className="flex justify-between items-center">
                                        <span className="font-medium">Gold Ticket</span>
                                        <span className="font-bold text-yellow-600">Rs 599/student</span>
                                      </div>
                                    </div>
                                    <div
                                      onClick={() => setBulkFormData({...bulkFormData, ticketCategory: "platinum"})}
                                      className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                                        bulkFormData.ticketCategory === "platinum"
                                          ? "border-teal-500 bg-teal-50 dark:bg-teal-950/30"
                                          : "border-gray-200 dark:border-gray-700 hover:border-teal-300"
                                      }`}
                                      data-testid="card-bulk-ticket-platinum"
                                    >
                                      <div className="flex justify-between items-center">
                                        <span className="font-medium">Platinum Ticket</span>
                                        <span className="font-bold text-teal-600">Rs 1299/student</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="bg-primary/10 rounded-lg p-4 text-center">
                                  <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                                  <p className="text-2xl font-bold text-primary">
                                    Rs {getBulkTotalAmount().toLocaleString()}/-
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    ({bulkFormData.numberOfStudents} students x Rs {getBulkPricePerStudent()})
                                  </p>
                                </div>

                                <div className="border-t pt-4">
                                  <h4 className="font-medium mb-3 flex items-center gap-2">
                                    <CreditCard className="w-4 h-4" />
                                    Payment
                                  </h4>

                                  <div className="space-y-4">
                                    <div className="bg-primary/10 rounded-lg p-4 text-center">
                                      <p className="text-sm text-muted-foreground mb-1">Amount to Pay:</p>
                                      <p className="text-2xl font-bold text-primary">
                                        Rs {getBulkTotalAmount().toLocaleString()}/-
                                      </p>
                                      <p className="text-xs text-muted-foreground mt-1">
                                        ({bulkFormData.numberOfStudents || 0} students x Rs {getBulkPricePerStudent()})
                                      </p>
                                    </div>
                                    
                                    <Button
                                      type="button"
                                      size="lg"
                                      className="w-full gap-2"
                                      onClick={handleBulkRegistrationSubmit}
                                      disabled={isBulkSubmitting || isProcessingOnlinePayment}
                                      data-testid="button-bulk-pay-online"
                                    >
                                      {isBulkSubmitting || isProcessingOnlinePayment ? (
                                        <>
                                          <Loader2 className="w-4 h-4 animate-spin" />
                                          Processing...
                                        </>
                                      ) : (
                                        <>
                                          <CreditCard className="w-4 h-4" />
                                          Pay Online - Rs {getBulkTotalAmount().toLocaleString()}
                                        </>
                                      )}
                                    </Button>
                                    <p className="text-xs text-center text-muted-foreground">
                                      Secure payment via Razorpay (Cards, UPI, NetBanking)
                                    </p>
                                  </div>
                                </div>

                                <div className="mt-6">
                                  <div className="flex items-center gap-3 w-full my-4">
                                    <div className="flex-1 h-px bg-border"></div>
                                    <span className="text-xs text-muted-foreground">Need Help?</span>
                                    <div className="flex-1 h-px bg-border"></div>
                                  </div>
                                  <div className="text-center p-4 rounded-lg bg-muted/30 border">
                                    <p className="text-sm text-muted-foreground mb-2">
                                      Facing any issues with registration?
                                    </p>
                                    <a
                                      href="https://wa.me/919072344431"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                                      data-testid="link-bulk-whatsapp-support"
                                    >
                                      <Smartphone className="w-4 h-4" />
                                      WhatsApp us at +91 9072344431
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {((registrationType === "expert-session" && registrationMode === "individual") || registrationType === "contest" || registrationType === "speaker") && (
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <AnimatePresence mode="wait">
                              {registrationType === "contest" && isRegistrationClosed ? (
                                <motion.div 
                                  key="closed-message"
                                  className="border rounded-lg p-8 sm:p-12 bg-muted/20 text-center space-y-6"
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto" />
                                  <div>
                                    <h3 className="font-serif text-2xl font-bold text-primary mb-2">Registrations Closed</h3>
                                    <p className="text-muted-foreground">The "{contestName}" registrations are currently closed.</p>
                                  </div>
                                </motion.div>
                              ) : (
                                <>
                                  <AnimatePresence>
                                    {registrationType === "contest" && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-6"
                                      >
                                        <FormField
                                          control={form.control}
                                          name="contestName"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel className="text-lg font-semibold">Select Contest</FormLabel>
                                              <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                  <SelectTrigger className="h-12 text-base" data-testid="select-contest">
                                                    <SelectValue placeholder="Choose a contest" />
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

                                  {!isRegistrationClosed && (
                                    <>
                                      <AnimatePresence>
                                        {registrationType === "speaker" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                          >
                            <div className="rounded-lg p-6 bg-red-500 text-white text-center">
                              <h2 className="text-2xl font-bold mb-2">Made in Kerala - Podcast Speaker Application</h2>
                              <p className="text-sm">Share your startup story in a 10-minute podcast episode</p>
                            </div>

                            <div className="space-y-6">
                              <div className="border-b pb-4">
                                <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                  <User className="w-5 h-5 text-primary" />
                                  Founder Information
                                </h4>
                                <div className="space-y-4">
                                  <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Founder Name *</FormLabel>
                                        <FormControl>
                                          <Input 
                                            placeholder="Enter your full name" 
                                            {...field}
                                            data-testid="input-speaker-name"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name="institution"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Designation *</FormLabel>
                                        <FormControl>
                                          <Input 
                                            placeholder="e.g., Founder, CEO, Co-founder" 
                                            {...field}
                                            data-testid="input-speaker-designation"
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
                                        <FormLabel>Email ID *</FormLabel>
                                        <FormControl>
                                          <Input 
                                            type="email"
                                            placeholder="your@email.com" 
                                            {...field}
                                            data-testid="input-speaker-email"
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
                                        <FormLabel>Contact Number *</FormLabel>
                                        <FormControl>
                                          <Input 
                                            placeholder="+91 XXXXX XXXXX" 
                                            {...field}
                                            data-testid="input-speaker-phone"
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
                                  <Rocket className="w-5 h-5 text-primary" />
                                  Startup Information
                                </h4>
                                <div className="space-y-4">
                                  <FormField
                                    control={form.control}
                                    name="pitchStartupName"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Startup Name *</FormLabel>
                                        <FormControl>
                                          <Input 
                                            placeholder="Enter your startup name" 
                                            {...field}
                                            data-testid="input-speaker-startup-name"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name="pitchRevenueModel"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Startup Sector / Industry *</FormLabel>
                                        <FormControl>
                                          <Input 
                                            placeholder="e.g., EdTech, FoodTech, HealthTech, Media, D2C, Services" 
                                            {...field}
                                            data-testid="input-speaker-sector"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name="age"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Year Founded *</FormLabel>
                                        <FormControl>
                                          <Input 
                                            placeholder="e.g., 2020" 
                                            {...field}
                                            data-testid="input-speaker-year-founded"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name="speakerLinkedIn"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Website / Instagram / LinkedIn *</FormLabel>
                                        <FormControl>
                                          <Input 
                                            placeholder="https://..." 
                                            {...field}
                                            value={field.value || ""}
                                            data-testid="input-speaker-website"
                                          />
                                        </FormControl>
                                        <p className="text-xs text-muted-foreground">Provide any one of the above links</p>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>

                              <div className="border-b pb-4">
                                <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                  <BookOpen className="w-5 h-5 text-primary" />
                                  Your Story
                                </h4>
                                <div className="space-y-4">
                                  <FormField
                                    control={form.control}
                                    name="pitchElevatorPitch"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Brief About Your Startup *</FormLabel>
                                        <FormControl>
                                          <Textarea 
                                            placeholder="Describe your startup in max 50 words" 
                                            {...field}
                                            value={field.value || ""}
                                            data-testid="textarea-speaker-brief"
                                          />
                                        </FormControl>
                                        <p className="text-xs text-muted-foreground">Maximum 50 words</p>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name="pitchProblemStatement"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Your Startup Story / Key Insight *</FormLabel>
                                        <FormControl>
                                          <Textarea 
                                            placeholder="Share your startup journey or key insights in max 75 words" 
                                            {...field}
                                            value={field.value || ""}
                                            data-testid="textarea-speaker-story"
                                          />
                                        </FormControl>
                                        <p className="text-xs text-muted-foreground">Maximum 75 words</p>
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name="pitchProposedSolution"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>What would you like to share in the 10-minute podcast? *</FormLabel>
                                        <FormControl>
                                          <Textarea 
                                            placeholder="Share what you'd like to discuss in the podcast" 
                                            {...field}
                                            value={field.value || ""}
                                            data-testid="textarea-speaker-podcast-content"
                                          />
                                        </FormControl>
                                        <p className="text-xs text-muted-foreground">Maximum 75 words</p>
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name="pitchCurrentStage"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Why Should We Feature Your Story? (Optional)</FormLabel>
                                        <FormControl>
                                          <Textarea 
                                            placeholder="Tell us why your story would be interesting (optional, max 50 words)" 
                                            {...field}
                                            value={field.value || ""}
                                            data-testid="textarea-speaker-why-feature"
                                          />
                                        </FormControl>
                                        <p className="text-xs text-muted-foreground">Optional - Maximum 50 words</p>
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>

                              <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800">
                                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                                  Important Notes
                                </h4>
                                <ul className="text-xs text-yellow-800 dark:text-yellow-300 space-y-1 list-disc pl-5">
                                  <li>Podcast duration: Maximum 10 minutes</li>
                                  <li>Selection is application-based</li>
                                  <li>Selected candidates will be contacted by the KSF team</li>
                                  <li>Final edited video will be delivered and branded with Kerala Economic Forum &amp; KSF watermark</li>
                                </ul>
                              </div>

                              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                                <div className="flex items-start gap-3">
                                  <Checkbox 
                                    checked={form.watch("pitchDeclarationConfirmed")}
                                    onCheckedChange={(checked) => form.setValue("pitchDeclarationConfirmed", checked as boolean)}
                                    data-testid="checkbox-speaker-agreement"
                                  />
                                  <div>
                                    <p className="text-sm text-blue-900 dark:text-blue-200">
                                      I agree to the <span className="font-semibold">₹3,999 application fee</span>
                                    </p>
                                    <p className="text-xs text-blue-800 dark:text-blue-300 mt-1">
                                      Full refund will be provided to applicants who are not selected.
                                    </p>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

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
                                  
                                  <div className="bg-background/50 p-4 rounded-lg space-y-4">
                                    <p className="font-medium text-sm text-primary">Team Member 3</p>
                                    <FormField
                                      control={form.control}
                                      name="teamMember3Name"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Name</FormLabel>
                                          <FormControl>
                                            <Input 
                                              placeholder="Team member 3 name" 
                                              {...field} 
                                              data-testid="input-pitch-team-member-3-name"
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                      <FormField
                                        control={form.control}
                                        name="teamMember3Email"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                              <Input 
                                                type="email"
                                                placeholder="email@example.com" 
                                                {...field} 
                                                data-testid="input-pitch-team-member-3-email"
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                        control={form.control}
                                        name="teamMember3Phone"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                              <Input 
                                                type="tel"
                                                placeholder="+91 98765 43210" 
                                                {...field} 
                                                data-testid="input-pitch-team-member-3-phone"
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    </div>
                                    <FormField
                                      control={form.control}
                                      name="teamMember3Grade"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Grade</FormLabel>
                                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                              <SelectTrigger data-testid="select-pitch-team-member-3-grade">
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
                                        {registrationType === "contest" && isRegistrationClosed && (
                                          <motion.div 
                                            className="border rounded-lg p-8 sm:p-12 bg-muted/20 text-center space-y-6"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                          >
                                            <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto" />
                                            <div>
                                              <h3 className="font-serif text-2xl font-bold text-primary mb-2">Registrations Closed</h3>
                                              <p className="text-muted-foreground">The "{contestName}" registrations are currently closed.</p>
                                            </div>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </>
                                  )}
                                </>
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
                      
                      {!isBusinessQuiz && (
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
                        {!isRegistrationClosed && (
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
                      )}

                      {!isRegistrationClosed && registrationType !== "speaker" && (
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
                                    <SelectItem value="commoner">Commoner</SelectItem>
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
                              <FormLabel>Institution / Organization <span className="text-destructive">*</span></FormLabel>
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


                      {/* Gift Code Input - placed after profile photo - hidden for speaker registration */}
                      {registrationType !== "speaker" && (
                        <motion.div
                          custom={4.3}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          variants={formFieldVariants}
                        >
                          <FormField
                            control={form.control}
                            name="referralCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                  <Ticket className="w-4 h-4" />
                                  Gift Code (Optional)
                                </FormLabel>
                                <div className="flex gap-2">
                                  <FormControl>
                                    <Input 
                                      placeholder="Enter gift code for discount" 
                                      {...field}
                                      value={field.value || ""}
                                      data-testid="input-gift-code"
                                    />
                                  </FormControl>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => validateGiftCode(field.value || "")}
                                    data-testid="button-apply-gift-code"
                                  >
                                    Apply
                                  </Button>
                                </div>
                                {validatedGiftCode && (
                                  <p className="text-xs text-green-600 dark:text-green-400 font-medium mt-1">
                                    Code applied! {discountPercentage}% discount
                                  </p>
                                )}
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>
                      )}

                      {registrationType === "expert-session" && (
                        <motion.div
                          custom={4.5}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          variants={formFieldVariants}
                        >
                          <FormField
                            control={form.control}
                            name="ticketCategory"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-lg font-bold flex items-center gap-2">
                                  <Ticket className="w-5 h-5" />
                                  Ticket Categories
                                  {participantType === "commoner" && (
                                    <span className="text-muted-foreground text-xs ml-2">(Optional)</span>
                                  )}
                                </FormLabel>
                                <FormControl>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                    {/* Silver Ticket Card */}
                                    <div
                                      onClick={() => field.onChange("silver")}
                                      className={`relative cursor-pointer rounded-xl border-2 p-5 transition-all ${
                                        field.value === "silver"
                                          ? "border-gray-400 bg-gray-50 dark:bg-gray-950/30 shadow-lg"
                                          : "border-gray-200 dark:border-gray-700 hover:border-gray-400"
                                      }`}
                                      data-testid="card-ticket-silver"
                                    >
                                      {field.value === "silver" && (
                                        <div className="absolute top-3 right-3">
                                          <CheckCircle className="w-6 h-6 text-gray-500" />
                                        </div>
                                      )}
                                      <div className="flex items-center gap-2 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-gray-400" />
                                        <h4 className="font-bold text-lg">Silver Ticket</h4>
                                      </div>
                                      
                                      <ul className="space-y-2 mb-5 text-sm">
                                        <li className="flex items-center gap-2">
                                          <Check className="w-4 h-4 text-gray-600 flex-shrink-0" />
                                          <span>Access to stalls</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                          <Check className="w-4 h-4 text-gray-600 flex-shrink-0" />
                                          <span>Access to sessions</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                          <Check className="w-4 h-4 text-gray-600 flex-shrink-0" />
                                          <span>ID card</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-muted-foreground">
                                          <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                                          <span>Lunch & Tea</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-muted-foreground">
                                          <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                                          <span>Startup Fest Kit</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-muted-foreground">
                                          <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                                          <span>Front section seating</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-muted-foreground">
                                          <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                                          <span>Priority Q&A</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-muted-foreground">
                                          <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                                          <span>Higher networking opportunities</span>
                                        </li>
                                      </ul>
                                      
                                      <div className="border-t pt-4 flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Price:</span>
                                        <span className="font-bold text-xl text-gray-600">Rs 199/-</span>
                                      </div>
                                    </div>

                                    {/* Gold Ticket Card */}
                                    <div
                                      onClick={() => field.onChange("gold")}
                                      className={`relative cursor-pointer rounded-xl border-2 p-5 transition-all ${
                                        field.value === "gold"
                                          ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30 shadow-lg"
                                          : "border-gray-200 dark:border-gray-700 hover:border-yellow-400"
                                      }`}
                                      data-testid="card-ticket-gold"
                                    >
                                      {field.value === "gold" && (
                                        <div className="absolute top-3 right-3">
                                          <CheckCircle className="w-6 h-6 text-yellow-500" />
                                        </div>
                                      )}
                                      <div className="flex items-center gap-2 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <h4 className="font-bold text-lg">Gold Ticket</h4>
                                      </div>
                                      
                                      <ul className="space-y-2 mb-5 text-sm">
                                        <li className="flex items-center gap-2">
                                          <Check className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                                          <span>Access to stalls</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                          <Check className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                                          <span>Access to sessions</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                          <Check className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                                          <span>ID card, notepad & pen</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                          <Check className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                                          <span>Lunch included</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-muted-foreground">
                                          <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                                          <span>Startup Fest Kit</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-muted-foreground">
                                          <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                                          <span>Front section seating</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-muted-foreground">
                                          <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                                          <span>Priority Q&A</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-muted-foreground">
                                          <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                                          <span>Higher networking opportunities</span>
                                        </li>
                                      </ul>
                                      
                                      <div className="border-t pt-4 flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Price:</span>
                                        <span className="font-bold text-xl text-yellow-600">Rs 599/-</span>
                                      </div>
                                    </div>

                                    {/* Platinum Ticket Card */}
                                    <div
                                      onClick={() => field.onChange("platinum")}
                                      className={`relative cursor-pointer rounded-xl border-2 p-5 transition-all ${
                                        field.value === "platinum"
                                          ? "border-teal-500 bg-teal-50 dark:bg-teal-950/30 shadow-lg"
                                          : "border-gray-200 dark:border-gray-700 hover:border-teal-300"
                                      }`}
                                      data-testid="card-ticket-platinum"
                                    >
                                      {field.value === "platinum" && (
                                        <div className="absolute top-3 right-3">
                                          <CheckCircle className="w-6 h-6 text-teal-500" />
                                        </div>
                                      )}
                                      <div className="flex items-center gap-2 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-teal-500" />
                                        <h4 className="font-bold text-lg">Platinum Ticket</h4>
                                      </div>
                                      
                                      <ul className="space-y-2 mb-5 text-sm">
                                        <li className="flex items-center gap-2">
                                          <Check className="w-4 h-4 text-teal-600 flex-shrink-0" />
                                          <span>Access to all stalls</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                          <Check className="w-4 h-4 text-teal-600 flex-shrink-0" />
                                          <span>Access to all expert sessions</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                          <Check className="w-4 h-4 text-teal-600 flex-shrink-0" />
                                          <span>ID card, notepad & pen</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                          <Check className="w-4 h-4 text-teal-600 flex-shrink-0" />
                                          <span>Startup Fest Kit (Exclusive)</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                          <Check className="w-4 h-4 text-teal-600 flex-shrink-0" />
                                          <span>Front section seating</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                          <Check className="w-4 h-4 text-teal-600 flex-shrink-0" />
                                          <span>Priority in Q&A with guests</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                          <Check className="w-4 h-4 text-teal-600 flex-shrink-0" />
                                          <span>Higher networking opportunities</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                          <Check className="w-4 h-4 text-teal-600 flex-shrink-0" />
                                          <span>Lunch & Tea included</span>
                                        </li>
                                      </ul>
                                      
                                      <div className="border-t pt-4 flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Price:</span>
                                        <span className="font-bold text-xl text-teal-600">Rs 1499/-</span>
                                      </div>
                                    </div>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>
                      )}

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
                            <CreditCard className="w-5 h-5 text-primary" />
                          </motion.div>
                          <h3 className="font-serif text-xl font-bold mb-2" data-testid="text-application-fees-form">
                            Payment Details
                          </h3>
                          
                          {isPitchRoom ? (
                            <div className="space-y-2">
                              <div className="flex items-center justify-center gap-4 text-sm font-medium">
                                <span className="text-muted-foreground">Team Members: <span className="text-primary font-bold" data-testid="text-team-count">
                                  {(() => {
                                    let count = 0;
                                    if (form.watch("teamMember1Name")) count++;
                                    if (form.watch("teamMember2Name")) count++;
                                    if (form.watch("teamMember3Name")) count++;
                                    return count === 0 ? 1 : count;
                                  })()}
                                </span></span>
                                <span className="text-muted-foreground">× ₹199 = <span className="text-teal-600 font-bold text-lg">₹{getPaymentAmount()}/-</span></span>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {(() => {
                                  let count = 0;
                                  if (form.watch("teamMember1Name")) count++;
                                  if (form.watch("teamMember2Name")) count++;
                                  if (form.watch("teamMember3Name")) count++;
                                  return count === 0 ? "Add team member names to adjust pricing" : `${count} team member${count !== 1 ? 's' : ''}`;
                                })()}
                              </p>
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground font-medium">
                              {isBusinessQuiz 
                                ? "Pay ₹199/-"
                                : ticketCategory === "platinum" 
                                  ? "Pay ₹1499/-"
                                  : ticketCategory === "gold"
                                    ? "Pay ₹599/-"
                                    : "Pay ₹199/-"
                              }
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col items-center gap-6">
                          <div className="w-full max-w-md p-6 rounded-xl bg-muted/30 border">
                            <div className="text-center space-y-2">
                              {discountPercentage > 0 ? (
                                <>
                                  <p className="text-sm text-muted-foreground mb-1">Original Price:</p>
                                  <p className="text-sm line-through text-muted-foreground font-medium">
                                    ₹{getPaymentAmount()}
                                  </p>
                                  <div className="flex items-center justify-center gap-2 py-2">
                                    <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold">
                                      {discountPercentage}% off
                                    </span>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-1">Final Amount:</p>
                                  <p className="font-bold text-3xl text-green-600 dark:text-green-400">
                                    ₹{getDiscountedAmount()}
                                  </p>
                                </>
                              ) : (
                                <>
                                  <p className="text-sm text-muted-foreground mb-1">Amount to Pay:</p>
                                  <p className="font-bold text-3xl text-primary">
                                    ₹{getPaymentAmount()}
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
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
                            {mutation.isPending ? "Confirming..." : "Confirm the Ticket"}
                            <Send className="w-4 h-4 ml-2" />
                          </Button>
                        </motion.div>
                      </motion.div>

                      <motion.div
                        custom={8}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={formFieldVariants}
                        className="mt-6"
                      >
                        <div className="flex items-center gap-3 w-full my-4">
                          <div className="flex-1 h-px bg-border"></div>
                          <span className="text-xs text-muted-foreground">Need Help?</span>
                          <div className="flex-1 h-px bg-border"></div>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-muted/30 border">
                          <p className="text-sm text-muted-foreground mb-2">
                            Facing any issues with registration?
                          </p>
                          <a
                            href="https://wa.me/919072344431"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                            data-testid="link-whatsapp-support"
                          >
                            <Smartphone className="w-4 h-4" />
                            WhatsApp us at +91 9072344431
                          </a>
                        </div>
                      </motion.div>
                          </form>
                        </Form>
                        )}
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
