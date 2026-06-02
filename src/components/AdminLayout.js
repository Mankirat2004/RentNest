import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ToastProvider } from "../context/ToastContext";
import DashboardPage from "../pages/DashboardPage";
import UsersPage from "../pages/UsersPage";
import ListingsPage from "../pages/ListingsPage";
import CategoriesPage from "../pages/CategoriesPage";
import CommissionPage from "../pages/CommissionPage";
import BookingsPage from "../pages/BookingsPage";

const NAV_ITEMS = [
  { id: "dashboard",   icon: "📊", label: "Dashboard" },
  { id: "users",       icon: "👥", label: "User Management" },
  { id: "listings",    icon: "📋", label: "Listing Reviews" },
  { id: "categories",  icon: "🏷️",  label: "Categories" },
  { id: "commission",  icon: "💰", label: "Commission & Earnings" },
  { id: "bookings",    icon: "📅", label: "Bookings" },
];

const PAGE_TITLES = {
  dashboard:  "Dashboard Overview",
  users:      "User Management",
  listings:   "Listing Reviews",
  categories: "Equipment Categories",
  commission: "Commission & Earnings",
  bookings:   "Bookings",
};

export default function AdminLayout() {
  const { currentUser, logout } = useAuth();
  const [activePage, setActivePage] = useState("dashboard");

  function renderPage() {
    switch (activePage) {
      case "dashboard":  return <DashboardPage setPage={setActivePage} />;
      case "users":      return <UsersPage />;
      case "listings":   return <ListingsPage />;
      case "categories": return <CategoriesPage />;
      case "commission": return <CommissionPage />;
      case "bookings":   return <BookingsPage />;
      default:           return <DashboardPage setPage={setActivePage} />;
    }
  }

  return (
    <ToastProvider>
      <div className="admin-wrapper">
        {/* ── SIDEBAR ── */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <svg width="42" height="42" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <rect width="200" height="200" rx="18" fill="#4a9ebe"/>
              <circle cx="100" cy="90" r="68" fill="#2f7aa8"/>
              <path d="M55 100 Q65 85 80 88 L100 82 L120 88 Q135 85 145 100 Q135 115 120 112 L100 118 L80 112 Q65 115 55 100Z" fill="#7dc0e0" stroke="#2a6a98" strokeWidth="3"/>
              <path d="M70 95 Q80 80 95 85 L100 82 L105 85 Q120 80 130 95" fill="none" stroke="#2a6a98" strokeWidth="4" strokeLinecap="round"/>
            </svg>
            <span>RentNest</span>
          </div>

          <div className="sidebar-label">Main Menu</div>

          <nav className="sidebar-nav">
            {NAV_ITEMS.map(item => (
              <div
                key={item.id}
                className={`nav-item ${activePage === item.id ? "active" : ""}`}
                onClick={() => setActivePage(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>
              Signed in as<br />
              <strong style={{ color: "white" }}>{currentUser?.email}</strong>
            </div>
            <button className="logout-btn" onClick={logout}>
              🚪 Sign Out
            </button>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <div className="main-content">
          <header className="topbar">
            <div>
              <div className="topbar-title">{PAGE_TITLES[activePage]}</div>
            </div>
            <div className="topbar-right">
              <span className="admin-email">{currentUser?.email}</span>
              <span className="admin-badge">⚙️ Admin</span>
            </div>
          </header>

          <main className="page-content">
            {renderPage()}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
