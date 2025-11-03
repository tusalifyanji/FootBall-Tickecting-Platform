import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, CreditCard, Smartphone, ChevronRight, Check } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

export default function Checkout() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [momoProvider, setMomoProvider] = useState("mtn");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Mock order data
  const orderSummary = {
    tickets: 2,
    zone: "Covered Stand",
    match: "Zambia vs Malawi",
    subtotal: 240.0,
    bookingFee: 12.0,
    vat: 40.32,
    total: 292.32,
  };

  const handlePayment = () => {
    if (!termsAccepted) {
      return;
    }

    // Navigate to processing page
    navigate("/payment/processing");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Secure Checkout</h1>
            <p className="text-muted-foreground">Complete your purchase safely and securely</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Payment Method */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="momo" className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        Mobile Money
                      </TabsTrigger>
                      <TabsTrigger value="card" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Card
                      </TabsTrigger>
                    </TabsList>

                    {/* Mobile Money */}
                    <TabsContent value="momo" className="space-y-4 mt-6">
                      <div>
                        <Label className="mb-3 block">Select Provider</Label>
                        <RadioGroup value={momoProvider} onValueChange={setMomoProvider}>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer hover:border-primary transition-colors">
                              <RadioGroupItem value="mtn" id="mtn" />
                              <label htmlFor="mtn" className="flex-1 cursor-pointer">
                                <div className="font-semibold">MTN Mobile Money</div>
                                <div className="text-sm text-muted-foreground">Pay with your MTN MoMo wallet</div>
                              </label>
                            </div>
                            <div className="flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer hover:border-primary transition-colors">
                              <RadioGroupItem value="airtel" id="airtel" />
                              <label htmlFor="airtel" className="flex-1 cursor-pointer">
                                <div className="font-semibold">Airtel Money</div>
                                <div className="text-sm text-muted-foreground">Pay with your Airtel Money wallet</div>
                              </label>
                            </div>
                            <div className="flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer hover:border-primary transition-colors">
                              <RadioGroupItem value="zamtel" id="zamtel" />
                              <label htmlFor="zamtel" className="flex-1 cursor-pointer">
                                <div className="font-semibold">Zamtel Money</div>
                                <div className="text-sm text-muted-foreground">Pay with your Zamtel Money wallet</div>
                              </label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="momo-number">Mobile Number</Label>
                        <div className="flex">
                          <div className="flex items-center justify-center px-3 border border-r-0 rounded-l-md bg-muted text-sm font-medium">
                            +260
                          </div>
                          <Input
                            id="momo-number"
                            type="tel"
                            placeholder="97 123 4567"
                            className="rounded-l-none"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          You'll receive a payment prompt on your phone
                        </p>
                      </div>
                    </TabsContent>

                    {/* Card Payment */}
                    <TabsContent value="card" className="space-y-4 mt-6">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input
                          id="card-number"
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            type="text"
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            type="text"
                            placeholder="123"
                            maxLength={3}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardholder">Cardholder Name</Label>
                        <Input
                          id="cardholder"
                          type="text"
                          placeholder="John Banda"
                        />
                      </div>

                      <div className="bg-info/10 border border-info/20 rounded-lg p-4 text-sm">
                        <p className="font-semibold mb-1">3D Secure Verification</p>
                        <p className="text-muted-foreground">
                          You may be redirected to your bank for additional verification
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <Separator className="my-6" />

                  {/* Terms */}
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={termsAccepted}
                      onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                    />
                    <label htmlFor="terms" className="text-sm leading-relaxed">
                      I agree to the FAZ E-Tickets Terms and Conditions and Privacy Policy. I understand that tickets are non-refundable after purchase.
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-bold text-lg mb-1">{orderSummary.match}</p>
                    <p className="text-sm text-muted-foreground">
                      {orderSummary.tickets} × {orderSummary.zone}
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold">ZMW {orderSummary.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Booking Fee</span>
                      <span className="font-semibold">ZMW {orderSummary.bookingFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">VAT</span>
                      <span className="font-semibold">ZMW {orderSummary.vat.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">ZMW {orderSummary.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full"
                    onClick={handlePayment}
                    disabled={!termsAccepted}
                  >
                    Pay Now
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>

                  {/* Security Badges */}
                  <div className="pt-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="h-4 w-4 text-success" />
                      <span>Secure 256-bit SSL encryption</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="h-4 w-4 text-success" />
                      <span>PCI DSS compliant payments</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="h-4 w-4 text-success" />
                      <span>Money-back guarantee</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
