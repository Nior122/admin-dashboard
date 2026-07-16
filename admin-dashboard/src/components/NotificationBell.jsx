import { useState, useEffect, useRef } from "react";
import { Bell, CalendarCheck, DollarSign, UserPlus, XCircle, Pause, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ICON_MAP = {
  calendar: CalendarCheck,
  check: CheckCircle2,
  dollar: DollarSign,
  user: UserPlus,
  x: XCircle,
  pause: Pause,
};

function formatRelative(ms) {
  const secs = Math.floor(ms / 1000);
  if (secs < 10) return "Just now";
  if (secs < 60) return secs + "s ago";
  const mins = Math.floor(secs / 60);
  if (mins < 60) return mins + " min ago";
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs + " hr ago";
  return Math.floor(hrs / 24) + "d ago";
}

export default function NotificationBell({ notifications, unreadCount, onMarkAllRead, onMarkRead }) {
  const [open, setOpen] = useState(false);
  const [badgePulse, setBadgePulse] = useState(false);
  const prevCount = useRef(unreadCount);
  const dropdownRef = useRef(null);
  const bellRef = useRef(null);

  useEffect(() => {
    if (unreadCount > prevCount.current) {
      setBadgePulse(true);
      setTimeout(() => setBadgePulse(false), 600);
    }
    prevCount.current = unreadCount;
  }, [unreadCount]);

  useEffect(() => {
    if (!open) return;
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target) && bellRef.current && !bellRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") { setOpen(false); bellRef.current?.focus(); }
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={bellRef}
        onClick={() => setOpen((o) => !o)}
        aria-label="Notifications"
        aria-expanded={open}
        className="relative flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200"
        style={{
          background: "var(--bg-input)",
          border: "1px solid var(--border-default)",
          color: "var(--text-secondary)",
        }}
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <motion.span
            key={unreadCount}
            initial={badgePulse ? { scale: 0.5 } : false}
            animate={{ scale: 1 }}
            transition={{ duration: 0.25, type: "spring", stiffness: 500 }}
            className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger-500 px-1 text-[9px] font-bold text-white"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-2xl"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-default)",
              boxShadow: "var(--shadow-elevated)",
            }}
          >
            <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid var(--border-default)" }}>
              <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Notifications</span>
              {unreadCount > 0 && (
                <button onClick={(e) => { e.stopPropagation(); onMarkAllRead(); }} className="text-xs font-semibold text-brand-500 hover:text-brand-600">
                  Mark all read
                </button>
              )}
            </div>

            <div className="scrollbar-thin max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-8" style={{ color: "var(--text-muted)" }}>
                  <Bell className="h-8 w-8 opacity-30" />
                  <span className="text-sm">All caught up</span>
                </div>
              ) : (
                notifications.slice(0, 10).map((note) => {
                  const Icon = ICON_MAP[note.icon] || Bell;
                  return (
                    <button
                      key={note.id}
                      onClick={() => onMarkRead(note.id)}
                      className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors"
                      style={{
                        background: !note.read ? "var(--bg-hover)" : "transparent",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-hover)"}
                      onMouseLeave={(e) => e.currentTarget.style.background = !note.read ? "var(--bg-hover)" : "transparent"}
                    >
                      <div
                        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                        style={{
                          background: !note.read ? "rgba(218,115,32,0.12)" : "var(--bg-input)",
                          color: !note.read ? "#da7320" : "var(--text-muted)",
                        }}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs leading-snug" style={{ color: "var(--text-primary)", fontWeight: !note.read ? 600 : 400 }}>
                          {note.text}
                        </div>
                        <div className="mt-0.5 text-[10px]" style={{ color: "var(--text-muted)" }}>
                          {formatRelative(Date.now() - note.timestamp)}
                        </div>
                      </div>
                      {!note.read && <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-500" />}
                    </button>
                  );
                })
              )}
            </div>

            <div className="px-4 py-2.5" style={{ borderTop: "1px solid var(--border-default)" }}>
              <a href="/" className="block text-center text-xs font-semibold text-brand-500 hover:text-brand-600">
                View all activity
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
