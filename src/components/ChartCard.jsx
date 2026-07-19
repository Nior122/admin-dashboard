import { motion } from "framer-motion";

export default function ChartCard({ title, children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className={"rounded-2xl p-5 " + className}
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-default)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      {title && (
        <div className="mb-4 text-sm font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
          {title}
        </div>
      )}
      {children}
    </motion.div>
  );
}
