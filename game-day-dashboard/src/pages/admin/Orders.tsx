import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { orders, matches } from "@/data/mockData";
import { format } from "date-fns";

const statusColor: Record<string, string> = {
  confirmed: "bg-emerald-100 text-emerald-800",
  pending: "bg-orange-100 text-orange-800",
  refunded: "bg-red-100 text-red-800",
  cancelled: "bg-gray-100 text-gray-800",
};

export default function Orders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [matchFilter, setMatchFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  // Logic to remove duplicates from the dummy data by Name
  const uniqueOrders = orders.filter((order, index, self) =>
    index === self.findIndex((t) => t.buyerName === order.buyerName)
  );

  const filtered = uniqueOrders.filter((o) => {
    const s = `${o.buyerName} ${o.id}`.toLowerCase().includes(search.toLowerCase());
    const st = statusFilter === "all" || o.status === statusFilter;
    const mf = matchFilter === "all" || o.matchId === matchFilter;
    const pf = paymentFilter === "all" || o.paymentMethod === paymentFilter;
    return s && st && mf && pf;
  });

  return (
    <div className="space-y-8 font-sans text-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter text-[#0e633d]">
          FAZ <span className="text-[#ef7d00]">Orders</span>
        </h2>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">
          Ticketing Transactions & Payment Records
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search Unique Buyer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-11 rounded-xl bg-slate-50 border-slate-200 font-bold"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px] h-11 rounded-xl font-bold">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
          </SelectContent>
        </Select>

        <Select value={matchFilter} onValueChange={setMatchFilter}>
          <SelectTrigger className="w-[220px] h-11 rounded-xl font-bold">
            <SelectValue placeholder="All Matches" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Matches</SelectItem>
            {matches.map(m => (
              <SelectItem key={m.id} value={m.id}>
                {m.homeTeam} vs {m.awayTeam}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={paymentFilter} onValueChange={setPaymentFilter}>
          <SelectTrigger className="w-[150px] h-11 rounded-xl font-bold">
            <SelectValue placeholder="Payment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Pay</SelectItem>
            <SelectItem value="MTN">MTN</SelectItem>
            <SelectItem value="Airtel">Airtel</SelectItem>
            <SelectItem value="Zamtel">Zamtel</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-900">
              <TableRow>
                {[
                  "Order ID", "Buyer", "Match", "Wing",
                  "Qty", "Amount", "Provider", "Status",
                  "Purchase Date", "Action"
                ].map((head) => (
                  <TableHead
                    key={head}
                    className="text-[10px] font-black uppercase tracking-widest text-[#ef7d00]"
                  >
                    {head}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.map((order) => {
                const match = matches.find(m => m.id === order.matchId);
                return (
                  <TableRow key={order.id} className="hover:bg-slate-50 border-b border-slate-100">
                    <TableCell className="font-mono text-[10px] text-slate-400 font-bold">
                      #{order.id.slice(-6).toUpperCase()}
                    </TableCell>
                    <TableCell className="font-bold whitespace-nowrap">
                      {order.buyerName}
                    </TableCell>
                    <TableCell className="text-sm whitespace-nowrap">
                      {match ? `${match.homeTeam} vs ${match.awayTeam}` : "-"}
                    </TableCell>
                    <TableCell className="font-black text-[#0e633d]">
                      {order.zone}
                    </TableCell>
                    <TableCell className="font-bold text-center">
                      {order.seats}
                    </TableCell>
                    <TableCell className="font-black text-[#0e633d]">
                      K {order.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-bold border-slate-200">
                        {order.paymentMethod}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${statusColor[order.status]} border-none text-[10px] uppercase font-black tracking-widest`}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-slate-400 font-bold">
                      {format(new Date(order.createdAt), "dd MMM, HH:mm")}
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 text-xs font-black uppercase tracking-widest hover:text-[#0e633d] hover:border-[#0e633d]"
                          >
                            View Ticket
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md rounded-2xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-[#0e633d] font-black uppercase tracking-widest">
                              <img
                                src="https://res.cloudinary.com/dceqpo559/image/upload/v1769602379/faz_logo_cl3wx5.png"
                                alt="FAZ"
                                className="h-6 w-6"
                              />
                              Order Details
                            </DialogTitle>
                          </DialogHeader>
                          <div className="grid grid-cols-2 gap-4 py-6 text-sm border-t border-b">
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Buyer Name</p>
                              <p className="font-bold">{order.buyerName}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phone Number</p>
                              <p className="font-bold">{order.buyerPhone}</p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Match</p>
                              <p className="font-bold">{match ? `${match.homeTeam} vs ${match.awayTeam}` : "-"}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Stadium Wing</p>
                              <p className="font-black text-[#0e633d]">{order.zone}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tickets</p>
                              <p className="font-bold">{order.seats} Seat(s)</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Paid</p>
                              <p className="font-black text-[#0e633d]">K {order.amount.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Payment Via</p>
                              <Badge variant="outline" className="font-bold">{order.paymentMethod}</Badge>
                            </div>
                          </div>
                          <div className="flex justify-between text-[10px] font-bold text-slate-400 pt-4">
                            <span>Transaction ID: {order.id}</span>
                            <span>Issued: {format(new Date(order.createdAt), "PPP p")}</span>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                );
              })}

              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-20 text-slate-300 font-black uppercase tracking-[0.2em] text-xs italic">
                    No Orders Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}