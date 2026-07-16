import { useState } from "react";
import { business as initialBusiness, staff as initialStaff } from "../data/dashboardConfig.js";
import Toast from "../components/Toast.jsx";
import { motion } from "framer-motion";
import { Save, Plus, Trash2, User, Clock, Bell, Building2 } from "lucide-react";

const inputStyle = {
  background: "var(--bg-input)",
  border: "1px solid var(--border-default)",
  color: "var(--text-primary)",
};

export default function Settings() {
  const [biz, setBiz] = useState(initialBusiness);
  const [staffList, setStaffList] = useState(initialStaff);
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState({
    newBooking: true,
    cancellation: true,
    lowStock: true,
    dailyReport: false,
    weeklyReport: true,
  });

  const tabs = [
    { id: "profile", label: "Business Profile", icon: Building2 },
    { id: "staff", label: "Staff", icon: User },
    { id: "hours", label: "Hours", icon: Clock },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  const save = () => setToast({ message: "Settings saved successfully.", type: "success" });

  const addStaff = () => {
    const newId = "staff-" + String(staffList.length + 1).padStart(2, "0");
    setStaffList((prev) => [...prev, { id: newId, name: "New Staff Member", role: "Stylist", avatar: null }]);
  };

  const removeStaff = (id) => setStaffList((prev) => prev.filter((s) => s.id !== id));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>Settings</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>Business configuration and preferences</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-150"
            style={{
              background: activeTab === tab.id ? "#da7320" : "var(--bg-input)",
              color: activeTab === tab.id ? "#fff" : "var(--text-secondary)",
              border: activeTab === tab.id ? "none" : "1px solid var(--border-default)",
              boxShadow: activeTab === tab.id ? "0 2px 8px rgba(218,115,32,0.25)" : "none",
            }}
          >
            <tab.icon className="h-4 w-4" /> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "profile" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)", boxShadow: "var(--shadow-card)" }}>
          <h3 className="mb-5 text-sm font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>Business Information</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Business Name", key: "name" },
              { label: "Phone", key: "contact.phone" },
              { label: "Email", key: "contact.email" },
              { label: "Address", key: "contact.address" },
              { label: "Instagram", key: "socials.instagram" },
            ].map((field) => (
              <div key={field.key}>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{field.label}</label>
                <input
                  type="text"
                  value={field.key.includes(".") ? field.key.split(".").reduce((o, k) => o[k], biz) : biz[field.key]}
                  onChange={(e) => {
                    const keys = field.key.split(".");
                    setBiz((prev) => {
                      const copy = { ...prev };
                      let ref = copy;
                      keys.slice(0, -1).forEach((k) => { ref[k] = { ...ref[k] }; ref = ref[k]; });
                      ref[keys.at(-1)] = e.target.value;
                      return copy;
                    });
                  }}
                  className="w-full rounded-xl px-3.5 py-2.5 text-sm outline-none transition-all duration-150 focus:ring-2 focus:ring-brand-100"
                  style={inputStyle}
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === "staff" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)", boxShadow: "var(--shadow-card)" }}>
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-sm font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>Team Members</h3>
            <button onClick={addStaff} className="inline-flex items-center gap-1.5 rounded-xl bg-brand-500 px-4 py-2 text-xs font-bold text-white shadow-sm shadow-brand-500/20 hover:bg-brand-600">
              <Plus className="h-3.5 w-3.5" /> Add Staff
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {staffList.map((s) => (
              <div key={s.id} className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-hover)" }}>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-100 text-sm font-bold text-brand-700">
                  {s.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <input
                  type="text"
                  value={s.name}
                  onChange={(e) => setStaffList((prev) => prev.map((x) => (x.id === s.id ? { ...x, name: e.target.value } : x)))}
                  className="flex-1 bg-transparent text-sm font-semibold outline-none"
                  style={{ color: "var(--text-primary)" }}
                />
                <input
                  type="text"
                  value={s.role}
                  onChange={(e) => setStaffList((prev) => prev.map((x) => (x.id === s.id ? { ...x, role: e.target.value } : x)))}
                  className="w-40 rounded-lg px-2.5 py-1.5 text-xs font-medium outline-none"
                  style={inputStyle}
                />
                <button onClick={() => removeStaff(s.id)} className="flex h-7 w-7 items-center justify-center rounded-lg transition-colors hover:text-danger-500" style={{ color: "var(--text-muted)" }}>
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === "hours" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)", boxShadow: "var(--shadow-card)" }}>
          <h3 className="mb-5 text-sm font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>Operating Hours</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {Object.entries(biz.hours).map(([day, hours]) => (
              <div key={day}>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider capitalize" style={{ color: "var(--text-muted)" }}>{day}</label>
                <input
                  type="text"
                  value={hours}
                  onChange={(e) => setBiz((prev) => ({ ...prev, hours: { ...prev.hours, [day]: e.target.value } }))}
                  className="w-full rounded-xl px-3.5 py-2.5 text-sm outline-none transition-all duration-150 focus:ring-2 focus:ring-brand-100"
                  style={inputStyle}
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === "notifications" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)", boxShadow: "var(--shadow-card)" }}>
          <h3 className="mb-5 text-sm font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>Notification Preferences</h3>
          <div className="flex flex-col gap-3">
            {[
              { key: "newBooking", label: "New booking received", desc: "Get notified when a customer makes a new booking" },
              { key: "cancellation", label: "Booking cancelled", desc: "Alert when a booking is cancelled" },
              { key: "lowStock", label: "Low stock alert", desc: "Notify when product inventory is running low" },
              { key: "dailyReport", label: "Daily summary email", desc: "Receive a daily operations summary" },
              { key: "weeklyReport", label: "Weekly performance report", desc: "Get a weekly analytics digest" },
            ].map((pref) => (
              <div key={pref.key} className="flex items-center justify-between rounded-xl px-4 py-3.5" style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-hover)" }}>
                <div>
                  <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{pref.label}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{pref.desc}</div>
                </div>
                <button
                  onClick={() => setNotifications((prev) => ({ ...prev, [pref.key]: !prev[pref.key] }))}
                  className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200"
                  style={{ background: notifications[pref.key] ? "#da7320" : "var(--border-default)" }}
                >
                  <span
                    className="inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200"
                    style={{ transform: notifications[pref.key] ? "translateX(24px)" : "translateX(4px)" }}
                  />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <div className="flex justify-end">
        <button onClick={save} className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-500/20 transition-all hover:bg-brand-600 hover:shadow-brand-500/30">
          <Save className="h-4 w-4" /> Save Changes
        </button>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
