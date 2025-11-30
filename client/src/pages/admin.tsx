import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, Mail, Phone, Building2, MessageSquare, UserCheck } from "lucide-react";
import type { Registration, Contact } from "@shared/schema";

export default function Admin() {
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
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Age</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Institution</TableHead>
                            <TableHead>Interests</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {registrations.map((reg) => (
                            <TableRow key={reg.id} data-testid={`row-registration-${reg.id}`}>
                              <TableCell className="font-medium">{reg.fullName}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Mail className="w-3 h-3 text-muted-foreground" />
                                  {reg.email}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Phone className="w-3 h-3 text-muted-foreground" />
                                  {reg.phone}
                                </div>
                              </TableCell>
                              <TableCell>{reg.age}</TableCell>
                              <TableCell>
                                <Badge className={getParticipantTypeBadge(reg.participantType)}>
                                  {reg.participantType}
                                </Badge>
                              </TableCell>
                              <TableCell>{reg.institution || "-"}</TableCell>
                              <TableCell className="max-w-[200px] truncate">
                                {reg.interests || "-"}
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
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Message</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {contacts.map((contact) => (
                            <TableRow key={contact.id} data-testid={`row-contact-${contact.id}`}>
                              <TableCell className="font-medium">{contact.name}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Mail className="w-3 h-3 text-muted-foreground" />
                                  {contact.email}
                                </div>
                              </TableCell>
                              <TableCell>
                                {contact.phone ? (
                                  <div className="flex items-center gap-1">
                                    <Phone className="w-3 h-3 text-muted-foreground" />
                                    {contact.phone}
                                  </div>
                                ) : "-"}
                              </TableCell>
                              <TableCell>
                                <Badge className={getUserTypeBadge(contact.userType)}>
                                  {contact.userType}
                                </Badge>
                              </TableCell>
                              <TableCell className="max-w-[300px]">
                                <p className="line-clamp-2">{contact.message}</p>
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
    </div>
  );
}
