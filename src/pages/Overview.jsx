import KPICard from "../components/KPICard.jsx";
import ChartCard from "../components/ChartCard.jsx";
import ActivityFeed from "../components/ActivityFeed.jsx";
import { revenueByDay, bookingsByCategory, bookings, business } from "../data/dashboardConfig.js";
import { useLiveValue, formatNaira } from "../hooks/useLiveValue.js";
import { useOutletContext } from "react-router-dom";
import { useState, useCallback } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, CartesianGrid,
} from "recharts";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const sparkRevenue = revenueByDay.slice(-7).map((d) => d.revenue);
const sparkBookings = revenueByDay.slice(-7).map((d) => d.bookings);

function ThemedTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl px-4 py-3"
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-default)",
        boxShadow: "var(--shadow-elevated)",
      }}
    >
      <div className="text-[11px] font-semibold mb-1" style={{ color: "var(--text-muted)" }}>
        {label ? new Date(label).toLocaleDateString("en-NG", { day: "numeric", month: "short" }) : ""}
      </div>
      {payload.map((p) => (
        <div key={p.dataKey} className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
          {p.dataKey === "revenue" ? formatNaira(p.value) : p.value + " bookings"}
        </div>
      ))}
    </div>
  );
}

export default function Overview() {
  const { liveItems, formatRelative } = useOutletContext();
  const [range, setRange] = useState(30);
  const slice = revenueByDay.slice(-range);

  const expenses = useLiveValue(1870000, {
    min: 1200000,
    max: 2400000,
    intervalMs: 9000,
    tick: useCallback(() => {
      const r = Math.random();
      return r < 0.55
        ? Math.round(Math.random() * 65000 + 10000)
        : -Math.round(Math.random() * 45000 + 5000);
    }, []),
  });

  const revenue = useLiveValue(2438500, {
    min: 1800000,
    max: 3200000,
    intervalMs: 8000,
    tick: useCallback(() => {
      const expDelta = expenses.prevValue - expenses.value;
      return Math.round(Math.random() * 40000 + 8000 + expDelta * 0.35);
    }, [expenses.prevValue, expenses.value]),
  });

  const weekBookings = useLiveValue(74, {
    min: 40,
    max: 130,
    intervalMs: 6500,
    tick: useCallback(() => Math.round(Math.random() * 4 - 1.5), []),
  });

  const newCustomers = useLiveValue(18, {
    min: 8,
    max: 55,
    intervalMs: 10500,
    tick: useCallback(() => Math.round(Math.random() * 3 - 1), []),
  });

  const avgBooking = useLiveValue(12650, {
    min: 7000,
    max: 22000,
    intervalMs: 5000,
    tick: useCallback(() => Math.round(Math.random() * 1200 - 400), []),
  });

  const netProfit = revenue.value - expenses.value;

  const [revenueSpark, setRevenueSpark] = useState(sparkRevenue);
  const [bookingSpark, setBookingSpark] = useState(sparkBookings);

  useState(() => {
    const interval = setInterval(() => {
      if (document.hidden) return;
      setRevenueSpark((prev) => [...prev.slice(-19), revenue.value]);
      setBookingSpark((prev) => [...prev.slice(-19), weekBookings.value]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  const cancelledCount = bookings.filter((b) => b.status === "cancelled").length;

  const revenueTrend = ((revenue.value - 2200000) / 2200000 * 100);
  const bookingTrend = ((weekBookings.value - 68) / 68 * 100);
  const customerTrend = ((newCustomers.value - 15) / 15 * 100);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>Overview</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>Operational snapshot for {business.name}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <KPICard label="Revenue (this month)" numericValue={revenue.value} trend={revenueTrend} sparkline={revenueSpark} delay={0} format={(v) => formatNaira(v)} />
        <KPICard label="Expenses (this month)" numericValue={expenses.value} trend={0} delay={0.05} format={(v) => formatNaira(v)} accent="danger" />
        <KPICard label="Net Profit" numericValue={netProfit} trend={netProfit > 0 ? 5.2 : -3.1} delay={0.1} format={(v) => formatNaira(v)} accent={netProfit >= 0 ? "success" : "danger"} />
        <KPICard label="Bookings (this week)" numericValue={weekBookings.value} trend={bookingTrend} sparkline={bookingSpark} delay={0.1} format={(v) => String(v)} />
        <KPICard label="New customers" numericValue={newCustomers.value} trend={customerTrend} delay={0.15} format={(v) => String(v)} />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <ChartCard title="Revenue & Bookings Trend" className="lg:col-span-2">
          <div className="mb-3 flex items-center gap-2">
            {[7, 30, 90].map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className="rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150"
                style={{
                  background: range === r ? "#da7320" : "var(--bg-input)",
                  color: range === r ? "#fff" : "var(--text-secondary)",
                  border: range === r ? "none" : "1px solid var(--border-default)",
                }}
              >
                {r}d
              </button>
            ))}
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={slice}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#da7320" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#da7320" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" style={{ stroke: "var(--chart-grid)" }} />
                <XAxis dataKey="date" tickFormatter={(d) => new Date(d).getDate()} tick={{ fontSize: 11, fill: "var(--chart-label)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--chart-label)" }} axisLine={false} tickLine={false} tickFormatter={(v) => (v / 1000).toFixed(0) + "k"} />
                <Tooltip content={<ThemedTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#da7320" strokeWidth={2} fill="url(#revGrad)" />
                <Area type="monotone" dataKey="bookings" stroke="#823618" strokeWidth={2} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Bookings by Category">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingsByCategory} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" style={{ stroke: "var(--chart-grid)" }} horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "var(--chart-label)" }} axisLine={false} tickLine={false} />
                <YAxis dataKey="category" type="category" tick={{ fontSize: 12, fill: "var(--text-primary)" }} axisLine={false} tickLine={false} width={70} />
                <Tooltip content={<ThemedTooltip />} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} fill="#da7320" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <ChartCard title="Needs Attention">
          <div className="flex flex-col gap-2.5">
            {[
              { label: pendingCount + " bookings awaiting confirmation", accent: "warning" },
              { label: cancelledCount + " cancelled bookings this period", accent: "danger" },
              { label: "Low stock: Conditioning Treatment bottles (3 left)", accent: "warning" },
              { label: "Staff schedule conflict: Kemi / Tunde on Saturday 10am", accent: "danger" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: 0.3 + i * 0.05 }}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium"
                style={{
                  background: item.accent === "warning" ? "rgba(249,144,7,0.08)" : "rgba(248,59,59,0.08)",
                  border: "1px solid " + (item.accent === "warning" ? "rgba(249,144,7,0.15)" : "rgba(248,59,59,0.15)"),
                  color: item.accent === "warning" ? "#f99007" : "#f83b3b",
                }}
              >
                <AlertTriangle className="h-4 w-4 shrink-0" />
                {item.label}
              </motion.div>
            ))}
          </div>
        </ChartCard>

        <ActivityFeed items={liveItems} formatRelative={formatRelative} />
      </div>
    </div>
  );
}
