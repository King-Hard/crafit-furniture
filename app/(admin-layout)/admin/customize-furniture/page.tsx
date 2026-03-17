"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, X, ChevronDown, Search, Send, Plus, Trash2, TreePine, Calculator } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type RequestStatus = "Pending Review" | "Quoted" | "Approved" | "In Production" | "Completed" | "Rejected";

interface CustomizeRequest {
  id: string;
  customer: string;
  email: string;
  phone: string;
  date: string;
  item: string;
  dimensions: string;
  woodType: string;
  budget: string;           // ← string na para consistent sa client ("₱25,000 – ₱50,000")
  message: string;
  imageUrl: string;
  status: RequestStatus;
  quote?: number;
  requiredMaterials?: { materialId: number; quantity: number }[];
}

const inventoryMaterials = [
  { id: 1, name: "Narra Lumber", unit: "board feet", stock: 120 },
  { id: 2, name: "Mahogany Lumber", unit: "board feet", stock: 45 },
  { id: 3, name: "Plywood (Marine Board)", unit: "sheets", stock: 30 },
  { id: 4, name: "Acacia Slab", unit: "pieces", stock: 8 },
  { id: 5, name: "Fabric (Gray)", unit: "meters", stock: 60 },
  { id: 6, name: "Foam Padding", unit: "kg", stock: 5 },
  { id: 7, name: "Steel Pipe (1 inch)", unit: "pieces", stock: 0 },
  { id: 8, name: "Tempered Glass", unit: "pieces", stock: 12 },
  { id: 9, name: "Wood Stain (Dark Walnut)", unit: "liters", stock: 18 },
  { id: 10, name: "Cabinet Hinges", unit: "pieces", stock: 3 },
  { id: 11, name: "Kamagong Lumber", unit: "board feet", stock: 0 },
  { id: 12, name: "Pine Lumber", unit: "board feet", stock: 200 },
];

const initialRequests: CustomizeRequest[] = [
  {
    id: "REQ-001", customer: "Maria Santos", email: "maria@email.com", phone: "0917-123-4567",
    date: "Mar 9, 2026", item: "Dining Table", dimensions: '72" x 36" x 30"',
    woodType: "Narra", budget: "₱25,000 – ₱50,000",
    message: "Gusto ko ng rectangular dining table na may 6 na upuan. Narra wood yung preferred ko with natural finish.",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
    status: "Pending Review", requiredMaterials: [],
  },
  {
    id: "REQ-002", customer: "Juan dela Cruz", email: "juan@email.com", phone: "0918-234-5678",
    date: "Mar 8, 2026", item: "L-Shape Sofa", dimensions: '110" x 85" x 32"',
    woodType: "Acacia", budget: "₱25,000 – ₱50,000",
    message: "Kailangan ko ng L-shape sofa na may chaise lounge sa kanan. Light gray yung color.",
    imageUrl: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600",
    status: "Quoted", quote: 32000,
    requiredMaterials: [{ materialId: 5, quantity: 8 }, { materialId: 6, quantity: 2 }],
  },
  {
    id: "REQ-003", customer: "Ana Reyes", email: "ana@email.com", phone: "0919-345-6789",
    date: "Mar 7, 2026", item: "Wardrobe Cabinet", dimensions: '80" x 24" x 96"',
    woodType: "Pine", budget: "₱10,000 – ₱25,000",
    message: "4-door wardrobe na may full mirror sa isa sa mga pinto. White matte finish.",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
    status: "Approved", quote: 18500,
    requiredMaterials: [{ materialId: 3, quantity: 25 }, { materialId: 10, quantity: 8 }],
  },
  {
    id: "REQ-004", customer: "Carlo Bautista", email: "carlo@email.com", phone: "0920-456-7890",
    date: "Mar 6, 2026", item: "Study Desk", dimensions: '60" x 24" x 30"',
    woodType: "Mahogany", budget: "₱10,000 – ₱25,000",
    message: "Simple study desk na may bookshelf sa taas. Para sa college student.",
    imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600",
    status: "In Production", quote: 11000,
    requiredMaterials: [{ materialId: 2, quantity: 12 }, { materialId: 9, quantity: 3 }],
  },
  {
    id: "REQ-005", customer: "Luz Gomez", email: "luz@email.com", phone: "0921-567-8901",
    date: "Mar 5, 2026", item: "Bed Frame", dimensions: 'Queen (60" x 75")',
    woodType: "Narra", budget: "₱10,000 – ₱25,000",
    message: "Queen size bed frame with headboard. Dark walnut finish preferred.",
    imageUrl: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600",
    status: "Completed", quote: 14500,
    requiredMaterials: [{ materialId: 1, quantity: 30 }, { materialId: 9, quantity: 4 }],
  },
  {
    id: "REQ-006", customer: "Ramon Dela Torre", email: "ramon@email.com", phone: "0922-678-9012",
    date: "Mar 4, 2026", item: "Coffee Table", dimensions: '48" x 24" x 18"',
    woodType: "Other", budget: "Under ₱10,000",
    message: "Modern coffee table with glass top and metal frame. Black finish.",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600",
    status: "Rejected", requiredMaterials: [],
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
const isTerminal = (status: RequestStatus) => status === "Completed" || status === "Rejected";

const costPerUnit: Record<number, number> = {
  1: 85, 2: 120, 3: 450, 4: 800, 5: 180,
  6: 250, 7: 95, 8: 1200, 9: 320, 10: 45,
  11: 350, 12: 55,
};

export default function CustomizeRequestPage() {
  const [requests, setRequests] = useState<CustomizeRequest[]>(initialRequests);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "All">("All");
  const [selectedRequest, setSelectedRequest] = useState<CustomizeRequest | null>(null);
  const [quoteInput, setQuoteInput] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [materialRows, setMaterialRows] = useState<{ materialId: number; quantity: string }[]>([]);

  const filtered = requests.filter((r) => {
    const matchSearch =
      r.customer.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.item.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  function openModal(req: CustomizeRequest) {
    setSelectedRequest(req);
    setQuoteInput("");
    setMaterialRows(
      req.requiredMaterials?.map(m => ({ materialId: m.materialId, quantity: m.quantity.toString() })) ?? []
    );
  }

  function closeModal() {
    setSelectedRequest(null);
    setMaterialRows([]);
    setQuoteInput("");
  }

  function addMaterialRow() {
    const unused = inventoryMaterials.find(m => !materialRows.some(r => r.materialId === m.id));
    if (!unused) return;
    setMaterialRows(prev => [...prev, { materialId: unused.id, quantity: "" }]);
  }

  function updateMaterialRow(index: number, field: "materialId" | "quantity", value: string) {
    setMaterialRows(prev => prev.map((row, i) =>
      i === index ? { ...row, [field]: field === "materialId" ? parseInt(value) : value } : row
    ));
  }

  function removeMaterialRow(index: number) {
    setMaterialRows(prev => prev.filter((_, i) => i !== index));
  }

  function getMaterialCost() {
    return materialRows.reduce((total, row) => {
      const qty = parseFloat(row.quantity) || 0;
      return total + (costPerUnit[row.materialId] ?? 0) * qty;
    }, 0);
  }

  function saveMaterials() {
    if (!selectedRequest) return;
    const parsed = materialRows
      .filter(r => r.quantity && parseFloat(r.quantity) > 0)
      .map(r => ({ materialId: r.materialId, quantity: parseFloat(r.quantity) }));
    setRequests(prev => prev.map(r => r.id === selectedRequest.id ? { ...r, requiredMaterials: parsed } : r));
    setSelectedRequest(prev => prev ? { ...prev, requiredMaterials: parsed } : null);
  }

  function handleSendQuote(id: string) {
    const amount = parseFloat(quoteInput);
    if (!amount || isNaN(amount)) return;
    saveMaterials();
    setRequests(prev => prev.map(r => r.id === id ? { ...r, quote: amount, status: "Quoted" } : r));
    setQuoteInput("");
    setSelectedRequest(prev => prev ? { ...prev, quote: amount, status: "Quoted" } : null);
  }

  function handleUpdateStatus(id: string, status: RequestStatus) {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    setUpdatingId(null);
    setSelectedRequest(prev => prev ? { ...prev, status } : null);
  }

  function handleReject(id: string) {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: "Rejected" } : r));
    setSelectedRequest(prev => prev ? { ...prev, status: "Rejected" } : null);
  }

  const materialCost = getMaterialCost();

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
            placeholder="Search by customer, request ID, or item..."
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
              {filtered.length > 0 ? filtered.map((req) => (
                <tr key={req.id} className="hover:bg-muted/40 transition-colors">
                  <td className="px-4 py-3 text-muted-foreground font-medium">{req.id}</td>
                  <td className="px-4 py-3 font-medium">{req.customer}</td>
                  <td className="px-4 py-3 text-muted-foreground">{req.item}</td>
                  <td className="px-4 py-3 text-muted-foreground">{req.date}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{req.budget}</td>
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
                      <button title="View Details" onClick={() => openModal(req)} className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"><Eye size={15} /></button>
                      <button title="Update Status" onClick={() => setUpdatingId(req.id)} disabled={isTerminal(req.status)} className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"><ChevronDown size={15} /></button>
                      <button title="Reject" onClick={() => handleReject(req.id)} disabled={isTerminal(req.status)} className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-muted-foreground hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed"><X size={15} /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-muted-foreground text-xs">No requests found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="border-t px-4 py-3 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Showing {filtered.length} of {requests.length} requests</p>
          <div className="flex items-center gap-1">
            <button className="text-xs px-2.5 py-1 border rounded-md text-muted-foreground hover:bg-muted transition-colors">Previous</button>
            <button className="text-xs px-2.5 py-1 border rounded-md bg-primary text-primary-foreground">1</button>
            <button className="text-xs px-2.5 py-1 border rounded-md text-muted-foreground hover:bg-muted transition-colors">Next</button>
          </div>
        </div>
      </div>

      {/* ── VIEW DETAILS MODAL ── */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 bg-background/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-5 border-b bg-card">
              <div>
                <h2 className="font-semibold text-base">{selectedRequest.id} — {selectedRequest.item}</h2>
                <p className="text-muted-foreground text-xs mt-0.5">{selectedRequest.date}</p>
              </div>
              <button onClick={closeModal} className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                <X size={15} />
              </button>
            </div>

            <div className="p-5 space-y-6">

              {/* ── SECTION 1: REQUEST DETAILS ── */}
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden border h-56 bg-muted relative">
                  <Image src={selectedRequest.imageUrl} alt="Reference" fill className="object-cover" />
                </div>

                {/* Customer + Request Info — aligned sa client data */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Customer</p>
                    <p className="text-sm font-medium mt-0.5">{selectedRequest.customer}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Email</p>
                    <p className="text-sm font-medium mt-0.5">{selectedRequest.email}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium mt-0.5">{selectedRequest.phone}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Item</p>
                    <p className="text-sm font-medium mt-0.5">{selectedRequest.item}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Dimensions</p>
                    <p className="text-sm font-medium mt-0.5">{selectedRequest.dimensions}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Wood Type</p>
                    <p className="text-sm font-medium mt-0.5">{selectedRequest.woodType}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Budget Range</p>
                    <p className="text-sm font-medium mt-0.5">{selectedRequest.budget}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Status</p>
                    <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[selectedRequest.status]}`}>
                      {selectedRequest.status}
                    </span>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">Customer Message</p>
                  <p className="text-sm bg-muted/50 rounded-lg p-3 leading-relaxed">{selectedRequest.message}</p>
                </div>

                {/* Quote banner — show if already quoted */}
                {selectedRequest.quote && (
                  <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg px-4 py-3">
                    <p className="text-[10px] uppercase tracking-widest text-green-600 dark:text-green-400 font-medium">Quoted Price</p>
                    <p className="text-xl font-semibold text-green-700 dark:text-green-300 mt-0.5">
                      ₱{selectedRequest.quote.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Customer budget: {selectedRequest.budget}</p>
                  </div>
                )}
              </div>

              <div className="border-t" />

              {/* ── SECTION 2: REQUIRED MATERIALS ── */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TreePine size={14} className="text-muted-foreground" />
                    <p className="text-sm font-semibold">Required Materials</p>
                  </div>
                  {!isTerminal(selectedRequest.status) && (
                    <button onClick={addMaterialRow} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                      <Plus size={13} />Add Material
                    </button>
                  )}
                </div>

                <p className="text-xs text-muted-foreground">
                  Select materials from inventory to use for this request. Helps track stock and compute the quote.
                </p>

                {materialRows.length > 0 ? (
                  <div className="space-y-2">
                    <div className="grid grid-cols-12 gap-2 px-1">
                      <p className="col-span-6 text-[10px] uppercase tracking-widest text-muted-foreground">Material</p>
                      <p className="col-span-3 text-[10px] uppercase tracking-widest text-muted-foreground">Qty</p>
                      <p className="col-span-2 text-[10px] uppercase tracking-widest text-muted-foreground">Stock</p>
                      <p className="col-span-1" />
                    </div>

                    {materialRows.map((row, index) => {
                      const mat = inventoryMaterials.find(m => m.id === row.materialId);
                      const qty = parseFloat(row.quantity) || 0;
                      const isOverStock = qty > (mat?.stock ?? 0);
                      return (
                        <div key={index} className="grid grid-cols-12 gap-2 items-center">
                          <div className="col-span-6 relative">
                            <select
                              value={row.materialId}
                              onChange={(e) => updateMaterialRow(index, "materialId", e.target.value)}
                              disabled={isTerminal(selectedRequest.status)}
                              className="w-full h-9 px-2 pr-7 text-xs border bg-background rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-ring text-foreground disabled:opacity-60"
                            >
                              {inventoryMaterials.map(m => (
                                <option key={m.id} value={m.id}>{m.name}</option>
                              ))}
                            </select>
                            <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                          </div>
                          <div className="col-span-3">
                            <Input
                              type="number"
                              value={row.quantity}
                              onChange={(e) => updateMaterialRow(index, "quantity", e.target.value)}
                              disabled={isTerminal(selectedRequest.status)}
                              placeholder="0"
                              className={`h-9 text-xs ${isOverStock ? "border-red-400 focus-visible:ring-red-400" : ""}`}
                            />
                          </div>
                          <div className="col-span-2">
                            <span className={`text-[10px] font-medium ${
                              (mat?.stock ?? 0) === 0 ? "text-red-500"
                                : isOverStock ? "text-red-500"
                                : (mat?.stock ?? 0) <= 10 ? "text-yellow-500"
                                : "text-green-600 dark:text-green-400"
                            }`}>
                              {mat?.stock ?? 0} {mat?.unit?.split(" ")[0]}
                            </span>
                          </div>
                          <div className="col-span-1 flex justify-end">
                            {!isTerminal(selectedRequest.status) && (
                              <button onClick={() => removeMaterialRow(index)} className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-red-500">
                                <Trash2 size={12} />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {materialRows.some(row => {
                      const mat = inventoryMaterials.find(m => m.id === row.materialId);
                      return (parseFloat(row.quantity) || 0) > (mat?.stock ?? 0);
                    }) && (
                      <p className="text-xs text-red-500">⚠ Some quantities exceed current stock.</p>
                    )}
                  </div>
                ) : (
                  <div className="border border-dashed rounded-lg py-6 flex flex-col items-center gap-2 text-center">
                    <TreePine size={20} className="text-muted-foreground/30" strokeWidth={1.5} />
                    <p className="text-xs text-muted-foreground">No materials added yet.</p>
                    {!isTerminal(selectedRequest.status) && (
                      <button onClick={addMaterialRow} className="text-xs text-foreground underline hover:opacity-70">Add a material</button>
                    )}
                  </div>
                )}

                {materialRows.length > 0 && (
                  <div className="bg-muted/30 rounded-lg px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calculator size={13} className="text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Estimated Material Cost</p>
                    </div>
                    <p className="text-sm font-semibold">₱{materialCost.toLocaleString()}</p>
                  </div>
                )}

                {!isTerminal(selectedRequest.status) && materialRows.length > 0 && (
                  <button onClick={saveMaterials} className="w-full text-xs py-2 border rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground uppercase tracking-widest">
                    Save Materials
                  </button>
                )}
              </div>

              <div className="border-t" />

              {/* ── SECTION 3: QUOTE & ACTIONS ── */}
              <div className="space-y-3">
                {!isTerminal(selectedRequest.status) && !selectedRequest.quote && (
                  <div>
                    <p className="text-xs font-medium mb-2">Send Quote to Customer</p>
                    {materialRows.length > 0 && (
                      <p className="text-[11px] text-muted-foreground mb-2">
                        Estimated material cost: <span className="font-medium text-foreground">₱{materialCost.toLocaleString()}</span> — use as reference for your quote.
                      </p>
                    )}
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₱</span>
                        <Input type="number" placeholder="Enter quote amount" value={quoteInput} onChange={(e) => setQuoteInput(e.target.value)} className="pl-6" />
                      </div>
                      <Button onClick={() => handleSendQuote(selectedRequest.id)}>
                        <Send size={14} className="mr-1" />Send
                      </Button>
                    </div>
                  </div>
                )}

                {!isTerminal(selectedRequest.status) && (
                  <div className="flex gap-2">
                    <select
                      value={selectedRequest.status}
                      onChange={(e) => handleUpdateStatus(selectedRequest.id, e.target.value as RequestStatus)}
                      className="flex-1 text-sm border bg-card rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-muted-foreground"
                    >
                      {allStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <Button variant="destructive" onClick={() => handleReject(selectedRequest.id)}>
                      <X size={14} className="mr-1" />Reject
                    </Button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}