import { useEffect, useState, useRef } from "react";
import { useParams } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, AlertCircle, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import QRCode from "qrcode";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import ticketBgImage from "@assets/Beige_Black_Minimalist_Event_Music_Festival_Concert_Ticket_1764742314478.png";

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
  sessionName?: string;
  teamMember1Name?: string;
  teamMember2Name?: string;
  paymentScreenshot?: string;
  ticketType?: string;
  ticketCategory?: string;
  profilePhoto?: string;
}

export default function Ticket() {
  const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [autoDownloadTriggered, setAutoDownloadTriggered] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  const generateTicketNumber = (registrationId: string) => {
    const hash = registrationId.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);
    return String(hash).padStart(10, '0').slice(0, 10);
  };

  const downloadTicketAsPNG = async () => {
    const ticketCard = document.getElementById("ticket-card");
    if (!ticketCard) return;
    
    try {
      setDownloading(true);
      const canvas = await html2canvas(ticketCard, {
        backgroundColor: "#ffffff",
        scale: 3,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });
      
      const link = document.createElement("a");
      link.download = `KSF-2026-Ticket-${ticket?.registrationId}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Failed to download ticket:", err);
    } finally {
      setDownloading(false);
    }
  };

  const downloadTicketAsPDF = async () => {
    const ticketCard = document.getElementById("ticket-card");
    if (!ticketCard || !ticket) return;
    
    try {
      setDownloading(true);
      
      // Capture the ticket card image
      const canvas = await html2canvas(ticketCard, {
        backgroundColor: "#ffffff",
        scale: 3,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });
      
      const imgData = canvas.toDataURL("image/png");
      
      // Create a comprehensive PDF with all details
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      let yPosition = margin;
      
      // Add header
      pdf.setFontSize(24);
      pdf.setFont(undefined, "bold");
      pdf.text("Kerala Startup Fest 2026", margin, yPosition);
      yPosition += 10;
      
      pdf.setFontSize(12);
      pdf.setFont(undefined, "normal");
      pdf.text("Event Ticket", margin, yPosition);
      yPosition += 12;
      
      // Add ticket card image
      const imgWidth = pageWidth - (margin * 2);
      const imgHeight = (imgWidth / 1024) * 361; // Maintain aspect ratio
      pdf.addImage(imgData, "PNG", margin, yPosition, imgWidth, imgHeight);
      yPosition += imgHeight + 10;
      
      // Add divider
      pdf.setDrawColor(200);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 8;
      
      // Add ticket details header
      pdf.setFontSize(14);
      pdf.setFont(undefined, "bold");
      pdf.text("Ticket Information", margin, yPosition);
      yPosition += 8;
      
      // Add details in structured format
      pdf.setFontSize(10);
      pdf.setFont(undefined, "normal");
      
      const details = [
        { label: "Ticket ID:", value: ticket.registrationId },
        { label: "Name:", value: ticket.fullName },
        { label: "Email:", value: ticket.email },
        { label: "Phone:", value: ticket.phone },
        { label: "Age:", value: ticket.age },
        { label: "Event Date:", value: "January 7 & 8, 2026" },
        { label: "Venue:", value: "Aspin Courtyards, Calicut" },
        { label: "Registration Type:", value: ticket.registrationType.replace("-", " ").toUpperCase() },
        { label: "Ticket Category:", value: (ticket.ticketCategory || "Normal").toUpperCase() },
        ...(ticket.institution ? [{ label: "Institution:", value: ticket.institution }] : []),
        ...(ticket.contestName ? [{ label: "Contest:", value: ticket.contestName }] : []),
        ...(ticket.teamMember1Name || ticket.teamMember2Name ? [
          { label: "Team Members:", value: [ticket.teamMember1Name, ticket.teamMember2Name].filter(Boolean).join(", ") }
        ] : []),
      ];
      
      details.forEach(detail => {
        // Check if we need a new page
        if (yPosition > pageHeight - margin - 20) {
          pdf.addPage();
          yPosition = margin;
        }
        
        pdf.setFont(undefined, "bold");
        pdf.text(detail.label, margin, yPosition);
        
        pdf.setFont(undefined, "normal");
        const value = detail.value || "N/A";
        const splitValue = pdf.splitTextToSize(value, pageWidth - margin - 50);
        pdf.text(splitValue, margin + 50, yPosition);
        
        yPosition += 6;
      });
      
      // Add footer
      yPosition += 5;
      if (yPosition > pageHeight - margin - 20) {
        pdf.addPage();
        yPosition = margin;
      }
      
      pdf.setFontSize(9);
      pdf.setFont(undefined, "normal");
      pdf.setTextColor(128);
      pdf.text("Please bring this ticket (printed or digital) to the event for entry.", margin, yPosition);
      yPosition += 5;
      pdf.text("Thank you for registering for Kerala Startup Fest 2026!", margin, yPosition);
      
      pdf.save(`KSF-2026-Ticket-${ticket.registrationId}.pdf`);
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
          const checkinUrl = `${window.location.origin}/checkin/${data.registrationId}`;
          const qrUrl = await QRCode.toDataURL(checkinUrl, {
            width: 200,
            margin: 1,
            color: {
              dark: '#000000',
              light: '#ffffff'
            }
          });
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

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const shouldDownload = urlParams.get('download') === 'true';
    
    if (shouldDownload && ticket && qrCodeUrl && !autoDownloadTriggered && !loading) {
      setAutoDownloadTriggered(true);
      setTimeout(() => {
        downloadTicketAsPDF();
      }, 1000);
    }
  }, [ticket, qrCodeUrl, loading, autoDownloadTriggered]);

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

  const ticketNumber = generateTicketNumber(ticket.registrationId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="flex flex-wrap items-center justify-between gap-2 mb-6"
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
          <div className="flex flex-wrap gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button 
                onClick={downloadTicketAsPNG} 
                disabled={downloading}
                variant="outline"
                data-testid="button-download-ticket-png"
              >
                <Download className="w-4 h-4 mr-2" />
                {downloading ? "..." : "PNG"}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button 
                onClick={downloadTicketAsPDF} 
                disabled={downloading}
                variant="default"
                data-testid="button-download-ticket-pdf"
              >
                <Download className="w-4 h-4 mr-2" />
                {downloading ? "..." : "PDF"}
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div 
            id="ticket-card" 
            ref={ticketRef}
            className="relative rounded-xl overflow-hidden shadow-2xl bg-white"
            style={{ aspectRatio: "1024/361" }}
          >
            <img 
              src={ticketBgImage} 
              alt="Kerala Startup Fest 2026 Ticket" 
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
            
            {qrCodeUrl && (
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
                  src={qrCodeUrl} 
                  alt="Ticket QR Code" 
                  className="w-full h-full object-contain"
                  data-testid="img-qr-code"
                />
              </div>
            )}
            
            {ticket.ticketCategory === "premium" && (
              <div 
                className="absolute"
                style={{ 
                  top: '8%', 
                  right: '25%'
                }}
              >
                <div className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg transform -rotate-12">
                  PREMIUM
                </div>
              </div>
            )}
            
            {ticket.institution && (
              <div 
                className="absolute text-white text-xs font-medium"
                style={{ 
                  bottom: '12%', 
                  left: '8%',
                  maxWidth: '150px',
                  fontSize: '10px'
                }}
              >
                {ticket.institution}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div 
          className="mt-8 bg-card border border-card-border rounded-lg p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold mb-4">Event & Attendee Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Event Date</p>
              <p className="font-medium">January 7 & 8, 2026</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Venue</p>
              <p className="font-medium">Aspin Courtyards, Calicut</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{ticket.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{ticket.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{ticket.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Registration Type</p>
              <p className="font-medium capitalize">{ticket.registrationType.replace("-", " ")}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ticket Type</p>
              <p className="font-medium capitalize">{ticket.ticketCategory || "Normal"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ticket ID</p>
              <p className="font-mono font-medium text-primary">{ticket.registrationId}</p>
            </div>
            {ticket.institution && (
              <div>
                <p className="text-sm text-muted-foreground">Institution</p>
                <p className="font-medium">{ticket.institution}</p>
              </div>
            )}
            {ticket.contestName && (
              <div>
                <p className="text-sm text-muted-foreground">Contest</p>
                <p className="font-medium">{ticket.contestName}</p>
              </div>
            )}
          </div>
          
          {ticket.contestName === "The Pitch Room" && (ticket.teamMember1Name || ticket.teamMember2Name) && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-2">Team Members</p>
              <div className="space-y-1">
                {ticket.teamMember1Name && (
                  <p className="font-medium">1. {ticket.teamMember1Name}</p>
                )}
                {ticket.teamMember2Name && (
                  <p className="font-medium">2. {ticket.teamMember2Name}</p>
                )}
              </div>
            </div>
          )}
        </motion.div>

        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-sm text-muted-foreground">
            Thank you for registering for Kerala Startup Fest 2026!
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Please bring this ticket (printed or digital) to the event for entry.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
