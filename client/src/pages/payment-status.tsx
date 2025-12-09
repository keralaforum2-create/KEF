import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function PaymentStatus() {
  const { merchantTransactionId } = useParams<{ merchantTransactionId: string }>();
  const [, setLocation] = useLocation();
  const [status, setStatus] = useState<"loading" | "success" | "failed" | "pending">("loading");
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!merchantTransactionId) return;

    let isMounted = true;
    let timeoutId: NodeJS.Timeout | null = null;

    const checkStatus = async () => {
      if (!isMounted) return;
      
      try {
        const response = await fetch(`/api/phonepe/status/${merchantTransactionId}`);
        const data = await response.json();

        if (!isMounted) return;

        if (data.success && data.status === "SUCCESS") {
          setStatus("success");
          setRegistrationId(data.registrationId);
        } else if (data.status === "PENDING") {
          setStatus("pending");
          timeoutId = setTimeout(checkStatus, 3000);
        } else {
          setStatus("failed");
          setError(data.error || "Payment failed");
        }
      } catch (err) {
        if (!isMounted) return;
        setStatus("failed");
        setError("Failed to verify payment status");
      }
    };

    checkStatus();

    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [merchantTransactionId]);

  const viewTicket = () => {
    if (registrationId) {
      setLocation(`/ticket/${registrationId}`);
    }
  };

  const tryAgain = () => {
    setLocation("/participate");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Payment Status</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          {status === "loading" && (
            <>
              <Loader2 className="h-16 w-16 animate-spin text-primary" />
              <p className="text-muted-foreground">Verifying your payment...</p>
            </>
          )}

          {status === "pending" && (
            <>
              <Loader2 className="h-16 w-16 animate-spin text-primary" />
              <p className="text-muted-foreground">Payment is being processed...</p>
              <p className="text-sm text-muted-foreground">Please wait, this may take a moment.</p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="h-16 w-16 text-green-500" />
              <div className="text-center">
                <h3 className="text-xl font-semibold text-green-600">Payment Successful!</h3>
                <p className="text-muted-foreground mt-2">
                  Your registration is complete. A confirmation email has been sent.
                </p>
              </div>
              <Button onClick={viewTicket} className="w-full" data-testid="button-view-ticket">
                View Your Ticket
              </Button>
            </>
          )}

          {status === "failed" && (
            <>
              <XCircle className="h-16 w-16 text-red-500" />
              <div className="text-center">
                <h3 className="text-xl font-semibold text-red-600">Payment Failed</h3>
                <p className="text-muted-foreground mt-2">
                  {error || "Something went wrong with your payment."}
                </p>
              </div>
              <Button onClick={tryAgain} className="w-full" data-testid="button-try-again">
                Try Again
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
