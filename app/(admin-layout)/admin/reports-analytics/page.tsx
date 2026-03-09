"use client";

import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { PiggyBank, ShoppingBag, Truck } from "lucide-react";
import { useState } from "react";

type DateRange = "This Week" | "This Month" | "This Year";

// --- Data ---
const netProfitData = {
  "This Week": 124500 - 58000,
  "This Month": 456000 - 210000,
  "This Year": 1820000 - 840000,
};

const orderStatusData = [
  { name: "Delivered", value: 42, color: "#22c55e" },
  { name: "Processing", value: 18, color: "#3b82f6" },
  { name: "Pending", value: 12, color: "#eab308" },
  { name: "Shipped", value: 15, color: "#a855f7" },
  { name: "Cancelled", value: 8, color: "#ef4444" },
];

const topProducts = [
  { name: "L-Shape Sofa", revenue: 192000, sold: 8 },
  { name: "Mahogany Dining", revenue: 222000, sold: 12 },
  { name: "Queen Bed Frame", revenue: 180000, sold: 15 },
  { name: "Office Chair", revenue: 108000, sold: 24 },
  { name: "Wooden Bookshelf", revenue: 68000, sold: 10 },
];

const customerData: Record<DateRange, { date: string; new: number; returning: number }[]> = {
  "This Week": [
    { date: "Mon", new: 3, returning: 8 },
    { date: "Tue", new: 5, returning: 12 },
    { date: "Wed", new: 2, returning: 6 },
    { date: "Thu", new: 7, returning: 15 },
    { date: "Fri", new: 4, returning: 10 },
    { date: "Sat", new: 6, returning: 9 },
    { date: "Sun", new: 1, returning: 4 },
  ],
  "This Month": [
    { date: "Week 1", new: 18, returning: 42 },
    { date: "Week 2", new: 24, returning: 55 },
    { date: "Week 3", new: 15, returning: 38 },
    { date: "Week 4", new: 29, returning: 61 },
  ],
  "This Year": [
    { date: "Jan", new: 45, returning: 120 },
    { date: "Feb", new: 38, returning: 98 },
    { date: "Mar", new: 62, returning: 145 },
    { date: "Apr", new: 51, returning: 132 },
    { date: "May", new: 74, returning: 168 },
    { date: "Jun", new: 58, returning: 155 },
    { date: "Jul", new: 89, returning: 201 },
    { date: "Aug", new: 72, returning: 178 },
    { date: "Sep", new: 95, returning: 220 },
    { date: "Oct", new: 81, returning: 195 },
    { date: "Nov", new: 108, returning: 245 },
    { date: "Dec", new: 124, returning: 280 },
  ],
};

const deliveryData = [
  { name: "Delivered", value: 68, color: "#22c55e" },
  { name: "Out for Delivery", value: 12, color: "#3b82f6" },
  { name: "Preparing", value: 10, color: "#eab308" },
  { name: "Rescheduled", value: 6, color: "#a855f7" },
  { name: "Failed", value: 4, color: "#ef4444" },
];

const customizeData = [
  { name: "Pending Review", value: 8, color: "#eab308" },
  { name: "Quoted", value: 12, color: "#3b82f6" },
  { name: "Approved", value: 9, color: "#22c55e" },
  { name: "In Production", value: 6, color: "#a855f7" },
  { name: "Completed", value: 24, color: "#10b981" },
  { name: "Rejected", value: 5, color: "#ef4444" },
];

const dateRanges: DateRange[] = ["This Week", "This Month", "This Year"];

function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="border bg-card rounded-lg p-5">
      <div className="mb-4">
        <h2 className="font-medium text-base">{title}</h2>
        {subtitle && <p className="text-muted-foreground text-xs mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

export default function Reports() {
  const [dateRange, setDateRange] = useState<DateRange>("This Week");

  const stats = [
    {
      label: "Net Profit",
      value: `₱${netProfitData[dateRange].toLocaleString()}`,
      icon: PiggyBank,
      sub: "Revenue minus expenses",
    },
    {
      label: "Total Orders",
      value: dateRange === "This Week" ? "24" : dateRange === "This Month" ? "95" : "1,240",
      icon: ShoppingBag,
      sub: "All order statuses",
    },
    {
      label: "Delivery Success Rate",
      value: "94%",
      icon: Truck,
      sub: "Delivered vs total",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Reports & Analytics</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Insights beyond your dashboard</p>
        </div>
        <div className="flex items-center gap-1 border rounded-lg p-1">
          {dateRanges.map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`text-xs px-3 py-1.5 rounded-md transition-colors ${
                dateRange === range
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* 3 Stat Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon, sub }) => (
          <div key={label} className="border bg-card p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-sm font-medium">{label}</p>
              <div className="bg-muted p-1.5 rounded-md">
                <Icon size={14} strokeWidth={2} className="text-muted-foreground" />
              </div>
            </div>
            <p className="text-2xl font-semibold">{value}</p>
            <p className="text-xs text-muted-foreground">{sub}</p>
          </div>
        ))}
      </section>

      {/* Order Analytics + Top Products */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Order Analytics" subtitle="Breakdown by order status">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={orderStatusData}
                cx="50%" cy="50%"
                innerRadius={60} outerRadius={90}
                paddingAngle={3} dataKey="value"
              >
                {orderStatusData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [value, name]}
                contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "12px" }}
              />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top Products" subtitle="By total revenue">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topProducts} layout="vertical" barSize={14} margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                tickLine={false} axisLine={false}
                tickFormatter={(v) => `₱${(v / 1000).toFixed(0)}k`}
              />
              <YAxis
                type="category" dataKey="name"
                tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                tickLine={false} axisLine={false} width={120}
              />
              <Tooltip
                formatter={(value: number) => [`₱${value.toLocaleString()}`, "Revenue"]}
                contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "12px" }}
                cursor={{ fill: "var(--muted)", opacity: 0.4 }}
              />
              <Bar dataKey="revenue" fill="var(--primary)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      {/* Customer Insights */}
      <ChartCard title="Customer Insights" subtitle="New vs returning customers">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={customerData[dateRange]} margin={{ left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickLine={false} axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickLine={false} axisLine={false}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "12px" }}
              cursor={{ stroke: "var(--border)" }}
            />
            <Legend wrapperStyle={{ fontSize: "11px" }} />
            <Line type="monotone" dataKey="new" stroke="var(--primary)" strokeWidth={2} dot={false} name="New Customers" />
            <Line type="monotone" dataKey="returning" stroke="var(--muted-foreground)" strokeWidth={2} dot={false} strokeDasharray="4 4" name="Returning" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Delivery Performance + Customize Requests */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Delivery Performance" subtitle="Breakdown by delivery status">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={deliveryData}
                cx="50%" cy="50%"
                innerRadius={60} outerRadius={90}
                paddingAngle={3} dataKey="value"
              >
                {deliveryData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [value, name]}
                contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "12px" }}
              />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Customize Requests" subtitle="Requests by status">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={customizeData}
                cx="50%" cy="50%"
                innerRadius={60} outerRadius={90}
                paddingAngle={3} dataKey="value"
              >
                {customizeData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [value, name]}
                contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "12px" }}
              />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>
    </div>
  );
}