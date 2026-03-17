"use client";

import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
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

const materialConsumptionData = [
  { name: "Mahogany", consumed: 240, remaining: 45, unit: "board ft" },
  { name: "Narra", consumed: 180, remaining: 120, unit: "board ft" },
  { name: "Pine", consumed: 95, remaining: 200, unit: "board ft" },
  { name: "Plywood", consumed: 85, remaining: 30, unit: "sheets" },
  { name: "Acacia Slab", consumed: 40, remaining: 8, unit: "pcs" },
  { name: "Fabric", consumed: 120, remaining: 60, unit: "meters" },
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Analytics</h1>
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

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Order Analytics" subtitle="Breakdown by order status">
          <ResponsiveContainer width="100%" height={250}>
            {/* Idinagdag ang layout="vertical" at inadjust ang margin para sa labels */}
            <BarChart 
              data={orderStatusData} 
              layout="vertical" 
              margin={{ left: -15, right: 30, top: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={true} vertical={false} />
              
              {/* XAxis ngayon ang magpapakita ng values */}
              <XAxis type="number" hide />
              
              {/* YAxis ang magpapakita ng names (Delivered, Shipped, etc.) */}
              <YAxis 
                dataKey="name" 
                type="category" 
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                tickLine={false}
                axisLine={false}
                width={80}
              />
              
              <Tooltip
                contentStyle={{ 
                  backgroundColor: "var(--card)", 
                  border: "1px solid var(--border)", 
                  borderRadius: "8px", 
                  fontSize: "12px" 
                }}
                labelStyle={{ color: "var(--foreground)" }} 
                itemStyle={{ color: "var(--foreground)" }} 
                cursor={{ fill: "var(--muted)", opacity: 0.4 }}
              />
              
              {/* Isang Bar lang pero gagamit tayo ng Cell para sa iba-ibang kulay */}
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                {orderStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Raw Material Consumption" subtitle="Consumed vs remaining stock">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={materialConsumptionData} barSize={16} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
              <Tooltip
                formatter={(value: number, name: string) => [value, name === "consumed" ? "Consumed" : "Remaining"]}
                contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "12px" }}
                cursor={{ fill: "var(--muted)", opacity: 0.4 }}
              />
              <Legend formatter={(value) => value === "consumed" ? "Consumed" : "Remaining"} wrapperStyle={{ fontSize: "11px" }} />
              <Bar dataKey="consumed" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="remaining" fill="var(--muted-foreground)" opacity={0.4} radius={[4, 4, 0, 0]} />
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