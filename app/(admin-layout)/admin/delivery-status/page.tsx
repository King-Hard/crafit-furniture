"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Search, Truck, UserCheck, X } from "lucide-react";
import { useState } from "react";

type DeliveryStatus = "Preparing" | "Out for Delivery" | "Delivered" | "Rescheduled" | "Failed Delivery";

interface Delivery {
  id: string;
  orderId: string;
  customer: string;
  address: string;
  area: string;
  driver: string | null;
  scheduledDate: string;
  status: DeliveryStatus;
  items: string;
  notes?: string;
}

const drivers = [
  "Dodong Reyes",
  "Manny Cruz",
  "Edgar Santos",
  "Boy Dela Torre",
  "Romy Bautista",
];

const initialDeliveries: Delivery[] = [
  { id: "DEL-001", orderId: "ORD-001", customer: "Maria Santos", address: "123 Rizal St., Baliuag", area: "Baliuag", driver: "Dodong Reyes", scheduledDate: "Mar 10, 2026", status: "Out for Delivery", items: "Mahogany Dining Table x1" },
  { id: "DEL-002", orderId: "ORD-002", customer: "Juan dela Cruz", address: "45 Mabini Ave., San Fernando, Pampanga", area: "Pampanga", driver: "Manny Cruz", scheduledDate: "Mar 10, 2026", status: "Preparing", items: "L-Shape Sofa x1" },
  { id: "DEL-003", orderId: "ORD-003", customer: "Ana Reyes", address: "78 Bonifacio St., Baliuag", area: "Baliuag", driver: null, scheduledDate: "Mar 11, 2026", status: "Preparing", items: "Office Chair x2, Bookshelf x1" },
  { id: "DEL-004", orderId: "ORD-004", customer: "Carlo Bautista", address: "12 Del Pilar St., Angeles, Pampanga", area: "Pampanga", driver: "Edgar Santos", scheduledDate: "Mar 9, 2026", status: "Delivered", items: "Queen Bed Frame x1" },
  { id: "DEL-005", orderId: "ORD-005", customer: "Luz Gomez", address: "56 Luna St., Baliuag", area: "Baliuag", driver: "Boy Dela Torre", scheduledDate: "Mar 8, 2026", status: "Failed Delivery", items: "Wardrobe Cabinet x1", notes: "Walang tao sa bahay nung dumating." },
  { id: "DEL-006", orderId: "ORD-006", customer: "Ramon Dela Torre", address: "90 Aguinaldo St., Mabalacat, Pampanga", area: "Pampanga", driver: "Romy Bautista", scheduledDate: "Mar 12, 2026", status: "Rescheduled", items: "Coffee Table x1", notes: "Customer requested reschedule to Mar 14." },
  { id: "DEL-007", orderId: "ORD-007", customer: "Sofia Villanueva", address: "34 Quezon St., Baliuag", area: "Baliuag", driver: null, scheduledDate: "Mar 13, 2026", status: "Preparing", items: "Study Desk x1, Dining Chair x4" },
];

const statusStyles: Record<DeliveryStatus, string> = {
  "Preparing": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  "Out for Delivery": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Delivered": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  "Rescheduled": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  "Failed Delivery": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const allStatuses: DeliveryStatus[] = ["Preparing", "Out for Delivery", "Delivered", "Rescheduled", "Failed Delivery"];

export default function DeliveryStatus() {
  const [deliveries, setDeliveries] = useState<Delivery[]>(initialDeliveries);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<DeliveryStatus | "All">("All");
  const [areaFilter, setAreaFilter] = useState<"All" | "Baliuag" | "Pampanga">("All");
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [assigningId, setAssigningId] = useState<string | null>(null);

  const filtered = deliveries.filter((d) => {
    const matchSearch =
      d.customer.toLowerCase().includes(search.toLowerCase()) ||
      d.orderId.toLowerCase().includes(search.toLowerCase()) ||
      d.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || d.status === statusFilter;
    const matchArea = areaFilter === "All" || d.area === areaFilter;
    return matchSearch && matchStatus && matchArea;
  });

  function handleAssignDriver(id: string, driver: string) {
    setDeliveries((prev) => prev.map((d) => d.id === id ? { ...d, driver } : d));
    setAssigningId(null);
    setSelectedDelivery((prev) => prev ? { ...prev, driver } : null);
  }

  function handleUpdateStatus(id: string, status: DeliveryStatus) {
    setDeliveries((prev) => prev.map((d) => d.id === id ? { ...d, status } : d));
    setSelectedDelivery((prev) => prev ? { ...prev, status } : null);
  }

  const isTerminal = (status: DeliveryStatus) => status === "Delivered";

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Delivery Status</h1>
        <p className="text-muted-foreground text-sm mt-0.5">{deliveries.length} deliveries total</p>
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
          onChange={(e) => setStatusFilter(e.target.value as DeliveryStatus | "All")}
          className="text-sm border bg-card rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-muted-foreground"
        >
          <option value="All">All Status</option>
          {allStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select
          value={areaFilter}
          onChange={(e) => setAreaFilter(e.target.value as "All" | "Baliuag" | "Pampanga")}
          className="text-sm border bg-card rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-muted-foreground"
        >
          <option value="All">All Areas</option>
          <option value="Baliuag">Baliuag</option>
          <option value="Pampanga">Pampanga</option>
        </select>
      </div>

      {/* Table */}
      <div className="border bg-card rounded-lg overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-muted-foreground text-xs bg-muted/40">
                <th className="text-left px-4 py-3 font-medium">Delivery ID</th>
                <th className="text-left px-4 py-3 font-medium">Order ID</th>
                <th className="text-left px-4 py-3 font-medium">Customer</th>
                <th className="text-left px-4 py-3 font-medium">Area</th>
                <th className="text-left px-4 py-3 font-medium">Scheduled</th>
                <th className="text-left px-4 py-3 font-medium">Driver</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length > 0 ? (
                filtered.map((delivery) => (
                  <tr key={delivery.id} className="hover:bg-muted/40 transition-colors">
                    <td className="px-4 py-3 text-muted-foreground font-medium">{delivery.id}</td>
                    <td className="px-4 py-3 text-muted-foreground">{delivery.orderId}</td>
                    <td className="px-4 py-3 font-medium">{delivery.customer}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${delivery.area === "Baliuag" ? "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400" : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"}`}>
                        {delivery.area}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{delivery.scheduledDate}</td>
                    <td className="px-4 py-3">
                      {assigningId === delivery.id ? (
                        <select
                          autoFocus
                          defaultValue={delivery.driver ?? ""}
                          onChange={(e) => handleAssignDriver(delivery.id, e.target.value)}
                          onBlur={() => setAssigningId(null)}
                          className="text-xs border bg-card rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                          <option value="" disabled>Select driver</option>
                          {drivers.map((d) => <option key={d} value={d}>{d}</option>)}
                        </select>
                      ) : (
                        <span className={`text-sm ${delivery.driver ? "" : "text-muted-foreground italic"}`}>
                          {delivery.driver ?? "Unassigned"}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[delivery.status]}`}>
                        {delivery.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          title="View Details"
                          onClick={() => setSelectedDelivery(delivery)}
                          className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          title="Assign Driver"
                          onClick={() => setAssigningId(delivery.id)}
                          disabled={isTerminal(delivery.status)}
                          className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <UserCheck size={15} />
                        </button>
                        <button
                          title="Mark as Delivered"
                          onClick={() => handleUpdateStatus(delivery.id, "Delivered")}
                          disabled={isTerminal(delivery.status) || delivery.status === "Failed Delivery"}
                          className="p-1.5 rounded-md hover:bg-green-50 dark:hover:bg-green-950/30 transition-colors text-muted-foreground hover:text-green-600 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <Truck size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground text-xs">
                    No deliveries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t px-4 py-3 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Showing {filtered.length} of {deliveries.length} deliveries
          </p>
          <div className="flex items-center gap-1">
            <button className="text-xs px-2.5 py-1 border rounded-md text-muted-foreground hover:bg-muted transition-colors">Previous</button>
            <button className="text-xs px-2.5 py-1 border rounded-md bg-primary text-primary-foreground">1</button>
            <button className="text-xs px-2.5 py-1 border rounded-md text-muted-foreground hover:bg-muted transition-colors">Next</button>
          </div>
        </div>
      </div>

      {/* View Details Modal */}
      {selectedDelivery && (
        <div className="fixed inset-0 z-50 bg-background/50 flex items-center justify-center p-4">
          <div className="bg-card border rounded-xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-5 border-b">
              <div>
                <h2 className="font-semibold text-base">{selectedDelivery.id}</h2>
                <p className="text-muted-foreground text-xs mt-0.5">{selectedDelivery.orderId}</p>
              </div>
              <Button 
                variant="outline"
                size="icon-sm"
                onClick={() => setSelectedDelivery(null)}
              >
                <X/>
              </Button>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Customer</p>
                  <p className="text-sm font-medium">{selectedDelivery.customer}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Area</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${selectedDelivery.area === "Baliuag" ? "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400" : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"}`}>
                    {selectedDelivery.area}
                  </span>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground mb-1">Address</p>
                  <p className="text-sm font-medium">{selectedDelivery.address}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Scheduled Date</p>
                  <p className="text-sm font-medium">{selectedDelivery.scheduledDate}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Driver</p>
                  <p className={`text-sm font-medium ${!selectedDelivery.driver ? "text-muted-foreground italic" : ""}`}>
                    {selectedDelivery.driver ?? "Unassigned"}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground mb-1">Items</p>
                  <p className="text-sm font-medium">{selectedDelivery.items}</p>
                </div>
                {selectedDelivery.notes && (
                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground mb-1">Notes</p>
                    <p className="text-sm bg-muted/50 rounded-lg p-3">{selectedDelivery.notes}</p>
                  </div>
                )}
              </div>

              {/* Status + Actions */}
              {!isTerminal(selectedDelivery.status) && (
                <div className="flex gap-2 pt-1">
                  <select
                    value={selectedDelivery.status}
                    onChange={(e) => handleUpdateStatus(selectedDelivery.id, e.target.value as DeliveryStatus)}
                    className="flex-1 text-sm border bg-card rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-muted-foreground"
                  >
                    {allStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <select
                    value={selectedDelivery.driver ?? ""}
                    onChange={(e) => handleAssignDriver(selectedDelivery.id, e.target.value)}
                    className="flex-1 text-sm border bg-card rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-muted-foreground"
                  >
                    <option value="" disabled>Assign driver</option>
                    {drivers.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}