import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Gift } from "lucide-react";
import Home from "@/pages/home";
import About from "@/pages/about";
import Sessions from "@/pages/sessions";
import Contests from "@/pages/contests";
import Participate from "@/pages/participate";
import Partners from "@/pages/partners";
import Contact from "@/pages/contact";
import Speakers from "@/pages/speakers";
import SpeakerRegister from "@/pages/speaker-register";
import FAQ from "@/pages/faq";
import AdminLogin from "@/pages/admin-login";
import Admin from "@/pages/admin";
import ExpoRegister from "@/pages/expo-register";
import StartupClinic from "@/pages/startup-clinic";
import Ticket from "@/pages/ticket";
import Checkin from "@/pages/checkin";
import RegistrationSuccess from "@/pages/registration-success";
import ContestDetail from "@/pages/contest-detail";
import Terms from "@/pages/terms";
import Privacy from "@/pages/privacy";
import Refund from "@/pages/refund";
import Shipping from "@/pages/shipping";
import PaymentStatus from "@/pages/payment-status";
import PaymentSuccess from "@/pages/payment-success";
import NotFound from "@/pages/not-found";

function Router() {
  const [location] = useLocation();

  useEffect(() => {
    const hash = window.location.hash;
    
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo(0, 0);
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/sessions" component={Sessions} />
      <Route path="/contests" component={Contests} />
      <Route path="/contests/:contestId" component={ContestDetail} />
      <Route path="/participate" component={Participate} />
      <Route path="/partners" component={Partners} />
      <Route path="/contact" component={Contact} />
      <Route path="/speakers" component={Speakers} />
      <Route path="/speaker-register" component={SpeakerRegister} />
      <Route path="/faq" component={FAQ} />
      <Route path="/admin-login" component={AdminLogin} />
      <Route path="/admin" component={Admin} />
      <Route path="/expo-register" component={ExpoRegister} />
      <Route path="/startup-clinic" component={StartupClinic} />
      <Route path="/ticket/:id" component={Ticket} />
      <Route path="/registration-success/:id" component={RegistrationSuccess} />
      <Route path="/checkin/:id" component={Checkin} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/refund" component={Refund} />
      <Route path="/shipping" component={Shipping} />
      <Route path="/payment-status/:merchantTransactionId" component={PaymentStatus} />
      <Route path="/payment-success" component={PaymentSuccess} />
      <Route path="/payment/success" component={PaymentSuccess} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    let keySequence = "";
    const targetWord = "786786";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!e.key) return;
      const key = e.key.toLowerCase();
      
      if (/^[a-z0-9]$/.test(key)) {
        keySequence += key;
        
        if (keySequence.includes(targetWord)) {
          const token = localStorage.getItem("admin_token");
          if (token) {
            setLocation("/admin");
          } else {
            setLocation("/admin-login");
          }
          keySequence = "";
        }
        
        if (keySequence.length > targetWord.length) {
          keySequence = keySequence.slice(-targetWord.length);
        }
      } else {
        keySequence = "";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setLocation]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1 pb-20 lg:pb-0">
            <Router />
          </main>
          <Footer className="hidden lg:block" />
        </div>
        <div
          className="sticky-poster-btn-wrapper"
          style={{
            background: 'linear-gradient(90deg, #1E3A8A 0%, #1E3A8A 25%, #DC2626 25%, #DC2626 50%, #FACC15 50%, #FACC15 75%, #0D9488 75%, #0D9488 100%)'
          }}
        >
          <a 
            href="https://agent-694821dcdde99eb716fe8--keralastartupfestin.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="button-free-poster"
            className="sticky-poster-btn"
          >
            <Gift size={20} strokeWidth={2.5} />
            GET A FREE POSTER
          </a>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
