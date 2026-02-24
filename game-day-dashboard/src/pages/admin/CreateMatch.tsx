import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface WingInput {
  name: string;
  gate: string;
  price: string;
  totalSeats: string;
}

const categories = ["National", "League", "Cup", "Friendly", "World Cup Qualifier"];

const stadiumOptions = [
  { name: "Heroes Stadium", capacity: "60,000" },
  { name: "Levy Mwanawasa Stadium", capacity: "49,800" },
  { name: "Nkana Stadium", capacity: "10,000" },
  { name: "Nkoloma Stadium", capacity: "5,000" },
  { name: "Woodlands Stadium", capacity: "10,000" },
  { name: "Arthur Davies Stadium", capacity: "15,000" },
];

const teamOptions = [
  "Zambia (Chipolopolo)", "ZESCO United", "Power Dynamos", "Nkana FC", 
  "Red Arrows", "Green Buffaloes", "Zanaco FC", "Kabwe Warriors", "Forest Rangers"
];

export default function CreateMatch() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Team States
  const [homeTeam, setHomeTeam] = useState("");
  const [isCustomHome, setIsCustomHome] = useState(false);
  const [awayTeam, setAwayTeam] = useState("");
  const [isCustomAway, setIsCustomAway] = useState(false);

  // Venue & Match States
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [customVenue, setCustomVenue] = useState("");
  const [isCustomVenue, setIsCustomVenue] = useState(false);
  
  const [saleDeadlineDate, setSaleDeadlineDate] = useState("");
  const [saleDeadlineTime, setSaleDeadlineTime] = useState("15:00");
  const [maxTickets, setMaxTickets] = useState("4");
  const [isFeatured, setIsFeatured] = useState(false);

  const [wings, setWings] = useState<WingInput[]>([
    { name: "VIP Grandstand", gate: "Gate 1", price: "500", totalSeats: "0" },
    { name: "West Wing", gate: "Gate 12", price: "250", totalSeats: "0" },
    { name: "East Wing", gate: "Gate 6", price: "200", totalSeats: "0" },
    { name: "North Wing", gate: "Gate 9", price: "150", totalSeats: "0" },
    { name: "South Wing", gate: "Gate 3", price: "100", totalSeats: "0" },
  ]);

  useEffect(() => {
    if (venue && !isCustomVenue) {
      const selectedStadium = stadiumOptions.find((s) => s.name === venue);
      if (selectedStadium) {
        const totalCapacity = parseInt(selectedStadium.capacity.replace(/,/g, ""), 10);
        const seatPerWing = Math.floor(totalCapacity / wings.length);
        const updatedWings = wings.map((wing, index) => {
          if (index === wings.length - 1) {
            const sumOfOthers = seatPerWing * (wings.length - 1);
            return { ...wing, totalSeats: (totalCapacity - sumOfOthers).toString() };
          }
          return { ...wing, totalSeats: seatPerWing.toString() };
        });
        setWings(updatedWings);
      }
    }
  }, [venue, wings.length, isCustomVenue]);

  const updateWing = (i: number, field: keyof WingInput, value: string) => {
    const updated = [...wings];
    updated[i] = { ...updated[i], [field]: value };
    setWings(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Match Published", description: "FAZ Match is now live." });
    navigate("/admin/matches");
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 lg:p-10 font-sans text-slate-900">
      <header className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter leading-none text-[#0e633d]">
            Create <span className="text-[#ef7d00]">FAZ</span> Match
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest mt-2 text-[10px]">
            Admin Management Console • Matchday Logistics
          </p>
        </div>
        <Button 
          onClick={() => navigate("/admin/matches")}
          variant="outline"
          className="rounded-full px-8 h-12 font-black uppercase italic border-2 border-slate-200 hover:bg-[#ef7d00] hover:text-white transition-all"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Fixtures
        </Button>
      </header>

      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Match Details */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="bg-white border-none rounded-[2rem] shadow-xl shadow-slate-200/50 overflow-hidden">
            <CardHeader className="bg-[#0e633d] text-white py-6">
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#ef7d00]" /> Match Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-5">
              
              {/* Home Team Selection */}
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400">Home Team</Label>
                <Select onValueChange={(val) => {
                  if(val === "CUSTOM") { setIsCustomHome(true); setHomeTeam(""); }
                  else { setIsCustomHome(false); setHomeTeam(val); }
                }}>
                  <SelectTrigger className="h-12 rounded-xl border-slate-100 font-bold">
                    <SelectValue placeholder="Select Home Team" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamOptions.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    <SelectItem value="CUSTOM" className="text-[#0e633d] font-black">+ Other (Manual Entry)</SelectItem>
                  </SelectContent>
                </Select>
                {isCustomHome && (
                  <Input 
                    value={homeTeam} 
                    onChange={e => setHomeTeam(e.target.value)} 
                    className="h-11 rounded-xl border-[#ef7d00]/30 bg-orange-50/20 font-bold mt-2 animate-in fade-in slide-in-from-top-1" 
                    placeholder="Enter Team Name..." 
                  />
                )}
              </div>

              {/* Away Team Selection */}
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400">Away Team</Label>
                <Select onValueChange={(val) => {
                  if(val === "CUSTOM") { setIsCustomAway(true); setAwayTeam(""); }
                  else { setIsCustomAway(false); setAwayTeam(val); }
                }}>
                  <SelectTrigger className="h-12 rounded-xl border-slate-100 font-bold">
                    <SelectValue placeholder="Select Away Team" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamOptions.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    <SelectItem value="CUSTOM" className="text-[#0e633d] font-black">+ Other (Manual Entry)</SelectItem>
                  </SelectContent>
                </Select>
                {isCustomAway && (
                  <Input 
                    value={awayTeam} 
                    onChange={e => setAwayTeam(e.target.value)} 
                    className="h-11 rounded-xl border-[#ef7d00]/30 bg-orange-50/20 font-bold mt-2 animate-in fade-in slide-in-from-top-1" 
                    placeholder="Enter Team Name..." 
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400">Category</Label>
                <Select onValueChange={setCategory}>
                  <SelectTrigger className="h-12 rounded-xl border-slate-100 font-bold">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400">Match Date</Label>
                  <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="h-12 rounded-xl border-slate-100 font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400">Kick-off</Label>
                  <Input type="time" value={time} onChange={e => setTime(e.target.value)} className="h-12 rounded-xl border-slate-100 font-bold" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400">Venue</Label>
                <Select onValueChange={(val) => {
                  if (val === "CUSTOM") { setIsCustomVenue(true); setVenue(""); } 
                  else { setIsCustomVenue(false); setVenue(val); }
                }}>
                  <SelectTrigger className="h-12 rounded-xl border-slate-100 font-bold">
                    <SelectValue placeholder="Select Stadium" />
                  </SelectTrigger>
                  <SelectContent>
                    {stadiumOptions.map(s => (
                      <SelectItem key={s.name} value={s.name}>{s.name} ({s.capacity})</SelectItem>
                    ))}
                    <SelectItem value="CUSTOM" className="text-[#0e633d] font-black">+ Other (Manual Entry)</SelectItem>
                  </SelectContent>
                </Select>
                {isCustomVenue && (
                  <Input 
                    value={customVenue} 
                    onChange={e => setCustomVenue(e.target.value)} 
                    className="h-11 rounded-xl border-[#ef7d00]/30 bg-orange-50/20 font-bold mt-2 animate-in fade-in slide-in-from-top-1" 
                    placeholder="Enter Stadium Name..." 
                  />
                )}
              </div>

              <div className="pt-4 border-t border-slate-50">
                <Label className="text-[10px] font-black uppercase text-[#ef7d00] mb-3 block">Ticket Sales Window Closes</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input type="date" value={saleDeadlineDate} onChange={e => setSaleDeadlineDate(e.target.value)} className="h-12 rounded-xl border-slate-100 font-bold" />
                  <Input type="time" value={saleDeadlineTime} onChange={e => setSaleDeadlineTime(e.target.value)} className="h-12 rounded-xl border-slate-100 font-bold" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-none rounded-[2rem] shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <Label className="text-xs font-black uppercase tracking-widest text-[#0e633d]">Featured Match</Label>
              <Switch checked={isFeatured} onCheckedChange={setIsFeatured} className="data-[state=checked]:bg-[#ef7d00]" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400">Max Tickets Per Customer</Label>
              <Input type="number" value={maxTickets} onChange={e => setMaxTickets(e.target.value)} className="h-12 rounded-xl border-slate-100 font-bold" />
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: Wings */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="bg-white border-none rounded-[2rem] shadow-xl overflow-hidden">
             <CardHeader className="bg-[#0e633d] text-white py-6 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
                <Zap className="h-4 w-4 text-[#ef7d00]" /> Stadium Wing Allocation
              </CardTitle>
              <Button type="button" onClick={() => setWings([...wings, {name: "", gate: "", price: "", totalSeats: "0"}])} className="bg-white/10 hover:bg-white/20 text-white h-9 rounded-lg px-4 font-black uppercase text-[10px] transition-colors border border-white/20">
                Add Wing
              </Button>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-12 gap-4 mb-4 text-[10px] font-black uppercase text-slate-300 px-4">
                <div className="col-span-4">Wing Designation</div>
                <div className="col-span-2 text-center">Price (K)</div>
                <div className="col-span-3">Gate</div>
                <div className="col-span-3 text-right">Capacity</div>
              </div>
              <div className="space-y-3 max-h-[540px] overflow-y-auto pr-2 custom-scrollbar">
                {wings.map((w, i) => (
                  <div key={i} className="grid grid-cols-12 gap-3 items-center bg-slate-50/50 p-3 rounded-2xl border border-transparent hover:border-slate-200 transition-all">
                    <Input className="col-span-4 h-11 rounded-lg border-none bg-white font-bold text-sm" value={w.name} onChange={e => updateWing(i, 'name', e.target.value)} />
                    <Input className="col-span-2 h-11 rounded-lg border-none bg-white font-black text-[#0e633d] text-center" value={w.price} onChange={e => updateWing(i, 'price', e.target.value)} />
                    <Input className="col-span-3 h-11 rounded-lg border-none bg-white font-bold text-sm" value={w.gate} onChange={e => updateWing(i, 'gate', e.target.value)} />
                    <Input className="col-span-3 h-11 rounded-lg border-none bg-white font-bold text-right text-sm" value={w.totalSeats} onChange={e => updateWing(i, 'totalSeats', e.target.value)} />
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase">Allocation Progress</p>
                  <p className="text-2xl font-black text-[#0e633d]">
                    {wings.reduce((sum, w) => sum + parseInt(w.totalSeats || "0", 10), 0).toLocaleString()} 
                    <span className="text-slate-300 text-sm font-bold ml-2">/ {isCustomVenue ? "CUSTOM" : (venue ? stadiumOptions.find(s => s.name === venue)?.capacity : "---")}</span>
                  </p>
                </div>
                <Button type="submit" className="bg-[#0e633d] hover:bg-[#0a4d2f] text-white h-16 rounded-2xl px-14 font-black uppercase italic tracking-wider shadow-lg transition-all active:scale-95 text-lg">
                  Publish Match
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}