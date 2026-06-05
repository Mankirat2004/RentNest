import React, { useState } from "react";
import { mockBookings } from "../data/mockData";

export default function BookingsPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort]     = useState("date");

  const filtered = mockBookings
    .filter(b =>
      b.item.toLowerCase().includes(search.toLowerCase()) ||
      b.buyer.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "amount")  return b.amount - a.amount;
      if (sort === "commission") return b.commission - a.commission;
      return new Date(b.date) - new Date(a.date);
    });

  const total       = filtered.reduce((s, b) => s + b.amount, 0);
  const totalComm   = filtered.reduce((s, b) => s + b.commission, 0);

  return (
    <>
      <div className="stats-grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        <div className="stat-card accent-dark">
          <div className="stat-label">Total Bookings</div>
          <div className="stat-value">{mockBookings.length}</div>
        </div>
        <div className="stat-card accent-green">
          <div className="stat-label">Rental Revenue</div>
          <div className="stat-value">${total}</div>
        </div>
        <div className="stat-card accent-teal">
          <div className="stat-label">Commission Earned</div>
          <div className="stat-value">${totalComm.toFixed(2)}</div>
        </div>
      </div>

      <div className="section-card">
        <div className="section-header">
          <div>
            <div className="section-title">All Bookings</div>
            <div className="section-sub">Complete rental booking history with commission tracking</div>
          </div>
        </div>

        <div className="search-bar">
          <input
            className="search-input"
            placeholder="🔍  Search by item or buyer..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select className="filter-select" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="date">Sort: Date</option>
            <option value="amount">Sort: Amount</option>
            <option value="commission">Sort: Commission</option>
          </select>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Item Rented</th>
              <th>Buyer</th>
              <th>Rental Amount</th>
              <th>Commission (10%)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b, i) => (
              <tr key={b.id}>
                <td style={{ color: "#84a98c", fontWeight: "bold" }}>{i + 1}</td>
                <td><strong>{b.item}</strong></td>
                <td>{b.buyer}</td>
                <td>${b.amount}</td>
                <td>
                  <span style={{ color: "#52796f", fontWeight: "bold" }}>
                    ${b.commission.toFixed(2)}
                  </span>
                </td>
                <td>{b.date}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ background: "#edf7f7" }}>
              <td colSpan={3} style={{ padding: "14px 16px", fontWeight: "bold", color: "#2f3e46" }}>
                Totals
              </td>
              <td style={{ padding: "14px 16px", fontWeight: "bold" }}>${total}</td>
              <td style={{ padding: "14px 16px", fontWeight: "bold", color: "#52796f" }}>
                ${totalComm.toFixed(2)}
              </td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
