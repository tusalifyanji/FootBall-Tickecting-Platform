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

      {/* TICKET CONTAINER */}
<div className="w-full max-w-[700px] print:transform-none">
  <Card className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-[0_40px_80px_rgba(14,99,61,0.12)] flex flex-col md:flex-row min-h-[240px] border-none">
    
    {/* LEFT SECTION: CONTENT & HIGH-VISIBILITY STADIUM */}
    <div className="flex-[2.5] p-10 flex flex-col justify-between relative overflow-hidden">
      
      {/* BACKGROUND IMAGE LAYER - Increased Opacity & Saturation */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://res.cloudinary.com/dceqpo559/image/upload/v1770291402/levy_mwanawasa_stadium02_iachgn.jpg" 
          className="w-full h-full object-cover opacity-60 saturate-[1.4] brightness-95" 
          alt="Levy Mwanawasa Stadium"
        />
        {/* Adjusted Gradient: Solid white only under the main text, fading fast to show the stadium */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent" />
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#ef7d00] mb-4 drop-shadow-sm">
          <ShieldCheck size={16} strokeWidth={3} /> Official Match Pass
        </div>

        <h2 className="text-4xl font-black text-[#0e633d] leading-none tracking-tight mb-4 drop-shadow-md">
          {primaryMatch?.matchName || "ZAMBIA VS MALAWI"}
        </h2>

        <div className="flex flex-wrap items-center gap-5">
          <div className="flex items-center gap-2 text-[14px] font-bold text-[#0e633d] drop-shadow-sm">
            <MapPin size={16} className="text-[#ef7d00]" />
            {primaryMatch?.stadium || "Levy Mwanawasa Stadium, Ndola"}
          </div>

          <div className="flex items-center gap-2 text-[12px] font-black text-[#0e633d] bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/50 shadow-sm">
            <Timer size={16} className="text-[#ef7d00]" /> 15:00 CAT
          </div>
        </div>
      </div>

      {/* SEATING LAYER - Semi-transparent background for readability */}
      <div className="relative z-10 grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-[#0e633d]/20 bg-white/10 backdrop-blur-[2px] -mx-10 px-10">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#0e633d]/60 mb-1">Wing/Gate</p>
          <p className="text-lg font-black text-[#0e633d] leading-none">
            {items[0]?.zone || "NORTH WING"} <span className="text-[#ef7d00] ml-1">{items[0]?.gate || "9"}</span>
          </p>
        </div>

        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#0e633d]/60 mb-1">Row</p>
          <p className="text-lg font-black text-[#0e633d] leading-none">{items[0]?.row || "8"}</p>
        </div>

        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#0e633d]/60 mb-1">Seat(s)</p>
          <p className="text-lg font-black text-[#0e633d] leading-none">{items[0]?.seats?.join(", ") || "19, 20"}</p>
        </div>
      </div>
    </div>

    {/* RIGHT SECTION: QR STUB */}
<div className="flex-1 relative overflow-hidden border-l-2 border-dashed border-[#0e633d]/20 p-10 flex flex-col items-center justify-center text-center">

  {/* Soft Background Overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#0e633d]/5 via-white to-[#ef7d00]/5" />

  {/* Decorative Accent Rings */}
  <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#0e633d]/10 blur-3xl" />
  <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#ef7d00]/10 blur-3xl" />

  {/* QR Card */}
  <div className="relative z-10 bg-white p-5 rounded-[2.5rem] shadow-2xl shadow-[#0e633d]/15 border border-[#0e633d]/10 mb-6">
    <div className="p-2 rounded-[1.75rem] bg-gradient-to-br from-[#0e633d]/10 via-white to-[#ef7d00]/10">
      <QRCodeCanvas
        value={orderId}
        size={120}
        level="H"
        fgColor="#0e633d"
      />
    </div>
  </div>

  {/* Meta Info */}
  <div className="relative z-10 space-y-1">
    <p className="text-[11px] font-bold font-mono text-slate-400 uppercase tracking-widest">
      #{orderId.split("-")[1] || "551074"}
    </p>

    <p className="text-1xl font-black text-[#0e633d] tracking-tight leading-none">
      ZMW {total.toFixed(2)}
    </p>

    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ef7d00] mt-2">
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