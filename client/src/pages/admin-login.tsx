import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Lock, Rocket } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: async (pwd: string) => {
      return apiRequest("POST", "/api/admin/login", { password: pwd });
    },
    onSuccess: () => {
      localStorage.setItem("admin_token", "authenticated");
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
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center mx-auto">
            <Rocket className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle className="font-serif text-2xl">Admin Dashboard</CardTitle>
          <CardDescription>Enter password to access admin panel</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
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
            </div>
            <Button
              type="submit"
              className="w-full font-semibold"
              disabled={loginMutation.isPending || !password}
              data-testid="button-admin-login"
            >
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
