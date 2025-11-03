import { useNavigate } from "react-router-dom";
import { CheckCircle, Download, Calendar, Ticket, ChevronRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  const orderDetails = {
    orderId: "FAZ-2025-001234",
    match: "Zambia vs Malawi",
    date: "Sat, 25 Jan 2025 • 15:00",
    stadium: "National Heroes Stadium, Lusaka",
    zone: "Covered Stand",
    tickets: 2,
    total: 292.32,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/20 mb-4 animate-fade-in">
              <CheckCircle className="h-12 w-12 text-success" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-lg text-muted-foreground">
              Your tickets have been confirmed and sent to your email
            </p>
          </div>

          {/* Order Summary Card */}
          <Card className="mb-6 shadow-lg">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Order ID</span>
                  <span className="font-mono font-semibold">{orderDetails.orderId}</span>
                </div>

                <Separator />

                <div>
                  <h3 className="font-bold text-lg mb-2">{orderDetails.match}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{orderDetails.date}</p>
                  <p className="text-sm text-muted-foreground">{orderDetails.stadium}</p>
                </div>

                <Separator />

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Seating Zone</span>
                  <span className="font-semibold">{orderDetails.zone}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Number of Tickets</span>
                  <span className="font-semibold">{orderDetails.tickets}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total Paid</span>
                  <span className="text-success">ZMW {orderDetails.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3 mb-8">
            <Button variant="hero" size="lg" className="w-full" onClick={() => navigate("/account/tickets")}>
              <Ticket className="mr-2 h-5 w-5" />
              View My Tickets
            </Button>
            <Button variant="outline" size="lg" className="w-full">
              <Download className="mr-2 h-5 w-5" />
              Download Tickets (PDF)
            </Button>
            <Button variant="outline" size="lg" className="w-full">
              <Calendar className="mr-2 h-5 w-5" />
              Add to Calendar
            </Button>
          </div>

          {/* Next Steps */}
          <Card className="bg-secondary">
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">What's Next?</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                  <span>
                    Check your email for ticket confirmation and QR codes
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                  <span>
                    Save your tickets to your phone or print them out
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                  <span>
                    Arrive early at the stadium - gates open 2 hours before kickoff
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                  <span>
                    Show your QR code at the gate for quick entry
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Continue Shopping */}
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">Want to buy tickets for another match?</p>
            <Button variant="outline" size="lg" onClick={() => navigate("/")}>
              Browse More Matches
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
