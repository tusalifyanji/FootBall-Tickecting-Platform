import { useNavigate, useLocation } from "react-router-dom";
import {
  CheckCircle2,
  Download,
  Ticket,
  ChevronRight,
  MapPin,
  ShieldCheck,
  Timer,
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const { items, total, orderId } = location.state || {
    items: [],
    total: 0,
    orderId: "FAZ-240033",
  };

  const primaryMatch = items.length > 0 ? items[0] : null;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="print:hidden">
        <Header />
      </div>

      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center">
        {/* HEADER */}
        <div className="text-center mb-10 animate-in fade-in slide-in-from-top-4 duration-500 print:hidden">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#0e633d] mb-4 shadow-lg shadow-[#0e633d]/20">
            <CheckCircle2 className="h-7 w-7 text-white" />
          </div>

          <h1 className="text-2xl font-black tracking-tight text-[#0e633d]">
            Payment Successful
          </h1>

          <div className="mt-4 inline-block px-4 py-1 bg-white rounded-full border border-[#0e633d]/15 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#0e633d]">
              Order <span className="text-[#ef7d00]">#{orderId}</span> Confirmed
            </p>
          </div>
        </div>

        {/* TICKET */}
        <div className="w-full max-w-[700px] print:transform-none">
          <Card className="relative overflow-hidden rounded-3xl bg-white shadow-[0_30px_70px_rgba(14,99,61,0.15)] flex flex-col md:flex-row min-h-[220px] print:shadow-none print:rounded-none">
            {/* LEFT */}
            <div className="flex-[2.5] p-8 md:p-10 flex flex-col justify-between relative">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#ef7d00] mb-3">
                  <ShieldCheck size={14} /> Official Match Pass
                </div>

                <h2 className="text-3xl font-black text-[#0e633d] leading-none">
                  {primaryMatch?.matchName || "ZAMBIA VS MALAWI"}
                </h2>

                <div className="flex flex-wrap items-center gap-4 mt-3">
                  <div className="flex items-center gap-1.5 text-[13px] text-[#0e633d]/80">
                    <MapPin size={14} className="text-[#ef7d00]" />
                    {primaryMatch?.stadium || "Levy Mwanawasa Stadium, Ndola"}
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0e633d] bg-[#0e633d]/10 px-2 py-1 rounded-full">
                    <Timer size={14} /> 15:00 CAT
                  </div>
                </div>
              </div>

              {/* SEATING */}
              <div className="flex gap-10 mt-6 pt-6 border-t border-[#0e633d]/10">
                <div className="grid grid-cols-3 gap-8 w-full">
                  <div>
                    <p className="text-[9px] font-bold uppercase text-[#0e633d]/50 mb-1">
                      Wing / Gate
                    </p>
                    <p className="text-sm font-bold text-[#0e633d] uppercase">
                      {items[0]?.zone || "VIP Central"}{" "}
                      <span className="text-[#ef7d00]">
                        {items[0]?.gate || "1"}
                      </span>
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase text-[#0e633d]/50 mb-1">
                      Row
                    </p>
                    <p className="text-sm font-bold text-[#0e633d]">
                      {items[0]?.row || "1"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase text-[#0e633d]/50 mb-1">
                      Seat(s)
                    </p>
                    <p className="text-sm font-bold text-[#0e633d]">
                      {items[0]?.seats?.join(", ") || "11, 12"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* QR STUB */}
            <div className="flex-1 bg-[#0e633d]/5 border-l border-dashed border-[#0e633d]/20 p-8 flex flex-col items-center justify-center text-center print:bg-white print:border-l">
              <div className="bg-white p-2 rounded-2xl border border-[#0e633d]/15 mb-4">
                <QRCodeCanvas
                  value={orderId}
                  size={90}
                  level="H"
                  fgColor="#0e633d"
                />
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-mono text-[#0e633d]/60">
                  #{orderId}
                </p>
                <p className="text-2xl font-black text-[#0e633d]">
                  ZMW {total.toFixed(2)}
                </p>
                <p className="text-[8px] font-bold uppercase tracking-widest text-[#ef7d00] mt-1">
                  Scan at Gate
                </p>
              </div>
            </div>
          </Card>

          {/* ACTIONS */}
          <div className="grid grid-cols-2 gap-4 mt-8 print:hidden">
            <Button
              className="bg-[#0e633d] hover:bg-[#0a4a2e] text-white font-bold h-12 rounded-2xl shadow-lg shadow-[#0e633d]/20 text-xs uppercase"
              onClick={() => navigate("/account/tickets")}
            >
              <Ticket className="mr-2 h-4 w-4" /> View Tickets
            </Button>

            <Button
              variant="outline"
              className="h-12 rounded-2xl font-bold border-[#ef7d00]/40 text-[#ef7d00] hover:bg-[#ef7d00]/5 text-xs uppercase"
              onClick={() => window.print()}
            >
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
          </div>

          <button
            onClick={() => navigate("/")}
            className="w-full text-center mt-8 text-[10px] font-bold uppercase tracking-[0.25em] text-[#0e633d]/60 hover:text-[#ef7d00] transition-colors flex items-center justify-center gap-1 print:hidden"
          >
            Return to Home <ChevronRight size={12} />
          </button>
        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
