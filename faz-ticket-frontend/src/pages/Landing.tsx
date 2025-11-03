// src/pages/Landing.tsx
import { useState } from "react";
import { Shield, CreditCard, Ticket, ChevronRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-stadium.jpg";

// NEW: import the extracted component
import UpcomingMatches from "@/pages/LandingComponents/upcomingmatches";

export default function Landing() {
  const [/* searchQuery */, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section (Screenshot-style) */}
        <section
          className="relative min-h-[560px] md:min-h-[640px] overflow-hidden"
          aria-label="Ticketing hero"
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url(${heroImage})` }}
          />

          {/* Green overlay for readability */}
          <div className="absolute inset-0 bg-[#157347]/90 md:bg-[#157347]/85" />

          {/* Subtle vignette so text pops */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6 items-center pt-16 md:pt-20 pb-10">
              {/* Left: copy + CTAs */}
              <div className="text-primary-foreground">
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                  Experience Football <br className="hidden md:block" />
                  Like Never Before
                </h1>

                <p className="mt-6 text-lg md:text-xl text-primary-foreground/90 max-w-xl">
                  Secure your seat for Zambia&apos;s biggest matches with instant QR tickets.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button size="lg" className="h-12 px-6 font-semibold">
                    Buy Tickets Now
                  </Button>
                  <Button size="lg" variant="secondary" className="h-12 px-6 font-semibold">
                    View Matches
                  </Button>
                </div>
              </div>

              {/* Right: featured match card */}
              <div className="relative">
                <div className="mx-auto w-[92%] md:w-[520px] rotate-3 md:rotate-2">
                  <div className="rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden">
                    <div className="flex items-center gap-2 bg-emerald-50 px-5 py-2 text-emerald-700 font-medium">
                      <span className="inline-block h-2 w-2 rounded-full bg-emerald-600" />
                      Featured Match
                    </div>

                    <div className="p-6 md:p-7">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                        Zambia <span className="text-emerald-600">vs</span> Ghana
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">National Heroes Stadium</p>

                      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Date</div>
                          <div className="font-medium text-gray-900">Dec 15, 2024</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Kick-off</div>
                          <div className="font-medium text-gray-900">16:00 CAT</div>
                        </div>
                        <div className="text-right">
                          <div className="text-gray-500">From</div>
                          <div className="font-semibold text-emerald-600">K120</div>
                        </div>
                      </div>

                      <Button className="mt-6 w-full h-11 text-base font-semibold">
                        Choose Seats
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom ribbon: payment methods */}
            <div className="mt-2 md:mt-6">
              <div className="rounded-t-xl bg-[#b86f34] text-white/95">
                <div className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-2 text-sm md:text-base">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-white/90" />
                    Mobile Money
                  </span>
                  <span>MTN</span>
                  <span>Airtel</span>
                  <span>Zamtel</span>
                  <span className="ml-auto inline-flex items-center gap-2">
                    <span className="rounded bg-white/90 px-1.5 py-0.5 text-[#1a1a1a] text-xs md:text-sm">
                      VISA
                    </span>
                    <span className="rounded bg-white/90 px-1.5 py-0.5 text-[#1a1a1a] text-xs md:text-sm">
                      💳
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges (no cards, bigger orange logos) */}
        <section className="py-8 bg-secondary">
          <div className="container mx-auto px-4">
            {/* Mobile: 2 columns; last spans both and centers.  MD+: 3 columns */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
              {/* 100% Secure */}
              <div className="flex flex-col items-center">
                <Shield className="h-16 w-16 md:h-20 md:w-20 text-orange-500 mb-3" />
                <h3 className="font-bold mb-1">100% Secure</h3>
                <p className="text-sm text-muted-foreground">
                  Verified &amp; encrypted transactions
                </p>
              </div>

              {/* Easy Payments */}
              <div className="flex flex-col items-center">
                <CreditCard className="h-16 w-16 md:h-20 md:w-20 text-orange-500 mb-3" />
                <h3 className="font-bold mb-1">Easy Payments</h3>
                <p className="text-sm text-muted-foreground">
                  MoMo, Airtel, Zamtel &amp; Cards
                </p>
              </div>

              {/* Instant Tickets — on mobile: span 2 cols and center */}
              <div className="flex flex-col items-center col-span-2 md:col-span-1 justify-self-center">
                <Ticket className="h-16 w-16 md:h-20 md:w-20 text-orange-500 mb-3" />
                <h3 className="font-bold mb-1">Instant Tickets</h3>
                <p className="text-sm text-muted-foreground">
                  Digital tickets on your phone
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Matches (imported component) */}
        <UpcomingMatches />

        {/* How It Works */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How to Buy Tickets</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get your tickets in three simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="h-20 w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">Register & Sign In</h3>
                <p className="text-muted-foreground">
                  Create your account and complete your profile for fast checkout
                </p>
              </div>
              <div className="text-center">
                <div className="h-20 w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">Choose Your Seats</h3>
                <p className="text-muted-foreground">
                  Select your preferred seats from our interactive stadium map
                </p>
              </div>
              <div className="text-center">
                <div className="h-20 w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">Pay & Get Tickets</h3>
                <p className="text-muted-foreground">
                  Secure payment via Mobile Money or Card. Instant ticket delivery
                </p>
              </div>
            </div>

            <div className="text-center mt-10">
              <Button variant="hero" size="lg">
                Start Buying Tickets
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Safety & Anti-Fraud */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-success/10 to-primary/5 rounded-2xl p-8 border-2 border-success/20">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-success flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-success-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Your Safety is Our Priority</h3>
                  <p className="text-muted-foreground mb-4">
                    All tickets are verified and secured with unique QR codes. Our anti-fraud system
                    ensures every ticket is genuine and can only be scanned once at the gate.
                  </p>
                  <Button variant="outline">
                    Learn About Our Security
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
