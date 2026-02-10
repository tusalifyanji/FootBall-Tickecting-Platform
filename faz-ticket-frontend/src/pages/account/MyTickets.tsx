import { useState } from "react";
import { Download, QrCode, Calendar, MapPin, Clock } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Define TypeScript type for a ticket
type Ticket = {
  id: string;
  match: string;
  competition: string;
  date: string;
  time: string;
  stadium: string;
  city: string;
  zone: string;
  section: string;
  row: string;
  seats: string[];
  quantity: number;
  total: number;
  orderDate: string;
  attended?: boolean; // optional because not all tickets have it
};

// Props for TicketCard component
type TicketCardProps = {
  ticket: Ticket;
  isPast?: boolean;
};

export default function MyTickets() {
  const [activeTab, setActiveTab] = useState("upcoming");

  

  // Mock tickets data
  const upcomingTickets: Ticket[] = [
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

  const pastTickets: Ticket[] = [
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

  // TicketCard component with proper types
  const TicketCard = ({ ticket, isPast = false }: TicketCardProps) => (
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

  // ... rest of your MyTickets component stays the same


return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* rest of JSX */}
      <Footer />
    </div>
  );
}

