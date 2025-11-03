// src/pages/match/Matches.tsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Grid2X2,
  List,
  Search as SearchIcon,
  MapPin,
  Shield,
} from "lucide-react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MatchCard } from "@/components/matches/MatchCard";

type Fixture = {
  id: string;
  homeTeam: string;
  awayTeam: string;
  competition: string;
  date: string; // e.g., "Sun, 15 Dec 2024"
  time: string; // "16:00"
  stadium: string;
  city: string;
  priceFrom: number;
  status?: "limited" | "available" | "sold-out"; // must match MatchCardProps
};

// Sample data (replace with API later)
const SAMPLE_FIXTURES: Fixture[] = [
  {
    id: "1",
    homeTeam: "Zambia",
    awayTeam: "Ghana",
    competition: "AFCON Qualifiers",
    date: "Sun, 15 Dec 2024",
    time: "16:00",
    stadium: "National Heroes Stadium",
    city: "Lusaka",
    priceFrom: 120,
    status: "available",
  },
  {
    id: "2",
    homeTeam: "ZESCO United",
    awayTeam: "Zanaco",
    competition: "FAZ Super League",
    date: "Sat, 21 Dec 2024",
    time: "15:00",
    stadium: "Levy Mwanawasa Stadium",
    city: "Ndola",
    priceFrom: 80,
    status: "limited",
  },
  {
    id: "3",
    homeTeam: "Zambia",
    awayTeam: "Tanzania",
    competition: "Friendly Matches",
    date: "Sat, 04 Jan 2025",
    time: "15:00",
    stadium: "Nkoloma Stadium",
    city: "Lusaka",
    priceFrom: 90,
    status: "available",
  },
  {
    id: "4",
    homeTeam: "Nkana FC",
    awayTeam: "Power Dynamos",
    competition: "FAZ Super League",
    date: "Wed, 08 Jan 2025",
    time: "18:00",
    stadium: "Arthur Davies Stadium",
    city: "Kitwe",
    priceFrom: 70,
    status: "available",
  },
  {
    id: "5",
    homeTeam: "Zambia",
    awayTeam: "Malawi",
    competition: "World Cup Qualifiers",
    date: "Sat, 25 Jan 2025",
    time: "15:00",
    stadium: "National Heroes Stadium",
    city: "Lusaka",
    priceFrom: 150,
    status: "sold-out",
  },
];

const ALL_COMPETITIONS = [
  "AFCON Qualifiers",
  "World Cup Qualifiers",
  "FAZ Super League",
  "Friendly Matches",
] as const;

export default function Matches() {
  const fixtures = SAMPLE_FIXTURES;

  // Filter options from data
  const venueOptions = useMemo(
    () => Array.from(new Set(fixtures.map((f) => f.stadium))),
    [fixtures]
  );

  // State
  const [q, setQ] = useState("");
  const [venue, setVenue] = useState<string>("All Venues");
  const [competition, setCompetition] = useState<string>("All Competitions");
  const [sortBy, setSortBy] = useState<"date" | "price" | "venue">("date");
  const [view, setView] = useState<"grid" | "list">("grid"); // DEFAULT: grid

  // Helpers
  const parseDisplayDate = (d: string) =>
    new Date(d.replace(/(\d{1,2}),/g, "$1,"));

  // Filter + sort (date range removed)
  const filteredSorted = useMemo(() => {
    const lowerQ = q.trim().toLowerCase();

    let out = fixtures.filter((f) => {
      if (venue !== "All Venues" && f.stadium !== venue) return false;
      if (competition !== "All Competitions" && f.competition !== competition)
        return false;

      if (lowerQ) {
        const hay = `${f.homeTeam} ${f.awayTeam} ${f.city} ${f.stadium} ${f.competition}`.toLowerCase();
        if (!hay.includes(lowerQ)) return false;
      }

      return true;
    });

    out.sort((a, b) => {
      if (sortBy === "price") return a.priceFrom - b.priceFrom;
      if (sortBy === "venue") return a.stadium.localeCompare(b.stadium);
      return (
        parseDisplayDate(a.date).getTime() - parseDisplayDate(b.date).getTime()
      );
    });

    return out;
  }, [fixtures, venue, competition, q, sortBy]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Heading */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
              <div>
                <h1 className="text-3xl font-bold">All Matches</h1>
                <p className="text-muted-foreground">
                  Browse, filter and pick your seats for upcoming fixtures.
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {filteredSorted.length}
                </span>{" "}
                of {fixtures.length}
              </div>
            </div>
          </div>
        </section>

        {/* Filter Bar (Date Range removed) */}
        <section className="pb-4">
          <div className="container mx-auto px-4">
            <div className="rounded-2xl border bg-white shadow-sm p-4 md:p-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                {/* Venue */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium">Venue</label>
                  <select
                    className="h-10 rounded-md border bg-white px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                  >
                    <option>All Venues</option>
                    {venueOptions.map((v) => (
                      <option key={v}>{v}</option>
                    ))}
                  </select>
                </div>

                {/* Competition */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium">Competition</label>
                  <select
                    className="h-10 rounded-md border bg-white px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                    value={competition}
                    onChange={(e) => setCompetition(e.target.value)}
                  >
                    <option>All Competitions</option>
                    {ALL_COMPETITIONS.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Search */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium">Search</label>
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search matches..."
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="my-4 h-px w-full bg-muted" />

              {/* Sort + View */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground">Sort by:</span>
                  <button
                    className={`border-b-2 pb-1 ${
                      sortBy === "date"
                        ? "border-emerald-600 text-emerald-700"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setSortBy("date")}
                  >
                    Date
                  </button>
                  <button
                    className={`border-b-2 pb-1 ${
                      sortBy === "price"
                        ? "border-emerald-600 text-emerald-700"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setSortBy("price")}
                  >
                    Price
                  </button>
                  <button
                    className={`border-b-2 pb-1 ${
                      sortBy === "venue"
                        ? "border-emerald-600 text-emerald-700"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setSortBy("venue")}
                  >
                    Venue
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={view === "grid" ? "secondary" : "outline"}
                    className="h-9 w-9 p-0"
                    onClick={() => setView("grid")}
                    title="Grid view"
                  >
                    <Grid2X2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={view === "list" ? "secondary" : "outline"}
                    className="h-9 w-9 p-0"
                    onClick={() => setView("list")}
                    title="List view"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            {filteredSorted.length === 0 ? (
              <div className="rounded-xl border bg-white p-8 text-center text-muted-foreground">
                No matches found. Adjust filters and try again.
              </div>
            ) : view === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSorted.map((f) => (
                  <MatchCard key={f.id} {...f} />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredSorted.map((f) => (
                  <div
                    key={f.id}
                    className="rounded-xl border bg-white p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4"
                  >
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground">
                        {f.competition}
                      </div>
                      <div className="text-lg md:text-xl font-semibold">
                        {f.homeTeam} vs {f.awayTeam}
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {f.date} • {f.time}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {f.stadium}, {f.city}
                        </span>
                        {f.status === "limited" && (
                          <span className="inline-flex items-center gap-1 text-amber-700">
                            <Shield className="h-4 w-4" />
                            Limited
                          </span>
                        )}
                        {f.status === "sold-out" && (
                          <span className="inline-flex items-center gap-1 text-red-700">
                            <Shield className="h-4 w-4" />
                            Sold&nbsp;Out
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">From</div>
                        <div className="text-xl font-bold">K{f.priceFrom}</div>
                      </div>
                      <Button asChild className="min-w-[140px]">
                        <Link to={`/match/${f.id}`}>Choose Seats</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
