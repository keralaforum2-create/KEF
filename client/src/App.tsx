import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import Home from "@/pages/home";
import About from "@/pages/about";
import Sessions from "@/pages/sessions";
import Participate from "@/pages/participate";
import Partners from "@/pages/partners";
import Contact from "@/pages/contact";
import AdminLogin from "@/pages/admin-login";
import Admin from "@/pages/admin";
import Ticket from "@/pages/ticket";
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
      <Route path="/participate" component={Participate} />
      <Route path="/partners" component={Partners} />
      <Route path="/contact" component={Contact} />
      <Route path="/admin-login" component={AdminLogin} />
      <Route path="/admin" component={Admin} />
      <Route path="/ticket/:id" component={Ticket} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    let keySequence = "";
    const targetWord = "caliph";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!e.key) return;
      const key = e.key.toLowerCase();
      
      if (/^[a-z]$/.test(key)) {
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
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
