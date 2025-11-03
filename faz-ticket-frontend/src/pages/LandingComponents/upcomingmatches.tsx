// src/pages/LandingComponents/upcomingmatches.tsx
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { MatchCard } from "@/components/matches/MatchCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Fixture = {
  id: string;
  homeTeam: string;
  awayTeam: string;
  competition: string;
  date: string;
  time: string;
  stadium: string;
  city: string;
  priceFrom: number;
  category: "National Team" | "Super League" | "Cup" | "Friendly";
  status?: "limited";
};

export default function UpcomingMatches() {
  // Sample fixture data (kept inside the component)
  const fixtures: Fixture[] = [
    {
      id: "1",
      homeTeam: "Zambia",
      awayTeam: "Malawi",
      competition: "World Cup Qualifier",
      date: "Sat, 25 Jan 2025",
      time: "15:00",
      stadium: "National Heroes Stadium",
      city: "Lusaka",
      priceFrom: 80,
      category: "National Team",
    },
    {
      id: "2",
      homeTeam: "ZESCO United",
      awayTeam: "Zanaco",
      competition: "Super League",
      date: "Sun, 26 Jan 2025",
      time: "15:00",
      stadium: "Levy Mwanawasa Stadium",
      city: "Ndola",
      priceFrom: 60,
      status: "limited",
      category: "Super League",
    },
    {
      id: "3",
      homeTeam: "Nkana FC",
      awayTeam: "Power Dynamos",
      competition: "Super League",
      date: "Wed, 29 Jan 2025",
      time: "18:00",
      stadium: "Nkana Stadium",
      city: "Kitwe",
      priceFrom: 55,
      category: "Super League",
    },
    {
      id: "4",
      homeTeam: "Zambia",
      awayTeam: "Tanzania",
      competition: "Friendly",
      date: "Sat, 1 Feb 2025",
      time: "15:00",
      stadium: "Nkoloma Stadium",
      city: "Lusaka",
      priceFrom: 70,
      category: "National Team",
    },
  ];

  const [activeCategory, setActiveCategory] = useState<
    "all" | "National Team" | "Super League" | "Cup" | "Friendly"
  >("all");

  const filteredFixtures =
    activeCategory === "all"
      ? fixtures
      : fixtures.filter((f) => f.category === activeCategory);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Upcoming Matches</h2>
            <p className="text-muted-foreground">Don&apos;t miss out on the action</p>
          </div>
          <Button variant="outline" size="lg">
            View All
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-5">
            <TabsTrigger value="all" onClick={() => setActiveCategory("all")}>
              All
            </TabsTrigger>
            <TabsTrigger value="national" onClick={() => setActiveCategory("National Team")}>
              National
            </TabsTrigger>
            <TabsTrigger value="league" onClick={() => setActiveCategory("Super League")}>
              League
            </TabsTrigger>
            <TabsTrigger value="cup" onClick={() => setActiveCategory("Cup")}>
              Cup
            </TabsTrigger>
            <TabsTrigger value="friendly" onClick={() => setActiveCategory("Friendly")}>
              Friendly
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFixtures.map((fixture) => (
            <MatchCard key={fixture.id} {...fixture} />
          ))}
        </div>
      </div>
    </section>
  );
}
