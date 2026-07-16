import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ImageUploadZone from "./ImageUploadZone.jsx";
import Toast from "./Toast.jsx";

const emptyForm = { name: "", category: "Hair", price: "", description: "", status: "active", image: null };

const inputStyle = {
  background: "var(--bg-input)",
  border: "1px solid var(--border-default)",
  color: "var(--text-primary)",
};

const inputFocusStyle = {
  borderColor: "var(--border-focus)",
  boxShadow: "0 0 0 3px rgba(218,115,32,0.1)",
};

function ThemedInput({ className, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      className={"w-full rounded-xl px-3.5 py-2.5 text-sm outline-none transition-all duration-150 " + (className || "")}
      style={{ ...inputStyle, ...(focused ? inputFocusStyle : {}) }}
      onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
      {...props}
    />
  );
}

function ThemedSelect({ className, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      className={"w-full rounded-xl px-3.5 py-2.5 text-sm outline-none transition-all duration-150 " + (className || "")}
      style={{ ...inputStyle, ...(focused ? inputFocusStyle : {}) }}
      onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
      {...props}
    />
  );
}

function ThemedTextarea({ className, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      className={"w-full rounded-xl px-3.5 py-2.5 text-sm outline-none transition-all duration-150 " + (className || "")}
      style={{ ...inputStyle, ...(focused ? inputFocusStyle : {}) }}
      onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
      {...props}
    />
  );
}

export default function ItemFormModal({ open, onClose, onSave, item }) {
  const [form, setForm] = useState(item ? { ...item, price: String(item.price) } : { ...emptyForm });
  const [toast, setToast] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      setToast({ message: "Name and price are required.", type: "error" });
      return;
    }
    onSave({ ...form, price: Number(form.price) });
    setToast({ message: item ? "Service updated." : "New service added.", type: "success" });
    setTimeout(() => onClose(), 600);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
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
              <h2 className="text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                {item ? "Edit Service" : "Add New Service"}
              </h2>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-xl transition-colors"
                style={{ background: "var(--bg-hover)", color: "var(--text-muted)" }}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Name</label>
                <ThemedInput type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Category</label>
                  <ThemedSelect value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    {["Hair", "Grooming", "Spa", "Nails"].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </ThemedSelect>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Price (N)</label>
                  <ThemedInput type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="font-tabular" required min={0} />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Description</label>
                <ThemedTextarea rows={3} value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Optional description..." />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Image</label>
                <ImageUploadZone image={form.image} onUpload={(img) => setForm({ ...form, image: img })} onRemove={() => setForm({ ...form, image: null })} />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={onClose} className="rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors" style={{ border: "1px solid var(--border-default)", color: "var(--text-secondary)" }}>
                  Cancel
                </button>
                <button type="submit" className="rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-500/20 transition-all hover:bg-brand-600 hover:shadow-brand-500/30">
                  {item ? "Save Changes" : "Add Service"}
                </button>
              </div>
            </form>
          </motion.div>

          {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}