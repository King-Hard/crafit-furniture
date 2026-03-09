"use client";

import { Input } from "@/components/ui/input";
import { Eye, X, ChevronDown, Search } from "lucide-react";
import { useState } from "react";

type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
type PaymentStatus = "Paid" | "Unpaid" | "Refunded";

interface Order {
  id: string;
  customer: string;
  date: string;
  items: number;
  total: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
}

const initialOrders: Order[] = [
  { id: "ORD-001", customer: "Maria Santos", date: "Mar 9, 2026", items: 2, total: 23500, paymentStatus: "Paid", orderStatus: "Delivered" },
  { id: "ORD-002", customer: "Juan dela Cruz", date: "Mar 9, 2026", items: 1, total: 24000, paymentStatus: "Paid", orderStatus: "Shipped" },
  { id: "ORD-003", customer: "Ana Reyes", date: "Mar 8, 2026", items: 3, total: 37200, paymentStatus: "Unpaid", orderStatus: "Pending" },
  { id: "ORD-004", customer: "Carlo Bautista", date: "Mar 8, 2026", items: 1, total: 18500, paymentStatus: "Paid", orderStatus: "Processing" },
  { id: "ORD-005", customer: "Luz Gomez", date: "Mar 7, 2026", items: 2, total: 11300, paymentStatus: "Refunded", orderStatus: "Cancelled" },
  { id: "ORD-006", customer: "Ramon Dela Torre", date: "Mar 7, 2026", items: 1, total: 6800, paymentStatus: "Unpaid", orderStatus: "Pending" },
  { id: "ORD-007", customer: "Sofia Villanueva", date: "Mar 6, 2026", items: 4, total: 52000, paymentStatus: "Paid", orderStatus: "Delivered" },
];

const orderStatusStyles: Record<OrderStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Processing: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Shipped: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Delivered: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const paymentStatusStyles: Record<PaymentStatus, string> = {
  Paid: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Unpaid: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Refunded: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
};

const orderStatuses: OrderStatus[] = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "All">("All");
  const [paymentFilter, setPaymentFilter] = useState<PaymentStatus | "All">("All");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || o.orderStatus === statusFilter;
    const matchPayment = paymentFilter === "All" || o.paymentStatus === paymentFilter;
    return matchSearch && matchStatus && matchPayment;
  });

  function handleCancel(id: string) {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, orderStatus: "Cancelled" } : o))
    );
  }

  function handleUpdateStatus(id: string, status: OrderStatus) {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, orderStatus: status } : o))
    );
    setUpdatingId(null);
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Orders</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{orders.length} orders total</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by customer or order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as OrderStatus | "All")}
          className="text-sm border bg-card rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-muted-foreground"
        >
          <option value="All">All Order Status</option>
          {orderStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>

        <select
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value as PaymentStatus | "All")}
          className="text-sm border bg-card rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-muted-foreground"
        >
          <option value="All">All Payment Status</option>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
          <option value="Refunded">Refunded</option>
        </select>
      </div>

      {/* Table */}
      <div className="border bg-card rounded-lg overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-muted-foreground text-xs bg-muted/40">
                <th className="text-left px-4 py-3 font-medium">Order ID</th>
                <th className="text-left px-4 py-3 font-medium">Customer</th>
                <th className="text-left px-4 py-3 font-medium">Date</th>
                <th className="text-left px-4 py-3 font-medium">Items</th>
                <th className="text-left px-4 py-3 font-medium">Total Amount</th>
                <th className="text-left px-4 py-3 font-medium">Payment</th>
                <th className="text-left px-4 py-3 font-medium">Order Status</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length > 0 ? (
                filtered.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/40 transition-colors">
                    <td className="px-4 py-3 font-medium text-muted-foreground">{order.id}</td>
                    <td className="px-4 py-3 font-medium">{order.customer}</td>
                    <td className="px-4 py-3 text-muted-foreground">{order.date}</td>
                    <td className="px-4 py-3 text-muted-foreground">{order.items} {order.items > 1 ? "items" : "item"}</td>
                    <td className="px-4 py-3 font-medium">₱{order.total.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${paymentStatusStyles[order.paymentStatus]}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {updatingId === order.id ? (
                        <select
                          autoFocus
                          defaultValue={order.orderStatus}
                          onChange={(e) => handleUpdateStatus(order.id, e.target.value as OrderStatus)}
                          onBlur={() => setUpdatingId(null)}
                          className="text-xs border bg-card rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                          {orderStatuses.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      ) : (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${orderStatusStyles[order.orderStatus]}`}>
                          {order.orderStatus}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          title="View Details"
                          className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          title="Update Status"
                          onClick={() => setUpdatingId(order.id)}
                          disabled={order.orderStatus === "Cancelled"}
                          className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <ChevronDown size={15} />
                        </button>
                        <button
                          title="Cancel Order"
                          onClick={() => handleCancel(order.id)}
                          disabled={order.orderStatus === "Cancelled" || order.orderStatus === "Delivered"}
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
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="border-t px-4 py-3 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Showing {filtered.length} of {orders.length} orders
          </p>
          <div className="flex items-center gap-1">
            <button className="text-xs px-2.5 py-1 border rounded-md text-muted-foreground hover:bg-muted transition-colors">
              Previous
            </button>
            <button className="text-xs px-2.5 py-1 border rounded-md bg-primary text-primary-foreground">
              1
            </button>
            <button className="text-xs px-2.5 py-1 border rounded-md text-muted-foreground hover:bg-muted transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}