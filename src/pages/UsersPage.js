import React, { useState } from "react";
import { mockUsers } from "../data/mockData";
import { useToast } from "../context/ToastContext";

export default function UsersPage() {
  const showToast = useToast();
  const [users, setUsers]         = useState(mockUsers);
  const [search, setSearch]       = useState("");
  const [roleFilter, setRole]     = useState("all");
  const [statusFilter, setStatus] = useState("all");
  const [selected, setSelected]   = useState(null); // user detail modal
  const [confirmId, setConfirmId] = useState(null); // confirm delete

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
                        u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole   = roleFilter === "all" || u.role === roleFilter;
    const matchStatus = statusFilter === "all" || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  function toggleStatus(id) {
    setUsers(prev => prev.map(u =>
      u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u
    ));
    const u = users.find(u => u.id === id);
    showToast(`${u.name} has been ${u.status === "active" ? "deactivated" : "activated"}.`);
  }

  function deleteUser(id) {
    const u = users.find(u => u.id === id);
    setUsers(prev => prev.filter(u => u.id !== id));
    setConfirmId(null);
    showToast(`${u.name} has been removed from the platform.`);
  }

  const totalActive   = users.filter(u => u.status === "active").length;
  const totalInactive = users.filter(u => u.status === "inactive").length;

  return (
    <>
      {/* Summary */}
      <div className="stats-grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        <div className="stat-card accent-dark">
          <div className="stat-label">Total Users</div>
          <div className="stat-value">{users.length}</div>
        </div>
        <div className="stat-card accent-green">
          <div className="stat-label">Active</div>
          <div className="stat-value">{totalActive}</div>
        </div>
        <div className="stat-card accent-teal">
          <div className="stat-label">Inactive</div>
          <div className="stat-value">{totalInactive}</div>
        </div>
      </div>

      <div className="section-card">
        <div className="section-header">
          <div>
            <div className="section-title">All Registered Users</div>
            <div className="section-sub">Monitor activity, deactivate or remove accounts</div>
          </div>
        </div>

        {/* Filters */}
        <div className="search-bar">
          <input
            className="search-input"
            placeholder="🔍  Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select className="filter-select" value={roleFilter} onChange={e => setRole(e.target.value)}>
            <option value="all">All Roles</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>
          <select className="filter-select" value={statusFilter} onChange={e => setStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👤</div>
            <h3>No users found</h3>
            <p>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Bookings</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">{u.avatar}</div>
                      <div>
                        <div style={{ fontWeight: "bold" }}>{u.name}</div>
                        <div style={{ fontSize: 12, color: "#84a98c" }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${u.role}`}>{u.role}</span>
                  </td>
                  <td>
                    <span className={`badge badge-${u.status}`}>{u.status}</span>
                  </td>
                  <td>{u.joined}</td>
                  <td>{u.bookings}</td>
                  <td>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        className="btn-secondary btn-sm"
                        onClick={() => setSelected(u)}
                      >View</button>
                      <button
                        className="btn-secondary btn-sm"
                        style={u.status === "active"
                          ? { borderColor: "#e07070", color: "#c0392b" }
                          : { borderColor: "#84a98c", color: "#52796f" }}
                        onClick={() => toggleStatus(u.id)}
                      >
                        {u.status === "active" ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        className="btn-danger btn-sm"
                        onClick={() => setConfirmId(u.id)}
                      >Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* User Detail Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">User Details</div>
              <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 24 }}>
              <div className="user-avatar" style={{ width: 60, height: 60, fontSize: 22 }}>{selected.avatar}</div>
              <div>
                <div style={{ fontSize: 20, fontWeight: "bold", fontFamily: "Georgia" }}>{selected.name}</div>
                <div style={{ color: "#52796f" }}>{selected.email}</div>
              </div>
            </div>
            <div className="divider" />
            {[
              ["Role", <span className={`badge badge-${selected.role}`}>{selected.role}</span>],
              ["Status", <span className={`badge badge-${selected.status}`}>{selected.status}</span>],
              ["Joined", selected.joined],
              ["Total Bookings", selected.bookings],
              ["User ID", selected.id],
            ].map(([label, val]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f0f4f4" }}>
                <span style={{ fontWeight: "bold", color: "#52796f", fontSize: 14 }}>{label}</span>
                <span style={{ fontSize: 14 }}>{val}</span>
              </div>
            ))}
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setSelected(null)}>Close</button>
              <button
                className="btn-primary"
                onClick={() => { toggleStatus(selected.id); setSelected(null); }}
              >
                {selected.status === "active" ? "Deactivate User" : "Activate User"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmId && (
        <div className="modal-overlay" onClick={() => setConfirmId(null)}>
          <div className="modal" style={{ maxWidth: 420 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">⚠️ Remove User</div>
              <button className="modal-close" onClick={() => setConfirmId(null)}>✕</button>
            </div>
            <p style={{ color: "#52796f", lineHeight: 1.7 }}>
              Are you sure you want to permanently remove <strong>{users.find(u => u.id === confirmId)?.name}</strong>?
              This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setConfirmId(null)}>Cancel</button>
              <button className="btn-danger" onClick={() => deleteUser(confirmId)}>Yes, Remove User</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
