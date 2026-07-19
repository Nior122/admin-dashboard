import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import TopBar from "../components/TopBar.jsx";
import { useLiveActivity } from "../hooks/useLiveActivity.js";
import { useTheme } from "../hooks/useTheme.js";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 72 : 260;
  const { items, notifications, unreadCount, markAllRead, markRead, formatRelative } = useLiveActivity(8);
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <div className="min-h-screen transition-colors" style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}>
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        activityItems={items}
        formatRelative={formatRelative}
      />
      <TopBar
        sidebarWidth={sidebarWidth}
        notifications={notifications}
        unreadCount={unreadCount}
        onMarkAllRead={markAllRead}
        onMarkRead={markRead}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />
      <main className="transition-[margin] duration-200" style={{ marginLeft: sidebarWidth }}>
        <div className="mx-auto max-w-7xl px-6 py-6">
          <Outlet context={{ liveItems: items, formatRelative, isDark }} />
        </div>
      </main>
    </div>
  );
}
