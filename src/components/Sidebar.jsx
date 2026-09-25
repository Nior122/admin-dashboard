import { NavLink } from "react-router-dom";
import { LayoutDashboard, CalendarCheck, Scissors, Users, BarChart3, Settings, ChevronLeft, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck as CalIcon, DollarSign, UserPlus, XCircle, Pause, CheckCircle2 } from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Overview" },
  { to: "/bookings", icon: CalendarCheck, label: "Bookings" },
  { to: "/services", icon: Scissors, label: "Services" },
  { to: "/customers", icon: Users, label: "Customers" },
  { to: "/analytics", icon: BarChart3, label: "Analytics" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

const ICON_MAP = {
  calendar: CalIcon,
  check: CheckCircle2,
  dollar: DollarSign,
  user: UserPlus,
  x: XCircle,
  pause: Pause,
};

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose, activityItems = [], formatRelative = (ms) => "" }) {
  const isMobileCollapsed = false; // Never actually "collapsed" internally when on mobile view

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onMobileClose}
            className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen flex-col border-r backdrop-blur-xl transition-all duration-300 md:translate-x-0 w-[260px] md:w-[var(--sidebar-width)] ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{
          background: "var(--bg-sidebar)",
          borderColor: "var(--border-default)",
        }}
      >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b px-5" style={{ borderColor: "var(--border-default)" }}>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-500 shadow-lg shadow-brand-500/20">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <AnimatePresence>
          {(!collapsed || mobileOpen) && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden whitespace-nowrap md:block"
            >
              <div className="text-sm font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>Aduke Studio</div>
              <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>Admin Panel</div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={onToggle}
          className="ml-auto hidden h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors hover:opacity-80 md:flex"
          style={{ color: "var(--text-muted)", background: "var(--bg-hover)" }}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft className={"h-4 w-4 transition-transform duration-200 " + (collapsed ? "rotate-180" : "")} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) => {
                  const base = "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ";
                  if (isActive) {
                    return base + "text-brand-500";
                  }
                  return base + "hover:opacity-80";
                }}
                style={({ isActive }) => ({
                  color: isActive ? undefined : "var(--text-secondary)",
                  background: isActive ? "var(--bg-hover)" : "transparent",
                })}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-brand-500"
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                    <item.icon className="h-5 w-5 shrink-0" />
                    <AnimatePresence>
                      {(!collapsed || mobileOpen) && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.12 }}
                          className="overflow-hidden whitespace-nowrap"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Recent Activity */}
      <AnimatePresence>
        {(!collapsed || mobileOpen) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="border-t px-4 py-4"
            style={{ borderColor: "var(--border-default)" }}
          >
            <div className="mb-2.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
              Recent Activity
            </div>
            <div className="scrollbar-thin flex max-h-44 flex-col gap-1.5 overflow-y-auto pr-1">
              {activityItems.slice(0, 5).map((item) => {
                const Icon = ICON_MAP[item.icon] || CalIcon;
                return (
                  <div
                    key={item.id}
                    className="rounded-lg px-3 py-2 transition-colors"
                    style={{
                      background: item.isDark ? "rgba(34,196,98,0.08)" : "var(--bg-hover)",
                    }}
                  >
                    <div className="flex items-start gap-2">
                      <div
                        className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                        style={{
                          background: item.isDark ? "rgba(34,196,98,0.15)" : "var(--bg-hover)",
                        }}
                      >
                        <Icon
                          className="h-2.5 w-2.5"
                          style={{ color: item.isDark ? "#22c462" : "var(--text-muted)" }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] leading-snug font-medium" style={{ color: "var(--text-primary)" }}>
                          {item.text}
                        </div>
                        <div className="mt-0.5 text-[10px]" style={{ color: "var(--text-muted)" }}>
                          {formatRelative(Date.now() - item.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
    </>
  );
}
