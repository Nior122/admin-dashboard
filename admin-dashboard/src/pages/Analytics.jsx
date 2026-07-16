import { useState } from "react";
import ChartCard from "../components/ChartCard.jsx";
import { revenueByDay, busiestHours, bookingsByCategory, business } from "../data/dashboardConfig.js";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell } from "recharts";
import { motion } from "framer-motion";

const formatCurrency = (n) => business.currency + Number(n).toLocaleString();
const COLORS = ["#da7320", "#a14314", "#ecaf75", "#6c2e16"];

function ThemedTooltip({ active, payload, label, formatter }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-4 py-3" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-default)", boxShadow: "var(--shadow-elevated)" }}>
      <div className="text-[11px] font-semibold mb-1" style={{ color: "var(--text-muted)" }}>
        {label ? (typeof label === "string" && label.includes(":") ? label : new Date(label).toLocaleDateString("en-NG", { day: "numeric", month: "short" })) : ""}
      </div>
      {payload.map((p, i) => (
        <div key={i} className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
          {formatter ? formatter(p.value, p.name) : p.value}
        </div>
      ))}
    </div>
  );
}

export default function Analytics() {
  const [dateRange, setDateRange] = useState("30d");
  const rangeMap = { "7d": 7, "30d": 30, "90d": 90 };
  const slice = revenueByDay.slice(-rangeMap[dateRange]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>Analytics</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>Performance trends and business insights</p>
        </div>
        <div className="flex gap-2">
          {["7d", "30d", "90d"].map((r) => (
            <button
              key={r}
              onClick={() => setDateRange(r)}
              className="rounded-xl px-4 py-2 text-xs font-bold transition-all duration-150"
              style={{
                background: dateRange === r ? "#da7320" : "var(--bg-input)",
                color: dateRange === r ? "#fff" : "var(--text-secondary)",
                border: dateRange === r ? "none" : "1px solid var(--border-default)",
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <ChartCard title="Revenue Over Time">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={slice}>
                <defs>
                  <linearGradient id="areaGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#da7320" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#da7320" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" style={{ stroke: "var(--chart-grid)" }} />
                <XAxis dataKey="date" tickFormatter={(d) => new Date(d).getDate()} tick={{ fontSize: 11, fill: "var(--chart-label)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--chart-label)" }} axisLine={false} tickLine={false} tickFormatter={(v) => (v / 1000).toFixed(0) + "k"} />
                <Tooltip content={<ThemedTooltip formatter={(v) => [formatCurrency(v), "Revenue"]} />} />
                <Area type="monotone" dataKey="revenue" stroke="#da7320" strokeWidth={2} fill="url(#areaGrad2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Busiest Hours">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={busiestHours}>
                <CartesianGrid strokeDasharray="3 3" style={{ stroke: "var(--chart-grid)" }} vertical={false} />
                <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "var(--chart-label)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--chart-label)" }} axisLine={false} tickLine={false} />
                <Tooltip content={<ThemedTooltip formatter={(v) => v + " bookings"} />} />
                <Bar dataKey="value" name="Bookings" radius={[6, 6, 0, 0]}>
                  {busiestHours.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <ChartCard title="Bookings by Service Type">
          <div className="flex flex-col gap-3">
            {bookingsByCategory.map((item, i) => (
              <motion.div key={item.category} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2, delay: 0.2 + i * 0.06 }} className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="flex-1 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{item.category}</span>
                <span className="font-tabular text-sm font-bold" style={{ color: "var(--text-primary)" }}>{item.value}</span>
              </motion.div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Top Performing Services">
          <div className="flex flex-col gap-2.5">
            {[
              { name: "Bridal Package", revenue: business.currency + "425,000", bookings: 5 },
              { name: "Full Body Massage", revenue: business.currency + "325,000", bookings: 13 },
              { name: "Signature Facial", revenue: business.currency + "285,000", bookings: 19 },
              { name: "Loc Retwist", revenue: business.currency + "252,000", bookings: 14 },
              { name: "Blow Dry & Style", revenue: business.currency + "210,000", bookings: 21 },
            ].map((svc, i) => (
              <div key={svc.name} className="flex items-center gap-3 rounded-xl px-3 py-2.5" style={{ background: "var(--bg-hover)" }}>
                <span className="flex h-7 w-7 items-center justify-center rounded-lg text-[11px] font-bold" style={{ background: "rgba(218,115,32,0.12)", color: "#da7320" }}>
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{svc.name}</div>
                  <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>{svc.bookings} bookings</div>
                </div>
                <span className="font-tabular text-sm font-bold" style={{ color: "var(--text-primary)" }}>{svc.revenue}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Customer Retention">
          <div className="flex flex-col gap-4 py-2">
            {[
              { label: "Repeat visit rate", value: "64%", note: "19 of 30 customers returned" },
              { label: "Avg. visits per customer", value: "4.8", note: "Up from 3.9 last quarter" },
              { label: "New vs returning", value: "36% / 64%", note: "Healthy acquisition-to-retention ratio" },
              { label: "Avg. time between visits", value: "18 days", note: "Goal: under 21 days" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>{stat.label}</div>
                <div className="mt-0.5 font-tabular text-xl font-bold" style={{ color: "var(--text-primary)" }}>{stat.value}</div>
                <div className="mt-0.5 text-[11px]" style={{ color: "var(--text-secondary)" }}>{stat.note}</div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
