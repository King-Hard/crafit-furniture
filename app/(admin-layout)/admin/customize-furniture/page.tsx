"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, X, ChevronDown, Search, Send } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type RequestStatus = "Pending Review" | "Quoted" | "Approved" | "In Production" | "Completed" | "Rejected";

interface CustomizeRequest {
  id: string;
  customer: string;
  email: string;
  date: string;
  item: string;
  dimensions: string;
  material: string;
  budget: number;
  message: string;
  imageUrl: string;
  status: RequestStatus;
  quote?: number;
}

const initialRequests: CustomizeRequest[] = [
  {
    id: "REQ-001", customer: "Maria Santos", email: "maria@email.com", date: "Mar 9, 2026",
    item: "Dining Table", dimensions: '72" x 36" x 30"', material: "Narra Wood",
    budget: 25000, message: "Gusto ko ng rectangular dining table na may 6 na upuan. Narra wood yung preferred ko with natural finish.",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
    status: "Pending Review",
  },
  {
    id: "REQ-002", customer: "Juan dela Cruz", email: "juan@email.com", date: "Mar 8, 2026",
    item: "L-Shape Sofa", dimensions: '110" x 85" x 32"', material: "Fabric / Foam",
    budget: 35000, message: "Kailangan ko ng L-shape sofa na may chaise lounge sa kanan. Light gray yung color.",
    imageUrl: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600",
    status: "Quoted", quote: 32000,
  },
  {
    id: "REQ-003", customer: "Ana Reyes", email: "ana@email.com", date: "Mar 7, 2026",
    item: "Wardrobe Cabinet", dimensions: '80" x 24" x 96"', material: "Plywood / Laminate",
    budget: 20000, message: "4-door wardrobe na may full mirror sa isa sa mga pinto. White matte finish.",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
    status: "Approved", quote: 18500,
  },
  {
    id: "REQ-004", customer: "Carlo Bautista", email: "carlo@email.com", date: "Mar 6, 2026",
    item: "Study Desk", dimensions: '60" x 24" x 30"', material: "Mahogany",
    budget: 12000, message: "Simple study desk na may bookshelf sa taas. Para sa college student.",
    imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600",
    status: "In Production", quote: 11000,
  },
  {
    id: "REQ-005", customer: "Luz Gomez", email: "luz@email.com", date: "Mar 5, 2026",
    item: "Bed Frame", dimensions: '60" x 80" x 48"', material: "Solid Wood",
    budget: 15000, message: "Queen size bed frame with headboard. Dark walnut finish preferred.",
    imageUrl: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600",
    status: "Completed", quote: 14500,
  },
  {
    id: "REQ-006", customer: "Ramon Dela Torre", email: "ramon@email.com", date: "Mar 4, 2026",
    item: "Coffee Table", dimensions: '48" x 24" x 18"', material: "Glass / Metal",
    budget: 5000, message: "Modern coffee table with glass top and metal frame. Black finish.",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600",
    status: "Rejected",
  },
];

const statusStyles: Record<RequestStatus, string> = {
  "Pending Review": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  "Quoted": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Approved": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  "In Production": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  "Completed": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Rejected": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const allStatuses: RequestStatus[] = ["Pending Review", "Quoted", "Approved", "In Production", "Completed", "Rejected"];

export default function CustomizeRequest() {
  const [requests, setRequests] = useState<CustomizeRequest[]>(initialRequests);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "All">("All");
  const [selectedRequest, setSelectedRequest] = useState<CustomizeRequest | null>(null);
  const [quoteInput, setQuoteInput] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filtered = requests.filter((r) => {
    const matchSearch =
      r.customer.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.item.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  function handleSendQuote(id: string) {
    const amount = parseFloat(quoteInput);
    if (!amount || isNaN(amount)) return;
    setRequests((prev) =>
      prev.map((r) => r.id === id ? { ...r, quote: amount, status: "Quoted" } : r)
    );
    setQuoteInput("");
    setSelectedRequest((prev) => prev ? { ...prev, quote: amount, status: "Quoted" } : null);
  }

  function handleUpdateStatus(id: string, status: RequestStatus) {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
    setUpdatingId(null);
    setSelectedRequest((prev) => prev ? { ...prev, status } : null);
  }

  function handleReject(id: string) {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: "Rejected" } : r));
    setSelectedRequest((prev) => prev ? { ...prev, status: "Rejected" } : null);
  }

  const isTerminal = (status: RequestStatus) => status === "Completed" || status === "Rejected";

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Customize Requests</h1>
        <p className="text-muted-foreground text-sm mt-0.5">{requests.length} requests total</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as RequestStatus | "All")}
          className="text-sm border bg-card rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-muted-foreground"
        >
          <option value="All">All Status</option>
          {allStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="border bg-card rounded-lg overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-muted-foreground text-xs bg-muted/40">
                <th className="text-left px-4 py-3 font-medium">Request ID</th>
                <th className="text-left px-4 py-3 font-medium">Customer</th>
                <th className="text-left px-4 py-3 font-medium">Item</th>
                <th className="text-left px-4 py-3 font-medium">Date</th>
                <th className="text-left px-4 py-3 font-medium">Budget</th>
                <th className="text-left px-4 py-3 font-medium">Quote</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length > 0 ? (
                filtered.map((req) => (
                  <tr key={req.id} className="hover:bg-muted/40 transition-colors">
                    <td className="px-4 py-3 text-muted-foreground font-medium">{req.id}</td>
                    <td className="px-4 py-3 font-medium">{req.customer}</td>
                    <td className="px-4 py-3 text-muted-foreground">{req.item}</td>
                    <td className="px-4 py-3 text-muted-foreground">{req.date}</td>
                    <td className="px-4 py-3 text-muted-foreground">₱{req.budget.toLocaleString()}</td>
                    <td className="px-4 py-3 font-medium">
                      {req.quote ? `₱${req.quote.toLocaleString()}` : "—"}
                    </td>
                    <td className="px-4 py-3">
                      {updatingId === req.id ? (
                        <select
                          autoFocus
                          defaultValue={req.status}
                          onChange={(e) => handleUpdateStatus(req.id, e.target.value as RequestStatus)}
                          onBlur={() => setUpdatingId(null)}
                          className="text-xs border bg-card rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                          {allStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      ) : (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[req.status]}`}>
                          {req.status}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          title="View Details"
                          onClick={() => setSelectedRequest(req)}
                          className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          title="Update Status"
                          onClick={() => setUpdatingId(req.id)}
                          disabled={isTerminal(req.status)}
                          className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <ChevronDown size={15} />
                        </button>
                        <button
                          title="Reject"
                          onClick={() => handleReject(req.id)}
                          disabled={isTerminal(req.status)}
                          className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-muted-foreground hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <X size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground text-xs">
                    No requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t px-4 py-3 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Showing {filtered.length} of {requests.length} requests
          </p>
          <div className="flex items-center gap-1">
            <button className="text-xs px-2.5 py-1 border rounded-md text-muted-foreground hover:bg-muted transition-colors">Previous</button>
            <button className="text-xs px-2.5 py-1 border rounded-md bg-primary text-primary-foreground">1</button>
            <button className="text-xs px-2.5 py-1 border rounded-md text-muted-foreground hover:bg-muted transition-colors">Next</button>
          </div>
        </div>
      </div>

      {/* View Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 bg-background/50 flex items-center justify-center p-4">
          <div className="bg-card border rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between p-5 border-b bg-card">              <div>
                <h2 className="font-semibold text-base">{selectedRequest.id}</h2>
                <p className="text-muted-foreground text-xs mt-0.5">{selectedRequest.date}</p>
              </div>
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => setSelectedRequest(null)}
              >
                <X/>
              </Button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-5">
              {/* Image */}
              <div className="rounded-lg overflow-hidden border h-56 bg-muted relative">
                <Image
                  src={selectedRequest.imageUrl}
                  alt="Reference"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Customer</p>
                  <p className="text-sm font-medium">{selectedRequest.customer}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Email</p>
                  <p className="text-sm font-medium">{selectedRequest.email}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Item</p>
                  <p className="text-sm font-medium">{selectedRequest.item}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Dimensions</p>
                  <p className="text-sm font-medium">{selectedRequest.dimensions}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Material</p>
                  <p className="text-sm font-medium">{selectedRequest.material}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Budget</p>
                  <p className="text-sm font-medium">₱{selectedRequest.budget.toLocaleString()}</p>
                </div>
              </div>

              {/* Message */}
              <div>
                <p className="text-xs text-muted-foreground mb-1">Customer Message</p>
                <p className="text-sm bg-muted/50 rounded-lg p-3 leading-relaxed">{selectedRequest.message}</p>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Current Status</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[selectedRequest.status]}`}>
                    {selectedRequest.status}
                  </span>
                </div>
                {selectedRequest.quote && (
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">Quoted Price</p>
                    <p className="text-sm font-semibold">₱{selectedRequest.quote.toLocaleString()}</p>
                  </div>
                )}
              </div>

              {/* Send Quote — only if not terminal and not yet quoted */}
              {!isTerminal(selectedRequest.status) && !selectedRequest.quote && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Send Quote</p>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₱</span>
                      <Input
                        type="number"
                        placeholder="Enter quote amount"
                        value={quoteInput}
                        onChange={(e) => setQuoteInput(e.target.value)}
                        className="pl-6"
                      />
                    </div>
                    <Button
                      onClick={() => handleSendQuote(selectedRequest.id)}
                    >
                      <Send size={14} />
                      Send
                    </Button>
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              {!isTerminal(selectedRequest.status) && (
                <div className="flex gap-2 pt-1">
                  <select
                    value={selectedRequest.status}
                    onChange={(e) => handleUpdateStatus(selectedRequest.id, e.target.value as RequestStatus)}
                    className="flex-1 text-sm border bg-card rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-muted-foreground"
                  >
                    {allStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <Button variant="destructive"
                    onClick={() => handleReject(selectedRequest.id)}
                  >
                    <X size={14} />
                    Reject
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}