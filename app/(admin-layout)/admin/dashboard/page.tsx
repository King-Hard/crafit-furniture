"use client";

import { ArrowRightLeft, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const transactions = [
  { id: 1, name: "Maria Santos", type: "Payment", amount: 5000, date: "Mar 9, 2026", status: "completed" },
  { id: 2, name: "Juan dela Cruz", type: "Refund", amount: -1200, date: "Mar 9, 2026", status: "refunded" },
  { id: 3, name: "Ana Reyes", type: "Payment", amount: 3500, date: "Mar 8, 2026", status: "completed" },
  { id: 4, name: "Carlo Bautista", type: "Payment", amount: 8000, date: "Mar 8, 2026", status: "pending" },
  { id: 5, name: "Luz Gomez", type: "Payment", amount: 2100, date: "Mar 7, 2026", status: "completed" },
];

const itemSold = [
  { id: 1, name: "Mahogany Dining Table", price: 18500, sold: 12 },
  { id: 2, name: "L-Shape Sofa", price: 24000, sold: 8 },
  { id: 3, name: "Queen Bed Frame", price: 12000, sold: 15 },
  { id: 4, name: "Office Chair", price: 4500, sold: 24 },
  { id: 5, name: "Wooden Bookshelf", price: 6800, sold: 10 },
];

// Derive active customers per day from transactions
const customersByDate = Object.values(
  transactions.reduce((acc, tx) => {
    const date = tx.date;
    if (!acc[date]) acc[date] = { date, customers: new Set() };
    acc[date].customers.add(tx.name);
    return acc;
  }, {} as Record<string, { date: string; customers: Set<string> }>)
)
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  .map(({ date, customers }) => ({ date, customers: customers.size }));

const stats = [
  { label: "Total Revenue", value: "₱40,000", icon: TrendingUp },
  { label: "Total Transactions", value: "14", icon: ArrowRightLeft },
  { label: "Active Customers", value: "128", icon: Users },
];

const statusStyles: Record<string, string> = {
  completed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  refunded: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

type DateFilter = "Today" | "This Week" | "This Month";

function isWithinFilter(dateStr: string, filter: DateFilter): boolean {
  const txDate = new Date(dateStr);
  const now = new Date("Mar 9, 2026"); // mock current date
  if (filter === "Today") {
    return txDate.toDateString() === now.toDateString();
  }
  if (filter === "This Week") {
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 7);
    return txDate >= weekAgo && txDate <= now;
  }
  if (filter === "This Month") {
    return txDate.getMonth() === now.getMonth() && txDate.getFullYear() === now.getFullYear();
  }
  return true;
}

export default function Dashboard() {
  const [dateFilter, setDateFilter] = useState<DateFilter>("This Month");

  const filteredTransactions = transactions.filter((tx) =>
    isWithinFilter(tx.date, dateFilter)
  );

  return (
    <div className="space-y-5">
      {/* Stat Cards */}
      <section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="border bg-card p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <h1 className="text-muted-foreground text-base font-medium">{label}</h1>
              <div className="bg-muted p-1.5 rounded-md">
                <Icon size={15} strokeWidth={2} className="text-muted-foreground" />
              </div>
            </div>
            <p className="text-2xl font-semibold">{value}</p>
          </div>
        ))}
      </section>

      {/* Active Customers Chart */}
      <section className="border bg-card rounded-lg p-5">
        <div className="mb-4">
          <h2 className="font-medium text-base">Active Customers</h2>
          <p className="text-muted-foreground text-xs mt-0.5">Unique customers per day with transactions</p>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={customersByDate} barSize={30} margin={{ left: -45 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 14, fill: "var(--muted-foreground)" }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
              tickFormatter={(v) => `${v}`}
            />
            <Tooltip
              formatter={(value: number) => [`${value} customer${value !== 1 ? "s" : ""}`, "Active"]}
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",  
                borderRadius: "8px",
                fontSize: "12px",
              }}
              cursor={{ fill: "var(--muted)", opacity: 0.4 }}
            />
            <Bar dataKey="customers" fill="var(--primary)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* Recent Transactions + Best Sellings */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Recent Transactions */}
        <div className="border bg-card rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-medium text-base">Recent Transactions</h2>
              <p className="text-muted-foreground text-xs mt-0.5">
                {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? "s" : ""} — {dateFilter}
              </p>
            </div>
            <div className="flex items-center gap-1">
              {(["Today", "This Week", "This Month"] as DateFilter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setDateFilter(f)}
                  className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                    dateFilter === f
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted border"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground text-xs">
                  <th className="text-left pb-2 font-medium">Customer</th>
                  <th className="text-left pb-2 font-medium">Type</th>
                  <th className="text-left pb-2 font-medium">Date</th>
                  <th className="text-right pb-2 font-medium">Amount</th>
                  <th className="text-right pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-muted/40 transition-colors">
                      <td className="py-3 font-medium">{tx.name}</td>
                      <td className="py-3 text-muted-foreground">{tx.type}</td>
                      <td className="py-3 text-muted-foreground">{tx.date}</td>
                      <td className={`py-3 text-right font-medium ${tx.amount < 0 ? "text-red-500" : ""}`}>
                        {tx.amount < 0 ? `-₱${Math.abs(tx.amount).toLocaleString()}` : `₱${tx.amount.toLocaleString()}`}
                      </td>
                      <td className="py-3 text-right">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusStyles[tx.status]}`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-muted-foreground text-xs">
                      No transactions found for {dateFilter.toLowerCase()}.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Best Sellings */}
        <div className="border bg-card rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-medium text-base">Best Sellings</h2>
              <p className="text-muted-foreground text-xs mt-0.5">Top 5 selling products</p>
            </div>
            <button className="text-xs text-muted-foreground border rounded-md px-3 py-1.5 hover:bg-muted transition-colors">
              View all
            </button>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground text-xs">
                  <th className="text-left pb-2 font-medium">Product</th>
                  <th className="text-left pb-2 font-medium">Price</th>
                  <th className="text-left pb-2 font-medium">Sold</th>
                  <th className="text-right pb-2 font-medium">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {itemSold.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/40 transition-colors">
                    <td className="py-3 font-medium">{item.name}</td>
                    <td className="py-3 text-muted-foreground">₱{item.price.toLocaleString()}</td>
                    <td className="py-3 text-muted-foreground">{item.sold}</td>
                    <td className="py-3 text-right font-medium">₱{(item.price * item.sold).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </section>
    </div>
  );
}