import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { stats, dailySales, matches, orders } from "@/data/mockData";
import {
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { 
  TrendingUp, 
  Ticket, 
  DollarSign, 
  Calendar, 
  ChevronRight, 
  Activity,
  Award
} from "lucide-react";

const COLORS = [
  "#1E3A8A",
  "#DC2626",
  "#059669",
  "#F59E0B",
  "#7C3AED",
];

export default function Analytics() {
  const [startDate, setStartDate] = useState("2026-01-11");
  const [endDate, setEndDate] = useState("2026-02-09");

  const filteredSales = dailySales.filter((d) => d.date >= startDate && d.date <= endDate);
  const totalRevInRange = filteredSales.reduce((s, d) => s + d.revenue, 0);
  const totalTicketsInRange = filteredSales.reduce((s, d) => s + d.tickets, 0);

  const matchComparison = matches.map((m) => {
    const matchOrders = orders.filter((o) => o.matchId === m.id && o.status === "confirmed");
    return {
      name: `${m.homeTeam.split(" ")[0]} vs ${m.awayTeam.split(" ")[0]}`,
      revenue: matchOrders.reduce((s, o) => s + o.amount, 0),
      tickets: matchOrders.reduce((s, o) => s + o.seats, 0),
    };
  }).sort((a, b) => b.revenue - a.revenue);

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-16 font-sans text-slate-900">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-[#0e633d]">
            Sales <span className="text-[#ef7d00]">Analytics</span>
          </h2>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2 flex items-center gap-2">
            <Activity className="h-4 w-4 text-[#ef7d00]" />
            Real-Time Ticketing Intelligence
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
          <div className="space-y-1">
            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
              <Calendar className="h-3 w-3" /> From
            </Label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="h-10 w-[170px] font-bold border-none bg-slate-50 rounded-lg"
            />
          </div>

          <div className="h-10 w-px bg-slate-200 mt-4" />

          <div className="space-y-1">
            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
              <Calendar className="h-3 w-3" /> To
            </Label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="h-10 w-[170px] font-bold border-none bg-slate-50 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 sm:grid-cols-3">

        <Card className="border-none shadow-2xl bg-gradient-to-br from-[#0e633d] to-[#0a4d2f] text-white rounded-[2rem] overflow-hidden">
          <CardContent className="pt-10 pb-8 px-8">
            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-200">
              Total Revenue
            </div>
            <div className="text-4xl font-black mt-2 tracking-tighter">
              ZMW {totalRevInRange.toLocaleString()}
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-black uppercase tracking-wide bg-white/20 w-fit px-3 py-1 rounded-full">
              <TrendingUp className="h-4 w-4" /> +12% From Last Period
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-white rounded-[2rem] border-b-8 border-[#ef7d00]">
          <CardContent className="pt-10 pb-8 px-8">
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Tickets Issued
            </div>
            <div className="text-4xl font-black mt-2 tracking-tighter text-slate-900">
              {totalTicketsInRange.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-white rounded-[2rem] border-b-8 border-slate-900">
          <CardContent className="pt-10 pb-8 px-8">
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Daily Average
            </div>
            <div className="text-2xl font-black mt-2 tracking-tighter text-slate-900">
              ZMW {filteredSales.length
                ? Math.round(totalRevInRange / filteredSales.length).toLocaleString()
                : 0}
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Revenue Trend */}
      <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white">
        <CardHeader className="px-8 pt-10">
          <CardTitle className="text-lg font-black uppercase tracking-widest text-slate-800 flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-[#0e633d]" />
            Revenue Performance Trend
          </CardTitle>
        </CardHeader>

        <CardContent className="h-[400px] pt-6 px-8 pb-10">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredSales}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#0e633d"
                strokeWidth={4}
                dot={{ r: 5, fill: "#ef7d00", strokeWidth: 2, stroke: "#fff" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bottom Section */}
      <div className="grid gap-10 lg:grid-cols-2">

        {/* Top Matches */}
        <Card className="border-none shadow-xl rounded-[2.5rem] bg-white overflow-hidden">
          <CardHeader className="bg-slate-900 py-6 px-10">
            <CardTitle className="text-lg font-black uppercase tracking-widest text-[#ef7d00] flex items-center gap-3">
              <Award className="h-5 w-5" />
              Top Selling Matches
            </CardTitle>
          </CardHeader>

          <CardContent className="p-10 space-y-6">
            {matchComparison.slice(0, 5).map((m, i) => (
              <div key={m.name} className="flex justify-between items-center">
                <div>
                  <div className="font-black text-slate-800">
                    {m.name}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {m.tickets.toLocaleString()} Tickets
                  </div>
                </div>
                <div className="font-black text-[#0e633d]">
                  K {m.revenue.toLocaleString()}
                </div>
              </div>
            ))}

            <Button
              variant="ghost"
              className="w-full mt-6 h-12 rounded-2xl font-black uppercase tracking-widest text-xs hover:text-[#0e633d]"
            >
              View All Rankings <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Zone Pie */}
        <Card className="border-none shadow-xl rounded-[2.5rem] bg-white">
          <CardHeader className="pt-10 px-10 pb-0">
            <CardTitle className="text-lg font-black uppercase tracking-widest text-slate-800">
              Revenue by Zone
            </CardTitle>
          </CardHeader>

          <CardContent className="h-[350px] px-6 pb-10">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.revenueByZone}
                  dataKey="revenue"
                  nameKey="zone"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                >
                  {stats.revenueByZone.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
