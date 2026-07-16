# Aduke Studio — Premium Salon & Spa Admin Dashboard

> **A fully-featured, dark-mode-ready admin panel built for modern salon and spa businesses. Real-time KPIs, interactive analytics, booking management, and a UI your team will actually enjoy using.**

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## Why Aduke Studio?

Running a salon or spa is already hard enough. Your admin tools shouldn't make it harder.

Aduke Studio was designed from the ground up for **salon owners, managers, and front-desk teams** who need a clean, fast, and beautiful way to manage bookings, track revenue, monitor staff, and understand their business — without a 200-page manual.

**This isn't a generic admin template.** Every screen, every metric, every interaction was built with the salon industry in mind.

---

## Live Preview

> Deploy it in under 2 minutes. See it in action immediately.

`ash
git clone https://github.com/Nior122/admin-dashboard.git
cd admin-dashboard/admin-dashboard
npm install
npm run dev
`

Open http://localhost:5173 — that's it.

---

## What You Get

### Overview Dashboard
Your business at a glance. Five live-updating KPI cards sit at the top:

- **Revenue (this month)** — Fluctuates in real time based on simulated bookings and expenses. Uses animated number transitions so changes feel smooth, not jarring.
- **Expenses (this month)** — Tracks operational costs. When expenses go up, revenue adjusts accordingly — because that's how real life works.
- **Net Profit** — Automatically calculated. Green when you're in the black, red when you're not.
- **Bookings (this week)** — Live appointment count with a sparkline trend.
- **New Customers** — Acquisition metric with trend indicator.

Below the KPIs, you'll find:
- **Revenue & Bookings Trend** — Interactive area chart with 7/30/90 day toggles
- **Bookings by Category** — Horizontal bar chart showing Hair, Grooming, Spa, and Nails distribution
- **Needs Attention** — Auto-generated alerts for pending bookings, cancellations, low stock, and schedule conflicts
- **Recent Activity Feed** — Real-time timeline of everything happening in your business

### Bookings Management
Full CRUD for customer appointments:

- **Filter by status** — All, Pending, Confirmed, Completed, Cancelled
- **Sortable data table** — Click any column header to sort
- **Booking detail modal** — Click a row to see full details, confirm pending bookings, or cancel
- **Status badges** — Color-coded pills for instant visual scanning
- **32 pre-loaded sample bookings** with realistic Nigerian names, services, and pricing

### Services Management (Service Catalog)
Your complete service menu in one place:

- **Add, edit, delete services** with image upload support
- **Bulk actions** — Select multiple services and activate/deactivate them at once
- **Category filtering** — Hair, Grooming, Spa, Nails
- **Price management** — Naira-denominated with proper formatting
- **Status toggles** — Activate or deactivate individual services instantly
- **15 pre-loaded services** with real pricing (from N4,000 Kids Haircut to N85,000 Bridal Package)

### Customer Directory
Your client database with full profiles:

- **30 pre-loaded customers** with names, phones, emails, visit counts, and spending totals
- **Customer detail modal** — Click any customer to see their full profile and booking history
- **Total spent tracking** — See your highest-value clients at a glance
- **Last visit tracking** — Identify customers who haven't been back in a while

### Analytics
Deep business intelligence without the complexity:

- **Revenue Over Time** — Area chart with gradient fill, date range selector (7d/30d/90d)
- **Busiest Hours** — Bar chart showing peak booking times (8am–6pm)
- **Bookings by Service Type** — Category breakdown with color-coded indicators
- **Top Performing Services** — Ranked list with revenue and booking counts
- **Customer Retention Metrics** — Repeat visit rate, avg visits, new vs returning ratio, time between visits

### Settings
Complete business configuration:

- **Business Profile** — Name, phone, email, address, Instagram
- **Staff Management** — Add/remove/edit team members with role assignments
- **Operating Hours** — Weekday, Saturday, Sunday schedules
- **Notification Preferences** — Toggle alerts for bookings, cancellations, low stock, daily/weekly reports

---

## Dark Mode

One click. That's all it takes.

Click the **sun/moon icon** in the top bar to toggle between light and dark themes. Your preference is saved to localStorage and persists across sessions. If you haven't set a preference, it automatically matches your system's prefers-color-scheme.

The dark mode isn't just inverted colors — it's a **carefully designed dark palette**:

| Surface | Light | Dark |
|---------|-------|------|
| Base background | #fdfaf6 (warm cream) | #0f0d0b (deep black) |
| Card background | #ffffff | #1a1714 |
| Elevated surfaces | #ffffff | #252220 |
| Borders | #f4e7d9 | #2e2a26 |
| Primary text | #1f1d1a | #f5f0eb |
| Secondary text | #6b5f52 | #a89b8c |

Charts, modals, toasts, sidebars — everything adapts. No broken contrast. No missing elements.

---

## Brand Palette

The entire UI is built around a warm, luxurious amber/terracotta palette that feels right at home in the beauty and wellness space:

| Token | Hex | Usage |
|-------|-----|-------|
| Brand 500 | #da7320 | Primary accent — buttons, active states, highlights |
| Brand 700 | #a14314 | Deep accent — hover states, emphasis |
| Brand 900 | #6c2e16 | Darkest — headings in light mode |
| Success 500 | #22c462 | Positive metrics, confirmed states |
| Warning 500 | #f99007 | Alerts, pending states |
| Danger 500 | #f83b3b | Errors, cancellations, expenses |

---

## Tech Stack

| Technology | Why |
|-----------|-----|
| **React 19** | Latest concurrent features, hooks, and performance |
| **React Router v7** | Client-side routing with nested layouts |
| **Tailwind CSS v4** | Utility-first styling with @theme custom properties |
| **Recharts** | Composable charting library built on D3 |
| **Framer Motion** | Production-ready animations and transitions |
| **Lucide React** | Consistent, lightweight icon set |
| **Vite** | Lightning-fast dev server and optimized builds |

---

## Project Structure

`
admin-dashboard/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/              # Static assets (images, SVGs)
│   ├── components/          # Reusable UI components
│   │   ├── ActivityFeed.jsx     # Timeline-style activity log
│   │   ├── ChartCard.jsx        # Themed chart container
│   │   ├── DataTable.jsx        # Sortable, themed data table
│   │   ├── ImageUploadZone.jsx  # Drag-and-drop image upload
│   │   ├── ItemFormModal.jsx    # Themed form modal with validation
│   │   ├── KPICard.jsx          # Animated metric card with sparklines
│   │   ├── NotificationBell.jsx # Notification dropdown with badges
│   │   ├── Sidebar.jsx          # Collapsible navigation sidebar
│   │   ├── Toast.jsx            # Auto-dismissing notifications
│   │   └── TopBar.jsx           # Search, theme toggle, profile
│   ├── data/
│   │   └── dashboardConfig.js   # All business data (staff, services, customers, bookings)
│   ├── hooks/
│   │   ├── useLiveActivity.js   # Real-time activity feed generator
│   │   ├── useLiveValue.js      # Animated number hook with tick system
│   │   └── useTheme.js          # Dark/light mode with persistence
│   ├── layouts/
│   │   └── DashboardLayout.jsx  # Main layout with sidebar + topbar
│   ├── pages/
│   │   ├── Analytics.jsx        # Charts, trends, retention metrics
│   │   ├── Bookings.jsx         # Appointment management
│   │   ├── Customers.jsx        # Client directory
│   │   ├── Management.jsx       # Service catalog CRUD
│   │   ├── Overview.jsx         # KPIs, charts, alerts
│   │   └── Settings.jsx         # Business config, staff, hours
│   ├── App.jsx                  # Route definitions
│   ├── index.css                # Theme tokens, global styles
│   └── main.jsx                 # Entry point with theme init
├── index.html
├── package.json
├── vite.config.js
└── .gitignore
`

---

## Implementing This in Your Business

### Step 1: Clone and Customize

1. Clone the repository
2. Edit src/data/dashboardConfig.js to add your real business data:
   - Replace Aduke Studio with your business name
   - Update the services list with your actual menu and prices
   - Add your real staff members
   - Replace the sample customer data with your client list
   - Update contact information, social links, and operating hours

### Step 2: Connect to Real Data (Production)

The dashboard currently uses in-memory data with simulated live updates. To connect to a real backend:

1. **Replace the useState data hooks** in each page with API calls (fetch, axios, or React Query)
2. **Set up a REST API or GraphQL endpoint** for:
   - GET /bookings — List all bookings
   - POST /bookings — Create a booking
   - PATCH /bookings/:id — Update booking status
   - GET /services — List services
   - POST /services — Create a service
   - DELETE /services/:id — Delete a service
   - GET /customers — List customers
   - GET /analytics/revenue — Revenue data
   - GET /analytics/retention — Retention metrics
3. **Replace the useLiveValue tick functions** with WebSocket connections for real-time KPI updates
4. **Add authentication** — Wrap DashboardLayout with an auth provider (Clerk, NextAuth, or custom JWT)

### Step 3: Deploy

**Vercel (Recommended)**
`ash
npm install -g vercel
vercel --prod
`

**Netlify**
`ash
npm run build
# Drag the dist/ folder to netlify.com/drop
`

**Render**
`ash
# Build command: npm run build
# Publish directory: dist
`

**Docker**
`dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
`

### Step 4: Add a Backend

For a complete salon management system, pair this dashboard with:

| Component | Recommended |
|-----------|------------|
| **Database** | PostgreSQL (Supabase) or MongoDB (Atlas) |
| **API** | Node.js + Express, or serverless (Vercel Functions) |
| **Auth** | Clerk or NextAuth.js |
| **Real-time** | Supabase Realtime or Pusher |
| **Payments** | Paystack (Nigeria) or Stripe |
| **SMS/WhatsApp** | Termii or Twilio for booking reminders |
| **Hosting** | Vercel, Render, or Railway |

---

## Key Features for Salon Owners

### Why Your Team Will Love This

- **No training needed** — The interface is intuitive. If you can use Instagram, you can use this.
- **Works on any device** — Responsive design that works on desktop, tablet, and mobile browsers.
- **Dark mode reduces eye strain** — Perfect for late-night inventory checks or early-morning prep.
- **Real-time updates** — KPIs update automatically. No need to refresh the page.
- **Instant search** — Find any booking, customer, or service in seconds.
- **Keyboard friendly** — Press Escape to close modals, navigate with Tab.

### Business Intelligence Without the Headache

- See your ** busiest hours** and staff accordingly
- Track ** customer retention** and identify at-risk clients
- Monitor **revenue vs expenses** in real time
- Identify **top-performing services** and double down on what works
- Get **automated alerts** for pending bookings, cancellations, and low stock

---

## Customization

### Changing the Brand Color

Edit the @theme section in src/index.css:

`css
--color-brand-500: #da7320;  /* Change this to your brand color */
`

All components will automatically adapt.

### Adding New Pages

1. Create a new file in src/pages/
2. Add the route in src/App.jsx
3. Add the nav item in src/components/Sidebar.jsx

### Modifying the Dark Theme

Edit the .dark CSS custom properties in src/index.css:

`css
.dark {
  --bg-base: #0f0d0b;      /* Page background */
  --bg-card: #1a1714;      /* Card backgrounds */
  --bg-elevated: #252220;  /* Modals, dropdowns */
  --text-primary: #f5f0eb; /* Main text */
  --text-secondary: #a89b8c; /* Secondary text */
  --border-default: #2e2a26; /* Borders */
}
`

---

## Sample Data

The dashboard comes pre-loaded with realistic Nigerian salon data:

| Category | Details |
|----------|---------|
| **Business** | Aduke Studio, Lekki Phase 1, Lagos |
| **Services** | 15 services across Hair, Grooming, Spa, and Nails |
| **Staff** | 5 team members (Owner, Senior Stylist, Barber, Nail Tech, Esthetician) |
| **Customers** | 30 clients with visit history and spending data |
| **Bookings** | 32 appointments with mixed statuses |

All pricing is in **Nigerian Naira (N)** with proper locale formatting.

---

## Performance

- **Build size:** ~240KB gzipped (JS) + ~6KB gzipped (CSS)
- **First paint:** Under 1 second on 3G
- **Animations:** GPU-accelerated via Framer Motion
- **Charts:** Lazy-rendered with Recharts ResponsiveContainer

---

## Browser Support

| Browser | Supported |
|---------|-----------|
| Chrome 90+ | Yes |
| Firefox 90+ | Yes |
| Safari 14+ | Yes |
| Edge 90+ | Yes |

---

## Contributing

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

---

## License

MIT License — free for personal and commercial use.

---

## Credits

Built with care for the salon and spa industry. If this helps your business, we'd love to hear about it.

**[Deploy it now](https://github.com/Nior122/admin-dashboard)** — your team deserves better tools.