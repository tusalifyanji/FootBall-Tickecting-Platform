import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Trophy, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const teams = [
  {
    id: 1,
    name: "Chipolopolo (National Team)",
    stadium: "Heroes National Stadium",
    city: "Lusaka",
    capacity: "60,000",
    founded: "1929",
    colors: "Green & White",
    achievements: "1x African Cup Winner (2012)",
    logo: "🇿🇲"
  },
  {
    id: 2,
    name: "Zesco United FC",
    stadium: "Levy Mwanawasa Stadium",
    city: "Ndola",
    capacity: "49,800",
    founded: "1974",
    colors: "Blue & White",
    achievements: "8x Super League Champions",
    logo: "⚡"
  },
  {
    id: 3,
    name: "Nkana FC",
    stadium: "Nkana Stadium",
    city: "Kitwe",
    capacity: "10,000",
    founded: "1935",
    colors: "Red & Black",
    achievements: "13x League Champions",
    logo: "🔴"
  },
  {
    id: 4,
    name: "Red Arrows FC",
    stadium: "Nkoloma Stadium",
    city: "Lusaka",
    capacity: "5,000",
    founded: "1965",
    colors: "Red & Green",
    achievements: "5x League Champions",
    logo: "🎯"
  },
  {
    id: 5,
    name: "Green Eagles FC",
    stadium: "Nkoloma Stadium",
    city: "Choma",
    capacity: "5,000",
    founded: "1986",
    colors: "Green & Yellow",
    achievements: "1x League Champions",
    logo: "🦅"
  },
  {
    id: 6,
    name: "Power Dynamos FC",
    stadium: "Arthur Davies Stadium",
    city: "Kitwe",
    capacity: "18,000",
    founded: "1971",
    colors: "Orange & Black",
    achievements: "6x League Champions",
    logo: "⚡"
  }
];

const stadiums = [
  {
    id: 1,
    name: "Heroes National Stadium",
    city: "Lusaka",
    capacity: "60,000",
    opened: "2014",
    surface: "Natural Grass",
    features: ["VIP Lounges", "Media Center", "Training Facilities", "Modern Lighting"],
    description: "Zambia's premier sports venue, hosting national team matches and major events."
  },
  {
    id: 2,
    name: "Levy Mwanawasa Stadium",
    city: "Ndola",
    capacity: "49,800",
    opened: "2012",
    surface: "Natural Grass",
    features: ["Olympic Standard Track", "VIP Boxes", "Conference Rooms"],
    description: "One of Africa's most modern stadiums, home to Zesco United FC."
  },
  {
    id: 3,
    name: "Nkana Stadium",
    city: "Kitwe",
    capacity: "10,000",
    opened: "1955",
    surface: "Natural Grass",
    features: ["Historic Venue", "Local Atmosphere", "Community Hub"],
    description: "Historic home of Nkana FC, one of Zambia's oldest football clubs."
  },
  {
    id: 4,
    name: "Nkoloma Stadium",
    city: "Lusaka",
    capacity: "5,000",
    opened: "2008",
    surface: "Natural Grass",
    features: ["Compact Design", "Great Acoustics", "Easy Access"],
    description: "Multi-purpose venue hosting various league matches."
  }
];

const Teams = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-accent py-16 px-4">
          <div className="container mx-auto text-center">
            <Trophy className="h-16 w-16 mx-auto mb-4 text-primary-foreground" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Teams & Stadiums
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Explore Zambian football teams and the iconic stadiums where legends are made
            </p>
          </div>
        </section>

        {/* Content Tabs */}
        <section className="container mx-auto px-4 py-12">
          <Tabs defaultValue="teams" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="teams">Teams</TabsTrigger>
              <TabsTrigger value="stadiums">Stadiums</TabsTrigger>
            </TabsList>

            {/* Teams Tab */}
            <TabsContent value="teams" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teams.map((team) => (
                  <Card key={team.id} className="hover:shadow-lg transition-shadow border-primary/20">
                    <CardContent className="p-6">
                      {/* Team Logo/Icon */}
                      <div className="text-6xl mb-4 text-center">{team.logo}</div>
                      
                      {/* Team Name */}
                      <h3 className="text-xl font-bold mb-2 text-center text-foreground">{team.name}</h3>
                      
                      {/* Colors Badge */}
                      <div className="flex justify-center mb-4">
                        <Badge variant="secondary" className="text-xs">
                          {team.colors}
                        </Badge>
                      </div>

                      {/* Team Details */}
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-foreground">{team.stadium}</p>
                            <p className="text-muted-foreground">{team.city}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary flex-shrink-0" />
                          <p className="text-muted-foreground">Capacity: {team.capacity}</p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                          <p className="text-muted-foreground">Founded: {team.founded}</p>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <Trophy className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <p className="text-muted-foreground">{team.achievements}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Stadiums Tab */}
            <TabsContent value="stadiums" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {stadiums.map((stadium) => (
                  <Card key={stadium.id} className="hover:shadow-lg transition-shadow border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-1 text-foreground">{stadium.name}</h3>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span className="text-sm">{stadium.city}</span>
                          </div>
                        </div>
                        <Badge variant="default" className="text-lg font-bold">
                          {stadium.capacity}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">{stadium.description}</p>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Opened</p>
                          <p className="font-medium text-foreground">{stadium.opened}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Surface</p>
                          <p className="font-medium text-foreground">{stadium.surface}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2 text-foreground">Features:</p>
                        <div className="flex flex-wrap gap-2">
                          {stadium.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* CTA Section */}
        <section className="bg-muted py-12 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Experience Live Football?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Book your tickets now and watch your favorite teams in action at these incredible stadiums
            </p>
            <a
              href="/matches"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
            >
              Browse Available Matches
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Teams;
