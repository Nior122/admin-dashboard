import { useState } from "react";
import DataTable from "../components/DataTable.jsx";
import Toast from "../components/Toast.jsx";
import { bookings as initialBookings, business } from "../data/dashboardConfig.js";
import { motion } from "framer-motion";

const statusColors = {
  pending: { bg: "rgba(249,144,7,0.1)", text: "#f99007", border: "rgba(249,144,7,0.2)" },
  confirmed: { bg: "rgba(218,115,32,0.1)", text: "#da7320", border: "rgba(218,115,32,0.2)" },
  completed: { bg: "rgba(34,196,98,0.1)", text: "#22c462", border: "rgba(34,196,98,0.2)" },
  cancelled: { bg: "rgba(248,59,59,0.1)", text: "#f83b3b", border: "rgba(248,59,59,0.2)" },
};

const modalInputStyle = {
  background: "var(--bg-input)",
  border: "1px solid var(--border-default)",
  color: "var(--text-primary)",
};

export default function Bookings() {
  const [bookings, setBookings] = useState(initialBookings);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);

  const filtered = statusFilter === "all" ? bookings : bookings.filter((b) => b.status === statusFilter);
  const tabs = ["all", "pending", "confirmed", "completed", "cancelled"];

  const updateStatus = (id, status) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    setSelected(null);
    setToast({ message: "Booking " + status + ".", type: status === "cancelled" ? "error" : "success" });
  };

  const columns = [
    { key: "customerName", label: "Customer" },
    {
      key: "date",
      label: "Date",
      render: (v) => new Date(v).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" }),
    },
    { key: "time", label: "Time" },
    { key: "serviceName", label: "Service" },
    {
      key: "price",
      label: "Price",
      render: (v) => <span className="font-tabular font-semibold">{business.currency}{v.toLocaleString()}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (v) => {
        const c = statusColors[v] || statusColors.pending;
        return (
          <span
            className="inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold capitalize"
            style={{ background: c.bg, color: c.text, border: "1px solid " + c.border }}
          >
            {v}
          </span>
        );
      },
    },
    { key: "staff", label: "Staff" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>Bookings</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>All customer appointments and walk-ins</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setStatusFilter(tab)}
            className="rounded-xl px-4 py-2 text-xs font-bold capitalize transition-all duration-150"
            style={{
              background: statusFilter === tab ? "#da7320" : "var(--bg-input)",
              color: statusFilter === tab ? "#fff" : "var(--text-secondary)",
              border: statusFilter === tab ? "none" : "1px solid var(--border-default)",
              boxShadow: statusFilter === tab ? "0 2px 8px rgba(218,115,32,0.25)" : "none",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <DataTable columns={columns} data={filtered} onRowClick={setSelected} />

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-2xl"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-default)",
              boxShadow: "var(--shadow-modal)",
            }}
          >
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid var(--border-default)" }}>
              <h2 className="text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>Booking Detail</h2>
              <button onClick={() => setSelected(null)} className="text-sm font-semibold" style={{ color: "var(--text-muted)" }}>Close</button>
            </div>

            <div className="grid grid-cols-2 gap-4 p-6 text-sm">
              {[
                { label: "Customer", value: selected.customerName },
                { label: "Service", value: selected.serviceName },
                { label: "Date & Time", value: new Date(selected.date).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" }) + " at " + selected.time },
                { label: "Staff", value: selected.staff },
                { label: "Price", value: business.currency + selected.price.toLocaleString() },
              ].map((item) => (
                <div key={item.label} className="rounded-xl p-3" style={{ background: "var(--bg-hover)" }}>
                  <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{item.label}</div>
                  <div className="mt-1 font-semibold" style={{ color: "var(--text-primary)" }}>{item.value}</div>
                </div>
              ))}
              <div className="rounded-xl p-3" style={{ background: "var(--bg-hover)" }}>
                <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Status</div>
                <span
                  className="mt-1 inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold capitalize"
                  style={{
                    background: statusColors[selected.status]?.bg,
                    color: statusColors[selected.status]?.text,
                    border: "1px solid " + statusColors[selected.status]?.border,
                  }}
                >
                  {selected.status}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 px-6 pb-6">
              {selected.status === "pending" && (
                <button onClick={() => updateStatus(selected.id, "confirmed")} className="rounded-xl bg-success-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-success-500/20 transition-all hover:bg-success-600">
                  Confirm
                </button>
              )}
              {selected.status !== "cancelled" && selected.status !== "completed" && (
                <button onClick={() => updateStatus(selected.id, "cancelled")} className="rounded-xl px-5 py-2.5 text-sm font-bold transition-all" style={{ border: "1px solid rgba(248,59,59,0.2)", background: "rgba(248,59,59,0.08)", color: "#f83b3b" }}>
                  Cancel Booking
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
