import React, { useState } from "react";
import { mockListings } from "../data/mockData";
import { useToast } from "../context/ToastContext";

export default function ListingsPage() {
  const showToast = useToast();
  const [listings, setListings] = useState(mockListings);
  const [filter, setFilter]     = useState("pending");
  const [search, setSearch]     = useState("");
  const [selected, setSelected] = useState(null);
  const [rejectNote, setRejectNote] = useState("");
  const [rejectTarget, setRejectTarget] = useState(null);

  function approve(id) {
    setListings(prev => prev.map(l => l.id === id ? { ...l, status: "approved" } : l));
    showToast("Listing approved and published successfully!");
    setSelected(null);
  }

  function reject(id, note) {
    setListings(prev => prev.map(l =>
      l.id === id ? { ...l, status: "rejected", rejectNote: note } : l
    ));
    showToast("Listing has been rejected.", "error");
    setRejectTarget(null);
    setRejectNote("");
    setSelected(null);
  }

  const filtered = listings.filter(l => {
    const matchFilter = filter === "all" || l.status === filter;
    const matchSearch = l.title.toLowerCase().includes(search.toLowerCase()) ||
                        l.seller.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const counts = {
    all:      listings.length,
    pending:  listings.filter(l => l.status === "pending").length,
    approved: listings.filter(l => l.status === "approved").length,
    rejected: listings.filter(l => l.status === "rejected").length,
  };

  return (
    <>
      {/* Summary tabs */}
      <div className="stats-grid" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
        {[
          { key: "all",      label: "Total",    color: "accent-dark" },
          { key: "pending",  label: "Pending",  color: "accent-mid" },
          { key: "approved", label: "Approved", color: "accent-green" },
          { key: "rejected", label: "Rejected", color: "accent-teal" },
        ].map(t => (
          <div
            key={t.key}
            className={`stat-card ${t.color}`}
            style={{ cursor: "pointer", outline: filter === t.key ? "2px solid #84a98c" : "none" }}
            onClick={() => setFilter(t.key)}
          >
            <div className="stat-label">{t.label}</div>
            <div className="stat-value">{counts[t.key]}</div>
            <div className="stat-sub">{filter === t.key ? "▶ Selected" : "Click to filter"}</div>
          </div>
        ))}
      </div>

      <div className="section-card">
        <div className="section-header">
          <div>
            <div className="section-title">Equipment Listing Reviews</div>
            <div className="section-sub">Approve or reject listings submitted by sellers</div>
          </div>
        </div>

        <div className="search-bar">
          <input
            className="search-input"
            placeholder="🔍  Search by title or seller name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select className="filter-select" value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No listings found</h3>
            <p>No listings match your current filter.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {filtered.map(l => (
              <div key={l.id} className="listing-card">
                <div className="listing-card-header">
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 22 }}>
                      {l.category === "Electronics" ? "📷" :
                       l.category === "Sports"      ? "🏄" :
                       l.category === "Music"       ? "🎸" :
                       l.category === "Tools"       ? "🔧" :
                       l.category === "Gaming"      ? "🎮" : "📦"}
                    </span>
                    <div>
                      <div style={{ fontWeight: "bold", fontSize: 16 }}>{l.title}</div>
                      <div style={{ fontSize: 13, color: "#52796f" }}>by {l.seller} · {l.category}</div>
                    </div>
                  </div>
                  <span className={`badge badge-${l.status}`}>{l.status}</span>
                </div>

                <div className="listing-card-body">
                  <p style={{ fontSize: 14, color: "#52796f", lineHeight: 1.6 }}>{l.description}</p>
                  <div className="listing-card-meta">
                    <div className="listing-meta-item">
                      <span>Rental Price: </span>
                      <span style={{ color: "#2f3e46" }}><strong>${l.price}/week</strong></span>
                    </div>
                    <div className="listing-meta-item">
                      <span>Condition: </span>
                      <span>{l.condition}</span>
                    </div>
                    <div className="listing-meta-item">
                      <span>Submitted: </span>
                      <span>{l.submitted}</span>
                    </div>
                    <div className="listing-meta-item">
                      <span>ID: </span>
                      <span style={{ fontFamily: "monospace" }}>{l.id}</span>
                    </div>
                  </div>

                  {l.rejectNote && (
                    <div style={{
                      background: "#fff3cd", border: "1px solid #ffc107",
                      borderRadius: 8, padding: "10px 14px", marginTop: 12,
                      fontSize: 13, color: "#856404"
                    }}>
                      <strong>Rejection reason:</strong> {l.rejectNote}
                    </div>
                  )}

                  <div className="listing-actions">
                    <button className="btn-secondary btn-sm" onClick={() => setSelected(l)}>
                      View Full Details
                    </button>
                    {l.status === "pending" && (
                      <>
                        <button className="btn-primary btn-sm" onClick={() => approve(l.id)}>
                          ✓ Approve
                        </button>
                        <button className="btn-danger btn-sm" onClick={() => setRejectTarget(l.id)}>
                          ✕ Reject
                        </button>
                      </>
                    )}
                    {l.status === "rejected" && (
                      <button className="btn-primary btn-sm" onClick={() => approve(l.id)}>
                        Re-approve Listing
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Listing Details</div>
              <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <span className={`badge badge-${selected.status}`} style={{ marginBottom: 16, display: "inline-block" }}>
              {selected.status}
            </span>
            <h3 style={{ fontFamily: "Georgia", fontSize: 20, marginBottom: 8 }}>{selected.title}</h3>
            <p style={{ color: "#52796f", marginBottom: 20, lineHeight: 1.7 }}>{selected.description}</p>
            <div className="divider" />
            {[
              ["Category",     selected.category],
              ["Submitted by", selected.seller],
              ["Weekly Price", `$${selected.price}/week`],
              ["Condition",    selected.condition],
              ["Date",         selected.submitted],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f0f4f4" }}>
                <span style={{ fontWeight: "bold", color: "#52796f", fontSize: 14 }}>{k}</span>
                <span style={{ fontSize: 14 }}>{v}</span>
              </div>
            ))}
            {selected.status === "pending" && (
              <div className="modal-actions">
                <button className="btn-danger" onClick={() => setRejectTarget(selected.id)}>Reject</button>
                <button className="btn-primary" onClick={() => approve(selected.id)}>Approve Listing</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectTarget && (
        <div className="modal-overlay" onClick={() => setRejectTarget(null)}>
          <div className="modal" style={{ maxWidth: 440 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Reject Listing</div>
              <button className="modal-close" onClick={() => setRejectTarget(null)}>✕</button>
            </div>
            <div className="form-group">
              <label className="form-label">Reason for Rejection</label>
              <textarea
                className="form-textarea"
                placeholder="Explain why this listing is being rejected (e.g. inaccurate description, damaged item, missing photos)..."
                value={rejectNote}
                onChange={e => setRejectNote(e.target.value)}
              />
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setRejectTarget(null)}>Cancel</button>
              <button
                className="btn-danger"
                onClick={() => reject(rejectTarget, rejectNote || "Does not meet listing standards.")}
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
