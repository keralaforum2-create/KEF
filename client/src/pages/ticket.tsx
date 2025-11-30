import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, AlertCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import QRCode from "qrcode";

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
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

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
        
        // Generate QR code
        try {
          const qrUrl = await QRCode.toDataURL(data.registrationId);
          setQrCodeUrl(qrUrl);
        } catch (qrErr) {
          console.error("Failed to generate QR code:", qrErr);
        }
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
              {/* Professional Ticket Card */}
              <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 border-2 border-primary/30 rounded-2xl p-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-full -ml-12 -mb-12"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Your Entrance Pass</h2>
                    <p className="text-xl font-bold text-foreground">Kerala Startup Fest 2026</p>
                    <p className="text-sm text-muted-foreground mt-1">January 7-8, 2026 | Calicut Beach</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    {/* QR Code Section */}
                    <div className="flex flex-col items-center justify-center">
                      {qrCodeUrl && (
                        <div className="bg-white p-4 rounded-xl border-2 border-primary/20">
                          <img 
                            src={qrCodeUrl} 
                            alt="Ticket QR Code" 
                            className="w-48 h-48"
                            data-testid="img-qr-code"
                          />
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground mt-4 text-center">Scan to verify your registration</p>
                    </div>

                    {/* Ticket Details Section */}
                    <div className="flex flex-col justify-center space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Name</p>
                        <p className="text-2xl font-bold text-foreground">{ticket.fullName}</p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Participation Type</p>
                        <p className="text-lg font-semibold text-primary capitalize">{ticket.registrationType.replace("-", " ")}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Age</p>
                          <p className="text-foreground font-medium">{ticket.age}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Ticket ID</p>
                          <p className="text-sm font-mono text-primary font-bold">{ticket.registrationId}</p>
                        </div>
                      </div>

                      {ticket.institution && (
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Institution</p>
                          <p className="text-foreground">{ticket.institution}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-primary/20 text-center">
                    <p className="text-xs text-muted-foreground">
                      ✓ Valid for January 7-8, 2026 | Calicut Beach, Kerala
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-card-border rounded-lg p-6">
                <h2 className="text-sm font-semibold text-muted-foreground mb-2">Contact Information</h2>
                <div className="space-y-2">
                  <p><span className="text-muted-foreground">Email:</span> {ticket.email}</p>
                  <p><span className="text-muted-foreground">Phone:</span> {ticket.phone}</p>
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
