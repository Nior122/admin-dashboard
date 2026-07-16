# Aduke Studio — Salon & Spa Admin Dashboard

> **Premium, dark-mode ready admin panel for modern salon and spa businesses.**

Run your business like a pro. This isn't just a template—it's your command center for bookings, revenue, staff, and customers.

![Dashboard Preview](src/assets/hero.png)

## Why Aduke Studio?

Most salon software is clunky, expensive, and ugly. 

Aduke Studio was built from the ground up for salon owners who want:
- **Beautiful Design** — Modern, clean interface with a luxurious aesthetic
- **Dark Mode** — Full dark theme that reduces eye strain during long shifts
- **Real-time Insights** — Watch your revenue, bookings, and expenses fluctuate live
- **Total Control** — Manage services, staff, and customers from one place
- **Mobile-Friendly** — Works perfectly on desktop, tablet, and mobile

**No training required.** If you can use Instagram, you can use this.

---

## ?? Quick Start

Get up and running in 2 minutes:

```bash
# Clone the repository
git clone https://github.com/Nior122/admin-dashboard.git

# Navigate to the project
cd admin-dashboard/admin-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open **http://localhost:5173** in your browser. That's it!

---

## ? Key Features

### ?? Live Business Intelligence
- **Dynamic KPIs** — Watch your revenue, expenses, and profit update in real-time
- **Interactive Charts** — Analyze trends by day, week, or month
- **Visual Alerts** — Get notified about pending bookings and schedule conflicts
- **Customer Retention** — Track repeat visits and lifetime value

### ?? Dark Mode
Click the sun/moon icon in the top bar to switch themes. Your preference is saved automatically.

### ?? Booking Management
- Create, confirm, or cancel appointments
- Filter by status (pending, confirmed, completed, cancelled)
- View detailed customer information for each booking

### ?? Service Catalog
- Add, edit, or remove services
- Upload service images
- Set pricing in Naira (?)
- Bulk activate/deactivate services

### ?? Customer Directory
- Complete client profiles with contact info
- View visit history and total spending
- Track last visit dates to identify at-risk clients

### ?? Business Settings
- Update business info (name, address, contact)
- Manage staff roles and assignments
- Set operating hours for each day
- Configure notification preferences

---

## ??? Architecture

Built with modern, production-ready technologies:

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI components and state management |
| **Tailwind CSS v4** | Styling with custom design tokens |
| **Framer Motion** | Smooth animations and transitions |
| **Recharts** | Interactive data visualizations |
| **React Router v7** | Client-side routing |
| **Vite** | Fast development and optimized builds |

### Project Structure
```
admin-dashboard/
+-- src/
¦   +-- components/      # Reusable UI components
¦   +-- pages/           # Main application views
¦   +-- hooks/           # Custom React hooks
¦   +-- data/            # Sample business data
¦   +-- layouts/         # Page layouts
+-- public/              # Static assets
```

---

## ?? Customization

### Change Your Brand Color
Edit `src/index.css` to match your salon's brand:

```css
@theme {
  --color-brand-500: #da7320; /* Your primary color */
  /* Add more shades as needed */
}
```

### Update Business Data
Edit `src/data/dashboardConfig.js` to add your:
- Business name and contact info
- Services and pricing
- Staff members
- Customer data (or connect to your database)

---

## ?? Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
1. Push to GitHub
2. Connect your repo on netlify.com
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### Traditional Hosting
```bash
npm run build
# Upload the 'dist' folder to your web server
```

---

## ?? Mobile Experience

The dashboard is fully responsive:
- **Desktop** — Full sidebar navigation
- **Tablet** — Collapsible sidebar
- **Mobile** — Optimized touch targets and layout

---

## ?? Security Notes

This is a frontend prototype. For production use:
- Add authentication (Firebase, Auth0, or custom)
- Connect to a secure backend API
- Implement role-based access control
- Use environment variables for sensitive data

---

## ?? Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## ?? License

MIT License — feel free to use this for personal or commercial projects.

---

## ?? Support

If you have questions or need help:
- Open an issue on GitHub
- Email: support@adukestudio.com

**Built with ?? for salon owners who deserve better tools.**
