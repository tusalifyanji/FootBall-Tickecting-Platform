import { Ticket, Trophy, ShoppingCart, TrendingUp, Users, Banknote, Activity, Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/admin/StatCard";
import { stats, orders, matches, dailySales } from "@/data/mockData";
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Cell
} from "recharts";

// Sporty Zambian Palette
const statusColor: Record<string, string> = {
  confirmed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  refunded: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  cancelled: "bg-slate-500/10 text-slate-500 border-slate-500/20",
};

export default function Dashboard() {
  // 1. FILTER: Ensure only unique buyers appear in the feed
  const uniqueRecentOrders = orders
    .filter((order, index, self) => 
      index === self.findIndex((o) => o.buyerName === order.buyerName)
    )
    .slice(0, 8); // Grab top 8 unique buyers

  // Data for the Match Performance Overview
  const matchPerformance = matches.map((m) => ({
    name: `${m.homeTeam} vs ${m.awayTeam}`,
    revenue: Math.floor(Math.random() * 50000) + 20000,
    hotness: Math.floor(Math.random() * 40) + 60, 
  })).slice(0, 4);

  return (
    <div className="space-y-8 p-2 font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-3xl font-black tracking-tighter uppercase italic text-[#0e633d]">
            Match-Day <span className="text-[#ef7d00]">Command Center</span>
          </h2>
          <p className="text-slate-500 font-medium">Real-time ticketing analytics & overview.</p>
        </div>
      </div>

      {/* Sporty Stat Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative overflow-hidden group">
          <StatCard 
            title="Total Revenue" 
            value={`K${stats.totalRevenue.toLocaleString()}`} 
            subtitle="+12% VS LAST MATCH" 
            icon={Banknote} 
            className="border-none bg-gradient-to-br from-[#0e633d] to-[#063b24] text-white shadow-xl"
          />
          <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform text-white">
            <TrendingUp size={120} />
          </div>
        </div>
        
        <StatCard title="Tickets Sold" value={stats.totalTickets.toLocaleString()} subtitle="92% SEATING CAPACITY" icon={Ticket} className="border-l-4 border-l-[#ef7d00] shadow-md bg-white" />
        <StatCard title="Active Matches" value={stats.activeMatches} subtitle="3 LIVE NOW" icon={Trophy} className="border-l-4 border-l-[#FFCC00] shadow-md bg-white" />
        <StatCard title="Total Orders" value={stats.totalOrders} subtitle="ACROSS ALL CHANNELS" icon={ShoppingCart} className="border-l-4 border-l-black shadow-md bg-white" />
      </div>

      {/* Main Row: Revenue Velocity & Hype Tracker */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue Velocity Chart */}
        <Card className="lg:col-span-2 border-none shadow-xl rounded-3xl overflow-hidden bg-white">
          <CardHeader className="bg-slate-50/50 border-b">
            <div className="flex items-center gap-2">
              <Activity className="text-[#0e633d]" size={18} />
              <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-600">Revenue Velocity</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="h-80 pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailySales}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0e633d" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0e633d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 'bold' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  formatter={(v: number) => [`K${v.toLocaleString()}`, "Revenue"]}
                />
                <Area type="monotone" dataKey="revenue" stroke="#0e633d" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Match Tracker */}
        <Card className="border-none shadow-xl rounded-3xl bg-white overflow-hidden">
          <CardHeader className="bg-slate-900 text-white">
            <div className="flex items-center gap-2">
               <Flame className="text-[#ef7d00] animate-pulse" size={18} />
               <CardTitle className="text-sm font-black uppercase tracking-widest">Match Tracker</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
             <div className="divide-y divide-slate-100">
                {matchPerformance.map((match, i) => (
                  <div key={i} className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[11px] font-black text-slate-700 uppercase leading-tight w-2/3">{match.name}</span>
                      <span className="text-[10px] font-mono font-bold text-[#0e633d]">K{match.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-[#ef7d00] to-[#FFCC00]" 
                          style={{ width: `${match.hotness}%` }} 
                        />
                      </div>
                      <span className="text-[9px] font-black text-slate-400">{match.hotness}%</span>
                    </div>
                  </div>
                ))}
             </div>
             <div className="p-4 bg-slate-50 text-center">
                <button className="text-[10px] font-black uppercase text-[#0e633d] hover:underline">View All Match Performance</button>
             </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row: Table & Sales Bar Chart */}
      <div className="grid gap-6 lg:grid-cols-2">
         {/* Sales Intensity */}
         <Card className="border-none shadow-lg rounded-3xl bg-white overflow-hidden">
          <CardHeader className="border-b border-slate-50">
            <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-600">Volume Intensity</CardTitle>
          </CardHeader>
          <CardContent className="h-72 pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailySales}>
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="tickets" radius={[4, 4, 0, 0]} barSize={25}>
                   {dailySales.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#0e633d" : "#ef7d00"} />
                   ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Live Order Feed - NOW UNIQUE */}
        <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white">
          <CardHeader className="bg-[#0e633d] text-white flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-black uppercase tracking-widest italic">Live Order Feed</CardTitle>
            <Users className="h-4 w-4 text-[#FFCC00]" />
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="text-[10px] font-black uppercase">Buyer</TableHead>
                  <TableHead className="text-[10px] font-black uppercase">Match</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-right">Amount</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {uniqueRecentOrders.map((order) => {
                  const match = matches.find(m => m.id === order.matchId);
                  return (
                    <TableRow key={order.id} className="hover:bg-slate-50/80 transition-colors">
                      <TableCell className="font-bold text-slate-700 text-xs">{order.buyerName}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-[#0e633d] uppercase truncate w-32">
                            {match ? `${match.homeTeam} vs ${match.awayTeam}` : 'International Friendly'}
                          </span>
                          <span className="text-[9px] text-slate-400 font-bold uppercase">{order.zone}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-slate-600 text-xs">
                        K{order.amount.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={`text-[9px] font-black uppercase ${statusColor[order.status]}`}>
                          {order.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}