import { useState } from "react";
import DataTable from "../components/DataTable.jsx";
import { customers as initialCustomers, bookings as allBookings, business } from "../data/dashboardConfig.js";
import { User, Phone, Mail, Calendar, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

export default function Customers() {
  const [customers] = useState(initialCustomers);
  const [selected, setSelected] = useState(null);

  const customerBookings = selected
    ? allBookings.filter((b) => b.customerId === selected.id)
    : [];

  const columns = [
    { key: "name", label: "Customer" },
    { key: "phone", label: "Phone", render: (v) => <span className="font-tabular">{v}</span> },
    { key: "email", label: "Email" },
    { key: "visits", label: "Visits", render: (v) => <span className="font-tabular font-semibold">{v}</span> },
    {
      key: "totalSpent",
      label: "Total Spent",
      render: (v) => <span className="font-tabular font-bold" style={{ color: "var(--text-primary)" }}>{business.currency}{v.toLocaleString()}</span>,
    },
    {
      key: "lastVisit",
      label: "Last Visit",
      render: (v) => new Date(v).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" }),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>Customers</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>Client directory and visit history</p>
      </div>

      <DataTable columns={columns} data={customers} onRowClick={setSelected} />

      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)", boxShadow: "var(--shadow-modal)" }}
          >
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid var(--border-default)" }}>
              <h2 className="text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>Customer Detail</h2>
              <button onClick={() => setSelected(null)} className="text-sm font-semibold" style={{ color: "var(--text-muted)" }}>Close</button>
            </div>

            <div className="grid grid-cols-2 gap-3 p-6">
              {[
                { icon: User, label: "Name", value: selected.name },
                { icon: Phone, label: "Phone", value: selected.phone },
                { icon: Mail, label: "Email", value: selected.email },
                { icon: Calendar, label: "Visits", value: selected.visits },
                { icon: DollarSign, label: "Total Spent", value: business.currency + selected.totalSpent.toLocaleString() },
                { icon: Calendar, label: "Last Visit", value: new Date(selected.lastVisit).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" }) },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 rounded-xl p-3" style={{ background: "var(--bg-hover)" }}>
                  <item.icon className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--text-muted)" }} />
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>{item.label}</div>
                    <div className="mt-0.5 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 pb-6">
              <h3 className="mb-3 text-sm font-bold" style={{ color: "var(--text-primary)" }}>Booking History</h3>
              {customerBookings.length === 0 ? (
                <div className="rounded-xl py-6 text-center text-sm" style={{ background: "var(--bg-hover)", color: "var(--text-muted)" }}>No bookings found.</div>
              ) : (
                <div className="max-h-48 overflow-y-auto rounded-xl scrollbar-thin" style={{ border: "1px solid var(--border-default)" }}>
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr style={{ borderBottom: "1px solid var(--border-default)", background: "var(--bg-elevated)" }}>
                        {["Service", "Date", "Price", "Status"].map((h) => (
                          <th key={h} className="px-3 py-2.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {customerBookings.map((b) => (
                        <tr key={b.id} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                          <td className="px-3 py-2.5 font-semibold" style={{ color: "var(--text-primary)" }}>{b.serviceName}</td>
                          <td className="px-3 py-2.5" style={{ color: "var(--text-secondary)" }}>{new Date(b.date).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}</td>
                          <td className="px-3 py-2.5 font-tabular font-semibold" style={{ color: "var(--text-primary)" }}>{business.currency}{b.price.toLocaleString()}</td>
                          <td className="px-3 py-2.5 capitalize" style={{ color: "var(--text-secondary)" }}>{b.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
