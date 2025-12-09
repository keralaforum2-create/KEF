import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Users, Mail, Phone, Building2, MessageSquare, UserCheck, Eye, Briefcase, Handshake, Trash2, ImageIcon, Download, CreditCard, QrCode, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Registration, Contact, InvestorMentor, Sponsorship, BulkRegistration } from "@shared/schema";
import { ScrollFadeUp, StaggerContainer, StaggerItem, CardWave } from "@/lib/animations";

export default function Admin() {
  const [, setLocation] = useLocation();
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedInvestor, setSelectedInvestor] = useState<InvestorMentor | null>(null);
  const [selectedSponsorship, setSelectedSponsorship] = useState<Sponsorship | null>(null);
  const [selectedBulkReg, setSelectedBulkReg] = useState<BulkRegistration | null>(null);
  const [showOnlyPaid, setShowOnlyPaid] = useState(true);
  
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      setLocation("/admin-login");
    }
  }, [setLocation]);

  const { data: registrations, isLoading: loadingRegistrations } = useQuery<Registration[]>({
    queryKey: ["/api/registrations"],
    refetchInterval: 5000,
  });

  const { data: contacts, isLoading: loadingContacts } = useQuery<Contact[]>({
    queryKey: ["/api/contacts"],
    refetchInterval: 5000,
  });

  const { data: investorMentors, isLoading: loadingInvestors } = useQuery<InvestorMentor[]>({
    queryKey: ["/api/investor-mentors"],
    refetchInterval: 5000,
  });

  const { data: sponsorships, isLoading: loadingSponsorships } = useQuery<Sponsorship[]>({
    queryKey: ["/api/sponsorships"],
    refetchInterval: 5000,
  });

  const { data: bulkRegistrations, isLoading: loadingBulk } = useQuery<BulkRegistration[]>({
    queryKey: ["/api/bulk-registrations"],
    refetchInterval: 5000,
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deleteRegistrationMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/registrations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/registrations"] });
      toast({ title: "Registration deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete registration", variant: "destructive" });
    },
  });

  const deleteContactMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/contacts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
      toast({ title: "Contact deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete contact", variant: "destructive" });
    },
  });

  const deleteInvestorMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/investor-mentors/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/investor-mentors"] });
      toast({ title: "Application deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete application", variant: "destructive" });
    },
  });

  const deleteSponsorshipMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/sponsorships/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sponsorships"] });
      toast({ title: "Sponsorship deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete sponsorship", variant: "destructive" });
    },
  });

  const getRegistrationTypeBadge = (type: string) => {
    const variants: Record<string, string> = {
      "expert-session": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      "contest": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    };
    return variants[type] || "bg-gray-100 text-gray-800";
  };

  const getParticipantTypeBadge = (type: string) => {
    const variants: Record<string, string> = {
      individual: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      team: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      institution: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    };
    return variants[type] || "bg-gray-100 text-gray-800";
  };

  const getUserTypeBadge = (type: string) => {
    const variants: Record<string, string> = {
      student: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      teacher: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      institution: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      investor: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
      sponsor: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300",
      other: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    };
    return variants[type] || "bg-gray-100 text-gray-800";
  };

  const allRegistrations = registrations || [];
  const paidRegistrations = registrations?.filter(r => 
    r.paymentStatus === 'paid' || r.paymentStatus === 'screenshot_uploaded'
  ) || [];
  const pendingPaymentRegistrations = registrations?.filter(r => 
    !r.paymentStatus || r.paymentStatus === 'pending' || r.paymentStatus === 'failed'
  ) || [];
  
  const displayedRegistrations = showOnlyPaid ? paidRegistrations : allRegistrations;
  
  const getPaymentMethod = (reg: Registration): { method: string; icon: typeof CreditCard } => {
    if (reg.paymentScreenshot === 'phonepe_payment' || reg.phonepeMerchantTransactionId) {
      return { method: 'Pay Online', icon: CreditCard };
    } else if (reg.paymentScreenshot && reg.paymentScreenshot.startsWith('/')) {
      return { method: 'QR Scan', icon: QrCode };
    }
    return { method: 'Pending', icon: CreditCard };
  };
  
  const statCards = [
    { icon: UserCheck, label: "Total Registrations", value: allRegistrations.length, testId: "text-registration-count" },
    { icon: MessageSquare, label: "Contact Messages", value: contacts?.length || 0, testId: "text-contact-count" },
    { icon: Briefcase, label: "Investor/Mentor", value: investorMentors?.length || 0, testId: "text-investor-count" },
    { icon: Handshake, label: "Sponsorships", value: sponsorships?.length || 0, testId: "text-sponsorship-count" },
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeUp>
            <div className="mb-8">
              <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-2" data-testid="text-admin-title">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                View all registrations and contact form submissions for Kerala Startup Fest 2026.
              </p>
            </div>
          </ScrollFadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map((stat, index) => (
              <CardWave key={index} index={index} baseDelay={0.1}>
                <Card className="hover-elevate">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold" data-testid={stat.testId}>
                          {stat.value}
                        </p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardWave>
            ))}
          </div>

          <ScrollFadeUp delay={0.3}>
            <Tabs defaultValue="registrations" className="w-full">
              <TabsList className="mb-6 flex flex-wrap">
                <TabsTrigger value="registrations" data-testid="tab-registrations">
                  Registrations ({allRegistrations.length})
                </TabsTrigger>
                <TabsTrigger value="contacts" data-testid="tab-contacts">
                  Contacts ({contacts?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="investors" data-testid="tab-investors">
                  Investors/Mentors ({investorMentors?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="sponsorships" data-testid="tab-sponsorships">
                  Sponsorships ({sponsorships?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="bulk" data-testid="tab-bulk">
                  Bulk Registrations ({bulkRegistrations?.length || 0})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="registrations">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <UserCheck className="w-5 h-5" />
                        Event Registrations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {loadingRegistrations ? (
                        <div className="text-center py-8 text-muted-foreground">
                          Loading registrations...
                        </div>
                      ) : allRegistrations.length > 0 ? (
                        <div className="overflow-x-auto">
                          <div className="mb-4 flex flex-wrap items-center gap-2">
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              Paid: {paidRegistrations.length}
                            </Badge>
                            <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                              Pending/Failed: {pendingPaymentRegistrations.length}
                            </Badge>
                            <Button
                              variant={showOnlyPaid ? "default" : "outline"}
                              size="sm"
                              onClick={() => setShowOnlyPaid(!showOnlyPaid)}
                              data-testid="button-toggle-paid-filter"
                            >
                              <Filter className="w-4 h-4 mr-1" />
                              {showOnlyPaid ? "Showing Paid Only" : "Showing All"}
                            </Button>
                          </div>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Payment Method</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Registration ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Action</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {displayedRegistrations.map((reg, index) => {
                                const paymentInfo = getPaymentMethod(reg);
                                const PaymentIcon = paymentInfo.icon;
                                return (
                                <motion.tr
                                  key={reg.id}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.03 }}
                                  className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${reg.paymentStatus === 'failed' || reg.paymentStatus === 'pending' ? 'bg-amber-50/50 dark:bg-amber-900/10' : ''}`}
                                  data-testid={`row-registration-${reg.id}`}
                                >
                                  <TableCell>
                                    <Badge className={paymentInfo.method === 'Pay Online' 
                                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' 
                                      : paymentInfo.method === 'QR Scan' 
                                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                                    }>
                                      <PaymentIcon className="w-3 h-3 mr-1" />
                                      {paymentInfo.method}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    {reg.paymentStatus === 'paid' || reg.paymentStatus === 'screenshot_uploaded' ? (
                                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                        Paid
                                      </Badge>
                                    ) : reg.paymentStatus === 'failed' ? (
                                      <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                                        Failed
                                      </Badge>
                                    ) : (
                                      <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                                        Pending
                                      </Badge>
                                    )}
                                  </TableCell>
                                  <TableCell className="font-mono text-xs text-primary">{reg.registrationId}</TableCell>
                                  <TableCell className="font-medium">{reg.fullName}</TableCell>
                                  <TableCell className="text-sm text-muted-foreground">{reg.email}</TableCell>
                                  <TableCell>
                                    <Badge className={getRegistrationTypeBadge(reg.registrationType)}>
                                      {reg.registrationType === "expert-session" ? "Expert Session" : "Contest"}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setSelectedReg(reg)}
                                        data-testid={`button-view-registration-${reg.id}`}
                                      >
                                        <Eye className="w-4 h-4 mr-1" />
                                        View
                                      </Button>
                                      <Button
                                        variant="default"
                                        size="sm"
                                        onClick={() => window.open(`/ticket/${reg.registrationId}`, '_blank')}
                                        data-testid={`button-download-ticket-${reg.id}`}
                                      >
                                        <Download className="w-4 h-4 mr-1" />
                                        Ticket
                                      </Button>
                                      <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => {
                                          if (confirm("Are you sure you want to delete this registration?")) {
                                            deleteRegistrationMutation.mutate(reg.id);
                                          }
                                        }}
                                        disabled={deleteRegistrationMutation.isPending}
                                        data-testid={`button-delete-registration-${reg.id}`}
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </motion.tr>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <UserCheck className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                          <p className="text-muted-foreground">No registrations yet</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Registrations will appear here when people sign up for the event.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="contacts">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" />
                        Contact Messages
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {loadingContacts ? (
                        <div className="text-center py-8 text-muted-foreground">
                          Loading messages...
                        </div>
                      ) : contacts && contacts.length > 0 ? (
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Action</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {contacts.map((contact, index) => (
                                <motion.tr
                                  key={contact.id}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.03 }}
                                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                  data-testid={`row-contact-${contact.id}`}
                                >
                                  <TableCell className="font-medium">{contact.name}</TableCell>
                                  <TableCell>
                                    <Badge className={getUserTypeBadge(contact.userType)}>
                                      {contact.userType}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setSelectedContact(contact)}
                                        data-testid={`button-view-contact-${contact.id}`}
                                      >
                                        <Eye className="w-4 h-4 mr-1" />
                                        View
                                      </Button>
                                      <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => {
                                          if (confirm("Are you sure you want to delete this contact?")) {
                                            deleteContactMutation.mutate(contact.id);
                                          }
                                        }}
                                        disabled={deleteContactMutation.isPending}
                                        data-testid={`button-delete-contact-${contact.id}`}
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </motion.tr>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                          <p className="text-muted-foreground">No contact messages yet</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Messages from the contact form will appear here.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="investors">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5" />
                        Investor & Mentor Applications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {loadingInvestors ? (
                        <div className="text-center py-8 text-muted-foreground">
                          Loading applications...
                        </div>
                      ) : investorMentors && investorMentors.length > 0 ? (
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Company</TableHead>
                                <TableHead>Action</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {investorMentors.map((investor, index) => (
                                <motion.tr
                                  key={investor.id}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.03 }}
                                  className="border-b transition-colors hover:bg-muted/50"
                                  data-testid={`row-investor-${investor.id}`}
                                >
                                  <TableCell className="font-medium">{investor.name}</TableCell>
                                  <TableCell>
                                    <Badge className={investor.type === "investor" ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"}>
                                      {investor.type.charAt(0).toUpperCase() + investor.type.slice(1)}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>{investor.companyName || "-"}</TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setSelectedInvestor(investor)}
                                        data-testid={`button-view-investor-${investor.id}`}
                                      >
                                        <Eye className="w-4 h-4 mr-1" />
                                        View
                                      </Button>
                                      <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => {
                                          if (confirm("Are you sure you want to delete this application?")) {
                                            deleteInvestorMutation.mutate(investor.id);
                                          }
                                        }}
                                        disabled={deleteInvestorMutation.isPending}
                                        data-testid={`button-delete-investor-${investor.id}`}
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </motion.tr>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                          <p className="text-muted-foreground">No applications yet</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="sponsorships">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Handshake className="w-5 h-5" />
                        Sponsorship Inquiries
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {loadingSponsorships ? (
                        <div className="text-center py-8 text-muted-foreground">
                          Loading inquiries...
                        </div>
                      ) : sponsorships && sponsorships.length > 0 ? (
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Company</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Level</TableHead>
                                <TableHead>Action</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {sponsorships.map((sponsorship, index) => (
                                <motion.tr
                                  key={sponsorship.id}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.03 }}
                                  className="border-b transition-colors hover:bg-muted/50"
                                  data-testid={`row-sponsorship-${sponsorship.id}`}
                                >
                                  <TableCell className="font-medium">{sponsorship.companyName}</TableCell>
                                  <TableCell>{sponsorship.contactPersonName}</TableCell>
                                  <TableCell>{sponsorship.sponsorshipLevel || "-"}</TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setSelectedSponsorship(sponsorship)}
                                        data-testid={`button-view-sponsorship-${sponsorship.id}`}
                                      >
                                        <Eye className="w-4 h-4 mr-1" />
                                        View
                                      </Button>
                                      <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => {
                                          if (confirm("Are you sure you want to delete this sponsorship?")) {
                                            deleteSponsorshipMutation.mutate(sponsorship.id);
                                          }
                                        }}
                                        disabled={deleteSponsorshipMutation.isPending}
                                        data-testid={`button-delete-sponsorship-${sponsorship.id}`}
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </motion.tr>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <Handshake className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                          <p className="text-muted-foreground">No sponsorship inquiries yet</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="bulk">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="w-5 h-5" />
                        Bulk Registrations (Institutions)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {loadingBulk ? (
                        <div className="text-center py-8 text-muted-foreground">
                          Loading bulk registrations...
                        </div>
                      ) : bulkRegistrations && bulkRegistrations.length > 0 ? (
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Registration ID</TableHead>
                                <TableHead>Institution</TableHead>
                                <TableHead>Mentor</TableHead>
                                <TableHead>Students</TableHead>
                                <TableHead>Ticket Type</TableHead>
                                <TableHead>Total Amount</TableHead>
                                <TableHead>Action</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {bulkRegistrations.map((bulk, index) => (
                                <motion.tr
                                  key={bulk.id}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.03 }}
                                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                  data-testid={`row-bulk-${bulk.id}`}
                                >
                                  <TableCell className="font-mono text-xs">
                                    {bulk.registrationId.substring(0, 8)}...
                                  </TableCell>
                                  <TableCell className="font-medium">
                                    {bulk.institutionName}
                                  </TableCell>
                                  <TableCell>
                                    <div className="text-sm">
                                      <p>{bulk.mentorName}</p>
                                      <p className="text-muted-foreground text-xs">{bulk.mentorEmail}</p>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                      {bulk.numberOfStudents} students
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <Badge className={bulk.ticketCategory === "premium" 
                                      ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" 
                                      : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                    }>
                                      {bulk.ticketCategory}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="font-semibold text-primary">
                                    {bulk.totalAmount}
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setSelectedBulkReg(bulk)}
                                        data-testid={`button-view-bulk-${bulk.id}`}
                                      >
                                        <Eye className="w-4 h-4 mr-1" />
                                        View
                                      </Button>
                                      <Button
                                        variant="default"
                                        size="sm"
                                        onClick={() => window.open(`/bulk-ticket/${bulk.registrationId}`, '_blank')}
                                        data-testid={`button-tickets-bulk-${bulk.id}`}
                                      >
                                        <Download className="w-4 h-4 mr-1" />
                                        Tickets
                                      </Button>
                                    </div>
                                  </TableCell>
                                </motion.tr>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                          <p className="text-muted-foreground">No bulk registrations yet</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </ScrollFadeUp>
        </div>
      </section>

      <AnimatePresence>
        {selectedReg && (
          <Dialog open={!!selectedReg} onOpenChange={() => setSelectedReg(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Registration Details</DialogTitle>
                <DialogDescription>Full information for this registration</DialogDescription>
              </DialogHeader>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="space-y-4 max-h-[70vh] overflow-y-auto"
              >
                <div className="bg-primary/10 rounded-lg p-4 mb-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Registration ID</p>
                  <p className="text-xl font-bold text-primary font-mono">{selectedReg.registrationId}</p>
                </div>

                <div className="flex justify-end mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const doc = new jsPDF();
                      const pageWidth = doc.internal.pageSize.getWidth();
                      const pageHeight = doc.internal.pageSize.getHeight();
                      const margin = 20;
                      const maxTextWidth = pageWidth - margin - 70;
                      
                      doc.setFontSize(20);
                      doc.text("Kerala Startup Fest 2026", 105, 20, { align: "center" });
                      doc.setFontSize(14);
                      doc.text("Registration Details", 105, 30, { align: "center" });
                      doc.setFontSize(10);
                      let y = 45;
                      
                      const checkPageBreak = (neededSpace: number) => {
                        if (y + neededSpace > pageHeight - 20) {
                          doc.addPage();
                          y = 20;
                        }
                      };
                      
                      const addLine = (label: string, value: string | undefined | null) => {
                        if (value) {
                          const wrappedText = doc.splitTextToSize(value, maxTextWidth);
                          const lineHeight = 5;
                          const totalHeight = wrappedText.length * lineHeight + 3;
                          checkPageBreak(totalHeight);
                          
                          doc.setFont("helvetica", "bold");
                          doc.text(`${label}:`, margin, y);
                          doc.setFont("helvetica", "normal");
                          doc.text(wrappedText, 70, y);
                          y += totalHeight;
                        }
                      };
                      
                      addLine("Registration ID", selectedReg.registrationId);
                      addLine("Full Name", selectedReg.fullName);
                      addLine("Email", selectedReg.email);
                      addLine("Phone", selectedReg.phone);
                      addLine("Age", selectedReg.age);
                      addLine("Institution", selectedReg.institution);
                      addLine("Ticket Category", selectedReg.ticketCategory === "premium" ? "Premium" : "Normal");
                      addLine("Registration Type", selectedReg.registrationType === "expert-session" ? "Expert Session" : "Contest");
                      addLine("Session Name", selectedReg.sessionName);
                      addLine("Contest Name", selectedReg.contestName);
                      addLine("Participant Type", selectedReg.participantType?.replace("-", " "));
                      addLine("School Grade", selectedReg.schoolGrade);
                      addLine("College Year", selectedReg.collegeYear);
                      addLine("College Course", selectedReg.collegeCourse);
                      addLine("Team Member 1", selectedReg.teamMember1Name);
                      addLine("Team Member 2", selectedReg.teamMember2Name);
                      addLine("Payment Status", selectedReg.paymentStatus);
                      addLine("Created At", selectedReg.createdAt ? new Date(selectedReg.createdAt).toLocaleString() : null);
                      
                      if (selectedReg.contestName === "The Pitch Room") {
                        checkPageBreak(15);
                        y += 5;
                        doc.setFontSize(12);
                        doc.setFont("helvetica", "bold");
                        doc.text("Pitch Room Details", margin, y);
                        y += 8;
                        doc.setFontSize(10);
                        addLine("Startup Name", selectedReg.pitchStartupName);
                        addLine("Elevator Pitch", selectedReg.pitchElevatorPitch);
                        addLine("Problem Statement", selectedReg.pitchProblemStatement);
                        addLine("Proposed Solution", selectedReg.pitchProposedSolution);
                        addLine("Product Name", selectedReg.pitchProductName);
                        addLine("Product Description", selectedReg.pitchProductDescription);
                        addLine("Pricing Model", selectedReg.pitchPricingModel);
                        addLine("Cost Per Unit", selectedReg.pitchCostPerUnit);
                        addLine("Selling Price", selectedReg.pitchSellingPrice);
                        addLine("Profit Per Unit", selectedReg.pitchProfitPerUnit);
                        addLine("Capital Required", selectedReg.pitchTotalCapitalRequired);
                        addLine("Revenue Per User", selectedReg.pitchRevenuePerUser);
                        addLine("Target Customers", selectedReg.pitchTargetCustomers);
                        addLine("Market Size", selectedReg.pitchMarketSize);
                        addLine("Competitor Analysis", selectedReg.pitchCompetitorAnalysis);
                        addLine("Revenue Model", selectedReg.pitchRevenueModel);
                        addLine("Revenue Streams", selectedReg.pitchRevenueStreams);
                        addLine("Year 1 Revenue", selectedReg.pitchYear1Revenue);
                        addLine("Year 2 Revenue", selectedReg.pitchYear2Revenue);
                        addLine("Year 3 Revenue", selectedReg.pitchYear3Revenue);
                        addLine("Year 4 Revenue", selectedReg.pitchYear4Revenue);
                        addLine("Year 5 Revenue", selectedReg.pitchYear5Revenue);
                        addLine("Expected ROI", selectedReg.pitchExpectedRoi);
                        addLine("Breakeven Period", selectedReg.pitchBreakevenPeriod);
                        addLine("Feasibility Reasons", selectedReg.pitchFeasibilityReasons);
                        addLine("Current Stage", selectedReg.pitchCurrentStage);
                        addLine("Demo Video Link", selectedReg.pitchDemoVideoLink);
                        addLine("Supporting Files", selectedReg.pitchSupportingFiles);
                      }
                      doc.save(`KSF-2026-Registration-${selectedReg.registrationId}.pdf`);
                    }}
                    data-testid="button-download-registration-pdf"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <p className="text-base font-medium">{selectedReg.fullName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Ticket Category</label>
                    <Badge className={selectedReg.ticketCategory === "premium" ? "bg-amber-500 text-white" : "bg-gray-200 text-gray-700"}>
                      {selectedReg.ticketCategory === "premium" ? "Premium" : "Normal"}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-base">{selectedReg.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p className="text-base">{selectedReg.phone}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Age</label>
                    <p className="text-base">{selectedReg.age}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Institution</label>
                    <p className="text-base">{selectedReg.institution || "-"}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Registration For</label>
                  <p className="text-base capitalize">{selectedReg.registrationType === "expert-session" ? "Expert Session" : "Contest"}</p>
                </div>
                {selectedReg.sessionName && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Session Name</label>
                    <p className="text-base">{selectedReg.sessionName}</p>
                  </div>
                )}
                {selectedReg.contestName && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Contest</label>
                    <p className="text-base">{selectedReg.contestName}</p>
                  </div>
                )}
                {selectedReg.participantType && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Participant Type</label>
                    <p className="text-base capitalize">{selectedReg.participantType.replace("-", " ")}</p>
                  </div>
                )}
                {selectedReg.schoolGrade && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">School Grade</label>
                    <p className="text-base">{selectedReg.schoolGrade}</p>
                  </div>
                )}
                {(selectedReg.collegeYear || selectedReg.collegeCourse) && (
                  <div className="grid grid-cols-2 gap-4">
                    {selectedReg.collegeYear && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">College Year</label>
                        <p className="text-base">{selectedReg.collegeYear}</p>
                      </div>
                    )}
                    {selectedReg.collegeCourse && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">College Course</label>
                        <p className="text-base">{selectedReg.collegeCourse}</p>
                      </div>
                    )}
                  </div>
                )}
                {(selectedReg.teamMember1Name || selectedReg.teamMember2Name) && (
                  <div className="border-t pt-4">
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Team Members</label>
                    {selectedReg.teamMember1Name && <p className="text-base">1. {selectedReg.teamMember1Name}</p>}
                    {selectedReg.teamMember2Name && <p className="text-base">2. {selectedReg.teamMember2Name}</p>}
                  </div>
                )}
                
                {/* Pitch Room Details Section */}
                {selectedReg.contestName === "The Pitch Room" && (
                  <div className="border-t pt-4 space-y-4">
                    <h4 className="font-semibold text-primary">Pitch Room Details</h4>
                    
                    {selectedReg.pitchStartupName && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Startup Name</label>
                        <p className="text-base font-medium">{selectedReg.pitchStartupName}</p>
                      </div>
                    )}
                    {selectedReg.pitchElevatorPitch && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Elevator Pitch</label>
                        <p className="text-base">{selectedReg.pitchElevatorPitch}</p>
                      </div>
                    )}
                    {selectedReg.pitchProblemStatement && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Problem Statement</label>
                        <p className="text-base">{selectedReg.pitchProblemStatement}</p>
                      </div>
                    )}
                    {selectedReg.pitchProposedSolution && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Proposed Solution</label>
                        <p className="text-base">{selectedReg.pitchProposedSolution}</p>
                      </div>
                    )}
                    {selectedReg.pitchProductName && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Product Name</label>
                        <p className="text-base">{selectedReg.pitchProductName}</p>
                      </div>
                    )}
                    {selectedReg.pitchProductDescription && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Product Description</label>
                        <p className="text-base">{selectedReg.pitchProductDescription}</p>
                      </div>
                    )}
                    
                    {/* Pricing & Financial */}
                    <div className="bg-muted/30 p-3 rounded-lg space-y-2">
                      <h5 className="font-medium text-sm">Financial Details</h5>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {selectedReg.pitchPricingModel && (
                          <div>
                            <span className="text-muted-foreground">Pricing Model:</span>
                            <p className="font-medium">{selectedReg.pitchPricingModel}</p>
                          </div>
                        )}
                        {selectedReg.pitchCostPerUnit && (
                          <div>
                            <span className="text-muted-foreground">Cost/Unit:</span>
                            <p className="font-medium">{selectedReg.pitchCostPerUnit}</p>
                          </div>
                        )}
                        {selectedReg.pitchSellingPrice && (
                          <div>
                            <span className="text-muted-foreground">Selling Price:</span>
                            <p className="font-medium">{selectedReg.pitchSellingPrice}</p>
                          </div>
                        )}
                        {selectedReg.pitchProfitPerUnit && (
                          <div>
                            <span className="text-muted-foreground">Profit/Unit:</span>
                            <p className="font-medium">{selectedReg.pitchProfitPerUnit}</p>
                          </div>
                        )}
                        {selectedReg.pitchTotalCapitalRequired && (
                          <div>
                            <span className="text-muted-foreground">Capital Required:</span>
                            <p className="font-medium">{selectedReg.pitchTotalCapitalRequired}</p>
                          </div>
                        )}
                        {selectedReg.pitchRevenuePerUser && (
                          <div>
                            <span className="text-muted-foreground">Revenue/User:</span>
                            <p className="font-medium">{selectedReg.pitchRevenuePerUser}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Market Analysis */}
                    {(selectedReg.pitchTargetCustomers || selectedReg.pitchMarketSize || selectedReg.pitchCompetitorAnalysis) && (
                      <div className="bg-muted/30 p-3 rounded-lg space-y-2">
                        <h5 className="font-medium text-sm">Market Analysis</h5>
                        {selectedReg.pitchTargetCustomers && (
                          <div>
                            <span className="text-muted-foreground text-sm">Target Customers:</span>
                            <p className="text-sm">{selectedReg.pitchTargetCustomers}</p>
                          </div>
                        )}
                        {selectedReg.pitchMarketSize && (
                          <div>
                            <span className="text-muted-foreground text-sm">Market Size:</span>
                            <p className="text-sm">{selectedReg.pitchMarketSize}</p>
                          </div>
                        )}
                        {selectedReg.pitchCompetitorAnalysis && (
                          <div>
                            <span className="text-muted-foreground text-sm">Competitor Analysis:</span>
                            <p className="text-sm">{selectedReg.pitchCompetitorAnalysis}</p>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Revenue Projections */}
                    {(selectedReg.pitchYear1Revenue || selectedReg.pitchYear2Revenue) && (
                      <div className="bg-muted/30 p-3 rounded-lg space-y-2">
                        <h5 className="font-medium text-sm">Revenue Projections</h5>
                        <div className="grid grid-cols-5 gap-1 text-xs text-center">
                          {selectedReg.pitchYear1Revenue && <div><span className="text-muted-foreground">Y1</span><p className="font-medium">{selectedReg.pitchYear1Revenue}</p></div>}
                          {selectedReg.pitchYear2Revenue && <div><span className="text-muted-foreground">Y2</span><p className="font-medium">{selectedReg.pitchYear2Revenue}</p></div>}
                          {selectedReg.pitchYear3Revenue && <div><span className="text-muted-foreground">Y3</span><p className="font-medium">{selectedReg.pitchYear3Revenue}</p></div>}
                          {selectedReg.pitchYear4Revenue && <div><span className="text-muted-foreground">Y4</span><p className="font-medium">{selectedReg.pitchYear4Revenue}</p></div>}
                          {selectedReg.pitchYear5Revenue && <div><span className="text-muted-foreground">Y5</span><p className="font-medium">{selectedReg.pitchYear5Revenue}</p></div>}
                        </div>
                        {selectedReg.pitchExpectedRoi && (
                          <div className="mt-2">
                            <span className="text-muted-foreground text-sm">Expected ROI:</span>
                            <span className="font-medium ml-2">{selectedReg.pitchExpectedRoi}</span>
                          </div>
                        )}
                        {selectedReg.pitchBreakevenPeriod && (
                          <div>
                            <span className="text-muted-foreground text-sm">Breakeven Period:</span>
                            <span className="font-medium ml-2">{selectedReg.pitchBreakevenPeriod}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {(selectedReg.pitchRevenueModel || selectedReg.pitchRevenueStreams) && (
                      <div className="bg-muted/30 p-3 rounded-lg space-y-2">
                        <h5 className="font-medium text-sm">Revenue Model</h5>
                        {selectedReg.pitchRevenueModel && (
                          <div>
                            <span className="text-muted-foreground text-sm">Model:</span>
                            <p className="text-sm">{selectedReg.pitchRevenueModel}</p>
                          </div>
                        )}
                        {selectedReg.pitchRevenueStreams && (
                          <div>
                            <span className="text-muted-foreground text-sm">Revenue Streams:</span>
                            <p className="text-sm">{selectedReg.pitchRevenueStreams}</p>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {selectedReg.pitchFeasibilityReasons && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Why This Idea is Feasible</label>
                        <p className="text-base">{selectedReg.pitchFeasibilityReasons}</p>
                      </div>
                    )}
                    {selectedReg.pitchCurrentStage && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Current Stage</label>
                        <p className="text-base">{selectedReg.pitchCurrentStage}</p>
                      </div>
                    )}
                    {selectedReg.pitchDemoVideoLink && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Demo Video Link</label>
                        <a href={selectedReg.pitchDemoVideoLink} target="_blank" rel="noopener noreferrer" className="text-primary underline break-all">
                          {selectedReg.pitchDemoVideoLink}
                        </a>
                      </div>
                    )}
                    {selectedReg.pitchSupportingFiles && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Supporting Files</label>
                        <a href={selectedReg.pitchSupportingFiles} target="_blank" rel="noopener noreferrer" className="text-primary underline block">
                          View File
                        </a>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4 border-t pt-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Payment Status</label>
                    <Badge className={selectedReg.paymentStatus === "completed" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"}>
                      {selectedReg.paymentStatus || "Pending"}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Registered On</label>
                    <p className="text-sm">{selectedReg.createdAt ? new Date(selectedReg.createdAt).toLocaleString() : "-"}</p>
                  </div>
                </div>
                
                {selectedReg.paymentScreenshot && (
                  <div className="border-t pt-4">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      Payment Screenshot
                    </label>
                    <a href={selectedReg.paymentScreenshot} target="_blank" rel="noopener noreferrer">
                      <img 
                        src={selectedReg.paymentScreenshot} 
                        alt="Payment Screenshot" 
                        className="w-full rounded-lg border border-border mt-2 max-h-96 object-contain bg-muted/20 cursor-pointer"
                        data-testid="img-payment-screenshot-admin"
                      />
                    </a>
                    <p className="text-xs text-muted-foreground mt-1">Click image to view full size</p>
                  </div>
                )}
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedContact && (
          <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Contact Message Details</DialogTitle>
                <DialogDescription>Full information for this message</DialogDescription>
              </DialogHeader>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="space-y-4"
              >
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="text-base font-medium">{selectedContact.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-base">{selectedContact.email}</p>
                </div>
                {selectedContact.phone && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                    <p className="text-base">{selectedContact.phone}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Type</label>
                  <p className="text-base capitalize">{selectedContact.userType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Message</label>
                  <p className="text-base">{selectedContact.message}</p>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedInvestor && (
          <Dialog open={!!selectedInvestor} onOpenChange={() => setSelectedInvestor(null)}>
            <DialogContent className="max-w-md max-h-[70vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Investor/Mentor Application</DialogTitle>
                <DialogDescription>Full application details</DialogDescription>
              </DialogHeader>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="space-y-4"
              >
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="text-base font-medium">{selectedInvestor.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Type</label>
                  <p className="text-base capitalize">{selectedInvestor.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-base">{selectedInvestor.email}</p>
                </div>
                {selectedInvestor.phone && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                    <p className="text-base">{selectedInvestor.phone}</p>
                  </div>
                )}
                {selectedInvestor.companyName && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Company</label>
                    <p className="text-base">{selectedInvestor.companyName}</p>
                  </div>
                )}
                {selectedInvestor.expertise && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Expertise</label>
                    <p className="text-base">{selectedInvestor.expertise}</p>
                  </div>
                )}
                {selectedInvestor.message && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Message</label>
                    <p className="text-base">{selectedInvestor.message}</p>
                  </div>
                )}
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedSponsorship && (
          <Dialog open={!!selectedSponsorship} onOpenChange={() => setSelectedSponsorship(null)}>
            <DialogContent className="max-w-md max-h-[70vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Sponsorship Inquiry</DialogTitle>
                <DialogDescription>Full sponsorship details</DialogDescription>
              </DialogHeader>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="space-y-4"
              >
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Company Name</label>
                  <p className="text-base font-medium">{selectedSponsorship.companyName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Contact Person</label>
                  <p className="text-base">{selectedSponsorship.contactPersonName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-base">{selectedSponsorship.email}</p>
                </div>
                {selectedSponsorship.phone && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                    <p className="text-base">{selectedSponsorship.phone}</p>
                  </div>
                )}
                {selectedSponsorship.industry && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Industry</label>
                    <p className="text-base">{selectedSponsorship.industry}</p>
                  </div>
                )}
                {selectedSponsorship.sponsorshipLevel && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Sponsorship Level</label>
                    <p className="text-base">{selectedSponsorship.sponsorshipLevel}</p>
                  </div>
                )}
                {selectedSponsorship.message && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Message</label>
                    <p className="text-base">{selectedSponsorship.message}</p>
                  </div>
                )}
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedBulkReg && (
          <Dialog open={!!selectedBulkReg} onOpenChange={() => setSelectedBulkReg(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Bulk Registration Details</DialogTitle>
                <DialogDescription>Institution registration information</DialogDescription>
              </DialogHeader>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="space-y-4 max-h-[70vh] overflow-y-auto"
              >
                <div className="bg-primary/10 rounded-lg p-4 mb-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Registration ID</p>
                  <p className="text-xl font-bold text-primary font-mono">{selectedBulkReg.registrationId}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Institution Name</label>
                    <p className="text-base font-medium">{selectedBulkReg.institutionName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Ticket Category</label>
                    <Badge className={selectedBulkReg.ticketCategory === "premium" 
                      ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" 
                      : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    }>
                      {selectedBulkReg.ticketCategory}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Mentor Name</label>
                    <p className="text-base">{selectedBulkReg.mentorName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Mentor Email</label>
                    <p className="text-base">{selectedBulkReg.mentorEmail}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Mentor Phone</label>
                    <p className="text-base">{selectedBulkReg.mentorPhone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Number of Students</label>
                    <p className="text-base font-semibold">{selectedBulkReg.numberOfStudents}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Total Amount</label>
                    <p className="text-lg font-bold text-primary">{selectedBulkReg.totalAmount}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Payment Status</label>
                    <Badge className={selectedBulkReg.paymentStatus === "confirmed" 
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                      : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                    }>
                      {selectedBulkReg.paymentStatus}
                    </Badge>
                  </div>
                </div>

                <div className="flex justify-center pt-4 gap-3">
                  <Button
                    onClick={() => window.open(`/bulk-ticket/${selectedBulkReg.registrationId}`, '_blank')}
                    data-testid="button-view-all-bulk-tickets-dialog"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    View All Student Tickets
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedBulkReg(null)}
                  >
                    Close
                  </Button>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
