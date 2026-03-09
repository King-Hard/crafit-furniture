"use client";

import { Input } from "@/components/ui/input";
import { Eye, Pencil, ShieldBan, Search } from "lucide-react";
import { useState } from "react";

type CustomerStatus = "Active" | "Inactive" | "Banned";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  dateJoined: string;
  status: CustomerStatus;
}

const initialCustomers: Customer[] = [
  { id: "CUS-001", name: "Maria Santos", email: "maria@email.com", phone: "0917-123-4567", totalOrders: 5, totalSpent: 87500, dateJoined: "Jan 12, 2025", status: "Active" },
  { id: "CUS-002", name: "Juan dela Cruz", email: "juan@email.com", phone: "0918-234-5678", totalOrders: 2, totalSpent: 24000, dateJoined: "Feb 3, 2025", status: "Active" },
  { id: "CUS-003", name: "Ana Reyes", email: "ana@email.com", phone: "0919-345-6789", totalOrders: 8, totalSpent: 142000, dateJoined: "Nov 20, 2024", status: "Active" },
  { id: "CUS-004", name: "Carlo Bautista", email: "carlo@email.com", phone: "0920-456-7890", totalOrders: 1, totalSpent: 18500, dateJoined: "Mar 1, 2026", status: "Inactive" },
  { id: "CUS-005", name: "Luz Gomez", email: "luz@email.com", phone: "0921-567-8901", totalOrders: 3, totalSpent: 31200, dateJoined: "Dec 5, 2024", status: "Active" },
  { id: "CUS-006", name: "Ramon Dela Torre", email: "ramon@email.com", phone: "0922-678-9012", totalOrders: 0, totalSpent: 0, dateJoined: "Mar 6, 2026", status: "Inactive" },
  { id: "CUS-007", name: "Sofia Villanueva", email: "sofia@email.com", phone: "0923-789-0123", totalOrders: 12, totalSpent: 215000, dateJoined: "Aug 14, 2024", status: "Banned" },
];

const statusStyles: Record<CustomerStatus, string> = {
  Active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Inactive: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Banned: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CustomerStatus | "All">("All");

  const filtered = customers.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  function handleToggleBan(id: string) {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "Banned" ? "Active" : "Banned" }
          : c
      )
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Customers</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{customers.length} customers total</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, email, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as CustomerStatus | "All")}
          className="text-sm border bg-card rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-muted-foreground"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Banned">Banned</option>
        </select>
      </div>

      {/* Table */}
      <div className="border bg-card rounded-lg overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-muted-foreground text-xs bg-muted/40">
                <th className="text-left px-4 py-3 font-medium">Customer ID</th>
                <th className="text-left px-4 py-3 font-medium">Name</th>
                <th className="text-left px-4 py-3 font-medium">Email</th>
                <th className="text-left px-4 py-3 font-medium">Phone</th>
                <th className="text-left px-4 py-3 font-medium">Total Orders</th>
                <th className="text-left px-4 py-3 font-medium">Total Spent</th>
                <th className="text-left px-4 py-3 font-medium">Date Joined</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length > 0 ? (
                filtered.map((customer) => (
                  <tr key={customer.id} className="hover:bg-muted/40 transition-colors">
                    <td className="px-4 py-3 text-muted-foreground font-medium">{customer.id}</td>
                    <td className="px-4 py-3 font-medium">{customer.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{customer.email}</td>
                    <td className="px-4 py-3 text-muted-foreground">{customer.phone}</td>
                    <td className="px-4 py-3 text-muted-foreground">{customer.totalOrders} orders</td>
                    <td className="px-4 py-3 font-medium">
                      {customer.totalSpent > 0 ? `₱${customer.totalSpent.toLocaleString()}` : "—"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{customer.dateJoined}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[customer.status]}`}>
                        {customer.status}
                      </span>
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
                          title="Edit"
                          className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          title={customer.status === "Banned" ? "Unban" : "Ban"}
                          onClick={() => handleToggleBan(customer.id)}
                          className={`p-1.5 rounded-md transition-colors ${
                            customer.status === "Banned"
                              ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                              : "text-muted-foreground hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-500"
                          }`}
                        >
                          <ShieldBan size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-muted-foreground text-xs">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="border-t px-4 py-3 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Showing {filtered.length} of {customers.length} customers
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