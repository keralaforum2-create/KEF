import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertCircle, 
  CheckCircle2, 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Ticket,
  Trophy,
  Calendar,
  FileImage,
  ExternalLink
} from "lucide-react";

interface Registration {
  id: string;
  registrationId: string;
  fullName: string;
  email: string;
  phone: string;
  age: string;
  institution: string | null;
  registrationType: string;
  contestName: string | null;
  sessionName: string | null;
  ticketCategory: string | null;
  participantType: string | null;
  schoolGrade: string | null;
  collegeYear: string | null;
  collegeCourse: string | null;
  teamMember1Name: string | null;
  teamMember2Name: string | null;
  paymentScreenshot: string | null;
  pitchStartupName: string | null;
}

export default function Checkin() {
  const { id } = useParams<{ id: string }>();
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkedIn, setCheckedIn] = useState(false);

  useEffect(() => {
    const fetchRegistration = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/ticket/${id}`);
        if (!response.ok) {
          throw new Error("Registration not found");
        }
        const data = await response.json();
        setRegistration(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load registration");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRegistration();
    }
  }, [id]);

  const handleCheckin = () => {
    setCheckedIn(true);
  };

  const isPitchRoom = registration?.contestName === "The Pitch Room";

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
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
          <p className="text-white/70">Verifying ticket...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !registration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="w-full max-w-md bg-red-950/50 border-red-500/50">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <AlertCircle className="w-16 h-16 text-red-500" />
                </motion.div>
                <h1 className="text-2xl font-bold text-white">Invalid Ticket</h1>
                <p className="text-white/70">{error || "This ticket does not exist in our system."}</p>
                <p className="text-sm text-red-400 font-medium">Do not allow entry.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl font-bold text-white mb-2">Staff Check-in Portal</h1>
          <p className="text-white/60 text-sm">Kerala Startup Fest 2026</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className={`border-2 ${checkedIn ? 'bg-green-950/30 border-green-500' : 'bg-slate-800/50 border-primary'}`}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <CardTitle className="text-white flex items-center gap-2">
                  {checkedIn ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : (
                    <Ticket className="w-6 h-6 text-primary" />
                  )}
                  {checkedIn ? "Checked In" : "Valid Ticket"}
                </CardTitle>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline" className="text-white border-white/30">
                    {registration.registrationType === "contest" ? "Contest" : "Session"}
                  </Badge>
                  {registration.ticketCategory === "premium" && (
                    <Badge className="bg-amber-500 text-black">
                      Premium
                    </Badge>
                  )}
                  {isPitchRoom && (
                    <Badge className="bg-purple-600 text-white">
                      Pitch Room
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-slate-900/50 rounded-lg p-4">
                <p className="text-xs text-white/50 mb-1">Ticket ID</p>
                <p className="text-xl font-mono font-bold text-primary">{registration.registrationId}</p>
              </div>

              {isPitchRoom ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white">
                    <User className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-white/50">Full Name</p>
                      <p className="font-medium">{registration.fullName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-white">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-white/50">Email</p>
                      <p className="font-medium">{registration.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-white">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-white/50">Phone</p>
                      <p className="font-medium">{registration.phone}</p>
                    </div>
                  </div>

                  {registration.paymentScreenshot && (
                    <div className="border-t border-white/10 pt-4">
                      <div className="flex items-center gap-2 mb-3">
                        <FileImage className="w-5 h-5 text-primary" />
                        <p className="text-sm font-medium text-white">Payment Proof</p>
                      </div>
                      <a 
                        href={registration.paymentScreenshot} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <img 
                          src={registration.paymentScreenshot} 
                          alt="Payment Proof" 
                          className="w-full max-w-sm rounded-lg border border-white/20"
                          data-testid="img-payment-proof"
                        />
                      </a>
                    </div>
                  )}

                  <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-3 mt-4">
                    <p className="text-xs text-purple-300">
                      Note: This is a Pitch Room participant. Additional pitch details are confidential.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white">
                    <User className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-white/50">Full Name</p>
                      <p className="font-medium">{registration.fullName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-white">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-white/50">Email</p>
                      <p className="font-medium">{registration.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-white">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-white/50">Phone</p>
                      <p className="font-medium">{registration.phone}</p>
                    </div>
                  </div>

                  {registration.institution && (
                    <div className="flex items-center gap-3 text-white">
                      <Building2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-xs text-white/50">Organization / College</p>
                        <p className="font-medium">{registration.institution}</p>
                      </div>
                    </div>
                  )}

                  {registration.contestName && (
                    <div className="flex items-center gap-3 text-white">
                      <Trophy className="w-5 h-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-xs text-white/50">Contest</p>
                        <p className="font-medium">{registration.contestName}</p>
                      </div>
                    </div>
                  )}

                  {registration.sessionName && (
                    <div className="flex items-center gap-3 text-white">
                      <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-xs text-white/50">Session</p>
                        <p className="font-medium">{registration.sessionName}</p>
                      </div>
                    </div>
                  )}

                  {registration.participantType && (
                    <div className="flex items-center gap-3 text-white">
                      <User className="w-5 h-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-xs text-white/50">Participant Type</p>
                        <p className="font-medium capitalize">{registration.participantType.replace("-", " ")}</p>
                      </div>
                    </div>
                  )}

                  {(registration.teamMember1Name || registration.teamMember2Name) && (
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-xs text-white/50 mb-2">Team Members</p>
                      <div className="space-y-1 text-white">
                        {registration.teamMember1Name && (
                          <p className="font-medium">1. {registration.teamMember1Name}</p>
                        )}
                        {registration.teamMember2Name && (
                          <p className="font-medium">2. {registration.teamMember2Name}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {registration.paymentScreenshot && (
                    <div className="border-t border-white/10 pt-4">
                      <div className="flex items-center gap-2 mb-3">
                        <FileImage className="w-5 h-5 text-primary" />
                        <p className="text-sm font-medium text-white">Payment Proof</p>
                      </div>
                      <a 
                        href={registration.paymentScreenshot} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <img 
                          src={registration.paymentScreenshot} 
                          alt="Payment Proof" 
                          className="w-full max-w-sm rounded-lg border border-white/20"
                          data-testid="img-payment-proof"
                        />
                      </a>
                    </div>
                  )}
                </div>
              )}

              {!checkedIn && (
                <motion.div 
                  className="pt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button 
                    onClick={handleCheckin}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    size="lg"
                    data-testid="button-confirm-checkin"
                  >
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Confirm Check-in
                  </Button>
                </motion.div>
              )}

              {checkedIn && (
                <motion.div 
                  className="bg-green-900/30 border border-green-500/50 rounded-lg p-4 text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-2" />
                  <p className="text-green-400 font-medium">Successfully Checked In</p>
                  <p className="text-white/60 text-sm mt-1">Entry allowed</p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.p 
          className="text-center text-white/40 text-xs mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Staff Check-in System - Kerala Startup Fest 2026
        </motion.p>
      </div>
    </div>
  );
}
