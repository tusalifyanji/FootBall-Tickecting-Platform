import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle, Sparkles, Mail, Phone, MessageCircle, ShieldCheck, CreditCard, Ticket, Clock, User, Send, } from "lucide-react";

/* ---------- DATA ---------- */

const faqCategories = [
  {
    category: "Buying Tickets",
    icon: Ticket,
    faqs: [
      {
        question: "How do I purchase tickets?",
        answer:
          "Browse available matches, select your seats, add them to your cart, and proceed to checkout. You'll need to sign in or create an account to complete payment.",
      },
      {
        question: "Can I buy tickets for multiple matches?",
        answer:
          "Yes. You can add tickets from different matches to your cart and complete everything in one transaction.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept MTN MoMo, Airtel Money, and Zamtel Money. Payments are processed securely.",
      },
      {
        question: "Is there a ticket purchase limit?",
        answer:
          "Each customer may purchase up to 6 tickets per match to ensure fair access for all fans.",
      },
    ],
  },
  {
    category: "Account & Security",
    icon: ShieldCheck,
    faqs: [
      {
        question: "Do I need an account?",
        answer:
          "Yes. An account is required to secure your tickets and allow access anytime from any device.",
      },
      {
        question: "How do I verify my email?",
        answer:
          "After registration, we send a verification code to your email. Enter it to activate your account.",
      },
      {
        question: "I forgot my password",
        answer:
          "Use the 'Forgot Password' option on the sign-in page to reset your credentials.",
      },
      {
        question: "Is my data secure?",
        answer:
          "We use encrypted connections and secure authentication to protect your information at all times.",
      },
    ],
  },
  {
    category: "Payments & Refunds",
    icon: CreditCard,
    faqs: [
      {
        question: "How long do payments take?",
        answer:
          "Most payments are instant. Mobile money may take up to 5 minutes to confirm.",
      },
      {
        question: "Can I get a refund?",
        answer:
          "Refunds are available up to 48 hours before kickoff. After that, tickets are non-refundable unless a match is canceled.",
      },
      {
        question: "What if a match is canceled?",
        answer:
          "Canceled matches are automatically refunded within 5–7 business days.",
      }
    ],
  },
  {
    category: "Ticket Access",
    icon: Clock,
    faqs: [
      {
        question: "How do I receive my ticket?",
        answer:
          "Tickets appear instantly in your account after payment under 'My Tickets'.",
      },
      {
        question: "Can I print my ticket?",
        answer:
          "Yes. You can download a PDF or show the QR code directly from your phone.",
      },
      {
        question: "Can I transfer a ticket?",
        answer:
          "Transfers are allowed up to 24 hours before the match. Contact support for help.",
      },
    ],
  },
];

export default function Help() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  //  FILTER LOGIC
  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.faqs.length > 0);

  return (
    <div className="min-h-screen flex flex-col font-inter bg-gradient-to-b from-white to-[#f6faf8]">
      <Header />

      <main className="flex-1">
     {/* HERO - FAZ ENHANCED */}
<section className="relative overflow-hidden py-28 text-white bg-gradient-to-br from-[#0e633d] via-[#0c5535] to-[#083c26]">

  {/* Stadium Light Effect */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_60%)]" />

  {/* Orange Energy Glow */}
  <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#ef7d00] rounded-full blur-[160px] opacity-20" />

  {/* Subtle Texture */}
  <div
    className="absolute inset-0 opacity-[0.05]"
    style={{
      backgroundImage:
        "radial-gradient(circle, white 1px, transparent 1px)",
      backgroundSize: "30px 30px",
    }}
  />

  <div className="container mx-auto px-4 text-center relative z-10">

    {/* Icon Badge */}
    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 shadow-lg">
      <HelpCircle className="h-10 w-10 text-[#ef7d00]" />
    </div>

    {/* Heading */}
    <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tight mb-6">
      Help & <span className="text-[#ef7d00]">Support</span>
    </h1>

    {/* Subtext */}
    <p className="text-white/85 max-w-2xl mx-auto mb-10 text-lg md:text-xl leading-relaxed">
      Everything you need before match day — tickets, payments,
      security, and seamless stadium access.
    </p>

            <div className="max-w-2xl mx-auto relative">
              <Input
                type="search"
                placeholder="Search help topics…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-14 pl-12 bg-white text-slate-800 shadow-xl rounded-xl border-none"
              />
              <HelpCircle className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto space-y-10">
            {filteredCategories.length === 0 && searchTerm && (
              <div className="text-center text-slate-500 text-lg">
                No help topics found for "{searchTerm}"
              </div>
            )}

            {(searchTerm ? filteredCategories : faqCategories).map((category, idx) => (
              <Card key={idx} className="border-0 shadow-xl rounded-2xl overflow-hidden">
                <CardHeader className="bg-slate-50/50">
                  <CardTitle className="flex items-center gap-4 text-[#0e633d]">
                    <category.icon className="h-7 w-7 text-[#ef7d00]" />
                    <span className="font-bold text-xl uppercase tracking-tight">{category.category}</span>
                    <Badge className="ml-auto bg-[#ef7d00] text-white hover:bg-[#ef7d00]">
                      {category.faqs.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <Accordion type="single" collapsible>
                    {category.faqs.map((faq, i) => (
                      <AccordionItem key={i} value={`faq-${idx}-${i}`} className="border-slate-100">
                        <AccordionTrigger className="text-left font-semibold text-slate-700 hover:text-[#0e633d]">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-600 leading-relaxed italic">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

{/* CTA SECTION - CLEAN WHITE FAZ */}
<section className="relative py-28 bg-white text-center overflow-hidden">

  {/* Soft Green Glow */}
  <div className="absolute -top-20 left-1/3 w-80 h-80 bg-[#0e633d] rounded-full blur-[120px] opacity-10" />

  {/* Soft Orange Glow */}
  <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#ef7d00] rounded-full blur-[120px] opacity-10" />

  <div className="relative z-10 max-w-3xl mx-auto px-4">

    <h1 className="text-1xl md:text-4xl font-black italic uppercase tracking-tight text-[#0e633d] mb-6">
      Still need <span className="text-[#ef7d00]">help?</span>
    </h1>

    <p className="text-slate-600 text-lg md:text-xl mb-12">
      Our support team is ready to assist before, during, and after match day.
    </p>

    <div className="flex flex-col sm:flex-row gap-6 justify-center">

      {/* CONTACT SUPPORT WITH MODAL */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="px-12 py-8 text-lg rounded-2xl bg-[#0e633d] hover:bg-[#0c5634] text-white font-black uppercase italic tracking-widest shadow-lg transition-all duration-300 active:scale-95">
            Contact Support
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] border-none p-0 overflow-hidden shadow-2xl bg-white">

          {/* Modal Header */}
          <div className="relative h-32 bg-[#0e633d] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#ef7d00,transparent_70%)]" />

            <div className="relative z-10 text-center">
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-full w-fit mx-auto mb-2 border border-white/20">
                <Sparkles className="h-6 w-6 text-[#ef7d00]" />
              </div>

              <DialogTitle className="text-3xl font-black text-white uppercase italic tracking-tighter">
                Get in <span className="text-[#ef7d00]">Touch</span>
              </DialogTitle>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8 bg-white">
            <form className="space-y-4">

              {/* Full Name */}
              <div className="space-y-1">
                <Label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-widest">
                  Full Name
                </Label>
                <div className="relative group">
                  <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-[#0e633d] transition-colors" />
                  <Input
                    placeholder="Enter your full name"
                    className="h-12 pl-12 rounded-xl border-slate-200 bg-slate-50 font-bold focus-visible:ring-[#ef7d00] transition-all"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <Label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-widest">
                  Phone Number (optional if no email address)
                </Label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-[#0e633d] transition-colors" />
                  <Input
                    type="tel"
                    placeholder="+260 970 000 000"
                    className="h-12 pl-12 rounded-xl border-slate-200 bg-slate-50 font-bold focus-visible:ring-[#ef7d00] transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <Label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-widest">
                  Email Address
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-[#0e633d] transition-colors" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="h-12 pl-12 rounded-xl border-slate-200 bg-slate-50 font-bold focus-visible:ring-[#ef7d00] transition-all"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <Label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-widest">
                  Your Message
                </Label>
                <Textarea
                  placeholder="How can we help you today?"
                  className="min-h-[100px] rounded-xl border-slate-200 bg-slate-50 font-bold p-4 resize-none focus-visible:ring-[#ef7d00] transition-all"
                />
              </div>

              {/* Submit */}
              <Button className="w-full h-14 bg-[#0e633d] hover:bg-[#0a4d2f] text-white rounded-xl font-black uppercase italic tracking-widest shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-2">
                <Send className="h-4 w-4" />
                Send Message
              </Button>

            </form>
          </div>

        </DialogContent>
      </Dialog>

          </div>
        </div>
    </section>
      </main>
      <Footer />
    </div>
  );
}
