import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import TopBar from "../components/TopBar.jsx";
import { useLiveActivity } from "../hooks/useLiveActivity.js";
import { useTheme } from "../hooks/useTheme.js";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sidebarWidth = collapsed ? 72 : 260;
  const { items, notifications, unreadCount, markAllRead, markRead, formatRelative } = useLiveActivity(8);
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <div className="min-h-screen transition-colors" style={{ background: "var(--bg-base)", color: "var(--text-primary)", "--sidebar-width": `${sidebarWidth}px` }}>
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
        activityItems={items}
        formatRelative={formatRelative}
      />
      <TopBar
        sidebarWidth={sidebarWidth}
        onMobileMenuClick={() => setMobileMenuOpen(true)}
        notifications={notifications}
        unreadCount={unreadCount}
        onMarkAllRead={markAllRead}
        onMarkRead={markRead}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />
      <main className="transition-[margin] duration-200 ml-0 md:ml-[var(--sidebar-width)]">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-4 md:py-6">
          <Outlet context={{ liveItems: items, formatRelative, isDark }} />
        </div>
      </main>
    </div>
  );
}
