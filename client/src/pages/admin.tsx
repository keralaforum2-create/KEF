import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
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
import { Users, Mail, Phone, Building2, MessageSquare, UserCheck, Eye, Briefcase, Handshake } from "lucide-react";
import type { Registration, Contact, InvestorMentor, Sponsorship } from "@shared/schema";
import { ScrollFadeUp, StaggerContainer, StaggerItem, CardWave } from "@/lib/animations";

export default function Admin() {
  const [, setLocation] = useLocation();
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedInvestor, setSelectedInvestor] = useState<InvestorMentor | null>(null);
  const [selectedSponsorship, setSelectedSponsorship] = useState<Sponsorship | null>(null);
  
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      setLocation("/admin-login");
    }
  }, [setLocation]);

  const { data: registrations, isLoading: loadingRegistrations } = useQuery<Registration[]>({
    queryKey: ["/api/registrations"],
  });

  const { data: contacts, isLoading: loadingContacts } = useQuery<Contact[]>({
    queryKey: ["/api/contacts"],
  });

  const { data: investorMentors, isLoading: loadingInvestors } = useQuery<InvestorMentor[]>({
    queryKey: ["/api/investor-mentors"],
  });

  const { data: sponsorships, isLoading: loadingSponsorships } = useQuery<Sponsorship[]>({
    queryKey: ["/api/sponsorships"],
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

  const statCards = [
    { icon: UserCheck, label: "Registrations", value: registrations?.length || 0, testId: "text-registration-count" },
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
                  Registrations ({registrations?.length || 0})
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
                      ) : registrations && registrations.length > 0 ? (
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
                              {registrations.map((reg, index) => (
                                <motion.tr
                                  key={reg.id}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.03 }}
                                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                  data-testid={`row-registration-${reg.id}`}
                                >
                                  <TableCell className="font-medium">{reg.fullName}</TableCell>
                                  <TableCell>
                                    <Badge className={getRegistrationTypeBadge(reg.registrationType)}>
                                      {reg.registrationType === "expert-session" ? "Expert Session" : "Contest"}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => setSelectedReg(reg)}
                                      data-testid={`button-view-registration-${reg.id}`}
                                    >
                                      <Eye className="w-4 h-4 mr-1" />
                                      View
                                    </Button>
                                  </TableCell>
                                </motion.tr>
                              ))}
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
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => setSelectedContact(contact)}
                                      data-testid={`button-view-contact-${contact.id}`}
                                    >
                                      <Eye className="w-4 h-4 mr-1" />
                                      View
                                    </Button>
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
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => setSelectedInvestor(investor)}
                                      data-testid={`button-view-investor-${investor.id}`}
                                    >
                                      <Eye className="w-4 h-4 mr-1" />
                                      View
                                    </Button>
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
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => setSelectedSponsorship(sponsorship)}
                                      data-testid={`button-view-sponsorship-${sponsorship.id}`}
                                    >
                                      <Eye className="w-4 h-4 mr-1" />
                                      View
                                    </Button>
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
            </Tabs>
          </ScrollFadeUp>
        </div>
      </section>

      <AnimatePresence>
        {selectedReg && (
          <Dialog open={!!selectedReg} onOpenChange={() => setSelectedReg(null)}>
            <DialogContent className="max-w-md">
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
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <p className="text-base font-medium">{selectedReg.fullName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-base">{selectedReg.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p className="text-base">{selectedReg.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Age</label>
                  <p className="text-base">{selectedReg.age}</p>
                </div>
                {selectedReg.institution && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Institution</label>
                    <p className="text-base">{selectedReg.institution}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Registration For</label>
                  <p className="text-base capitalize">{selectedReg.registrationType === "expert-session" ? "Expert Session" : "Contest"}</p>
                </div>
                {selectedReg.contestName && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Contest</label>
                    <p className="text-base">{selectedReg.contestName}</p>
                  </div>
                )}
                {selectedReg.paymentScreenshot && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Payment Screenshot</label>
                    <img 
                      src={selectedReg.paymentScreenshot} 
                      alt="Payment Screenshot" 
                      className="w-full rounded-lg border border-border mt-2 max-h-64 object-cover"
                      data-testid="img-payment-screenshot-admin"
                    />
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
    </div>
  );
}
