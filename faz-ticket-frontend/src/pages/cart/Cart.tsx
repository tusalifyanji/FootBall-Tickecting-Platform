import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2, Plus, Minus, Clock, ChevronRight, Tag } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Mock cart data - would be replaced with context/state management
const mockCartItems = [
  {
    id: "1",
    matchId: "1",
    homeTeam: "Zambia",
    awayTeam: "Malawi",
    date: "Sat, 25 Jan 2025",
    time: "15:00",
    stadium: "National Heroes Stadium",
    zone: "Covered Stand",
    quantity: 2,
    pricePerTicket: 120,
  },
];

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds

  // Timer countdown
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const updateQuantity = (itemId: string, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, Math.min(10, item.quantity + change)) }
          : item
      )
    );
  };

  const removeItem = (itemId: string) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.pricePerTicket * item.quantity, 0);
  const bookingFee = subtotal * 0.05;
  const vat = (subtotal + bookingFee) * 0.16;
  const total = subtotal + bookingFee + vat;

  const handleCheckout = () => {
    // TODO: Check if user is authenticated and profile is complete
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <ShoppingCart className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Browse matches and add tickets to get started!
            </p>
            <Button variant="hero" size="lg" onClick={() => navigate("/")}>
              Browse Matches
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">Review your tickets before checkout</p>
        </div>

        {/* Timer Warning */}
        {timeRemaining > 0 && (
          <div className={`mb-6 p-4 rounded-lg border-2 flex items-center gap-3 ${
            timeRemaining < 120 
              ? "bg-destructive/10 border-destructive/50" 
              : "bg-warning/10 border-warning/50"
          }`}>
            <Clock className={`h-5 w-5 ${timeRemaining < 120 ? "text-destructive" : "text-warning"} animate-timer-pulse`} />
            <div className="flex-1">
              <p className="font-semibold">
                {timeRemaining < 120 ? "Hurry! Seats expiring soon" : "Seats on hold"}
              </p>
              <p className="text-sm text-muted-foreground">
                Complete your purchase within {formatTime(timeRemaining)} to secure your tickets
              </p>
            </div>
            <span className={`text-2xl font-bold ${timeRemaining < 120 ? "text-destructive" : "text-warning"}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Match Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-lg mb-1">
                            {item.homeTeam} vs {item.awayTeam}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Clock className="h-4 w-4" />
                            <span>{item.date} • {item.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.stadium}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <Badge variant="secondary" className="mb-4">
                        {item.zone}
                      </Badge>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold">Quantity:</span>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, -1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-lg font-bold w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, 1)}
                              disabled={item.quantity >= 10}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            ZMW {item.pricePerTicket.toFixed(2)} each
                          </p>
                          <p className="text-xl font-bold text-primary">
                            ZMW {(item.pricePerTicket * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Promo Code */}
                <div>
                  <label className="text-sm font-semibold mb-2 block">Promo Code</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline">
                      <Tag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">ZMW {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Booking Fee (5%)</span>
                    <span className="font-semibold">ZMW {bookingFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">VAT (16%)</span>
                    <span className="font-semibold">ZMW {vat.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">ZMW {total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  variant="hero"
                  size="lg"
                  className="w-full"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </Button>

                <div className="text-xs text-muted-foreground text-center pt-4">
                  <p>Secure checkout powered by FAZ E-Tickets</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
