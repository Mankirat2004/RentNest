import React, { useState } from "react";
import { mockCategories } from "../data/mockData";
import { useToast } from "../context/ToastContext";

const ICON_OPTIONS = ["📷","🔧","🏄","🎸","🎮","🛋️","🍳","🏋️","🚗","⛺","🎨","📚","👔","🌱","🔬","🎯","🏊","🎻","💻","📱"];

function CategoryModal({ initial, onSave, onClose }) {
  const [name, setName]   = useState(initial?.name || "");
  const [icon, setIcon]   = useState(initial?.icon || "📦");
  const [desc, setDesc]   = useState(initial?.description || "");

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">{initial ? "Edit Category" : "Add New Category"}</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="form-group">
          <label className="form-label">Category Icon</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
            {ICON_OPTIONS.map(ic => (
              <button
                key={ic}
                onClick={() => setIcon(ic)}
                style={{
                  width: 40, height: 40, fontSize: 20, borderRadius: 8, cursor: "pointer",
                  border: `2px solid ${icon === ic ? "#84a98c" : "#d0e8e8"}`,
                  background: icon === ic ? "#edf7f7" : "white",
                  padding: 0,
                }}
              >{ic}</button>
            ))}
          </div>
          <div style={{ fontSize: 13, color: "#84a98c" }}>Selected: <strong>{icon}</strong></div>
        </div>

        <div className="form-group">
          <label className="form-label">Category Name</label>
          <input
            className="form-input"
            placeholder="e.g. Power Tools"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="form-textarea"
            placeholder="Brief description of what this category includes..."
            value={desc}
            onChange={e => setDesc(e.target.value)}
          />
        </div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button
            className="btn-primary"
            onClick={() => name.trim() && onSave({ name, icon, description: desc })}
          >
            {initial ? "Save Changes" : "Create Category"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CategoriesPage() {
  const showToast = useToast();
  const [categories, setCategories] = useState(mockCategories);
  const [showModal, setShowModal]   = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteId, setDeleteId]     = useState(null);
  const [search, setSearch]         = useState("");

  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleAdd(data) {
    const newCat = { id: `c${Date.now()}`, listingCount: 0, ...data };
    setCategories(prev => [...prev, newCat]);
    setShowModal(false);
    showToast(`Category "${data.name}" created successfully!`);
  }

  function handleEdit(data) {
    setCategories(prev => prev.map(c =>
      c.id === editTarget.id ? { ...c, ...data } : c
    ));
    setEditTarget(null);
    showToast(`Category "${data.name}" updated.`);
  }

  function handleDelete(id) {
    const c = categories.find(c => c.id === id);
    setCategories(prev => prev.filter(c => c.id !== id));
    setDeleteId(null);
    showToast(`Category "${c.name}" deleted.`, "error");
  }

  return (
    <>
      <div className="stats-grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        <div className="stat-card accent-dark">
          <div className="stat-label">Total Categories</div>
          <div className="stat-value">{categories.length}</div>
        </div>
        <div className="stat-card accent-green">
          <div className="stat-label">Total Listings</div>
          <div className="stat-value">{categories.reduce((s,c) => s + c.listingCount, 0)}</div>
        </div>
        <div className="stat-card accent-teal">
          <div className="stat-label">Avg per Category</div>
          <div className="stat-value">
            {(categories.reduce((s,c) => s + c.listingCount, 0) / categories.length).toFixed(1)}
          </div>
        </div>
      </div>

      <div className="section-card">
        <div className="section-header">
          <div>
            <div className="section-title">Equipment Categories</div>
            <div className="section-sub">Organise listings so buyers can browse by type</div>
          </div>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            + Add Category
          </button>
        </div>

        <div className="search-bar" style={{ marginBottom: 28 }}>
          <input
            className="search-input"
            placeholder="🔍  Search categories..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🏷️</div>
            <h3>No categories found</h3>
            <p>Try a different search or create a new category.</p>
          </div>
        ) : (
          <div className="category-grid">
            {filtered.map(c => (
              <div key={c.id} className="category-pill">
                <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
                  <span className="category-icon">{c.icon}</span>
                  <div className="category-info">
                    <h4>{c.name}</h4>
                    <p>{c.listingCount} listing{c.listingCount !== 1 ? "s" : ""}</p>
                  </div>
                </div>
                <div className="category-actions">
                  <button
                    className="btn-secondary btn-sm"
                    title="Edit"
                    onClick={() => setEditTarget(c)}
                  >✏️</button>
                  <button
                    className="btn-danger btn-sm"
                    title="Delete"
                    onClick={() => setDeleteId(c.id)}
                  >🗑️</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Category descriptions */}
      <div className="section-card">
        <div className="section-header">
          <div className="section-title">Category Details</div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Icon</th>
              <th>Name</th>
              <th>Description</th>
              <th>Listings</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id}>
                <td style={{ fontSize: 24 }}>{c.icon}</td>
                <td><strong>{c.name}</strong></td>
                <td style={{ color: "#52796f", maxWidth: 260 }}>{c.description}</td>
                <td><span className="badge badge-active">{c.listingCount}</span></td>
                <td>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn-secondary btn-sm" onClick={() => setEditTarget(c)}>Edit</button>
                    <button className="btn-danger btn-sm" onClick={() => setDeleteId(c.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add modal */}
      {showModal && (
        <CategoryModal onSave={handleAdd} onClose={() => setShowModal(false)} />
      )}

      {/* Edit modal */}
      {editTarget && (
        <CategoryModal initial={editTarget} onSave={handleEdit} onClose={() => setEditTarget(null)} />
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="modal" style={{ maxWidth: 420 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">⚠️ Delete Category</div>
              <button className="modal-close" onClick={() => setDeleteId(null)}>✕</button>
            </div>
            <p style={{ color: "#52796f", lineHeight: 1.7 }}>
              Are you sure you want to delete <strong>{categories.find(c => c.id === deleteId)?.name}</strong>?
              All {categories.find(c => c.id === deleteId)?.listingCount} associated listings will need to be re-categorised.
            </p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn-danger" onClick={() => handleDelete(deleteId)}>Delete Category</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
