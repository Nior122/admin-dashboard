import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, X } from "lucide-react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  const isDark = document.documentElement.classList.contains("dark");

  const icons = {
    success: <CheckCircle2 className="h-4 w-4 text-success-500" />,
    error: <XCircle className="h-4 w-4 text-danger-500" />,
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.95 }}
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 overflow-hidden rounded-2xl px-5 py-3.5"
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-default)",
          boxShadow: "var(--shadow-elevated)",
        }}
      >
        <div
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
          style={{
            background: type === "success" ? "rgba(34,196,98,0.12)" : "rgba(248,59,59,0.12)",
          }}
        >
          {icons[type] || icons.success}
        </div>
        <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{message}</span>
        <button
          onClick={onClose}
          className="ml-2 flex h-6 w-6 items-center justify-center rounded-lg transition-colors hover:opacity-70"
          style={{ color: "var(--text-muted)" }}
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
