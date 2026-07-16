import { useState, useEffect, useRef, useCallback } from "react";

const ACTIVITY_POOL = [
  { type: "booking", text: "New booking: {name} — {service}", icon: "calendar" },
  { type: "booking", text: "Booking confirmed: {name} — {service}", icon: "check" },
  { type: "price", text: "Price updated: {service} → {price}", icon: "dollar" },
  { type: "customer", text: "New customer: {name} added", icon: "user" },
  { type: "cancellation", text: "Booking cancelled: {name} — {service}", icon: "x" },
  { type: "service", text: "Service deactivated: {service}", icon: "pause" },
  { type: "booking", text: "New booking: {name} — {service}", icon: "calendar" },
  { type: "customer", text: "Returning customer: {name} booked {service}", icon: "user" },
  { type: "price", text: "Promo applied: {service} now {price}", icon: "dollar" },
  { type: "booking", text: "Walk-in confirmed: {name} — {service}", icon: "check" },
];

const NAMES = [
  "Adaeze O.", "Bolaji F.", "Sarah O.", "Nneka C.", "Emeka N.", "Zainab B.",
  "Funke A.", "Tolu A.", "Amara O.", "Kunle M.", "Ifeoma N.", "Chidi O.",
  "Aisha M.", "Dayo C.", "Ngozi U.", "Temi A.", "Obioma A.", "Sade B.",
  "Halima B.", "Jide O.", "Ese O.", "Femi A.", "Lydia D.", "Ola O.",
  "Chioma A.", "Rashidat S.", "Segun O.", "Innocent I.", "Deji A.", "Kemi O.",
];

const SERVICES = [
  "Signature Haircut", "Blow Dry & Style", "Loc Retwist", "Beard Sculpt",
  "Hot Towel Shave", "Full Body Massage", "Signature Facial", "Classic Manicure",
  "Gel Pedicure", "Deep Conditioning", "Kids Haircut", "Bridal Package",
  "Steam Therapy", "Nail Art Add-on",
];

const PRICES = [
  "₦4,500", "₦6,500", "₦7,500", "₦8,000", "₦10,000",
  "₦12,000", "₦15,000", "₦18,000", "₦25,000", "₦35,000",
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateEvent() {
  const template = pick(ACTIVITY_POOL);
  const text = template.text
    .replace("{name}", pick(NAMES))
    .replace("{service}", pick(SERVICES))
    .replace("{price}", pick(PRICES));
  return {
    id: "live-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7),
    type: template.type,
    icon: template.icon,
    text: text,
    timestamp: Date.now(),
  };
}

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

export function useLiveActivity(maxItems = 8) {
  const [items, setItems] = useState(() => {
    const now = Date.now();
    return Array.from({ length: 6 }, (_, i) => {
      const ev = generateEvent();
      ev.timestamp = now - (i * 180000 + Math.random() * 120000);
      ev.isNew = false;
      return ev;
    });
  });

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const intervalRef = useRef(null);

  const addEvent = useCallback(() => {
    if (document.hidden) return;
    const ev = generateEvent();
    ev.isNew = true;
    setItems((prev) => {
      const next = [ev, ...prev];
      return next.slice(0, maxItems);
    });
    setNotifications((prev) => {
      const note = { ...ev, read: false };
      return [note, ...prev].slice(0, 20);
    });
    setUnreadCount((c) => c + 1);
    setTimeout(() => {
      setItems((prev) => prev.map((item) => item.id === ev.id ? { ...item, isNew: false } : item));
    }, 3000);
  }, [maxItems]);

  useEffect(() => {
    const scheduleNext = () => {
      const delay = 6000 + Math.random() * 6000;
      intervalRef.current = setTimeout(() => {
        addEvent();
        scheduleNext();
      }, delay);
    };
    scheduleNext();
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [addEvent]);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  }, []);

  const markRead = useCallback((id) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
    setUnreadCount((c) => Math.max(0, c - 1));
  }, []);

  const refreshTimestamps = useCallback(() => {
    setItems((prev) => [...prev]);
    setNotifications((prev) => [...prev]);
  }, []);

  useEffect(() => {
    const interval = setInterval(refreshTimestamps, 15000);
    return () => clearInterval(interval);
  }, [refreshTimestamps]);

  return {
    items,
    notifications,
    unreadCount,
    markAllRead,
    markRead,
    formatRelative,
  };
}
