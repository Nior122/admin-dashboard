import { useState } from "react";
import DataTable from "../components/DataTable.jsx";
import ItemFormModal from "../components/ItemFormModal.jsx";
import Toast from "../components/Toast.jsx";
import { services as initialServices, business } from "../data/dashboardConfig.js";
import { Plus, Trash2, Edit3, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

const statusColors = {
  active: { bg: "rgba(34,196,98,0.1)", text: "#22c462", border: "rgba(34,196,98,0.2)" },
  inactive: { bg: "var(--bg-input)", text: "var(--text-muted)", border: "var(--border-default)" },
};

export default function Management() {
  const [services, setServices] = useState(initialServices);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSave = (item) => {
    if (editingItem) {
      setServices((prev) => prev.map((s) => (s.id === editingItem.id ? { ...s, ...item } : s)));
    } else {
      const newId = "svc-" + String(services.length + 1).padStart(3, "0");
      setServices((prev) => [...prev, { ...item, id: newId }]);
    }
  };

  const handleDelete = (id) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    setDeleteConfirm(null);
    setToast({ message: "Service deleted.", type: "error" });
  };

  const toggleStatus = (id) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, status: s.status === "active" ? "inactive" : "active" } : s)));
    setToast({ message: "Service status updated.", type: "success" });
  };

  const columns = [
    {
      key: "image",
      label: "Image",
      sortable: false,
      render: (v) => (
        <div className="h-9 w-9 rounded-xl flex items-center justify-center text-xs font-bold overflow-hidden" style={{ background: "var(--bg-input)", color: "var(--text-muted)" }}>
          {v ? <img src={v} alt="" className="h-full w-full object-cover" /> : "IMG"}
        </div>
      ),
    },
    { key: "name", label: "Service" },
    { key: "category", label: "Category" },
    {
      key: "price",
      label: "Price",
      render: (v) => <span className="font-tabular font-semibold">{business.currency}{v.toLocaleString()}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (v) => {
        const c = statusColors[v] || statusColors.inactive;
        return (
          <span className="inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold capitalize" style={{ background: c.bg, color: c.text, border: "1px solid " + c.border }}>
            {v}
          </span>
        );
      },
    },
    {
      key: "actions",
      label: "Actions",
      sortable: false,
      render: (_, row) => (
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => { setEditingItem(row); setModalOpen(true); }} className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors" style={{ color: "var(--text-muted)" }} title="Edit">
            <Edit3 className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => toggleStatus(row.id)} className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors" style={{ color: "var(--text-muted)" }} title={row.status === "active" ? "Deactivate" : "Activate"}>
            {row.status === "active" ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          </button>
          <button onClick={() => setDeleteConfirm(row)} className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:text-danger-500" style={{ color: "var(--text-muted)" }} title="Delete">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>Services</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>Manage prices, descriptions, and availability</p>
        </div>
        <button
          onClick={() => { setEditingItem(null); setModalOpen(true); }}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-500/20 transition-all hover:bg-brand-600 hover:shadow-brand-500/30"
        >
          <Plus className="h-4 w-4" /> Add Service
        </button>
      </div>

      {selectedIds.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 rounded-xl px-4 py-3"
          style={{ background: "rgba(218,115,32,0.08)", border: "1px solid rgba(218,115,32,0.15)" }}
        >
          <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{selectedIds.length} selected</span>
          <button className="rounded-lg bg-success-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-success-600">Activate</button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-bold transition-colors" style={{ border: "1px solid var(--border-default)", color: "var(--text-secondary)" }}>Deactivate</button>
          <button onClick={() => setSelectedIds([])} className="ml-auto text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Clear</button>
        </motion.div>
      )}

      <DataTable columns={columns} data={services} onRowClick={(row) => { setEditingItem(row); setModalOpen(true); }} />

      <ItemFormModal open={modalOpen} onClose={() => { setModalOpen(false); setEditingItem(null); }} onSave={handleSave} item={editingItem} />

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md" style={{ background: "rgba(0,0,0,0.5)" }} onClick={() => setDeleteConfirm(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm overflow-hidden rounded-2xl text-center"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)", boxShadow: "var(--shadow-modal)" }}
          >
            <div className="p-6">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: "rgba(248,59,59,0.1)" }}>
                <Trash2 className="h-6 w-6 text-danger-500" />
              </div>
              <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>Delete Service?</h3>
              <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                Are you sure you want to delete <strong>{deleteConfirm.name}</strong>? This cannot be undone.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors" style={{ border: "1px solid var(--border-default)", color: "var(--text-secondary)" }}>Keep</button>
                <button onClick={() => handleDelete(deleteConfirm.id)} className="rounded-xl bg-danger-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-danger-500/20 hover:bg-danger-600">Delete</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
