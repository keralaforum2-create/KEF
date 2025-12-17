import { useEffect, useState, useRef } from "react";
import { useParams } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, AlertCircle, Download, ExternalLink, Gift, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import QRCode from "qrcode";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import ticketBgImage from "@assets/Beige_Black_Minimalist_Event_Music_Festival_Concert_Ticket_1764742314478.png";
import iAmAttendingPosterImage from "@assets/I_AM_ATTENDING_1765963893271.jpg";

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
  const [showPosterModal, setShowPosterModal] = useState(false);
  const [generatedPoster, setGeneratedPoster] = useState<string | null>(null);
  const [isGeneratingPoster, setIsGeneratingPoster] = useState(false);

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

  const generateAttendingPoster = async () => {
    if (!ticket) return;
    
    setIsGeneratingPoster(true);
    setShowPosterModal(true);
    
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context not available');
      
      const posterImg = new Image();
      posterImg.crossOrigin = 'anonymous';
      
      await new Promise<void>((resolve, reject) => {
        posterImg.onload = () => resolve();
        posterImg.onerror = reject;
        posterImg.src = iAmAttendingPosterImage;
      });
      
      canvas.width = posterImg.width;
      canvas.height = posterImg.height;
      ctx.drawImage(posterImg, 0, 0);
      
      const circleX = canvas.width * 0.35;
      const circleY = canvas.height * 0.38;
      const circleRadius = canvas.width * 0.145;
      
      let photoLoaded = false;
      if (ticket.profilePhoto) {
        try {
          const userImg = new Image();
          userImg.crossOrigin = 'anonymous';
          
          await new Promise<void>((resolve) => {
            userImg.onload = () => {
              photoLoaded = true;
              resolve();
            };
            userImg.onerror = () => resolve();
            userImg.src = ticket.profilePhoto!;
          });
          
          if (photoLoaded && userImg.complete && userImg.naturalWidth > 0) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            
            const scale = Math.max(
              (circleRadius * 2) / userImg.width,
              (circleRadius * 2) / userImg.height
            );
            const scaledWidth = userImg.width * scale;
            const scaledHeight = userImg.height * scale;
            const imgX = circleX - scaledWidth / 2;
            const imgY = circleY - scaledHeight / 2;
            
            ctx.drawImage(userImg, imgX, imgY, scaledWidth, scaledHeight);
            ctx.restore();
          }
        } catch {
          photoLoaded = false;
        }
      }
      
      if (!photoLoaded) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = '#e5e7eb';
        ctx.fill();
        
        ctx.fillStyle = '#9ca3af';
        ctx.font = `bold ${canvas.width * 0.06}px Arial, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const initials = ticket.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        ctx.fillText(initials, circleX, circleY);
        ctx.restore();
      }
      
      ctx.fillStyle = '#1a1a1a';
      ctx.font = `bold ${canvas.width * 0.028}px Arial, sans-serif`;
      ctx.textAlign = 'left';
      const nameX = canvas.width * 0.52;
      const nameY = canvas.height * 0.545;
      ctx.fillText(ticket.fullName.toUpperCase(), nameX, nameY);
      
      const posterDataUrl = canvas.toDataURL('image/png');
      setGeneratedPoster(posterDataUrl);
      
      const link = document.createElement('a');
      link.download = `I_AM_ATTENDING_KSF2026_${ticket.registrationId}.png`;
      link.href = posterDataUrl;
      link.click();
      
    } catch (err) {
      console.error('Failed to generate poster:', err);
      setGeneratedPoster(null);
    } finally {
      setIsGeneratingPoster(false);
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
          className="mt-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        >
          <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border-amber-200 dark:border-amber-800">
            <CardContent className="p-6 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
                className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <Gift className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300 mb-2">
                You have a gift!
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-400 mb-4">
                Generate your personalized "I AM ATTENDING" poster and share it with your friends!
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  onClick={generateAttendingPoster}
                  disabled={isGeneratingPoster}
                  className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-semibold px-8"
                  data-testid="button-open-gift"
                >
                  {isGeneratingPoster ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Gift className="w-4 h-4 mr-2" />
                      Open Your Gift
                    </>
                  )}
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

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

      <AnimatePresence>
        {showPosterModal && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl"
            >
              <button
                onClick={() => setShowPosterModal(false)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10"
                data-testid="button-close-poster-modal"
              >
                <X className="w-8 h-8" />
              </button>
              
              {isGeneratingPoster ? (
                <div className="bg-white rounded-xl p-12 text-center">
                  <Loader2 className="w-12 h-12 animate-spin text-amber-500 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700">Generating your poster...</p>
                </div>
              ) : generatedPoster ? (
                <div className="bg-white rounded-xl overflow-hidden">
                  <img 
                    src={generatedPoster} 
                    alt="I AM ATTENDING KSF 2026" 
                    className="w-full h-auto"
                    data-testid="img-generated-poster"
                  />
                  <div className="p-4 bg-gray-50 flex flex-wrap justify-center gap-3">
                    <Button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.download = `I_AM_ATTENDING_KSF2026_${ticket?.registrationId}.png`;
                        link.href = generatedPoster;
                        link.click();
                      }}
                      className="bg-gradient-to-r from-amber-500 to-yellow-500"
                      data-testid="button-download-poster"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Poster
                    </Button>
                    <Button
                      onClick={() => setShowPosterModal(false)}
                      variant="outline"
                      data-testid="button-close-poster"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl p-12 text-center">
                  <p className="text-gray-500">Failed to generate poster. Please try again.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
