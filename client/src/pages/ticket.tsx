import { useEffect, useState, useRef } from "react";
import { useParams } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, AlertCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import QRCode from "qrcode";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { ScrollFadeUp, RotateIn } from "@/lib/animations";

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
  teamMember1Name?: string;
  teamMember2Name?: string;
  paymentScreenshot?: string;
}

export default function Ticket() {
  const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  const downloadTicket = async () => {
    const ticketCard = document.getElementById("ticket-card");
    if (!ticketCard) return;
    
    try {
      setDownloading(true);
      const canvas = await html2canvas(ticketCard, {
        backgroundColor: "#ffffff",
        scale: 2,
        logging: false,
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pageHeight = 277;
      const margin = 10;
      
      let yPosition = margin;
      
      if (imgHeight <= pageHeight - (margin * 2)) {
        const yOffset = (pageHeight - imgHeight) / 2;
        pdf.addImage(imgData, "PNG", margin, yOffset, imgWidth, imgHeight);
      } else {
        while (yPosition < imgHeight + margin) {
          pdf.addImage(imgData, "PNG", margin, yPosition, imgWidth, imgHeight);
          yPosition += pageHeight;
          if (yPosition < imgHeight + margin) {
            pdf.addPage();
          }
        }
      }
      
      pdf.save(`KSF-2026-Ticket-${ticket?.registrationId}.pdf`);
    } catch (err) {
      console.error("Failed to download ticket:", err);
    } finally {
      setDownloading(false);
    }
  };

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
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-foreground/70">Loading your ticket...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-card flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <AlertCircle className="w-12 h-12 text-destructive" />
                </motion.div>
                <h1 className="text-2xl font-bold text-foreground">Ticket Not Found</h1>
                <p className="text-foreground/70">{error || "The ticket you're looking for doesn't exist."}</p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button onClick={() => window.history.back()} variant="outline" className="w-full mt-4">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Go Back
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div 
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button 
              onClick={() => window.history.back()} 
              variant="ghost" 
              className="mb-0"
              data-testid="button-back"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button 
              onClick={downloadTicket} 
              disabled={downloading}
              variant="default"
              className="mb-0"
              data-testid="button-download-ticket"
            >
              <Download className="w-4 h-4 mr-2" />
              {downloading ? "Downloading..." : "Download Ticket"}
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="overflow-hidden border-2 border-primary/20" ref={ticketRef}>
            <CardContent className="p-8">
              <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary mb-2">
                  Event Ticket
                </h1>
                <p className="text-primary text-lg font-mono font-bold">{ticket.registrationId}</p>
              </motion.div>

              <div className="space-y-6">
                <motion.div 
                  id="ticket-card" 
                  className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 border-2 border-primary/30 rounded-2xl p-8 overflow-hidden relative"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-full -ml-12 -mb-12"></div>
                  
                  <div className="relative z-10">
                    <motion.div 
                      className="text-center mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Your Entrance Pass</h2>
                      <p className="text-xl font-bold text-foreground">Kerala Startup Fest 2026</p>
                      <p className="text-sm text-muted-foreground mt-1">January 7-8, 2026 | Calicut Beach</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                      <div className="flex flex-col items-center justify-center">
                        {qrCodeUrl && (
                          <RotateIn delay={0.5}>
                            <motion.div 
                              className="bg-white p-4 rounded-xl border-2 border-primary/20"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                            >
                              <img 
                                src={qrCodeUrl} 
                                alt="Ticket QR Code" 
                                className="w-48 h-48"
                                data-testid="img-qr-code"
                              />
                            </motion.div>
                          </RotateIn>
                        )}
                        <motion.p 
                          className="text-xs text-muted-foreground mt-4 text-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.7 }}
                        >
                          Scan to verify your registration
                        </motion.p>
                      </div>

                      <motion.div 
                        className="flex flex-col justify-center space-y-4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                      >
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

                        {ticket.contestName === "StartUp Pitch" && (ticket.teamMember1Name || ticket.teamMember2Name) && (
                          <div className="col-span-2 pt-4 border-t border-primary/20">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Team Members</p>
                            <div className="space-y-1">
                              {ticket.teamMember1Name && (
                                <p className="text-foreground text-sm">• {ticket.teamMember1Name}</p>
                              )}
                              {ticket.teamMember2Name && (
                                <p className="text-foreground text-sm">• {ticket.teamMember2Name}</p>
                              )}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </div>

                    <motion.div 
                      className="mt-8 pt-6 border-t border-primary/20 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <p className="text-xs text-muted-foreground">
                        Valid for January 7-8, 2026 | Calicut Beach, Kerala
                      </p>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-card border border-card-border rounded-lg p-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <h2 className="text-sm font-semibold text-muted-foreground mb-2">Contact Information</h2>
                  <div className="space-y-2">
                    <p><span className="text-muted-foreground">Email:</span> {ticket.email}</p>
                    <p><span className="text-muted-foreground">Phone:</span> {ticket.phone}</p>
                  </div>
                </motion.div>

                {ticket.paymentScreenshot && (
                  <motion.div 
                    className="bg-card border border-card-border rounded-lg p-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <h2 className="text-sm font-semibold text-muted-foreground mb-4">Payment Proof</h2>
                    <img 
                      src={ticket.paymentScreenshot} 
                      alt="Payment screenshot" 
                      className="w-full rounded-lg border border-border max-h-96 object-contain"
                      data-testid="img-payment-screenshot"
                    />
                  </motion.div>
                )}

                <motion.div 
                  className="pt-4 border-t border-border"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <p className="text-xs text-muted-foreground text-center">
                    Thank you for registering for Kerala Startup Fest 2026!
                  </p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
