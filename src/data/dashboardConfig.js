export const business = {
  name: "Aduke Studio",
  tagline: "Unisex salon & spa",
  currency: "₦",
  locale: "en-NG",
  hours: {
    weekday: "08:00 – 19:00",
    saturday: "09:00 – 18:00",
    sunday: "12:00 – 18:00",
  },
  contact: {
    phone: "+234 812 345 6789",
    email: "hello@adukestudio.com",
    address: "12 Admiralty Way, Lekki Phase 1, Lagos",
  },
  socials: {
    instagram: "https://instagram.com/adukestudio",
  },
};

export const staff = [
  { id: "staff-1", name: "Adaeze Obi", role: "Owner", avatar: null },
  { id: "staff-2", name: "Kemi Adeyemi", role: "Senior Stylist", avatar: null },
  { id: "staff-3", name: "Tunde Bakare", role: "Barber", avatar: null },
  { id: "staff-4", name: "Ngozi Eze", role: "Nail Technician", avatar: null },
  { id: "staff-5", name: "Sade Ogun", role: "Esthetician", avatar: null },
];

const now = new Date();
const day = (offset = 0) => {
  const d = new Date(now);
  d.setDate(d.getDate() + offset);
  return d.toISOString();
};
const time = (hour, minute = 0) => String(hour).padStart(2, "0") + ":" + String(minute).padStart(2, "0");

export const services = [
  { id: "svc-1", name: "Signature Haircut", category: "Hair", price: 7500, status: "active", image: null },
  { id: "svc-2", name: "Blow Dry & Style", category: "Hair", price: 10000, status: "active", image: null },
  { id: "svc-3", name: "Loc Retwist", category: "Hair", price: 18000, status: "active", image: null },
  { id: "svc-4", name: "Beard Sculpt", category: "Grooming", price: 5000, status: "active", image: null },
  { id: "svc-5", name: "Hot Towel Shave", category: "Grooming", price: 6500, status: "active", image: null },
  { id: "svc-6", name: "Full Body Massage", category: "Spa", price: 25000, status: "active", image: null },
  { id: "svc-7", name: "Signature Facial", category: "Spa", price: 15000, status: "active", image: null },
  { id: "svc-8", name: "Classic Manicure", category: "Nails", price: 4500, status: "active", image: null },
  { id: "svc-9", name: "Gel Pedicure", category: "Nails", price: 7500, status: "active", image: null },
  { id: "svc-10", name: "Deep Conditioning", category: "Hair", price: 8000, status: "active", image: null },
  { id: "svc-11", name: "Kids Haircut", category: "Hair", price: 4000, status: "active", image: null },
  { id: "svc-12", name: "Bridal Package", category: "Spa", price: 85000, status: "active", image: null },
  { id: "svc-13", name: "Relaxer Treatment", category: "Hair", price: 12000, status: "inactive", image: null },
  { id: "svc-14", name: "Steam Therapy", category: "Spa", price: 9000, status: "active", image: null },
  { id: "svc-15", name: "Nail Art Add-on", category: "Nails", price: 3500, status: "active", image: null },
];

export const customers = [
  { id: "cust-1", name: "Bolaji Fashola", phone: "+234 803 123 4567", email: "bolaji@example.com", totalSpent: 92500, visits: 9, lastVisit: day(-1) },
  { id: "cust-2", name: "Sarah Okoro", phone: "+234 815 234 5678", email: "sarah.o@example.com", totalSpent: 154000, visits: 14, lastVisit: day(0) },
  { id: "cust-3", name: "Nneka Chukwu", phone: "+234 706 345 6789", email: "nneka.c@example.com", totalSpent: 42000, visits: 4, lastVisit: day(-6) },
  { id: "cust-4", name: "Emeka Nwosu", phone: "+234 810 456 7890", email: "emeka@example.com", totalSpent: 31500, visits: 3, lastVisit: day(-12) },
  { id: "cust-5", name: "Zainab Bello", phone: "+234 902 567 8901", email: "zainab.b@example.com", totalSpent: 87000, visits: 7, lastVisit: day(-2) },
  { id: "cust-6", name: "Funke Adekunle", phone: "+234 814 678 9012", email: "funke.a@example.com", totalSpent: 23000, visits: 2, lastVisit: day(-22) },
  { id: "cust-7", name: "Yemi Alade-Johnson", phone: "+234 805 789 0123", email: "yemi@example.com", totalSpent: 61000, visits: 5, lastVisit: day(-5) },
  { id: "cust-8", name: "Tolu Akande", phone: "+234 708 890 1234", email: "tolu.a@example.com", totalSpent: 48500, visits: 5, lastVisit: day(-8) },
  { id: "cust-9", name: "Amara Obi", phone: "+234 816 901 2345", email: "amara.o@example.com", totalSpent: 115000, visits: 11, lastVisit: day(0) },
  { id: "cust-10", name: "Kunle Martins", phone: "+234 903 012 3456", email: "kunle.m@example.com", totalSpent: 34000, visits: 3, lastVisit: day(-18) },
  { id: "cust-11", name: "Ifeoma Nnamdi", phone: "+234 811 123 4567", email: "ifeoma@example.com", totalSpent: 72500, visits: 6, lastVisit: day(-3) },
  { id: "cust-12", name: "Chidi Okonkwo", phone: "+234 802 234 5678", email: "chidi.o@example.com", totalSpent: 29000, visits: 3, lastVisit: day(-9) },
  { id: "cust-13", name: "Aisha Musa", phone: "+234 705 345 6789", email: "aisha.m@example.com", totalSpent: 54000, visits: 4, lastVisit: day(-4) },
  { id: "cust-14", name: "Dayo Coker", phone: "+234 817 456 7890", email: "dayo.c@example.com", totalSpent: 18500, visits: 2, lastVisit: day(-28) },
  { id: "cust-15", name: "Ngozi Uche", phone: "+234 904 567 8901", email: "ngozi.u@example.com", totalSpent: 80000, visits: 8, lastVisit: day(0) },
  { id: "cust-16", name: "Temi Adewale", phone: "+234 809 678 9012", email: "temi.a@example.com", totalSpent: 67500, visits: 6, lastVisit: day(-7) },
  { id: "cust-17", name: "Obioma Agha", phone: "+234 813 789 0123", email: "obioma@example.com", totalSpent: 26500, visits: 3, lastVisit: day(-14) },
  { id: "cust-18", name: "Sade Balogun", phone: "+234 707 890 1234", email: "sade.b@example.com", totalSpent: 97500, visits: 10, lastVisit: day(-1) },
  { id: "cust-19", name: "Innocent Igwe", phone: "+234 818 901 2345", email: "innocent.i@example.com", totalSpent: 22000, visits: 2, lastVisit: day(-25) },
  { id: "cust-20", name: "Halima Bello", phone: "+234 901 012 3456", email: "halima.b@example.com", totalSpent: 43500, visits: 4, lastVisit: day(-10) },
  { id: "cust-21", name: "Jide Olatunde", phone: "+234 810 123 4567", email: "jide.o@example.com", totalSpent: 38000, visits: 4, lastVisit: day(-6) },
  { id: "cust-22", name: "Ese Ogundimu", phone: "+234 804 234 5678", email: "ese.o@example.com", totalSpent: 59500, visits: 5, lastVisit: day(-3) },
  { id: "cust-23", name: "Femi Akindele", phone: "+234 709 345 6789", email: "femi.a@example.com", totalSpent: 20000, visits: 2, lastVisit: day(-17) },
  { id: "cust-24", name: "Lydia Danjuma", phone: "+234 812 456 7890", email: "lydia.d@example.com", totalSpent: 84000, visits: 8, lastVisit: day(0) },
  { id: "cust-25", name: "Ola Oyewale", phone: "+234 806 567 8901", email: "ola.o@example.com", totalSpent: 31000, visits: 3, lastVisit: day(-11) },
  { id: "cust-26", name: "Kemi Ojo", phone: "+234 907 678 9012", email: "kemi.o@example.com", totalSpent: 46000, visits: 5, lastVisit: day(-5) },
  { id: "cust-27", name: "Chioma Azubuike", phone: "+234 815 789 0123", email: "chioma.a@example.com", totalSpent: 71500, visits: 7, lastVisit: day(-2) },
  { id: "cust-28", name: "Deji Ajayi", phone: "+234 703 890 1234", email: "deji.a@example.com", totalSpent: 27500, visits: 3, lastVisit: day(-15) },
  { id: "cust-29", name: "Rashidat Salami", phone: "+234 811 901 2345", email: "rashidat.s@example.com", totalSpent: 60500, visits: 6, lastVisit: day(-4) },
  { id: "cust-30", name: "Segun Oyediran", phone: "+234 908 012 3456", email: "segun.o@example.com", totalSpent: 14500, visits: 1, lastVisit: day(-30) },
];

const statusPool = ["pending", "confirmed", "completed", "cancelled"];
const pickStatus = (weighting = [0.15, 0.3, 0.45, 0.1]) => {
  const r = Math.random();
  let acc = 0;
  for (let i = 0; i < weighting.length; i++) {
    acc += weighting[i];
    if (r <= acc) return statusPool[i];
  }
  return statusPool[2];
};

export const bookings = Array.from({ length: 32 }, (_, i) => {
  const customer = customers[i % customers.length];
  const service = services[i % services.length];
  const dateOffset = -14 + i;
  const hour = 8 + (i % 10);
  return {
    id: "bk-" + String(i + 1).padStart(3, "0"),
    customerId: customer.id,
    customerName: customer.name,
    serviceId: service.id,
    serviceName: service.name,
    price: service.price,
    date: day(dateOffset),
    time: time(hour, i % 2 === 0 ? 0 : 30),
    status: i < 28 ? pickStatus() : i % 3 === 0 ? "pending" : "confirmed",
    staff: staff[i % staff.length].name,
  };
});

export const revenueByDay = Array.from({ length: 30 }, (_, i) => ({
  date: day(-29 + i),
  revenue: 45000 + Math.round(Math.sin(i / 4) * 22000 + (i % 7 === 6 ? 12000 : 0)),
  bookings: 8 + Math.round(Math.cos(i / 5) * 4 + (i % 7 === 6 ? 3 : 0)),
}));

export const bookingsByCategory = services.reduce((acc, svc) => {
  const entry = acc.find((x) => x.category === svc.category);
  if (entry) entry.value += 1 + Math.floor(Math.random() * 3);
  else acc.push({ category: svc.category, value: 2 + Math.floor(Math.random() * 4) });
  return acc;
}, []);

export const busiestHours = Array.from({ length: 11 }, (_, i) => ({
  hour: String(8 + i).padStart(2, "0") + ":00",
  value: 10 + Math.round(Math.sin(i / 3) * 8),
}));

export const activityFeed = [
  { id: "act-1", text: "New booking: Sarah O. — 2:30pm today", time: "2 mins ago" },
  { id: "act-2", text: "Price updated: Signature Facial → ₦15,000", time: "18 mins ago" },
  { id: "act-3", text: "Booking confirmed: Bolaji F. — Haircut", time: "42 mins ago" },
  { id: "act-4", text: "New customer: Halima Bello added", time: "1 hr ago" },
  { id: "act-5", text: "Service deactivated: Relaxer Treatment", time: "3 hrs ago" },
  { id: "act-6", text: "Revenue milestone: ₦2.4M this month", time: "5 hrs ago" },
  { id: "act-7", text: "Booking cancelled: Emeka N. — Massage", time: "Yesterday" },
];
