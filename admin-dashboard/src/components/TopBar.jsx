import { Search, Sun, Moon } from "lucide-react";
import { useState } from "react";
import NotificationBell from "./NotificationBell.jsx";

export default function TopBar({ sidebarWidth, notifications, unreadCount, onMarkAllRead, onMarkRead, isDark, onToggleTheme }) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header
      className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b backdrop-blur-xl transition-colors"
      style={{
        marginLeft: sidebarWidth,
        borderColor: "var(--border-default)",
        background: "var(--surface-glass)",
      }}
    >
      {/* Search */}
      <div className="relative flex-1 max-w-md ml-2">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors"
          style={{ color: searchFocused ? "#da7320" : "var(--text-muted)" }}
        />
        <div className="relative">
          <input
            type="text"
            placeholder="Search bookings, customers, services..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="w-full rounded-xl py-2.5 pl-10 pr-16 text-sm outline-none transition-all duration-200"
            style={{
              background: searchFocused ? "var(--bg-card)" : "var(--bg-input)",
              border: "1px solid " + (searchFocused ? "var(--border-focus)" : "var(--border-default)"),
              color: "var(--text-primary)",
              boxShadow: searchFocused ? "0 0 0 3px rgba(218,115,32,0.1)" : "none",
            }}
          />
          <kbd
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-1.5 py-0.5 text-[10px] font-medium"
            style={{
              background: "var(--bg-hover)",
              border: "1px solid var(--border-default)",
              color: "var(--text-muted)",
            }}
          >
            ?K
          </kbd>
        </div>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={onToggleTheme}
        className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 hover:scale-105"
        style={{
          background: "var(--bg-input)",
          border: "1px solid var(--border-default)",
          color: "var(--text-secondary)",
        }}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>

      {/* Notifications */}
      <NotificationBell
        notifications={notifications}
        unreadCount={unreadCount}
        onMarkAllRead={onMarkAllRead}
        onMarkRead={onMarkRead}
      />

      {/* Profile */}
      <button
        className="flex items-center gap-2.5 rounded-xl py-1.5 pl-1.5 pr-3 transition-all duration-200 hover:scale-[1.02]"
        style={{
          background: "var(--bg-input)",
          border: "1px solid var(--border-default)",
        }}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-xs font-bold text-white shadow-sm shadow-brand-500/20">
          AO
        </div>
        <span className="hidden text-sm font-semibold md:block" style={{ color: "var(--text-primary)" }}>
          Adaeze O.
        </span>
      </button>
    </header>
  );
}
