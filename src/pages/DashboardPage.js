import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { mockUsers, mockListings, mockBookings, mockCategories, mockRevenueData } from "../data/mockData";

const COLORS = ["#84a98c", "#52796f", "#354f52", "#2f3e46", "#a8c5ae", "#6b9375"];

export default function DashboardPage({ setPage }) {
  const totalUsers    = mockUsers.length;
  const activeUsers   = mockUsers.filter(u => u.status === "active").length;
  const pendingCount  = mockListings.filter(l => l.status === "pending").length;
  const totalRevenue  = mockBookings.reduce((s, b) => s + b.commission, 0).toFixed(2);

  const categoryData = mockCategories.map(c => ({ name: c.name, listings: c.listingCount }));

  const statusData = [
    { name: "Approved", value: mockListings.filter(l => l.status === "approved").length },
    { name: "Pending",  value: mockListings.filter(l => l.status === "pending").length },
    { name: "Rejected", value: mockListings.filter(l => l.status === "rejected").length },
  ];

  return (
    <>
      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card accent-dark">
          <div className="stat-label">Total Users</div>
          <div className="stat-value">{totalUsers}</div>
          <div className="stat-sub">{activeUsers} active</div>
        </div>
        <div className="stat-card accent-green">
          <div className="stat-label">Pending Listings</div>
          <div className="stat-value">{pendingCount}</div>
          <div className="stat-sub">Awaiting review</div>
        </div>
        <div className="stat-card accent-teal">
          <div className="stat-label">Total Bookings</div>
          <div className="stat-value">{mockBookings.length}</div>
          <div className="stat-sub">All time</div>
        </div>
        <div className="stat-card accent-mid">
          <div className="stat-label">Commission Earned</div>
          <div className="stat-value">${totalRevenue}</div>
          <div className="stat-sub">10% rate applied</div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="section-card">
          <div className="section-header">
            <div>
              <div className="section-title">Monthly Revenue</div>
              <div className="section-sub">Commission earnings over the last 6 months</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={mockRevenueData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#edf7f7" />
              <XAxis dataKey="month" tick={{ fontSize: 13, fill: "#52796f" }} />
              <YAxis tick={{ fontSize: 13, fill: "#52796f" }} />
              <Tooltip
                contentStyle={{ borderRadius: 10, border: "1px solid #d0e8e8", fontFamily: "Arial" }}
                formatter={(v) => [`$${v}`, "Revenue"]}
              />
              <Bar dataKey="revenue" fill="#84a98c" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="section-card">
          <div className="section-header">
            <div>
              <div className="section-title">Listing Status</div>
              <div className="section-sub">Current approval breakdown</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={55} outerRadius={90}
                dataKey="value" paddingAngle={4}>
                {statusData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: 13 }} />
              <Tooltip contentStyle={{ borderRadius: 10, fontFamily: "Arial" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="section-card">
        <div className="section-header">
          <div className="section-title">Quick Actions</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[
            { icon: "👥", label: "Manage Users",       page: "users",      color: "#2f3e46" },
            { icon: "📋", label: "Review Listings",    page: "listings",   color: "#52796f" },
            { icon: "🏷️",  label: "Edit Categories",   page: "categories", color: "#354f52" },
            { icon: "💰", label: "Set Commission",     page: "commission", color: "#84a98c" },
          ].map(a => (
            <div
              key={a.page}
              onClick={() => setPage(a.page)}
              style={{
                background: a.color, color: "white", borderRadius: 12,
                padding: "22px 18px", cursor: "pointer", textAlign: "center",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
            >
              <div style={{ fontSize: 30, marginBottom: 10 }}>{a.icon}</div>
              <div style={{ fontWeight: "bold", fontSize: 14 }}>{a.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="section-card">
        <div className="section-header">
          <div className="section-title">Recent Bookings</div>
          <button className="btn-secondary btn-sm" onClick={() => setPage("bookings")}>View All</button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Buyer</th>
              <th>Rental Amount</th>
              <th>Commission (10%)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {mockBookings.slice(0, 5).map(b => (
              <tr key={b.id}>
                <td><strong>{b.item}</strong></td>
                <td>{b.buyer}</td>
                <td>${b.amount}</td>
                <td style={{ color: "#52796f", fontWeight: "bold" }}>${b.commission}</td>
                <td>{b.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
