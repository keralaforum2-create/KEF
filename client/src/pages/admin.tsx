import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
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
import { Users, Mail, Phone, Building2, MessageSquare, UserCheck, Eye } from "lucide-react";
import type { Registration, Contact } from "@shared/schema";

export default function Admin() {
  const [, setLocation] = useLocation();
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  
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

  return (
    <div className="min-h-screen pt-20">
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-2" data-testid="text-admin-title">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              View all registrations and contact form submissions for Kerala Startup Fest 2026.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold" data-testid="text-registration-count">
                      {registrations?.length || 0}
                    </p>
                    <p className="text-sm text-muted-foreground">Registrations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold" data-testid="text-contact-count">
                      {contacts?.length || 0}
                    </p>
                    <p className="text-sm text-muted-foreground">Contact Messages</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {registrations?.filter(r => r.participantType === "team").length || 0}
                    </p>
                    <p className="text-sm text-muted-foreground">Team Registrations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {registrations?.filter(r => r.participantType === "institution").length || 0}
                    </p>
                    <p className="text-sm text-muted-foreground">Institution Groups</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="registrations" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="registrations" data-testid="tab-registrations">
                Registrations ({registrations?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="contacts" data-testid="tab-contacts">
                Contact Messages ({contacts?.length || 0})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="registrations">
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
                          {registrations.map((reg) => (
                            <TableRow key={reg.id} data-testid={`row-registration-${reg.id}`}>
                              <TableCell className="font-medium">{reg.fullName}</TableCell>
                              <TableCell>
                                <Badge className={getParticipantTypeBadge(reg.participantType)}>
                                  {reg.participantType}
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
                            </TableRow>
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
            </TabsContent>

            <TabsContent value="contacts">
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
                          {contacts.map((contact) => (
                            <TableRow key={contact.id} data-testid={`row-contact-${contact.id}`}>
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
                            </TableRow>
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
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Dialog open={!!selectedReg} onOpenChange={() => setSelectedReg(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Registration Details</DialogTitle>
            <DialogDescription>Full information for this registration</DialogDescription>
          </DialogHeader>
          {selectedReg && (
            <div className="space-y-4">
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
              <div>
                <label className="text-sm font-medium text-muted-foreground">Participation Type</label>
                <p className="text-base capitalize">{selectedReg.participantType}</p>
              </div>
              {selectedReg.institution && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Institution</label>
                  <p className="text-base">{selectedReg.institution}</p>
                </div>
              )}
              {selectedReg.interests && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Interests</label>
                  <p className="text-base">{selectedReg.interests}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Message Details</DialogTitle>
            <DialogDescription>Full information for this message</DialogDescription>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
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
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
