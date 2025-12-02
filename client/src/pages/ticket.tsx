import { useEffect, useState, useRef } from "react";
import { useParams } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, AlertCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import QRCode from "qrcode";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import logoImage from "@assets/LOGO_00-removebg-preview_1764701061868.png";
import kefLogoImage from "@assets/KERALA ECONOMIC FORUM LOGO RESOLUTION 00_1764498454572.png";

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
  ticketType?: string;
}

export default function Ticket() {
  const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  const generateTicketNumber = (registrationId: string) => {
    const hash = registrationId.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);
    return String(hash).padStart(10, '0').slice(0, 10);
  };

  const downloadTicket = async () => {
    const ticketCard = document.getElementById("ticket-card");
    if (!ticketCard) return;
    
    try {
      setDownloading(true);
      const canvas = await html2canvas(ticketCard, {
        backgroundColor: "#ffffff",
        scale: 3,
        logging: false,
        useCORS: true,
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [210, 80],
      });
      
      pdf.addImage(imgData, "PNG", 0, 0, 210, 80);
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
          const qrData = JSON.stringify({
            ticketId: data.registrationId,
            name: data.fullName,
            email: data.email,
            phone: data.phone,
            type: data.registrationType,
            ticketType: data.ticketType || "Normal",
            institution: data.institution,
            paymentProof: data.paymentScreenshot ? "Verified" : "Pending",
            event: "Kerala Startup Fest 2026",
            date: "January 7-8, 2026",
            venue: "Calicut Beach, Kozhikode"
          });
          const qrUrl = await QRCode.toDataURL(qrData, {
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
          <div 
            id="ticket-card" 
            ref={ticketRef}
            className="bg-white rounded-xl overflow-hidden shadow-2xl"
            style={{ aspectRatio: "2.6/1" }}
          >
            <div className="flex h-full">
              <div className="flex-1 flex">
                <div className="w-3 flex flex-col">
                  <div className="flex-1 bg-[#DC2626]"></div>
                  <div className="flex-1 bg-[#0D9488]"></div>
                  <div className="flex-1 bg-[#FACC15]"></div>
                  <div className="flex-1 bg-[#5B21B6]"></div>
                </div>
                
                <div className="flex-1 p-6 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex items-start gap-4">
                      <img 
                        src={logoImage} 
                        alt="KSF Logo" 
                        className="w-20 h-20 object-contain"
                      />
                      <div className="flex-1">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
                          FIRST OF ITS KIND IN THE STATE
                        </p>
                        <h1 className="text-2xl font-black text-gray-900 leading-tight">
                          KERALA<br/>
                          STARTUP<br/>
                          FEST'26
                        </h1>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <p className="text-sm font-bold text-gray-800">2026 JAN 7-8</p>
                      <span className="text-gray-400">|</span>
                      <p className="text-sm text-gray-600">KOZHIKODE</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <img 
                        src={kefLogoImage} 
                        alt="Kerala Economic Forum" 
                        className="h-8 object-contain"
                      />
                      <div className="flex items-center gap-1">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
                          <span className="text-white text-[8px] font-bold">C</span>
                        </div>
                        <span className="text-xs font-semibold text-gray-600">CALIPH<sup className="text-[6px]">Edu</sup></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="border-l-2 border-dashed border-gray-300 h-[80%] relative">
                  <div className="absolute -top-3 -left-3 w-6 h-6 bg-background rounded-full"></div>
                  <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-background rounded-full"></div>
                </div>
              </div>
              
              <div className="w-[200px] p-4 flex flex-col items-center justify-center bg-white">
                {qrCodeUrl && (
                  <img 
                    src={qrCodeUrl} 
                    alt="Ticket QR Code" 
                    className="w-32 h-32 mb-2"
                    data-testid="img-qr-code"
                  />
                )}
                <p className="text-[8px] text-gray-500 text-center">
                  Scan for attendee details & payment verification
                </p>
              </div>
              
              <div className="w-20 bg-gray-100 flex flex-col items-center justify-between py-4 px-2">
                <div className="flex flex-col items-center">
                  <div className="w-1 flex flex-col gap-0.5">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="h-1.5 bg-gray-800" 
                        style={{ width: Math.random() > 0.5 ? '3px' : '6px' }}
                      ></div>
                    ))}
                  </div>
                  <p className="text-[8px] text-gray-600 mt-1 rotate-0">{ticketNumber}</p>
                </div>
                
                <div className="text-center transform -rotate-90 origin-center whitespace-nowrap">
                  <p className="text-[8px] text-gray-500 uppercase tracking-wide">TICKET NUMBER:</p>
                  <p className="text-[10px] font-bold text-gray-800">{ticketNumber}</p>
                </div>
                
                <div className="text-center">
                  <p className="text-[8px] text-gray-500 uppercase">DATE</p>
                  <p className="text-[10px] font-bold text-gray-800">7-8</p>
                  <p className="text-[8px] text-gray-500 uppercase mt-2">DESTINATION</p>
                  <p className="text-[8px] font-medium text-gray-700">: CALICUT BEACH</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="mt-8 bg-card border border-card-border rounded-lg p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold mb-4">Attendee Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <p className="font-medium">{ticket.ticketType || "Normal"}</p>
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
          
          {ticket.contestName === "StartUp Pitch" && (ticket.teamMember1Name || ticket.teamMember2Name) && (
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

        {ticket.paymentScreenshot && (
          <motion.div 
            className="mt-4 bg-card border border-card-border rounded-lg p-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-lg font-semibold mb-4">Payment Proof</h2>
            <img 
              src={ticket.paymentScreenshot} 
              alt="Payment screenshot" 
              className="w-full max-w-md rounded-lg border border-border object-contain"
              data-testid="img-payment-screenshot"
            />
          </motion.div>
        )}

        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
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
