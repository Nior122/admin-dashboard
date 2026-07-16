import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useAnimatedNumber } from "../hooks/useLiveValue";

const accentStyles = {
  danger: {
    borderLeft: "3px solid #f83b3b",
    valueColor: "#f83b3b",
    labelColor: "var(--text-muted)",
  },
  success: {
    borderLeft: "3px solid #22c462",
    valueColor: "#22c462",
    labelColor: "var(--text-muted)",
  },
  warning: {
    borderLeft: "3px solid #f99007",
    valueColor: "#f99007",
    labelColor: "var(--text-muted)",
  },
  default: {
    borderLeft: "3px solid #da7320",
    valueColor: "var(--text-primary)",
    labelColor: "var(--text-muted)",
  },
};

export default function KPICard({ label, value, numericValue, trend = 0, sparkline = [], delay = 0, format, accent = "default" }) {
  const isUp = trend >= 0;
  const animated = useAnimatedNumber(numericValue, { duration: 900 });

  const displayValue = format ? format(animated) : String(animated);
  const colors = accentStyles[accent] || accentStyles.default;

  const trendIsZero = Math.abs(trend) < 0.1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col gap-2 rounded-2xl px-5 py-5"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-default)",
        borderLeft: colors.borderLeft,
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: colors.labelColor }}>
        {label}
      </div>

      <div className="font-tabular text-2xl font-bold tracking-tight" style={{ color: colors.valueColor }}>
        {displayValue}
      </div>

      <div className="mt-1 flex items-center gap-2">
        {!trendIsZero && (
          <motion.span
            key={trend.toFixed(1)}
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={"inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold " +
              (isUp ? "bg-success-100 text-success-700" : "bg-danger-100 text-danger-700")
            }
          >
            {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {Math.abs(trend).toFixed(1)}%
          </motion.span>
        )}
        {trendIsZero && (
          <span className="inline-flex items-center gap-0.5 rounded-full bg-brand-100 px-2 py-0.5 text-[11px] font-semibold text-brand-600">
            <Minus className="h-3 w-3" />
            0.0%
          </span>
        )}
        <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
          vs last period
        </span>
      </div>

      {sparkline.length > 0 && (
        <div className="mt-2 flex items-end gap-px">
          {sparkline.slice(-20).map((v, i, arr) => {
            const max = Math.max(...arr, 1);
            const h = Math.max(3, (v / max) * 24);
            return (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: h }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.02 }}
                className="w-full rounded-sm"
                style={{
                  background: isUp
                    ? "linear-gradient(to top, rgba(34,196,98,0.15), rgba(34,196,98,0.4))"
                    : "linear-gradient(to top, rgba(248,59,59,0.15), rgba(248,59,59,0.4))",
                }}
              />
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
