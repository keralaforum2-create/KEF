import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Ticket {
  id: string;
  registrationId: string;
  fullName: string;
  email: string;
  phone: string;
  age: string;
  institution: string;
  registrationType: string;
  contestName?: string;
  paymentScreenshot?: string;
}

export default function Ticket() {
  const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/ticket/${id}`);
        if (!response.ok) {
          throw new Error("Ticket not found");
        }
        const data = await response.json();
        setTicket(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load ticket");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTicket();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-card flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground/70">Loading your ticket...</p>
        </div>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-card flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center gap-4">
              <AlertCircle className="w-12 h-12 text-destructive" />
              <h1 className="text-2xl font-bold text-foreground">Ticket Not Found</h1>
              <p className="text-foreground/70">{error || "The ticket you're looking for doesn't exist."}</p>
              <Button onClick={() => window.history.back()} variant="outline" className="w-full mt-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Button 
          onClick={() => window.history.back()} 
          variant="ghost" 
          className="mb-6"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="overflow-hidden border-2 border-primary/20">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary mb-2">
                Event Ticket
              </h1>
              <p className="text-primary text-lg font-mono font-bold">{ticket.registrationId}</p>
            </div>

            <div className="space-y-6">
              <div className="bg-card border border-card-border rounded-lg p-6">
                <h2 className="text-sm font-semibold text-muted-foreground mb-2">Participant Name</h2>
                <p className="text-2xl font-bold text-foreground">{ticket.fullName}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card border border-card-border rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-1">Email</h3>
                  <p className="text-foreground break-all">{ticket.email}</p>
                </div>

                <div className="bg-card border border-card-border rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-1">Phone</h3>
                  <p className="text-foreground">{ticket.phone}</p>
                </div>

                <div className="bg-card border border-card-border rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-1">Institution</h3>
                  <p className="text-foreground">{ticket.institution}</p>
                </div>

                <div className="bg-card border border-card-border rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-1">Registration Type</h3>
                  <p className="text-foreground capitalize">{ticket.registrationType.replace("-", " ")}</p>
                </div>
              </div>

              {ticket.paymentScreenshot && (
                <div className="bg-card border border-card-border rounded-lg p-6">
                  <h2 className="text-sm font-semibold text-muted-foreground mb-4">Payment Proof</h2>
                  <img 
                    src={ticket.paymentScreenshot} 
                    alt="Payment screenshot" 
                    className="w-full rounded-lg border border-border max-h-96 object-contain"
                    data-testid="img-payment-screenshot"
                  />
                </div>
              )}

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  Thank you for registering for Kerala Startup Fest 2026!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
