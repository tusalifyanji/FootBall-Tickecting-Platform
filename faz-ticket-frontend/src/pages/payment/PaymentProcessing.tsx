import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentProcessing() {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate payment processing - redirect to success after 3 seconds
    const timer = setTimeout(() => {
      navigate("/payment/success");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/30 px-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 pb-6 text-center space-y-6">
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Processing Payment</h1>
            <p className="text-muted-foreground">
              Please wait while we process your payment...
            </p>
          </div>

          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 text-sm">
            <p className="font-semibold text-warning-foreground mb-1">
              ⚠️ Don't close this window
            </p>
            <p className="text-muted-foreground">
              Your payment is being processed. This may take a few moments.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
