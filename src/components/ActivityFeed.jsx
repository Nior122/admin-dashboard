import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck, DollarSign, UserPlus, XCircle, Pause, CheckCircle2 } from "lucide-react";

const ICON_MAP = {
  calendar: CalendarCheck,
  check: CheckCircle2,
  dollar: DollarSign,
  user: UserPlus,
  x: XCircle,
  pause: Pause,
};

export default function ActivityFeed({ items, formatRelative }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="overflow-hidden rounded-2xl p-5"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-default)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <h3 className="mb-4 text-sm font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
        Recent Activity
      </h3>

      <div className="scrollbar-thin flex max-h-72 flex-col gap-1 overflow-y-auto pr-1">
        <AnimatePresence initial={false}>
          {items.map((item, i) => {
            const Icon = ICON_MAP[item.icon] || CalendarCheck;
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: -12, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative flex items-start gap-3 rounded-xl px-3 py-2.5"
                style={{ background: item.isNew ? "rgba(34,196,98,0.06)" : "transparent" }}
              >
                {/* Timeline connector */}
                {i < items.length - 1 && (
                  <div
                    className="absolute left-[25px] top-10 h-[calc(100%-8px)] w-px"
                    style={{ background: "var(--border-subtle)" }}
                  />
                )}

                <div
                  className="relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: item.isNew ? "rgba(34,196,98,0.15)" : "var(--bg-hover)",
                    color: item.isNew ? "#22c462" : "var(--text-muted)",
                  }}
                >
                  <Icon className="h-3 w-3" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-xs leading-snug font-medium" style={{ color: "var(--text-primary)" }}>
                    {item.text}
                  </div>
                  <div className="mt-0.5 text-[10px]" style={{ color: "var(--text-muted)" }}>
                    {formatRelative(Date.now() - item.timestamp)}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
