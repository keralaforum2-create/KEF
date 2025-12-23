import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Lock, Rocket } from "lucide-react";
import { ScrollFadeUp } from "@/lib/animations";

const formFieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.4,
      ease: "easeOut"
    }
  })
};

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: async (pwd: string) => {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwd }),
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error("Invalid password");
      }
      return response.json();
    },
    onSuccess: (data: any) => {
      localStorage.setItem("admin_token", data.token);
      toast({
        title: "Login successful!",
        description: "Redirecting to admin dashboard...",
      });
      setLocation("/admin");
    },
    onError: () => {
      toast({
        title: "Invalid password",
        description: "Please try again.",
        variant: "destructive",
      });
      setPassword("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password) {
      loginMutation.mutate(password);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4">
      <ScrollFadeUp>
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-4 text-center">
            <motion.div 
              className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center mx-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Rocket className="w-6 h-6 text-primary-foreground" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <CardTitle className="font-serif text-2xl">Admin Dashboard</CardTitle>
              <CardDescription className="mt-2">Enter password to access admin panel</CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div 
                className="space-y-2"
                custom={0}
                initial="hidden"
                animate="visible"
                variants={formFieldVariants}
              >
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    data-testid="input-admin-password"
                  />
                </div>
              </motion.div>
              <motion.div
                custom={1}
                initial="hidden"
                animate="visible"
                variants={formFieldVariants}
              >
                <Button
                  type="submit"
                  className="w-full font-semibold"
                  disabled={loginMutation.isPending || !password}
                  data-testid="button-admin-login"
                >
                  {loginMutation.isPending ? "Logging in..." : "Login"}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </ScrollFadeUp>
    </div>
  );
}
