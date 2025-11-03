import { useState } from "react";
import { Download, QrCode, Calendar, MapPin, Clock } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function MyTickets() {
  const [activeTab, setActiveTab] = useState("upcoming");

  // Mock tickets data
  const upcomingTickets = [
    {
      id: "TKT-001",
      match: "Zambia vs Malawi",
      competition: "World Cup Qualifier",
      date: "Sat, 18 Oct 2025",
      time: "15:00",
      stadium: "National Heroes Stadium",
      city: "Lusaka",
      zone: "Covered Stand",
      section: "B",
      row: "12",
      seats: ["15", "16"],
      quantity: 2,
      total: 292.32,
      orderDate: "12 Oct 2025",
    },
    {
      id: "TKT-002",
      match: "ZESCO United vs Zanaco",
      competition: "Super League",
      date: "Sun, 26 Oct 2025",
      time: "14:00",
      stadium: "Levy Mwanawasa Stadium",
      city: "Ndola",
      zone: "VIP Stand",
      section: "A",
      row: "5",
      seats: ["8"],
      quantity: 1,
      total: 180.0,
      orderDate: "15 Oct 2025",
    },
  ];

  const pastTickets = [
    {
      id: "TKT-000",
      match: "Zambia vs Kenya",
      competition: "Friendly",
      date: "Sat, 5 Oct 2025",
      time: "18:00",
      stadium: "National Heroes Stadium",
      city: "Lusaka",
      zone: "General Stand",
      section: "C",
      row: "20",
      seats: ["10"],
      quantity: 1,
      total: 95.0,
      orderDate: "1 Oct 2025",
      attended: true,
    },
  ];

  const TicketCard = ({ ticket, isPast = false }: any) => (
    <Card className="group hover:shadow-md transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          {/* Ticket Details */}
          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold mb-1">{ticket.match}</h3>
                <Badge variant="secondary" className="mb-3">
                  {ticket.competition}
                </Badge>
              </div>
              {isPast && ticket.attended && (
                <Badge variant="success">Attended</Badge>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{ticket.date}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{ticket.time}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{ticket.stadium}, {ticket.city}</span>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Zone</p>
                <p className="font-semibold">{ticket.zone}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Section</p>
                <p className="font-semibold">{ticket.section}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Row</p>
                <p className="font-semibold">{ticket.row}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Seats</p>
                <p className="font-semibold">{ticket.seats.join(", ")}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Ticket ID</p>
                <p className="font-mono text-sm font-semibold">{ticket.id}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground mb-1">Total Paid</p>
                <p className="text-lg font-bold text-primary">ZMW {ticket.total.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          {!isPast && (
            <div className="flex md:flex-col gap-2 min-w-[200px]">
              <Button variant="hero" className="flex-1 md:w-full">
                <QrCode className="mr-2 h-4 w-4" />
                View QR Code
              </Button>
              <Button variant="outline" className="flex-1 md:w-full">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          )}
          {isPast && (
            <div className="flex md:flex-col gap-2 min-w-[200px]">
              <Button variant="outline" className="flex-1 md:w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Receipt
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Tickets</h1>
            <p className="text-muted-foreground">
              View and manage all your football match tickets
            </p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming" className="flex-1">
                Upcoming ({upcomingTickets.length})
              </TabsTrigger>
              <TabsTrigger value="past" className="flex-1">
                Past ({pastTickets.length})
              </TabsTrigger>
            </TabsList>

            {/* Upcoming Tickets */}
            <TabsContent value="upcoming" className="space-y-4">
              {upcomingTickets.length > 0 ? (
                upcomingTickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <div className="mb-4">
                      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                        <QrCode className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No Upcoming Tickets</h3>
                    <p className="text-muted-foreground mb-6">
                      You don't have any upcoming match tickets yet
                    </p>
                    <Button variant="hero" onClick={() => window.location.href = "/matches"}>
                      Browse Matches
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Past Tickets */}
            <TabsContent value="past" className="space-y-4">
              {pastTickets.length > 0 ? (
                pastTickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} isPast />
                ))
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <div className="mb-4">
                      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                        <QrCode className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No Past Tickets</h3>
                    <p className="text-muted-foreground">
                      Your past tickets will appear here
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          {/* Info Box */}
          <Card className="mt-8 bg-info/10 border-info/20">
            <CardContent className="pt-6 pb-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                Important Information
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1 ml-7">
                <li>• Each QR code is single-use and will be invalidated after gate entry</li>
                <li>• Bring a valid ID matching the ticket holder's name</li>
                <li>• Gates open 2 hours before kick-off</li>
                <li>• Screenshots of QR codes are accepted if clear and unaltered</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
