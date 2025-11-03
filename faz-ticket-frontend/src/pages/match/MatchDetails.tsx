// src/pages/match/MatchDetails.tsx
import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Shield,
  ChevronRight,
  Minus,
  Plus,
  AlertTriangle,
  Rows as RowsIcon,
  SquareStack,
  Armchair as SeatIcon, // <-- replace Seat with Armchair
} from "lucide-react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

/** =========================================================================
 *  DATA MODEL
 * ========================================================================= */
type SeatStatus = "available" | "held" | "sold";
type Seat = {
  seatNumber: number;
  status: SeatStatus;
};
type Row = {
  rowNumber: number; // 1..N
  seats: Seat[];     // 1..M
};
type BlockId = string;
type Block = {
  id: BlockId; // e.g. A1
  name: string;
  stand: "West" | "East" | "North" | "South" | "VIP";
  category: "VIP" | "Covered" | "East" | "West" | "North" | "South" | "General";
  color: string; // Tailwind bg token
  price: number; // ZMW per seat
  rows: Row[];
};
type StadiumMap = {
  stadiumName: string;
  city: string;
  blocks: Block[];
};

/** Utility to generate a block with R rows and S seats per row */
const makeBlock = (
  id: BlockId,
  name: string,
  stand: Block["stand"],
  category: Block["category"],
  color: string,
  price: number,
  rowsCount: number,
  seatsPerRow: number,
  soldRule?: (row: number, seat: number) => boolean
): Block => {
  const rows: Row[] = Array.from({ length: rowsCount }, (_, r) => {
    const rowNumber = r + 1;
    const seats: Seat[] = Array.from({ length: seatsPerRow }, (_, s) => {
      const seatNumber = s + 1;
      const isSold = soldRule?.(rowNumber, seatNumber) ?? false;
      return { seatNumber, status: isSold ? "sold" : "available" };
    });
    return { rowNumber, seats };
  });
  return { id, name, stand, category, color, price, rows };
};

/** -------------------------------------------------------------------------
 * MOCK: Levy Mwanawasa Stadium map
 * --------------------------------------------------------------------------*/
const LEVY_MWANAWASA_MAP: StadiumMap = {
  stadiumName: "Levy Mwanawasa Stadium",
  city: "Ndola",
  blocks: [
    // VIP (center)
    makeBlock("A1", "VIP A1", "VIP", "VIP", "bg-amber-500", 200, 16, 18, (row, seat) => row === 5 && seat <= 2),
    makeBlock("A2", "VIP A2", "VIP", "VIP", "bg-amber-500", 200, 16, 18),
    makeBlock("A3", "VIP A3", "VIP", "VIP", "bg-amber-500", 200, 16, 18, (row, seat) => row === 10 && seat >= 17),

    // Covered West
    makeBlock("B1", "Covered B1", "West", "Covered", "bg-emerald-500", 120, 20, 20),
    makeBlock("B2", "Covered B2", "West", "Covered", "bg-emerald-500", 120, 20, 20),
    makeBlock("B3", "Covered B3", "West", "Covered", "bg-emerald-500", 120, 20, 20),
    makeBlock("B4", "Covered B4", "West", "Covered", "bg-emerald-500", 120, 20, 20),

    // East stand
    makeBlock("C1", "East C1", "East", "East", "bg-green-500", 80, 22, 26),
    makeBlock("C2", "East C2", "East", "East", "bg-green-500", 80, 22, 26, (row, seat) => row <= 2 && seat <= 5),
    makeBlock("C3", "East C3", "East", "East", "bg-green-500", 80, 22, 26),
    makeBlock("C4", "East C4", "East", "East", "bg-green-500", 80, 22, 26),
    makeBlock("C5", "East C5", "East", "East", "bg-green-500", 80, 22, 26),

    // North & South
    makeBlock("D1", "North D1", "North", "North", "bg-blue-500", 60, 18, 28),
    makeBlock("D2", "North D2", "North", "North", "bg-blue-500", 60, 18, 28),
    makeBlock("D3", "North D3", "North", "North", "bg-blue-500", 60, 18, 28),

    makeBlock("E1", "South E1", "South", "South", "bg-indigo-500", 60, 18, 28),
    makeBlock("E2", "South E2", "South", "South", "bg-indigo-500", 60, 18, 28),
    makeBlock("E3", "South E3", "South", "South", "bg-indigo-500", 60, 18, 28),

    // General Admission (modeled with rows for consistency)
    makeBlock("GA", "General Admission", "East", "General", "bg-gray-400", 50, 12, 40, (row) => row <= 1),
  ],
};

export default function MatchDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // In production: fetch by matchId (and return its seat map)
  const match = {
    id: id || "1",
    homeTeam: "Zambia",
    awayTeam: "Malawi",
    competition: "World Cup Qualifier",
    date: "Sat, 25 Jan 2025",
    time: "15:00",
    stadium: LEVY_MWANAWASA_MAP.stadiumName,
    city: LEVY_MWANAWASA_MAP.city,
    description:
      "Don't miss this crucial World Cup qualifier as Zambia faces Malawi at Levy Mwanawasa Stadium. Be part of history!",
  };

  const stadiumMap = LEVY_MWANAWASA_MAP;

  /** ---------- Selection State ---------- */
  const [selectedBlockId, setSelectedBlockId] = useState<BlockId | null>(null);
  const [selectedRowNumber, setSelectedRowNumber] = useState<number | null>(null);
  const [selectedSeatNumbers, setSelectedSeatNumbers] = useState<number[]>([]);

  const HARD_MAX_PER_ORDER = 10;

  const selectedBlock = useMemo(
    () => stadiumMap.blocks.find((b) => b.id === selectedBlockId) || null,
    [stadiumMap.blocks, selectedBlockId]
  );

  const selectedRow = useMemo(() => {
    if (!selectedBlock || selectedRowNumber == null) return null;
    return selectedBlock.rows.find((r) => r.rowNumber === selectedRowNumber) || null;
  }, [selectedBlock, selectedRowNumber]);

  const blockAvailableCount = (b: Block) =>
    b.rows.reduce((acc, r) => acc + r.seats.filter((s) => s.status === "available").length, 0);

  const selectedBlockAvailable = selectedBlock ? blockAvailableCount(selectedBlock) : 0;

  const toggleSeat = (seatNumber: number) => {
    if (!selectedRow) return;
    const seat = selectedRow.seats.find((s) => s.seatNumber === seatNumber);
    if (!seat || seat.status !== "available") return;

    setSelectedSeatNumbers((prev) => {
      const exists = prev.includes(seatNumber);
      if (exists) return prev.filter((n) => n !== seatNumber);
      if (prev.length >= HARD_MAX_PER_ORDER) {
        toast({
          variant: "destructive",
          title: `Max ${HARD_MAX_PER_ORDER} seats`,
          description: "You reached the ticket limit per order.",
        });
        return prev;
      }
      return [...prev, seatNumber].sort((a, b) => a - b);
    });
  };

  const onSelectBlock = (blockId: BlockId) => {
    if (blockId === selectedBlockId) return;
    setSelectedBlockId(blockId);
    setSelectedRowNumber(null);
    setSelectedSeatNumbers([]);
  };

  const onSelectRow = (rowNumber: number) => {
    if (rowNumber === selectedRowNumber) return;
    setSelectedRowNumber(rowNumber);
    setSelectedSeatNumbers([]);
  };

  const totalPrice = selectedBlock ? selectedBlock.price * selectedSeatNumbers.length : 0;

  const handleAddToCart = () => {
    if (!selectedBlock || !selectedRow || selectedSeatNumbers.length === 0) {
      toast({
        variant: "destructive",
        title: "Select seats",
        description: "Choose a block, a row, and one or more seats.",
      });
      return;
    }

    addToCart({
      matchId: match.id,
      zone: `${selectedBlock.name}`,          // e.g., "VIP A2"
      section: selectedBlock.id,             // e.g., "A2"
      row: String(selectedRow.rowNumber),    // e.g., "12"
      seats: selectedSeatNumbers.map(String),// ["14","15",...]
      price: selectedBlock.price,
      quantity: selectedSeatNumbers.length,
    });

    toast({
      title: "Added to Cart!",
      description: `${selectedSeatNumbers.length} seat(s) from ${selectedBlock.name} row ${selectedRow.rowNumber} added.`,
    });

    navigate("/cart");
  };

  const byStand = useMemo(() => {
    const groups: Record<Block["stand"], Block[]> = { VIP: [], West: [], East: [], North: [], South: [] };
    stadiumMap.blocks.forEach((b) => groups[b.stand].push(b));
    const sorter = (a: Block, b: Block) => a.id.localeCompare(b.id, undefined, { numeric: true });
    (Object.keys(groups) as (keyof typeof groups)[]).forEach((k) => groups[k].sort(sorter));
    return groups;
  }, [stadiumMap.blocks]);

  const lowStock =
    selectedBlock &&
    selectedBlockAvailable > 0 &&
    selectedBlockAvailable <= 50;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Match Header */}
        <div className="mb-8">
          <Button variant="ghost" size="sm" onClick={() => navigate("/All-Matches")} className="mb-4">
            ← Back to Matches
          </Button>

          <Card className="overflow-hidden">
            <div className="bg-gradient-to-br from-primary to-primary-hover p-8 text-primary-foreground">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="accent" className="font-bold">
                  {match.competition}
                </Badge>
              </div>

              {/* Teams */}
              <div className="flex items-center justify-center gap-8 mb-6">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                    <span className="text-4xl font-bold">{match.homeTeam.substring(0, 3).toUpperCase()}</span>
                  </div>
                  <h2 className="text-2xl font-bold">{match.homeTeam}</h2>
                </div>

                <div className="text-3xl font-bold">VS</div>

                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                    <span className="text-4xl font-bold">{match.awayTeam.substring(0, 3).toUpperCase()}</span>
                  </div>
                  <h2 className="text-2xl font-bold">{match.awayTeam}</h2>
                </div>
              </div>

              {/* Match Info */}
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{match.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{match.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>
                    {match.stadium}, {match.city}
                  </span>
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              <p className="text-muted-foreground">{match.description}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Seat Selection */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Choose Your Seats
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Diagram legend header */}
                <div className="text-center">
                  <div className="inline-block bg-muted px-6 py-2 rounded-full text-sm font-semibold">PITCH</div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  {/* Stand & Block selection */}
                  <div className="space-y-5">
                    {(["VIP", "West", "East", "North", "South"] as const).map((standKey) => {
                      const blocks = byStand[standKey];
                      if (!blocks || blocks.length === 0) return null;

                      return (
                        <div key={standKey} className="rounded-lg border bg-white p-4">
                          <div className="mb-3 flex items-center gap-2">
                            <SquareStack className="h-4 w-4 text-muted-foreground" />
                            <h4 className="font-semibold">{standKey} Stand</h4>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {blocks.map((b) => {
                              const available = blockAvailableCount(b);
                              const selected = selectedBlockId === b.id;
                              const disabled = available === 0;
                              return (
                                <button
                                  key={b.id}
                                  onClick={() => !disabled && onSelectBlock(b.id)}
                                  disabled={disabled}
                                  className={`rounded-md border px-3 py-2 text-left transition ${
                                    selected ? "border-primary bg-primary/10 shadow-sm" : "hover:border-primary/50"
                                  } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
                                  title={`${b.name} • ${available} available • ZMW ${b.price.toFixed(2)}`}
                                >
                                  <div className="flex items-center gap-2">
                                    <span className={`inline-block h-3.5 w-3.5 rounded ${b.color}`} />
                                    <span className="font-medium">{b.id}</span>
                                  </div>
                                  <div className="text-xs text-muted-foreground">{b.name}</div>
                                  <div className="mt-1 text-xs">
                                    <span className="font-semibold">ZMW {b.price.toFixed(2)}</span>{" "}
                                    <span className="text-muted-foreground">• {available} left</span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Row + Seat grid */}
                  <div className="space-y-4">
                    {/* Row selector */}
                    <div className="rounded-lg border bg-white p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <RowsIcon className="h-4 w-4 text-muted-foreground" />
                        <h4 className="font-semibold">Row</h4>
                      </div>

                      {!selectedBlock ? (
                        <p className="text-sm text-muted-foreground">Pick a block first to see rows.</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {selectedBlock.rows.map((r) => {
                            const rowAvail = r.seats.filter((s) => s.status === "available").length;
                            const selected = selectedRowNumber === r.rowNumber;
                            const disabled = rowAvail === 0;
                            return (
                              <button
                                key={r.rowNumber}
                                onClick={() => !disabled && onSelectRow(r.rowNumber)}
                                disabled={disabled}
                                className={`rounded-md border px-3 py-1.5 text-sm transition ${
                                  selected ? "border-primary bg-primary/10 shadow-sm" : "hover:border-primary/50"
                                } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
                                title={`Row ${r.rowNumber} • ${rowAvail} available`}
                              >
                                Row {r.rowNumber}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Seat grid */}
                    <div className="rounded-lg border bg-white p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <SeatIcon className="h-4 w-4 text-muted-foreground" />
                        <h4 className="font-semibold">Seats</h4>
                      </div>

                      {!selectedRow ? (
                        <p className="text-sm text-muted-foreground">Choose a row to pick seats.</p>
                      ) : (
                        <div className="grid grid-cols-8 sm:grid-cols-12 gap-2">
                          {selectedRow.seats.map((s) => {
                            const isSelected = selectedSeatNumbers.includes(s.seatNumber);
                            const isSold = s.status !== "available";
                            return (
                              <button
                                key={s.seatNumber}
                                onClick={() => toggleSeat(s.seatNumber)}
                                disabled={isSold}
                                className={`h-8 rounded text-xs font-medium border transition ${
                                  isSold
                                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                                    : isSelected
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-white hover:border-primary/50"
                                }`}
                                title={`Seat ${s.seatNumber} • ${s.status}`}
                              >
                                {s.seatNumber}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Hints */}
                      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs">
                        <span className="inline-flex items-center gap-1">
                          <span className="h-3 w-3 rounded bg-primary inline-block" />
                          Selected
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <span className="h-3 w-3 rounded bg-white border inline-block" />
                          Available
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <span className="h-3 w-3 rounded bg-muted inline-block" />
                          Unavailable
                        </span>
                      </div>
                    </div>

                    {/* Low stock note */}
                    {lowStock && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-amber-800 text-sm inline-flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Seats in this block are running low.
                      </div>
                    )}

                    {/* Security note */}
                    <div className="bg-success/10 border border-success/20 rounded-lg p-4 flex items-start gap-3">
                      <Shield className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-semibold text-success mb-1">Secure Purchase Guarantee</p>
                        <p className="text-muted-foreground">
                          Your selection will be held for a short time at checkout. Each ticket has a unique QR code for
                          one-time entry.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {!selectedBlock ? (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-muted-foreground">Pick a block, row and seats to continue.</p>
                  </div>
                ) : (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Selection</p>
                      <div className="font-bold text-lg">{selectedBlock.name}</div>
                      {selectedRow && (
                        <div className="text-sm text-muted-foreground">
                          Row {selectedRow.rowNumber}
                          {selectedSeatNumbers.length > 0 && (
                            <>
                              {" • Seats "}
                              {selectedSeatNumbers.join(", ")}
                            </>
                          )}
                        </div>
                      )}
                      <div className="text-sm text-muted-foreground">
                        ZMW {selectedBlock.price.toFixed(2)} per ticket
                      </div>
                    </div>

                    <Separator />

                    {/* Seats selected (derived) */}
                    <div>
                      <p className="text-sm font-semibold mb-3">Seats Selected</p>
                      <div className="flex items-center gap-4">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            setSelectedSeatNumbers((prev) => prev.slice(0, Math.max(0, prev.length - 1)))
                          }
                          disabled={selectedSeatNumbers.length === 0}
                          title="Remove last selected seat"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-2xl font-bold w-12 text-center">
                          {selectedSeatNumbers.length}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            if (!selectedRow) return;
                            const next = selectedRow.seats.find(
                              (s) => s.status === "available" && !selectedSeatNumbers.includes(s.seatNumber)
                            );
                            if (!next) return;
                            if (selectedSeatNumbers.length >= HARD_MAX_PER_ORDER) {
                              toast({
                                variant: "destructive",
                                title: `Max ${HARD_MAX_PER_ORDER} seats`,
                                description: "You reached the ticket limit per order.",
                              });
                              return;
                            }
                            setSelectedSeatNumbers((prev) => [...prev, next.seatNumber].sort((a, b) => a - b));
                          }}
                          disabled={!selectedRow || selectedSeatNumbers.length >= HARD_MAX_PER_ORDER}
                          title="Quick add next available seat"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Max {HARD_MAX_PER_ORDER} per order</p>
                    </div>

                    <Separator />

                    {/* Price Breakdown */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-semibold">ZMW {totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Booking Fee</span>
                        <span className="font-semibold">ZMW {(totalPrice * 0.05).toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-primary">ZMW {(totalPrice * 1.05).toFixed(2)}</span>
                      </div>
                    </div>

                    <Button
                      variant="hero"
                      size="lg"
                      className="w-full"
                      onClick={handleAddToCart}
                      disabled={selectedSeatNumbers.length === 0}
                    >
                      Add to Cart
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
